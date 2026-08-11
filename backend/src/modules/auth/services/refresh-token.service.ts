import { AuthenticationError } from "@/shared/errors/authentication.error.js";
import type { IRefreshSessonRepository } from "@/modules/auth/repositories/refresh-session.repository.interface.js";
import { hashToken } from "@/modules/auth/utils/token-hash.js";
import type { TokenService } from "@/modules/auth/services/token.service.js";
import { getExpirationDate } from "@/modules/auth/utils/token-expiration.js";
import { tokenConfig } from "@/modules/auth/config/token.config.js";
import { generateSessionFamilyId } from "@/modules/auth/utils/session-id.js";
import { RefreshSessionAlreadyRevokedError } from "@/modules/auth/errors/refresh-session.error.js";
import type { CreateRefreshSessionDto } from "@/modules/auth/dto/create-refresh-session.dto.js";

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

    if (session.expiresAt.getTime() <= Date.now()) {
      throw new AuthenticationError(
        "Refresh token has expired",
        "REFRESH_TOKEN_EXPIRED",
      );
    }

    const newRefreshToken = await this.tokenService.generateRefreshToken(
      payload.sub,
    );

    const newTokenHash = hashToken(newRefreshToken);

    const newSession: CreateRefreshSessionDto = {
      userId: payload.sub,
      familyId: session.familyId,
      tokenHash: newTokenHash,
      expiresAt: getExpirationDate(tokenConfig.refreshTokenExpiresIn),
    };

    try {
      await this.sessionRepository.rotate(session.id, newSession);
    } catch (error) {
      if (error instanceof RefreshSessionAlreadyRevokedError) {
        await this.sessionRepository.revokeFamily(session.familyId);

        throw new AuthenticationError(
          "Refresh token reuse detected",
          "REFRESH_TOKEN_REUSE_DETECTED",
        );
      }

      throw error;
    }

    const accessToken = await this.tokenService.generateAccessToken(
      payload.sub,
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
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
