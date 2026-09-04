"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { LocalizationSwitcher } from "./localization-switcher";
import type { Category, SubCategory } from "@/src/types/product.types";
import { useAuthStore } from "@/src/hooks/use-auth-store";
import { logoutAction } from "@/src/lib/api/actions/auth-actions";

interface MobileNavSheetProps {
  categories: Category[];
  subcategories: SubCategory[];
}

export function MobileNavSheet({ categories, subcategories }: MobileNavSheetProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const resetAuth = useAuthStore((state) => state.reset);

  const handleLogout = async () => {
    try {
      resetAuth();
      toast.success("Logged out successfully");
      await logoutAction();
      setOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:text-foreground" />}>
        <Menu className="size-6" />
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:w-[350px] flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border text-left">
          <SheetTitle className="text-xl font-bold flex items-center justify-between">
            Menu
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <Accordion className="w-full">
            {categories.map((cat, i) => {
              const catSubs = subcategories.filter(s => s.category_id === cat.id);
              return (
                <AccordionItem value={`item-${i}`} key={cat.id}>
                  <AccordionTrigger className="text-base font-medium py-4">
                    {cat.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-3 pl-2">
                      <Link href={`/${cat.slug}`} className="text-sm text-foreground font-medium py-1">
                        All {cat.title}
                      </Link>
                      {catSubs.map((subItem) => (
                        <Link href={`/${cat.slug}/${subItem.slug}`} key={subItem.id} className="text-sm text-muted-foreground py-1 hover:text-foreground">
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Account & Settings</h3>
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <Link href="/account" className="text-sm py-2 text-foreground font-medium">My Account</Link>
                  <Link href="/account/orders" className="text-sm py-2 text-foreground font-medium">Order History</Link>
                  <Link href="/account/wishlist" className="text-sm py-2 text-foreground font-medium">Wishlist</Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left text-sm py-2 text-foreground font-medium"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm py-2 text-foreground font-medium">Sign In</Link>
                  <Link href="/register" className="text-sm py-2 text-foreground font-medium">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border bg-muted/20 flex flex-col gap-4">
           <div className="flex items-center justify-between">
              <LocalizationSwitcher />
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
