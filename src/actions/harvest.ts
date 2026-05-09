"use server";

import { revalidatePath } from "next/cache";

import { HarvestStatus, ShippingPaymentStatus } from "@prisma/client";
import { z } from "zod";

import type { ActionResult } from "@/types/actions";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { formatAmountForStripe, stripePaymentMethodTypes, type CurrencyCode } from "@/lib/stripe-helpers";

const addressSchema = z.object({
  shippingAddressLine1: z.string().min(1),
  shippingAddressLine2: z.string().optional().nullable(),
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingPincode: z.string().min(3),
  shippingCountry: z
    .string()
    .min(2)
    .optional()
    .transform((value) => (value?.trim().toUpperCase().length ? value.trim().toUpperCase() : "IN")),
});

function shippingRatePaisePerKg(country: string, state: string): number {
  const normalizedCountry = country.trim().toUpperCase();
  const normalizedState = state.trim().toLowerCase();

  if (normalizedCountry !== "IN") {
    return 400 * 100;
  }

  if (normalizedState === "gujarat" || normalizedState === "gj") {
    return 80 * 100;
  }

  return 150 * 100;
}

export async function calculateShippingCost(
  harvestOrderId: string,
  address: unknown
): Promise<ActionResult<{ costPaise: number; weightKg: number }>> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return { success: false, error: "Please sign in." };
    }

    const parsed = addressSchema.safeParse(address);
    if (!parsed.success) {
      return { success: false, error: "Shipping address looks incomplete." };
    }

    const order = await prisma.harvestOrder.findFirst({
      where: {
        id: harvestOrderId,
        userId: session.user.id,
        status: HarvestStatus.PACKAGED,
      },
      select: {
        id: true,
        estimatedYieldKg: true,
        actualYieldKg: true,
      },
    });

    if (!order) {
      return { success: false, error: "Harvest order not ready for shipping quotes." };
    }

    const weightKg = order.actualYieldKg ?? order.estimatedYieldKg ?? 12;
    const rate = shippingRatePaisePerKg(parsed.data.shippingCountry, parsed.data.shippingState);
    const costPaise = Math.max(rate, Math.round(weightKg * rate));

    await prisma.harvestOrder.update({
      where: { id: order.id },
      data: {
        shippingAddressLine1: parsed.data.shippingAddressLine1,
        shippingAddressLine2: parsed.data.shippingAddressLine2 ?? null,
        shippingCity: parsed.data.shippingCity,
        shippingState: parsed.data.shippingState,
        shippingPincode: parsed.data.shippingPincode,
        shippingCountry: parsed.data.shippingCountry,
        shippingCostPaise: costPaise,
      },
    });

    revalidatePath("/dashboard/harvest");

    return { success: true, data: { costPaise, weightKg } };
  } catch (error) {
    console.error("[calculateShippingCost]", error);
    return { success: false, error: "Unable to calculate shipping." };
  }
}

export async function createShippingPaymentSession(
  harvestOrderId: string
): Promise<ActionResult<{ url: string }>> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || !session.user.email) {
      return { success: false, error: "Please sign in." };
    }

    const order = await prisma.harvestOrder.findFirst({
      where: {
        id: harvestOrderId,
        userId: session.user.id,
        status: HarvestStatus.PACKAGED,
        shippingPaymentStatus: ShippingPaymentStatus.PENDING,
      },
      select: {
        id: true,
        season: true,
        shippingCostPaise: true,
      },
    });

    if (!order?.shippingCostPaise || order.shippingCostPaise <= 0) {
      return { success: false, error: "Calculate shipping before paying." };
    }

    const currency: CurrencyCode = "INR";
    const unitAmount = formatAmountForStripe(order.shippingCostPaise, currency);

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: stripePaymentMethodTypes(currency),
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: unitAmount,
            product_data: {
              name: `Harvest shipping · ${order.season}`,
              description: "Freight for your packed Kesar mangoes",
            },
          },
        },
      ],
      success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/harvest?shipping=success`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/harvest?shipping=cancelled`,
      metadata: {
        type: "SHIPPING",
        harvestOrderId: order.id,
        userId: session.user.id,
      },
      customer_email: session.user.email,
    });

    if (!checkout.url) {
      return { success: false, error: "Unable to start Stripe Checkout." };
    }

    await prisma.harvestOrder.update({
      where: { id: order.id },
      data: { shippingStripeSessionId: checkout.id },
    });

    return { success: true, data: { url: checkout.url } };
  } catch (error) {
    console.error("[createShippingPaymentSession]", error);
    return { success: false, error: "Checkout could not start." };
  }
}
