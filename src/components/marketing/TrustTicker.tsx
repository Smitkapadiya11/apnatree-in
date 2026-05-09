const MARK =
  "GI CERTIFIED KESAR ◆ STRIPE SETTLEMENT ◆ LEGAL LEASE AGREEMENT ◆ BI-WEEKLY CHRONICLES ◆ 100% HARVEST YOURS ◆ CONCIERGE GRADE VISITS ◆ GIR BUFFER FOREST ◆ ORGANIC CULTIVATION ◆ 22 YEARS IN GIR ◆";

export function TrustTicker() {
  const chunk = (
    <span className="inline-flex shrink-0 items-center gap-4 px-10">
      <span className="text-[color:var(--gold-primary)]">◆</span>
      <span>{MARK}</span>
    </span>
  );

  return (
    <section
      aria-label="Trust credentials"
      className="trust-ticker relative h-11 overflow-hidden border-y border-[color:rgba(253,252,248,0.06)] bg-[var(--obsidian-800)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-20 bg-gradient-to-r from-[var(--obsidian-800)] to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-20 bg-gradient-to-l from-[var(--obsidian-800)] to-transparent"
      />
      <div className="flex h-full items-center">
        <div className="trust-ticker-track font-km-mono flex items-center text-[0.6rem] tracking-[0.22em] text-[color:rgba(253,252,248,0.28)]">
          {chunk}
          <span aria-hidden>{chunk}</span>
        </div>
      </div>
    </section>
  );
}
