"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { HeroParticles } from "@/components/marketing/HeroParticles";
import { useLenis } from "@/contexts/LenisContext";
import { MEDIA } from "@/lib/farm-media-client";
import { MARKETING_VIDEOS } from "@/lib/marketing-videos";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroKingsman() {
  const lenis = useLenis();
  const rootRef = React.useRef<HTMLElement>(null);
  const imgScaleRef = React.useRef<HTMLDivElement>(null);
  const line1Ref = React.useRef<HTMLSpanElement>(null);
  const line2Ref = React.useRef<HTMLDivElement>(null);
  const line3Ref = React.useRef<HTMLDivElement>(null);
  const provenanceRef = React.useRef<HTMLParagraphElement>(null);
  const metaRef = React.useRef<HTMLParagraphElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduced = prefersReducedMotion();
    const imgWrap = imgScaleRef.current;
    if (!imgWrap) return;

    let splitCleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      if (!reduced) {
        gsap.set(imgWrap, { scale: 1.08 });
        gsap.to(imgWrap, {
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        });
      }

      const line1 = line1Ref.current;
      if (!line1 || reduced) return;

      const [{ default: Splitting }] = await Promise.all([import("splitting"), import("splitting/dist/splitting.css")]);
      if (cancelled) return;

      Splitting({ target: line1, by: "chars" });
      const chars = line1.querySelectorAll(".char");

      const tl = gsap.timeline({ delay: reduced ? 0 : 0.4 });
      if (provenanceRef.current) {
        tl.from(provenanceRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, 0.3);
      }
      tl.from(
        chars,
        {
          y: "105%",
          opacity: 0,
          duration: 1.1,
          stagger: 0.025,
          ease: "power3.out",
        },
        0.5
      );
      if (line2Ref.current) {
        tl.from(line2Ref.current, { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.35");
      }
      if (line3Ref.current) {
        tl.from(line3Ref.current, { opacity: 0, y: 16, duration: 0.55, ease: "power2.out" }, "-=0.25");
      }
      if (metaRef.current) {
        tl.from(metaRef.current, { opacity: 0, duration: 1 }, "-=0.2");
      }
      if (ctaRef.current) {
        tl.from(ctaRef.current, { opacity: 0, y: 16, duration: 0.8, ease: "power2.out" }, "-=0.6");
      }

      splitCleanup = () => {
        line1Ref.current?.querySelectorAll(".char").forEach((n) => n.removeAttribute("style"));
      };
    })();

    return () => {
      cancelled = true;
      splitCleanup?.();
    };
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    if (reduced) {
      el.style.opacity = "0";
      return;
    }

    let disposed = false;
    let gsapMod: typeof import("gsap").gsap | null = null;

    const tick = () => {
      if (!scrollRef.current || !gsapMod || disposed) return;
      const y = lenis ? lenis.scroll : window.scrollY;
      gsapMod.to(scrollRef.current, { opacity: y > 150 ? 0 : 1, duration: 0.35, overwrite: "auto" });
    };

    void (async () => {
      const { gsap } = await import("gsap");
      if (disposed) return;
      gsapMod = gsap;
      tick();
    })();

    if (lenis) {
      lenis.on("scroll", tick);
    } else {
      window.addEventListener("scroll", tick, { passive: true });
    }

    return () => {
      disposed = true;
      if (lenis) lenis.off("scroll", tick);
      else window.removeEventListener("scroll", tick);
    };
  }, [lenis]);

  const [heroImg, setHeroImg] = React.useState(MEDIA.images.hero[0] ?? "/media/20260503_093551.jpg");
  const [mediaFallback, setMediaFallback] = React.useState(false);
  const [videoPreload, setVideoPreload] = React.useState<"none" | "metadata" | "auto">("metadata");
  const [useReducedMotion, setUseReducedMotion] = React.useState(false);

  React.useEffect(() => {
    setUseReducedMotion(prefersReducedMotion());
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setVideoPreload(mq.matches ? "auto" : "none");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const showPosterStill = useReducedMotion || mediaFallback;

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--obsidian-900)]"
      aria-label="Hero"
    >
      <div ref={imgScaleRef} className="absolute inset-0 z-0 origin-center">
        {showPosterStill ? (
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover max-md:object-[60%_35%] md:object-[center_35%]"
            onError={() => setHeroImg(MEDIA.images.hero[1] ?? "/media/20260503_093551.jpg")}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload={videoPreload}
            poster={heroImg}
            className="absolute inset-0 h-full w-full object-cover max-md:object-[60%_35%] md:object-[center_35%]"
            style={{ filter: "brightness(0.42) saturate(1.08) contrast(1.05)" }}
            onError={() => setMediaFallback(true)}
            aria-hidden
          >
            <source src={MARKETING_VIDEOS.heroDrone} type="video/mp4" />
          </video>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(9,13,16,0.3) 55%, rgba(9,13,16,0.75) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(9,13,16,0.6) 65%, rgba(9,13,16,0.97) 88%, var(--obsidian-950) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to right, rgba(9,13,16,0.5) 0%, transparent 45%)",
        }}
      />

      <div aria-hidden className="km-grain-hero pointer-events-none absolute inset-0 z-[2]" />

      {!useReducedMotion ? <HeroParticles /> : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-[15%] left-[clamp(1.5rem,7vw,6rem)] z-20 max-w-[780px] space-y-7 text-[color:var(--ivory-50)] [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <p ref={provenanceRef} className="font-km-mono text-[0.65rem] tracking-[0.28em] text-[color:var(--gold-light)]">
          GIR FOREST · JUNAGADH · GUJARAT
        </p>

        <h1 className="font-[family-name:var(--font-heading)] font-light tracking-[-0.03em] text-[clamp(2.75rem,9vw,9rem)] leading-[0.95]">
          <span className="block overflow-hidden pb-1">
            <span ref={line1Ref} className="inline-block" data-splitting>
              Own a Kesar
            </span>
          </span>
          <span ref={line2Ref} className="text-gold-kingsman block">
            Mango Tree.
          </span>
          <span
            ref={line3Ref}
            className="font-[family-name:var(--font-body)] mt-3 block font-light text-[clamp(1.35rem,3vw,2.35rem)] leading-snug text-[color:var(--ivory-50)]/60"
          >
            Taste what you grow.
          </span>
        </h1>

        <p
          ref={metaRef}
          className="font-km-mono flex max-w-xl flex-wrap gap-x-3 gap-y-2 text-[0.62rem] tracking-[0.18em] text-[color:var(--ivory-50)]/35"
        >
          <span>87+ RENTERS STEWARDING</span>
          <span className="text-[color:var(--gold-primary)]">──</span>
          <span>3 VISITS / YEAR</span>
          <span className="text-[color:var(--gold-primary)]">──</span>
          <span>100% HARVEST YOURS</span>
        </p>

        <div ref={ctaRef} className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/trees"
            data-cursor="hover"
            className="group font-km-mono inline-flex items-center justify-center gap-2 bg-[color:var(--gold-primary)] px-9 py-4 text-[0.65rem] tracking-[0.22em] text-[color:var(--obsidian-950)] transition-colors hover:bg-[color:var(--gold-pale)] rounded-[2px]"
          >
            RESERVE YOUR TREE{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/how-it-works"
            data-cursor="hover"
            className="font-km-mono inline-flex items-center justify-center border border-[color:rgba(253,252,248,0.22)] px-8 py-4 text-[0.65rem] tracking-[0.22em] text-[color:var(--ivory-50)]/70 transition-colors hover:border-[color:rgba(253,252,248,0.55)] hover:text-[color:var(--ivory-50)] rounded-[2px]"
          >
            EXPLORE THE GROVE
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="pointer-events-none absolute bottom-10 left-[clamp(1.5rem,7vw,6rem)] z-20 hidden flex-col items-start gap-2 md:flex"
      >
        <span className="font-km-mono text-[0.55rem] tracking-[0.28em] text-[color:var(--ivory-50)]/30">SCROLL</span>
        <span className="km-scroll-line" />
      </div>
    </section>
  );
}
