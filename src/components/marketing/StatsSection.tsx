"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";

const METRICS = [
  { value: "150", label: "Standing canopy agreements", suffix: "" },
  { value: "87", label: "Active stewards", suffix: "+" },
  { value: "3", label: "Hospitality visits / year", suffix: "" },
  { value: "100%", label: "Harvest transferred", suffix: "" },
] as const;

export function StatsSection() {
  return (
    <section className="relative bg-[var(--obsidian-900)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(6rem,11vw,10rem)]">
      <ScrollReveal className="mx-auto max-w-[1200px] text-center">
        <p className="font-km-mono text-[0.65rem] tracking-[0.26em] text-[color:var(--gold-light)]">FIELD TELEMETRY</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-5 text-[clamp(2rem,4vw,3.25rem)] font-light text-[color:var(--ivory-50)]">
          Numbers with lineage.
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-body)] text-[0.92rem] font-light text-[color:rgba(253,252,248,0.42)]">
          Figures quoted reflect present grove stewardship — published for transparency, not vanity metrics.
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto mt-16 grid max-w-[1100px] gap-px bg-[color:rgba(253,252,248,0.08)] md:grid-cols-4" threshold={0.08}>
        {METRICS.map((m) => (
          <div
            key={m.label}
            data-cursor="hover"
            className="flex flex-col gap-3 bg-[var(--obsidian-900)] px-8 py-10 text-center md:text-left"
          >
            <p className="stat-number font-km-mono text-[clamp(2rem,4vw,3rem)] tracking-tight text-[color:var(--ivory-50)]">
              {m.value}
              {m.suffix ? (
                <span className="text-[color:var(--gold-primary)]">{m.suffix}</span>
              ) : null}
            </p>
            <p className="font-km-mono text-[0.62rem] uppercase tracking-[0.18em] text-[color:rgba(253,252,248,0.38)]">
              {m.label}
            </p>
          </div>
        ))}
      </ScrollReveal>

      <ScrollReveal className="mx-auto mt-16 max-w-3xl border-l border-[color:var(--gold-primary)] px-8">
        <blockquote className="font-[family-name:var(--font-heading)] text-xl font-light italic leading-relaxed text-[color:rgba(253,252,248,0.78)] sm:text-2xl">
          &ldquo;We don&apos;t mass-produce stewardship. Every Kesar tree gets a name, a number, and a phone call before
          harvest.&rdquo;
        </blockquote>
        <figcaption className="mt-5 font-km-mono text-[0.62rem] tracking-[0.12em] text-[color:rgba(253,252,248,0.45)]">
          <span className="text-[color:var(--gold-light)]">Bharatbhai Solanki</span> · Lead orchard agronomist · 22 seasons in Gir
        </figcaption>
      </ScrollReveal>
    </section>
  );
}
