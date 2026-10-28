"use client";

import logoIcon from "@/assets/Globo_Mundo_Novo.png";
import {
  BoxIcon,
  CircleQuestionMark,
  ClipboardList,
  HomeIcon,
  MenuIcon,
  Package,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "../logoutButton";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import Image from "next/image";

const menuItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    label: "Inventarios",
    href: "/dashboard/inventory",
    icon: <ClipboardList />,
  },
  {
    label: "Produtos",
    href: "/dashboard/products",
    icon: <Package />,
  },
];

interface MenuItemProps {
  companyName: string;
}

export default function MenuNavigator({ companyName }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const [open, setOpen] = useState(false);
  return (
    <>
      {/*DESKTOP MENU*/}
      <aside className="hidden sm:flex w-64 h-screen flex-col bg-gray-200 shadow-right">
        <div className="flex items-center gap-2 px-4 h-20">
          <Image src={logoIcon} alt="Icone da empresa" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold">{companyName}</h1>
            <p className="text-xs text-gray-500">Gestão de Inventário</p>
          </div>
        </div>
        <Separator className="bg-gray-300" />
        <div className="flex flex-col h-full justify-between">
          <div className="p-4">
            <nav>
              <ul className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 hover:bg-sidebar-primary-foreground hover:text-gray-700 p-2 rounded-md",
                        isActive(item.href) &&
                          "bg-sidebar-primary font-bold text-primary",
                      )}
                    >
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className=" w-full h-20 py-4 flex flex-col items-center justify-center mb-8">
            <Link
              href="/dashboard/help"
              className="flex gap-2 p-4 w-full items-center"
            >
              <CircleQuestionMark className="w-6 h-6" />
              <p className="text-xs text-gray-500">Ajuda</p>
            </Link>
            <Separator className="bg-gray-300 w-full" />
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/*MOBILE MENU*/}
      <div className="block sm:hidden h-full p-4 w-full bg-gray-200">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <MenuIcon className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-200">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Image
                  src={logoIcon}
                  alt="Icone da empresa"
                  className="w-10 h-10"
                />
                {companyName}
              </SheetTitle>
              <SheetDescription>
                <div>
                  <p className="text-xs text-gray-500">Gestão de Inventário</p>
                </div>
              </SheetDescription>
            </SheetHeader>
            <Separator className="bg-gray-300 w-full" />
            <div className="flex flex-col h-full justify-between">
              <div className="flex-1">
                <ul className="flex flex-col gap-2 p-4">
                  {menuItems.map((item) => (
                    <li
                      key={item.href}
                      className={cn(
                        "flex items-center gap-2 hover:bg-sidebar-primary-foreground hover:text-gray-700 p-2 rounded-md",
                        isActive(item.href) &&
                          "bg-sidebar-primary font-bold text-primary",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2"
                      >
                        {item.icon} {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/dashboard/help"
                className="flex gap-2 p-4 w-full items-center"
              >
                <CircleQuestionMark className="w-6 h-6" />
                <p className="text-xs text-gray-500">Ajuda</p>
              </Link>
              <Separator className="" />
              <div className="flex h-12 w-full items-center justify-center">
                <LogoutButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
