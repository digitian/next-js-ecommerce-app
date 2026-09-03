"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { CartItem } from "@/src/components/features/cart-item";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { useHydrated } from "@/src/hooks/use-hydrated";

export function CartTrigger() {
  const mounted = useHydrated();

  const isHydrated = useCartStore((state) => state.isHydrated);
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const subtotal = useCartStore((state) => state.subtotal);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  const isReady = mounted && isHydrated;

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="relative group" />}>
        <ShoppingBag className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="sr-only">Open Cart</span>
        
        {isReady && totalItems > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full! sm:max-w-md! flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart {isReady && totalItems > 0 && `(${totalItems})`}</SheetTitle>
        </SheetHeader>
        
        {!isReady ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <Skeleton className="h-32 w-full" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 px-4">
            <ShoppingBag className="size-16 text-muted-foreground/30" />
            <div className="text-lg font-medium">Your cart is empty</div>
            <p className="text-sm text-muted-foreground text-center">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button className="mt-4" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 pr-4 -mr-4 px-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-4 px-4 pb-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCartOpen(false)}
                  render={<Link href="/cart" />}
                  nativeButton={false}
                >
                  View Cart
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => setCartOpen(false)}
                  render={<Link href="/checkout" />}
                  nativeButton={false}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
