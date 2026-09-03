import type { Metadata } from "next";
import { CheckoutWizard } from "@/src/components/features/checkout/checkout-wizard";

export const metadata: Metadata = {
  title: "Checkout | nextjs-ecommerce",
  description: "Complete your purchase.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Checkout</h1>
      <CheckoutWizard />
    </div>
  );
}
