"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="max-w-lg space-y-3">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Something went wrong in the grove.</p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight">Admin console paused</h2>
        <p className="text-muted-foreground text-sm">
          Error ref: <span className="font-semibold">{error.digest ?? "n/a"}</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={() => reset()} className="rounded-full px-8">
          Try again
        </Button>
        <Link href="/admin" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-8")}>
          Admin home
        </Link>
      </div>
    </div>
  );
}
