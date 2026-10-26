import { z } from "zod";

<<<<<<< HEAD
export const unitSchema = [
  "UN",
  "CX",
  "FD",
  "PCT",
  "KG",
  "LT",
  "SC",
  "PT",
] as const;

const productCodeSchema = z.preprocess(
  (val) => (typeof val === "string" ? val.trim() : val),
  z
    .union([z.string(), z.number()])
    .superRefine((val, ctx) => {
      if (val === "" || val === undefined || val === null) {
        ctx.addIssue({ code: "custom", message: "Codigo é obrigatório" });
        return;
      }
      const raw = String(val);
      if (!/^\d+$/.test(raw)) {
        ctx.addIssue({
          code: "custom",
          message: `Codigo inválido: "${raw}". Use apenas números inteiros`,
        });
        return;
      }
      const num = Number(raw);
      if (!Number.isInteger(num) || num <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Codigo deve ser um número inteiro maior que 0",
        });
      }
    })
    .transform((val) => Number(String(val))),
);
export const productSchema = z.object({
  code: productCodeSchema,
=======
const unitSchema = ["UN", "KG", "LT", "SC", "PT"] as const;

export const productSchema = z.object({
  code: z.string("Codigo é obrigatório").min(1, "Codigo é obrigatório"),
>>>>>>> origin/main
  description: z
    .string("Descrição é obrigatória")
    .min(1, "Descrição é obrigatória"),
  unit: z.enum(unitSchema, {
    error: (issue) =>
<<<<<<< HEAD
      issue.input === undefined
        ? "Unidade é obrigatória"
        : "Unidade inválida (UN, CX, FD, PCT, KG, LT, SC, PT)",
=======
      issue.input === undefined ? "Unidade é obrigatória" : "Unidade inválida",
>>>>>>> origin/main
  }),
});

export type ProductInput = z.infer<typeof productSchema>;
<<<<<<< HEAD
export type ProductFormInput = z.input<typeof productSchema>;
=======
>>>>>>> origin/main

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

/** CSV upload + inventário name (dashboard import page) */
export const inventoryImportSchema = csvSchema.extend({
  inventoryName: z.string().min(1, "Nome do inventário é obrigatório"),
});
export type InventoryImportFormData = z.infer<typeof inventoryImportSchema>;

export const inventoryCsvSchema = z.object({
  inventoryName: z
    .string("Nome do inventário é obrigatório")
    .min(1, "Nome do inventário é obrigatório"),
  inventoryItems: z.array(productSchema),
});

export type InventoryCsvFormData = z.infer<typeof inventoryCsvSchema>;
<<<<<<< HEAD

export const suggestionSchema = z.object({
  days: z
    .number({ error: "Dias é obrigatório" })
    .positive("Dias deve ser maior que 0")
    .int("Dias deve ser um número inteiro"),

  limit: z
    .number({ error: "Limite de itens é obrigatória" })
    .positive("Limite de itens deve ser maior que 0")
    .int("Limite de itens deve ser um número inteiro"),
});

export type SuggestionFormData = z.infer<typeof suggestionSchema>;
=======
>>>>>>> origin/main
