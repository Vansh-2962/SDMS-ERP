import type { Customer, Prisma } from "@/generated/prisma/client.js";
import type { CustomerRepository } from "./customer.repository.js";
import type { CreateCustomerDto } from "./dto/customer.dto.js";
import type { UpdateCustomerInput } from "./validators/customer.validator.js";
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    create(data: CreateCustomerDto["body"]): Promise<Customer>;
    update(id: string, data: UpdateCustomerInput["body"]): Promise<Customer>;
    getAll(): Promise<Customer[] | null>;
    delete(id: string): Promise<Customer | null>;
    getById(id: string, tx?: Prisma.TransactionClient): Promise<Customer | null>;
}
//# sourceMappingURL=customer.service.d.ts.map