import { apiClient } from "@/lib/api/client";
import { LoginResponse, RegisterUserResponse } from "@/types/api";

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
  const response = await apiClient<LoginResponse>(`/auth`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  console.log(response);
  return response;
}

export async function registerUserService(
  user: RegisterUserProps
): Promise<RegisterUserResponse> {
  const response = await apiClient<RegisterUserResponse>(`/user`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  console.log(response);
  return response;
}
