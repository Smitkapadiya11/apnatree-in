"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroBackdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.55, 1]);
  const blur = useTransform(scrollY, [0, 600], [0, 6]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "var(--gradient-premium)",
          opacity: reduceMotion ? 0.85 : overlayOpacity,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={reduceMotion ? undefined : { filter }}
      >
        <div
          className="size-full"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 75% 25%, color-mix(in oklab, #f0c060 38%, transparent) 0%, transparent 55%)",
          }}
        />
      </motion.div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-vignette)", opacity: 0.45 }}
      />
    </>
  );
}
