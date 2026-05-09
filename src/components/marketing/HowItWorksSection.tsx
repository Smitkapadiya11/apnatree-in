const STEPS = [
  {
    n: "01",
    phase: "PRE-BOOK",
    title: "Reserve allocation",
    body: "Stripe Checkout secures your tree with a transparent reservation fee — refundable until allotment closes.",
  },
  {
    n: "02",
    phase: "STEWARDSHIP",
    title: "Activate the canopy",
    body: "Annual rent opens bi-weekly chronicles in your dashboard and unlocks three Gir hospitality visits.",
  },
  {
    n: "03",
    phase: "HARVEST",
    title: "Weights to freight",
    body: "Pack-house manifests drive shipping checkout — couriers inherit the same ledger you watched all season.",
  },
  {
    n: "04",
    phase: "LEDGER",
    title: "Proof, always",
    body: "Contracts, codes, and payouts remain mirrored in software — concierge replies inherit the audit trail.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative border-y border-[color:rgba(253,252,248,0.06)] bg-[var(--obsidian-900)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(6rem,11vw,10rem)]"
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="font-km-mono text-[0.65rem] tracking-[0.26em] text-[color:var(--gold-light)]">OPERATING CADENCE</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-5 text-[clamp(2.25rem,5vw,4rem)] font-light tracking-tight text-[color:var(--ivory-50)]">
          Four movements. One harvest.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-body)] text-[0.95rem] font-light leading-relaxed text-[color:rgba(253,252,248,0.45)]">
          Grove-to-door rhythm drafted by agronomists and enforced by the same stack your dashboard trusts after checkout.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1200px] gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {STEPS.map((step) => (
          <article
            key={step.n}
            data-cursor="hover"
            className="flex flex-col border border-[color:rgba(253,252,248,0.08)] bg-[var(--obsidian-800)] p-8 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[color:rgba(184,145,42,0.35)] rounded-[16px]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-km-mono text-[0.62rem] tracking-[0.22em] text-[color:var(--gold-primary)]">{step.phase}</span>
              <span className="font-[family-name:var(--font-heading)] text-4xl font-light text-[color:rgba(253,252,248,0.12)]">
                {step.n}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] mt-8 text-2xl font-light text-[color:var(--ivory-50)]">
              {step.title}
            </h3>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[0.88rem] font-light leading-relaxed text-[color:rgba(253,252,248,0.48)]">
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export { HowItWorksSection as HowItWorksHome };
