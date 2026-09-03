import { z } from "zod";

export const checkoutSchema = z.object({
  // Contact Info
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  
  // Shipping Address
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  company: z.string().optional(),
  address1: z.string().min(1, { message: "Address is required." }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  zip: z.string().min(1, { message: "ZIP code is required." }),
  country: z.string().min(1, { message: "Country is required." }),

  // Shipping Method
  shippingMethod: z.enum(["standard", "express"], {
    required_error: "Please select a shipping method.",
  }),

  // Payment
  cardNumber: z.string().min(16, { message: "Invalid card number." }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: "Invalid expiry (MM/YY)." }),
  cardCvc: z.string().min(3, { message: "Invalid CVC." }),
  cardName: z.string().min(1, { message: "Name on card is required." }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
