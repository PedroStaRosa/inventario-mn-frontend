import { apiClient } from "@/lib/api/client";
import { LoginResponse, RegisterUserResponse, User } from "@/types/api";

interface LoginUserProps {
  email: string;
  password: string;
}

interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export async function loginUserService(
  user: LoginUserProps
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

export async function registerUserService(
  user: RegisterUserProps
): Promise<RegisterUserResponse> {
  try {
    const response = await apiClient<RegisterUserResponse>(`/user`, {
      method: "POST",
      body: JSON.stringify(user),
    });

    return response;
  } catch (
  error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao registrar usuário");
  }

}

export async function getUserService(token: string): Promise<User> {
  try {
    const response = await apiClient<User>(`/auth/me`, {
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
