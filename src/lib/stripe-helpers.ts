import "server-only";

import type { ContractDuration, TreeTier } from "@prisma/client";

/** Narrow subset enabled for ApnaTree Checkout sessions (Stripe supports additional methods globally). */
export type CheckoutPaymentMethodType = "card" | "upi";

import type { PricingBreakdown } from "@/lib/pricing";

/** Approximate INR per major unit — advisory FX for Stripe minor-unit conversion. */
const INR_PER_MAJOR: Record<Exclude<CurrencyCode, "INR">, number> = {
  USD: 83,
  GBP: 105,
  EUR: 90,
};

export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR";

export function formatAmountForStripe(amountPaise: number, currency: CurrencyCode): number {
  if (currency === "INR") {
    return Math.round(amountPaise);
  }

  const rupees = amountPaise / 100;
  const majorForeign = rupees / INR_PER_MAJOR[currency];
  return Math.max(1, Math.round(majorForeign * 100));
}

export function formatAmountFromStripe(amountMinor: number, currency: CurrencyCode): number {
  if (currency === "INR") {
    return amountMinor;
  }

  const majorForeign = amountMinor / 100;
  const rupees = majorForeign * INR_PER_MAJOR[currency];
  return Math.round(rupees * 100);
}

export function getCurrencyConfig(currency: CurrencyCode): { symbol: string; locale: string } {
  switch (currency) {
    case "INR":
      return { symbol: "₹", locale: "en-IN" };
    case "USD":
      return { symbol: "$", locale: "en-US" };
    case "GBP":
      return { symbol: "£", locale: "en-GB" };
    case "EUR":
      return { symbol: "€", locale: "de-DE" };
    default:
      return { symbol: "₹", locale: "en-IN" };
  }
}

export function buildStripeLineItem(params: {
  tier: TreeTier;
  duration: ContractDuration;
  currency: CurrencyCode;
  pricing: PricingBreakdown;
  phaseLabel: string;
}) {
  const { tier, currency, pricing, phaseLabel } = params;
  const unitAmount = formatAmountForStripe(pricing.prebookingAmountPaise, currency);

  return {
    quantity: 1,
    price_data: {
      currency: currency.toLowerCase(),
      unit_amount: unitAmount,
      product_data: {
        name: `${phaseLabel} — ${tier} (${pricing.years}-season stewardship)`,
        description: `Non-refundable reservation securing allocation priority. Annual stewardship billed separately after assignment.`,
      },
    },
  };
}

export function stripePaymentMethodTypes(currency: CurrencyCode): CheckoutPaymentMethodType[] {
  if (currency === "INR") {
    return ["card", "upi"];
  }
  return ["card"];
}
