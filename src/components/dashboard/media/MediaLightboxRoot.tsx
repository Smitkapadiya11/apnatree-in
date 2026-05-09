"use client";

import { MediaType } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";

import { markMediaAsViewed } from "@/actions/media";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { MediaGalleryTile } from "@/lib/queries/dashboard-media";
import { FALLBACK_BLUR_DATA_URL } from "@/lib/media-image";

function usePointerSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);

  const onPointerDown = (event: React.PointerEvent) => {
    pointerId.current = event.pointerId;
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (pointerId.current === null) return;
    const delta = event.clientX - startX.current;
    if (delta > 70) {
      onSwipeRight();
    } else if (delta < -70) {
      onSwipeLeft();
    }
    pointerId.current = null;
  };

  return { onPointerDown, onPointerUp };
}

function MediaLightboxInner({ tiles }: { tiles: MediaGalleryTile[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("media");

  const index = useMemo(() => tiles.findIndex((tile) => tile.id === mediaId), [tiles, mediaId]);

  const replaceQuery = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const close = useCallback(() => {
    replaceQuery((params) => {
      params.delete("media");
    });
  }, [replaceQuery]);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const bounded = ((nextIndex % tiles.length) + tiles.length) % tiles.length;
      const nextTile = tiles[bounded];
      if (!nextTile) return;
      replaceQuery((params) => {
        params.set("media", nextTile.id);
      });
    },
    [replaceQuery, tiles]
  );

  useEffect(() => {
    if (!mediaId || index === -1) return;
    void markMediaAsViewed(mediaId);
  }, [index, mediaId]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!mediaId || index === -1) return;
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowRight") {
        goToIndex(index + 1);
      }
      if (event.key === "ArrowLeft") {
        goToIndex(index - 1);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, goToIndex, index, mediaId]);

  const swipe = usePointerSwipe(
    () => goToIndex(index + 1),
    () => goToIndex(index - 1)
  );

  const active = index !== -1 && Boolean(mediaId);

  const tile = index === -1 ? null : tiles[index];

  return (
    <Dialog open={active} onOpenChange={(open) => (!open ? close() : null)}>
      <DialogContent
        showCloseButton
        className="bg-background/95 max-h-[96vh] max-w-6xl border-none p-0 shadow-2xl sm:rounded-[32px]"
      >
        {tile ? (
          <div
            className="flex flex-col gap-4 p-4 sm:p-8"
            onPointerDown={swipe.onPointerDown}
            onPointerUp={swipe.onPointerUp}
          >
            <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em]">
              <span>{tile.mediaType === MediaType.PHOTO ? "Photograph" : "Video clip"}</span>
              <span>{format(new Date(tile.takenAt), "PPpp")}</span>
            </div>
            <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[28px] bg-black">
              {tile.mediaType === MediaType.PHOTO ? (
                <Image
                  src={tile.fileUrl}
                  alt={tile.caption ? tile.caption.slice(0, 160) : "Expanded canopy photograph"}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={tile.blurDataURL ?? FALLBACK_BLUR_DATA_URL}
                  quality={90}
                  className="object-contain"
                  priority
                />
              ) : (
                <video
                  src={tile.fileUrl}
                  controls
                  autoPlay
                  playsInline
                  className="size-full"
                  aria-label={tile.caption ?? "Canopy video update"}
                />
              )}
              <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Previous media"
                  className="pointer-events-auto rounded-full"
                  onClick={() => goToIndex(index - 1)}
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Next media"
                  className="pointer-events-auto rounded-full"
                  onClick={() => goToIndex(index + 1)}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>
            {tile.caption ? <p className="text-muted-foreground text-base leading-relaxed">{tile.caption}</p> : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function MediaLightboxRoot({ tiles }: { tiles: MediaGalleryTile[] }) {
  return (
    <Suspense fallback={null}>
      <MediaLightboxInner tiles={tiles} />
    </Suspense>
  );
}
