import { Separator } from "@/components/ui/separator";
import { parseDate } from "@/lib/parseDate";
import { DashboardResponse } from "@/types/apiResponse";

interface LastestInventoriesListProps {
  data: DashboardResponse["latestInventories"];
}

export function LastestInventoriesList({ data }: LastestInventoriesListProps) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={item.id} className="flex justify-between flex-col gap-1">
            <h2 className="text-sm font-bold">{item.name}</h2>
            <p className="text-xs text-muted-foreground">
              {parseDate(item.createdAt)} • {item.itemsCount} itens •{" "}
              {item.difference} diferenças
            </p>
            {index !== data.length - 1 && <Separator />}
          </div>
        );
      })}
    </>
  );
}
