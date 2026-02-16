import { apiClient } from "@/lib/api/client";
import { LoginResponse } from "@/types/api";

interface LoginUserProps {
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
