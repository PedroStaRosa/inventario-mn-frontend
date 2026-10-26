"server-only";

import { apiClient } from "@/lib/apiClient";
import { getToken } from "@/lib/auth";
import { LoginResponse, UserResponse } from "@/types/auth";

interface LoginUserProps {
  email: string;
  password: string;
}

export async function loginUserService(
  user: LoginUserProps,
): Promise<LoginResponse> {
  try {
    const response = await apiClient<LoginResponse>(`/auth`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao fazer login");
  }
}

export async function getUserService(): Promise<UserResponse | null> {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    const response = await apiClient<UserResponse>(`/auth/me`, {
      method: "GET",
      token,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar usuário");
  }
}
