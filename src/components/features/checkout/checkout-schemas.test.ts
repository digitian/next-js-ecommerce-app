import { describe, expect, it } from "vitest";
import { checkoutSchema } from "./checkout-schemas";

const validPayload = {
  email: "customer@example.com",
  phone: "",
  firstName: "John",
  lastName: "Doe",
  company: "",
  address1: "123 Main St",
  address2: "",
  city: "Seattle",
  state: "WA",
  zip: "98101",
  country: "United States",
  shippingMethod: "standard" as const,
  cardNumber: "4242424242424242",
  cardExpiry: "12/29",
  cardCvc: "123",
  cardName: "John Doe",
};

describe("checkoutSchema", () => {
  it("accepts a fully valid checkout payload", () => {
    const result = checkoutSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "email")).toBe(true);
    }
  });

  it("rejects a missing first name", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid shipping method", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, shippingMethod: "overnight" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "shippingMethod")).toBe(true);
    }
  });

  it("accepts the express shipping method", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, shippingMethod: "express" });
    expect(result.success).toBe(true);
  });

  it("rejects a card number shorter than 16 digits", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, cardNumber: "4242" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed card expiry", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, cardExpiry: "13/29" });
    expect(result.success).toBe(false);
  });

  it("accepts an expiry without a slash (MMYY)", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, cardExpiry: "1229" });
    expect(result.success).toBe(true);
  });

  it("rejects a CVC shorter than 3 digits", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, cardCvc: "12" });
    expect(result.success).toBe(false);
  });

  it("treats optional fields (phone, company, address2) as genuinely optional", () => {
    const { phone: _phone, company: _company, address2: _address2, ...rest } = validPayload;
    const result = checkoutSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });
});
