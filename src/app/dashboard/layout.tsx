import LogoutButton from "@/components/logoutButton";
import MenuNavigator from "@/components/navs/menuNavigator";
import { getUserService } from "@/services/user/userService";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserService();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen min-w-full flex-col sm:flex-row">
      <MenuNavigator companyName={user.name} />
      <div className="flex min-h-0 flex-1 flex-col px-4 py-4">{children}</div>
    </div>
  );
}

