import { getToken, getUser } from "@/lib/auth";
import LogoutButton from "./logoutButton";
/* import TokenTimer from "../tokenTimer"; */
import { redirect } from "next/navigation";

export default async function Header() {
  const user = await getUser();
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background/80 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex min-w-0 items-center gap-3">
        <div
          aria-hidden
          className="size-8 rounded-lg bg-primary/10 ring-1 ring-primary/20"
        />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Sistema</p>
          <h1 className="truncate text-sm font-semibold text-foreground">
            Bem-vindo, {user!.name}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {/* <TokenTimer token={token} /> */}
        <LogoutButton />
      </div>
    </header>
  );
}
