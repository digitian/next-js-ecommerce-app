export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  title: string;
  quantity: number;
  price: number; // in cents or smallest currency unit
  image: string;
}

export interface OrderSummary {
  id: string;
  date: string; // ISO date string
  status: OrderStatus;
  total: number; // in cents
  itemCount: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    brand: string; // e.g., "Visa", "MasterCard"
    last4: string;
  };
}
