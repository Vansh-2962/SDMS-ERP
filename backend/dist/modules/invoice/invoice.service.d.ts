import { type Invoice, type PrismaClient } from "@/generated/prisma/client.js";
import type { CreateInvoiceDTO } from "./invoice.dto.js";
import type { InvoiceRepository } from "./invoice.repository.js";
import type { InventoryService } from "../product/inventory/inventory.service.js";
import type { CustomerService } from "../customer/customer.service.js";
import { ProductService } from "../product/product.service.js";
export declare class InvoiceService {
    private readonly invoiceRepository;
    private readonly prisma;
    private readonly inventoryService;
    private readonly customerService;
    private readonly productService;
    constructor(invoiceRepository: InvoiceRepository, prisma: PrismaClient, inventoryService: InventoryService, customerService: CustomerService, productService: ProductService);
    private generateInvoiceNo;
    private getShortPrefix;
    create(data: CreateInvoiceDTO): Promise<Invoice | null>;
    getAllInvoices(): Promise<Invoice[]>;
    getInvoiceById(id: string): Promise<Invoice | null>;
}
//# sourceMappingURL=invoice.service.d.ts.map