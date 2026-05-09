import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FarmGalleryMosaic, type GalleryCell } from "@/components/marketing/FarmGalleryMosaic";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS, getImage } from "@/lib/farm-media";

function buildCells(): GalleryCell[] {
  const imgs = FARM_MEDIA.gallery.length > 0 ? FARM_MEDIA.gallery : [FARM_MEDIA_FALLBACKS.gallery];
  const vids = FARM_MEDIA.videos.all;
  const v0 = vids[0] ?? null;
  const v1 = vids.length > 1 ? vids[1] : null;

  const cells: GalleryCell[] = [];

  if (v0) {
    cells.push({
      kind: "video",
      src: v0,
      poster: getImage(imgs, 0),
      alt: "Cinematic pass across the Kesar orchard ridge",
      className: "lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-0",
    });
  } else {
    cells.push({
      kind: "image",
      src: getImage(imgs, 0),
      alt: "Wide view of the Kesar mango orchard along the Gir ridge",
      className: "lg:col-span-2 lg:row-span-2 aspect-[4/5] min-h-[260px] sm:aspect-[6/7] lg:aspect-auto",
    });
  }

  cells.push({
    kind: "image",
    src: getImage(imgs, 1),
    alt: "Sun-warmed canopy and understory on the farm",
    className: "aspect-[5/4] min-h-[200px]",
  });

  if (v1 && v1 !== v0) {
    cells.push({
      kind: "video",
      src: v1,
      poster: getImage(imgs, 2),
      alt: "Harvest rhythm along the grove floor",
      className: "aspect-[5/4] min-h-[200px]",
    });
  } else {
    cells.push({
      kind: "image",
      src: getImage(imgs, 2),
      alt: "Ripe Kesar mangoes hanging from leased orchard trees",
      className: "aspect-[5/4] min-h-[200px]",
    });
  }

  cells.push({
    kind: "image",
    src: getImage(imgs, 3),
    alt: "Close detail of fruit set during the growing season",
    className: "aspect-[5/4] min-h-[200px]",
  });

  cells.push({
    kind: "image",
    src: getImage(imgs, 4),
    alt: "Wildlife and orchard ecology neighbouring Gir landscapes",
    className: "aspect-[5/4] min-h-[200px]",
  });

  return cells;
}

export function FarmGallery() {
  const hasLibrary = !FARM_MEDIA.isEmpty && FARM_MEDIA.counts.images > 0;
  const cells = buildCells();

  return (
    <section className="texture-linen relative section-luxe surface-cream">
      <ScrollReveal className="container-luxe text-center">
        <p className="eyebrow text-[color:var(--brand-forest)]">From the limestone ridge</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-balance text-4xl tracking-tight text-[color:var(--brand-forest)] sm:text-5xl">
          A grove that earns its silence
        </h2>
        <p className="text-[color:var(--muted-foreground)] mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg">
          {hasLibrary
            ? "Living frames from Gir — stills and loops from the same canopy your contract references."
            : "Field photography refreshes every season. When library assets are missing, we render honest placeholders so layouts never collapse."}
        </p>
      </ScrollReveal>

      <FarmGalleryMosaic cells={cells} />
    </section>
  );
}

/** Backwards-compat alias for the older landing page imports. */
export { FarmGallery as FarmGalleryStrip };
