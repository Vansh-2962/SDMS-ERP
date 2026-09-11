import { prisma } from "@/config/database/prisma.js";
import { ProfileRepository } from "@/modules/profile/repository/profile.repository.js";
import { ProfileService } from "@/modules/profile/services/profile.service.js";
import { ProfileController } from "@/modules/profile/controller/profile.controller.js";
import { BankRepository } from "@/modules/profile/repository/bank.repository.js";
import { BankService } from "@/modules/profile/services/bank.service.js";
import { BankController } from "@/modules/profile/controller/bank.controller.js";
import { SettingsRepository } from "@/modules/profile/repository/settings.repository.js";
import { SettingsService } from "@/modules/profile/services/settings.service.js";
import { SettingsController } from "@/modules/profile/controller/settings.controller.js";

export const profileRepository = new ProfileRepository(prisma);
export const profileService = new ProfileService(profileRepository);
export const profileController = new ProfileController(profileService);

export const bankRepository = new BankRepository(prisma);
export const bankService = new BankService(bankRepository);
export const bankController = new BankController(bankService);

export const settingsRepository = new SettingsRepository(prisma);
export const settingsService = new SettingsService(settingsRepository);
export const settingsController = new SettingsController(settingsService);
