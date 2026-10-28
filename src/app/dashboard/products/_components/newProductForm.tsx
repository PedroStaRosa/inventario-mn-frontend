"use client";
import { CodeIcon, Loader2, Plus, ScanBarcode } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ProductFormInput,
  productSchema,
  unitSchema,
} from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { newProductAction } from "@/app/dashboard/_actions/productActions";
import { toast } from "sonner";
import { LoadingOverlay } from "@/components/loadingOverlay";

export default function NewProductForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(newProductAction, null);

  const units = unitSchema;

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: 0,
      description: "",
      unit: "UN",
    },
  });

  const onSubmit = (data: ProductFormInput) => {
    const formData = new FormData();

    formData.append("code", data.code as string);
    formData.append("description", data.description);
    formData.append("unit", data.unit);
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && isPending) return;
    setIsOpen(open);
  };

  useEffect(() => {
    if (state?.success && state.product) {
      toast.success("Produto criado com sucesso");
      setIsOpen(false);
      form.reset();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <LoadingOverlay loading={isPending} message="Processando..." />
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="gap-2 shadow-md hover:shadow-lg font-bold"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={isPending}
          onInteractOutside={(e) => isPending && e.preventDefault()}
          onEscapeKeyDown={(e) => isPending && e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para criar um novo produto.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                disabled={isPending}
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Codigo:</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o codigo do produto..."
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
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Descrição:</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite a descrição do produto..."
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                disabled={isPending}
                name="unit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Descrição:</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.value}
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Cadastrando Produto..." : "Criar Produto"}
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
