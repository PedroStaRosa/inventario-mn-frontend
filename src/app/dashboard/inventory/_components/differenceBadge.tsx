import { Badge } from "@/components/ui/badge";

export function DifferenceBadge({ difference }: { difference: string }) {
  const value = Number(difference);
  const isZero = Number.isFinite(value) && value === 0;
  const isPositive = Number.isFinite(value) && value > 0;

  return (
    <Badge
      variant={isZero ? "green" : isPositive ? "orange" : "red"}
      className="font-bold"
    >
      {isPositive ? `+${value}` : value}
    </Badge>
  );
}
