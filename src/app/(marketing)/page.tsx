import { Suspense } from "react";

import { FarmGallery } from "@/components/marketing/FarmGallery";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { TreeTierCards } from "@/components/marketing/TreeTierCards";
import { TrustBadgesStrip } from "@/components/marketing/TrustBadgesStrip";
import { WaitlistSection } from "@/components/marketing/WaitlistSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";

function TierLoading() {
  return (
    <div className="container-luxe section-luxe">
      <div className="mx-auto h-10 w-72 animate-pulse rounded-full bg-[color:var(--muted)]" />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <Skeleton className="h-[520px] animate-pulse rounded-[var(--radius-2xl)]" />
        <Skeleton className="h-[520px] animate-pulse rounded-[var(--radius-2xl)]" />
        <Skeleton className="h-[520px] animate-pulse rounded-[var(--radius-2xl)]" />
      </div>
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="section-luxe">
      <Skeleton className="mx-auto h-44 max-w-5xl animate-pulse rounded-[var(--radius-2xl)]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadgesStrip />

      <HowItWorksSection />

      <Suspense fallback={<TierLoading />}>
        <TreeTierCards />
      </Suspense>

      <Suspense fallback={<StatsLoading />}>
        <StatsSection />
      </Suspense>

      <FarmGallery />

      <TestimonialsSection />

      <ScrollReveal className="surface-cream">
        <section className="container-luxe section-luxe text-center">
          <p className="eyebrow">The ApnaTree Promise</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl text-[color:var(--brand-forest)]">
            Luxury rooted in transparency
          </h2>
          <p className="text-[color:var(--muted-foreground)] mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed">
            Every renter receives a coded tree, legally documented harvest rights, concierge-grade visits, and media proof from the same soil that feeds the lions of Gir.
          </p>
        </section>
      </ScrollReveal>

      <WaitlistSection />
    </>
  );
}
