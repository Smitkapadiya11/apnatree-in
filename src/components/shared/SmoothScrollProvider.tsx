"use client";

import * as React from "react";

import { LenisContext } from "@/contexts/LenisContext";

import type Lenis from "lenis";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

/**
 * Lenis + GSAP ScrollTrigger load only in the browser (dynamic import).
 * Default export supports `next/dynamic(..., { ssr: false })`.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    let lenisInstance: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let onLenisScroll: (() => void) | null = null;
    let gsapApi: typeof import("gsap").gsap | null = null;

    async function init() {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      try {
        await import("lenis/dist/lenis.css");
        const { default: LenisCtor } = await import("lenis");
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        if (cancelled) return;

        gsapApi = gsap;
        gsap.registerPlugin(ScrollTrigger);

        lenisInstance = new LenisCtor({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.85,
          touchMultiplier: 1.5,
          allowNestedScroll: true,
        });

        onLenisScroll = () => {
          ScrollTrigger.update();
        };
        lenisInstance.on("scroll", onLenisScroll);

        tickerFn = (time: number) => {
          lenisInstance?.raf(time * 1000);
        };
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        const root = document.documentElement;
        ScrollTrigger.scrollerProxy(root, {
          scrollTop(value) {
            if (arguments.length && typeof value === "number" && lenisInstance) {
              lenisInstance.scrollTo(value, { immediate: true });
            }
            return lenisInstance?.scroll ?? 0;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          scrollHeight: () => Math.max(root.scrollHeight, window.innerHeight),
        });

        ScrollTrigger.refresh();
        queueMicrotask(() => {
          if (!cancelled && lenisInstance) setLenis(lenisInstance);
        });
      } catch (e) {
        console.error("[SmoothScrollProvider]", e);
      }
    }

    void init();

    return () => {
      cancelled = true;
      if (gsapApi && tickerFn) {
        gsapApi.ticker.remove(tickerFn);
      }
      if (lenisInstance && onLenisScroll) {
        lenisInstance.off("scroll", onLenisScroll);
      }
      lenisInstance?.destroy();
      void import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          ScrollTrigger.scrollerProxy(document.documentElement, {});
          ScrollTrigger.refresh();
        })
        .catch(() => {});
      queueMicrotask(() => setLenis(null));
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
