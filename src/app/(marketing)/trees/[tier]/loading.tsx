import { Skeleton } from "@/components/ui/skeleton";

export default function TierLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <Skeleton className="h-6 w-48 rounded-full" />
      <Skeleton className="h-14 w-3/4 max-w-3xl rounded-2xl" />
      <Skeleton className="h-28 w-full rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-28 rounded-2xl" />
      </div>
      <Skeleton className="h-96 w-full rounded-3xl" />
    </div>
  );
}
