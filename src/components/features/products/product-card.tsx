"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"

import type { Product } from "@/src/types/product.types"
import { formatCurrency } from "@/src/lib/helpers/format-currency"
import { useState } from "react"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // We need to prevent the Link from triggering when interacting with the carousel or buttons
  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add logic here (e.g. open quick view modal or add to wishlist)
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <Card className="pt-0 h-full overflow-hidden border-transparent bg-transparent transition-colors hover:bg-muted/40 relative">
        {/* Showcase Image */}
        <div className="relative overflow-hidden bg-muted/20">
          <Image
            src={product.images[0]?.url}
            alt={product.images[0]?.alt || product.name}
            width={500}
            height={500}
            className="object-cover transition-transform duration-500 group-hover:scale-105 h-[300px] w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />

          {/* Quick Actions (Slide in from right) */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
              onClick={handleActionClick}
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
              onClick={handleActionClick}
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 pt-4">
          <h3 className="font-medium text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {product.brief_description || product.description}
          </p>
          <div className="mt-2 font-semibold">
            {product.discount_percentage ? (
              <>
                {formatCurrency(product.price)}
                <span className="text-muted-foreground line-through ml-2">{formatCurrency(product.base_price ?? product.price)}</span>
                <span className="text-green-600 ml-2">{product.discount_percentage}% off</span>
              </>
            ) : (
              formatCurrency(product.price)
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}