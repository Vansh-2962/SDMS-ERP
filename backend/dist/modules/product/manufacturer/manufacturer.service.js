export class ManufacturerService {
    manufacturerRepository;
    constructor(manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }
    async create(data, tx) {
        const inventory = await this.manufacturerRepository.create(data, tx);
        return inventory;
    }
    async attachToProduct(productId, manufacturerId, tx) {
        const prodManufacturer = await this.manufacturerRepository.attachToProduct(productId, manufacturerId, tx);
        return prodManufacturer;
    }
}
//# sourceMappingURL=manufacturer.service.js.map