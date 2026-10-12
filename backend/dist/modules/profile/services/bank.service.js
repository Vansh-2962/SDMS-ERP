export class BankService {
    bankRepository;
    constructor(bankRepository) {
        this.bankRepository = bankRepository;
    }
    async createOrUpdate(data) {
        const existingData = await this.bankRepository.getDetails();
        let response;
        if (existingData) {
            response = await this.bankRepository.update(data, existingData.id);
        }
        else {
            response = await this.bankRepository.create(data);
        }
        return response;
    }
    async getBankDetails() {
        return await this.bankRepository.getDetails();
    }
}
//# sourceMappingURL=bank.service.js.map