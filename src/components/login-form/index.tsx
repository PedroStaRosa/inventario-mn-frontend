"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { LoginInput, loginSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/actions/userActions";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Função para submeter o formulário com validação
  const onSubmit = (data: LoginInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    startTransition(() => {
      formAction(formData);
    });
  };
  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      toast.success("Login realizado com sucesso!");
    }
  }, [state]);

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-sm">
            Acesse sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                disabled={isPending}
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu email..."
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Senha:</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite sua senha..."
                      autoComplete="off"
                    />

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
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="text-center mt-4">
            Não tem uma conta?
            <Link href="/register" className="font-bold ml-2">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
