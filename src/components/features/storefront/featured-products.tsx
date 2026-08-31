"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ToggleGroup, ToggleGroupItem } from "@/src/components/ui/toggle-group"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"
import ProductCard from "@/src/components/features/products/product-card"
import type { Product, Category } from "@/src/types/product.types"

interface FeaturedProductsProps {
  initialProducts: Product[];
  categories: Category[];
}

export function FeaturedProducts({ initialProducts, categories }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(false)

  // Use a pseudo-category for "Show All"
  const allCategories = [
    { id: "cat_all", slug: "all", title: "Show All", showcase_image: "" },
    ...categories,
  ]

  useEffect(() => {
    // If the category is what we initially have and we haven't changed it, 
    // we don't strictly need to fetch, but the mock API simulates realistic fetching.
    // For "all", we could just reset to initialProducts if we fetched them all initially.
    let isMounted = true;

    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const url = activeCategory === "all" 
          ? "/api/products" 
          : `/api/products?category=${activeCategory}`;
          
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success && isMounted) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFilteredProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h2 className="text-heading">
            Featured Products
          </h2>
          <p className="text-subheading">
            Discover our carefully curated selection of home essentials.
          </p>
        </div>

        <div className="overflow-x-auto pb-2 -mb-2">
          <ToggleGroup
            variant="outline"
            value={[activeCategory]}
            onValueChange={(val: string[]) => {
              if (val.length > 0) setActiveCategory(val[0])
            }}
            className="justify-start md:justify-end"
          >
            {allCategories.map((cat) => (
              <ToggleGroupItem
                key={cat.id}
                value={cat.slug}
              >
                {cat.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="relative pt-2">
        {/* Progress bar container */}
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden rounded-full z-10 bg-muted/30">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{
            opacity: isLoading ? 0.5 : 1,
            pointerEvents: isLoading ? "none" : "auto",
          }}
          transition={{ duration: 0.3 }}
        >
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="">
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="h-full p-0.5"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </CarouselItem>
                ))}
                {products.length === 0 && !isLoading && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full py-12 text-center text-muted-foreground"
                  >
                    No products found for this category.
                  </motion.div>
                )}
              </AnimatePresence>
            </CarouselContent>
            {products.length > 0 && (
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12" />
                <CarouselNext className="-right-12" />
              </div>
            )}
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
