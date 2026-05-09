import { Suspense } from "react";

import { FarmGallery } from "@/components/marketing/FarmGallery";
import { FarmStorySection } from "@/components/marketing/FarmStorySection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { TreeTierCards } from "@/components/marketing/TreeTierCards";
import { TrustBadgesStrip } from "@/components/marketing/TrustBadgesStrip";
import { WaitlistSection } from "@/components/marketing/WaitlistSection";
import { Skeleton } from "@/components/ui/skeleton";

function TierLoading() {
  return (
    <div className="section-luxe bg-[color:var(--brand-forest-deep)]">
      <div className="container-luxe">
        <div className="mx-auto h-10 w-72 animate-pulse rounded-full bg-white/10" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Skeleton className="h-[520px] animate-pulse rounded-[var(--radius-2xl)] bg-white/10" />
          <Skeleton className="h-[520px] animate-pulse rounded-[var(--radius-2xl)] bg-white/10" />
          <Skeleton className="h-[520px] animate-pulse rounded-[var(--radius-2xl)] bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="section-luxe bg-[color:var(--brand-forest-deep)]">
      <Skeleton className="mx-auto h-52 max-w-5xl animate-pulse rounded-[var(--radius-2xl)] bg-white/10" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadgesStrip />

      <HowItWorksSection />

      <FarmStorySection />

      <Suspense fallback={<TierLoading />}>
        <TreeTierCards />
      </Suspense>

      <Suspense fallback={<StatsLoading />}>
        <StatsSection />
      </Suspense>

      <FarmGallery />

      <TestimonialsSection />

      <WaitlistSection />
    </>
  );
}
