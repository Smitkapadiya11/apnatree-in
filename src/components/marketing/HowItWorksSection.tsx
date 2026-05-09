import Link from "next/link";
import { ArrowUpRight, Calendar, Leaf, Package } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { PremiumButton } from "@/components/ui/PremiumButton";

const STEPS = [
  {
    icon: Calendar,
    badge: "Phase 1",
    title: "Pre-book your tree",
    body: "Stripe Checkout locks allocation with a modest reservation fee. Currency-aware, deposit-only — fully refundable until allotment.",
  },
  {
    icon: Leaf,
    badge: "Phase 2",
    title: "Annual stewardship",
    body: "Annual rent activates your tree, triggers bi-weekly canopy media, and unlocks three complimentary on-site visits.",
  },
  {
    icon: Package,
    badge: "Harvest",
    title: "Doorstep delivery",
    body: "Pack-house weights drive zoned freight. A second Stripe Checkout settles shipping; couriers handle the last kilometre.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative section-luxe">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[80%]"
        style={{ background: "var(--gradient-gold)", opacity: 0.45 }}
      />
      <ScrollReveal className="container-luxe text-center">
        <p className="eyebrow">Operating cadence</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl text-[color:var(--brand-forest)]">
          Three movements, one harvest
        </h2>
        <p className="text-[color:var(--muted-foreground)] mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed">
          A grove-to-doorstep arc designed by farmers and choreographed by software — every milestone documented before the next begins.
        </p>
      </ScrollReveal>

      <StaggerGroup className="container-luxe mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <StaggerItem key={step.title}>
            <article className="group relative h-full overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--brand-gold)]/15 bg-[color:var(--brand-ivory)] p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-luxe)]">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--brand-gold) 30%, transparent), transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div
                  className="inline-flex size-12 items-center justify-center rounded-full text-[color:var(--brand-cream)]"
                  style={{ background: "var(--gradient-gold)" }}
                  aria-hidden
                >
                  <step.icon className="size-5" />
                </div>
                <span className="font-[family-name:var(--font-heading)] text-5xl text-[color:var(--brand-forest)]/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="eyebrow mt-6">{step.badge}</p>
              <h3 className="font-[family-name:var(--font-heading)] mt-2 text-2xl text-[color:var(--brand-forest)]">
                {step.title}
              </h3>
              <p className="text-[color:var(--muted-foreground)] mt-4 text-sm leading-relaxed">{step.body}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <ScrollReveal className="container-luxe mt-12 flex justify-center">
        <PremiumButton href="/how-it-works" tone="forest" size="lg" iconRight={<ArrowUpRight className="size-4" />}>
          Read the full playbook
        </PremiumButton>
      </ScrollReveal>

      {/* Compatibility shim — the previous landing page imported this component as `HowItWorksHome`. */}
      <Link href="/how-it-works" className="sr-only" aria-hidden>
        How it works details
      </Link>
    </section>
  );
}

export { HowItWorksSection as HowItWorksHome };
