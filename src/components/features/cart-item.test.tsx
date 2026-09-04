import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartItem } from "./cart-item";
import { useCartStore } from "@/src/hooks/use-cart-store";
import type { CartItem as CartItemType } from "@/src/types/cart.types";

const item: CartItemType = {
  id: "prod_camden",
  quantity: 2,
  product: {
    id: "prod_camden",
    slug: "sofa-camden",
    name: "Camden 3-Seat Sofa",
    price: 129900,
    image: "/images/camden.jpg",
  },
};

beforeEach(() => {
  useCartStore.setState(
    { items: [item], totalItems: item.quantity, subtotal: item.product.price * item.quantity, isCartOpen: false },
    false
  );
});

describe("CartItem", () => {
  it("renders the product name, quantity, and line total", () => {
    render(<CartItem item={item} />);

    expect(screen.getByRole("link", { name: "Camden 3-Seat Sofa" })).toHaveAttribute(
      "href",
      "/products/sofa-camden"
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$2,598.00")).toBeInTheDocument(); // 129900 * 2 cents
  });

  it("exposes accessible labels for quantity and remove controls", () => {
    render(<CartItem item={item} />);

    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increase quantity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("increases quantity via the store when the + button is clicked", async () => {
    const user = userEvent.setup();
    render(<CartItem item={item} />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));

    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });

  it("disables the decrease button at quantity 1 (floor enforced in the UI)", () => {
    useCartStore.setState(
      { items: [{ ...item, quantity: 1 }], totalItems: 1, subtotal: item.product.price },
      false
    );
    render(<CartItem item={{ ...item, quantity: 1 }} />);

    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled();
  });

  it("removes the item via the store when the remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<CartItem item={item} />);

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
