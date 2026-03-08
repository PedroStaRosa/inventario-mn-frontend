"use client";
import { createProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Papa from "papaparse";

interface ProductCvs {
  code: string;
  description: string;
  unit: string;
}

interface CsvRow {
  codigo: string;
  descricao: string;
  unidade: string;
}

const csvSchema = z.object({
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

type CsvFormData = z.infer<typeof csvSchema>;

export function CreateManyProduct() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  );

  const [products, setProducts] = useState<ProductCvs[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProducts([]);
  };

  const form = useForm<CsvFormData>({
    resolver: zodResolver(csvSchema),
  });

  const parseCsvFile = async (data: CsvFormData) => {
    setProducts([]);
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
          toast.error(errorMessage);
          form.setError("file", {
            message: errorMessage,
          });
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
        setProducts(products);
      },
      error: (error: unknown) => {
        console.error("Erro no PapaParse:", error);
      },
    });
  };

  const handleImportProducts = async () => {
    console.log("Importando produtos...");
    if (products.length === 0) {
      toast.error("Nenhum produto para importar.");
      return;
    }
    console.log(products);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(parseCsvFile)} className="space-y-4">
        <Controller
          disabled={isPending}
          name="file"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="file_product">Arquivo CSV</FieldLabel>
              <Input
                ref={fileInputRef}
                id="file_product"
                type="file"
                accept=".csv,text/csv"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  field.onChange(selectedFile ?? undefined);
                }}
                onBlur={field.onBlur}
              />
              <FieldDescription>
                Selecione um arquivo CSV para importar os produtos.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" className="" disabled={isPending}>
            {isPending ? "Enviando..." : "Importar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleClear}
          >
            Limpar
          </Button>
        </div>
      </form>
      {products.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">
            Produtos - {products.length} a serem importados
          </h2>
          <div className="border rounded-md">
            <div className="flex w-full p-2 bg-slate-100">
              <span className="font-bold w-1/3">Código</span>
              <span className="font-bold  w-1/3">Descrição</span>
              <span className="font-bold  w-1/3">Unidade</span>
            </div>
            <div className="max-h-[300px] w-full overflow-y-auto rounded-md">
              {products.map((product) => (
                <div className="flex w-full border-b px-2" key={product.code}>
                  <span className="w-1/3">{product.code}</span>
                  <span className="w-1/3">{product.description}</span>
                  <span className="w-1/3">{product.unit}</span>
                </div>
              ))}
            </div>
          </div>
          <Button
            type="button"
            className="mt-4 w-full"
            variant="default"
            disabled={isPending}
            onClick={handleImportProducts}
          >
            Importar
          </Button>
        </div>
      )}
    </div>
  );
}
