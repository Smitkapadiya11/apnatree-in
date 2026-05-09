"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { VideoBackground } from "@/components/shared/VideoBackground";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { cn } from "@/lib/utils";

export type TierDeckItem = {
  tierKey: string;
  slug: string;
  labelShort: string;
  age: string;
  pitch: string;
  highlights: string[];
  featured?: boolean;
  soldOut: boolean;
  openCount: number;
  prebookingDisplay: string;
  yearlyRentDisplay: string;
  yieldRange: string;
  videoSrc: string | null;
  posterSrc: string;
};

type TreeTierDeckProps = {
  tiers: TierDeckItem[];
};

function TierCard({ tier }: { tier: TierDeckItem }) {
  return (
    <article
      className={cn(
        "group relative flex h-full min-w-[min(88vw,380px)] snap-center flex-col overflow-hidden rounded-[var(--radius-2xl)] border shadow-[var(--shadow-soft)] transition-all duration-500 snap-always hover:-translate-y-1 hover:shadow-[var(--shadow-luxe)] lg:min-w-0",
        tier.featured
          ? "border-[color:var(--brand-gold)]/55 shadow-[var(--shadow-gold)] ring-1 ring-[color:var(--brand-gold)]/25"
          : "border-white/12 bg-white/[0.06]"
      )}
    >
      {tier.featured ? (
        <div
          className="absolute right-5 top-5 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-forest)]"
          style={{ background: "var(--gradient-gold)" }}
        >
          <Sparkles className="size-3" aria-hidden /> Most loved
        </div>
      ) : null}

      <div className="relative aspect-[5/4] w-full overflow-hidden">
        <VideoBackground
          src={tier.videoSrc}
          fallbackImage={tier.posterSrc}
          poster={tier.posterSrc}
          overlay="dark"
          overlayIntensity={tier.featured ? 0.52 : 0.62}
          className="absolute inset-0 size-full min-h-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] bg-gradient-to-t from-[color:var(--brand-forest-deep)] via-[color:var(--brand-forest-deep)]/35 to-transparent pb-5 pt-16">
          <div className="flex items-end justify-between gap-3 px-5 text-[color:var(--brand-cream)]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold-light)]">{tier.age}</p>
              <p className="font-[family-name:var(--font-heading)] text-2xl">{tier.labelShort}</p>
            </div>
            <span className="rounded-full bg-black/45 px-3 py-1 text-xs backdrop-blur-md">
              {tier.soldOut ? "Sold out" : `${tier.openCount} open`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 bg-[color:var(--brand-forest-deep)]/72 p-7 backdrop-blur-md">
        <p className="text-sm leading-relaxed text-[color:var(--brand-cream)]/78">{tier.pitch}</p>

        <ul className="space-y-2 text-sm">
          {tier.highlights.map((line) => (
            <li key={line} className="flex items-start gap-2 text-[color:var(--brand-cream)]">
              <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-gold-light)]" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-white/14 bg-white/[0.07] p-4">
          <dl className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--brand-cream)]/55">
            <div>
              <dt>Pre-book</dt>
              <dd className="font-[family-name:var(--font-heading)] mt-1 text-2xl tracking-normal text-[color:var(--brand-cream)]">
                {tier.prebookingDisplay}
              </dd>
            </div>
            <div>
              <dt>Annual</dt>
              <dd className="font-[family-name:var(--font-heading)] mt-1 text-2xl tracking-normal text-[color:var(--brand-cream)]">
                {tier.yearlyRentDisplay}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-[color:var(--brand-cream)]/58">
            Yield window {tier.yieldRange} · 100% delivered
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <PremiumButton
            href={`/trees/${tier.slug}`}
            tone={tier.featured ? "gold" : "glass"}
            size="md"
            iconRight={<ArrowRight className="size-4" />}
          >
            {tier.soldOut ? "Join waitlist" : "Reserve"}
          </PremiumButton>
          <Link
            href={`/trees/${tier.slug}`}
            className="text-xs uppercase tracking-[0.25em] text-[color:var(--brand-cream)]/60 transition-colors hover:text-[color:var(--brand-gold-light)]"
          >
            Tier details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TreeTierDeck({ tiers }: TreeTierDeckProps) {
  return (
    <section
      id="trees"
      className="texture-grain-dark relative overflow-hidden section-luxe bg-[color:var(--brand-forest-deep)] text-[color:var(--brand-cream)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[min(1120px,88vw)] opacity-60"
        style={{ background: "var(--gradient-gold)" }}
      />

      <ScrollReveal className="container-luxe text-center">
        <p className="eyebrow text-[color:var(--brand-gold-light)]">Tier clarity</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          Choose your canopy arc
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-relaxed text-[color:var(--brand-cream)]/78 sm:text-lg">
          Availability refreshes hourly · pricing flows from <code className="text-[color:var(--brand-gold-light)]">calculatePricing()</code>{" "}
          with zero improvised rupee math.
        </p>
      </ScrollReveal>

      <div className="mt-14 lg:hidden">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6">
          {tiers.map((tier) => (
            <TierCard key={tier.tierKey} tier={tier} />
          ))}
        </div>
      </div>

      <StaggerGroup className="container-luxe mt-14 hidden gap-8 lg:grid lg:grid-cols-3">
        {tiers.map((tier) => (
          <StaggerItem key={tier.tierKey}>
            <TierCard tier={tier} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
