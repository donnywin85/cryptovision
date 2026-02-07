"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockAssets as defaultAssets } from "@/lib/mock-data";
import type { Asset } from "@/types";

const COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#38bdf8", "#fb923c"];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface DonutChartProps {
  assets?: Asset[];
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
    percentage: string;
  };
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (active && payload && payload.length > 0) {
    const data = payload[0];
    return (
      <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm shadow-lg">
        <p className="font-medium text-zinc-100">{data.payload.name}</p>
        <p className="text-zinc-400">
          {formatCurrency(data.value)} ({data.payload.percentage})
        </p>
      </div>
    );
  }
  return null;
}

export function PortfolioDonutChart({ assets = defaultAssets }: DonutChartProps) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const chartData = assets.map((asset) => ({
    name: `${asset.name} (${asset.symbol})`,
    value: asset.value,
    percentage: ((asset.value / totalValue) * 100).toFixed(1) + "%",
  }));

  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
      <div className="h-[250px] w-[250px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-3">
        {chartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-zinc-300">{entry.name}</span>
            <span className="font-medium text-zinc-100">{entry.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
