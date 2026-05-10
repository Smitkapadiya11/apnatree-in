"use client";

import Image from "next/image";
import * as React from "react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CHRONICLE_PANELS } from "@/lib/kingsman-media";

type LayoutMode = "pending" | "mobile" | "desktop";

export function HorizontalChronicles() {
  const outerRef = React.useRef<HTMLElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);
  const rowRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const scrollCtxRef = React.useRef<{ revert: () => void } | null>(null);
  const [layout, setLayout] = React.useState<LayoutMode>("pending");

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setLayout(mq.matches ? "mobile" : "desktop");
    queueMicrotask(apply);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  React.useEffect(() => {
    if (layout !== "desktop") return;
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const row = rowRef.current;
    if (!outer || !sticky || !row) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      scrollCtxRef.current = gsap.context(() => {
        gsap.to(row, {
          x: () => -(row.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            pin: sticky,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressRef.current) {
                progressRef.current.style.width = `${p * 100}%`;
              }
              const idx = Math.min(
                CHRONICLE_PANELS.length - 1,
                Math.floor(p * CHRONICLE_PANELS.length)
              );
              if (labelRef.current) {
                const k = CHRONICLE_PANELS[idx]?.k ?? "01";
                labelRef.current.textContent = `${k} / 05`;
              }
            },
          },
        });
      }, outer);
    })();

    return () => {
      cancelled = true;
      scrollCtxRef.current?.revert();
      scrollCtxRef.current = null;
    };
  }, [layout]);

  if (layout === "pending") {
    return (
      <section
        className="flex min-h-[100svh] items-center justify-center bg-[var(--obsidian-950)]"
        aria-label="The grove chronicles"
      >
        <p className="font-km-mono text-[0.62rem] tracking-[0.2em] text-[color:rgba(253,252,248,0.25)]">LOADING…</p>
      </section>
    );
  }

  if (layout === "mobile") {
    return (
      <section aria-label="The grove chronicles" className="bg-[var(--obsidian-950)] px-4 py-20 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="font-km-mono text-[0.62rem] tracking-[0.24em] text-[color:var(--gold-light)]">
            THE GROVE CHRONICLES
          </p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-[clamp(2rem,6vw,3rem)] font-light text-[color:var(--ivory-50)]">
            Five frames from one covenant.
          </h2>
        </ScrollReveal>
        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-10">
          {CHRONICLE_PANELS.map((panel) => (
            <article key={panel.k} className="overflow-hidden rounded-[8px] border border-[color:rgba(253,252,248,0.08)]">
              <div className="relative aspect-[4/3] w-full">
                <Image src={panel.src} alt="" fill sizes="100vw" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-[rgba(9,13,16,0.45)]" aria-hidden />
              </div>
              <div className="space-y-2 bg-[var(--obsidian-900)] px-6 py-6">
                <p className="font-km-mono text-[0.55rem] tracking-[0.2em] text-[color:var(--gold-primary)]">
                  {panel.k} / 05
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-light text-[color:var(--ivory-50)]">
                  {panel.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[0.9rem] font-light text-[color:rgba(253,252,248,0.62)]">
                  {panel.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={outerRef} className="relative h-[500vh] bg-[var(--obsidian-950)]" aria-label="The grove chronicles">
      <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-10 z-20 flex justify-center px-6">
          <ScrollReveal className="text-center">
            <p className="font-km-mono text-[0.62rem] tracking-[0.24em] text-[color:var(--gold-light)]">
              THE GROVE CHRONICLES
            </p>
            <h2 className="font-[family-name:var(--font-heading)] mt-3 text-[clamp(2rem,4vw,3rem)] font-light text-[color:var(--ivory-50)]">
              Scroll the grove. Five proofs.
            </h2>
          </ScrollReveal>
        </div>

        <div ref={rowRef} className="flex h-full w-max flex-row will-change-transform">
          {CHRONICLE_PANELS.map((panel) => (
            <div key={panel.k} className="relative h-full w-screen shrink-0">
              <Image src={panel.src} alt="" fill sizes="100vw" className="object-cover" priority={panel.k === "01"} />
              <div className="pointer-events-none absolute inset-0 bg-[rgba(9,13,16,0.45)]" aria-hidden />
              <p className="font-km-mono absolute right-10 top-28 z-10 text-[0.55rem] tracking-[0.2em] text-[color:var(--gold-primary)] md:right-16 md:top-32">
                {panel.k} / 05
              </p>
              <div className="absolute bottom-0 left-0 z-10 max-w-[400px] space-y-4 p-12">
                <h3 className="font-[family-name:var(--font-heading)] text-[2.5rem] font-light text-[color:var(--ivory-50)]">
                  {panel.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[0.9rem] font-light leading-relaxed text-[color:rgba(253,252,248,0.62)]">
                  {panel.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="flex items-center justify-between px-6 pb-6 pt-3">
            <span ref={labelRef} className="font-km-mono text-[0.62rem] tracking-[0.22em] text-[color:rgba(253,252,248,0.45)]">
              01 / 05
            </span>
          </div>
          <div className="relative h-px w-full bg-[color:rgba(253,252,248,0.12)]">
            <div ref={progressRef} className="absolute left-0 top-0 h-px w-0 bg-[color:var(--gold-primary)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
