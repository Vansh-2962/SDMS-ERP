export class ProfileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.profile.create({
            data: {
                companyName: data.companyName,
                GSTIN: data.gstin,
                address: data.address ?? "",
                email: data.email ?? "",
                fssai: data.fssai ?? "",
                mobile: data.mobile ?? "",
                website: data.website ?? "",
                pan: data.pan ?? "",
            },
        });
    }
    async update(data, id) {
        return await this.prisma.profile.update({
            where: {
                id,
            },
            data: {
                companyName: data.companyName,
                GSTIN: data.gstin,
                address: data.address ?? "",
                email: data.email ?? "",
                fssai: data.fssai ?? "",
                mobile: data.mobile ?? "",
                website: data.website ?? "",
                pan: data.pan ?? "",
            },
        });
    }
    async getDetails() {
        return await this.prisma.profile.findFirst();
    }
}
//# sourceMappingURL=profile.repository.js.map