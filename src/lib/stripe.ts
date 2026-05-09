import "server-only";

import Stripe from "stripe";

import { env } from "@/lib/env";

let stripeSingleton: Stripe | undefined;

/**
 * Lazily constructs the Stripe SDK so `next build` can finish when secrets are not injected yet
 * (for example `SKIP_ENV_VALIDATION=1` on Vercel before env vars are configured).
 */
export function getStripe(): Stripe {
  const secret = env.STRIPE_SECRET_KEY;
  if (!secret?.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY is missing or invalid.");
  }
  stripeSingleton ??= new Stripe(secret, { typescript: true });
  return stripeSingleton;
}
