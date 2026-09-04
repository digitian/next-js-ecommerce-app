import { test, expect } from "@playwright/test";

// A product card's price block can render a sale price followed by a
// strikethrough original price (e.g. "$99.99$129.9923% off"), so pull out
// just the first dollar amount rather than every digit on the card.
function firstPrice(text: string): number {
  const match = text.match(/\$([\d,]+(?:\.\d+)?)/);
  return match ? Number(match[1].replace(/,/g, "")) : NaN;
}

test("sorting the product list by price updates the order and the URL", async ({ page }) => {
  await page.goto("/products");

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Price: Low to High" }).click();

  await expect(page).toHaveURL(/sort=price-asc/);

  const cards = page.locator('a[href^="/products/"]');
  await expect(cards.first()).toBeVisible();

  const cardCount = await cards.count();
  const prices: number[] = [];
  for (let i = 0; i < cardCount; i++) {
    const text = await cards.nth(i).locator(".font-semibold").first().textContent();
    if (text) prices.push(firstPrice(text));
  }
  const validPrices = prices.filter((n) => !Number.isNaN(n));
  expect(validPrices.length).toBeGreaterThan(1);

  const sorted = [...validPrices].sort((a, b) => a - b);
  expect(validPrices).toEqual(sorted);
});

test("filtering by minimum rating narrows the results and updates the URL", async ({ page }) => {
  await page.goto("/products");

  const beforeCount = await page.locator('a[href^="/products/"]').count();

  await page.locator('label[for="rating-4"]:visible').click();

  await expect(page).toHaveURL(/minRating=4/);
  await expect(page.locator('a[href^="/products/"]').first()).toBeVisible();

  // Filtering may return fewer (or equal) results, but never more than the
  // unfiltered list, and the grid re-renders rather than erroring out.
  const afterCount = await page.locator('a[href^="/products/"]').count();
  expect(afterCount).toBeLessThanOrEqual(beforeCount);
});
