"use client";

import { useCartStore } from "@/src/hooks/use-cart-store";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import Image from "next/image";

export function OrderSummary({ shippingCost }: { shippingCost: number }) {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  return (
    <Card className="border-none bg-muted/40 shadow-none sm:border-solid sm:bg-card sm:shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="font-medium text-sm line-clamp-1">{item.product.name}</span>
                <span className="text-muted-foreground text-sm tabular-nums">
                  {formatCurrency(item.product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium tabular-nums">
              {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span className="font-medium tabular-nums">{formatCurrency(tax)}</span>
          </div>
        </div>

        <Separator />
        
        <div className="flex items-center justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="tabular-nums">{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
