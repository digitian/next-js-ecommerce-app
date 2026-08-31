"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/src/components/ui/carousel"
import { Button } from "@/src/components/ui/button"

const slides = [
  {
    id: 1,
    image: "https://picsum.photos/id/1015/1920/1080",
    title: "Minimalist Living",
    subtitle: "Discover the new collection of modern furniture",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/103/1920/1080",
    title: "Comfort & Style",
    subtitle: "Upgrade your space with premium materials",
    cta: "Explore",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1068/1920/1080",
    title: "Elevate Your Home",
    subtitle: "Designs that inspire everyday living",
    cta: "View Catalog",
  },
]

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="relative w-full group">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play()}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[600px] w-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                    <Button size="lg" variant="default" className="text-lg px-8">
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-6 left-0 right-0 z-10 text-white">
          <CarouselDots />
        </div>
        <CarouselPrevious className="left-4 sm:left-8 bg-background/50 hover:bg-background border-none text-foreground hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="right-4 sm:right-8 bg-background/50 hover:bg-background border-none text-foreground hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  )
}
