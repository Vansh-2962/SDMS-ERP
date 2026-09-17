import type { Prisma } from "@/generated/prisma/client.js";

export type CustomerWithSalesman = Prisma.CustomerGetPayload<{
  include: {
    assignedSalesman: {
      select: {
        id: true;
        fullName: true;
      };
    };
  };
}>;
