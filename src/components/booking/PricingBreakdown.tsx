import type { PricingBreakdown as PricingBreakdownType } from "@/lib/pricing";

type PricingBreakdownProps = {
  breakdown: PricingBreakdownType;
};

export function PricingBreakdown({ breakdown }: PricingBreakdownProps) {
  return (
    <aside className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
      <p className="text-muted-foreground text-xs tracking-[0.35em] uppercase">Investment clarity</p>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Pre-book today</span>
          <span className="font-semibold">{breakdown.prebookingDisplay}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Annual stewardship</span>
          <span className="font-semibold">{breakdown.yearlyRentDisplay}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Contract total</span>
          <span className="font-semibold">{breakdown.totalDisplay}</span>
        </div>
        {breakdown.discountAmountPaise > 0 ? (
          <div className="flex justify-between gap-4 text-emerald-700">
            <span>Multi-year gratitude</span>
            <span>-{breakdown.discountDisplay}</span>
          </div>
        ) : null}
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Phase 1 reserves your allocation queue slot. Phase 2 stewardship invoices unlock once our agronomists confirm your tree.
      </p>
    </aside>
  );
}
