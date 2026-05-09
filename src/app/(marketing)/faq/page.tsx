import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Payment timelines, visits, harvest logistics, and legal posture for ApnaTree stewards.",
};

const FAQ_GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Payment & Pre-booking",
    items: [
      {
        q: "Is the pre-booking fee refundable?",
        a: "No — it secures allocation priority and covers onboarding diligence. Annual stewardship bills separately via Stripe after assignment.",
      },
      {
        q: "Which currencies do you support?",
        a: "Stripe Checkout currently surfaces INR with UPI plus cards, and USD/GBP/EUR card rails for international stewards.",
      },
      {
        q: "How long do Checkout sessions stay open?",
        a: "Pre-booking sessions expire after 30 minutes to prevent stale inventory locks.",
      },
    ],
  },
  {
    title: "Tree Assignment",
    items: [
      {
        q: "When do I learn my tree code?",
        a: "After pre-booking settles and our operations desk assigns a canopy, you receive email with your laser-etched tree code.",
      },
      {
        q: "Can I switch tiers later?",
        a: "Tier changes depend on availability — contact concierge before annual invoicing cycles renew.",
      },
    ],
  },
  {
    title: "Media Updates",
    items: [
      {
        q: "How often will I see proof?",
        a: "Field agents target bi-weekly UploadThing drops with blur-optimized imagery so dashboards stay fast.",
      },
      {
        q: "Can I download archival bundles?",
        a: "Gallery exports are on the roadmap; today everything streams securely inside your dashboard.",
      },
    ],
  },
  {
    title: "Farm Visits",
    items: [
      {
        q: "How many complimentary visits do I receive?",
        a: "Three hosted walks per calendar year with at least seven days notice and shared daily visitor caps.",
      },
      {
        q: "Do you arrange travel?",
        a: "Travel and lodging remain self-managed — we focus on field safety and canopy education.",
      },
    ],
  },
  {
    title: "Harvest & Shipping",
    items: [
      {
        q: "When is freight invoiced?",
        a: "Once pack-house weights register as PACKAGED you can quote zoned shipping (₹80/kg Gujarat / ₹150/kg India / ₹400/kg international guidance) and pay via Stripe SHIPPING sessions.",
      },
      {
        q: "How are yields estimated?",
        a: "Agronomy models publish estimates early-season; actual weights finalize before freight quotes.",
      },
    ],
  },
  {
    title: "Legal & Cancellation",
    items: [
      {
        q: "What law governs contracts?",
        a: "Indian law governs stewardship paperwork — refer to Terms for dispute routing.",
      },
      {
        q: "Can contracts cancel after activation?",
        a: "Cancellation windows depend on contract arc — email support@apnatree.in with your contract number.",
      },
    ],
  },
];

export default function FaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Knowledge grove</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">FAQ</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
          Structured data mirrors what Google surfaces — expand each answer inline without heavy JavaScript.
        </p>
      </header>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="mt-14 space-y-12">
        {FAQ_GROUPS.map((group) => (
          <section key={group.title} className="space-y-4">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl">{group.title}</h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <details key={item.q} className="border-border group rounded-2xl border bg-background/90 px-4 py-3">
                  <summary className="cursor-pointer text-base font-semibold outline-none marker:text-[#c8972a]">{item.q}</summary>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
