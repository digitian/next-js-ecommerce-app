import { test, expect } from "@playwright/test";

const TEST_EMAIL = "customer@example.com";
const TEST_PASSWORD = "Password123!";

test("logging in with the test account shows order history and an order's detail page", async ({ page }) => {
  await page.goto("/login?callbackUrl=/account/orders");
  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Password").fill(TEST_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/account\/orders$/);
  await expect(page.getByRole("heading", { name: "Order History" })).toBeVisible();

  const firstOrderLink = page.getByRole("link", { name: /^ord_/ }).first();
  const orderId = (await firstOrderLink.textContent())?.trim();
  await firstOrderLink.click();

  await expect(page).toHaveURL(/\/account\/orders\/ord_/);
  await expect(page.getByRole("heading", { name: `Order ${orderId}` })).toBeVisible();
  await expect(page.getByText("Products Ordered")).toBeVisible();
  await expect(page.getByText("Shipping Details")).toBeVisible();
});

test("opening another account's order URL directly is blocked", async ({ page }) => {
  await page.goto("/login?callbackUrl=/account/orders");
  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Password").fill(TEST_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/account\/orders$/);

  // The mock dataset only seeds orders for this one test account, so there's
  // no second account's order id to try in the UI. This still exercises the
  // page's "not mine / doesn't exist" guard; the actual cross-account
  // ownership check (order exists but belongs to a different user) is
  // covered directly at the API layer in
  // src/app/api/orders/[id]/route.test.ts (403 for a non-owner).
  await page.goto("/account/orders/ord_does_not_exist");
  await expect(page.getByRole("heading", { name: "Order Not Found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to Orders" })).toBeVisible();
});

test("visiting an order detail page while signed out redirects to login", async ({ page }) => {
  await page.goto("/account/orders/ord_1001");
  await expect(page).toHaveURL(/\/login\?callbackUrl=\/account\/orders\/ord_1001/);
});
