"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MarketingError({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="max-w-lg space-y-4">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Something went wrong in the grove.</p>
        <h2 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight">We&apos;ll steady the branches.</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Error ref: <span className="font-semibold">{error.digest ?? "n/a"}</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={() => reset()} className="rounded-full px-8">
          Try again
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-8")}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
