import { z } from "zod";

// Shipping information schema
export const shippingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(9, "Phone must be at least 9 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(4, "Invalid postal code"),
  country: z.string().min(2, "Country is required"),
});

// Billing information schema (optional, defaults to shipping if not provided)
export const billingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(4, "Invalid postal code"),
  country: z.string().min(2, "Country is required"),
});

// Payment information schema
export const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardholderName: z
    .string()
    .min(3, "Cardholder name must be at least 3 characters"),
  expiryMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, "Month must be between 01 and 12"),
  expiryYear: z
    .string()
    .regex(/^\d{2}$/, "Year must be 2 digits")
    .refine((year) => {
      const currentYear = new Date().getFullYear() % 100;
      return parseInt(year) >= currentYear;
    }, "Card is expired"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

// Complete checkout schema
export const checkoutSchema = z.object({
  shipping: shippingSchema,
  billing: billingSchema.optional(),
  payment: paymentSchema,
  useSameAsBilling: z.boolean().default(true),
});

export type ShippingData = z.infer<typeof shippingSchema>;
export type BillingData = z.infer<typeof billingSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;
