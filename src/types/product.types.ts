export type Category = {
    id: string;
    slug: string;
    title: string;
    showcase_image: string;
}

export type SubCategory = {
    id: string;
    slug: string;
    title: string;
    category_id: string;
    showcase_image: string;
}

export type ProductImage = {
    url: string;
    alt: string;
}

export type Product = {
    id: string;
    slug: string;
    name: string;
    category: Category;
    sub_category: SubCategory;
    brief_description: string;
    description: string; // Markdown
    price: number;
    base_price?: number;
    discount_percentage?: number;
    images: ProductImage[];
    rating?: number | null;
    review_count?: number | null;
};

export type Review = {
    id: string;
    product_id: string;
    author: string;
    date: string;
    rating: number;
    content: string;
};