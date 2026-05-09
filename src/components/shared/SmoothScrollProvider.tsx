"use client";

import Lenis from "lenis";
import * as React from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LenisContext } from "@/contexts/LenisContext";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    const root = document.documentElement;
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      return;
    }

    let cancelled = false;

    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      allowNestedScroll: true,
    });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenisInstance.on("scroll", onLenisScroll);

    const tickerFn = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      scrollHeight: () => Math.max(root.scrollHeight, window.innerHeight),
    });

    ScrollTrigger.refresh();
    queueMicrotask(() => {
      if (!cancelled) setLenis(lenisInstance);
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(tickerFn);
      lenisInstance.off("scroll", onLenisScroll);
      lenisInstance.destroy();
      ScrollTrigger.refresh();
      queueMicrotask(() => setLenis(null));
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
