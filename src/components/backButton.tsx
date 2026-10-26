"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallback: string;
  label?: string;
};

export function BackButton({ fallback, label = "Voltar" }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallback);
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={handleBack}
      aria-label={label}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
