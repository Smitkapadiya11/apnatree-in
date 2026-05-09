import { redirect } from "next/navigation";
import { Suspense } from "react";

import { MediaFiltersSection } from "@/components/dashboard/media/MediaFiltersSection";
import { MediaGallerySection } from "@/components/dashboard/media/MediaGallerySection";
import { UnreadMediaBadge } from "@/components/dashboard/media/UnreadMediaBadge";
import { Skeleton } from "@/components/ui/skeleton";
import type { MediaFilter } from "@/lib/queries/dashboard-media";
import { getAuthSession } from "@/lib/session";

function normalizeFilter(value: string | undefined): MediaFilter {
  if (value === "photo" || value === "video") {
    return value;
  }
  return "all";
}

export default async function DashboardMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; filter?: string; contract?: string; media?: string }>;
}) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const filter = normalizeFilter(sp.filter);
  const contractId = sp.contract?.length ? sp.contract : undefined;

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="text-primary text-xs tracking-[0.35em] uppercase">Bi-weekly canopy chronicles</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">Media observatory</h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            Every UploadThing drop is captioned by field agents, blurred for instant loads, and mirrored here with unread halos.
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-11 w-32 animate-pulse rounded-full" />}>
          <UnreadMediaBadge userId={session.user.id} />
        </Suspense>
      </header>

      <Suspense
        fallback={
          <div className="border-border flex gap-4 border-b pb-6">
            <Skeleton className="h-10 w-20 animate-pulse rounded-full" />
            <Skeleton className="h-10 w-24 animate-pulse rounded-full" />
            <Skeleton className="h-10 w-24 animate-pulse rounded-full" />
          </div>
        }
      >
        <MediaFiltersSection userId={session.user.id} />
      </Suspense>

      <Suspense
        key={`${page}-${filter}-${contractId ?? ""}`}
        fallback={
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square animate-pulse rounded-3xl" />
            ))}
          </div>
        }
      >
        <MediaGallerySection
          userId={session.user.id}
          page={page}
          filter={filter}
          contractId={contractId}
        />
      </Suspense>
    </div>
  );
}
