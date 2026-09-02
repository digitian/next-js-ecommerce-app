"use client";

import { useState } from "react";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import type { Product } from "@/src/types/product.types";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setQuantity(val);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.brief_description || product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl font-medium text-foreground">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-base text-muted-foreground leading-relaxed">
          {product.brief_description || product.description}
        </p>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center w-full sm:w-32 border rounded-md">
          <Button
            variant="ghost"
            size="icon-lg"
            className="shrink-0"
            onClick={decrement}
            disabled={quantity <= 1}
          >
            <Minus />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full text-center border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="ghost"
            size="icon-lg"
            className="shrink-0"
            onClick={increment}
          >
            <Plus />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>

        {/* Add to Cart */}
        <Button size="lg" className="grow">
          <ShoppingCart data-icon="inline-start" />
          Add to Cart
        </Button>

        {/* Add to Wishlist */}
        <Button variant="outline" size="icon-lg">
          <Heart />
          <span className="sr-only">Add to Wishlist</span>
        </Button>
      </div>

      <Separator />

      {/* Tiny general infos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Availability:</span>
          {product.availability === "in-stock" ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">In Stock</Badge>
          ) : product.availability === "out-of-stock" ? (
            <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">Out of Stock</Badge>
          ) : product.availability === "pre-order" ? (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">Pre-order</Badge>
          ) : (
            <span>Unknown</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">SKU:</span>
          <span>{product.sku || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Categories:</span>
          <span>{product.category?.title}, {product.sub_category?.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Tags:</span>
          <span className="lowercase">{product.tags?.join(", ") || 'N/A'}</span>
        </div>
      </div>

      <Separator />

      {/* Share button */}
      <div>
        <Button variant="outline" size="lg" onClick={handleShare}>
          <Share2 data-icon="inline-start" />
          Share this product
        </Button>
      </div>
    </div>
  );
}
