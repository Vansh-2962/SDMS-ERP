import { env } from "@/config/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.VITE_BETTER_AUTH_URL,
});

export type AuthSession = typeof authClient.$Infer.Session;
