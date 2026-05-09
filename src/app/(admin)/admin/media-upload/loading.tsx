import { Skeleton } from "@/components/ui/skeleton";

export default function AdminMediaUploadLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 py-4">
      <div className="space-y-3">
        <Skeleton className="h-4 w-40 animate-pulse rounded-full" />
        <Skeleton className="h-10 w-full max-w-xl animate-pulse rounded-2xl" />
      </div>
      <Skeleton className="h-48 w-full animate-pulse rounded-3xl" />
      <div className="grid gap-6">
        <Skeleton className="h-64 w-full animate-pulse rounded-3xl" />
      </div>
    </div>
  );
}
