"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CreateManyProductResponse } from "@/types/api";

interface OverviewCreateManyProductProps {
  response: CreateManyProductResponse;
  isOpen: boolean;
  onClose: () => void;
}
export default function OverviewCreateManyProduct({
  response,
  isOpen,
  onClose,
}: OverviewCreateManyProductProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogTitle>Importação de produtos</DialogTitle>
        <DialogDescription>Relatório de importação de produtos</DialogDescription>
        <DialogHeader className="space-y-1">
          <p className="text-sm">
            Total importados:{" "}
            <span className="font-semibold">{response.total_created}</span>
          </p>
          <p className="text-sm">
            Total ignorados:{" "}
            <span className="font-semibold">{response.total_skipped}</span>
          </p>
          <p className="text-sm">
            Total de erros:{" "}
            <span className="font-semibold">{response.errors.length}</span>
          </p>
        </DialogHeader>
        <div>
          <h2 className="text-base font-semibold">Produtos importados</h2>
          <ul className="max-h-[120px] space-y-1 overflow-y-auto">
            {response.created.map((product) => (
              <li key={product.code} className="text-sm text-foreground">
                {product.description}
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h2 className="text-base font-semibold">Produtos ignorados</h2>
          <ul className="max-h-[120px] space-y-1 overflow-y-auto">
            {response.skipped.map((product) => (
              <li key={product.code} className="text-sm text-foreground">
                {product.description}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold">Erros</h2>
          <ul className="max-h-[120px] list-disc space-y-1 overflow-y-auto pl-5">
            {response.errors.map((error) => (
              <li key={error} className="text-sm text-destructive">
                {error}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
