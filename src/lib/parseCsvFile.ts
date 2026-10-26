<<<<<<< HEAD
import { inventoryCsvItemSchema } from "@/schemas/inventorySchema";
import { CsvFormData, productSchema } from "@/schemas/productSchema";
import { InventoryCvs } from "@/types/inventory";
import { ProductCvs } from "@/types/product";
import Papa from "papaparse";
import type { ZodError } from "zod";

interface CsvProductRow {
  Codigo: string;
  Descricao: string;
  Unidade: string;
}

export const parseCsvProductFile = async (
  data: CsvFormData,
): Promise<ProductCvs[] | undefined> => {
  return new Promise<ProductCvs[] | undefined>((resolve, reject) => {
=======
import Papa from "papaparse";
import { ProductCvs } from "@/types/productCvs";
import { CsvFormData } from "@/schemas/productSchema";
import { InventoryCvs } from "@/types/inventoryCvs";

interface CsvRow {
  codigo: string;
  descricao: string;
  unidade: string;
}

export const parseCsvFile = async (
  data: CsvFormData
): Promise<ProductCvs[] | undefined> => {
  return new Promise<ProductCvs[] | undefined>((resolve, reject) => {
    const products: ProductCvs[] = [];

>>>>>>> origin/main
    Papa.parse(data.file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
<<<<<<< HEAD
        const expectedHeaders = ["Codigo", "Descricao", "Unidade"];
=======
        const expectedHeaders = ["codigo", "descricao", "unidade"];
>>>>>>> origin/main
        const validHeaders =
          headers.length === expectedHeaders.length &&
          expectedHeaders.every((h, i) => headers[i] === h);

        if (!validHeaders) {
          const errorMessage = validateHeaders(headers, expectedHeaders);
          reject(new Error(errorMessage));
          return;
        }

<<<<<<< HEAD
        const rows = results.data as CsvProductRow[];
        const products: ProductCvs[] = [];
        const errors: string[] = [];
        rows.forEach((row, index) => {
          const parsed = productSchema.safeParse({
            code: row.Codigo,
            description: row.Descricao,
            unit: row.Unidade,
          });

          if (!parsed.success) {
            errors.push(formatRowError(index, parsed.error));
            return;
          }

          products.push({
            code: String(parsed.data.code),
            description: parsed.data.description,
            unit: parsed.data.unit,
          });
        });

        if (errors.length > 0) {
          reject(new Error(errors.join("\n")));
          return;
        }

        resolve(products);
      },
      error: (error: unknown) => {
        reject(
          error instanceof Error
            ? error
            : new Error("Erro ao processar o arquivo CSV"),
=======
        const rows = results.data as CsvRow[];
        rows.forEach((row) => {
          products.push({
            code: row.codigo,
            description: row.descricao,
            unit: row.unidade || "UN",
          });
        });

        resolve(products);
      },
      error: (error: unknown) => {
        /* console.error("Erro no PapaParse:", error); */
        reject(
          error instanceof Error
            ? error
            : new Error("Erro ao processar o arquivo CSV")
>>>>>>> origin/main
        );
      },
    });
  });
};

interface CsvInventoryRow {
  Codigo: string;
  Unidade: string;
<<<<<<< HEAD
  Digitado: string;
  Estoque: string;
=======
  Digitado: number;
  Estoque: number;
>>>>>>> origin/main
  Descricao: string;
}

export const parseInventoryCsvFile = async (
<<<<<<< HEAD
  data: CsvFormData,
): Promise<InventoryCvs[] | undefined> => {
  return new Promise<InventoryCvs[] | undefined>((resolve, reject) => {
=======
  data: CsvFormData
): Promise<InventoryCvs[] | undefined> => {
  return new Promise<InventoryCvs[] | undefined>((resolve, reject) => {
    const ProducstInventory: InventoryCvs[] = [];
>>>>>>> origin/main
    Papa.parse(data.file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const expectedHeaders = [
          "Codigo",
          "Descricao",
          "Unidade",
<<<<<<< HEAD
          "Estoque",
          "Digitado",
          "Diferenca",
=======
          "Digitado",
          "Diferenca",
          "Estoque",
>>>>>>> origin/main
          "Custo",
          "Custo Diferenca",
        ];
        const validHeaders =
          headers.length === expectedHeaders.length &&
          expectedHeaders.every((h, i) => headers[i] === h);

        if (!validHeaders) {
          const errorMessage = validateHeaders(headers, expectedHeaders);
          reject(new Error(errorMessage));
          return;
        }
<<<<<<< HEAD

        const rows = results.data as CsvInventoryRow[];
        const productsInventory: InventoryCvs[] = [];
        const errors: string[] = [];

        rows.forEach((row, index) => {
          const parsed = inventoryCsvItemSchema.safeParse({
            productId: row.Codigo,
            unitInput: row.Unidade,
            stockExpected: row.Estoque,
            stockCounted: row.Digitado,
            description: row.Descricao,
          });

          if (!parsed.success) {
            errors.push(formatRowError(index, parsed.error));
            return;
          }

          productsInventory.push({
            productId: String(parsed.data.productId),
            unitInput: parsed.data.unitInput,
            stockExpected: parsed.data.stockExpected,
            stockCounted: parsed.data.stockCounted,
            description: parsed.data.description,
          });
        });

        if (errors.length > 0) {
          reject(new Error(errors.join("\n")));
          return;
        }

        resolve(productsInventory);
      },
      error: (error: unknown) => {
        reject(
          error instanceof Error
            ? error
            : new Error("Erro ao processar o arquivo CSV"),
=======
        const rows = results.data as CsvInventoryRow[];
        rows.forEach((row) => {
          ProducstInventory.push({
            productId: row.Codigo,
            unitInput: row.Unidade,
            stockExpected: Number(row.Estoque),
            stockCounted: Number(row.Digitado),
            description: row.Descricao,
          });
        });

        resolve(ProducstInventory);
      },
      error: (error: unknown) => {
        /* console.error("Erro no PapaParse:", error); */
        reject(
          error instanceof Error
            ? error
            : new Error("Erro ao processar o arquivo CSV")
>>>>>>> origin/main
        );
      },
    });
  });
};

<<<<<<< HEAD
const formatRowError = (index: number, error: ZodError) => {
  const detail = error.issues.map((issue) => issue.message).join("; ");
  return `Linha ${index + 2}: ${detail}`;
};

const validateHeaders = (headers: string[], expectedHeaders: string[]) => {
  const missingHeaders = expectedHeaders.filter(
    (header) => !headers.includes(header),
  );
  const extraHeaders = headers.filter(
    (header) => !expectedHeaders.includes(header),
=======
const validateHeaders = (headers: string[], expectedHeaders: string[]) => {
  const missingHeaders = expectedHeaders.filter(
    (header) => !headers.includes(header)
  );
  const extraHeaders = headers.filter(
    (header) => !expectedHeaders.includes(header)
>>>>>>> origin/main
  );
  let errorMessage = "Cabeçalho inválido, envie um arquivo CSV válido.\n";

  if (missingHeaders.length > 0) {
    errorMessage += `Faltando o(s) seguinte(s) campo(s): ${missingHeaders.join(", ")}.\n`;
  }

  if (extraHeaders.length > 0) {
    errorMessage += `Campo(s) extra(s) não esperado(s): ${extraHeaders.join(", ")}.\n`;
  }

  errorMessage += "Verifique o modelo de importação na seção de ajuda.\n";

  return errorMessage;
};
