"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/src/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import ProductCard from "./product-card";
import type { Product } from "@/src/types/product.types";
import { Button } from "@/src/components/ui/button";

interface CategoryProductListProps {
  initialProducts: Product[];
  categorySlug: string;
}

export function CategoryProductList({ initialProducts, categorySlug }: CategoryProductListProps) {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<string>("recommended");
  
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(initialProducts.length === 12); // We assume if it returned exactly take limit, there might be more
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async (currentSort: string = sort) => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (categorySlug !== 'all') {
        params.set('category', categorySlug);
      }
      if (currentSort !== 'recommended') {
        params.set('sort', currentSort);
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
  }, [categorySlug, hasNextPage, items.length, loading, sort]);

  const { ref, inView } = useInView({
    rootMargin: "400px 0px",
    skip: loading || !hasNextPage || error !== null,
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  // Handle sort change
  const handleSortChange = async (value: string) => {
    setSort(value);
    // Reset list and fetch first page
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (categorySlug !== 'all') {
        params.set('category', categorySlug);
      }
      if (value !== 'recommended') {
        params.set('sort', value);
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Toolbar */}
      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
        <ToggleGroup value={[layout]} onValueChange={(val: string[]) => { if (val.length > 0) setLayout(val[0] as "grid" | "list"); }}>
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
      <div className={layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} layout={layout} />
        ))}
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
