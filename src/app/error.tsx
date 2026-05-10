"use client";

import { RouteErrorFallback } from "@/components/shared/RouteErrorFallback";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteErrorFallback error={error} reset={reset} />;
}
