export class BatchService {
    batchRepository;
    constructor(batchRepository) {
        this.batchRepository = batchRepository;
    }
    async create(data, tx) {
        const batch = await this.batchRepository.create(data, tx);
        return batch;
    }
}
//# sourceMappingURL=batch.service.js.map