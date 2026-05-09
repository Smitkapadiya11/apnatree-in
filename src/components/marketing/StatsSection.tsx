import { getCachedSiteConfigValue } from "@/lib/cache/queries";

import { AnimatedCounter } from "@/components/marketing/AnimatedCounter";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";

async function resolveStat(key: string, fallback: number) {
  const raw = await getCachedSiteConfigValue(key);
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

const QUOTE = {
  body: "We don't mass-produce stewardship. Every Kesar tree gets a name, a number, and a phone call before harvest.",
  author: "Bharatbhai Solanki",
  role: "Lead orchard agronomist · 22 years in Gir",
};

export async function StatsSection() {
  const [trees, renters, visits, kgDelivered] = await Promise.all([
    resolveStat("marketing_stat_trees", 150),
    resolveStat("marketing_stat_renters", 87),
    resolveStat("marketing_stat_visits_quota", 3),
    resolveStat("marketing_stat_kg_delivered", 4200),
  ]);

  return (
    <section
      className="relative section-luxe overflow-hidden text-[color:var(--brand-cream)]"
      style={{ background: "var(--gradient-hero)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--brand-gold) 25%, transparent), transparent 55%), radial-gradient(ellipse at 80% 90%, color-mix(in oklab, var(--brand-gold-light) 22%, transparent), transparent 60%)",
        }}
      />

      <ScrollReveal className="container-luxe relative text-center">
        <p className="eyebrow text-[color:var(--brand-gold-light)]">Numbers from SiteConfig</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl">
          Transparency, cached and ISR-ready
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--brand-cream)]/80">
          Every metric below revalidates on a five-minute cadence — sourced from production telemetry, not marketing copy.
        </p>
      </ScrollReveal>

      <StaggerGroup className="container-luxe relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <AnimatedCounter label="Standing trees" value={trees} suffix="+" />
        </StaggerItem>
        <StaggerItem>
          <AnimatedCounter label="Active renters" value={renters} suffix="+" />
        </StaggerItem>
        <StaggerItem>
          <AnimatedCounter label="Annual visits" value={visits} suffix="" />
        </StaggerItem>
        <StaggerItem>
          <AnimatedCounter label="Kg delivered" value={kgDelivered} suffix="+" />
        </StaggerItem>
      </StaggerGroup>

      <ScrollReveal className="container-luxe relative mt-20 max-w-3xl">
        <figure className="border-l-2 border-[color:var(--brand-gold)] pl-6 sm:pl-10">
          <blockquote className="font-[family-name:var(--font-heading)] text-2xl italic leading-relaxed text-[color:var(--brand-cream)] sm:text-3xl">
            “{QUOTE.body}”
          </blockquote>
          <figcaption className="mt-5 text-sm text-[color:var(--brand-cream)]/75">
            <span className="font-semibold">{QUOTE.author}</span> · {QUOTE.role}
          </figcaption>
        </figure>
      </ScrollReveal>
    </section>
  );
}
