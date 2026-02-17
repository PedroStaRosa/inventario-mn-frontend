import Header from "@/components/header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <Header />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
