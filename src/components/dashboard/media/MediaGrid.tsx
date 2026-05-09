import { MediaType } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { MediaFilter, MediaGalleryTile } from "@/lib/queries/dashboard-media";
import { FALLBACK_BLUR_DATA_URL } from "@/lib/media-image";

import { cn } from "@/lib/utils";

function buildTileHref(
  tileId: string,
  opts: { page: number; filter: MediaFilter; contractId?: string }
): string {
  const params = new URLSearchParams();
  if (opts.page > 1) params.set("page", String(opts.page));
  if (opts.filter !== "all") params.set("filter", opts.filter);
  if (opts.contractId) params.set("contract", opts.contractId);
  params.set("media", tileId);
  return `/dashboard/media?${params.toString()}`;
}

export function MediaGrid({
  tiles,
  page,
  filter,
  contractId,
}: {
  tiles: MediaGalleryTile[];
  page: number;
  filter: MediaFilter;
  contractId?: string;
}) {
  if (tiles.length === 0) {
    return (
      <div className="border-border rounded-3xl border border-dashed bg-[color-mix(in_oklab,var(--accent)_5%,transparent)] p-12 text-center">
        <p className="font-[family-name:var(--font-heading)] text-2xl">The grove is quiet here.</p>
        <p className="text-muted-foreground mt-3 text-sm">
          Bi-weekly canopy chronicles appear once field agents publish UploadThing drops for your contracts.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tiles.map((tile) => (
        <Link
          key={tile.id}
          href={buildTileHref(tile.id, { page, filter, contractId })}
          scroll={false}
          prefetch
          className={cn(
            "border-border group focus-visible:ring-ring relative overflow-hidden rounded-3xl border bg-background/80 shadow-sm transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none",
            !tile.isViewed && "ring-[#c8972a]/80 ring-2 ring-offset-2 ring-offset-background"
          )}
        >
          <div className="bg-muted relative aspect-square w-full overflow-hidden">
            {tile.mediaType === MediaType.PHOTO ? (
              <Image
                src={tile.fileUrl}
                alt={tile.caption ? tile.caption.slice(0, 120) : "Bi-weekly canopy photograph"}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL={tile.blurDataURL ?? FALLBACK_BLUR_DATA_URL}
                loading="lazy"
                quality={85}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="relative size-full bg-[radial-gradient(circle_at_top,var(--muted),var(--background))]">
                <video
                  src={tile.fileUrl}
                  muted
                  playsInline
                  preload="metadata"
                  className="size-full object-cover opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="text-background size-12 drop-shadow-md" aria-hidden />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full text-[10px] tracking-wide uppercase">
                {tile.mediaType === MediaType.PHOTO ? "Photo" : "Video"}
              </Badge>
              <span className="text-muted-foreground text-xs">{format(new Date(tile.takenAt), "PP")}</span>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm">{tile.caption ?? "Canopy moment captured"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
