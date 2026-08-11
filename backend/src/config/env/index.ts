import dotenv from "dotenv";
import { envSchema } from "./schema.js";

dotenv.config();

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid environment variables");
  console.error(result.error.format());
  process.exit(1);
}

const env = result.data;

export default env;
