import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>;
    PORT: z.ZodCoercedNumber<unknown>;
    DATABASE_URL: z.ZodURL;
    BETTER_AUTH_SECRET: z.ZodString;
    BETTER_AUTH_URL: z.ZodURL;
    CLIENT_URL: z.ZodURL;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
//# sourceMappingURL=schema.d.ts.map