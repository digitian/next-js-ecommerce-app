import type { Metadata } from "next";
import { WishlistView } from "@/src/components/features/storefront/wishlist-view";

export const metadata: Metadata = {
  title: `Your Wishlist | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "View and manage your saved products.",
};

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">My Wishlist</h1>
      <WishlistView />
    </div>
  );
}
