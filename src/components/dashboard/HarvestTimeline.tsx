import { HarvestStatus } from "@prisma/client";
import { Check, CircleDashed, Package, Truck } from "lucide-react";

import type { HarvestOrderCard } from "@/lib/queries/harvest-dashboard";

import { ShippingPaymentCard } from "@/components/dashboard/ShippingPaymentCard";
import { cn } from "@/lib/utils";

const STAGES: { status: HarvestStatus; label: string; icon: typeof Check }[] = [
  { status: HarvestStatus.PENDING, label: "Pending", icon: CircleDashed },
  { status: HarvestStatus.IN_PROGRESS, label: "In progress", icon: CircleDashed },
  { status: HarvestStatus.PACKAGED, label: "Packaged", icon: Package },
  { status: HarvestStatus.SHIPPED, label: "Shipped", icon: Truck },
  { status: HarvestStatus.DELIVERED, label: "Delivered", icon: Check },
];

function stageIndex(status: HarvestStatus): number {
  const idx = STAGES.findIndex((stage) => stage.status === status);
  return idx === -1 ? 0 : idx;
}

export function HarvestTimeline({ orders }: { orders: HarvestOrderCard[] }) {
  if (!orders.length) {
    return (
      <div className="border-border rounded-3xl border border-dashed p-10 text-center">
        <p className="font-[family-name:var(--font-heading)] text-2xl">Harvest ledger empty</p>
        <p className="text-muted-foreground mt-3 text-sm">
          Season manifests surface here once your tree enters the packing calendar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => {
        const active = stageIndex(order.status);

        return (
          <article key={order.id} className="border-border rounded-3xl border bg-background/80 p-6 shadow-sm sm:p-8">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-primary text-xs tracking-[0.35em] uppercase">Season</p>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl">{order.season}</h3>
              </div>
              <dl className="text-muted-foreground grid gap-2 text-sm sm:text-right">
                <div>
                  <dt className="inline font-semibold text-foreground">Estimate:&nbsp;</dt>
                  <dd className="inline">{order.estimatedYieldKg ? `${order.estimatedYieldKg} kg` : "TBD"}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Actual:&nbsp;</dt>
                  <dd className="inline">{order.actualYieldKg ? `${order.actualYieldKg} kg` : "Pending weigh-in"}</dd>
                </div>
              </dl>
            </header>

            <div className="mt-8 overflow-x-auto pb-4">
              <ol className="flex min-w-[640px] gap-4">
                {STAGES.map((stage, index) => {
                  const Icon = stage.icon;
                  const complete = index < active;
                  const current = index === active;

                  return (
                    <li key={stage.status} className="flex flex-1 flex-col items-center gap-3 text-center">
                      <div
                        className={cn(
                          "flex size-12 items-center justify-center rounded-full border",
                          complete && "border-[#c8972a] bg-[color-mix(in_oklab,var(--accent)_25%,transparent)] text-foreground",
                          current && !complete && "border-primary animate-pulse bg-primary/10 text-primary",
                          !complete && !current && "border-border text-muted-foreground"
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{stage.label}</p>
                        {current ? (
                          <p className="text-muted-foreground text-xs tracking-wide uppercase">Current pulse</p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {order.status === HarvestStatus.PACKAGED ? (
              <div className="mt-8 border-t border-border/70 pt-8">
                <ShippingPaymentCard order={order} />
              </div>
            ) : null}

            {order.status === HarvestStatus.SHIPPED || order.status === HarvestStatus.DELIVERED ? (
              <div className="text-muted-foreground mt-6 space-y-2 text-sm">
                {order.courierPartner ? (
                  <p>
                    <span className="text-foreground font-semibold">Courier:</span> {order.courierPartner}
                  </p>
                ) : null}
                {order.trackingNumber ? (
                  <p>
                    <span className="text-foreground font-semibold">Tracking:</span> {order.trackingNumber}
                  </p>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
