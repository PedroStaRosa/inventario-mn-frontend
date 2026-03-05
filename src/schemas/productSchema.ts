import { z } from "zod";

const unitSchema = ["UN", "KG", "LT", "SC", "PT"] as const;

export const productSchema = z.object({
  code: z.string("Codigo é obrigatório").min(1, "Codigo é obrigatório"),
  description: z
    .string("Descrição é obrigatória")
    .min(1, "Descrição é obrigatória"),
  unit: z.enum(unitSchema, {
    error: (issue) =>
      issue.input === undefined
        ? "Unidade é obrigatória"
        : "Unidade inválida",
  }),
});

export type ProductInput = z.infer<typeof productSchema>;
