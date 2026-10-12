import { z } from "zod";
export declare const profileSchema: z.ZodObject<{
    body: z.ZodObject<{
        companyName: z.ZodString;
        gstin: z.ZodString;
        pan: z.ZodOptional<z.ZodString>;
        fssai: z.ZodOptional<z.ZodString>;
        mobile: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodEmail>;
        website: z.ZodOptional<z.ZodURL>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateProfileInput = z.infer<typeof profileSchema>;
//# sourceMappingURL=profile.validator.d.ts.map