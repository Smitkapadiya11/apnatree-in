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

  React.useEffect(() => {
    const unsub = scrollY.on("change", (value) => setScrolled(value > 32));
    return () => unsub();
  }, [scrollY]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const opacity = useTransform(scrollY, [0, 80], [0.65, 0.92]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,border-color] duration-500",
          scrolled
            ? "border-b border-[color:var(--brand-gold)]/15 backdrop-blur-xl"
            : "border-b border-transparent backdrop-blur-md"
        )}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[color:var(--brand-cream)]"
          style={reduceMotion ? { opacity: 0.92 } : { opacity }}
        />
        <div className="container-luxe flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] flex items-baseline gap-1 text-2xl tracking-tight text-[color:var(--brand-forest)]"
          >
            <span>Apna</span>
            <span className="text-gold-gradient font-semibold">Tree</span>
            <span className="text-[color:var(--brand-forest)]/55 text-xs align-super">.in</span>
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
                    active
                      ? "text-[color:var(--brand-forest)]"
                      : "text-[color:var(--brand-forest)]/65 hover:text-[color:var(--brand-forest)]"
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
              className="text-sm text-[color:var(--brand-forest)]/70 hover:text-[color:var(--brand-forest)] transition-colors"
            >
              Sign in
            </Link>
            <PremiumButton href="/trees" size="sm" tone="forest">
              Reserve
            </PremiumButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="min-touch inline-flex items-center justify-center rounded-full border border-[color:var(--brand-forest)]/15 bg-[color:var(--brand-ivory)] text-[color:var(--brand-forest)] transition-colors hover:border-[color:var(--brand-gold)]/60 lg:hidden"
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
              className="absolute inset-0 bg-[color:var(--brand-forest)]/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[min(380px,86vw)] flex-col overflow-y-auto bg-[color:var(--brand-cream)] px-6 pb-10 pt-24 shadow-[var(--shadow-luxe)]"
            >
              <p className="eyebrow mb-3">Navigate</p>
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-[color:var(--brand-forest)]/10 last:border-b-0">
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-heading)] block py-4 text-3xl text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-gold-dark)]"
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
                <PremiumButton href="/login" tone="outline" size="md" className="w-full">
                  Sign in
                </PremiumButton>
              </div>
              <p className="text-muted-foreground mt-auto pt-10 text-xs">
                © {new Date().getFullYear()} ApnaTree.in
              </p>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div aria-hidden className="h-[68px]" />
    </>
  );
}
