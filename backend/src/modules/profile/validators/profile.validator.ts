import { z } from "zod";

export const profileSchema = z.object({
  body: z.object({
    companyName: z.string().trim().min(1, "Company name is required"),
    GSTIN: z
      .string()
      .trim()
      .min(1, "GSTIN is required")
      .max(15, "GSTIN cannot exceed 15 characters"),
    pan: z.string().trim().optional(),
    fssai: z.string().trim().optional(),
    mobile: z.string().trim().max(12, "Maximum 12 digits are allowed").optional(),
    email: z.email().trim().optional(),
    website: z.url().trim().optional(),
    address: z
      .string()
      .trim()
      .max(200, "Maximum 200 characters is allowed")
      .optional(),
  }),
});

export type CreateProfileInput = z.infer<typeof profileSchema>;
