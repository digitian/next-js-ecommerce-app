export type WishlistItemProductSnapshot = {
    id: string;
    slug: string;
    name: string;
    price: number;
    base_price?: number;
    image: string; // The URL of the first image
};

export type WishlistItem = {
    id: string; // unique item id (product_id for now)
    product: WishlistItemProductSnapshot;
    addedAt: string; // ISO date string
};

export type Wishlist = {
    items: WishlistItem[];
    totalItems: number;
};
