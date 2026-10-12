import { NotFoundError } from "@/shared/errors/not-found.error.js";
export class ExpenseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return this.repository.create({
            ...data,
            status: "PENDING",
        });
    }
    async getAll() {
        return this.repository.getAll();
    }
    async getById(id) {
        const expense = await this.repository.getById(id);
        if (!expense) {
            throw new NotFoundError("Expense not found");
        }
        return expense;
    }
    async update(id, data, approverName) {
        await this.getById(id);
        const updateData = {
            ...(data.category !== undefined && { category: data.category }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.amount !== undefined && { amount: data.amount }),
            ...(data.date !== undefined && { date: data.date }),
            ...(data.status !== undefined && { status: data.status }),
            ...(data.status === "APPROVED" && { approvedBy: approverName }),
            ...(data.status === "PENDING" && { approvedBy: null }),
            ...(data.status === "REJECTED" && { approvedBy: null }),
        };
        return this.repository.update(id, updateData);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.softDelete(id);
    }
}
//# sourceMappingURL=expense.service.js.map