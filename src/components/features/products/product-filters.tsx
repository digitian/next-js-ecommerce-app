"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Slider } from "@/src/components/ui/slider";
import { Separator } from "@/src/components/ui/separator";
import { Filter } from "lucide-react";
import type { Category, SubCategory } from "@/src/types/product.types";
import { Field, FieldLabel, FieldSet, FieldLegend } from "@/src/components/ui/field";

interface ProductFiltersProps {
  categories: Category[];
  subcategories: SubCategory[];
}

export function ProductFilters({ categories, subcategories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([
    searchParams.has("minPrice") ? Number(searchParams.get("minPrice")) : 0,
    searchParams.has("maxPrice") ? Number(searchParams.get("maxPrice")) : 100000,
  ]);
  const [localCategory, setLocalCategory] = useState(searchParams.get("category") || "all");
  const [localSubcategory, setLocalSubcategory] = useState(searchParams.get("subcategory") || "all");
  const [localRating, setLocalRating] = useState(searchParams.get("minRating") || "all");

  // Sync from URL to local state when URL changes externally
  useEffect(() => {
    setPriceRange([
      searchParams.has("minPrice") ? Number(searchParams.get("minPrice")) : 0,
      searchParams.has("maxPrice") ? Number(searchParams.get("maxPrice")) : 100000,
    ]);
    setLocalCategory(searchParams.get("category") || "all");
    setLocalSubcategory(searchParams.get("subcategory") || "all");
    setLocalRating(searchParams.get("minRating") || "all");
  }, [searchParams]);

  // Debounced push to router
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (localCategory === "all") params.delete("category");
      else params.set("category", localCategory);

      if (localSubcategory === "all") params.delete("subcategory");
      else params.set("subcategory", localSubcategory);

      if (localRating === "all") params.delete("minRating");
      else params.set("minRating", localRating);

      // Only push if params actually changed
      if (params.toString() !== searchParams.toString()) {
        router.push(pathname + "?" + params.toString(), { scroll: false });
      }
    }, 400);

    return () => clearTimeout(t);
  }, [localCategory, localSubcategory, localRating, pathname, router, searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handlePriceCommit = (value: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  const FilterContent = (
    <div className="flex flex-col gap-6">
      <FieldSet>
        <FieldLegend>Category</FieldLegend>
        <RadioGroup
          value={localCategory}
          onValueChange={(val) => {
            setLocalCategory(val);
            setLocalSubcategory("all"); // Reset subcategory when category changes
          }}
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="all" id="cat-all" />
            <FieldLabel htmlFor="cat-all">All Categories</FieldLabel>
          </Field>
          {categories.map((cat) => (
            <Field key={cat.id} orientation="horizontal">
              <RadioGroupItem value={cat.slug} id={`cat-${cat.id}`} />
              <FieldLabel htmlFor={`cat-${cat.id}`}>{cat.title}</FieldLabel>
            </Field>
          ))}
        </RadioGroup>
      </FieldSet>

      <Separator />

      <FieldSet>
        <FieldLegend>Subcategory</FieldLegend>
        <RadioGroup
          value={localSubcategory}
          onValueChange={setLocalSubcategory}
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="all" id="subcat-all" />
            <FieldLabel htmlFor="subcat-all">All Subcategories</FieldLabel>
          </Field>
          {subcategories
            .filter((sub) => localCategory === "all" || sub.category_id === categories.find(c => c.slug === localCategory)?.id)
            .map((sub) => (
              <Field key={sub.id} orientation="horizontal">
                <RadioGroupItem value={sub.slug} id={`subcat-${sub.id}`} />
                <FieldLabel htmlFor={`subcat-${sub.id}`}>{sub.title}</FieldLabel>
              </Field>
            ))}
        </RadioGroup>
      </FieldSet>

      <Separator />

      <FieldSet>
        <div className="flex justify-between items-center mb-3">
          <FieldLegend className="mb-0">Price Range</FieldLegend>
          <span className="text-sm text-muted-foreground">
            ${(priceRange[0] / 100).toFixed(0)} - ${(priceRange[1] / 100).toFixed(0)}
          </span>
        </div>
        <Slider
          min={0}
          max={100000}
          step={1000}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommitted={handlePriceCommit}
          className="mt-2"
        />
      </FieldSet>

      <Separator />

      <FieldSet>
        <FieldLegend>Minimum Rating</FieldLegend>
        <RadioGroup
          value={localRating}
          onValueChange={setLocalRating}
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="all" id="rating-all" />
            <FieldLabel htmlFor="rating-all">Any Rating</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="4" id="rating-4" />
            <FieldLabel htmlFor="rating-4">4 Stars & Up</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="3" id="rating-3" />
            <FieldLabel htmlFor="rating-3">3 Stars & Up</FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden block mb-6">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" className="w-full sm:w-auto" />}>
            <Filter data-icon="inline-start" />
            Filter & Sort
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription className="sr-only">Apply filters to product list.</SheetDescription>
            </SheetHeader>
            {FilterContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>
        {FilterContent}
      </div>
    </>
  );
}
