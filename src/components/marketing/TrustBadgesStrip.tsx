import { ShieldCheck, Sparkles, TreeDeciduous, Truck } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";

const BADGES = [
  {
    icon: TreeDeciduous,
    title: "Verified canopy",
    copy: "Contracts mapped to laser-coded trees inside Gir buffer forests.",
  },
  {
    icon: ShieldCheck,
    title: "Stripe settlements",
    copy: "PCI-ready checkout for every stewardship milestone.",
  },
  {
    icon: Sparkles,
    title: "Proof cadence",
    copy: "Bi-weekly UploadThing drops land straight in your dashboard.",
  },
  {
    icon: Truck,
    title: "Harvest logistics",
    copy: "Season-close manifests route packing → freight without surprise fees.",
  },
];

export function TrustBadgesStrip() {
  return (
    <section
      className="relative border-y border-[color:var(--brand-gold)]/25"
      style={{ backgroundColor: "#0D1A0D" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{ background: "var(--gradient-gold)" }}
      />
      <ScrollReveal className="container-luxe py-16">
        <p className="eyebrow text-center text-[color:var(--brand-gold-light)]">Built on guardrails</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-3 text-center text-3xl tracking-tight text-[color:var(--brand-cream)] sm:text-4xl">
          Trust that scales with the harvest
        </h2>
      </ScrollReveal>
      <StaggerGroup className="container-luxe grid gap-8 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((badge) => (
          <StaggerItem key={badge.title} className="space-y-3">
            <div
              className="inline-flex size-12 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/35 bg-white/[0.06] text-[color:var(--brand-gold-light)] backdrop-blur-sm"
              aria-hidden
            >
              <badge.icon className="size-5" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl text-[color:var(--brand-cream)]">{badge.title}</h3>
            <p className="text-sm leading-relaxed text-[color:var(--brand-cream)]/72">{badge.copy}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

/** Backwards-compat re-export so existing imports continue to compile. */
export { TrustBadgesStrip as TrustBadgeStrip };
