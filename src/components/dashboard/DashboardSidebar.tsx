"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Home,
  Image as ImageIcon,
  CalendarDays,
  Sprout,
  Wallet,
  UserRound,
  Menu,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/media", label: "Media updates", icon: ImageIcon },
  { href: "/dashboard/visits", label: "Farm visits", icon: CalendarDays },
  { href: "/dashboard/harvest", label: "Harvest", icon: Sprout },
  { href: "/dashboard/payments", label: "Payments", icon: Wallet },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-touch inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--brand-forest)]/15 bg-[color:var(--brand-ivory)] px-4 text-sm text-[color:var(--brand-forest)]"
          aria-controls="dashboard-nav"
          aria-expanded={open}
        >
          <Menu className="size-4" aria-hidden /> Concierge menu
        </button>
      </div>

      <aside
        id="dashboard-nav"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(320px,90vw)] -translate-x-full overflow-y-auto bg-[color:var(--brand-cream)] px-6 py-10 shadow-[var(--shadow-luxe)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:w-72 lg:translate-x-0 lg:border-r lg:border-[color:var(--brand-gold)]/20 lg:shadow-none",
          open && "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-heading)] inline-flex items-baseline gap-1 text-2xl text-[color:var(--brand-forest)]"
          >
            <span>Apna</span>
            <span className="text-gold-gradient font-semibold">Tree</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="min-touch inline-flex items-center justify-center rounded-full bg-[color:var(--brand-ivory)] text-[color:var(--brand-forest)] lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-10">
          <p className="eyebrow">Concierge</p>
          <p className="font-[family-name:var(--font-heading)] mt-2 text-3xl text-[color:var(--brand-forest)]">
            Your grove desk
          </p>
        </div>

        <nav className="mt-8 flex flex-col gap-1" aria-label="Dashboard">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex min-h-11 items-center gap-3 rounded-2xl px-4 text-sm transition-colors duration-300",
                  active
                    ? "bg-[color:var(--brand-ivory)] text-[color:var(--brand-forest)] shadow-[var(--shadow-soft)]"
                    : "text-[color:var(--brand-forest)]/70 hover:bg-[color:var(--brand-cream-dark)]/50 hover:text-[color:var(--brand-forest)]"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="dash-active"
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-1 rounded-full"
                    style={{ background: "var(--gradient-gold)" }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                ) : null}
                <Icon className="size-4" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-12 rounded-2xl border border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-ivory)] p-5 text-sm text-[color:var(--brand-forest)]">
          <p className="eyebrow">Need a hand?</p>
          <p className="mt-2 leading-relaxed">
            Concierge agents reply within four hours, 7 days a week.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-flex text-sm font-semibold text-[color:var(--brand-gold-dark)] underline-offset-4 hover:underline"
          >
            Talk to concierge →
          </Link>
        </div>
      </aside>

      {open ? (
        <button
          aria-label="Dismiss navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[color:var(--brand-forest)]/40 backdrop-blur-sm lg:hidden"
        />
      ) : null}
    </>
  );
}
