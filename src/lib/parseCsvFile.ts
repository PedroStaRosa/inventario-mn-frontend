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

    Papa.parse(data.file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const expectedHeaders = ["codigo", "descricao", "unidade"];
        const validHeaders =
          headers.length === expectedHeaders.length &&
          expectedHeaders.every((h, i) => headers[i] === h);

        if (!validHeaders) {
          const errorMessage = validateHeaders(headers, expectedHeaders);
          reject(new Error(errorMessage));
          return;
        }

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
        );
      },
    });
  });
};

interface CsvInventoryRow {
  Codigo: string;
  Unidade: string;
  Digitado: number;
  Estoque: number;
  Descricao: string;
}

export const parseInventoryCsvFile = async (
  data: CsvFormData
): Promise<InventoryCvs[] | undefined> => {
  return new Promise<InventoryCvs[] | undefined>((resolve, reject) => {
    const ProducstInventory: InventoryCvs[] = [];
    Papa.parse(data.file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const expectedHeaders = [
          "Codigo",
          "Descricao",
          "Unidade",
          "Digitado",
          "Diferenca",
          "Estoque",
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
        const rows = results.data as CsvInventoryRow[];
        rows.forEach((row) => {
          ProducstInventory.push({
            productCode: row.Codigo,
            unitInput: row.Unidade,
            stockExpected: row.Estoque,
            stockCounted: row.Digitado,
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
        );
      },
    });
  });
};

const validateHeaders = (headers: string[], expectedHeaders: string[]) => {
  const missingHeaders = expectedHeaders.filter(
    (header) => !headers.includes(header)
  );
  const extraHeaders = headers.filter(
    (header) => !expectedHeaders.includes(header)
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
