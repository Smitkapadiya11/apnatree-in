import Image from "next/image";
import { Quote } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";

type Testimonial = {
  body: string;
  author: string;
  meta: string;
  highlight?: boolean;
};

const TESTIMONIALS: Testimonial[] = [
  {
    body: "The bi-weekly chronicles felt like postcards from a friend tending our family. By the time the crate landed in Bengaluru, we already knew every blossom.",
    author: "Anjali & Pranav",
    meta: "Medium tier · Bengaluru steward",
    highlight: true,
  },
  {
    body: "I rented a single tree for my mother. The visit on her birthday — the way the team welcomed us with limewater under our own canopy — that stayed.",
    author: "Captain Devraj Singh",
    meta: "Small tier · Pune steward",
  },
  {
    body: "I asked for an agronomist call before signing. They put Bharatbhai on the phone within an hour. The yield on our Large tree exceeded the upper estimate by 14%.",
    author: "Niloufer K.",
    meta: "Large tier · Mumbai steward",
  },
];

export function TestimonialsSection() {
  const portrait = FARM_MEDIA.team[0] ?? FARM_MEDIA_FALLBACKS.gallery;

  return (
    <section className="relative section-luxe bg-[color:var(--brand-ivory)]">
      <ScrollReveal className="container-luxe text-center">
        <p className="eyebrow">Postcards from stewards</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl text-[color:var(--brand-forest)]">
          Renters who recognise the soil
        </h2>
      </ScrollReveal>

      <StaggerGroup className="container-luxe mt-16 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <StaggerItem
            key={testimonial.author}
            className={index === 0 ? "lg:col-span-1" : "lg:col-span-1"}
          >
            <article
              className={
                "relative flex h-full flex-col gap-6 overflow-hidden rounded-[var(--radius-2xl)] border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-luxe)] " +
                (testimonial.highlight
                  ? "border-[color:var(--brand-gold)]/35 bg-[color:var(--brand-cream)] shadow-[var(--shadow-soft)]"
                  : "border-[color:var(--brand-forest)]/10 bg-white shadow-[var(--shadow-soft)]")
              }
            >
              <Quote
                aria-hidden
                className="size-7 text-[color:var(--brand-gold)]"
              />
              <p className="font-[family-name:var(--font-heading)] text-xl leading-relaxed text-[color:var(--brand-forest)]">
                “{testimonial.body}”
              </p>
              <footer className="mt-auto">
                <p className="font-semibold text-sm text-[color:var(--brand-forest)]">{testimonial.author}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">{testimonial.meta}</p>
              </footer>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <ScrollReveal className="container-luxe mt-20 grid gap-10 rounded-[var(--radius-2xl)] border border-[color:var(--brand-gold)]/20 bg-[color:var(--brand-forest)] p-8 text-[color:var(--brand-cream)] sm:p-12 lg:grid-cols-[auto,1fr] lg:items-center">
        <div className="relative size-32 overflow-hidden rounded-full ring-4 ring-[color:var(--brand-gold)]/40 sm:size-40 lg:size-48">
          <Image
            src={portrait}
            alt="Field steward portrait"
            fill
            sizes="(max-width: 768px) 128px, 192px"
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="eyebrow text-[color:var(--brand-gold-light)]">Live concierge</p>
          <p className="font-[family-name:var(--font-heading)] text-3xl leading-snug">
            Talk to a real grove keeper before you commit. Calls scheduled inside 24 hours, always in your timezone.
          </p>
          <p className="text-sm text-[color:var(--brand-cream)]/80">
            Concierge desk · Mon–Sat · 9am–7pm IST
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
