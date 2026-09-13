import { z } from "zod";

const optionalField = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    return value;
  }, schema.optional());

export const bankSchema = z.object({
  bankName: optionalField(
    z.string().trim().min(2, "Bank name must be at least 2 characters"),
  ),

  accountNumber: optionalField(
    z.string().max(20, "Account number can be maximum 20 digits long"),
  ),

  ifsc: optionalField(
    z
      .string()
      .trim()
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code"),
  ),

  accountType: optionalField(
    z.string().trim().min(2, "Account type is required"),
  ),

  upiId: optionalField(z.string().trim().min(3, "Enter a valid UPI ID")),
});

export type BankFormData = z.infer<typeof bankSchema>;
