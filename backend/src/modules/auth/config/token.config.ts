import env from "@/config/env/index.js";

export const tokenConfig = {
  accessTokenExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
  refreshTokenExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
} as const;
