import { z } from "zod";
export declare const settingsSchema: z.ZodObject<{
    body: z.ZodObject<{
        invPrefix: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        finYearStart: z.ZodCoercedDate<unknown>;
        paymentTerms: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateSettingInput = z.infer<typeof settingsSchema>;
//# sourceMappingURL=settings.validator.d.ts.map