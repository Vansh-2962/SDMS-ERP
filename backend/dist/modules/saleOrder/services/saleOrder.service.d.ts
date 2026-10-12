import type { SaleOrder, SaleOrderStatus } from "@/generated/prisma/client.js";
import type { SaleOrderDTO } from "../dto/saleOrder.dto.js";
import type { SaleOrderRepository, SaleOrderWithDetails } from "../repository/saleOrder.repository.js";
export declare class SaleOrderService {
    private readonly saleOrdeRepository;
    constructor(saleOrdeRepository: SaleOrderRepository);
    create(data: SaleOrderDTO): Promise<SaleOrder>;
    getAll(): Promise<SaleOrder[]>;
    getById(id: string): Promise<SaleOrderWithDetails>;
    delete(id: string): Promise<SaleOrder | null>;
    updateStatus(id: string, status: SaleOrderStatus): Promise<SaleOrder | null>;
}
//# sourceMappingURL=saleOrder.service.d.ts.map