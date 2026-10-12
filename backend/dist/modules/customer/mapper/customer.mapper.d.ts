import type { Customer, Prisma } from "@/generated/prisma/client.js";
import type { CreateCustomerDto } from "../dto/customer.dto.js";
import type { CustomerWithSalesman } from "../customer.types.js";
import type { UpdateCustomerInput } from "../validators/customer.validator.js";
export declare class CustomerMapper {
    static toPersistence(data: CreateCustomerDto["body"]): Prisma.CustomerCreateInput;
    static toUpdatePersistence(data: UpdateCustomerInput["body"]): Prisma.CustomerUpdateInput;
    static toResponse(data: Customer): {
        id: string;
        createdAt: Date;
    };
    static toList(data: CustomerWithSalesman[]): {
        id: string;
        customerCode: number;
        shopName: string;
        ownerName: string;
        type: import("@/generated/prisma/client.js").CustomerType;
        salesman: string | undefined;
        mobile: string;
        creditLimit: import("@prisma/client/runtime/client").Decimal;
        district: string | null;
        state: string | null;
        pincode: string | null;
        paymentTerms: number;
        gstNumber: string | null;
        status: import("@/generated/prisma/client.js").CustomerStatus;
        createdAt: Date;
    }[];
}
//# sourceMappingURL=customer.mapper.d.ts.map