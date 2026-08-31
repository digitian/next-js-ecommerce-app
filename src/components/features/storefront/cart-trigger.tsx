"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

export function CartTrigger() {
  const [mounted, setMounted] = useState(false);
  // Mock cart items count for now. Will be replaced by useCartStore later.
  const itemCount = 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="relative group" />}>
        <ShoppingBag className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="sr-only">Open Cart</span>
        
        {mounted ? (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {itemCount}
          </span>
        ) : (
          <Skeleton className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full" />
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <ShoppingBag className="size-16 text-muted-foreground/30" />
          <div className="text-lg font-medium">Your cart is empty</div>
          <p className="text-sm text-muted-foreground text-center">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button className="mt-4" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
            Continue Shopping
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
