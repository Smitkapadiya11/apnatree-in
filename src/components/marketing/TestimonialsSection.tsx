"use client";

import Image from "next/image";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { KINGSMAN_MEDIA } from "@/lib/kingsman-media";

type Testimonial = {
  body: string;
  author: string;
  meta: string;
  image: string;
};

const ROWS: Testimonial[] = [
  {
    body: "The bi-weekly chronicles felt like postcards from a friend tending our family. By the time the crate landed in Bengaluru, we already knew every blossom.",
    author: "Anjali & Pranav",
    meta: "MEDIUM TIER · BENGALURU STEWARD",
    image: KINGSMAN_MEDIA.grove555,
  },
  {
    body: "I rented a single tree for my mother. The visit on her birthday — the way the team welcomed us with limewater under our own canopy — that stayed.",
    author: "Captain Devraj Singh",
    meta: "SMALL TIER · PUNE STEWARD",
    image: KINGSMAN_MEDIA.grove533,
  },
  {
    body: "I asked for an agronomist call before signing. They put Bharatbhai on the phone within an hour. The yield on our Large tree exceeded the upper estimate by fourteen percent.",
    author: "Niloufer K.",
    meta: "LARGE TIER · MUMBAI STEWARD",
    image: KINGSMAN_MEDIA.grove0320,
  },
];

export function TestimonialsSection() {
  return (
    <section className="editorial-section bg-[var(--obsidian-950)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(6rem,11vw,10rem)] text-[color:var(--brand-cream)]">
      <ScrollReveal className="mx-auto max-w-[1200px] text-center">
        <p className="font-km-mono text-[0.62rem] tracking-[0.26em] text-[color:var(--gold-primary)]">EDITORIAL</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-5 text-[clamp(2rem,4vw,3.25rem)] font-light text-[color:var(--brand-cream)]">
          Voices from the ledger.
        </h2>
      </ScrollReveal>

      <div className="mx-auto mt-16 max-w-[1100px]">
        {ROWS.map((row, index) => {
          const imageLeft = index % 2 === 1;
          const quoteCol = (
            <div className={`relative flex flex-col justify-center gap-8 ${imageLeft ? "lg:order-2" : ""}`}>
              <span
                aria-hidden
                className="font-[family-name:var(--font-heading)] pointer-events-none absolute -left-2 -top-6 text-[8rem] leading-none text-[color:rgba(184,145,42,0.15)] md:left-0 md:-top-10"
              >
                “
              </span>
              <blockquote className="fade-on-scroll-km slide-up-on-scroll-km relative max-w-[520px] font-[family-name:var(--font-heading)] text-[clamp(1.45rem,2.5vw,2rem)] font-light italic leading-snug text-[color:rgba(253,252,248,0.82)]">
                {row.body}
              </blockquote>
              <div className="space-y-3">
                <div className="h-px w-8 bg-[color:var(--gold-primary)]" aria-hidden />
                <p className="font-[family-name:var(--font-body)] text-[0.9rem] font-medium text-[color:var(--brand-cream)]">
                  {row.author}
                </p>
                <p className="font-km-mono text-[0.6rem] uppercase tracking-[0.15em] text-[color:var(--gold-primary)]">{row.meta}</p>
              </div>
            </div>
          );

          const imageCol = (
            <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[8px] ${imageLeft ? "lg:order-1" : ""}`}>
              <Image src={row.image} alt="" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-[rgba(9,13,16,0.15)]" aria-hidden />
            </div>
          );

          return (
            <div key={row.author}>
              <div className="grid gap-12 py-16 lg:grid-cols-[45%_55%] lg:items-center lg:gap-16">
                {imageLeft ? (
                  <>
                    {imageCol}
                    {quoteCol}
                  </>
                ) : (
                  <>
                    {quoteCol}
                    {imageCol}
                  </>
                )}
              </div>
              {index < ROWS.length - 1 ? (
                <div className="h-px w-full bg-[rgba(184,145,42,0.18)]" aria-hidden />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
