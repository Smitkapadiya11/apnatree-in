"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const premiumButton = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
    "font-medium tracking-wide transition-[transform,box-shadow,background-color,color] duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-gold)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "min-h-11",
  ],
  {
    variants: {
      tone: {
        gold:
          "bg-[color:var(--brand-gold)] text-[color:var(--brand-forest)] shadow-[var(--shadow-gold)] hover:bg-[color:var(--brand-gold-light)]",
        forest:
          "bg-[color:var(--brand-forest)] text-[color:var(--brand-cream)] shadow-[var(--shadow-forest)] hover:bg-[color:var(--brand-forest-mid)]",
        cream:
          "bg-[color:var(--brand-cream)] text-[color:var(--brand-forest)] shadow-[var(--shadow-soft)] hover:bg-[color:var(--brand-cream-dark)]",
        outline:
          "border border-[color:var(--brand-forest)]/30 bg-transparent text-[color:var(--brand-forest)] hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-dark)]",
        ghost:
          "bg-transparent text-[color:var(--brand-forest)] hover:bg-[color:var(--brand-cream-dark)]/60",
        glass:
          "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50",
      },
      size: {
        sm: "px-5 text-sm",
        md: "px-7 py-3 text-sm",
        lg: "px-10 py-4 text-base",
        xl: "px-12 py-5 text-base",
      },
    },
    defaultVariants: {
      tone: "gold",
      size: "lg",
    },
  }
);

type PremiumButtonOwnProps = VariantProps<typeof premiumButton> & {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

type PremiumButtonAsButton = PremiumButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof PremiumButtonOwnProps> & {
    href?: undefined;
  };

type PremiumButtonAsLink = PremiumButtonOwnProps & {
  href: string;
  prefetch?: boolean;
  target?: string;
  rel?: string;
};

export type PremiumButtonProps = PremiumButtonAsButton | PremiumButtonAsLink;

const Sheen = ({ active }: { active: boolean }) => (
  <span
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0 -z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out",
      active && "translate-x-full"
    )}
  />
);

export function PremiumButton(props: PremiumButtonProps) {
  const { tone, size, className, children, loading, iconLeft, iconRight } = props;
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = React.useState(false);

  const classes = cn(premiumButton({ tone, size }), className);

  const inner = (
    <>
      <Sheen active={hover && !reduceMotion} />
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading ? (
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : iconLeft ? (
          <span aria-hidden className="inline-flex">
            {iconLeft}
          </span>
        ) : null}
        <span>{children}</span>
        {iconRight ? (
          <span aria-hidden className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5">
            {iconRight}
          </span>
        ) : null}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <motion.span
        whileHover={reduceMotion ? undefined : { y: -1 }}
        whileTap={reduceMotion ? undefined : { y: 0, scale: 0.98 }}
        className="inline-flex"
      >
        <Link
          href={props.href}
          prefetch={props.prefetch}
          target={props.target}
          rel={props.rel}
          className={classes}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  const buttonProps = props as PremiumButtonAsButton;
  const { href: _href, ...buttonRest } = buttonProps;
  void _href;

  return (
    <motion.span
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { y: 0, scale: 0.98 }}
      className="inline-flex"
    >
      <button
        {...buttonRest}
        className={classes}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={buttonRest.disabled || loading}
      >
        {inner}
      </button>
    </motion.span>
  );
}

export { premiumButton as premiumButtonVariants };
