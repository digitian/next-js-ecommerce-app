import { products, type MockProductEntity } from "./mockdata/products";
import { categories } from "./mockdata/categories";
import { subcategories } from "./mockdata/subcategories";
import { reviews } from "./mockdata/reviews";
import type { Product, Category, Review, SubCategory } from "@/src/types/product.types";

function hydrateProduct(p: MockProductEntity): Product {
    const category = categories.find(c => c.id === p.category_id)!;
    const sub_category = subcategories.find(s => s.id === p.sub_category_id)!;
    const { category_id, sub_category_id, ...rest } = p;
    return { ...rest, category, sub_category } as Product;
}

export async function getProducts(filters?: {
    category?: string | null;
}): Promise<Product[]> {
    let result = products.map(hydrateProduct);

    if (filters?.category && filters.category !== "all") {
        result = result.filter((p) => {
            return p.category.slug === filters.category;
        });
    }

    return result;
}

export async function getCategories(): Promise<Category[]> {
    return [...categories];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const p = products.find((p) => p.slug === slug);
    return p ? hydrateProduct(p) : null;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
    return reviews.filter(r => r.product_id === productId);
}
