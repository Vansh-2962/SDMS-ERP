import { AuthenticationError } from "@/shared/errors/authentication.error.js";
import type { IRefreshSessonRepository } from "../repositories/refresh-session.repository.interface.js";
import { hashToken } from "../utils/token-hash.js";
import type { TokenService } from "./token.service.js";
import { getExpirationDate } from "../utils/token-expiration.js";
import { tokenConfig } from "../config/token.config.js";
import { generateSessionFamilyId } from "../utils/session-id.js";

export class RefreshTokenService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly sessionRepository: IRefreshSessonRepository,
  ) {}

  async createSession(userId: string, familyId = generateSessionFamilyId()) {
    const refreshToken = await this.tokenService.generateRefreshToken(userId);

    const tokenHash = hashToken(refreshToken);

    const expiresAt = getExpirationDate(tokenConfig.refreshTokenExpiresIn);

    const session = await this.sessionRepository.create({
      userId,
      familyId,
      tokenHash,
      expiresAt,
    });

    return { session, refreshToken };
  }

  async rotate(refreshToken: string) {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    const userId = payload.sub;

    const tokenhash = hashToken(refreshToken);

    const session = await this.sessionRepository.findByTokenHash(tokenhash);

    if (!session) {
      throw new AuthenticationError(
        "Invalid refresh token",
        "INVALID_REFRESH_TOKEN",
      );
    }

    if (session.userId !== userId) {
      throw new AuthenticationError(
        "Invalid refresh token",
        "INVALID_REFRESH_TOKEN",
      );
    }

    if (session.revokedAt) {
      await this.sessionRepository.revokeFamily(session.familyId);

      throw new AuthenticationError(
        "Refresh token has been detected",
        "REFRESH_TOKEN_REUSE_DETECTED",
      );
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      await this.sessionRepository.revoke(session.id);
      throw new AuthenticationError(
        "Refresh token has expired",
        "REFRESH_TOKEN_EXPIRED",
      );
    }

    await this.sessionRepository.revoke(session.id);
    const { refreshToken: newRefreshToken } = await this.createSession(
      userId,
      session.familyId,
    );

    const accessToken = await this.tokenService.generateAccessToken(userId);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async revoke(refreshToken: string): Promise<void> {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    const tokenHash = hashToken(refreshToken);

    const session = await this.sessionRepository.findByTokenHash(tokenHash);

    if (!session) {
      throw new AuthenticationError(
        "Invalid refresh token",
        "INVALID_REFRESH_TOKEN",
      );
    }

    if (session.userId !== payload.sub) {
      throw new AuthenticationError(
        "Invalid refresh token",
        "INVALID_REFRESH_TOKEN",
      );
    }

    if (!session.revokedAt) {
      await this.sessionRepository.revoke(session.id);
    }
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.sessionRepository.revokeAllForUser(userId);
  }
}
