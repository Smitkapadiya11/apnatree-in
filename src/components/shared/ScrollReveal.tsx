"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { fadeInUp } from "@/lib/animations";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  /** Margin passed to the IntersectionObserver root margin. Negative pulls trigger inward. */
  rootMargin?: string;
  /** Re-trigger every time the element enters viewport. Defaults to `true` (single-shot). */
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  rootMargin = "-10% 0px",
  once = true,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: rootMargin }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
