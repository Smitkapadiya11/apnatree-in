"use client";

import { addDays, format, isBefore, startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { requestFarmVisit } from "@/actions/visits";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContractOption = {
  id: string;
  contractNumber: string;
  treeCode: string | null;
};

export function VisitScheduler({
  contracts,
  unavailableDateKeys,
  usedFreeVisitsThisYear,
}: {
  contracts: ContractOption[];
  unavailableDateKeys: string[];
  usedFreeVisitsThisYear: number;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [visitors, setVisitors] = useState(2);
  const [notes, setNotes] = useState("");
  const [contractId, setContractId] = useState(contracts[0]?.id ?? "");
  const [isPending, startTransition] = useTransition();

  const unavailable = useMemo(() => new Set(unavailableDateKeys), [unavailableDateKeys]);
  const freeRemaining = Math.max(0, 3 - usedFreeVisitsThisYear);
  const disabled = freeRemaining <= 0 || contracts.length === 0;

  const matcher = (day: Date) => {
    const normalized = startOfDay(day);
    const earliest = addDays(startOfDay(new Date()), 7);
    if (isBefore(normalized, earliest)) {
      return true;
    }
    const key = format(normalized, "yyyy-MM-dd");
    return unavailable.has(key);
  };

  const submit = () => {
    if (!contractId || !date) {
      toast.error("Pick a contract and visit date.");
      return;
    }

    startTransition(async () => {
      const result = await requestFarmVisit({
        contractId,
        visitDate: date,
        numberOfVisitors: visitors,
        notes: notes.length ? notes : null,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(`Requested · confirmation ${result.data.confirmationCode}`);
      setNotes("");
      setDate(undefined);
    });
  };

  if (contracts.length === 0) {
    return (
      <p className="text-muted-foreground border-border rounded-3xl border border-dashed p-8 text-sm leading-relaxed">
        Activate a steward contract to unlock complimentary Gir visits.
      </p>
    );
  }

  return (
    <div className="border-border space-y-8 rounded-3xl border bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Scheduler</p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight">Book a canopy walk</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Minimum seven days&apos; notice · capacity-managed calendar · alphanumeric confirmation for gate check-in.
        </p>
      </div>

      {disabled ? (
        <p className="text-muted-foreground bg-muted/40 rounded-2xl border border-dashed p-6 text-sm leading-relaxed">
          You have used all 3 free visits this year. Contact us to arrange additional visits.
        </p>
      ) : (
        <>
          {contracts.length > 1 ? (
            <div className="space-y-2">
              <Label htmlFor="visit-contract">Contract</Label>
              <select
                id="visit-contract"
                value={contractId}
                onChange={(event) => setContractId(event.target.value)}
                className="border-input bg-background ring-offset-background focus-visible:ring-ring min-h-11 w-full rounded-2xl border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                {contracts.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.contractNumber} · Tree {row.treeCode ?? "—"}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[auto,1fr]">
            <div className="space-y-3">
              <Label>Select date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={matcher}
                className="rounded-3xl border border-border/70 bg-background/90 p-3 shadow-sm"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="visit-visitors">Visitors (1–6)</Label>
                <select
                  id="visit-visitors"
                  value={visitors}
                  onChange={(event) => setVisitors(Number.parseInt(event.target.value, 10))}
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring min-h-11 w-full max-w-xs rounded-2xl border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-notes">Notes (optional)</Label>
                <Textarea
                  id="visit-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  className="rounded-2xl"
                  placeholder="Accessibility needs, preferred arrival window…"
                />
              </div>

              <Button type="button" size="lg" className="rounded-full px-10" disabled={isPending} onClick={submit}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                    Sending request…
                  </>
                ) : (
                  "Submit visit request"
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
