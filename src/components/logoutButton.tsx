"use client";

import { LogOutIcon } from "lucide-react";

import { redirect } from "next/navigation";
import { deleteToken } from "@/lib/auth";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await deleteToken();
    toast.success("Ate logo.");
    redirect("/auth/login");
  };

  return (
    <Button variant="ghost" className="w-full h-full hover:bg-red-400 hover:text-white" size="sm" onClick={handleLogout}>
      <LogOutIcon className="w-4 h-4" />
      Sair
    </Button>
  );
}