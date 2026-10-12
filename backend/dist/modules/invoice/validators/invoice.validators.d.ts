import { z } from "zod";
export declare const invoiceItemSchema: z.ZodObject<{
    productId: z.ZodString;
    hsn: z.ZodOptional<z.ZodString>;
    qty: z.ZodNumber;
    rate: z.ZodNumber;
    discPer: z.ZodOptional<z.ZodNumber>;
    gstPer: z.ZodNumber;
    amount: z.ZodNumber;
}, z.core.$strip>;
export declare const createInvoiceSchema: z.ZodObject<{
    body: z.ZodObject<{
        label: z.ZodEnum<{
            readonly TAX_INVOICE: 'TAX_INVOICE';
            readonly DELIVERY_CHALLAN: 'DELIVERY_CHALLAN';
            readonly PROFORMA_INVOICE: 'PROFORMA_INVOICE';
            readonly CREDIT_NOTE: 'CREDIT_NOTE';
            readonly DEBIT_NOTE: 'DEBIT_NOTE';
        }>;
        customerId: z.ZodString;
        docDate: z.ZodCoercedDate<unknown>;
        dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        paymentTerms: z.ZodOptional<z.ZodString>;
        supplyType: z.ZodEnum<{
            readonly TAXABLE: 'TAXABLE';
            readonly EXEMPT: 'EXEMPT';
            readonly EXPORT: 'EXPORT';
            readonly SEZ: 'SEZ';
            readonly NON_GST: 'NON_GST';
        }>;
        placeOfSupply: z.ZodOptional<z.ZodString>;
        reverseCharge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        transportMode: z.ZodOptional<z.ZodEnum<{
            readonly ROAD: 'ROAD';
            readonly RAIL: 'RAIL';
            readonly AIR: 'AIR';
            readonly SHIP: 'SHIP';
            readonly COURIER: 'COURIER';
        }>>;
        vehicleNo: z.ZodOptional<z.ZodString>;
        ewayNo: z.ZodOptional<z.ZodString>;
        deliveryDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        notes: z.ZodOptional<z.ZodString>;
        terms: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            hsn: z.ZodOptional<z.ZodString>;
            qty: z.ZodNumber;
            rate: z.ZodNumber;
            discPer: z.ZodOptional<z.ZodNumber>;
            gstPer: z.ZodNumber;
            amount: z.ZodNumber;
        }, z.core.$strip>>;
        subTotal: z.ZodNumber;
        discount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        roundOff: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        taxable: z.ZodNumber;
        igst: z.ZodNumber;
        sgst: z.ZodNumber;
        cgst: z.ZodNumber;
        grandTotal: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getInvoiceByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type GetInvoiceByIdInput = z.infer<typeof getInvoiceByIdSchema>;
//# sourceMappingURL=invoice.validators.d.ts.map