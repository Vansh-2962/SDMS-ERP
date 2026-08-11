import type { UserResponseDto } from "./user-response.dto.js";

export interface AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}
