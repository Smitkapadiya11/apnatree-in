"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import type { MediaFilter } from "@/lib/queries/dashboard-media";

import { cn } from "@/lib/utils";

type ContractOption = {
  id: string;
  contractNumber: string;
  treeCode: string | null;
};

function normalizeFilter(value: string | null): MediaFilter {
  if (value === "photo" || value === "video") return value;
  return "all";
}

function buildQuery(next: {
  page?: number;
  filter?: MediaFilter;
  contract?: string;
  media?: string | null;
}, base: URLSearchParams) {
  const params = new URLSearchParams(base.toString());
  params.delete("media");

  if (next.page !== undefined) {
    if (next.page <= 1) params.delete("page");
    else params.set("page", String(next.page));
  }

  if (next.filter !== undefined) {
    if (next.filter === "all") params.delete("filter");
    else params.set("filter", next.filter);
  }

  if (next.contract !== undefined) {
    if (!next.contract) params.delete("contract");
    else params.set("contract", next.contract);
  }

  if (next.media !== undefined && next.media) {
    params.set("media", next.media);
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function MediaFilters({ contracts }: { contracts: ContractOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filter = normalizeFilter(searchParams.get("filter"));
  const contractId = searchParams.get("contract") ?? "";

  const push = useCallback(
    (patch: Parameters<typeof buildQuery>[0]) => {
      startTransition(() => {
        const href = `${pathname}${buildQuery(patch, searchParams)}`;
        router.push(href, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const tabs: { id: MediaFilter; label: string }[] = useMemo(
    () => [
      { id: "all", label: "All" },
      { id: "photo", label: "Photos" },
      { id: "video", label: "Videos" },
    ],
    []
  );

  return (
    <div className="border-border flex flex-col gap-6 border-b pb-6">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Media filters">
        {tabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={isPending}
              onClick={() => push({ page: 1, filter: tab.id })}
              className={cn(
                "min-h-11 rounded-none border-b-2 border-transparent px-3 pb-2 text-sm font-semibold transition-colors",
                active ? "border-[#c8972a] text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {contracts.length > 1 ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="media-contract" className="text-muted-foreground text-sm font-medium">
            Filter by tree contract
          </label>
          <select
            id="media-contract"
            value={contractId}
            disabled={isPending}
            onChange={(event) => push({ page: 1, contract: event.target.value })}
            className="border-input bg-background ring-offset-background focus-visible:ring-ring min-h-11 w-full max-w-md rounded-2xl border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none sm:w-auto"
          >
            <option value="">All stewarded trees</option>
            {contracts.map((row) => (
              <option key={row.id} value={row.id}>
                {row.contractNumber} · {row.treeCode ?? "Tree"}
              </option>
            ))}
          </select>
        </div>
      ) : contracts.length === 1 ? (
        <p className="text-muted-foreground text-sm">
          Chronicle scope ·{" "}
          <span className="text-foreground font-semibold">
            {contracts[0].contractNumber} ({contracts[0].treeCode ?? "Tree"})
          </span>
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">Assign a tree to see chronicles grouped per contract.</p>
      )}
    </div>
  );
}
