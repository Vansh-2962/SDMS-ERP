import { z } from "zod";

export const settingsSchema = z.object({
  body: z.object({
    invPrefix: z
      .string()
      .trim()
      .min(1, "Invoice prefix is required")
      .max(20, "Invoice prefix cannot exceed 20 characters")
      .transform((value) => value.toUpperCase()),

    finYearStart: z.coerce.date({
      message: "Please provide a valid financial year start date",
    }),

    paymentTerms: z
      .number({
        message: "Payment terms must be a number",
      })
      .int("Payment terms must be a whole number")
      .min(0, "Payment terms cannot be negative")
      .optional(),
  }),
});

export type CreateSettingInput = z.infer<typeof settingsSchema>;
