"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Card, CardContent } from "@/src/components/ui/card";
import { useWishlistStore } from "@/src/hooks/use-wishlist-store";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { toast } from "sonner";
import { useHydrated } from "@/src/hooks/use-hydrated";

export function WishlistView() {
  const mounted = useHydrated();

  const isHydrated = useWishlistStore((state) => state.isHydrated);
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const addToCart = useCartStore((state) => state.addItem);

  const isReady = mounted && isHydrated;

  if (!isReady) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-muted/20 rounded-xl border border-dashed">
        <Heart className="size-20 text-muted-foreground/30" />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Save items you love to your wishlist to keep track of them and buy them later.
          </p>
        </div>
        <Button size="lg" render={<Link href="/" />} nativeButton={false}>
          Explore Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            clearWishlist();
            toast("Wishlist cleared");
          }}
        >
          <Trash2 className="mr-2 size-4" />
          Clear Wishlist
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden group flex flex-col">
            <div className="relative aspect-[4/3] bg-muted/20">
              <Link href={`/products/${item.product.slug}`} className="block w-full h-full">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                    No image
                  </div>
                )}
              </Link>
            </div>
            
            <CardContent className="p-4 flex flex-col flex-1">
              <Link href={`/products/${item.product.slug}`}>
                <h3 className="font-medium text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                  {item.product.name}
                </h3>
              </Link>
              
              <div className="mt-2 font-semibold">
                {formatCurrency(item.product.price)}
              </div>
              
              <div className="mt-auto pt-4 flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    addToCart(item.product, 1);
                    toast.success("Added to cart", {
                      description: `${item.product.name} has been added to your cart.`,
                    });
                    removeItem(item.id);
                  }}
                >
                  <ShoppingBag className="mr-2 size-4" />
                  Move to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/10"
                  onClick={() => {
                    removeItem(item.id);
                    toast("Removed from wishlist", {
                      description: `${item.product.name} has been removed.`,
                    });
                  }}
                >
                  <Trash2 className="size-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
