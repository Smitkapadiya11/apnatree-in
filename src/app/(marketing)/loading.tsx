import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-48 animate-pulse rounded-full" />
      <Skeleton className="h-14 w-full max-w-2xl animate-pulse rounded-2xl" />
      <Skeleton className="h-40 w-full animate-pulse rounded-3xl" />
    </div>
  );
}
