import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/src/styles/globals.css";
import { cn } from "@/src/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storefront",
  description: "Storefront",
};

import { SiteHeader } from "@/src/components/common/storefront/header/site-header";
import { SiteFooter } from "@/src/components/common/storefront/footer/site-footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
