"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { staggerContainer, staggerItem } from "@/lib/animations";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  containerVariants?: Variants;
  rootMargin?: string;
  once?: boolean;
};

export function StaggerGroup({
  children,
  className,
  containerVariants = staggerContainer,
  rootMargin = "-8% 0px",
  once = true,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: rootMargin }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function StaggerItem({ children, className, variants = staggerItem }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
