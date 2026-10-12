import { z } from "zod";
export declare const customerSchema: z.ZodObject<{
    body: z.ZodObject<{
        shopName: z.ZodString;
        ownerName: z.ZodString;
        type: z.ZodEnum<{
            DISTRIBUTOR: "DISTRIBUTOR";
            MODERN_TRADE: "MODERN_TRADE";
            RETAILER: "RETAILER";
            SUPER_STOCKIST: "SUPER_STOCKIST";
            WHOLESALER: "WHOLESALER";
        }>;
        mobile: z.ZodString;
        gstNumber: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        pan: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        fssai: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        status: z.ZodPreprocess<z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            ACTIVE: "ACTIVE";
            INACTIVE: "INACTIVE";
        }>>>>;
        whatsapp: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        email: z.ZodPreprocess<z.ZodOptional<z.ZodEmail>>;
        street: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        state: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        stateCode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        district: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        pincode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        latitude: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        longitude: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        salesTerritory: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        assignedSalesmanId: z.ZodPreprocess<z.ZodOptional<z.ZodUUID>>;
        creditLimit: z.ZodPreprocess<z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>>;
        paymentTerms: z.ZodPreprocess<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        openingBal: z.ZodPreprocess<z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCustomerSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        shopName: z.ZodString;
        ownerName: z.ZodString;
        type: z.ZodEnum<{
            DISTRIBUTOR: "DISTRIBUTOR";
            MODERN_TRADE: "MODERN_TRADE";
            RETAILER: "RETAILER";
            SUPER_STOCKIST: "SUPER_STOCKIST";
            WHOLESALER: "WHOLESALER";
        }>;
        mobile: z.ZodString;
        gstNumber: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        pan: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        fssai: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        status: z.ZodPreprocess<z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            ACTIVE: "ACTIVE";
            INACTIVE: "INACTIVE";
        }>>>>;
        whatsapp: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        email: z.ZodPreprocess<z.ZodOptional<z.ZodEmail>>;
        street: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        state: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        stateCode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        district: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        pincode: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        latitude: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        longitude: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        salesTerritory: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        assignedSalesmanId: z.ZodPreprocess<z.ZodOptional<z.ZodUUID>>;
        creditLimit: z.ZodPreprocess<z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>>;
        paymentTerms: z.ZodPreprocess<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        openingBal: z.ZodPreprocess<z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteCustomerSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCustomerByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type GetCustomerByIdInput = z.infer<typeof getCustomerByIdSchema>;
export type DeleteCustomerInput = z.infer<typeof deleteCustomerSchema>;
export type CreateCustomerInput = z.infer<typeof customerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
//# sourceMappingURL=customer.validator.d.ts.map