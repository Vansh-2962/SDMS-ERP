export class SettingsService {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async createOrUpdate(data) {
        const existingData = await this.settingsRepository.getDetails();
        let response;
        if (existingData) {
            response = await this.settingsRepository.update(data, existingData.id);
        }
        else {
            response = await this.settingsRepository.create(data);
        }
        return response;
    }
    async getSettingsDetails() {
        return await this.settingsRepository.getDetails();
    }
}
//# sourceMappingURL=settings.service.js.map