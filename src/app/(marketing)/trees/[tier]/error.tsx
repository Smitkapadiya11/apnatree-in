"use client";

import { useEffect } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function TierError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-heading)] text-4xl">Something shifted in the grove.</p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Error reference {error.digest ?? "n/a"}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className={cn(buttonVariants(), "rounded-full px-8")}
        >
          Try again
        </button>
        <Link href="/trees" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-8")}>
          All tiers
        </Link>
      </div>
    </div>
  );
}
