export class EmployeeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.employee.create({
            data,
        });
    }
    async findById(id) {
        return this.prisma.employee.findUnique({
            where: {
                id,
            },
        });
    }
    async fetchAll() {
        return this.prisma.employee.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.employee.findFirst({
            where: {
                email,
            },
        });
    }
    async findByMobile(mobile) {
        return this.prisma.employee.findFirst({
            where: {
                mobile,
            },
        });
    }
    async fetchAllSalesman() {
        return this.prisma.employee.findMany({
            where: {
                role: "SALESMAN",
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, data) {
        return this.prisma.employee.update({
            where: { id },
            data,
        });
    }
    async deactivate(id) {
        return this.prisma.employee.update({
            where: { id },
            data: { isActive: false },
        });
    }
}
//# sourceMappingURL=employee.repository.js.map