import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardMediaLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32 animate-pulse rounded-full" />
          <Skeleton className="h-10 w-64 animate-pulse rounded-full" />
        </div>
        <Skeleton className="h-11 w-28 animate-pulse rounded-full" />
      </div>
      <div className="border-border flex gap-4 border-b pb-6">
        <Skeleton className="h-10 w-20 animate-pulse rounded-full" />
        <Skeleton className="h-10 w-24 animate-pulse rounded-full" />
        <Skeleton className="h-10 w-24 animate-pulse rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square animate-pulse rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
