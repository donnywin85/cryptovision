"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function SparklineChart({
  data,
  color,
  width = 100,
  height = 32,
}: SparklineChartProps) {
  const isPositive = data.length >= 2 && data[data.length - 1] >= data[0];
  const strokeColor = color ?? (isPositive ? "#34d399" : "#f87171");

  const chartData = data.map((price, index) => ({ index, price }));

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
