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
    sort?: string | null;
    skip?: number;
    take?: number;
}): Promise<{ items: Product[]; hasNextPage: boolean }> {
    let result = products.map(hydrateProduct);

    if (filters?.category && filters.category !== "all") {
        result = result.filter((p) => {
            return p.category.slug === filters.category;
        });
    }

    if (filters?.sort) {
        switch (filters.sort) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }

    const skip = filters?.skip ?? 0;
    const take = filters?.take ?? result.length;

    const items = result.slice(skip, skip + take);
    const hasNextPage = skip + take < result.length;

    return { items, hasNextPage };
}

export async function getCategories(): Promise<Category[]> {
    return [...categories];
}

export async function getSubCategories(): Promise<SubCategory[]> {
    return [...subcategories];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const p = products.find((p) => p.slug === slug);
    return p ? hydrateProduct(p) : null;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
    return reviews.filter(r => r.product_id === productId);
}
