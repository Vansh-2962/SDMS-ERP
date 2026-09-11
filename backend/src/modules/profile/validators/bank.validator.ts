import { z } from "zod";

export const bankSchema = z.object({
  body: z.object({
    bankName: z.string().trim().max(30, "Maximum 30 characters is allowed"),
    accountNumber: z.number(),
    ifsc: z.string().trim(),
    accountType: z.enum(["SAVINGS", "CURRENT"]).default("CURRENT"),
    upiId: z.string().trim().optional(),
  }),
});

export type CreateBankInput = z.infer<typeof bankSchema>;
