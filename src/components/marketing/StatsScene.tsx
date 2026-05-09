"use client";

import { VideoBackground } from "@/components/shared/VideoBackground";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";

import { AnimatedCounter } from "@/components/marketing/AnimatedCounter";

export type StatsQuote = {
  body: string;
  author: string;
  role: string;
};

type StatsSceneProps = {
  trees: number;
  renters: number;
  visits: number;
  kgDelivered: number;
  groveYears: number;
  videoSrc: string | null;
  fallbackImage: string;
  quote: StatsQuote;
};

const pill =
  "rounded-[28px] border border-white/22 bg-white/10 px-5 py-7 text-[color:var(--brand-cream)] shadow-[0_28px_70px_rgba(5,12,5,0.42)] backdrop-blur-xl sm:px-7 sm:py-9";

export function StatsScene({
  trees,
  renters,
  visits,
  kgDelivered,
  groveYears,
  videoSrc,
  fallbackImage,
  quote,
}: StatsSceneProps) {
  return (
    <section className="relative overflow-hidden text-[color:var(--brand-cream)]">
      <VideoBackground
        src={videoSrc}
        fallbackImage={fallbackImage}
        poster={fallbackImage}
        overlay="dark"
        overlayIntensity={0.72}
        className="min-h-[560px] py-20 sm:min-h-[620px] sm:py-24 lg:min-h-[640px]"
      >
        <div className="texture-grain-dark pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden />

        <ScrollReveal className="container-luxe relative text-center">
          <p className="eyebrow text-[color:var(--brand-gold-light)]">Proof from the grove</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            The numbers don&apos;t lie
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--brand-cream)]/78 sm:text-lg">
            Telemetry-backed counters refresh with our caches — the same signals your dashboard trusts after checkout.
          </p>
        </ScrollReveal>

        <StaggerGroup className="container-luxe relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <StaggerItem className={pill}>
            <AnimatedCounter label="Standing trees" value={trees} suffix="+" />
          </StaggerItem>
          <StaggerItem className={pill}>
            <AnimatedCounter label="Active renters" value={renters} suffix="+" />
          </StaggerItem>
          <StaggerItem className={pill}>
            <AnimatedCounter label="Annual visits" value={visits} suffix="" />
          </StaggerItem>
          <StaggerItem className={pill}>
            <AnimatedCounter label="Kg delivered" value={kgDelivered} suffix="+" />
          </StaggerItem>
          <StaggerItem className={`${pill} sm:col-span-2 lg:col-span-1`}>
            <AnimatedCounter label="Grove seasons stewarded" value={groveYears} suffix="+" />
          </StaggerItem>
        </StaggerGroup>

        <ScrollReveal className="container-luxe relative mt-16 max-w-3xl lg:mt-20">
          <figure className="pull-quote border-l-2 border-[color:var(--brand-gold)] pl-6 sm:pl-10">
            <blockquote className="font-[family-name:var(--font-heading)] text-2xl italic leading-relaxed text-[color:var(--brand-cream)] sm:text-3xl">
              &ldquo;{quote.body}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-[color:var(--brand-cream)]/75">
              <span className="font-semibold">{quote.author}</span> · {quote.role}
            </figcaption>
          </figure>
        </ScrollReveal>
      </VideoBackground>
    </section>
  );
}
