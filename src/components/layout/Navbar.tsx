"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

import { PremiumButton } from "@/components/ui/PremiumButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "/trees", label: "Trees" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/trust", label: "Trust" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  const isHome = pathname === "/";

  React.useEffect(() => {
    const unsub = scrollY.on("change", (value) => setScrolled(value > 56));
    return () => unsub();
  }, [scrollY]);

  React.useEffect(() => {
    queueMicrotask(() => setOpen(false));
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const heroTransparent = isHome && !scrolled;
  const subtleGlassOpacity = useTransform(scrollY, [0, 96], [0.08, 0.55]);

  return (
    <>
      <motion.header
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-[border-color,backdrop-filter,background-color] duration-500",
          heroTransparent ? "border-transparent" : "border-white/10 backdrop-blur-xl"
        )}
      >
        {!heroTransparent ? (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[color:var(--brand-forest-deep)]/94"
          />
        ) : (
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-transparent"
            style={reduceMotion ? { opacity: 1 } : { opacity: subtleGlassOpacity }}
          />
        )}

        <div className="container-luxe flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            className={cn(
              "font-[family-name:var(--font-heading)] flex items-baseline gap-1 text-2xl tracking-tight transition-colors duration-300",
              heroTransparent ? "text-[color:var(--brand-cream)]" : "text-[color:var(--brand-cream)]"
            )}
          >
            <span>Apna</span>
            <span className={cn("font-semibold", heroTransparent ? "gold-shimmer-text" : "text-gold-gradient")}>Tree</span>
            <span
              className={cn(
                "align-super text-xs",
                heroTransparent ? "text-[color:var(--brand-cream)]/55" : "text-[color:var(--brand-cream)]/50"
              )}
            >
              .in
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm transition-colors duration-300",
                    heroTransparent
                      ? active
                        ? "text-white"
                        : "text-white/78 hover:text-white"
                      : active
                        ? "text-[color:var(--brand-cream)]"
                        : "text-[color:var(--brand-cream)]/70 hover:text-[color:var(--brand-cream)]"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      active ? "scale-x-100" : "group-hover:scale-x-100"
                    )}
                    style={{ background: "var(--gradient-gold)" }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className={cn(
                "text-sm transition-colors",
                heroTransparent ? "text-white/78 hover:text-white" : "text-[color:var(--brand-cream)]/72 hover:text-[color:var(--brand-cream)]"
              )}
            >
              Sign in
            </Link>
            <PremiumButton href="/trees" size="sm" tone={heroTransparent ? "glass" : "gold"}>
              Reserve
            </PremiumButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={cn(
              "min-touch inline-flex items-center justify-center rounded-full border px-3 py-2 transition-colors lg:hidden",
              heroTransparent
                ? "border-white/35 bg-white/10 text-white backdrop-blur-md hover:border-white/55 hover:bg-white/15"
                : "border-white/18 bg-white/8 text-[color:var(--brand-cream)] backdrop-blur-md hover:border-[color:var(--brand-gold)]/45"
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Dismiss navigation"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />
            <motion.nav
              initial={{ y: "-105%" }}
              animate={{ y: 0 }}
              exit={{ y: "-105%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 max-h-[min(92vh,920px)] overflow-y-auto border-b border-white/12 bg-[color:var(--brand-forest-deep)] px-6 pb-12 pt-24 shadow-[0_40px_120px_rgba(3,8,3,0.65)]"
              aria-label="Mobile primary"
            >
              <p className="eyebrow mb-4 text-[color:var(--brand-gold-light)]">Navigate</p>
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-white/10 last:border-b-0">
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-heading)] block py-4 text-3xl text-[color:var(--brand-cream)] transition-colors hover:text-[color:var(--brand-gold-light)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3">
                <PremiumButton href="/trees" tone="gold" size="lg" className="w-full">
                  Reserve a tree
                </PremiumButton>
                <PremiumButton href="/login" tone="glass" size="md" className="w-full">
                  Sign in
                </PremiumButton>
              </div>
              <p className="mt-12 text-xs text-[color:var(--brand-cream)]/45">© {new Date().getFullYear()} ApnaTree.in</p>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div aria-hidden className="h-[68px]" />
    </>
  );
}
