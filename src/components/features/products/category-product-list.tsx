"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { LayoutGrid, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/src/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import ProductCard from "./product-card";
import type { Product } from "@/src/types/product.types";
import { Button } from "@/src/components/ui/button";

interface CategoryProductListProps {
  initialProducts: Product[];
  categorySlug: string;
  subcategorySlug?: string;
  columns?: 3 | 4;
}

export function CategoryProductList({ initialProducts, categorySlug, subcategorySlug, columns = 4 }: CategoryProductListProps) {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<string>("recommended");
  
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(initialProducts.length === 12); // We assume if it returned exactly take limit, there might be more
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const loadMore = useCallback(async (currentSort: string = sort) => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (categorySlug !== 'all') {
        params.set('category', categorySlug);
      } else {
        params.delete('category');
      }
      if (subcategorySlug) {
        params.set('subcategory', subcategorySlug);
      } else {
        params.delete('subcategory');
      }
      if (currentSort !== 'recommended') {
        params.set('sort', currentSort);
      } else {
        params.delete('sort');
      }
      params.set('skip', items.length.toString());
      params.set('take', '12');

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      
      setItems((prev) => {
        // Prevent duplicates in case of React Strict Mode double invocation
        const existingIds = new Set(prev.map(p => p.id));
        const newItems = json.data.items.filter((p: Product) => !existingIds.has(p.id));
        return [...prev, ...newItems];
      });
      setHasNextPage(json.data.hasNextPage);
    } catch (err) {
      setError("Failed to load more products.");
    } finally {
      setLoading(false);
    }
  }, [categorySlug, subcategorySlug, hasNextPage, items.length, loading, sort]);

  const { ref, inView } = useInView({
    rootMargin: "400px 0px",
    skip: loading || !hasNextPage || error !== null,
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  // Client-side fetch when search params change to show motion loading effect
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    let isMounted = true;
    const fetchFiltered = async () => {
      setIsTransitioning(true);
      setError(null);
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set('skip', '0');
        params.set('take', '12');

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load");
        const json = await res.json();
        
        if (isMounted) {
          setItems(json.data.items);
          setHasNextPage(json.data.hasNextPage);
        }
      } catch (err) {
        if (isMounted) setError("Failed to apply filters.");
      } finally {
        if (isMounted) {
          setIsTransitioning(false);
        }
      }
    };
    
    fetchFiltered();
    
    return () => { isMounted = false; };
  }, [searchParams]);

  const handleSortChange = async (value: string) => {
    setSort(value);
    // Reset list and fetch first page
    setIsTransitioning(true);
    setError(null);
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (categorySlug !== 'all') {
        params.set('category', categorySlug);
      } else {
        params.delete('category');
      }
      if (subcategorySlug) {
        params.set('subcategory', subcategorySlug);
      } else {
        params.delete('subcategory');
      }
      if (value !== 'recommended') {
        params.set('sort', value);
      } else {
        params.delete('sort');
      }
      params.set('skip', '0');
      params.set('take', '12');

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      
      setItems(json.data.items);
      setHasNextPage(json.data.hasNextPage);
    } catch (err) {
      setError("Failed to apply sorting.");
    } finally {
      setIsTransitioning(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Toolbar */}
      <div className="flex items-center justify-start sm:justify-between bg-muted/20 rounded-lg">
        <ToggleGroup className="hidden sm:flex" value={[layout]} onValueChange={(val: string[]) => { if (val.length > 0) setLayout(val[0] as "grid" | "list"); }}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Sort by:</span>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Recommended" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product List */}
      <div className="relative pt-2">
        {/* Progress bar container */}
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden rounded-full z-10 bg-muted/30">
          <AnimatePresence>
            {isTransitioning && (
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
            opacity: isTransitioning ? 0.5 : 1,
            pointerEvents: isTransitioning ? "none" : "auto",
          }}
          transition={{ duration: 0.3 }}
          className={layout === "grid" ? `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${columns === 4 ? 'lg:grid-cols-4' : ''} gap-6` : "flex flex-col gap-4"}
        >
          <AnimatePresence mode="popLayout">
            {items.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} layout={layout} />
              </motion.div>
            ))}
            {items.length === 0 && !isTransitioning && !loading && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-12 text-center text-muted-foreground"
              >
                No products found matching these filters.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Infinite Scroll Loader */}
      {(hasNextPage || loading || error) && (
        <div ref={ref} className="py-8 flex justify-center w-full">
          {loading ? (
             <div className="flex space-x-2 justify-center items-center">
               <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
             </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-destructive text-sm">{error}</p>
              <Button variant="outline" onClick={() => loadMore()}>Try again</Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
