export interface CreateRefreshSessionDto {
  userId: string;
  familyId: string;
  tokenHash: string;
  expiresAt: Date;
}
