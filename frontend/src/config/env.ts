import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url("VITE_API_URL must be a valid url"),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.log(`Invalid frontend environemnt variables`);
  throw new Error("Invalid frontend environemnt variables");
}

export const env = parsedEnv.data;
