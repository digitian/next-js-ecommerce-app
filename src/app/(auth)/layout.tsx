import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 w-full items-center justify-center p-6 md:p-10 min-h-svh md:min-h-full">
      <main className="w-full max-w-sm">
        <Link href="/">
          <Image
            src="/images/logos/turkuaz-aski-logo.png"
            alt="Logo"
            width={336}
            height={65}
            className="mb-6 mx-auto max-w-60 brightness-80"
          />
        </Link>
        {children}
      </main>
    </div>
  );
}
