import { Separator } from "../ui/separator";

interface PageHeaderProps {
  title: string;
}
export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="w-full h-20 flex-col justify-center items-center hidden sm:flex gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Separator className="w-full bg-gray-300" />
    </header>
  );
}
