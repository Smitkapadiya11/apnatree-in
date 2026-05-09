"use client";

import Link from "next/link";
import { ArrowUpRight, BadgePercent, Calendar, Leaf, Truck } from "lucide-react";

import { VideoBackground } from "@/components/shared/VideoBackground";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { PremiumButton } from "@/components/ui/PremiumButton";

const STEPS = [
  {
    icon: Calendar,
    badge: "Phase 1",
    title: "Pre-book your tree",
    body: "Stripe Checkout locks allocation with a modest reservation fee — currency-aware, deposit-only, refundable until allotment closes.",
  },
  {
    icon: Leaf,
    badge: "Phase 2",
    title: "Annual stewardship",
    body: "Rent activates the canopy, unlocks bi-weekly film from UploadThing, and reserves three complimentary Gir hospitality visits.",
  },
  {
    icon: Truck,
    badge: "Harvest",
    title: "Doorstep cadence",
    body: "Pack-house weights drive zoned freight; a second checkout settles shipping so couriers never improvise surcharges.",
  },
  {
    icon: BadgePercent,
    badge: "Always-on",
    title: "Transparent ledger",
    body: "Contracts, tree codes, and payout milestones stay mirrored in your dashboard — concierge replies inherit the same audit trail.",
  },
] as const;

type HowItWorksSceneProps = {
  videoSrc: string | null;
  posterSrc: string;
};

export function HowItWorksScene({ videoSrc, posterSrc }: HowItWorksSceneProps) {
  return (
    <section id="how-it-works" className="relative overflow-hidden">
      <VideoBackground
        src={videoSrc}
        fallbackImage={posterSrc}
        poster={posterSrc}
        overlay="forest"
        overlayIntensity={0.84}
        className="min-h-[720px] py-20 sm:py-24 lg:min-h-[760px] lg:py-28"
      >
        <ScrollReveal className="container-luxe text-center text-[color:var(--brand-cream)]">
          <p className="eyebrow text-[color:var(--brand-gold-light)]">Operating cadence</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            Four movements, one harvest
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--brand-cream)]/82 sm:text-lg">
            Grove-to-doorstep choreography drafted by farmers, enforced by software — each milestone documented before the next begins.
          </p>
        </ScrollReveal>

        <StaggerGroup className="container-luxe mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, index) => (
            <StaggerItem key={step.title}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-white/18 bg-white/12 p-7 shadow-[0_25px_65px_rgba(5,12,5,0.38)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--brand-gold) 35%, transparent), transparent 72%)",
                  }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className="inline-flex size-12 items-center justify-center rounded-full text-[color:var(--brand-forest)] shadow-[var(--shadow-gold)]"
                    style={{ background: "var(--gradient-gold)" }}
                    aria-hidden
                  >
                    <step.icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-[family-name:var(--font-heading)] text-5xl text-white/18">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="eyebrow mt-5 text-[color:var(--brand-gold-light)] !tracking-[0.28em]">{step.badge}</p>
                <h3 className="font-[family-name:var(--font-heading)] mt-3 text-2xl text-[color:var(--brand-cream)]">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--brand-cream)]/78">{step.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal className="container-luxe mt-14 flex justify-center">
          <PremiumButton href="/how-it-works" tone="glass" size="lg" iconRight={<ArrowUpRight className="size-4" />}>
            Read the full playbook
          </PremiumButton>
        </ScrollReveal>

        <Link href="/how-it-works" className="sr-only" aria-hidden>
          How it works details
        </Link>
      </VideoBackground>
    </section>
  );
}
