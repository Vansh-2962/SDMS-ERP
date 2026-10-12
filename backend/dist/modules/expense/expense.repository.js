export class ExpenseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.expense.create({ data });
    }
    async getAll() {
        return this.prisma.expense.findMany({
            where: { deletedAt: null },
            orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        });
    }
    async getById(id) {
        return this.prisma.expense.findFirst({
            where: { id, deletedAt: null },
        });
    }
    async update(id, data) {
        return this.prisma.expense.update({
            where: { id },
            data,
        });
    }
    async softDelete(id) {
        return this.prisma.expense.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
//# sourceMappingURL=expense.repository.js.map