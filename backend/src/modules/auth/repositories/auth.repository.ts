import type { PrismaClient } from "@/generated/prisma/client";
import type { CreateUserDto } from "@/modules/auth/dto/create-user.dto.js";
import type { IAuthRepository } from "./auth.repository.interface.js";

export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async updateLastLogin(userId: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async findUserById(userId: string): Promise<PrismaClient | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
