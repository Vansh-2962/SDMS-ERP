import { Router } from "express";
import type { AuthController } from "@/modules/auth/controllers/auth.controller.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { registerSchema } from "../validators/register.schema.js";
import { loginSchema } from "../validators/login.schema.js";
import { refreshSchema } from "../validators/refresh.schema.js";

export function createAuthRouter(
  controller: AuthController,
  authenticate: ReturnType<
    typeof import("@/middlewares/authenticate.middleware.js").createAuthenticateMiddleware
  >,
): Router {
  const router = Router();

  router.post("/register", validate(registerSchema), controller.register);

  router.post("/login", validate(loginSchema), controller.login);

  router.post("/refresh", validate(refreshSchema), controller.refresh);

  router.post("/logout", validate(refreshSchema), controller.logout);

  router.post("/me", authenticate, controller.me);

  return router;
}
