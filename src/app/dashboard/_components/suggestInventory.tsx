"use client";
import { getSuggestInventoryAction } from "@/app/dashboard/_actions/inventoryAction";
import { LoadingOverlay } from "@/components/loadingOverlay";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportSuggestInventoryPdf } from "@/lib/exportSuggestInventoryPdf";
import { diffDays } from "@/lib/parseDate";
import {
  SuggestInventoryFormInput,
  suggestInventorySchema,
} from "@/schemas/inventorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardList, FileDown } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { BadgeStatus } from "../products/_components/BadgeStatus";

export default function SuggestInventory() {
  const [state, formAction, isPending] = useActionState(
    getSuggestInventoryAction,
    null,
  );
  const form = useForm<SuggestInventoryFormInput>({
    resolver: zodResolver(suggestInventorySchema),
    defaultValues: {
      days: 30,
      limit: 10,
    },
  });

  const onSubmit = (data: SuggestInventoryFormInput) => {
    const formData = new FormData();
    formData.append("days", String(data.days));
    formData.append("limit", String(data.limit));
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleExportPdf = () => {
    const products = state?.products?.products;
    if (!products?.length) {
      toast.error("Nenhum produto para exportar");
      return;
    }

    try {
      const { days, limit } = form.getValues();
      exportSuggestInventoryPdf(products, {
        days: Number(days),
        limit: Number(limit),
      });
      toast.success("PDF gerado com sucesso");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao gerar o PDF da sugestão",
      );
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success("Sugestão de inventário criada com sucesso");
    }
  }, [state]);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col gap-4">
      <LoadingOverlay loading={isPending} message="Processando..." />
      <div className="flex gap-4 ">
        {/* <h2 className="text-base font-bold">Sugestão de inventário</h2> */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="shrink-0 flex flex-1 w-full min-w-0 flex-col gap-3 sm:flex-wrap "
        >
          {/* <FieldGroup className="grid w-full min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2"> */}
          <FieldGroup className="flex flex-row justify-between flex-1">
            <Controller
              disabled={isPending}
              name="days"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Dias sem inventário:
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Dias sem inventário..."
                    autoComplete="off"
                    value={field.value as number}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              disabled={isPending}
              name="limit"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Quantidade de itens:
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Quantidade de itens..."
                    autoComplete="off"
                    value={field.value as number}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            variant="default"
            className="w-full shrink-0 font-bold shadow-md hover:shadow-lg sm:w-auto"
            type="submit"
          >
            <ClipboardList className="h-4 w-4" />
            Criar sugestão de Inventário
          </Button>
        </form>
      </div>
      {state?.success && (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border shadow-sm">
          <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
            <p className="text-sm text-muted-foreground">
              {state.products?.total ?? state.products?.products.length ?? 0}{" "}
              produto(s) na sugestão
            </p>
            <Button
              type="button"
              variant="outline"
              className="shadow-sm"
              onClick={handleExportPdf}
              disabled={!state.products?.products.length}
            >
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-left font-bold">Codigo</TableHead>
                  <TableHead className="text-left font-bold">
                    Descrição
                  </TableHead>
                  <TableHead className="text-left font-bold">Unidade</TableHead>
                  <TableHead className="text-left font-bold">Status</TableHead>
                  <TableHead className="text-left font-bold">
                    Último Inventário
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {state.products?.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.code}</TableCell>
                    <TableCell className="max-w-64 truncate">
                      {product.description}
                    </TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>
                      <BadgeStatus date={product.lastInventory} />
                    </TableCell>
                    <TableCell>
                      {product.lastInventoryFormatted}
                      {product.lastInventory
                        ? ` (${diffDays(product.lastInventory)} dias)`
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {state?.error && (
        <div className="flex flex-col text-red-500">
          <h1 className="text-sm font-bold">
            Erro ao criar sugestão de inventário
          </h1>
          <p className="text-sm">{state.error}</p>
        </div>
      )}
    </div>
  );
}
