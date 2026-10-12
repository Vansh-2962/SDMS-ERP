import { z } from "zod";
export declare const bankSchema: z.ZodObject<{
    body: z.ZodObject<{
        bankName: z.ZodString;
        accountNumber: z.ZodString;
        ifsc: z.ZodString;
        accountType: z.ZodDefault<z.ZodEnum<{
            CURRENT: "CURRENT";
            SAVINGS: "SAVINGS";
        }>>;
        upiId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateBankInput = z.infer<typeof bankSchema>;
//# sourceMappingURL=bank.validator.d.ts.map