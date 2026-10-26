import type { Metadata } from "next";
import {Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { getUserService } from "@/services/user/userService";
import { redirect } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mundo Novo Modules",
  description: "Modulos para o Mundo Novo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
    lang="en"
      className={`antialiased`}
    >
      <body
      className={cn("min-h-full min-w-full flex flex-col bg-gray-100", "antialiased", roboto.className)}
      suppressHydrationWarning
      >
      <main>{children}</main>
      <Toaster duration={2000} richColors position="top-right" />
      </body>
    </html>
  );
}
