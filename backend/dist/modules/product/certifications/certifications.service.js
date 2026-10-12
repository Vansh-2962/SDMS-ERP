export class CertificationService {
    certificationRepository;
    constructor(certificationRepository) {
        this.certificationRepository = certificationRepository;
    }
    async create(data, tx) {
        const certification = await this.certificationRepository.create(data, tx);
        return certification;
    }
}
//# sourceMappingURL=certifications.service.js.map