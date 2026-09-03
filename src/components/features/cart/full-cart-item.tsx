"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { useCartStore } from "@/src/hooks/use-cart-store";
import type { CartItem as CartItemType } from "@/src/types/cart.types";

export function FullCartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { product, quantity } = item;

  return (
    <div className="flex gap-6 py-6 border-b last:border-0">
      <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-md border bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link 
              href={`/products/${product.slug}`}
              className="font-medium text-base sm:text-lg hover:underline line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground tabular-nums">
              {formatCurrency(product.price)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground shrink-0 hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove {product.name}</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-10 text-center text-sm tabular-nums">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <div className="text-base font-semibold tabular-nums">
            {formatCurrency(product.price * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
