import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-24 sm:px-6 lg:px-8">
      <Skeleton className="h-6 w-40 rounded-full" />
      <Skeleton className="h-14 w-3/4 max-w-2xl rounded-2xl" />
      <Skeleton className="h-28 w-full rounded-3xl" />
      <Skeleton className="h-48 w-full rounded-3xl" />
    </div>
  );
}
