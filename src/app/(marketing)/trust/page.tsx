import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ShieldCheck, Sparkles, Trees, Wallet } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MEDIA } from "@/lib/media-map";
import { cn } from "@/lib/utils";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Trust",
  description: "Guarantees, legal scaffolding, and payments posture behind ApnaTree steward contracts.",
};

const GUARANTEES = [
  {
    icon: Trees,
    title: "Living allocation",
    body: "Contracts bind to physical trees — not anonymous baskets.",
  },
  {
    icon: Sparkles,
    title: "Proof cadence",
    body: "Bi-weekly UploadThing chronicles keep dashboards emotionally honest.",
  },
  {
    icon: Wallet,
    title: "Treasury hygiene",
    body: "Stripe Checkout + webhooks remove manual reconciliation drift.",
  },
  {
    icon: ShieldCheck,
    title: "Operational SLA",
    body: "Concierge inbox monitored at support@apnatree.in with ticket IDs.",
  },
];

export default function TrustPage() {
  const certifications = MEDIA.trust.slice(0, 4);

  return (
    <article className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Trust architecture</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">The ApnaTree guarantee</h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
          Transparent rails beat marketing poetry — here is how capital flows from reservation to harvest freight.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {GUARANTEES.map((item) => (
          <article key={item.title} className="border-border rounded-3xl border bg-background/90 p-6 shadow-sm">
            <item.icon className="text-primary size-8" aria-hidden />
            <h2 className="font-[family-name:var(--font-heading)] mt-4 text-2xl">{item.title}</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl">Universal laws of the grove</h2>
        <ol className="text-muted-foreground list-decimal space-y-4 pl-6 text-sm leading-relaxed">
          <li>Honesty over hype — availability caches revalidate on predictable cadences.</li>
          <li>No ghost inventory — PREBOOKING_PENDING sessions expire after 30 minutes.</li>
          <li>Community bandwidth — farm visits respect shared daily visitor ceilings.</li>
          <li>Farmer dignity — pricing sheets originate from agronomy + treasury, not vibes.</li>
          <li>Harvest fidelity — PACKAGED triggers shipping quotes before Stripe captures freight.</li>
        </ol>
      </section>

      {certifications.length ? (
        <section className="space-y-6">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl">Certificates & badges</h2>
          <div className="flex flex-wrap gap-6">
            {certifications.map((src) => (
              <div key={src} className="relative h-28 w-40 overflow-hidden rounded-2xl border border-border/70">
                <Image src={src} alt="Compliance or certification badge" fill sizes="160px" className="object-contain p-2" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-border rounded-3xl border bg-muted/30 p-8">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl">Payments security</h2>
        <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed">
          Stripe processes every checkout session — card data never touches ApnaTree servers. PCI DSS responsibilities remain with Stripe&apos;s certified infrastructure while we verify webhooks using signed secrets.
        </p>
      </section>

      <div className="flex justify-center">
        <Link href="/faq" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10")}>
          Browse full FAQs
        </Link>
      </div>
    </article>
  );
}
