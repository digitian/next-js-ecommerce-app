import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./use-cart-store";
import type { CartItemProductSnapshot } from "@/src/types/cart.types";

const productA: CartItemProductSnapshot = {
  id: "prod_a",
  slug: "product-a",
  name: "Product A",
  price: 1000, // $10.00 in cents
  image: "/images/a.jpg",
};

const productB: CartItemProductSnapshot = {
  id: "prod_b",
  slug: "product-b",
  name: "Product B",
  price: 2500, // $25.00 in cents
  image: "/images/b.jpg",
};

// Zustand stores are module-level singletons, so we reset state by hand
// between tests instead of re-importing the module each time.
beforeEach(() => {
  useCartStore.setState(
    {
      items: [],
      totalItems: 0,
      subtotal: 0,
      isCartOpen: false,
      lastOrder: null,
    },
    false
  );
  localStorage.clear();
});

describe("useCartStore", () => {
  it("starts empty", () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().totalItems).toBe(0);
    expect(useCartStore.getState().subtotal).toBe(0);
  });

  it("adds a new item and recalculates totals", () => {
    useCartStore.getState().addItem(productA);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: "prod_a", quantity: 1 });
    expect(state.totalItems).toBe(1);
    expect(state.subtotal).toBe(1000);
  });

  it("opens the cart automatically when an item is added", () => {
    expect(useCartStore.getState().isCartOpen).toBe(false);
    useCartStore.getState().addItem(productA);
    expect(useCartStore.getState().isCartOpen).toBe(true);
  });

  it("increments quantity instead of duplicating when the same item is added again", () => {
    useCartStore.getState().addItem(productA);
    useCartStore.getState().addItem(productA, 2);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.totalItems).toBe(3);
    expect(state.subtotal).toBe(3000);
  });

  it("tracks multiple distinct items and sums their totals", () => {
    useCartStore.getState().addItem(productA, 2); // 2 * 1000
    useCartStore.getState().addItem(productB, 1); // 1 * 2500

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(2);
    expect(state.totalItems).toBe(3);
    expect(state.subtotal).toBe(4500);
  });

  it("removes an item by id", () => {
    useCartStore.getState().addItem(productA);
    useCartStore.getState().addItem(productB);

    useCartStore.getState().removeItem("prod_a");

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("prod_b");
    expect(state.totalItems).toBe(1);
    expect(state.subtotal).toBe(2500);
  });

  it("updates an item's quantity and recalculates totals", () => {
    useCartStore.getState().addItem(productA);

    useCartStore.getState().updateQuantity("prod_a", 5);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(state.totalItems).toBe(5);
    expect(state.subtotal).toBe(5000);
  });

  it("removes the item when quantity is updated to zero or below", () => {
    useCartStore.getState().addItem(productA);
    useCartStore.getState().addItem(productB);

    useCartStore.getState().updateQuantity("prod_a", 0);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items.find((i) => i.id === "prod_a")).toBeUndefined();
  });

  it("clears the cart, optionally saving the last order snapshot", () => {
    useCartStore.getState().addItem(productA, 2); // subtotal 2000

    useCartStore.getState().clearCart(true, 500, {
      email: "customer@example.com",
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "US",
    });

    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.totalItems).toBe(0);
    expect(state.subtotal).toBe(0);
    expect(state.lastOrder).not.toBeNull();
    expect(state.lastOrder?.subtotal).toBe(2000);
    expect(state.lastOrder?.shippingCost).toBe(500);
    expect(state.lastOrder?.tax).toBeCloseTo(200); // 10% of 2000
    expect(state.lastOrder?.total).toBeCloseTo(2700); // 2000 + 500 + 200
    expect(state.lastOrder?.customerInfo?.email).toBe("customer@example.com");
  });

  it("clears the cart without touching lastOrder when saveAsLastOrder is false", () => {
    useCartStore.getState().addItem(productA);
    useCartStore.setState({ lastOrder: null }, false);

    useCartStore.getState().clearCart(false);

    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().lastOrder).toBeNull();
  });

  it("marks the store hydrated via setHydrated", () => {
    useCartStore.setState({ isHydrated: false }, false);
    useCartStore.getState().setHydrated();
    expect(useCartStore.getState().isHydrated).toBe(true);
  });
});
