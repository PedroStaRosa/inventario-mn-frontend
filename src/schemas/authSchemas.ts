import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string("Email é obrigatório")
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string("Nome é obrigatório")
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string({ message: "Email é obrigatório" })
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
