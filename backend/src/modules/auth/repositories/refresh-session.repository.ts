import type { PrismaClient } from "@/generated/prisma/client";

import type { IRefreshSessonRepository } from "@/modules/auth/repositories/refresh-session.repository.interface.js";
import type { CreateRefreshSessionDto } from "@/modules/auth/dto/create-refresh-session.dto.js";
import { RefreshSessionAlreadyRevokedError } from "@/modules/auth/errors/refresh-session.error.js";

export class RefreshSessionRepository implements IRefreshSessonRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateRefreshSessionDto) {
    return this.prisma.refreshSession.create({
      data,
    });
  }

  async findByTokenHash(tokenHash: string): Promise<PrismaClient | null> {
    return this.prisma.refreshSession.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  async revoke(sessionId: string) {
    return this.prisma.refreshSession.update({
      where: {
        id: sessionId,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeIfActive(sessionId: string): Promise<boolean> {
    const result = await this.prisma.refreshSession.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
    return result.count === 1;
  }

  async revokeFamily(familyId: string): Promise<void> {
    await this.prisma.refreshSession.updateMany({
      where: {
        familyId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.refreshSession.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async rotate(
    sessionId: string,
    newSession: CreateRefreshSessionDto,
  ): Promise<void> {
    await this.prisma.$trnsaction(async (tx) => {
      const result = await tx.refreshSession.updateMany({
        where: {
          id: sessionId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      if (result.count !== 1) {
        throw new RefreshSessionAlreadyRevokedError();
      }

      await tx.refreshSession.create({ data: newSession });
    });
  }
}
