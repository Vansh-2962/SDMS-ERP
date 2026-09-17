import { z } from "zod";

export const settingsSchema = z.object({
  invPrefix: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Invoice prefix is required")
    .max(20, "Invoice prefix cannot exceed 20 characters"),

  finYearStart: z.coerce.date({
    message: "Please select a valid financial year start date",
  }),

  paymentTerms: z
    .number({
      message: "Payment terms must be a number",
    })
    .int("Payment terms must be a whole number")
    .min(0, "Payment terms cannot be negative"),
});

export type SaveSettingsData = z.infer<typeof settingsSchema>;
