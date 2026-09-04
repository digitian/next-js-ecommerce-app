import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./product-card";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { useWishlistStore } from "@/src/hooks/use-wishlist-store";
import type { Product } from "@/src/types/product.types";

const mockProduct: Product = {
  id: "prod_camden",
  slug: "sofa-camden",
  name: "Camden 3-Seat Sofa",
  category: { id: "cat_1", slug: "living-room", title: "Living Room", showcase_image: "", thumb_image: "" },
  sub_category: { id: "sub_1", slug: "sofas", title: "Sofas", category_id: "cat_1", showcase_image: "", thumb_image: "" },
  brief_description: "A comfortable, minimal 3-seat sofa.",
  description: "Full description",
  price: 129900,
  images: [{ url: "/images/camden.jpg", alt: "Camden sofa in a sunlit room" }],
};

function resetStores() {
  useCartStore.setState({ items: [], totalItems: 0, subtotal: 0, isCartOpen: false }, false);
  useWishlistStore.setState({ items: [], totalItems: 0, isWishlistOpen: false, isHydrated: true }, false);
}

beforeEach(() => {
  resetStores();
});

describe("ProductCard", () => {
  it("renders the product name, description, and formatted price", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("heading", { name: "Camden 3-Seat Sofa" })).toBeInTheDocument();
    expect(screen.getByText("A comfortable, minimal 3-seat sofa.")).toBeInTheDocument();
    expect(screen.getByText("$1,299.00")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/sofa-camden");
  });

  it("shows the discounted price, struck-through original price, and discount badge when discounted", () => {
    render(
      <ProductCard
        product={{ ...mockProduct, price: 99900, base_price: 129900, discount_percentage: 23 }}
      />
    );

    expect(screen.getByText("$999.00")).toBeInTheDocument();
    expect(screen.getByText("$1,299.00")).toBeInTheDocument();
    expect(screen.getByText("23% off")).toBeInTheDocument();
  });

  it("exposes accessible labels for the quick-action buttons", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("button", { name: "Add to wishlist" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quick view" })).toBeInTheDocument();
  });

  it("adds the product to the cart without navigating away", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: "prod_camden", quantity: 1 });
  });

  it("toggles the wishlist and flips the accessible label", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    const wishlistButton = screen.getByRole("button", { name: "Add to wishlist" });
    await user.click(wishlistButton);

    expect(useWishlistStore.getState().items).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Remove from wishlist" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove from wishlist" }));
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });
});
