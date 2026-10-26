"use client";

import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
}

export function LoadingOverlay({
  loading,
  message = "Processando...",
}: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-8 py-6 shadow-xl">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

        <div className="text-center">
          <p className="font-medium">{message}</p>
          <p className="text-sm text-muted-foreground">
            Aguarde alguns instantes...
          </p>
        </div>
      </div>
    </div>
  );
}
