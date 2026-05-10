"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function TierCardsIntro() {
  return (
    <ScrollReveal className="mx-auto max-w-[1200px] text-center">
      <p className="font-km-mono text-[0.62rem] tracking-[0.26em] text-[color:var(--gold-light)]">
        ALLOTMENT TIERS · 2025 SEASON
      </p>
      <h2 className="font-[family-name:var(--font-heading)] mt-5 text-[clamp(2.25rem,5vw,4rem)] font-light text-[color:var(--ivory-50)]">
        Choose your canopy.
      </h2>
      <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-body)] text-[0.95rem] font-light text-[color:rgba(253,252,248,0.42)]">
        Each tier mirrors a living arc on the ridge — availability refreshes hourly inside checkout.
      </p>
    </ScrollReveal>
  );
}
