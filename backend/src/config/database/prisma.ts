import { PrismaClient } from "@prisma/client";
import env from "../env/index.js";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: [],
  });

if (env.NODE_ENV != "production") {
  global.prisma = prisma;
}
