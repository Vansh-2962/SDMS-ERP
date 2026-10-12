import type { Prisma } from "@/generated/prisma/client.js";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    prices: true;
    batches: true;
    inventories: true;
  };
}>;

export type ProductDetailsWithRelations = Prisma.ProductGetPayload<{
  include: {
    prices: true;
    batches: true;
    inventories: true;
    certifications: true;
    productManufacturer: {
      include: {
        manufacturer: true;
      };
    };
  };
}>;
