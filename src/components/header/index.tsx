import { getToken, getUser } from "@/lib/auth";
import LogoutButton from "./logoutButton";
import TokenTimer from "../tokenTimer";
import { redirect } from "next/navigation";

export default async function Header() {
  const user = await getUser();
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center justify-between">
        <h1>Header {user!.name}</h1>
      </div>
      <div className="flex items-center justify-end gap-2">
        <TokenTimer token={token} />
        <LogoutButton />
      </div>
    </header>
  );
}
