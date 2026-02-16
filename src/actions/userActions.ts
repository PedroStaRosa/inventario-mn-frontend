"use server";

import { setToken } from "@/lib/auth";
import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import { loginSchema } from "@/schemas/authSchemas";
import { loginUserService } from "@/services/userService";

export async function loginAction(
  prevState: { success: boolean; error: string; redirectTo?: string } | null,
  formData: FormData
) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validated = loginSchema.safeParse({
      email: data.email,
      password: data.password,
    });

    if (!validated.success) {
      const errors = validated.error.issues.map((issue) => issue.message);

      return {
        success: false,
        error: errors.join(", ") || "Erro de validação",
      };
    }

    const response = await loginUserService(validated.data);

    if (!response.token) {
      return { success: false, error: "Token não encontrado" };
    }

    await setToken(response.token);

    return { success: true, error: "", redirectTo: "/dashboard" };
  } catch (error) {
    // Loga o erro técnico completo apenas em desenvolvimento
    if (error instanceof Error) {
      console.log(error.message);
      return {
        success: false,
        error: getUserFriendlyErrorMessage(error),
      };
    }

    return { success: false, error: "Erro ao fazer o login" };
  }
}
