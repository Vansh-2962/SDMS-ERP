import { z } from "zod";
export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
  params: z.object({}),
  query: z.object({}),
});
