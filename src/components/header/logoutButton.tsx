"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { removeToken } from "@/lib/auth";

export default function LogoutButton() {


    const handleLogout = async () => {
        await removeToken();
        redirect("/login");
    }

    return (
        <Button variant="destructive" onClick={handleLogout}>
            <LogOutIcon className="w-4 h-4" />
            Sair
        </Button>
    );
}