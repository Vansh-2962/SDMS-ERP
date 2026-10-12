import { z } from "zod";
export declare const createEmployeeSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodString;
        mobile: z.ZodString;
        designation: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        department: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        territory: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        email: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodEmail>>>;
        pan: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        aadhaar: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        bankAccountNo: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        ifscCode: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        salary: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>>;
        role: z.ZodEnum<{
            ACCOUNTANT: "ACCOUNTANT";
            DISPATCH: "DISPATCH";
            OWNER: "OWNER";
            PRODUCTION: "PRODUCTION";
            SALESMAN: "SALESMAN";
            SALES_MANAGER: "SALES_MANAGER";
            WAREHOUSE: "WAREHOUSE";
        }>;
        joinDate: z.ZodCoercedDate<unknown>;
        createLogin: z.ZodOptional<z.ZodBoolean>;
        password: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateEmployeeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        mobile: z.ZodOptional<z.ZodString>;
        department: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        territory: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        email: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodEmail>>>;
        pan: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        aadhaar: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        bankAccountNo: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        ifscCode: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        salary: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>>;
        role: z.ZodOptional<z.ZodEnum<{
            ACCOUNTANT: "ACCOUNTANT";
            DISPATCH: "DISPATCH";
            OWNER: "OWNER";
            PRODUCTION: "PRODUCTION";
            SALESMAN: "SALESMAN";
            SALES_MANAGER: "SALES_MANAGER";
            WAREHOUSE: "WAREHOUSE";
        }>>;
        joinDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const employeeIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type EmployeeIdInput = z.infer<typeof employeeIdSchema>;
//# sourceMappingURL=employee.validator.d.ts.map