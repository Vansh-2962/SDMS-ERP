import { AuthenticationError, ConflictError } from "@/shared/errors/index.js";
import type { RegisterDto } from "@/modules/auth/dto/register.dto.js";
import type { IAuthRepository } from "@/modules/auth/repositories/auth.repository.interface.js";
import { AuthMapper } from "@/modules/auth/mappers/auth.mapper.js";
import {
  comparePassword,
  hashPassword,
} from "@/modules/auth/utils/password.js";
import type { TokenService } from "@/modules/auth/services/token.service.js";
import type { RefreshTokenService } from "@/modules/auth/services/refresh-token.service.js";
import type { LoginDto } from "@/modules/auth/dto/login.dto.js";
import type { AuthResponseDto } from "@/modules/auth/dto/auth.response.dto.js";

export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new ConflictError(
        "Email already registered",
        "EMAIL_ALREADY_EXISTS",
      );
    }

    const passwordHash = await hashPassword(data.password);

    const user = await this.authRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return AuthMapper.toUserResponse(user);
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new AuthenticationError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );
    }

    if (!user.isActive) {
      throw new AuthenticationError("Account is inactive", "ACCOUNT_INACTIVE");
    }

    const passwordValid = await comparePassword(
      data.password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new AuthenticationError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );
    }

    const accessToken = await this.tokenService.generateAccessToken(user.id);

    const { refreshToken } = await this.refreshTokenService.createSession(
      user.id,
    );

    await this.authRepository.updateLastLogin(user.id);

    return {
      user: AuthMapper.toUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    return this.refreshTokenService.rotate(refreshToken);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenService.revoke(refreshToken);
  }

  async getCurrentUser(userId: string) {
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new AuthenticationError(
        "User account no longer exists",
        "USER_NOT_FOUND",
      );
    }

    if (!user.isActive) {
      throw new AuthenticationError(
        "User account is inactive",
        "ACCOUNT_INACTIVE",
      );
    }

    return AuthMapper.toUserResponse(user);
  }
}
