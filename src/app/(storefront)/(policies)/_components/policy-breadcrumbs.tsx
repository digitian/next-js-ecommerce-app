"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/src/components/ui/breadcrumb";

const POLICY_PAGES: Record<string, string> = {
  "/returns-exchanges": "Returns & Exchanges",
  "/shipping": "Shipping Policy",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
}

export function PolicyBreadcrumbs() {
  const pathname = usePathname();
  const currentPage = POLICY_PAGES[pathname] || "Policies";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
