import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-2 items-center justify-center h-screen">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-2/4 bg-gray-200" />
        <span className="text-sm text-gray-500 animate-pulse text-center text-xl font-bold">
          Carregando dados...
        </span>
        <Skeleton className="h-4 w-3/4 bg-gray-200" />
      </div>
    </div>
  );
}
