"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import {
  ContractDuration,
  ContractStatus,
  TreeTier,
  UserRole,
  type Contract,
  type Tree,
} from "@prisma/client";
import { z } from "zod";

import type { ActionResult } from "@/types/actions";

import { getAvailableCountForTier } from "@/lib/cache/queries";
import { sendContractActivatedEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { calculatePricing } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";
import {
  buildStripeLineItem,
  formatAmountForStripe,
  type CurrencyCode,
  stripePaymentMethodTypes,
} from "@/lib/stripe-helpers";
import { getStripe } from "@/lib/stripe";

const bookingSchema = z.object({
  tier: z.nativeEnum(TreeTier),
  duration: z.nativeEnum(ContractDuration),
  currency: z.enum(["INR", "USD", "GBP", "EUR"]),
});

function contractNumberFromSeed(): string {
  const year = new Date().getFullYear();
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AT-${year}-${suffix}`;
}

function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export async function previewPricing(tier: TreeTier, duration: ContractDuration) {
  return calculatePricing(tier, duration);
}

export async function createPreBookingSession(formData: FormData): Promise<ActionResult<{ url: string }>> {
  const parsed = bookingSchema.safeParse({
    tier: formData.get("tier"),
    duration: formData.get("duration"),
    currency: formData.get("currency"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid booking selections." };
  }

  const session = await getAuthSession();
  if (!session?.user?.id || !session.user.email) {
    return { success: false, error: "Please sign in to continue." };
  }

  const { tier, duration, currency } = parsed.data;
  const userId = session.user.id;

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const duplicate = await prisma.contract.findFirst({
    where: {
      userId,
      tier,
      duration,
      status: ContractStatus.PREBOOKING_PENDING,
      createdAt: { gte: thirtyMinutesAgo },
    },
    select: { id: true },
  });

  if (duplicate) {
    return {
      success: false,
      error: "You have a pending booking in progress. Check your dashboard.",
    };
  }

  const availability = await getAvailableCountForTier(tier);
  if (availability <= 0) {
    redirect(`/contact?waitlist=1&tier=${tier.toLowerCase()}`);
  }

  const pricing = calculatePricing(tier, duration);

  const contract = await prisma.contract.create({
    data: {
      userId,
      tier,
      duration,
      status: ContractStatus.PREBOOKING_PENDING,
      contractNumber: contractNumberFromSeed(),
      prebookingAmountPaise: pricing.prebookingAmountPaise,
      yearlyRentPaise: pricing.yearlyRentPaise,
      totalContractValuePaise: pricing.totalContractValuePaise,
      currency,
    },
    select: { id: true },
  });

  try {
    const checkout = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: stripePaymentMethodTypes(currency),
      line_items: [
        buildStripeLineItem({
          tier,
          duration,
          currency,
          pricing,
          phaseLabel: "ApnaTree Pre-booking",
        }),
      ],
      success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/trees/${tier.toLowerCase()}?cancelled=true`,
      metadata: {
        contractId: contract.id,
        userId,
        type: "PREBOOKING",
        tier,
        duration,
      },
      client_reference_id: contract.id,
      expires_at: Math.floor(Date.now() / 1000) + 1800,
      customer_email: session.user.email,
    });

    if (!checkout.url) {
      return { success: false, error: "Unable to start checkout." };
    }

    await prisma.contract.update({
      where: { id: contract.id },
      data: { prebookingStripeSessionId: checkout.id },
    });

    return { success: true, data: { url: checkout.url } };
  } catch (error) {
    console.error(error);
    await prisma.contract.delete({ where: { id: contract.id } }).catch(() => undefined);
    return { success: false, error: "Checkout failed to initialize. Try again shortly." };
  }
}

export type ContractDashboardView = Pick<
  Contract,
  | "id"
  | "contractNumber"
  | "tier"
  | "duration"
  | "status"
  | "prebookingPaidAt"
  | "currency"
  | "createdAt"
> & {
  tree: Pick<Tree, "treeCode" | "tier" | "profileImageUrl"> | null;
};

export async function getContractById(contractId: string): Promise<ContractDashboardView | null> {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return null;
  }

  return prisma.contract.findFirst({
    where: { id: contractId, userId: session.user.id },
    select: {
      id: true,
      contractNumber: true,
      tier: true,
      duration: true,
      status: true,
      prebookingPaidAt: true,
      currency: true,
      createdAt: true,
      tree: {
        select: { treeCode: true, tier: true, profileImageUrl: true },
      },
    },
  });
}

export async function getContractByStripeSession(sessionId: string): Promise<ContractDashboardView | null> {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return null;
  }

  return prisma.contract.findFirst({
    where: {
      userId: session.user.id,
      prebookingStripeSessionId: sessionId,
    },
    select: {
      id: true,
      contractNumber: true,
      tier: true,
      duration: true,
      status: true,
      prebookingPaidAt: true,
      currency: true,
      createdAt: true,
      tree: {
        select: { treeCode: true, tier: true, profileImageUrl: true },
      },
    },
  });
}

