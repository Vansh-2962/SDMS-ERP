import env from "@/config/env/index.js";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { TokenPayload, TokenType } from "../types/token.types.js";

const accessSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);

const refreshSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);

export class TokenService {
  async generateAccessToken(userId: string): Promise<string> {
    return new SignJWT({
      type: "access",
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setSubject(userId)
      .setIssuedAt()
      .setExpirationTime(env.JWT_ACCESS_EXPIRES_IN)
      .sign(accessSecret);
  }

  async generateRefreshToken(userId: string): Promise<string> {
    return new SignJWT({
      type: "refresh",
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setSubject(userId)
      .setIssuedAt()
      .setExpirationTime(env.JWT_REFRESH_EXPIRES_IN)
      .sign(refreshSecret);
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, accessSecret);
    return this.parsePayload(payload, "access");
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, refreshSecret);
    return this.parsePayload(payload, "refresh");
  }

  private parsePayload(
    payload: JWTPayload,
    expectedType: TokenType,
  ): TokenPayload {
    if (typeof payload.sub !== "string" || payload.sub.length === 0) {
      throw new Error("Invalid token subject");
    }

    if (payload.type !== expectedType) {
      throw new Error("Invalid token type");
    }

    return {
      sub: payload.sub,
      type: expectedType,
    };
  }
}
