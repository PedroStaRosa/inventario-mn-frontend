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
        <DialogHeader>

          <span>Total de produtos importados: {response.total_created}</span>
          <span>Total de produtos ignorados: {response.total_skipped}</span>
          <span>Total de erros: {response.errors.length}</span>
        </DialogHeader>
        <div>
          <h2 className="text-lg font-bold">Produtos importados</h2>
          <ul className="max-h-[100px] overflow-y-auto">
            {response.created.map((product) => (
              <li key={product.code}>{product.description}</li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h2 className="text-lg font-bold">Produtos ignorados</h2>
          <ul className="max-h-[100px] overflow-y-auto">
            {response.skipped.map((product) => (
              <li key={product.code}>{product.description}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Erros</h2>
          <ul>
            {response.errors.map((error) => (
              <li key={error}>{error}</li>
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
