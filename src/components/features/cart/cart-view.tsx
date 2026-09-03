"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { FullCartItem } from "./full-cart-item";
import { useHydrated } from "@/src/hooks/use-hydrated";

export function CartView() {
  const mounted = useHydrated();

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const isHydrated = useCartStore((state) => state.isHydrated);

  if (!mounted || !isHydrated) {
    return (
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground mb-6">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2 mb-8 max-w-sm">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button size="lg" render={<Link href="/products" />} nativeButton={false}>
          Explore Products
        </Button>
      </div>
    );
  }

  // Mock flat rate shipping for now as per decision
  const shipping = 1000; // $10.00
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-8 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b mb-4">
          <h2 className="text-xl font-semibold">Items in your cart</h2>
          <span className="text-muted-foreground text-sm">
            {items.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </div>
        
        <div className="flex flex-col">
          {items.map((item) => (
            <FullCartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 sticky top-24">
        <Card className="border-none bg-muted/40 shadow-none sm:border-solid sm:bg-card sm:shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Shipping</span>
              <span className="font-medium tabular-nums">{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Tax</span>
              <span className="font-medium tabular-nums">{formatCurrency(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="tabular-nums">{formatCurrency(total)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" render={<Link href="/checkout" />} nativeButton={false}>
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
