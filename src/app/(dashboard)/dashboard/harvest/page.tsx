import { redirect } from "next/navigation";
import { Suspense } from "react";

import { HarvestTimeline } from "@/components/dashboard/HarvestTimeline";
import { Skeleton } from "@/components/ui/skeleton";
import { getHarvestOrdersForUser } from "@/lib/queries/harvest-dashboard";
import { getAuthSession } from "@/lib/session";

async function HarvestBoard({ userId }: { userId: string }) {
  const orders = await getHarvestOrdersForUser(userId);
  return <HarvestTimeline orders={orders} />;
}

export default async function DashboardHarvestPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <header className="space-y-3">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Yield telemetry</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">Harvest runway</h1>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          Track packing milestones and settle freight when status reaches packaged — Stripe Checkout powers shipping settlements.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-6">
            <Skeleton className="h-48 w-full animate-pulse rounded-3xl" />
            <Skeleton className="h-48 w-full animate-pulse rounded-3xl" />
          </div>
        }
      >
        <HarvestBoard userId={session.user.id} />
      </Suspense>
    </div>
  );
}
