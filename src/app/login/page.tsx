import LoginForm from "@/components/login-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams?: Promise<{
    error?: string;
    message?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  const params = (await searchParams) ?? {};
  const showApiError = params.error === "api_unavailable";
  const errorMessage =
    params.message ?? "Houve um erro. Tente novamente mais tarde.";


  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-muted/40 via-background to-background p-4 font-sans">
      <div className="w-full max-w-md space-y-4">
        {showApiError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
