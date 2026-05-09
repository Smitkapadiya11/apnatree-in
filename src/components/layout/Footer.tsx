import type { SVGProps } from "react";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

const COLUMNS = [
  {
    heading: "Discover",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/trees", label: "Trees" },
      { href: "/harvest", label: "Harvest" },
      { href: "/farm-visits", label: "Farm visits" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { href: "/trust", label: "Trust centre" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden text-[color:var(--brand-cream)]"
      style={{ background: "var(--gradient-hero)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-gold)", opacity: 0.55 }}
      />

      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-[2fr,1fr,1fr,1fr]">
        <div className="space-y-5">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] inline-flex items-baseline gap-1 text-3xl tracking-tight"
          >
            <span>Apna</span>
            <span className="text-gold-gradient font-semibold">Tree</span>
            <span className="text-[color:var(--brand-cream)]/50 text-sm align-super">.in</span>
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-[color:var(--brand-cream)]/75">
            Rent a living Kesar tree rooted in Gir — curated harvests, farm hospitality, and a dashboard built for trust. Crafted in Gujarat with reverence for the grove.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-[color:var(--brand-cream)]/80">
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-[color:var(--brand-gold-light)]" aria-hidden />
              <span>Gir Forest Buffer · Junagadh, Gujarat 362150</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="size-4 text-[color:var(--brand-gold-light)]" aria-hidden />
              <a href="mailto:concierge@apnatree.in" className="hover:underline">concierge@apnatree.in</a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="size-4 text-[color:var(--brand-gold-light)]" aria-hidden />
              <a href="tel:+912851234567" className="hover:underline">+91 285 123 4567</a>
            </li>
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="space-y-4 text-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--brand-gold-light)]">{col.heading}</p>
            <ul className="space-y-2 text-[color:var(--brand-cream)]/80">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-[color:var(--brand-cream)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="space-y-4 text-sm">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--brand-gold-light)]">Stay close</p>
          <p className="text-[color:var(--brand-cream)]/75">
            Field photography, harvest dates, and quiet stewardship news — only when canopy opens.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/apnatree.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-touch inline-flex items-center justify-center rounded-full border border-[color:var(--brand-cream)]/20 bg-white/5 text-[color:var(--brand-cream)] transition-colors hover:border-[color:var(--brand-gold)]/60"
              aria-label="ApnaTree on Instagram"
            >
              <InstagramGlyph className="size-5" />
            </a>
            <Link
              href="/contact"
              className="min-touch inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-[color:var(--brand-gold)]/10 px-4 text-sm text-[color:var(--brand-gold-light)] hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-cream)]"
            >
              Talk to concierge
            </Link>
          </div>
          <p className="inline-flex items-center gap-2 text-xs text-[color:var(--brand-cream)]/60">
            <ShieldCheck className="size-3" aria-hidden /> Stripe + UploadThing + Resend
          </p>
        </div>
      </div>

      <div className="container-luxe border-t border-[color:var(--brand-cream)]/15 py-6 text-xs text-[color:var(--brand-cream)]/60 sm:flex sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ApnaTree.in — Crafted in Gujarat with reverence for the grove.</p>
        <p className="mt-2 sm:mt-0">CIN U01234GJ2026PTC998877 · GSTIN 24AAAAA0000A1Z5</p>
      </div>
    </footer>
  );
}
