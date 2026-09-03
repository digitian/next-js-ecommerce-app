import { SiteHeader } from "@/src/components/common/storefront/header/site-header";
import { SiteFooter } from "@/src/components/common/storefront/footer/site-footer";
import { BottomNavigationBar } from "@/src/components/common/storefront/header/bottom-navigation-bar";
import { MobileNavSheet } from "@/src/components/common/storefront/header/mobile-nav-sheet";
import { getCategories, getSubCategories } from "@/src/lib/api/products";
import React from "react";

export default async function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, subcategories] = await Promise.all([
    getCategories(),
    getSubCategories()
  ]);

  return (
    <>
      <SiteHeader 
        bottomNav={<BottomNavigationBar categories={categories} />}
        mobileNav={<MobileNavSheet categories={categories} subcategories={subcategories} />}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter categories={categories} />
    </>
  );
}
