import type { PrismaClient } from "@/generated/prisma/client";

import type { IRefreshSessonRepository } from "./refresh-session.repository.interface.js";
import type { CreateRefreshSessionDto } from "../dto/create-refresh-session.dto.js";

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
}
