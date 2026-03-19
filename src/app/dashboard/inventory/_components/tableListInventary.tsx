"use client";

import { listInventoryAction } from "@/actions/inventoryActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseDate } from "@/lib/parseDate";
import { redirect, usePathname } from "next/navigation";
import { useActionState, useMemo, useTransition } from "react";

export default function TableListInventary() {
  const [state, formAction, isPending] = useActionState(
    listInventoryAction,
    null
  );
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  const handleListInventories = () => {
    startTransition(() => {
      formAction();
    });
  };

  const inventories = useMemo(() => {
    return state?.success ? state.inventories : [];
  }, [state]);

  function handleOpenDetails(id: string) {
    redirect(`${pathname}/${id}`);
    /* router.push(`/products/${id}`) */
  }

  return (
    <div className="space-y-4 ">
      <Button disabled={isPending} onClick={handleListInventories}>
        Listar Inventários
      </Button>

      <Card>
        <CardContent className="">
          <div className=" overflow-y-auto rounded-b-xl">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Visualizar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Nenhum inventário encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  inventories.map((inventory) => (
                    <TableRow key={inventory.id}>
                      <TableCell>{inventory.name}</TableCell>
                      <TableCell>{parseDate(inventory.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => handleOpenDetails(inventory.id)}
                        >
                          Visualizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
