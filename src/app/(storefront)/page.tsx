import { HeroCarousel } from "@/src/components/features/storefront/hero-carousel";
import { FeaturedProducts } from "@/src/components/features/storefront/featured-products";
import { ShopByRoom } from "@/src/components/features/storefront/shop-by-room";
import { getProducts, getCategories } from "@/src/lib/api/products";
import TrustBar from "@/src/components/features/storefront/trust-bar";
import { TestimonialsSection } from "@/src/components/features/storefront/testimonials-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Premium Furniture Store`,
  description: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}, your destination for premium furniture and home decor. Shop now for quality craftsmanship and timeless designs.`,
};

export default async function Home() {
  const { items: products } = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <HeroCarousel />
      <TrustBar />
      <FeaturedProducts initialProducts={products} categories={categories} />
      <ShopByRoom />
      <TestimonialsSection />
    </>
  );
}
