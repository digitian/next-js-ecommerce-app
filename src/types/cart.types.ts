export type CartItemProductSnapshot = {
    id: string;
    slug: string;
    name: string;
    price: number;
    base_price?: number;
    image: string; // The URL of the first image
};

export type CartItem = {
    id: string; // unique cart item id (product_id for now, could be product_id + variant later)
    product: CartItemProductSnapshot;
    quantity: number;
};

export type Cart = {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
};
