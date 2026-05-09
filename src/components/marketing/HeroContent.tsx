"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const STATS = [
  { label: "Trees nurtured", value: "87+", suffix: "rented" },
  { label: "Availability", value: "150", suffix: "standing" },
  { label: "Annual visits", value: "3", suffix: "complimentary" },
  { label: "Harvest rights", value: "100%", suffix: "yours" },
];

export function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-8 text-white"
    >
      <motion.p
        variants={staggerItem}
        className="text-[color:var(--brand-gold-light)] text-xs tracking-[0.4em] uppercase sm:text-sm"
      >
        Gir Forest, Gujarat — Rooted in tradition
      </motion.p>

      <motion.h1
        id="hero-heading"
        variants={staggerItem}
        className="font-[family-name:var(--font-heading)] max-w-4xl text-balance text-5xl leading-[1.02] font-light tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        Own a Kesar Mango Tree.
        <span className="mt-2 block text-[color-mix(in_oklab,white_82%,transparent)] italic">
          Taste what you grow.
        </span>
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className="max-w-2xl text-base leading-relaxed text-[color-mix(in_oklab,white_85%,transparent)] sm:text-lg"
      >
        Rent an authentic Kesar mango tree from India&apos;s most prized grove. Receive personalized farm updates,
        host annual visits, and take home every kilogram we harvest in your name.
      </motion.p>

      <motion.div variants={staggerItem} className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <PremiumButton href="/trees" tone="gold" size="lg" iconRight={<span aria-hidden>→</span>}>
          Reserve your tree
        </PremiumButton>
        <PremiumButton href="/how-it-works" tone="glass" size="lg">
          Watch our story
        </PremiumButton>
      </motion.div>

      <motion.dl
        variants={fadeInUp}
        initial={reduceMotion ? "animate" : "initial"}
        animate="animate"
        transition={{ delay: 0.6 }}
        className="mt-8 grid gap-6 rounded-[var(--radius-2xl)] border border-white/15 bg-black/25 px-6 py-6 text-sm backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <dt className="text-white/65 text-xs uppercase tracking-[0.25em]">{stat.label}</dt>
            <dd className="font-[family-name:var(--font-heading)] text-2xl">
              <span className="text-gold-gradient">{stat.value}</span>{" "}
              <span className="text-white/85 text-base">{stat.suffix}</span>
            </dd>
          </div>
        ))}
      </motion.dl>
    </motion.div>
  );
}
