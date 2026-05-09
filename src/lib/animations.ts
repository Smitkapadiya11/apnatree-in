import type { Variants, Transition } from "framer-motion";

export const easeLuxe: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeSoft: [number, number, number, number] = [0.4, 0, 0.2, 1];

const baseTransition: Transition = { duration: 0.7, ease: easeLuxe };

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0, transition: baseTransition },
  exit: { opacity: 0, y: -16, transition: { duration: 0.4, ease: easeSoft } },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -36 },
  animate: { opacity: 1, y: 0, transition: baseTransition },
  exit: { opacity: 0, y: 16, transition: { duration: 0.4, ease: easeSoft } },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: baseTransition },
  exit: { opacity: 0, x: -16, transition: { duration: 0.4, ease: easeSoft } },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: baseTransition },
  exit: { opacity: 0, x: 16, transition: { duration: 0.4, ease: easeSoft } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: easeLuxe } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: easeSoft } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeLuxe } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: easeSoft } },
};

export const bloomIn: Variants = {
  initial: { opacity: 0, scale: 0.92, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeLuxe },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeLuxe } },
};

export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(28,28,28,0.04), 0 8px 24px rgba(28,28,28,0.06)" },
  hover: {
    y: -6,
    boxShadow: "0 6px 18px rgba(28,28,28,0.08), 0 24px 48px rgba(200,151,42,0.18)",
    transition: { duration: 0.32, ease: easeLuxe },
  },
};

export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.18, ease: easeSoft } },
  tap: { scale: 0.97, transition: { duration: 0.12, ease: easeSoft } },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeLuxe } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: easeSoft } },
};

export const heroOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2, ease: easeLuxe } },
};

export const drawerLeft: Variants = {
  initial: { x: "-100%" },
  animate: { x: 0, transition: { duration: 0.4, ease: easeLuxe } },
  exit: { x: "-100%", transition: { duration: 0.3, ease: easeSoft } },
};

export const drawerRight: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.4, ease: easeLuxe } },
  exit: { x: "100%", transition: { duration: 0.3, ease: easeSoft } },
};

export const lineDraw: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: easeLuxe },
  },
};
