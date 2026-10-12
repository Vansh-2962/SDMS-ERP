import type { SaleOrder } from "@/generated/prisma/client.js";
import type { SaleOrderWithDetails } from "../repository/saleOrder.repository.js";
export declare class SaleOrderMapper {
    static toDetails(data: SaleOrderWithDetails): {
        id: string;
        saleOrderCode: number;
        customerId: string;
        customerName: string;
        date: Date;
        subtotal: number;
        gstAmount: number;
        total: number;
        status: import("@/generated/prisma/client.js").SaleOrderStatus;
        salesmanId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        customer: {
            creditLimit: number;
            openingBal: number;
            assignedSalesman: {
                empCode: number;
                fullName: string;
            } | null;
            assignedSalesmanId: string | null;
            createdAt: Date;
            customerCode: number;
            district: string | null;
            email: string | null;
            fssai: string | null;
            gstNumber: string | null;
            id: string;
            latitude: string | null;
            longitude: string | null;
            mobile: string;
            ownerName: string;
            pan: string | null;
            paymentTerms: number;
            pincode: string | null;
            salesTerritory: string | null;
            shopName: string;
            state: string | null;
            stateCode: string | null;
            status: import("@/generated/prisma/client.js").CustomerStatus;
            street: string | null;
            type: import("@/generated/prisma/client.js").CustomerType;
            updatedAt: Date;
            whatsapp: string | null;
        };
        salesman: {
            email: string | null;
            empCode: number;
            fullName: string;
            id: string;
            mobile: string;
            role: string;
        };
        items: {
            id: string;
            productId: string;
            productName: string;
            qty: number;
            price: number;
            gst: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            product: {
                barcode: string | null;
                brand: string | null;
                category: string;
                code: string;
                form: import("@/generated/prisma/client.js").ProductForm | null;
                hsn: string | null;
                id: string;
                name: string;
                netWeight: string | null;
                shelfLife: number | null;
                type: import("@/generated/prisma/client.js").ProductType;
                unit: string;
            };
        }[];
    };
    static toResponse(data: SaleOrder): Promise<{
        id: string;
        createdAt: Date;
    }>;
    static toAll(data: any[]): Promise<{
        id: any;
        saleOrderCode: any;
        customer: any;
        date: any;
        items: any;
        salesman: any;
        subtotal: any;
        gst: any;
        total: any;
        status: any;
    }[]>;
}
//# sourceMappingURL=saleOrder.mapper.d.ts.map