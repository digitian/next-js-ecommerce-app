"use client";

import { Heart, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { useWishlistStore } from "@/src/hooks/use-wishlist-store";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { toast } from "sonner";
import { useHydrated } from "@/src/hooks/use-hydrated";

export function WishlistTrigger() {
  const mounted = useHydrated();

  const isHydrated = useWishlistStore((state) => state.isHydrated);
  const items = useWishlistStore((state) => state.items);
  const totalItems = useWishlistStore((state) => state.totalItems);
  const isWishlistOpen = useWishlistStore((state) => state.isWishlistOpen);
  const setWishlistOpen = useWishlistStore((state) => state.setWishlistOpen);
  const removeItem = useWishlistStore((state) => state.removeItem);

  const addToCart = useCartStore((state) => state.addItem);

  const isReady = mounted && isHydrated;

  return (
    <Sheet open={isWishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="relative group" />}>
        <Heart className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="sr-only">Open Wishlist</span>
        
        {isReady && totalItems > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full! sm:max-w-md! flex flex-col">
        <SheetHeader>
          <SheetTitle>Wishlist {isReady && totalItems > 0 && `(${totalItems})`}</SheetTitle>
        </SheetHeader>
        
        {!isReady ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <Skeleton className="h-32 w-full" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 px-4">
            <Heart className="size-16 text-muted-foreground/30" />
            <div className="text-lg font-medium">Your wishlist is empty</div>
            <p className="text-sm text-muted-foreground text-center">
              Looks like you haven&apos;t added anything to your wishlist yet.
            </p>
            <Button className="mt-4" onClick={() => setWishlistOpen(false)}>
              Explore Products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 pr-4 -mr-4 px-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Link href={`/products/${item.product.slug}`} onClick={() => setWishlistOpen(false)} className="shrink-0 bg-muted/50 rounded-md overflow-hidden relative size-20">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.product.slug}`} onClick={() => setWishlistOpen(false)}>
                          <h4 className="font-medium text-sm leading-none line-clamp-2 hover:underline">{item.product.name}</h4>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1"
                          onClick={() => {
                            removeItem(item.id);
                            toast("Removed from wishlist", {
                              description: `${item.product.name} has been removed from your wishlist.`,
                            });
                          }}
                        >
                          <Trash2 className="size-3.5" />
                          <span className="sr-only">Remove {item.product.name}</span>
                        </Button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="font-semibold text-sm">
                          {formatCurrency(item.product.price)}
                        </div>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          className="h-7 text-xs"
                          onClick={() => {
                            addToCart(item.product, 1);
                            toast.success("Added to cart", {
                              description: `${item.product.name} has been added to your cart.`,
                            });
                            removeItem(item.id);
                          }}
                        >
                          <ShoppingBag className="size-3.5 mr-1" />
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-4 px-4 pb-4">
              <Button 
                className="w-full"
                onClick={() => setWishlistOpen(false)}
                render={<Link href="/account/wishlist" />}
                nativeButton={false}
              >
                View Full Wishlist
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
