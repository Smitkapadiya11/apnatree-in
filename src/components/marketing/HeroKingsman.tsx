"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { gsap } from "gsap";

import { useLenis } from "@/contexts/LenisContext";
import { KINGSMAN_MEDIA } from "@/lib/kingsman-media";

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

    if (!reduced) {
      gsap.set(imgWrap, { scale: 1.08 });
      gsap.to(imgWrap, {
        scale: 1,
        duration: 2.5,
        ease: "power2.out",
      });
    }

    let splitCleanup: (() => void) | undefined;

    const runChars = async () => {
      const line1 = line1Ref.current;
      if (!line1 || reduced) return;

      const [{ default: Splitting }] = await Promise.all([import("splitting"), import("splitting/dist/splitting.css")]);

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
    };

    void runChars().then(() => {
      splitCleanup = () => {
        line1Ref.current?.querySelectorAll(".char").forEach((n) => n.removeAttribute("style"));
      };
    });

    return () => {
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

    const tick = () => {
      const y = lenis ? lenis.scroll : window.scrollY;
      gsap.to(el, { opacity: y > 150 ? 0 : 1, duration: 0.35, overwrite: "auto" });
    };

    if (lenis) {
      lenis.on("scroll", tick);
    } else {
      window.addEventListener("scroll", tick, { passive: true });
    }
    tick();

    return () => {
      if (lenis) lenis.off("scroll", tick);
      else window.removeEventListener("scroll", tick);
    };
  }, [lenis]);

  const [heroImg, setHeroImg] = React.useState(KINGSMAN_MEDIA.aerialHero);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--obsidian-900)]"
      aria-label="Hero"
    >
      <div ref={imgScaleRef} className="absolute inset-0 z-0 origin-center">
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover max-md:object-[60%_35%] md:object-[center_35%]"
          onError={() => setHeroImg(KINGSMAN_MEDIA.grove551)}
        />
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

      <div className="pointer-events-none absolute inset-x-0 bottom-[15%] left-[clamp(1.5rem,7vw,6rem)] z-10 max-w-[780px] space-y-7 text-[color:var(--ivory-50)] [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
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
        className="pointer-events-none absolute bottom-10 left-[clamp(1.5rem,7vw,6rem)] z-10 hidden flex-col items-start gap-2 md:flex"
      >
        <span className="font-km-mono text-[0.55rem] tracking-[0.28em] text-[color:var(--ivory-50)]/30">SCROLL</span>
        <span className="km-scroll-line" />
      </div>
    </section>
  );
}
