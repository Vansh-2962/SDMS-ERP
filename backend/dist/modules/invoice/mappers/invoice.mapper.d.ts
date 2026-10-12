import type { Invoice, Prisma } from "@/generated/prisma/client.js";
import type { CreateInvoiceDTO } from "../invoice.dto.js";
import type { InvoiceWithRelations } from "../invoice.types.js";
export declare class InvoiceMapper {
    static toRequestPayload(data: CreateInvoiceDTO, sequenceId: string, docNo: string): Prisma.InvoiceCreateInput;
    static toResponse(data: Invoice): {
        id: string;
        label: import("@/generated/prisma/client.js").InvoiceLabel;
        docNo: string;
    };
    static toList(data: InvoiceWithRelations[]): {
        id: string;
        docNo: string;
        date: Date;
        dueDate: Date;
        customerId: string;
        taxable: import("@prisma/client/runtime/client").Decimal;
        customer: {
            shopName: string;
            gstNumber: string | null;
        };
        gst: {
            igst: import("@prisma/client/runtime/client").Decimal;
            cgst: import("@prisma/client/runtime/client").Decimal;
            sgst: import("@prisma/client/runtime/client").Decimal;
        };
        placeOfSupply: string | null;
        grandTotal: import("@prisma/client/runtime/client").Decimal;
        status: import("@/generated/prisma/client.js").InvoiceStatus;
        label: import("@/generated/prisma/client.js").InvoiceLabel;
    }[];
}
//# sourceMappingURL=invoice.mapper.d.ts.map