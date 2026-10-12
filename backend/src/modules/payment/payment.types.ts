import type { Prisma } from "@/generated/prisma/client.js";

export type PaymentWithInvoice = Prisma.PaymentGetPayload<{
  include: {
    invoice: {
      include: {
        customer: {
          select: {
            shopName: true;
          };
        };
      };
    };
  };
}>;
