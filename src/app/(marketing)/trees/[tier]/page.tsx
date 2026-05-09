import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContractDuration, TreeTier } from "@prisma/client";

import { BookingPanel } from "@/components/booking/BookingPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvailableCountForTier, getCachedSiteConfigValue } from "@/lib/cache/queries";
import { calculatePricing, getExpectedYieldRange, getTierLabel } from "@/lib/pricing";

export const revalidate = 1800;

const tierParams = ["small", "medium", "large"] as const;

export function generateStaticParams() {
  return tierParams.map((tier) => ({ tier }));
}

function parseTier(param: string): TreeTier | null {
  switch (param.toLowerCase()) {
    case "small":
      return TreeTier.SMALL;
    case "medium":
      return TreeTier.MEDIUM;
    case "large":
      return TreeTier.LARGE;
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: raw } = await params;
  const tier = parseTier(raw);
  if (!tier) return { title: "Tree tier" };

  const meta: Record<TreeTier, { title: string; description: string }> = {
    SMALL: {
      title: "Small Kesar Mango Tree (3-Year) | ApnaTree.in",
      description:
        "Rent a 3-year-old Kesar mango tree from Gir Forest. Expected yield 15–25kg per season. Pre-book from ₹1,000.",
    },
    MEDIUM: {
      title: "Medium Kesar Mango Tree (5-Year) | ApnaTree.in",
      description:
        "Rent a 5-year-old Kesar mango tree from Gir Forest. Expected yield 30–50kg per season. Pre-book from ₹2,500.",
    },
    LARGE: {
      title: "Large Kesar Mango Tree (8-Year) | ApnaTree.in",
      description:
        "Rent an 8-year-old Kesar mango tree from Gir Forest. Expected yield 60–100kg per season. Pre-book from ₹5,000.",
    },
  };

  const selected = meta[tier];
  return {
    title: selected.title,
    description: selected.description,
    openGraph: {
      title: selected.title,
      description: selected.description,
      url: `https://apnatree.in/trees/${raw.toLowerCase()}`,
    },
  };
}

async function TierBookingSection({ tier }: { tier: TreeTier }) {
  const [availability, prebookingFlag] = await Promise.all([
    getAvailableCountForTier(tier),
    getCachedSiteConfigValue("prebooking_open"),
  ]);

  const initialPricing = calculatePricing(tier, ContractDuration.ONE_YEAR);

  return (
    <section className="border-border mt-12 rounded-3xl border bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] p-6 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-primary text-xs tracking-[0.35em] uppercase">Availability pulse</p>
          <p className="font-[family-name:var(--font-heading)] text-3xl">{availability} trees ready</p>
        </div>
        <div className="text-muted-foreground text-sm">
          Pre-booking gate ·{" "}
          <span className="text-foreground font-semibold">
            {prebookingFlag === "true" ? "Open" : "Paused — concierge queue"}
          </span>
        </div>
      </div>

      {prebookingFlag !== "true" ? (
        <p className="text-muted-foreground mt-6 text-sm">
          We&apos;re balancing allocations. Join the waitlist via Contact while our stewardship desk reviews capacity.
        </p>
      ) : availability <= 0 ? (
        <p className="text-muted-foreground mt-6 text-sm">
          This tier is fully subscribed. Redirecting explorers to the concierge waitlist is enabled at checkout time.
        </p>
      ) : (
        <div className="mt-8">
          <BookingPanel tier={tier} initialDuration={ContractDuration.ONE_YEAR} />
        </div>
      )}

      {!prebookingFlag || availability <= 0 ? (
        <p className="text-muted-foreground mt-4 text-xs">
          Reference pricing for transparency: pre-book {initialPricing.prebookingDisplay} · annual steward{" "}
          {initialPricing.yearlyRentDisplay}.
        </p>
      ) : null}
    </section>
  );
}

export default async function TreeTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: raw } = await params;
  const tier = parseTier(raw);
  if (!tier) {
    notFound();
  }

  const pricing = calculatePricing(tier, ContractDuration.ONE_YEAR);

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-primary text-xs tracking-[0.35em] uppercase">Reserve · {getTierLabel(tier)}</p>
      <h1 className="font-[family-name:var(--font-heading)] mt-4 text-4xl tracking-tight sm:text-5xl">
        Stewardship rooted in Gir limestone soil.
      </h1>
      <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
        Expected yield window {getExpectedYieldRange(tier)} per healthy season. Pricing honors{" "}
        <span className="text-foreground font-semibold">calculatePricing()</span> — no rogue rupee math.
      </p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
          <dt className="text-muted-foreground text-xs uppercase">Pre-book</dt>
          <dd className="font-[family-name:var(--font-heading)] text-2xl">{pricing.prebookingDisplay}</dd>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
          <dt className="text-muted-foreground text-xs uppercase">Annual stewardship</dt>
          <dd className="font-[family-name:var(--font-heading)] text-2xl">{pricing.yearlyRentDisplay}</dd>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
          <dt className="text-muted-foreground text-xs uppercase">Contract arc (sample 1yr)</dt>
          <dd className="font-[family-name:var(--font-heading)] text-2xl">{pricing.totalDisplay}</dd>
        </div>
      </dl>

      <Suspense
        fallback={
          <div className="mt-12 space-y-4">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        }
      >
        <TierBookingSection tier={tier} />
      </Suspense>
    </article>
  );
}
