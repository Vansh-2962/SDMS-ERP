import { prisma } from "@/config/database/index.js";
import { AuthRepository } from "@/modules/auth/repositories/auth.repository.js";
import { AuthService } from "@/modules/auth/services/auth.service.js";
import { AuthController } from "@/modules/auth/controllers/auth.controller.js";
import { createAuthRouter } from "@/modules/auth/routes/auth.routes.js";
import { RefreshSessionRepository } from "@/modules/auth/repositories/refresh-session.repository.js";
import { TokenService } from "@/modules/auth/services/token.service.js";
import { RefreshTokenService } from "@/modules/auth/services/refresh-token.service.js";
import { createAuthenticateMiddleware } from "@/middlewares/authenticate.middleware.js";

const authRepository = new AuthRepository(prisma);
const refreshSessionRepository = new RefreshSessionRepository(prisma);
const tokenService = new TokenService();
const refreshTokenService = new RefreshTokenService(
  tokenService,
  refreshSessionRepository,
);
const authService = new AuthService(
  authRepository,
  tokenService,
  refreshTokenService,
);
const authController = new AuthController(authService);
const authenticate = createAuthenticateMiddleware(tokenService);

export const authRouter = createAuthRouter(authController, authenticate);
