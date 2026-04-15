import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listInventoryByIdService } from "@/services/inventoryService";

interface InventoryPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function ProductDetails({ params }: InventoryPageProps) {
  const { id } = await params;
  const response = await listInventoryByIdService(id);
  return (
    <div>
      <p className="text-2xl font-bold">{response.name}</p>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Codigo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Quantidade esperada</TableHead>
              <TableHead>Quantidade contada</TableHead>
              <TableHead>Diferença</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.inventoryItems.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>{item.product.code}</TableCell>
                <TableCell>{item.product.description}</TableCell>
                <TableCell>{item.stockExpected}</TableCell>
                <TableCell>{item.stockCounted}</TableCell>
                <TableCell>{item.difference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
