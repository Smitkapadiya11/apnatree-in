import { Suspense } from "react";

import { ConciergeStrip } from "@/components/marketing/ConciergeStrip";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HorizontalChronicles } from "@/components/marketing/HorizontalChronicles";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { ManifestoSection } from "@/components/marketing/ManifestoSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { TreeTierCards } from "@/components/marketing/TreeTierCards";
import { TrustTicker } from "@/components/marketing/TrustTicker";
import { WaitlistSection } from "@/components/marketing/WaitlistSection";
import { Skeleton } from "@/components/ui/skeleton";

function TierLoading() {
  return (
    <div className="section-luxe bg-[var(--obsidian-950)] px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto h-10 w-72 animate-pulse rounded-[2px] bg-[rgba(253,252,248,0.06)]" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Skeleton className="h-[560px] animate-pulse rounded-[16px] bg-[rgba(253,252,248,0.06)]" />
          <Skeleton className="h-[560px] animate-pulse rounded-[16px] bg-[rgba(253,252,248,0.06)]" />
          <Skeleton className="h-[560px] animate-pulse rounded-[16px] bg-[rgba(253,252,248,0.06)]" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustTicker />
      <ManifestoSection />
      <HowItWorksSection />
      <HorizontalChronicles />
      <Suspense fallback={<TierLoading />}>
        <TreeTierCards />
      </Suspense>
      <StatsSection />
      <TestimonialsSection />
      <ConciergeStrip />
      <WaitlistSection />
    </>
  );
}
