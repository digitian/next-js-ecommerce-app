import { Order } from "@/src/types/order.types";
import { products } from "./products";

const product1 = products.find(p => p.id === "prod_1")!;
const product2 = products.find(p => p.id === "prod_2")!;

export const orders: Order[] = [
  {
    id: "ord_1001",
    userId: "usr_1",
    date: "2026-08-15T10:30:00Z",
    status: "delivered",
    total: product1.price + 2000 + 3000,
    subtotal: product1.price,
    tax: 3000,
    shippingCost: 2000,
    discount: 0,
    items: [
      {
        id: "item_1",
        productId: product1.id,
        productSlug: product1.slug,
        title: product1.name,
        quantity: 1,
        price: product1.price,
        image: product1.images[0].url,
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      addressLine1: "123 Main St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "US",
    },
    paymentMethod: {
      brand: "Visa",
      last4: "4242",
    },
  },
  {
    id: "ord_1002",
    userId: "usr_1",
    date: "2026-09-01T14:15:00Z",
    status: "processing",
    total: (product2.price * 2) + 350 + 650,
    subtotal: product2.price * 2,
    tax: 350,
    shippingCost: 650,
    discount: 0,
    items: [
      {
        id: "item_2",
        productId: product2.id,
        productSlug: product2.slug,
        title: product2.name,
        quantity: 2,
        price: product2.price,
        image: product2.images[0].url,
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      addressLine1: "123 Main St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "US",
    },
    paymentMethod: {
      brand: "Visa",
      last4: "4242",
    },
  },
];
