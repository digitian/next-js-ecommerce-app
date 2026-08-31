"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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

const categories = [
  {
    title: "Furniture",
    sub: ["Living Room", "Bedroom", "Dining Room", "Office", "Storage"],
  },
  {
    title: "Home Decor",
    sub: ["Rugs", "Lighting", "Mirrors", "Wall Art", "Cushions & Throws"],
  },
  {
    title: "Kitchen & Dining",
    sub: ["Cookware", "Tableware", "Drinkware", "Kitchen Storage"],
  },
];

export function MobileNavSheet() {
  const [open, setOpen] = useState(false);

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
            {categories.map((cat, i) => (
              <AccordionItem value={`item-${i}`} key={cat.title}>
                <AccordionTrigger className="text-base font-medium py-4">
                  {cat.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-3 pl-2">
                    <Link href="#" className="text-sm text-foreground font-medium py-1" onClick={() => setOpen(false)}>
                      All {cat.title}
                    </Link>
                    {cat.sub.map((subItem) => (
                      <Link href="#" key={subItem} className="text-sm text-muted-foreground py-1 hover:text-foreground" onClick={() => setOpen(false)}>
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Account & Settings</h3>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-sm py-2 text-foreground font-medium" onClick={() => setOpen(false)}>Sign In / Register</Link>
              <Link href="#" className="text-sm py-2 text-foreground font-medium" onClick={() => setOpen(false)}>Order History</Link>
              <Link href="#" className="text-sm py-2 text-foreground font-medium" onClick={() => setOpen(false)}>Wishlist</Link>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border bg-muted/20 flex flex-col gap-4">
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Preferences</span>
              <LocalizationSwitcher />
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
