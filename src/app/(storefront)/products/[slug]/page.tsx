import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getProductReviews } from "@/src/lib/api/products";
import { ProductGallery } from "@/src/components/features/products/product-gallery";
import { ProductInfo } from "@/src/components/features/products/product-info";
import { ProductTabs } from "@/src/components/features/products/product-tabs";
import { SimilarProducts } from "@/src/components/features/products/similar-products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";

interface ProductDetailProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const categorySlug = product.category.slug;
    const { items: categoryProducts } = await getProducts({ category: categorySlug });
    const similarProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 10);
    
    const reviews = await getProductReviews(product.id);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
            <Breadcrumb className="my-4 sm:my-6 md:my-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/products?category=${product.category.slug}`}>{product.category.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/products?category=${product.category.slug}`}>{product.sub_category.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                <ProductGallery images={product.images} />
                <ProductInfo product={product} />
            </div>

            <ProductTabs product={product} reviews={reviews} />

            {similarProducts.length > 0 && (
                <SimilarProducts products={similarProducts} />
            )}
        </div>
    );
}