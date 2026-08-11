import { randomUUID } from "node:crypto";

export function generateSessionFamilyId(): string {
  return randomUUID();
}
