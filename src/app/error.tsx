"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console (and, in production, this is where an error-reporting
    // service such as Sentry would be wired in).
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        We hit a snag loading this page.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        An unexpected error occurred. You can try again, or head back to the
        homepage while we sort it out.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button
          variant="outline"
          render={<Link href="/" />}
          nativeButton={false}
        >
          Back to homepage
        </Button>
      </div>
    </div>
  );
}
