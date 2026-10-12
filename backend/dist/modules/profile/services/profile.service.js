export class ProfileService {
    profileRepository;
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async createOrUpdate(data) {
        const existingData = await this.profileRepository.getDetails();
        let response;
        if (existingData) {
            response = await this.profileRepository.update(data, existingData.id);
        }
        else {
            response = await this.profileRepository.create(data);
        }
        return response;
    }
    async getProfileDetails() {
        return await this.profileRepository.getDetails();
    }
}
//# sourceMappingURL=profile.service.js.map