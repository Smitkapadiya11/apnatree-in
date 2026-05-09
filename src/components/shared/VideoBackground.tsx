"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export type VideoOverlayVariant = "dark" | "forest" | "gold" | "none" | "split";

type VideoBackgroundProps = {
  src: string | null;
  fallbackImage: string;
  overlay?: VideoOverlayVariant;
  overlayIntensity?: number;
  className?: string;
  children?: ReactNode;
  poster?: string;
  priority?: boolean;
};

export function VideoBackground({
  src,
  fallbackImage,
  overlay = "forest",
  overlayIntensity = 0.6,
  className,
  children,
  poster,
  priority = false,
}: VideoBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduceMotion = useReducedMotion();
  const inView = useInView(wrapRef, { amount: 0.12, margin: "0px 0px -10% 0px" });
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoBroken, setVideoBroken] = useState(false);

  const intensity = overlayIntensity;
  const posterSrc = poster ?? fallbackImage;

  const showVideo = Boolean(src) && !isMobile && !reduceMotion && !videoBroken;

  useEffect(() => {
    const el = videoRef.current;
    if (!showVideo || !el || !src) return;
    if (inView) {
      void el.play().catch(() => setVideoBroken(true));
    } else {
      el.pause();
    }
  }, [inView, showVideo, src]);

  const onVideoReady = useCallback(() => {
    setVideoVisible(true);
  }, []);

  const overlayDarkStyle =
    overlay === "dark"
      ? {
          background: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(13,26,13,${intensity * 0.5}) 50%, rgba(13,26,13,${intensity}) 100%)`,
        }
      : undefined;

  const overlayGoldStyle =
    overlay === "gold"
      ? {
          background: `linear-gradient(135deg, rgba(139,98,20,${intensity * 0.4}) 0%, rgba(200,151,42,${intensity * 0.2}) 50%, rgba(139,98,20,${intensity * 0.5}) 100%)`,
        }
      : undefined;

  const overlaySplitStyle =
    overlay === "split"
      ? {
          background: `linear-gradient(to right, rgba(13,26,13,${intensity}) 0%, rgba(13,26,13,${intensity * 0.7}) 40%, transparent 70%)`,
        }
      : undefined;

  return (
    <div ref={wrapRef} className={cn("relative isolate size-full min-h-[inherit]", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={fallbackImage}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="z-0 object-cover object-center"
          aria-hidden
        />

        {showVideo ? (
          <video
            ref={videoRef}
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] size-full object-cover object-center transition-opacity duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              videoVisible ? "opacity-100" : "opacity-0"
            )}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
            poster={posterSrc}
            onCanPlay={onVideoReady}
            onPlaying={onVideoReady}
            onError={() => setVideoBroken(true)}
            aria-hidden
          >
            <source src={src ?? ""} type={src?.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
          </video>
        ) : null}
      </div>

      {overlay === "forest" ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{ backgroundColor: `rgba(26, 46, 26, ${intensity * 0.7})` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background: `linear-gradient(160deg, rgba(26,46,26,${Math.min(0.92, 0.75 + intensity * 0.2)}) 0%, transparent 60%)`,
            }}
          />
        </>
      ) : null}

      {overlay === "dark" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]" style={overlayDarkStyle} />
      ) : null}

      {overlay === "gold" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]" style={overlayGoldStyle} />
      ) : null}

      {overlay === "split" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]" style={overlaySplitStyle} />
      ) : null}

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_SVG }}
      />

      {children ? <div className="relative z-[10] size-full">{children}</div> : null}
    </div>
  );
}
