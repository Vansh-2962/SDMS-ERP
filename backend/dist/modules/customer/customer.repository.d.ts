import type { Customer, Prisma, PrismaClient } from "@/generated/prisma/client.js";
import type { CustomerWithSalesman } from "./customer.types.js";
export declare class CustomerRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.CustomerCreateInput): Promise<Customer>;
    getAllCustomers(): Promise<CustomerWithSalesman[] | null>;
    getCustomerById(id: string, tx?: Prisma.TransactionClient): Promise<Customer | null>;
    getCustomerByGST(gst: string): Promise<Customer | null>;
    getCustomerByPAN(pan: string): Promise<Customer | null>;
    deactivateCustomer(id: string): Promise<Customer | null>;
    update(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer>;
}
//# sourceMappingURL=customer.repository.d.ts.map