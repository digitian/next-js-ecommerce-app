import { Suspense } from "react";
import { getProducts, getCategories, getSubCategories } from "@/src/lib/api/products";
import { CategoryProductList } from "@/src/components/features/products/category-product-list";
import { ProductFilters } from "@/src/components/features/products/product-filters";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Skeleton } from "@/src/components/ui/skeleton";
import type { Metadata } from "next";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: `Products | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Browse our collection of ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  
  const category = typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const subcategory = typeof resolvedSearchParams.subcategory === "string" ? resolvedSearchParams.subcategory : undefined;
  const sort = typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : undefined;
  const minPrice = typeof resolvedSearchParams.minPrice === "string" ? parseInt(resolvedSearchParams.minPrice) : undefined;
  const maxPrice = typeof resolvedSearchParams.maxPrice === "string" ? parseInt(resolvedSearchParams.maxPrice) : undefined;
  const minRating = typeof resolvedSearchParams.minRating === "string" ? parseFloat(resolvedSearchParams.minRating) : undefined;

  const [productsData, categories, subcategories] = await Promise.all([
    getProducts({
      category,
      subcategory,
      sort,
      minPrice,
      maxPrice,
      minRating,
      skip: 0,
      take: 12,
    }),
    getCategories(),
    getSubCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
      <Breadcrumb className="my-4 sm:my-6 md:my-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar */}
        <aside className="col-span-1">
          <ProductFilters categories={categories} subcategories={subcategories} />
        </aside>

        {/* Main Content */}
        <main className="col-span-3">
          <Suspense fallback={<ProductsSkeleton />}>
            <CategoryProductList
              initialProducts={productsData.items}
              categorySlug={category || "all"}
              subcategorySlug={subcategory}
              columns={3}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between bg-muted/20 rounded-lg p-4 h-[60px]">
         <Skeleton className="w-16 h-8" />
         <Skeleton className="w-[180px] h-10" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <Skeleton className="w-full aspect-[4/3] rounded-xl" />
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}