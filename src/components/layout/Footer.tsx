import type { SVGProps } from "react";

import Link from "next/link";

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

const DISCOVER = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/trees", label: "Trees" },
  { href: "/harvest", label: "Harvest" },
  { href: "/farm-visits", label: "Farm Visits" },
];

const TRUST = [
  { href: "/trust", label: "Trust Centre" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:rgba(253,252,248,0.06)] bg-[var(--obsidian-950)] text-[color:rgba(253,252,248,0.55)]">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-[clamp(1.5rem,5vw,4rem)] pt-20 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div className="space-y-7 lg:text-left">
          <div>
            <p className="font-[family-name:var(--font-body)] text-[1rem] font-medium tracking-[0.2em] text-[color:rgba(253,252,248,0.78)]">
              APNATREE
            </p>
            <p className="font-km-mono mt-3 text-[0.55rem] tracking-[0.2em] text-[color:var(--gold-light)]">
              GIR FOREST · EST. 2024
            </p>
          </div>
          <div className="h-px w-[30px] bg-[color:var(--gold-primary)]" aria-hidden />
          <p className="max-w-xs font-[family-name:var(--font-body)] text-[0.85rem] font-light leading-[1.9] text-[color:rgba(253,252,248,0.32)]">
            Rent a living Kesar tree rooted in Gir — curated harvests, farm hospitality, and a dashboard built for trust.
          </p>
          <a
            href="https://instagram.com/apnatree.in"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="Instagram"
            className="inline-flex text-[color:rgba(253,252,248,0.32)] transition-colors hover:text-[color:var(--gold-primary)]"
          >
            <InstagramGlyph className="size-5" />
          </a>
        </div>

        <nav aria-label="Discover" className="lg:text-left">
          <p className="font-km-mono text-[0.55rem] tracking-[0.2em] text-[color:rgba(253,252,248,0.18)]">DISCOVER</p>
          <ul className="mt-6 space-y-3 font-[family-name:var(--font-body)] text-[0.85rem] font-light">
            {DISCOVER.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-1 text-[color:rgba(253,252,248,0.38)] transition-colors hover:text-[color:rgba(253,252,248,0.92)]"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Trust" className="lg:text-left">
          <p className="font-km-mono text-[0.55rem] tracking-[0.2em] text-[color:rgba(253,252,248,0.18)]">TRUST</p>
          <ul className="mt-6 space-y-3 font-[family-name:var(--font-body)] text-[0.85rem] font-light">
            {TRUST.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-1 text-[color:rgba(253,252,248,0.38)] transition-colors hover:text-[color:rgba(253,252,248,0.92)]"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6 lg:text-left">
          <p className="font-km-mono text-[0.55rem] tracking-[0.2em] text-[color:rgba(253,252,248,0.18)]">REACH US</p>
          <div className="space-y-3 font-km-mono text-[0.7rem] tracking-[0.06em] text-[color:rgba(253,252,248,0.38)]">
            <a href="mailto:concierge@apnatree.in" data-cursor="hover" className="block hover:text-[color:var(--gold-light)]">
              concierge@apnatree.in
            </a>
            <a href="tel:+912851234567" data-cursor="hover" className="block hover:text-[color:var(--gold-light)]">
              +91 285 123 4567
            </a>
          </div>
          <p className="max-w-xs font-[family-name:var(--font-body)] text-[0.8rem] font-light leading-relaxed text-[color:rgba(253,252,248,0.28)]">
            Gir Forest Buffer · Junagadh, Gujarat 362150
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] border-t border-[color:rgba(253,252,248,0.06)] px-[clamp(1.5rem,5vw,4rem)] py-6">
        <div className="flex flex-col gap-4 text-center font-km-mono text-[0.55rem] tracking-[0.08em] text-[color:rgba(253,252,248,0.15)] md:flex-row md:items-center md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} APNATREE.IN</p>
          <p className="md:flex-1 md:text-center text-[0.5rem] tracking-[0.18em]">
            CRAFTED IN GUJARAT WITH REVERENCE FOR THE GROVE
          </p>
          <p className="text-[0.5rem] tracking-[0.14em]">STRIPE · UPLOADTHING · RESEND</p>
        </div>
      </div>
    </footer>
  );
}
