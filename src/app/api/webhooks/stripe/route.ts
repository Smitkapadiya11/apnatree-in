import { headers } from "next/headers";
import type Stripe from "stripe";

import { ContractDuration, ContractStatus, ShippingPaymentStatus } from "@prisma/client";

import { sendPreBookingConfirmationEmail, sendRentPaidEmail, sendShippingPaidEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { getTierLabel } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

function addYears(date: Date, years: number): Date {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

function termYears(duration: ContractDuration): number {
  switch (duration) {
    case ContractDuration.ONE_YEAR:
      return 1;
    case ContractDuration.TWO_YEAR:
      return 2;
    case ContractDuration.FIVE_YEAR:
      return 5;
    default:
      return 1;
  }
}

function paymentIntentId(pi: Stripe.Checkout.Session["payment_intent"]): string | null {
  if (!pi) return null;
  return typeof pi === "string" ? pi : pi.id;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const type = metadata.type;

  if (type === "PREBOOKING") {
    const contractId = metadata.contractId;
    if (!contractId) return;

    const existing = await prisma.contract.findUnique({
      where: { id: contractId },
      select: {
        id: true,
        status: true,
        userId: true,
        contractNumber: true,
        tier: true,
        duration: true,
      },
    });

    if (!existing || existing.status === ContractStatus.PREBOOKING_PAID) {
      return;
    }

    const emailFromStripe = session.customer_details?.email ?? session.customer_email ?? undefined;
    const user = await prisma.user.findUnique({
      where: { id: existing.userId },
      select: { email: true },
    });

    if (emailFromStripe && user?.email && emailFromStripe.toLowerCase() !== user.email.toLowerCase()) {
      console.error("Stripe email mismatch for contract", contractId);
      return;
    }

    await prisma.contract.update({
      where: { id: contractId },
      data: {
        status: ContractStatus.PREBOOKING_PAID,
        prebookingPaidAt: new Date(),
        prebookingStripePaymentId: paymentIntentId(session.payment_intent),
      },
    });

    if (user?.email) {
      await sendPreBookingConfirmationEmail({
        to: user.email,
        contractNumber: existing.contractNumber,
        tierLabel: getTierLabel(existing.tier),
      });
    }

    return;
  }

  if (type === "ANNUAL_RENT") {
    const rentPaymentId = metadata.rentPaymentId;
    const contractId = metadata.contractId;
    if (!rentPaymentId || !contractId) return;

    const rent = await prisma.rentPayment.findUnique({
      where: { id: rentPaymentId },
      select: {
        id: true,
        contractId: true,
        yearNumber: true,
      },
    });

    if (!rent) return;

    await prisma.rentPayment.update({
      where: { id: rentPaymentId },
      data: {
        paidAt: new Date(),
        stripePaymentId: paymentIntentId(session.payment_intent),
      },
    });

    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      select: {
        duration: true,
        contractNumber: true,
        userId: true,
      },
    });

    if (!contract) return;

    const owner = await prisma.user.findUnique({
      where: { id: contract.userId },
      select: { email: true },
    });

    if (rent.yearNumber === 1) {
      const startDate = new Date();
      await prisma.contract.update({
        where: { id: contractId },
        data: {
          status: ContractStatus.ACTIVE,
          startDate,
          endDate: addYears(startDate, termYears(contract.duration)),
        },
      });
    }

    if (owner?.email) {
      await sendRentPaidEmail({
        to: owner.email,
        contractNumber: contract.contractNumber,
        yearNumber: rent.yearNumber,
      });
    }

    return;
  }

  if (type === "SHIPPING") {
    const harvestOrderId = metadata.harvestOrderId;
    if (!harvestOrderId) return;

    const order = await prisma.harvestOrder.update({
      where: { id: harvestOrderId },
      data: {
        shippingPaymentStatus: ShippingPaymentStatus.PAID,
        shippingPaidAt: new Date(),
      },
      select: {
        season: true,
        userId: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: order.userId },
      select: { email: true },
    });

    if (user?.email) {
      await sendShippingPaidEmail({ to: user.email, season: order.season });
    }
  }
}

async function handleSessionExpired(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  if (metadata.type !== "PREBOOKING" || !metadata.contractId) return;

  await prisma.contract.updateMany({
    where: {
      id: metadata.contractId,
      status: ContractStatus.PREBOOKING_PENDING,
    },
    data: { status: ContractStatus.CANCELLED },
  });
}

export async function POST(req: Request) {
  const rawBody = Buffer.from(await req.arrayBuffer());
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error(error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.expired":
        await handleSessionExpired(event.data.object as Stripe.Checkout.Session);
        break;
      case "payment_intent.payment_failed":
        console.error("Stripe payment failed", event.data.object);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
