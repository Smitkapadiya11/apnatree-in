"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { VideoBackground } from "@/components/shared/VideoBackground";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

type HeroCinematicProps = {
  heroVideo: string | null;
  fallbackImage: string;
  posterImage: string;
  storyVideo: string | null;
};

function MangoLeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("text-[#f0c060]", className)} fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 20c6-2 10-7 12-14 2 7 6 12 12 14-8 1-16-3-24 0z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16c3-2 6-5 8-9" strokeLinecap="round" opacity={0.55} />
      <path d="M12 18c2-3 4-7 5-11" strokeLinecap="round" opacity={0.35} />
    </svg>
  );
}

export function HeroCinematic({ heroVideo, fallbackImage, posterImage, storyVideo }: HeroCinematicProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [storyOpen, setStoryOpen] = useState(false);
  const [hideScrollCue, setHideScrollCue] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 120) setHideScrollCue(true);
  });

  const storyRef = useRef<HTMLVideoElement>(null);

  const openStory = useCallback(() => {
    if (!storyVideo) return;
    setStoryOpen(true);
  }, [storyVideo]);

  useEffect(() => {
    if (!storyOpen) return;
    void storyRef.current?.play().catch(() => {});
  }, [storyOpen]);

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate min-h-[100svh] overflow-hidden bg-[#0d1a0d] text-white"
      >
        <div className="absolute inset-0 z-0 min-h-[100svh]">
          <VideoBackground
            src={heroVideo}
            fallbackImage={fallbackImage}
            poster={posterImage}
            overlay="forest"
            overlayIntensity={0.55}
            priority
          />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(13,26,13,0.6) 100%)",
          }}
        />

        <div className="relative z-[10] flex min-h-[100svh] flex-col justify-end pb-[clamp(3rem,8vw,6rem)] pt-28 sm:pt-36">
          <div className="container-luxe max-w-[820px] px-[clamp(1.5rem,6vw,5rem)]">
            <motion.div
              variants={staggerContainer}
              initial={reduceMotion ? "animate" : "initial"}
              animate="animate"
            >
              <motion.div variants={staggerItem} className="mb-6 inline-flex items-center gap-2.5">
                <span className="h-px w-8 bg-[#c8972a]" aria-hidden />
                <span className="font-[family-name:var(--font-body)] text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#f0c060]">
                  Gir Forest, Gujarat
                </span>
                <MangoLeafIcon className="size-4" />
              </motion.div>

              <motion.h1 id="hero-heading" variants={staggerItem} className="font-[family-name:var(--font-heading)] leading-[1.05]">
                <span className="block text-[clamp(2.5rem,8vw,3.5rem)] font-light tracking-[-0.02em] text-[#fdf8ed] sm:text-[clamp(3.5rem,7vw,6rem)]">
                  Own a Piece of
                </span>
                <span className="gold-shimmer-text mt-1 block text-[clamp(2.5rem,8vw,3.5rem)] font-light tracking-[-0.02em] sm:text-[clamp(3.5rem,7vw,6rem)]">
                  Gir Forest.
                </span>
                <span className="mt-2 block text-[clamp(2rem,5vw,4.5rem)] font-normal tracking-[-0.02em] text-[rgba(253,248,237,0.75)]">
                  Taste What You Grow.
                </span>
              </motion.h1>

              <motion.span variants={staggerItem} className="my-6 block h-px w-10 origin-left bg-[#c8972a]/50" />

              <motion.p
                variants={staggerItem}
                className="max-w-[520px] font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.5vw,1.15rem)] font-light leading-[1.7] text-[rgba(253,248,237,0.65)]"
              >
                Rent an authenticated Kesar mango tree from India&apos;s most legendary grove. Bi-weekly farm updates. 3 annual
                visits. 100% of your harvest — shipped home.
              </motion.p>

              <motion.div variants={staggerItem} className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/trees"
                  className="group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[length:300%_auto] px-9 py-4 text-center font-[family-name:var(--font-body)] text-[0.95rem] font-semibold tracking-[0.02em] text-[#1a2e1a] shadow-[0_8px_32px_rgba(200,151,42,0.4)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_12px_48px_rgba(200,151,42,0.55)] active:scale-[0.97] sm:min-h-[52px] sm:px-[36px]"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #8b6214, #c8972a, #e0bf6a, #c8972a)",
                  }}
                >
                  Reserve Your Tree
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>

                <button
                  type="button"
                  onClick={openStory}
                  disabled={!storyVideo}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(253,248,237,0.35)] bg-transparent px-8 py-4 font-[family-name:var(--font-body)] text-[0.95rem] font-medium text-[rgba(253,248,237,0.85)] backdrop-blur-md transition-colors hover:border-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] disabled:pointer-events-none disabled:opacity-40 sm:min-h-[52px]"
                >
                  <span aria-hidden>▶</span>
                  Watch the Farm
                </button>
              </motion.div>

              <motion.p
                variants={staggerItem}
                className="mt-8 font-[family-name:var(--font-body)] text-[0.78rem] tracking-[0.05em] text-[rgba(253,248,237,0.45)]"
              >
                87 Trees Rented · 3 Free Visits / Year · 100% Harvest Yours
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 z-[11] flex -translate-x-1/2 flex-col items-center gap-2 text-[rgba(253,248,237,0.4)]"
          animate={{ opacity: hideScrollCue ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <span className="font-[family-name:var(--font-body)] text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="size-4" />
          </motion.span>
        </motion.div>
      </section>

      {storyOpen && storyVideo ? (
        <button
          type="button"
          className="fixed inset-0 z-[90] flex cursor-default flex-col items-center justify-center bg-black/88 p-6 backdrop-blur-sm"
          aria-label="Close video"
          onClick={() => setStoryOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[20px] border border-[#c8972a]/30 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <video ref={storyRef} className="size-full object-cover" controls playsInline>
              <source src={storyVideo} type={storyVideo.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
            </video>
          </div>
          <p className="mt-4 font-[family-name:var(--font-body)] text-sm text-white/60">Tap outside to close</p>
        </button>
      ) : null}
    </>
  );
}
