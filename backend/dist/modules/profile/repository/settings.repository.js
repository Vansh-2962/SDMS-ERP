export class SettingsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.billingSettings.create({
            data: {
                ...data,
                paymentTerms: data.paymentTerms ?? 0,
            },
        });
    }
    async update(data, id) {
        return await this.prisma.billingSettings.update({
            where: {
                id,
            },
            data: {
                ...data,
                paymentTerms: data.paymentTerms ?? 0,
            },
        });
    }
    async getDetails() {
        return await this.prisma.billingSettings.findFirst();
    }
}
//# sourceMappingURL=settings.repository.js.map