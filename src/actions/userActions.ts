"use server";

import { setToken } from "@/lib/auth";
import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import { loginSchema, registerSchema } from "@/schemas/authSchemas";
import { loginUserService, registerUserService } from "@/services/userService";

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

export async function registerUserAction(
  prevState: { success: boolean; error: string; redirectTo?: string } | null,
  formData: FormData
) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validated = registerSchema.safeParse({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (!validated.success) {
      const errors = validated.error.issues.map((issue) => issue.message);

      return {
        success: false,
        error: errors.join(", ") || "Erro de validação",
      };
    }

    await registerUserService(validated.data);

    return { success: true, error: "", redirectTo: "/login" };
  } catch (error) {
    // Loga o erro técnico completo apenas em desenvolvimento
    if (error instanceof Error) {
      console.log(error.message);
      return {
        success: false,
        error: getUserFriendlyErrorMessage(error),
      };
    }

    return { success: false, error: "Erro ao registrar usuário" };
  }
}
