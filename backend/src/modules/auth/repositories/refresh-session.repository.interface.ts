import type { RefreshSession } from "@/generated/prisma/client";

import type { CreateRefreshSessionDto } from "../dto/create-refresh-session.dto.js";

export interface IRefreshSessonRepository {
  create(data: CreateRefreshSessionDto): Promise<RefreshSession>;
  findByTokenHash(tokenHash: string): Promise<RefreshSession | null>;
  revoke(sessionId: string): Promise<RefreshSession>;
  revokeFamily(familyId: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}
