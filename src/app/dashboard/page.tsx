import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      DashboardPage
      <Link
        href="/dashboard/product"
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Listar Produtos
      </Link>
    </div>
  );
}
