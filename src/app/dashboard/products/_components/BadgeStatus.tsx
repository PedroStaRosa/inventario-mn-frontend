import { Badge } from "@/components/ui/badge";
import {
  getInventoryStatus,
  getInventoryStatusLabel,
} from "@/lib/inventoryStatus";

const STATUS_BADGE_VARIANT = {
  ok: "green",
  overdue: "red",
  never: "orange",
} as const;

export const BadgeStatus = ({ date }: { date: Date | null }) => {
  const status = getInventoryStatus(date);

  return (
    <Badge variant={STATUS_BADGE_VARIANT[status]} className="font-bold">
      {getInventoryStatusLabel(date)}
    </Badge>
  );
};
