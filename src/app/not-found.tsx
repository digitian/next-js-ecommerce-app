import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/src/components/ui/button";

export const metadata: Metadata = {
  title: `Page Not Found | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist, may have been
        moved, or the link might be outdated.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button render={<Link href="/" />} nativeButton={false}>
          Back to homepage
        </Button>
        <Button
          variant="outline"
          render={<Link href="/products" />}
          nativeButton={false}
        >
          Browse products
        </Button>
      </div>
    </div>
  );
}
