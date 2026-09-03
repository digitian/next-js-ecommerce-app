import type { Metadata } from "next";
import { SuccessView } from "@/src/components/features/checkout/success-view";

export const metadata: Metadata = {
  title: "Order Successful | nextjs-ecommerce",
  description: "Thank you for your order.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <SuccessView />
    </div>
  );
}
