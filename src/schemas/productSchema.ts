import { z } from "zod";

export const productSchema = z.object({
  code: z.string("Codigo é obrigatório").min(1, "Codigo é obrigatório"),
  description: z
    .string("Descrição é obrigatória")
    .min(1, "Descrição é obrigatória"),
});

export type ProductInput = z.infer<typeof productSchema>;
