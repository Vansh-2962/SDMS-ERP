import { z } from "zod";

const optionalString = z.string().trim().optional();

const optionalMinString = (min: number, message: string) =>
  z.string().trim().min(min, message).optional().or(z.literal(""));

const optionalRegex = (regex: RegExp, message: string) =>
  z.string().trim().regex(regex, message).optional().or(z.literal(""));

export const profileSchema = z.object({
  companyName: optionalMinString(
    2,
    "Company name must be at least 2 characters",
  ),

  gstin: optionalRegex(/^[0-9A-Z]{15}$/, "Enter a valid GSTIN"),

  pan: optionalRegex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN"),

  fssai: optionalRegex(/^\d{14}$/, "FSSAI license must be 14 digits"),

  mobile: optionalRegex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .trim()
    .url("Enter a valid website URL")
    .optional()
    .or(z.literal("")),
});
