import Papa from "papaparse";
import { ProductCvs } from "@/types/productCvs";
import { CsvFormData } from "@/schemas/productSchema";

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
          const errorMessage =
            "Cabeçalho inválido, envie um arquivo CSV válido. Verifique o modelo de importação na seção de ajuda.";
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
        console.error("Erro no PapaParse:", error);
        reject(
          error instanceof Error
            ? error
            : new Error("Erro ao processar o arquivo CSV")
        );
      },
    });
  });
};
