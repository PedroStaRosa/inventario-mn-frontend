import { z } from "zod";

const unitSchema = ["UN", "KG", "LT", "SC", "PT"] as const;

export const productSchema = z.object({
  code: z.string("Codigo é obrigatório").min(1, "Codigo é obrigatório"),
  description: z
    .string("Descrição é obrigatória")
    .min(1, "Descrição é obrigatória"),
  unit: z.enum(unitSchema, {
    error: (issue) =>
      issue.input === undefined ? "Unidade é obrigatória" : "Unidade inválida",
  }),
});

export type ProductInput = z.infer<typeof productSchema>;

export const csvSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Arquivo inválido, envie um arquivo CSV válido.",
    })
    .refine((file) => file.type === "text/csv" || file.name.endsWith(".csv"), {
      message: "Por favor, envie um arquivo CSV válido.",
    })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      // 5MB Limit
      message: "O arquivo deve ter menos de 5MB.",
    }),
});

export type CsvFormData = z.infer<typeof csvSchema>;
