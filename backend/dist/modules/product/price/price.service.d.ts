import type { Prisma } from "@/generated/prisma/client.js";
import type { PriceRepository } from "./price.repository.js";
export declare class ProductPriceService {
    private readonly priceRepository;
    constructor(priceRepository: PriceRepository);
    create(data: Prisma.ProductPriceCreateInput, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        mrp: import("@prisma/client/runtime/client").Decimal | null;
        distributorPrice: import("@prisma/client/runtime/client").Decimal | null;
        retailerPrice: import("@prisma/client/runtime/client").Decimal | null;
        dealerPrice: import("@prisma/client/runtime/client").Decimal | null;
        purchaseCost: import("@prisma/client/runtime/client").Decimal | null;
        manufacturingCost: import("@prisma/client/runtime/client").Decimal | null;
        gst: import("@prisma/client/runtime/client").Decimal | null;
        discountScheme: string | null;
        effectiveFrom: Date;
        effectiveTo: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=price.service.d.ts.map