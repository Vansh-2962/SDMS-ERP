export class SaleOrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.saleOrder.create({ data });
    }
    async getAll() {
        return await this.prisma.saleOrder.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: {
                        items: true,
                    },
                },
                salesman: {
                    select: {
                        fullName: true,
                    },
                },
                customer: {
                    select: {
                        shopName: true,
                    },
                },
            },
        });
    }
    async getSaleOrderById(id) {
        return this.prisma.saleOrder.findFirst({
            where: {
                id,
                isActive: true,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        customerCode: true,
                        shopName: true,
                        ownerName: true,
                        type: true,
                        gstNumber: true,
                        pan: true,
                        fssai: true,
                        status: true,
                        mobile: true,
                        whatsapp: true,
                        email: true,
                        street: true,
                        state: true,
                        stateCode: true,
                        district: true,
                        pincode: true,
                        latitude: true,
                        longitude: true,
                        salesTerritory: true,
                        assignedSalesmanId: true,
                        assignedSalesman: {
                            select: {
                                empCode: true,
                                fullName: true,
                            },
                        },
                        paymentTerms: true,
                        creditLimit: true,
                        openingBal: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                salesman: {
                    select: {
                        id: true,
                        empCode: true,
                        fullName: true,
                        role: true,
                        mobile: true,
                        email: true,
                    },
                },
                items: {
                    orderBy: { createdAt: "asc" },
                    include: {
                        product: {
                            select: {
                                id: true,
                                code: true,
                                name: true,
                                hsn: true,
                                unit: true,
                                netWeight: true,
                                category: true,
                                brand: true,
                                barcode: true,
                                type: true,
                                form: true,
                                shelfLife: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getSaleOrderByCode(code) {
        return await this.prisma.saleOrder.findFirst({
            where: {
                saleOrderCode: code,
                isActive: true,
            },
        });
    }
    async delete(id) {
        return await this.prisma.saleOrder.update({
            where: {
                id,
            },
            data: {
                isActive: false,
            },
        });
    }
    async findCustomer(id) {
        return await this.prisma.customer.findFirst({
            where: {
                id,
            },
        });
    }
    async findSalesman(id) {
        return await this.prisma.employee.findFirst({
            where: {
                id,
            },
        });
    }
    async update(id, data) {
        return await this.prisma.saleOrder.update({
            where: {
                id,
            },
            data: { data },
        });
    }
    async findDuplicate({ customerId, date, total, }) {
        return await this.prisma.saleOrder.findFirst({
            where: {
                customerId,
                date,
                total,
                isActive: true,
            },
        });
    }
    async updateStatus(id, status) {
        return await this.prisma.saleOrder.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }
}
//# sourceMappingURL=saleOrder.repository.js.map