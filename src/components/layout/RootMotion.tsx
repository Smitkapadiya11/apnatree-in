"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { pageTransitionVariants } from "@/lib/animations";

type RootMotionProps = {
  children: ReactNode;
};

export function RootMotion({ children }: RootMotionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

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
