import { describe, it, expect } from "vitest";
import { formatCurrency } from "./format-currency";

describe("formatCurrency", () => {
  it("formats a positive amount in cents as USD by default", () => {
    expect(formatCurrency(129900)).toBe("$1,299.00");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats negative amounts (e.g. discounts/refunds)", () => {
    expect(formatCurrency(-500)).toBe("-$5.00");
  });

  it("formats a single cent", () => {
    expect(formatCurrency(1)).toBe("$0.01");
  });

  it("rounds fractional cents to the nearest cent", () => {
    expect(formatCurrency(1234.5)).toBe("$12.35");
    expect(formatCurrency(1234.4)).toBe("$12.34");
  });

  it("supports a different currency and locale", () => {
    // Assert on content rather than an exact string: ICU inserts a
    // non-breaking space before the symbol in de-DE, which is easy to
    // typo as a regular space and shouldn't fail the test either way.
    const result = formatCurrency(150000, "EUR", "de-DE");
    expect(result).toContain("1.500,00");
    expect(result).toContain("€");
  });

  it("supports a different locale for the same currency", () => {
    expect(formatCurrency(150000, "USD", "en-GB")).toBe("US$1,500.00");
  });
});
