import Image from "next/image";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";
import { cn } from "@/lib/utils";

const TILE_SIZES = [
  { className: "lg:col-span-2 lg:row-span-2 aspect-[4/5] sm:aspect-[6/7] lg:aspect-auto" },
  { className: "aspect-[5/4]" },
  { className: "aspect-[5/4]" },
  { className: "aspect-[5/4]" },
  { className: "aspect-[5/4]" },
];

const TILE_ALTS = [
  "Wide view of the Kesar mango orchard along the Gir ridge",
  "Sun-warmed canopy and understory on the farm",
  "Ripe Kesar mangoes hanging from leased orchard trees",
  "Close detail of fruit set during the growing season",
  "Wildlife and orchard ecology neighbouring Gir landscapes",
];

export function FarmGallery() {
  const pool = (FARM_MEDIA.gallery.length > 0 ? FARM_MEDIA.gallery : Array(5).fill(FARM_MEDIA_FALLBACKS.gallery)) as string[];
  const tiles = TILE_SIZES.map((tile, index) => ({
    ...tile,
    src: pool[index % pool.length],
  }));
  const hasLibrary = !FARM_MEDIA.isEmpty && FARM_MEDIA.counts.images > 0;

  return (
    <section className="relative section-luxe surface-cream">
      <ScrollReveal className="container-luxe text-center">
        <p className="eyebrow">From the limestone ridge</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight sm:text-5xl text-[color:var(--brand-forest)]">
          A grove that earns its silence
        </h2>
        <p className="text-[color:var(--muted-foreground)] mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg">
          {hasLibrary
            ? "Fresh frames from our Gir orchard — the same groves your tree shares with lion country."
            : "Field photography refreshes every season. When source media is missing, we render an honest placeholder so layouts never collapse."}
        </p>
      </ScrollReveal>

      <StaggerGroup className="container-luxe mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(180px,1fr)]">
        {tiles.map((tile, index) => (
          <StaggerItem
            key={`${tile.src}-${index}`}
            className={cn("group relative overflow-hidden rounded-[var(--radius-xl)]", tile.className)}
          >
            <Image
              src={tile.src}
              alt={TILE_ALTS[index % TILE_ALTS.length]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              quality={82}
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-[color:var(--brand-forest)]/55 via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-40"
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

/** Backwards-compat alias for the older landing page imports. */
export { FarmGallery as FarmGalleryStrip };