export async function cancelExpiredPendingContracts(): Promise<ActionResult<{ cancelled: number }>> {
  const session = await getAuthSession();
  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    return { success: false, error: "Unauthorized." };
  }

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const result = await prisma.contract.updateMany({
    where: {
      status: ContractStatus.PREBOOKING_PENDING,
      createdAt: { lt: cutoff },
    },
    data: { status: ContractStatus.CANCELLED },
  });

  return { success: true, data: { cancelled: result.count } };
}

export async function createAnnualRentSession(contractId: string): Promise<ActionResult<{ url: string }>> {
  const session = await getAuthSession();
  if (!session?.user?.id || !session.user.email) {
    return { success: false, error: "Please sign in." };
  }

  const contract = await prisma.contract.findFirst({
    where: { id: contractId },
    select: {
      id: true,
      userId: true,
      status: true,
      duration: true,
      yearlyRentPaise: true,
      currency: true,
    },
  });

  if (!contract) {
    return { success: false, error: "Contract not found." };
  }

  const isOwner = contract.userId === session.user.id;
  const isAdmin = session.user.role === UserRole.ADMIN;
  if (!isOwner && !isAdmin) {
    return { success: false, error: "Unauthorized." };
  }

  if (
    contract.status !== ContractStatus.AWAITING_CONFIRMATION &&
    contract.status !== ContractStatus.ACTIVE
  ) {
    return { success: false, error: "Contract is not ready for stewardship billing." };
  }

  const latestPaid = await prisma.rentPayment.findFirst({
    where: { contractId: contract.id, paidAt: { not: null } },
    orderBy: { yearNumber: "desc" },
    select: { yearNumber: true },
  });

  const nextYear = latestPaid ? latestPaid.yearNumber + 1 : 1;

  if (contract.status === ContractStatus.AWAITING_CONFIRMATION && nextYear !== 1) {
    return { success: false, error: "Resolve allocation before issuing further invoices." };
  }

  let rentPayment = await prisma.rentPayment.findFirst({
    where: { contractId: contract.id, paidAt: null },
    orderBy: { createdAt: "desc" },
    select: { id: true, yearNumber: true },
  });

  if (!rentPayment) {
    rentPayment = await prisma.rentPayment.create({
      data: {
        contractId: contract.id,
        yearNumber: nextYear,
        amountPaise: contract.yearlyRentPaise,
        dueDate: addYears(new Date(), 14),
      },
      select: { id: true, yearNumber: true },
    });
  }

  const currency = (contract.currency as CurrencyCode) ?? "INR";
  const unitAmount = formatAmountForStripe(contract.yearlyRentPaise, currency);

  const checkout = await getStripe().checkout.sessions.create({
    mode: "payment",
    payment_method_types: stripePaymentMethodTypes(currency),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: unitAmount,
          product_data: {
            name: `ApnaTree Stewardship · Year ${rentPayment.yearNumber}`,
          },
        },
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/payments?rent=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/payments?rent=cancelled`,
    metadata: {
      contractId: contract.id,
      userId: contract.userId,
      type: "ANNUAL_RENT",
      rentPaymentId: rentPayment.id,
    },
    customer_email: session.user.email,
  });

  if (!checkout.url) {
    return { success: false, error: "Unable to start checkout." };
  }

  await prisma.rentPayment.update({
    where: { id: rentPayment.id },
    data: { stripeSessionId: checkout.id },
  });

  return { success: true, data: { url: checkout.url } };
}

export async function assignTreeAndTriggerRent(
  contractId: string,
  treeId: string
): Promise<ActionResult<void>> {
  const session = await getAuthSession();
  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const payload = await prisma.$transaction(async (tx) => {
      const tree = await tx.tree.findUnique({
        where: { id: treeId },
        select: { id: true, isAvailable: true, treeCode: true },
      });

      if (!tree?.isAvailable) {
        throw new Error("Tree unavailable.");
      }

      const contract = await tx.contract.update({
        where: { id: contractId },
        data: {
          treeId,
          status: ContractStatus.AWAITING_CONFIRMATION,
        },
        select: {
          contractNumber: true,
          userId: true,
        },
      });

      await tx.tree.update({
        where: { id: treeId },
        data: { isAvailable: false },
      });

      return { treeCode: tree.treeCode, contractNumber: contract.contractNumber, userId: contract.userId };
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { email: true },
    });

    if (user?.email) {
      await sendContractActivatedEmail({
        to: user.email,
        treeCode: payload.treeCode,
        contractNumber: payload.contractNumber,
      });
    }

    revalidateTag("trees", "default");
    return { success: true, data: undefined };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Assignment failed.",
    };
  }
}
