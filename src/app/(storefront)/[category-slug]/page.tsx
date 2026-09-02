import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/src/lib/api/products";
import { CategoryProductList } from "@/src/components/features/products/category-product-list";
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";

interface CategoryPageProps {
    params: Promise<{ "category-slug": string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { "category-slug": categorySlug } = await params;
    const categories = await getCategories();
    const category = categories.find(c => c.slug === categorySlug);
    
    if (!category && categorySlug !== "all") return {};

    const title = category ? category.title : "All Products";

    return {
        title: `${title} | Storefront`,
        description: `Browse our collection of ${title.toLowerCase()}`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { "category-slug": categorySlug } = await params;
    
    // Validate category
    const categories = await getCategories();
    const isValidCategory = categorySlug === "all" || categories.some(c => c.slug === categorySlug);
    
    if (!isValidCategory) {
        notFound();
    }

    // Fetch initial page of products server-side
    const { items: initialProducts } = await getProducts({ category: categorySlug, skip: 0, take: 12 });
    
    const title = categorySlug === "all" ? "All Products" : categories.find(c => c.slug === categorySlug)?.title;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb className="mb-4 sm:mb-6 md:mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-3xl font-bold tracking-tight mb-8">{title}</h1>
            <CategoryProductList 
                initialProducts={initialProducts} 
                categorySlug={categorySlug} 
            />
        </div>
    );
}