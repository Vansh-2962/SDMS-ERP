export class InvoiceRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.invoice.create({ data });
        return result;
    }
    async updateSequence(key, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.numberSequence.update({
            where: {
                key,
            },
            data: {
                current: {
                    increment: 1,
                },
            },
        });
        return result;
    }
    async getInvoiceById(id, tx) {
        const client = tx ? tx : this.prisma;
        return await client.invoice.findFirst({
            where: { id },
            include: {
                customer: {
                    select: {
                        shopName: true,
                        gstNumber: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getInvoiceByLabel(label, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.invoice.findFirst({
            where: {
                label,
            },
            include: {
                customer: {
                    select: {
                        shopName: true,
                        gstNumber: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return result;
    }
    async getInvoiceByDocNo(docNo, tx) {
        const client = tx ? tx : this.prisma;
        return await client.invoice.findFirst({
            where: {
                docNo,
            },
            include: {
                customer: {
                    select: {
                        shopName: true,
                        gstNumber: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getAllInvoices(tx) {
        const client = tx ? tx : this.prisma;
        return await client.invoice.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: {
                    select: {
                        shopName: true,
                        gstNumber: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async cancelInvoice(id, tx) {
        const client = tx ? tx : this.prisma;
        return await client.invoice.update({
            where: {
                id,
            },
            data: {
                status: "CANCELLED",
            },
        });
    }
    async updateInvoiceStatus(id, status, tx) {
        const client = tx ? tx : this.prisma;
        return await client.invoice.update({
            where: {
                id,
            },
            data: {
                status: status,
            },
        });
    }
    async updateInvoice(id, data, tx) {
        const client = tx ? tx : this.prisma;
        return await client.invoice.update({
            where: {
                id,
            },
            data: { data },
        });
    }
}
//# sourceMappingURL=invoice.repository.js.map