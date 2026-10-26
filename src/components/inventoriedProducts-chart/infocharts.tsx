"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

interface InfoChartsProps {
  totalProducts: number;
  productsOutdatedBy30Days: number;
}
export const description = "A radial chart with a custom shape";
const chartConfig = {
  inventoriedProducts: {
    label: "Inventariados nos últimos 30 dias",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface ChartDataProps {
  inventoriedProducts: number;
  percentInventoriedProducts: number;
  fill: string;
}

export default function InfoCharts({
  totalProducts,
  productsOutdatedBy30Days,
}: InfoChartsProps) {
  let chartData: ChartDataProps[] = [];
  const percent =
    totalProducts > 0 ? (productsOutdatedBy30Days / totalProducts) * 100 : 0;
  chartData = [
    {
      inventoriedProducts: productsOutdatedBy30Days,
      percentInventoriedProducts: Number(percent.toFixed(1)),
      fill: "var(--color-inventoriedProducts)",
    },
  ];
  return (
    <div className="w-44">
      <ChartContainer config={chartConfig} className="min-h-[160px] w-full">
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius={48}
          outerRadius={72}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[66, 56]}
          />
          <RadialBar dataKey="percentInventoriedProducts" background />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            tickLine={false}
            axisLine={false}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {chartData[0].inventoriedProducts.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Inventariados
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}
