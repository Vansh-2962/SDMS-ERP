import type { Customer, Employee, Prisma, PrismaClient, SaleOrder, SaleOrderStatus } from "@/generated/prisma/client.js";
export type SaleOrderWithDetails = Prisma.SaleOrderGetPayload<{
    include: {
        customer: {
            select: {
                id: true;
                customerCode: true;
                shopName: true;
                ownerName: true;
                type: true;
                gstNumber: true;
                pan: true;
                fssai: true;
                status: true;
                mobile: true;
                whatsapp: true;
                email: true;
                street: true;
                state: true;
                stateCode: true;
                district: true;
                pincode: true;
                latitude: true;
                longitude: true;
                salesTerritory: true;
                assignedSalesmanId: true;
                assignedSalesman: {
                    select: {
                        empCode: true;
                        fullName: true;
                    };
                };
                paymentTerms: true;
                creditLimit: true;
                openingBal: true;
                createdAt: true;
                updatedAt: true;
            };
        };
        salesman: {
            select: {
                id: true;
                empCode: true;
                fullName: true;
                role: true;
                mobile: true;
                email: true;
            };
        };
        items: {
            include: {
                product: {
                    select: {
                        id: true;
                        code: true;
                        name: true;
                        hsn: true;
                        unit: true;
                        netWeight: true;
                        category: true;
                        brand: true;
                        barcode: true;
                        type: true;
                        form: true;
                        shelfLife: true;
                    };
                };
            };
        };
    };
}>;
export declare class SaleOrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.SaleOrderCreateInput): Promise<SaleOrder>;
    getAll(): Promise<SaleOrder[]>;
    getSaleOrderById(id: string): Promise<SaleOrderWithDetails | null>;
    getSaleOrderByCode(code: number): Promise<SaleOrder | null>;
    delete(id: string): Promise<SaleOrder | null>;
    findCustomer(id: string): Promise<Customer | null>;
    findSalesman(id: string): Promise<Employee | null>;
    update(id: string, data: Prisma.SaleOrderCreateInput): Promise<SaleOrder>;
    findDuplicate({ customerId, date, total, }: {
        customerId: string;
        date: Date;
        total: number;
    }): Promise<SaleOrder | null>;
    updateStatus(id: string, status: SaleOrderStatus): Promise<SaleOrder>;
}
//# sourceMappingURL=saleOrder.repository.d.ts.map