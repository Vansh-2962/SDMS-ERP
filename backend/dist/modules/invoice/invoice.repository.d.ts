import type { Invoice, InvoiceLabel, InvoiceStatus, NumberSequence, Prisma, PrismaClient } from "@/generated/prisma/client.js";
import type { InvoiceCreateInput, InvoiceUpdateInput } from "@/generated/prisma/models.js";
import type { InvoiceWithRelations } from "./invoice.types.js";
export declare class InvoiceRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: InvoiceCreateInput, tx?: Prisma.TransactionClient): Promise<Invoice>;
    updateSequence(key: InvoiceLabel, tx?: Prisma.TransactionClient): Promise<NumberSequence>;
    getInvoiceById(id: string, tx?: Prisma.TransactionClient): Promise<Invoice | null>;
    getInvoiceByLabel(label: InvoiceLabel, tx?: Prisma.TransactionClient): Promise<Invoice | null>;
    getInvoiceByDocNo(docNo: string, tx?: Prisma.TransactionClient): Promise<Invoice | null>;
    getAllInvoices(tx?: Prisma.TransactionClient): Promise<InvoiceWithRelations[]>;
    cancelInvoice(id: string, tx?: Prisma.TransactionClient): Promise<Invoice | null>;
    updateInvoiceStatus(id: string, status: InvoiceStatus, tx?: Prisma.TransactionClient): Promise<Invoice | null>;
    updateInvoice(id: string, data: InvoiceUpdateInput, tx?: Prisma.TransactionClient): Promise<Invoice | null>;
}
//# sourceMappingURL=invoice.repository.d.ts.map