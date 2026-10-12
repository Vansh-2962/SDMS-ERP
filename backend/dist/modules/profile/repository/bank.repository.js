export class BankRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.bankDetails.create({
            data: {
                ...data,
                upiId: data.upiId ?? "",
            },
        });
    }
    async update(data, id) {
        return await this.prisma.bankDetails.update({
            where: {
                id,
            },
            data: {
                ...data,
                upiId: data.upiId ?? "",
            },
        });
    }
    async getDetails() {
        return await this.prisma.bankDetails.findFirst();
    }
}
//# sourceMappingURL=bank.repository.js.map