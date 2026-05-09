"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useLenis } from "@/contexts/LenisContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/trees", label: "Trees" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/trust", label: "Trust" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const sync = () => {
      const y = lenis ? lenis.scroll : window.scrollY;
      setScrolled(y > 80);
    };

    if (lenis) {
      lenis.on("scroll", sync);
    } else {
      window.addEventListener("scroll", sync, { passive: true });
    }
    sync();

    return () => {
      if (lenis) lenis.off("scroll", sync);
      else window.removeEventListener("scroll", sync);
    };
  }, [lenis]);

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

  const shell = scrolled
    ? "border-b border-[color:rgba(253,252,248,0.06)] bg-[color:rgba(9,13,16,0.88)] shadow-[0_1px_0_rgba(184,145,42,0.08),0_8px_40px_rgba(5,8,10,0.4)] backdrop-blur-[32px] backdrop-saturate-[160%]"
    : "border-b border-transparent bg-transparent";

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-[1000] h-[72px]", shell)}>
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full max-w-[1440px] items-center gap-4 px-[clamp(1.5rem,5vw,4rem)]"
          style={{ WebkitBackdropFilter: scrolled ? "blur(32px) saturate(160%)" : undefined }}
        >
          <div className="flex min-w-0 flex-1 items-center justify-start">
            <Link
              href="/"
              data-cursor="hover"
              className="flex items-center gap-3 text-[color:var(--ivory-50)]"
            >
              <span className="font-[family-name:var(--font-body)] text-[0.9rem] font-medium tracking-[0.2em]">
                APNA
              </span>
              <span aria-hidden className="h-3.5 w-px bg-[color:rgba(184,145,42,0.35)] opacity-60" />
              <span className="font-[family-name:var(--font-body)] text-[0.9rem] font-medium tracking-[0.2em] text-[color:var(--gold-light)]">
                TREE
              </span>
            </Link>
          </div>

          <div className="hidden flex-[1.4] items-center justify-center lg:flex">
            <ul className="flex items-center gap-10">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-cursor="hover"
                      className={cn(
                        "font-[family-name:var(--font-body)] relative pb-1 text-[0.78rem] tracking-[0.06em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[color:var(--gold-primary)] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
                        active
                          ? "text-[color:var(--ivory-50)] after:scale-x-100"
                          : "text-[color:rgba(253,252,248,0.5)] hover:text-[color:rgba(253,252,248,0.95)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-1 items-center justify-end gap-5">
            <Link
              href="/login"
              data-cursor="hover"
              className="font-km-mono hidden text-[0.65rem] tracking-[0.2em] text-[color:rgba(253,252,248,0.38)] transition-colors hover:text-[color:var(--ivory-100)] sm:inline-flex sm:items-center sm:gap-2"
            >
              SIGN IN <span aria-hidden>→</span>
            </Link>
            <span aria-hidden className="hidden h-4 w-px bg-[color:rgba(253,252,248,0.14)] sm:block" />
            <Link
              href="/trees"
              data-cursor="hover"
              className="font-km-mono hidden rounded-[4px] bg-[color:var(--gold-primary)] px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-[color:var(--obsidian-950)] transition-colors hover:bg-[color:var(--gold-light)] md:inline-block"
            >
              RESERVE
            </Link>

            <button
              type="button"
              data-cursor="hover"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="km-mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-5 bg-[color:rgba(253,252,248,0.55)]"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="block h-px w-5 bg-[color:rgba(253,252,248,0.55)]"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-5 bg-[color:rgba(253,252,248,0.55)]"
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="km-mobile-nav"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[999] flex max-h-[100svh] flex-col bg-[var(--obsidian-900)] px-8 pb-12 pt-28 lg:hidden"
          >
            <ul className="flex flex-1 flex-col items-center justify-center gap-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    onClick={() => setOpen(false)}
                    className="font-[family-name:var(--font-heading)] text-[clamp(3rem,8vw,5rem)] font-light text-[color:var(--ivory-50)]"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mx-auto mb-10 h-px w-[min(420px,88vw)] bg-[color:rgba(184,145,42,0.35)]" />
            <p className="font-km-mono text-center text-[0.7rem] tracking-[0.12em] text-[color:rgba(253,252,248,0.38)]">
              concierge@apnatree.in · +91 285 123 4567
            </p>
            <Link
              href="/trees"
              data-cursor="hover"
              onClick={() => setOpen(false)}
              className="font-km-mono mt-8 block w-full rounded-[4px] bg-[color:var(--gold-primary)] py-4 text-center text-[0.65rem] tracking-[0.22em] text-[color:var(--obsidian-950)]"
            >
              RESERVE →
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div aria-hidden className="h-[72px]" />
    </>
  );
}
