export class ProductPriceService {
    priceRepository;
    constructor(priceRepository) {
        this.priceRepository = priceRepository;
    }
    async create(data, tx) {
        const inventory = await this.priceRepository.create(data, tx);
        return inventory;
    }
}
//# sourceMappingURL=price.service.js.map