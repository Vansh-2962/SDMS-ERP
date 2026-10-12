export class CertificationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tx) {
        const client = tx ?? this.prisma;
        const certification = await client.productCertification.create({ data });
        return certification;
    }
}
//# sourceMappingURL=certifications.repository.js.map