"use client";

import type { ReactNode } from "react";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  threshold?: number;
};

export function ScrollReveal({ children, className, threshold }: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal(threshold);

  return (
    <div ref={ref} className={cn("reveal-transition", visible && "reveal-transition-visible", className)}>
      {children}
    </div>
  );
}
