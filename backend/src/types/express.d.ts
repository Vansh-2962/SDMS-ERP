import type { auth } from "@/lib/auth/auth";
import type { AuthorizationContext } from "@/lib/auth/authorization.ts";

type AuthSession = typeof auth.$Infer.Session;

declare global {
  namespace Express {
    interface Request {
      auth?: AuthSession;
      authorization?: AuthorizationContext;
    }
  }
}

export {};
