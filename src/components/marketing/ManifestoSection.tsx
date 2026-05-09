"use client";

import * as React from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const rootRef = React.useRef<HTMLElement>(null);
  const ruleRef = React.useRef<HTMLDivElement>(null);
  const statRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-km-manifesto]");
      if (!reduced) {
        blocks.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      if (ruleRef.current && !reduced) {
        gsap.from(ruleRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      const stat = statRef.current;
      if (stat && !reduced) {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: 22,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            stat.textContent = `${Math.round(counter.v)}`;
          },
        });
      } else if (stat) {
        stat.textContent = "22";
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[var(--obsidian-950)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(7rem,14vw,12rem)]"
    >
      <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-24">
        <div className="relative flex gap-6">
          <div ref={ruleRef} className="mt-2 h-[60px] w-px bg-[color:var(--gold-primary)]" aria-hidden />
          <div>
            <p className="font-km-mono text-[0.65rem] tracking-[0.26em] text-[color:var(--gold-light)]">
              THE APNATREE PHILOSOPHY
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <p
            data-km-manifesto
            className="font-[family-name:var(--font-heading)] text-[2.5rem] font-light leading-snug text-[color:rgba(253,252,248,0.72)]"
          >
            Not a delivery service. A living covenant.
          </p>
          <div data-km-manifesto className="h-px w-full bg-[color:rgba(253,252,248,0.08)]" aria-hidden />

          <div data-km-manifesto className="space-y-8">
            <p className="font-[family-name:var(--font-body)] text-[1.1rem] font-light leading-[1.9] text-[color:var(--ivory-50)]">
              The Kesar mango holds India&apos;s most protected Geographical Indication tag. It grows in exactly one forest on
              earth. Our renters do not buy mangoes. They inherit a relationship with that forest.
            </p>
          </div>

          <div data-km-manifesto className="h-px w-full bg-[color:rgba(253,252,248,0.08)]" aria-hidden />

          <div data-km-manifesto className="space-y-4">
            <p className="font-[family-name:var(--font-heading)] text-[clamp(4rem,12vw,5rem)] font-light leading-none text-[color:var(--gold-primary)]">
              <span ref={statRef}>22</span>
            </p>
            <p className="font-km-mono text-[0.72rem] tracking-[0.22em] text-[color:rgba(253,252,248,0.42)]">
              YEARS OF AGRONOMIC MASTERY
            </p>
          </div>

          <p
            data-km-manifesto
            className="font-[family-name:var(--font-body)] max-w-xl text-[0.95rem] font-light leading-relaxed text-[color:rgba(253,252,248,0.42)]"
          >
            Since 2004, Bharatbhai Solanki has tended these groves. His family before him. The trees remember.
          </p>
        </div>
      </div>
    </section>
  );
}
