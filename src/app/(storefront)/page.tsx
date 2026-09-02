import { HeroCarousel } from "@/src/components/features/storefront/hero-carousel";
import { FeaturedProducts } from "@/src/components/features/storefront/featured-products";
import { ShopByRoom } from "@/src/components/features/storefront/shop-by-room";
import { getProducts, getCategories } from "@/src/lib/api/products";
import TrustBar from "@/src/components/features/storefront/trust-bar";

export default async function Home() {
  const { items: products } = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <HeroCarousel />
      <TrustBar />
      <FeaturedProducts initialProducts={products} categories={categories} />
      <ShopByRoom />
    </>
  );
}
