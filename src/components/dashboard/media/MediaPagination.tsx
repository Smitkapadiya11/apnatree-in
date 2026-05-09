import Link from "next/link";

import type { MediaFilter } from "@/lib/queries/dashboard-media";

import { cn } from "@/lib/utils";

function buildHref(opts: { page: number; filter: MediaFilter; contractId?: string }) {
  const params = new URLSearchParams();
  if (opts.page > 1) params.set("page", String(opts.page));
  if (opts.filter !== "all") params.set("filter", opts.filter);
  if (opts.contractId) params.set("contract", opts.contractId);
  const qs = params.toString();
  return qs ? `/dashboard/media?${qs}` : "/dashboard/media";
}

export function MediaPagination({
  page,
  pageSize,
  total,
  filter,
  contractId,
}: {
  page: number;
  pageSize: number;
  total: number;
  filter: MediaFilter;
  contractId?: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm" aria-label="Media pagination">
      <p className="text-muted-foreground">
        Page <span className="text-foreground font-semibold">{page}</span> of{" "}
        <span className="text-foreground font-semibold">{totalPages}</span>
      </p>
      <div className="flex gap-3">
        <Link
          prefetch
          aria-disabled={page <= 1}
          className={cn(
            "border-border bg-background inline-flex min-h-11 items-center rounded-full border px-5 font-semibold transition hover:bg-muted",
            page <= 1 && "pointer-events-none opacity-40"
          )}
          href={buildHref({ page: Math.max(1, page - 1), filter, contractId })}
        >
          Previous
        </Link>
        <Link
          prefetch
          aria-disabled={page >= totalPages}
          className={cn(
            "border-border bg-background inline-flex min-h-11 items-center rounded-full border px-5 font-semibold transition hover:bg-muted",
            page >= totalPages && "pointer-events-none opacity-40"
          )}
          href={buildHref({ page: Math.min(totalPages, page + 1), filter, contractId })}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
