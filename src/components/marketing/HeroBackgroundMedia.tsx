"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type HeroBackgroundMediaProps = {
  videoSrc?: string;
  posterSrc: string;
  posterAlt: string;
};

export function HeroBackgroundMedia({ videoSrc, posterSrc, posterAlt }: HeroBackgroundMediaProps) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || !videoSrc || reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.12);
        if (visible) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.12, 0.35] }
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, [videoSrc, reduceMotion]);

  const useVideo = Boolean(videoSrc) && !reduceMotion;
  const resolvedVideo = videoSrc ?? "";

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div className="animate-hero-drift relative size-[115%] min-h-full min-w-[115%] origin-center will-change-transform [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
        {useVideo ? (
          <video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-hidden
          >
            <source
              src={resolvedVideo}
              type={resolvedVideo.endsWith(".mov") ? "video/quicktime" : "video/mp4"}
            />
          </video>
        ) : (
          <Image src={posterSrc} alt={posterAlt} fill priority sizes="100vw" className="object-cover" />
        )}
      </div>
    </div>
  );
}
