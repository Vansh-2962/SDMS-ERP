import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/auth.types";
import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/types";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data,
  );
  return response.data.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    data,
  );
  return response.data.data;
}

export async function refreshToken(
  refreshToken: string,
): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/refresh",
    refreshToken,
  );
  return response.data.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get<ApiResponse<AuthResponse>>("/auth/me");
  return response.data.data;
}
