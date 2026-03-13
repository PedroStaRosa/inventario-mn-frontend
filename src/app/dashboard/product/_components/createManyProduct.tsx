"use client";
import { createManyProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { parseCsvFile } from "@/lib/parceCsvFile";
import { ProductCvs } from "@/types/productCvs";
import { CsvFormData, csvSchema } from "@/schemas/productSchema";
import OverviewCreateManyProduct from "./overviewCreateManyProduct";

export function CreateManyProduct() {
  const [state, formAction, isPending] = useActionState(
    createManyProductAction,
    null
  );

  const [products, setProducts] = useState<ProductCvs[]>([]);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

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
    try {
      const products = await parseCsvFile(data);
      if (!products) {
        toast.error("Erro ao processar o arquivo CSV");
        return;
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
    const formData = new FormData();
    const productsCsv = JSON.stringify(products);
    formData.append("file", productsCsv);
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleCloseOverview = () => {
    setIsOverviewOpen(false);
    handleClear();

  };

  useEffect(() => {
    if (state?.success && state.response) {
      setIsOverviewOpen(true);
    }
  }, [state]);

  return (
    <div>
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
            type="submit"
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
