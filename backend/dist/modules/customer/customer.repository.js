export class CustomerRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.customer.create({ data });
    }
    async getAllCustomers() {
        return await this.prisma.customer.findMany({
            where: {
                status: "ACTIVE",
            },
            include: {
                assignedSalesman: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });
    }
    async getCustomerById(id, tx) {
        const client = tx ? tx : this.prisma;
        return await client.customer.findFirst({
            where: {
                id,
            },
        });
    }
    async getCustomerByGST(gst) {
        return await this.prisma.customer.findFirst({
            where: {
                gstNumber: gst,
            },
        });
    }
    async getCustomerByPAN(pan) {
        return await this.prisma.customer.findFirst({
            where: {
                pan,
            },
        });
    }
    async deactivateCustomer(id) {
        return await this.prisma.customer.update({
            where: {
                id,
            },
            data: {
                status: "INACTIVE",
            },
        });
    }
    async update(id, data) {
        return await this.prisma.customer.update({
            where: {
                id,
            },
            data: data,
        });
    }
}
//# sourceMappingURL=customer.repository.js.map