import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { ContractDuration, TreeTier } from "@prisma/client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { getCachedTreeAvailability } from "@/lib/cache/queries";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";
import { calculatePricing, getExpectedYieldRange, getTierLabel } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const TIERS = [TreeTier.SMALL, TreeTier.MEDIUM, TreeTier.LARGE] as const;

const TIER_DETAILS: Record<TreeTier, {
  slug: string;
  age: string;
  pitch: string;
  highlights: string[];
  featured?: boolean;
}> = {
  SMALL: {
    slug: "small",
    age: "3-year canopy",
    pitch: "An approachable Kesar steward — perfect for first-time renters who want to learn the rhythm.",
    highlights: ["15–25 kg yield window", "Bi-weekly chronicles", "Annual Gir hospitality"],
  },
  MEDIUM: {
    slug: "medium",
    age: "5-year canopy",
    pitch: "Our most-loved tier. Generous yield, predictable timeline, and the most flexible contract terms.",
    highlights: ["30–50 kg yield window", "Priority harvest packing", "Concierge visit slots"],
    featured: true,
  },
  LARGE: {
    slug: "large",
    age: "8-year canopy",
    pitch: "A flagship grove veteran. Heirloom-grade fruit, dedicated agronomist, premium freight.",
    highlights: ["60–100 kg yield window", "Dedicated field agronomist", "Premium courier handoff"],
  },
};

function tierImage(tier: TreeTier): string {
  const tierIndex = TIERS.indexOf(tier);
  const orchard = FARM_MEDIA.orchard;
  if (orchard.length === 0) return FARM_MEDIA_FALLBACKS.gallery;
  return orchard[tierIndex % orchard.length];
}

export async function TreeTierCards() {
  const availability = await getCachedTreeAvailability();

  return (
    <section id="trees" className="relative section-luxe surface-cream">
      <ScrollReveal className="container-luxe text-center">
        <p className="eyebrow">Tier clarity</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl text-[color:var(--brand-forest)]">
          Choose your canopy arc
        </h2>
        <p className="text-[color:var(--muted-foreground)] mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed">
          Availability refreshes hourly · pricing calculated from <code className="text-[color:var(--brand-forest)]">calculatePricing()</code> with no rogue rupee math.
        </p>
      </ScrollReveal>

      <StaggerGroup className="container-luxe mt-16 grid gap-8 md:grid-cols-3">
        {TIERS.map((tier) => {
          const detail = TIER_DETAILS[tier];
          const pricing = calculatePricing(tier, ContractDuration.ONE_YEAR);
          const open = availability[tier];
          const soldOut = !open;
          const image = tierImage(tier);

          return (
            <StaggerItem key={tier}>
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border bg-[color:var(--brand-ivory)] shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-luxe)]",
                  detail.featured
                    ? "border-[color:var(--brand-gold)]/45 shadow-[var(--shadow-luxe)]"
                    : "border-[color:var(--brand-forest)]/10"
                )}
              >
                {detail.featured ? (
                  <div
                    className="absolute right-6 top-6 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-cream)]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <Sparkles className="size-3" aria-hidden /> Most loved
                  </div>
                ) : null}

                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${getTierLabel(tier)} mango canopy`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-forest)]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-[color:var(--brand-cream)]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold-light)]">{detail.age}</p>
                      <p className="font-[family-name:var(--font-heading)] text-2xl">{getTierLabel(tier).replace(/\s*\(.*\)$/, "")}</p>
                    </div>
                    <span className="rounded-full bg-black/35 px-3 py-1 text-xs backdrop-blur-md">
                      {soldOut ? "Sold out" : `${open} open`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 p-7">
                  <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed">{detail.pitch}</p>

                  <ul className="space-y-2 text-sm">
                    {detail.highlights.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[color:var(--brand-forest)]">
                        <Check className="mt-0.5 size-4 text-[color:var(--brand-gold-dark)]" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-2xl border border-[color:var(--brand-forest)]/10 bg-[color:var(--brand-cream)] p-4">
                    <dl className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--brand-forest)]/60">
                      <div>
                        <dt>Pre-book</dt>
                        <dd className="font-[family-name:var(--font-heading)] mt-1 text-2xl tracking-normal text-[color:var(--brand-forest)]">
                          {pricing.prebookingDisplay}
                        </dd>
                      </div>
                      <div>
                        <dt>Annual</dt>
                        <dd className="font-[family-name:var(--font-heading)] mt-1 text-2xl tracking-normal text-[color:var(--brand-forest)]">
                          {pricing.yearlyRentDisplay}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-[color:var(--muted-foreground)]">
                      Yield window {getExpectedYieldRange(tier)} · 100% delivered
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    <PremiumButton
                      href={`/trees/${detail.slug}`}
                      tone={detail.featured ? "gold" : "forest"}
                      size="md"
                      iconRight={<ArrowRight className="size-4" />}
                    >
                      {soldOut ? "Join waitlist" : "Reserve"}
                    </PremiumButton>
                    <Link
                      href={`/trees/${detail.slug}`}
                      className="text-xs uppercase tracking-[0.25em] text-[color:var(--brand-forest)]/65 transition-colors hover:text-[color:var(--brand-gold-dark)]"
                    >
                      Tier details
                    </Link>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}

export { TreeTierCards as TreeTiersSection };
