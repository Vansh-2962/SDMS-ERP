import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { Router } from "express";
import {
  bankController,
  profileController,
  settingsController,
} from "./index.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";

const profileRouter: Router = Router();

profileRouter.post(
  "/",
  authenticate,
  asyncHandler(profileController.createOrUpdate),
);

profileRouter.post(
  "/",
  authenticate,
  asyncHandler(bankController.createOrUpdate),
);

profileRouter.post(
  "/",
  authenticate,
  asyncHandler(settingsController.createOrUpdate),
);

// ---------

profileRouter.get(
  "/",
  authenticate,
  asyncHandler(settingsController.getSettingsDetails),
);

profileRouter.get(
  "/",
  authenticate,
  asyncHandler(bankController.getBankDetails),
);

profileRouter.get(
  "/",
  authenticate,
  asyncHandler(profileController.getProfileDetails),
);

export { profileRouter };
