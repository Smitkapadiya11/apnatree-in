import Link from "next/link";

import { ContractStatus } from "@prisma/client";

import { buttonVariants } from "@/components/ui/button";
import { getContractByStripeSession } from "@/actions/booking";
import { cn } from "@/lib/utils";

import { BookingSuccessPoller } from "./poller";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <section className="space-y-4">
        <p className="text-muted-foreground text-sm">Missing checkout reference.</p>
        <Link href="/dashboard" className={cn(buttonVariants(), "rounded-full px-8")}>
          Back to dashboard
        </Link>
      </section>
    );
  }

  const contract = await getContractByStripeSession(sessionId);

  if (!contract) {
    return <BookingSuccessPoller sessionId={sessionId} />;
  }

  const paid = contract.status === ContractStatus.PREBOOKING_PAID;

  return (
    <section className="space-y-8">
      <div>
        <p className="text-primary text-xs tracking-[0.35em] uppercase">{paid ? "Payment captured" : "Processing"}</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight">
          {paid ? "Welcome deeper into the grove." : "Stripe is finalizing your ledger entry."}
        </h1>
      </div>

      <div className="border-border bg-card max-w-2xl space-y-4 rounded-3xl border p-8 shadow-sm">
        <p className="text-muted-foreground text-sm">Contract</p>
        <p className="font-[family-name:var(--font-heading)] text-3xl">{contract.contractNumber}</p>
        <p className="text-muted-foreground text-sm">
          Tier {contract.tier} · Duration {contract.duration.replaceAll("_", " ")}
        </p>
        <ol className="text-muted-foreground list-decimal space-y-3 pl-5 text-sm leading-relaxed">
          <li>Agronomy allocates your precise tree within our SLA.</li>
          <li>Annual stewardship invoices unlock inside Payments.</li>
          <li>Bi-weekly proof lands under Media Updates.</li>
        </ol>
      </div>

      <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 py-6 text-base")}>
        Continue to dashboard
      </Link>
    </section>
  );
}
