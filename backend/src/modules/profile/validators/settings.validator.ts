import { z } from "zod";

export const settingsSchema = z.object({
  body: z.object({
    invPrefix: z.string().trim().uppercase(),
    finYearStart: z.date(),
    paymentTerms: z.number().optional(),
  }),
});

export type CreateSettingInput = z.infer<typeof settingsSchema>;
