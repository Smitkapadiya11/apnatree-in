"use client";

import { HarvestStatus, ShippingPaymentStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { calculateShippingCost, createShippingPaymentSession } from "@/actions/harvest";
import type { HarvestOrderCard } from "@/lib/queries/harvest-dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function formatInr(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function ShippingPaymentCard({ order }: { order: HarvestOrderCard }) {
  const [line1, setLine1] = useState(order.shippingAddressLine1 ?? "");
  const [line2, setLine2] = useState(order.shippingAddressLine2 ?? "");
  const [city, setCity] = useState(order.shippingCity ?? "");
  const [state, setState] = useState(order.shippingState ?? "");
  const [pincode, setPincode] = useState(order.shippingPincode ?? "");
  const [country, setCountry] = useState(order.shippingCountry ?? "IN");
  const [costPaise, setCostPaise] = useState<number | null>(order.shippingCostPaise);
  const [isQuotePending, startQuote] = useTransition();
  const [isPayPending, startPay] = useTransition();

  const paid = order.shippingPaymentStatus === ShippingPaymentStatus.PAID;

  const disabledStates = useMemo(
    () => order.status !== HarvestStatus.PACKAGED || paid,
    [order.status, paid]
  );

  const quote = () => {
    startQuote(async () => {
      const result = await calculateShippingCost(order.id, {
        shippingAddressLine1: line1,
        shippingAddressLine2: line2 || null,
        shippingCity: city,
        shippingState: state,
        shippingPincode: pincode,
        shippingCountry: country,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setCostPaise(result.data.costPaise);
      toast.success(`Quoted · ${formatInr(result.data.costPaise)} @ ${result.data.weightKg.toFixed(1)} kg`);
    });
  };

  const pay = () => {
    startPay(async () => {
      const result = await createShippingPaymentSession(order.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      window.location.href = result.data.url;
    });
  };

  return (
    <div className="space-y-6 rounded-3xl border border-dashed border-[#c8972a]/50 bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] p-6">
      <div>
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Freight settlement</p>
        <h4 className="font-[family-name:var(--font-heading)] text-2xl">Shipping to your door</h4>
        <p className="text-muted-foreground mt-2 text-sm">
          Gujarat ₹80/kg · Rest of India ₹150/kg · International ₹400/kg (estimated on declared yield).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`ship-line1-${order.id}`}>Address line 1</Label>
          <Input id={`ship-line1-${order.id}`} value={line1} onChange={(e) => setLine1(e.target.value)} disabled={disabledStates} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`ship-line2-${order.id}`}>Address line 2</Label>
          <Input id={`ship-line2-${order.id}`} value={line2} onChange={(e) => setLine2(e.target.value)} disabled={disabledStates} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`ship-city-${order.id}`}>City</Label>
          <Input id={`ship-city-${order.id}`} value={city} onChange={(e) => setCity(e.target.value)} disabled={disabledStates} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`ship-state-${order.id}`}>State / Province</Label>
          <Input id={`ship-state-${order.id}`} value={state} onChange={(e) => setState(e.target.value)} disabled={disabledStates} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`ship-pin-${order.id}`}>Postal code</Label>
          <Input id={`ship-pin-${order.id}`} value={pincode} onChange={(e) => setPincode(e.target.value)} disabled={disabledStates} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`ship-country-${order.id}`}>Country (ISO)</Label>
          <Input id={`ship-country-${order.id}`} value={country} onChange={(e) => setCountry(e.target.value.toUpperCase())} disabled={disabledStates} />
        </div>
      </div>

      {paid ? (
        <p className="text-foreground text-sm font-semibold">Freight secured — watch your inbox for airway bill updates.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <Button type="button" variant="outline" className="rounded-full" disabled={disabledStates || isQuotePending} onClick={quote}>
            {isQuotePending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                Calculating…
              </>
            ) : (
              "Calculate shipping"
            )}
          </Button>

          {costPaise ? (
            <p className="text-lg font-semibold">
              Total <span className="text-[#c8972a]">{formatInr(costPaise)}</span>
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">Run a quote to enable checkout.</p>
          )}

          <Button type="button" className="rounded-full px-8" disabled={disabledStates || !costPaise || isPayPending} onClick={pay}>
            {isPayPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                Redirecting…
              </>
            ) : (
              `Pay shipping (${costPaise ? formatInr(costPaise) : "—"})`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
