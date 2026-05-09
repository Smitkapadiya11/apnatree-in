import { format } from "date-fns";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { VisitScheduler } from "@/components/dashboard/VisitScheduler";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveContractsForVisits,
  getFullyBookedVisitDateKeys,
  getUsedFreeVisitCount,
  listFarmVisitsForUser,
} from "@/lib/queries/farm-visits";
import { getAuthSession } from "@/lib/session";

async function VisitOverview({ userId }: { userId: string }) {
  const year = new Date().getFullYear();
  const [usedFree, { upcoming, past }, contracts, unavailableDateKeys] = await Promise.all([
    getUsedFreeVisitCount(userId, year),
    listFarmVisitsForUser(userId),
    getActiveContractsForVisits(userId),
    getFullyBookedVisitDateKeys(),
  ]);

  const freeRemaining = Math.max(0, 3 - usedFree);

  return (
    <>
      <section className="border-border rounded-3xl border bg-background/80 p-6 sm:p-8">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Complimentary allocation</p>
        <p className="font-[family-name:var(--font-heading)] mt-3 text-4xl">{freeRemaining}</p>
        <p className="text-muted-foreground mt-2 text-sm">
          of 3 annual Gir visits remaining for {year} ({usedFree} used).
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">Upcoming</h2>
          <ul className="space-y-4">
            {upcoming.length === 0 ? (
              <li className="text-muted-foreground text-sm">No confirmed visits yet.</li>
            ) : (
              upcoming.map((visit) => (
                <li key={visit.id} className="border-border rounded-2xl border p-4">
                  <p className="text-sm font-semibold">{format(visit.visitDate, "PPPP")}</p>
                  <p className="text-muted-foreground text-sm">
                    {visit.numberOfVisitors} guests · Code {visit.confirmationCode ?? "pending"}
                  </p>
                  <p className="text-muted-foreground text-xs uppercase">{visit.status}</p>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">Past</h2>
          <ul className="space-y-4">
            {past.length === 0 ? (
              <li className="text-muted-foreground text-sm">Your archive begins after your first hosted walk.</li>
            ) : (
              past.map((visit) => (
                <li key={visit.id} className="border-border rounded-2xl border p-4">
                  <p className="text-sm font-semibold">{format(visit.visitDate, "PPP")}</p>
                  <p className="text-muted-foreground text-xs uppercase">{visit.status}</p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <VisitScheduler
        contracts={contracts.map((row) => ({
          id: row.id,
          contractNumber: row.contractNumber,
          treeCode: row.tree?.treeCode ?? null,
        }))}
        unavailableDateKeys={unavailableDateKeys}
        usedFreeVisitsThisYear={usedFree}
      />
    </>
  );
}

export default async function DashboardVisitsPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <header className="space-y-3">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Gir hospitality desk</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">Farm visits</h1>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          Three complimentary stewardship visits every calendar year — capacity-managed scheduling with automated confirmations.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-6">
            <Skeleton className="h-32 w-full animate-pulse rounded-3xl" />
            <Skeleton className="h-96 w-full animate-pulse rounded-3xl" />
          </div>
        }
      >
        <VisitOverview userId={session.user.id} />
      </Suspense>
    </div>
  );
}
