import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters long"),

  BETTER_AUTH_URL: z.url("BETTER_AUTH_URL must be a valid URL"),
  CLIENT_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;
