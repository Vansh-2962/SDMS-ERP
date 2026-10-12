const paymentInclude = {
    invoice: {
        include: {
            customer: {
                select: {
                    shopName: true,
                },
            },
        },
    },
};
export class PaymentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.payment.create({
            data,
            include: paymentInclude,
        });
    }
    async getAll() {
        return this.prisma.payment.findMany({
            where: { deletedAt: null },
            include: paymentInclude,
            orderBy: { createdAt: "desc" },
        });
    }
    async getById(id) {
        return this.prisma.payment.findFirst({
            where: { id, deletedAt: null },
            include: paymentInclude,
        });
    }
    async invoiceExists(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            select: { id: true },
        });
        return invoice !== null;
    }
    async update(id, data) {
        return this.prisma.payment.update({
            where: { id },
            data,
            include: paymentInclude,
        });
    }
    async softDelete(id) {
        return this.prisma.payment.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
//# sourceMappingURL=payment.repository.js.map