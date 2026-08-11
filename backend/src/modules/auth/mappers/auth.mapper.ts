import type { User } from "@/generated/prisma/client";
import type { UserResponseDto } from "@/modules/auth/dto/user-response.dto.js";

export class AuthMapper {
  static toUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };
  }
}
