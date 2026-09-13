import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { Router } from "express";
import {
  bankController,
  profileController,
  settingsController,
} from "./index.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { profileSchema } from "./validators/profile.validator.js";
import { bankSchema } from "./validators/bank.validator.js";
import { settingsSchema } from "./validators/settings.validator.js";

const profileRouter: Router = Router();

profileRouter.post(
  "/",
  authenticate,
  validate(profileSchema),
  asyncHandler(profileController.createOrUpdate),
);

profileRouter.post(
  "/bank",
  authenticate,
  validate(bankSchema),
  asyncHandler(bankController.createOrUpdate),
);

profileRouter.post(
  "/settings",
  authenticate,
  validate(settingsSchema),
  asyncHandler(settingsController.createOrUpdate),
);

// ---------

profileRouter.get(
  "/",
  authenticate,
  asyncHandler(profileController.getProfileDetails),
);

profileRouter.get(
  "/bank",
  authenticate,
  asyncHandler(bankController.getBankDetails),
);

profileRouter.get(
  "/settings",
  authenticate,
  asyncHandler(settingsController.getSettingsDetails),
);

export { profileRouter };
