"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";

const links = [
  { href: "/returns-exchanges", label: "Returns & Exchanges" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function PolicySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0">
      <nav className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg mb-4">Policies</h3>
        <div className="flex flex-col gap-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "transition-colors text-sm",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  )
}
