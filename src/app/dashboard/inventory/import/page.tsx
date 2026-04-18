"use client";
import { createInventoryAction } from "@/actions/inventoryActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { parseInventoryCsvFile } from "@/lib/parseCsvFile";
import {
  InventoryImportFormData,
  inventoryImportSchema,
} from "@/schemas/productSchema";
import { InventoryCvs } from "@/types/inventoryCvs";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const ImportInventoryPage = () => {
  const [inventoryProducts, setInventoryProducts] = useState<InventoryCvs[]>(
    []
  );
  const [state, formAction, isPending] = useActionState(
    createInventoryAction,
    null
  );

  const form = useForm<InventoryImportFormData>({
    resolver: zodResolver(inventoryImportSchema),
    defaultValues: { inventoryName: "" },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const readCsvFile = async (data: InventoryImportFormData) => {
    setInventoryProducts([]);
    try {
      const parsedInventoryProducts = await parseInventoryCsvFile(data);
      if (!parsedInventoryProducts) {
        toast.error("Erro ao processar o arquivo CSV");
        return;
      }
      setInventoryProducts(parsedInventoryProducts);
      console.log("parsedInventoryProducts", parsedInventoryProducts);
    } catch (error) {
      /* console.error("Erro ao processar o arquivo CSV:", error); */
      if (error instanceof Error) {
        form.setError("file", {
          message: error.message,
        });
      } else {
        toast.error("Erro ao processar o arquivo CSV");
      }
    }
  };

  const handleClear = () => {
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setInventoryProducts([]);
  };

  const handleImportInventory = async () => {
    if (inventoryProducts.length === 0) {
      toast.error("Nenhum produto para importar.");
      return;
    }
    const formData = new FormData();
    const inventoryProductsCsv = JSON.stringify(inventoryProducts);
    formData.append("inventoryItems", inventoryProductsCsv);
    formData.append("inventoryName", form.getValues("inventoryName"));
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Importar Inventário (CSV)</CardTitle>
          <CardDescription>
            Envie um arquivo CSV para registrar um inventário.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(readCsvFile)} className="space-y-4">
            <Controller
              name="inventoryName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="inventoryName">
                    Nome do Inventário
                  </FieldLabel>
                  <Input
                    {...field}
                    id="inventoryName"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite o nome do inventário..."
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              /*  disabled={isPending} */
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
              <Button type="submit" /* disabled={isPending} */>
                {/* {isPending ? "Enviando..." : "Importar"} */}
                Importar
              </Button>
              <Button
                type="button"
                variant="outline"
                /* disabled={isPending} */
                onClick={handleClear}
              >
                Limpar
              </Button>
            </div>
          </form>

          {inventoryProducts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Prévia: {inventoryProducts.length} produto(s) a serem importados
              </h2>

              <div className="rounded-lg border">
                {/* Header for table - responsive layout */}
                <div className="hidden sm:flex bg-muted/30 p-3 w-full justify-between">
                  <span className="w-1/6 text-sm font-semibold">Código</span>
                  <span className="w-2/6 text-sm font-semibold">Descrição</span>
                  <span className="w-1/6 text-sm font-semibold text-center">
                    Unidade
                  </span>
                  <span className="w-1/6 text-sm font-semibold text-center">
                    Estoque
                  </span>
                  <span className="w-1/6 text-sm font-semibold text-center">
                    Digitado
                  </span>
                  <span className="w-1/6 text-sm font-semibold text-center">
                    Diferença
                  </span>
                </div>

                <div className="max-h-[300px] overflow-y-auto rounded-b-lg">
                  {inventoryProducts.map((product) => (
                    <div
                      className="flex flex-col sm:flex-row w-full border-b px-3 py-2 last:border-b-0"
                      key={product.productCode}
                    >
                      {/* Mobile labels */}
                      <div className="flex flex-col sm:hidden mb-2 gap-1">
                        <div className="flex text-xs">
                          <span className="font-semibold w-1/5">Código:</span>
                          <span>{product.productCode}</span>
                        </div>
                        <div className="flex text-xs">
                          <span className="font-semibold w-1/5">
                            Descrição:
                          </span>
                          <span>{product.description}</span>
                        </div>
                        <div className="flex text-xs">
                          <span className="font-semibold w-1/5">Unidade:</span>
                          <span>{product.unitInput}</span>
                        </div>
                        <div className="flex text-xs">
                          <span className="font-semibold w-1/5">Estoque:</span>
                          <span>{product.stockExpected}</span>
                        </div>
                        <div className="flex text-xs">
                          <span className="font-semibold w-1/5">Digitado:</span>
                          <span>{product.stockCounted}</span>
                        </div>
                        <div className="flex text-xs">
                          <span className="font-semibold w-1/5">
                            Diferença:
                          </span>
                          <span>
                            {product.stockExpected - product.stockCounted}
                          </span>
                        </div>
                      </div>
                      {/* Desktop columns */}
                      <div className="hidden sm:flex w-full text-xs">
                        <span className="hidden sm:flex w-1/6">
                          {product.productCode}
                        </span>
                        <span className="hidden sm:flex w-2/6">
                          {product.description}
                        </span>
                        <span className="hidden sm:flex w-1/6 justify-center">
                          {product.unitInput}
                        </span>
                        <span className="hidden sm:flex w-1/6 justify-center">
                          {product.stockExpected}
                        </span>
                        <span className="hidden sm:flex w-1/6 justify-center">
                          {product.stockCounted}
                        </span>
                        <span className="hidden sm:flex w-1/6 justify-center">
                          {product.stockExpected - product.stockCounted}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="default"
                disabled={isPending}
                onClick={handleImportInventory}
              >
                Importar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportInventoryPage;
