"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "../../../../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { CsvFormData, csvSchema } from "@/schemas/productSchema";
import { ProductCvs } from "@/types/product";
import { createManyProductAction } from "@/app/dashboard/_actions/productActions";
import OverviewCreateManyProduct from "./overviewCreateManyProduct";
import { parseCsvProductFile } from "@/lib/parseCsvFile";
import { LoadingOverlay } from "@/components/loadingOverlay";

export function ImportProductsCVS() {
  const [state, formAction, isPending] = useActionState(
    createManyProductAction,
    null,
  );

  const [products, setProducts] = useState<ProductCvs[]>([]);
  const [isOverviewDismissed, setIsOverviewDismissed] = useState(false);
  const [isProductsRepeated, setIsProductsRepeated] = useState("");
  const isOverviewOpen = Boolean(
    state?.success && state.response && !isOverviewDismissed,
  );
  const form = useForm<CsvFormData>({
    resolver: zodResolver(csvSchema),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProducts([]);
  };

  const readCsvFile = async (data: CsvFormData) => {
    setProducts([]);
    setIsProductsRepeated("");
    try {
      const products = await parseCsvProductFile(data);
      if (!products) {
        toast.error("Erro ao processar o arquivo CSV");
        return;
      }

      const productsRepeated = products.filter((product, index, self) =>
        self.findIndex((t) => t.code === product.code) !== index,
      );
      if (productsRepeated.length > 0) {
        const result = productsRepeated.map((p) => p.code).join(", ");
        setIsProductsRepeated(result);
        toast.error("Produtos repetidos encontrados no arquivo CSV"); 
      }
      setProducts(products);
    } catch (error) {
      console.error("Erro ao processar o arquivo CSV:", error);
      if (error instanceof Error) {
        form.setError("file", {
          message: error.message,
        });
      } else {
        toast.error("Erro ao processar o arquivo CSV");
      }
    }
  };

  const handleImportProducts = async () => {
    if (products.length === 0) {
      toast.error("Nenhum produto para importar.");
      return;
    }
    setIsOverviewDismissed(false);
    const formData = new FormData();
    const productsCsv = JSON.stringify(products);
    formData.append("file", productsCsv);
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleCloseOverview = () => {
    setIsOverviewDismissed(true);
    handleClear();
  };

  useEffect(() => {
    if (state?.success && state.response) {
      toast.success("Produtos criados com sucesso");
      form.reset();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <LoadingOverlay loading={isPending} message="Processando..." />
      <Card className="shadow-md hover:shadow-lg w-full">
        <CardHeader>
          <CardTitle>Importar Produtos (CSV)</CardTitle>
          <CardDescription>
            Envie um arquivo CSV para registrar produtos em lote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-1">
          {state?.success && state.response && (
            <OverviewCreateManyProduct
              response={state.response}
              isOpen={isOverviewOpen}
              onClose={handleCloseOverview}
            />
          )}

          <form onSubmit={form.handleSubmit(readCsvFile)} className="space-y-4">
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
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 whitespace-pre-line"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Enviando..." : "Importar"}
              </Button>
            </div>
          </form>

          {products.length > 0 && (
            <div className="space-y-4 p-4 rounded-lg flex-1">
              {isProductsRepeated.length > 0 && (
                <div className="rounded-lg border p-2">
                  <FieldError> Produtos repetidos: {isProductsRepeated}</FieldError>
                </div>
              )}
              <h2 className="text-lg font-semibold">
                Prévia: {products.length} produto(s) a serem importados
              </h2>

              <div className="rounded-lg border">
                <div className="flex w-full bg-muted/30 p-3">
                  <span className="w-1/3 text-sm font-semibold">Código</span>
                  <span className="w-1/3 text-sm font-semibold">Descrição</span>
                  <span className="w-1/3 text-sm font-semibold">Unidade</span>
                </div>
                <div className="max-h-[40vh] w-full overflow-y-auto rounded-b-lg">
                  {products.map((product) => (
                    <div
                      className="flex w-full border-b px-3 py-2 last:border-b-0"
                      key={product.code}
                    >
                      <span className="w-1/3">{product.code}</span>
                      <span className="w-1/3">{product.description}</span>
                      <span className="w-1/3">{product.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-fit"
                  variant="default"
                  disabled={isPending || isProductsRepeated.length > 0}
                  onClick={handleImportProducts}
                >
                  Enviar
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
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
