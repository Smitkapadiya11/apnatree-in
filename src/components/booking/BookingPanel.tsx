"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import { ContractDuration, TreeTier } from "@prisma/client";

import { createPreBookingSession, previewPricing } from "@/actions/booking";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PricingBreakdown } from "./PricingBreakdown";

type BookingPanelProps = {
  tier: TreeTier;
  initialDuration: ContractDuration;
};

const durations: ContractDuration[] = [
  ContractDuration.ONE_YEAR,
  ContractDuration.TWO_YEAR,
  ContractDuration.FIVE_YEAR,
];

export function BookingPanel({ tier, initialDuration }: BookingPanelProps) {
  const [duration, setDuration] = useState(initialDuration);
  const [currency, setCurrency] = useState<"INR" | "USD" | "GBP" | "EUR">("INR");
  const [breakdown, setBreakdown] = useState<Awaited<ReturnType<typeof previewPricing>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    void previewPricing(tier, duration).then((data) => {
      if (!cancelled) setBreakdown(data);
    });
    return () => {
      cancelled = true;
    };
  }, [tier, duration]);

  const durationLabel = useMemo(
    () => ({
      [ContractDuration.ONE_YEAR]: "1 year",
      [ContractDuration.TWO_YEAR]: "2 years · Save 5%",
      [ContractDuration.FIVE_YEAR]: "5 years · Save 12%",
    }),
    []
  );

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("tier", tier);
      formData.set("duration", duration);
      formData.set("currency", currency);
      const result = await createPreBookingSession(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      window.location.href = result.data.url;
    });
  };

  if (!breakdown) {
    return <div className="text-muted-foreground text-sm">Preparing steward economics…</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-xs tracking-[0.3em] uppercase">Contract arc</Label>
          <div className="grid gap-3 sm:grid-cols-3">
            {durations.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDuration(value)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                  duration === value
                    ? "border-primary ring-primary/40 shadow-[0_12px_38px_rgba(200,151,42,0.25)] ring-2"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-semibold">{durationLabel[value]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Settlement currency</Label>
          <Select value={currency} onValueChange={(v) => setCurrency(v as typeof currency)}>
            <SelectTrigger id="currency" className="w-full max-w-xs rounded-xl">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">INR · ₹</SelectItem>
              <SelectItem value="USD">USD · $</SelectItem>
              <SelectItem value="GBP">GBP · £</SelectItem>
              <SelectItem value="EUR">EUR · €</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error ? (
          <p className="text-destructive text-sm" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="button"
          size="lg"
          className="rounded-full px-10 py-6 text-base font-semibold"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Opening Stripe…" : `Reserve with ${breakdown.prebookingDisplay}`}
        </Button>
      </div>

      <PricingBreakdown breakdown={breakdown} />
    </div>
  );
}
