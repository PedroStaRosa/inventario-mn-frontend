"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseDate } from "@/lib/parseDate";
import { Inventory, InventoryItem } from "@/types/inventory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const searchSchema = z.object({
  search: z.string(),
});
type SearchFormData = z.infer<typeof searchSchema>;

const PAGE_SIZE = 20;

export function InventoryTable({ inventories }: { inventories: Inventory[] }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const sortedInventories = useMemo(
    () =>
      inventories.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [inventories],
  );

  const filteredInventories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sortedInventories;

    return sortedInventories.filter((inventory) =>
      inventory.name.toLowerCase().includes(term),
    );
  }, [sortedInventories, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInventories.length / PAGE_SIZE),
  );

  const paginatedInventories = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredInventories.slice(start, start + PAGE_SIZE);
  }, [filteredInventories, page]);

  function handlePrev() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  const onSubmit = (data: SearchFormData) => {
    setSearchTerm(data.search);
    setPage(1);
  };
  const handleViewInventory = (id: string) => {
    router.push(`/dashboard/inventory/${id}`);
  };
  return (
    <div className="flex flex-col min-h-0 overflow-y-auto rounded-lg border bg-card shadow-sm w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex gap-2 justify-center items-center"
      >
        <FieldGroup className="w-full ">
          <Controller
            control={form.control}
            name="search"
            render={({ field, fieldState }) => (
              <InputGroup
                data-invalid={fieldState.invalid}
                className="shadow-md"
              >
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Descrição..."
                  autoComplete="off"
                  type="text"
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="bg-primary text-white hover:bg-primary/80 font-bold h-12 text-lg"
        >
          Pesquisar
        </Button>
      </form>
      <div className="flex flex-col gap-4 max-h-screen flex-1 overflow-y-auto pb-24 md:pb-0 justify-between items-center">
        <Table className="mb-12 md:mb-0">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 border-b">
            <TableRow className="font-bold">
              <TableHead className="text-left font-bold text-gray-700">
                Descrição
              </TableHead>
              <TableHead className="text-left flex-1 font-bold text-gray-700">
                Criado em
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                Produtos
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                Resultado
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                Visualizar
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedInventories.map((inventory) => (
              <TableRow key={inventory.id}>
                <TableCell>{inventory.name}</TableCell>
                <TableCell>{parseDate(inventory.createdAt)}</TableCell>
                <TableCell>{inventory.inventoryItems.length}</TableCell>
                <TableCell>
                  <InventoryDifferenceCalculator
                    inventoryItems={inventory.inventoryItems}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => handleViewInventory(inventory.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedInventories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {searchTerm.trim()
                    ? "Nenhum inventário encontrado para esta pesquisa"
                    : "Nenhum inventário encontrado"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div
          className="
    fixed bottom-0 left-0 right-0
    flex flex-col
    items-center justify-center gap-3
    py-4 px-4 z-10
    bg-card
    md:static
    md:w-full
    md:z-0
  "
        >
          <Separator className="w-full" />
          <span className="text-sm text-muted-foreground">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            {searchTerm.trim() && (
              <> · {paginatedInventories.length} resultado(s)</>
            )}
          </span>
          <div className="flex flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={page === totalPages || totalPages === 0}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const InventoryDifferenceCalculator = ({
  inventoryItems,
}: {
  inventoryItems: InventoryItem[];
}) => {
  const divergence = inventoryItems.reduce((acc, item) => {
    const diff = Number(item.difference);
    return acc + (Number.isNaN(diff) ? 0 : diff);
  }, 0);

  return divergence !== 0 ? (
    <span>
      <span className="text-sm text-red-500">
        {" "}
        {Math.abs(divergence)} divergências
      </span>
    </span>
  ) : (
    <span className="text-sm text-green-500">Sem divergências</span>
  );
};
