import { getUserService } from "@/services/user/userService";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserService();
  if (user) {
    redirect("/dashboard");
  }
  return <main>{children}</main>;
}
