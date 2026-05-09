import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-8">
      <Skeleton className="h-10 w-48 animate-pulse rounded-full" />
      <Skeleton className="h-72 w-full animate-pulse rounded-3xl" />
    </div>
  );
}
