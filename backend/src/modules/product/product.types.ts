import type { Prisma } from "@/generated/prisma/client.js";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    prices: true;
    batches: true;
    inventories: true;
  };
}>;
