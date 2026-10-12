import type { Prisma, Employee, PrismaClient } from "@/generated/prisma/client.js";
export declare class EmployeeRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.EmployeeCreateInput): Promise<Employee>;
    findById(id: string): Promise<Employee | null>;
    fetchAll(): Promise<Employee[]>;
    findByEmail(email: string): Promise<Employee | null>;
    findByMobile(mobile: string): Promise<Employee | null>;
    fetchAllSalesman(): Promise<Employee[]>;
    update(id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee>;
    deactivate(id: string): Promise<Employee>;
}
//# sourceMappingURL=employee.repository.d.ts.map