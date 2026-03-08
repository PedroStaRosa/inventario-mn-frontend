import TableProducts from "./_components/tableProdcts";
import Link from "next/link";
import CreateProductDialog from "./_components/createProductDialog";
import { CreateManyProduct } from "./_components/createManyProduct";

export default function ProductPage() {
  return (
    <>
      <div className="mb-4">
        {" "}
        <Link
          href="/dashboard"
          className="text-sm hover:text-gray-700 bg-primary text-white px-4 py-2 rounded-md"
        >
          Voltar
        </Link>
      </div>

      <CreateProductDialog />
      <CreateManyProduct />
      <TableProducts />
    </>
  );
}
