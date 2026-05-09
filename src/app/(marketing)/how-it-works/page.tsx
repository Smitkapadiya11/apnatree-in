import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const revalidate = 43200;

export const metadata: Metadata = {
  title: "How it works",
  description: "Timeline from Stripe pre-booking to harvest freight — every steward milestone explained.",
};

export default function HowItWorksPage() {
  return (
    <article className="mx-auto max-w-5xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Operating cadence</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">How ApnaTree flows</h1>
      </header>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl">1 · Pre-booking & Stripe Checkout</h2>
        <p className="text-muted-foreground leading-relaxed">
          Choose tier + arc, authenticate through NextAuth, and launch Checkout with pessimistic 30-minute locks. Metadata carries contract identifiers for webhook reconciliation without trusting client payloads.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl">2 · Assignment & Phase 2 billing</h2>
        <p className="text-muted-foreground leading-relaxed">
          Operations assigns a physical tree, toggling availability tags for ISR caches. Annual stewardship invoices spawn RentPayment rows before redirecting to Stripe for ANNUAL_RENT sessions — year-one completion activates contracts.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl">3 · Media observatory</h2>
        <p className="text-muted-foreground leading-relaxed">
          Field agents authenticate via UploadThing middleware (ADMIN + FIELD_AGENT roles). Sharp blur placeholders persist beside MediaUpdate rows so dashboard grids stream instantly with next/image.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl">4 · Visits & harvest freight</h2>
        <p className="text-muted-foreground leading-relaxed">
          Complimentary visits honor yearly quotas with capacity-aware calendars. Harvest timelines advance until PACKAGED triggers zoned freight quotes and dedicated SHIPPING Checkout sessions.
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/trees" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10")}>
          Explore tiers
        </Link>
        <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-10")}>
          Concierge
        </Link>
      </div>
    </article>
  );
}
