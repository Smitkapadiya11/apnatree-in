import Link from "next/link";
import Image from "next/image";
import { ContractDuration, TreeTier } from "@prisma/client";

import { getCachedTreeAvailability } from "@/lib/cache/queries";
import { KINGSMAN_MEDIA } from "@/lib/kingsman-media";
import { calculatePricing, getExpectedYieldRange, getTierLabel } from "@/lib/pricing";

const TIERS = [TreeTier.SMALL, TreeTier.MEDIUM, TreeTier.LARGE] as const;

const TIER_META: Record<
  TreeTier,
  {
    slug: string;
    badge: string;
    pitchLines: string[];
    img: string;
  }
> = {
  SMALL: {
    slug: "small",
    badge: "SMALL · 3 YEARS",
    pitchLines: ["Bi-weekly canopy chronicles", "Three Gir hospitality visits", "Season-close freight settlement"],
    img: KINGSMAN_MEDIA.aerialHero,
  },
  MEDIUM: {
    slug: "medium",
    badge: "MEDIUM · 5 YEARS",
    pitchLines: ["Bi-weekly canopy chronicles", "Three Gir hospitality visits", "Season-close freight settlement"],
    img: KINGSMAN_MEDIA.grove551,
  },
  LARGE: {
    slug: "large",
    badge: "LARGE · 8 YEARS",
    pitchLines: ["Bi-weekly canopy chronicles", "Three Gir hospitality visits", "Season-close freight settlement"],
    img: KINGSMAN_MEDIA.grove553,
  },
};

export async function TreeTierCards() {
  const availability = await getCachedTreeAvailability();

  return (
    <section
      id="trees"
      className="texture-linen relative bg-[var(--obsidian-950)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(6rem,11vw,10rem)]"
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="font-km-mono text-[0.62rem] tracking-[0.26em] text-[color:var(--gold-light)]">
          ALLOTMENT TIERS · 2025 SEASON
        </p>
        <h2 className="font-[family-name:var(--font-heading)] mt-5 text-[clamp(2.25rem,5vw,4rem)] font-light text-[color:var(--ivory-50)]">
          Choose your canopy.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-body)] text-[0.95rem] font-light text-[color:rgba(253,252,248,0.42)]">
          Each tier mirrors a living arc on the ridge — availability refreshes hourly inside checkout.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1240px] gap-10 md:grid-cols-2 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const meta = TIER_META[tier];
          const pricing = calculatePricing(tier, ContractDuration.ONE_YEAR);
          const open = availability[tier];
          const soldOut = !open;
          const featured = tier === TreeTier.MEDIUM;

          return (
            <article
              key={tier}
              data-cursor="hover"
              className="group flex flex-col overflow-hidden rounded-[16px] border border-[color:rgba(253,252,248,0.06)] bg-[var(--obsidian-800)] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[color:rgba(184,145,42,0.35)] hover:shadow-[0_40px_80px_rgba(5,8,10,0.55)]"
            >
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={meta.img}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover object-[center_40%] transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute left-4 top-4 font-km-mono text-[0.55rem] tracking-[0.2em] text-[color:var(--ivory-50)]">
                  <span className="rounded-[2px] border border-[color:rgba(253,252,248,0.1)] bg-[rgba(9,13,16,0.7)] px-3 py-1.5 backdrop-blur-[8px]">
                    {meta.badge}
                  </span>
                </div>
                {featured ? (
                  <div className="pointer-events-none absolute right-4 top-4 font-km-mono text-[0.5rem] tracking-[0.22em] text-[color:var(--obsidian-950)]">
                    <span className="rounded-[2px] bg-[color:var(--gold-primary)] px-3 py-1.5">MOST LOVED</span>
                  </div>
                ) : null}
              </div>

              <div className="h-px w-full bg-[color:rgba(184,145,42,0.35)]" />

              <div className="flex flex-1 flex-col px-7 pb-8 pt-8">
                <p className="font-km-mono text-[0.6rem] tracking-[0.15em] text-[color:var(--gold-light)]">
                  {getExpectedYieldRange(tier).toUpperCase()} · FULL YIELD TRANSFERRED
                </p>

                <div className="mt-8 space-y-2">
                  <p className="font-[family-name:var(--font-heading)] text-[clamp(2.75rem,5vw,3rem)] font-light text-[color:var(--ivory-50)]">
                    {pricing.prebookingDisplay}
                  </p>
                  <p className="font-km-mono text-[0.55rem] tracking-[0.14em] text-[color:rgba(253,252,248,0.32)]">
                    PRE-BOOKING RESERVATION
                  </p>
                  <div className="h-px w-full bg-[color:rgba(253,252,248,0.08)]" />
                  <p className="font-[family-name:var(--font-body)] pt-2 text-[1rem] font-light text-[color:rgba(253,252,248,0.58)]">
                    {pricing.yearlyRentDisplay} / year thereafter
                  </p>
                </div>

                <ul className="mt-8 space-y-3 font-[family-name:var(--font-body)] text-[0.85rem] font-light text-[color:rgba(253,252,248,0.52)]">
                  {meta.pitchLines.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-[color:var(--gold-primary)]">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-4">
                  {soldOut ? (
                    <div className="space-y-2 text-center">
                      <p className="font-km-mono text-[0.55rem] tracking-[0.15em] text-[color:var(--gold-light)]">
                        FULLY ALLOCATED THIS SEASON
                      </p>
                      <Link
                        href="/contact"
                        data-cursor="hover"
                        className="font-km-mono block text-[0.55rem] tracking-[0.18em] text-[color:rgba(253,252,248,0.48)] transition-colors hover:text-[color:var(--gold-light)]"
                      >
                        JOIN WAITLIST →
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/trees/${meta.slug}`}
                      data-cursor="hover"
                      className="font-km-mono flex w-full items-center justify-center rounded-[2px] bg-[color:var(--gold-primary)] py-3.5 text-[0.65rem] tracking-[0.22em] text-[color:var(--obsidian-950)] transition-colors hover:bg-[color:var(--gold-pale)]"
                    >
                      RESERVE THIS TIER →
                    </Link>
                  )}
                  <p className="text-center font-km-mono text-[0.55rem] tracking-[0.12em] text-[color:rgba(253,252,248,0.28)]">
                    {open} allotment{open === 1 ? "" : "s"} open · {getTierLabel(tier)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { TreeTierCards as TreeTiersSection };
