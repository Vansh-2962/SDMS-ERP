import type { CreateUserDto } from "../dto/create-user.dto.js";
import type { User } from "@prisma/client";

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: CreateUserDto): Promise<User>;
  updateLastLogin(userId: string): Promise<User>;
  findUserById(userId: string): Promise<User | null>;
}
