import "server-only";

import Stripe from "stripe";

import { env } from "@/lib/env";

/**
 * Server-only Stripe SDK. Never import this module from Client Components or shared client bundles.
 */
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
});
