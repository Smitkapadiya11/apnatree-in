"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const premiumCard = cva(
  [
    "group relative isolate flex flex-col overflow-hidden",
    "rounded-[var(--radius-2xl)] border bg-[color:var(--card)] text-[color:var(--card-foreground)]",
    "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  ],
  {
    variants: {
      tone: {
        cream:
          "border-[color:var(--brand-gold)]/15 bg-[color:var(--brand-ivory)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxe)]",
        forest:
          "border-[color:var(--brand-forest-mid)]/40 bg-[color:var(--brand-forest)] text-[color:var(--brand-cream)] shadow-[var(--shadow-forest)]",
        gold:
          "border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-cream-dark)] text-[color:var(--brand-forest)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)]",
        ghost:
          "border-[color:var(--border)] bg-transparent backdrop-blur-sm hover:border-[color:var(--brand-gold)]/40",
        glass:
          "border-white/20 bg-white/10 text-white backdrop-blur-md shadow-[0_18px_38px_rgba(0,0,0,0.18)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        lift: "hover:-translate-y-1",
        none: "",
      },
    },
    defaultVariants: {
      tone: "cream",
      padding: "lg",
      hover: "lift",
    },
  }
);

export type PremiumCardProps = VariantProps<typeof premiumCard> & {
  className?: string;
  children: React.ReactNode;
  /** Render an animated gold accent line at the top of the card. */
  accent?: boolean;
  /** Subtle decorative grain (paper texture) overlay. */
  grain?: boolean;
  /** Renders as a button-like surface (adds focus styles + role). */
  interactive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  ariaLabel?: string;
};

export function PremiumCard({
  className,
  children,
  tone,
  padding,
  hover,
  accent = false,
  grain = false,
  interactive = false,
  onClick,
  ariaLabel,
}: PremiumCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(premiumCard({ tone, padding, hover }), interactive && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-gold)]/60 focus-visible:ring-offset-2", className)}
      whileHover={reduceMotion || hover === "none" ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {accent ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
          style={{ background: "var(--gradient-gold)" }}
        />
      ) : null}
      {grain ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")",
          }}
        />
      ) : null}
      <div className="relative z-[1] flex h-full w-full flex-col">{children}</div>
    </motion.div>
  );
}

export function PremiumCardHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-2", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h3 className="font-[family-name:var(--font-heading)] text-2xl leading-tight tracking-tight sm:text-3xl">
        {title}
      </h3>
      {description ? (
        <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed sm:text-base">{description}</p>
      ) : null}
    </header>
  );
}

export function PremiumCardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <footer className={cn("mt-auto flex items-center gap-3 pt-6", className)}>{children}</footer>;
}

export { premiumCard as premiumCardVariants };
