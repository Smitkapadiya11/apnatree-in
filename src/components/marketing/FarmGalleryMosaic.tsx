"use client";

import Image from "next/image";

import { VideoBackground } from "@/components/shared/VideoBackground";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { cn } from "@/lib/utils";

export type GalleryCell =
  | { kind: "image"; src: string; alt: string; className?: string }
  | { kind: "video"; src: string; poster: string; alt: string; className?: string };

type FarmGalleryMosaicProps = {
  cells: GalleryCell[];
};

export function FarmGalleryMosaic({ cells }: FarmGalleryMosaicProps) {
  return (
    <StaggerGroup className="container-luxe mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(200px,1fr)]">
      {cells.map((cell, index) => (
        <StaggerItem
          key={`${cell.kind}-${cell.kind === "video" ? cell.src : cell.src}-${index}`}
          className={cn(
            "group relative isolate overflow-hidden rounded-[var(--radius-xl)] ring-1 ring-[color:var(--brand-forest)]/10",
            cell.className
          )}
        >
          {cell.kind === "video" ? (
            <VideoBackground
              src={cell.src}
              fallbackImage={cell.poster}
              poster={cell.poster}
              overlay="dark"
              overlayIntensity={0.42}
              className="min-h-[240px] size-full lg:min-h-0"
            />
          ) : (
            <>
              <Image
                src={cell.src}
                alt={cell.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                quality={82}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-[color:var(--brand-forest)]/50 via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-55"
              />
            </>
          )}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
