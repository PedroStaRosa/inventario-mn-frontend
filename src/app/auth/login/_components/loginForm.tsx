"use client";

import { loginAction } from "@/app/auth/_actions/userActions";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";

import { LoginInput, loginSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, LockIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import logo from "@/assets/LOGO MUNDO NOVO.png";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../components/ui/input-group";
import { Label } from "../../../../components/ui/label";

// SER REMOVIDO EM PRODUÇÃO
const devLoginEmail = process.env.NEXT_PUBLIC_DEV_LOGIN_EMAIL ?? "";
const devLoginPassword = process.env.NEXT_PUBLIC_DEV_LOGIN_PASSWORD ?? "";
const showDevFillCredentials =
  process.env.NODE_ENV === "development" &&
  devLoginEmail.length > 0 &&
  devLoginPassword.length > 0;
// #########################################################

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
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <div className="p-4 w-full max-w-md ">
        <div className="flex justify-center items-center mb-8">
          <Image src={logo} alt="Logo" className="w-52" />
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-bold">Acesse sua conta</h1>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais corporativas para continuar.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              disabled={isPending}
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name} className="font-black text-sm">
                    Email
                  </Label>
                  <InputGroup
                    data-invalid={fieldState.invalid}
                    className="shadow-md"
                  >
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu email..."
                      autoComplete="off"
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                    {fieldState.invalid && (
                      <FieldError
                        className="mr-4"
                        errors={[fieldState.error]}
                      />
                    )}
                  </InputGroup>
                </div>
              )}
            />
            <Controller
              disabled={isPending}
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={field.name} className="font-black text-sm">
                      Senha
                    </Label>
                    <div className="text-sm text-primary hover:underline cursor-pointer">
                      Esqueceu sua senha?
                    </div>
                  </div>

                  <InputGroup
                    data-invalid={fieldState.invalid}
                    className="shadow-md"
                  >
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite sua senha..."
                      autoComplete="off"
                      type="password"
                    />
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                    {fieldState.invalid && (
                      <FieldError
                        className="mr-4"
                        errors={[fieldState.error]}
                      />
                    )}
                  </InputGroup>
                </div>
              )}
            />
          </FieldGroup>

          {state?.error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/80 font-bold h-12 text-lg"
            disabled={isPending}
          >
            {isPending ? "Entrando..." : "Entrar"}{" "}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
      {/* ######################################################### */}
      {/* SER REMOVIDO EM PRODUÇÃO */}
      {/* ######################################################### */}
      {showDevFillCredentials && (
        <div className="mt-4 p-8 bg-yellow-400 text-center">
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed bg-red-500 text-white font-bold"
            disabled={isPending}
            onClick={() => {
              form.setValue("email", devLoginEmail);
              form.setValue("password", devLoginPassword);
              void form.trigger(["email", "password"]);
              toast.success(
                "Campos preenchidos (ambiente de desenvolvimento).",
              );
            }}
          >
            Preencher login (dev)
          </Button>
        </div>
      )}{" "}
      {/* ######################################################### */}
      {/* ######################################################### */}
    </div>
  );
}
