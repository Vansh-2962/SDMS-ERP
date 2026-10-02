import type {
  Invoice,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";

export type InvoiceWithRelations = Prisma.InvoiceGetPayload<{
  include: {
    customer: {
      select: {
        shopName: true;
        gstNumber: true;
      };
    };
    items: {
      include: {
        product: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;
