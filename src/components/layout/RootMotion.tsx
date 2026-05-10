"use client";

import type { ReactNode } from "react";
import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { pageTransitionVariants } from "@/lib/animations";

type RootMotionProps = {
  children: ReactNode;
};

/**
 * Avoid SSR/client mismatch: `useReducedMotion()` can differ on first paint vs server.
 * Defer route transition wrapper until after mount.
 */
export function RootMotion({ children }: RootMotionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="contents"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
