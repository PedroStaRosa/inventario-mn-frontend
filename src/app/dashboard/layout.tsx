<<<<<<< HEAD
import LogoutButton from "@/components/logoutButton";
import MenuNavigator from "@/components/navs/menuNavigator";
import { getUserService } from "@/services/user/userService";
import { redirect } from "next/navigation";
import React from "react";
=======
import Header from "@/components/header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
>>>>>>> origin/main

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const user = await getUserService();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen min-w-full flex-col sm:flex-row">
      <MenuNavigator companyName={user.name} />
      <div className="flex min-h-0 flex-1 flex-col px-4 py-4">{children}</div>
=======
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-svh bg-muted/10">
      <Header />
      <main className="flex-1 px-4 pb-10 pt-6">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
>>>>>>> origin/main
    </div>
  );
}
