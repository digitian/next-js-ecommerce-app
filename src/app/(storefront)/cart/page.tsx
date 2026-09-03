import type { Metadata } from "next";
import { CartView } from "@/src/components/features/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Shopping Cart | nextjs-ecommerce",
  description: "Review items in your cart before proceeding to checkout.",
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      <CartView />
    </div>
  );
}
