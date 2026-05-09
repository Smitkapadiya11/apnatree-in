"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getContractByStripeSession } from "@/actions/booking";

type BookingSuccessPollerProps = {
  sessionId: string;
};

export function BookingSuccessPoller({ sessionId }: BookingSuccessPollerProps) {
  const router = useRouter();
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTicks((tick) => tick + 1);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    void (async () => {
      const contract = await getContractByStripeSession(sessionId);
      if (contract) {
        router.refresh();
      }
    })();
  }, [sessionId, ticks, router]);

  return (
    <div className="space-y-4">
      <p className="font-[family-name:var(--font-heading)] text-3xl">Payment processing…</p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Stripe webhooks finalize your contract within seconds. This page refreshes automatically without blocking your thread.
      </p>
    </div>
  );
}
