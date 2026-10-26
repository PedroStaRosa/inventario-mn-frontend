import z from "zod";
import { unitSchema } from "@/schemas/productSchema";

export const suggestInventorySchema = z.object({
  days: z.coerce
    .number({ error: "Dias é obrigatório" })
    .positive("Dias deve ser maior que 0")
    .int("Dias deve ser um número inteiro"),
  limit: z.coerce
    .number({ error: "Limite é obrigatório" })
    .positive("Limite deve ser maior que 0")
    .int("Limite deve ser um número inteiro"),
});

export type SuggestInventoryInput = z.infer<typeof suggestInventorySchema>;
export type SuggestInventoryFormInput = z.input<typeof suggestInventorySchema>;

export const inventoryCsvItemSchema = z.object({
  productId: z.coerce
    .number({ error: "Código é obrigatório" })
    .positive("Código deve ser maior que 0")
    .int("Código deve ser um número inteiro"),
  unitInput: z.enum(unitSchema, {
    error: (issue) =>
      issue.input === undefined ? "Unidade é obrigatória" : "Unidade inválida",
  }),
  stockExpected: z.coerce.number({ error: "Estoque inválido" }),
  stockCounted: z.coerce.number({ error: "Digitado inválido" }),
  description: z
    .string("Descrição é obrigatória")
    .min(1, "Descrição é obrigatória"),
});

export type InventoryCsvItemInput = z.infer<typeof inventoryCsvItemSchema>;
