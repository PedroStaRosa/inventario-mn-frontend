import TableProducts from "./_components/tableProdcts";
import Link from "next/link";

export default function ProductPage() {
  return (
    <>
      <Link
        href="/dashboard"
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Voltar
      </Link>
      <TableProducts />
    </>
  );
}
