import LoginForm from "@/components/login-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <LoginForm />
    </div>
  );
}
