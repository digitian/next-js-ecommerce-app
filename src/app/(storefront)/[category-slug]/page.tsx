import { notFound } from "next/navigation";
import { getProducts, getCategories, getSubCategories } from "@/src/lib/api/products";
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
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
    const { "category-slug": categorySlug } = await params;
    const search = await searchParams;
    const subcategorySlug = typeof search.subcategory === 'string' ? search.subcategory : undefined;

    const categories = await getCategories();
    const category = categories.find(c => c.slug === categorySlug);
    
    if (!category && categorySlug !== "all") return {};

    let title = category ? category.title : "All Products";

    if (subcategorySlug) {
        const subcategories = await getSubCategories();
        const subcategory = subcategories.find(s => s.slug === subcategorySlug);
        if (subcategory) {
            title = subcategory.title;
        }
    }

    return {
        title: `${title} | Storefront`,
        description: `Browse our collection of ${title.toLowerCase()}`,
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { "category-slug": categorySlug } = await params;
    const search = await searchParams;
    const subcategoryParam = typeof search.subcategory === 'string' ? search.subcategory : undefined;
    
    // Validate category
    const categories = await getCategories();
    const category = categories.find(c => c.slug === categorySlug);
    const isValidCategory = categorySlug === "all" || !!category;
    
    if (!isValidCategory) {
        notFound();
    }

    // Validate subcategory
    let validSubcategorySlug: string | undefined = undefined;
    let subcategoryTitle: string | undefined = undefined;
    
    if (subcategoryParam) {
        const subcategories = await getSubCategories();
        const subcategory = subcategories.find(s => s.slug === subcategoryParam);
        if (subcategory) {
            validSubcategorySlug = subcategory.slug;
            subcategoryTitle = subcategory.title;
        }
    }

    // Fetch initial page of products server-side
    const { items: initialProducts } = await getProducts({ 
        category: categorySlug, 
        subcategory: validSubcategorySlug,
        skip: 0, 
        take: 12 
    });
    
    const title = categorySlug === "all" ? "All Products" : category?.title;
    const displayTitle = subcategoryTitle || title;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb className="mb-4 sm:mb-6 md:mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {subcategoryTitle && categorySlug !== "all" ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/${categorySlug}`}>{title}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{subcategoryTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-3xl font-bold tracking-tight mb-8">{displayTitle}</h1>
            <CategoryProductList 
                initialProducts={initialProducts} 
                categorySlug={categorySlug} 
                subcategorySlug={validSubcategorySlug}
            />
        </div>
    );
}