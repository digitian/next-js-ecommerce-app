"use client";

import { useState } from "react";
import Image from "next/image";
import { Lens } from "@/src/components/ui/lens";
import { cn } from "@/src/lib/utils";
import type { ProductImage } from "@/src/types/product.types";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[600px] shrink-0 pb-2 lg:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative size-20 lg:size-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors",
              activeIndex === idx
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/50"
            )}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80px, 96px"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] bg-muted/20 rounded-xl overflow-hidden flex items-center justify-center">
        <Lens zoomFactor={2} lensSize={300}>
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            width={800}
            height={800}
            className="w-full h-full object-cover lg:h-[600px]"
            priority
          />
        </Lens>
      </div>
    </div>
  );
}
