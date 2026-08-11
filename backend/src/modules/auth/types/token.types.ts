export type TokenType = "access" | "refresh";

export interface TokenPayload {
  sub: string;
  type: TokenType;
}
