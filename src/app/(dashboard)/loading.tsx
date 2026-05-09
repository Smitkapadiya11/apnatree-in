import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-8">
      <Skeleton className="h-10 w-56 animate-pulse rounded-full" />
      <Skeleton className="h-32 w-full animate-pulse rounded-3xl" />
      <Skeleton className="h-64 w-full animate-pulse rounded-3xl" />
    </div>
  );
}
