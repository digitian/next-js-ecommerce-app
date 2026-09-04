import { test, expect } from "@playwright/test";

/**
 * Guest browses -> adds a product to the cart -> checks out -> sees the
 * order confirmation / invoice page. No account required: the cart lives
 * in a Zustand store persisted to localStorage, and checkout is reachable
 * without signing in.
 */
test("guest can add a product to the cart and complete checkout", async ({ page }) => {
  await page.goto("/products");

  // The "Add to cart" quick-action only fades in on hover, but it's present
  // in the DOM regardless (opacity is not a Playwright visibility blocker).
  const firstCard = page.locator('a[href^="/products/"]').first();
  await firstCard.hover();
  await firstCard.getByRole("button", { name: "Add to cart" }).first().click();

  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();

  await expect(page).toHaveURL(/\/checkout$/);

  // Step 1: Contact + shipping address
  await page.getByLabel("Email").fill("guest@example.com");
  await page.getByLabel("First name").fill("Jamie");
  await page.getByLabel("Last name").fill("Rivera");
  await page.getByLabel("Address").fill("123 Market Street");
  await page.getByLabel("City").fill("San Francisco");
  await page.getByLabel("State").fill("CA");
  await page.getByLabel("ZIP code").fill("94103");
  await page.getByRole("button", { name: "Continue to shipping" }).click();

  // Step 2: Shipping method (Standard is selected by default)
  await expect(page.getByText("Standard Shipping")).toBeVisible();
  await page.getByRole("button", { name: "Continue to payment" }).click();

  // Step 3: Payment (mock checkout — any well-formed dummy data works)
  await page.getByLabel("Card number").fill("4111111111111111");
  await page.getByLabel("Expiration date (MM/YY)").fill("1234");
  await page.getByLabel("Security code").fill("123");
  await page.getByLabel("Name on card").fill("Jamie Rivera");
  await page.getByRole("button", { name: "Pay now" }).click();

  await expect(page).toHaveURL(/\/checkout\/success\?orderId=/);
  await expect(page.getByRole("heading", { name: "Order Confirmed!" })).toBeVisible();
  await expect(page.getByText(/Order ID:/)).toBeVisible();
});
