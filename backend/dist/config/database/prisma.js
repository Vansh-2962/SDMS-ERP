import { PrismaClient } from "@/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import env from "../env/index.js";
const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
});
export const prisma = global.prisma ??
    new PrismaClient({
        adapter,
    });
if (env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
//# sourceMappingURL=prisma.js.map