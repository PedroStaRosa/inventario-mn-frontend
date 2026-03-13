"use client";

import { createProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductInput, productSchema } from "@/schemas/productSchema";
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

export default function CreateProductDialog() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const handledSuccessRef = useRef(false);

  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: "",
      description: "",
      unit: "UN",
    },
  });

  const onSubmit = (data: ProductInput) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("description", data.description);
    formData.append("unit", data.unit);
    startTransition(() => {
      formAction(formData);
    });
  };

  // Reseta o ref quando o dialog abre para permitir tratar sucesso de um novo submit
  useEffect(() => {
    if (isOpen) handledSuccessRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!state?.success || handledSuccessRef.current) return;
    handledSuccessRef.current = true;

    startTransition(() => {
      toast.success("Produto cadastrado com sucesso!");
      form.reset();
      setIsOpen(false);
    });
  }, [state?.success, form]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Novo Produto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogDescription>Cadastro de novo produto</DialogDescription>
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
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
                      type="text"
                      id={field.name}
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
                    <FieldLabel htmlFor={field.name}>Unidade:</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a unidade do produto..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UN">UN</SelectItem>
                        <SelectItem value="KG">KG</SelectItem>
                        <SelectItem value="LT">LT</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="PT">PT</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {state?.error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {state.error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
