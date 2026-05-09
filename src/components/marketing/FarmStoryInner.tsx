"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { VideoBackground } from "@/components/shared/VideoBackground";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type FarmStoryInnerProps = {
  videoSrc: string | null;
  fallbackPoster: string;
  headline: string;
  paragraphs: string[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
};

export function FarmStoryInner({
  videoSrc,
  fallbackPoster,
  headline,
  paragraphs,
  quote,
  quoteAuthor,
  quoteRole,
}: FarmStoryInnerProps) {
  const reduceMotion = useReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [32, -32]);

  const overlay = isLg ? "split" : "forest";
  const overlayIntensity = isLg ? 0.68 : 0.85;

  return (
    <section
      ref={rootRef}
      id="farm-story"
      className="relative isolate overflow-hidden"
      aria-labelledby="farm-story-heading"
    >
      <VideoBackground
        src={videoSrc}
        fallbackImage={fallbackPoster}
        poster={fallbackPoster}
        overlay={overlay}
        overlayIntensity={overlayIntensity}
        className="min-h-[88vh] py-24 sm:py-28 lg:min-h-[92vh] lg:py-32"
      >
        <motion.div style={{ y: reduceMotion ? 0 : drift }} className="container-luxe relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="space-y-8 text-[color:var(--brand-cream)] lg:col-span-6">
            <p className="eyebrow text-[color:var(--brand-gold-light)]">Editorial</p>
            <h2
              id="farm-story-heading"
              className="font-[family-name:var(--font-heading)] text-balance text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            >
              {headline}
            </h2>
            <div className="space-y-5 text-pretty text-base leading-relaxed text-[color:var(--brand-cream)]/85 sm:text-lg">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <PremiumButton href="/about" tone="glass" size="lg">
                Meet the grove desk
              </PremiumButton>
              <PremiumButton href="/trees" tone="gold" size="lg">
                Choose a tier
              </PremiumButton>
            </div>
          </div>

          <aside className="relative lg:col-span-6">
            <div className="rounded-[var(--radius-2xl)] border border-white/18 bg-black/25 p-8 shadow-[0_35px_90px_rgba(5,10,5,0.45)] backdrop-blur-xl sm:p-10">
              <p className="font-[family-name:var(--font-heading)] text-2xl italic leading-snug text-[color:var(--brand-cream)] sm:text-3xl">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="mt-6 text-sm text-[color:var(--brand-cream)]/72">
                <span className="font-semibold text-[color:var(--brand-gold-light)]">{quoteAuthor}</span>
                <span className="block text-[color:var(--brand-cream)]/60">{quoteRole}</span>
              </p>
            </div>
          </aside>
        </motion.div>
      </VideoBackground>
    </section>
  );
}
