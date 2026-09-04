import env from "@/config/env/index.js";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/config/database/prisma.js";
import { admin } from "better-auth/plugins";
import {
  ac,
  owner,
  accountant,
  salesManager,
  salesman,
  warehouse,
  production,
  dispatch,
} from "@/lib/auth/permissions.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  },
  trustedOrigins: [env.CLIENT_URL, "http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      ac,
      roles: {
        OWNER: owner,
        ACCOUNTANT: accountant,
        SALES_MANAGER: salesManager,
        SALESMAN: salesman,
        WAREHOUSE: warehouse,
        PRODUCTION: production,
        DISPATCH: dispatch,
      },
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: [
          "OWNER",
          "ACCOUNTANT",
          "SALES_MANAGER",
          "SALESMAN",
          "WAREHOUSE",
          "PRODUCTION",
          "DISPATCH",
        ],
        required: false,
        input: false,
        defaultValue: "OWNER",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "OWNER",
            },
          };
        },
      },
    },
  },
});
