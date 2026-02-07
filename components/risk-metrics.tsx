"use client";

import { Shield, Activity, TrendingDown, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRiskMetrics as defaultRiskMetrics } from "@/lib/mock-data";
import type { RiskMetrics as RiskMetricsType } from "@/types";

interface MetricCardData {
  label: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function getMetricCards(metrics: RiskMetricsType): MetricCardData[] {
  // Handle both decimal (0.35) and percentage (35.0) formats for volatility/drawdown
  const volatilityPct = metrics.volatility <= 1 ? metrics.volatility * 100 : metrics.volatility;
  const drawdownPct = Math.abs(metrics.maxDrawdown) <= 1
    ? metrics.maxDrawdown * 100
    : metrics.maxDrawdown;

  return [
    {
      label: "Sharpe Ratio",
      value: metrics.sharpeRatio.toFixed(2),
      description: "Risk-adjusted return measure. Above 1.0 is good, above 2.0 is excellent.",
      icon: Shield,
      color: metrics.sharpeRatio >= 1.5 ? "text-emerald-400" : "text-amber-400",
    },
    {
      label: "Volatility",
      value: `${volatilityPct.toFixed(1)}%`,
      description: "Annualized standard deviation of returns. Lower means less price swing.",
      icon: Activity,
      color: volatilityPct <= 30 ? "text-emerald-400" : "text-amber-400",
    },
    {
      label: "Max Drawdown",
      value: `${drawdownPct.toFixed(1)}%`,
      description: "Largest peak-to-trough decline. Measures worst-case loss scenario.",
      icon: TrendingDown,
      color: drawdownPct >= -15 ? "text-emerald-400" : "text-red-400",
    },
    {
      label: "Beta",
      value: metrics.beta.toFixed(2),
      description: "Portfolio sensitivity to market. 1.0 = moves with market, >1 = more volatile.",
      icon: BarChart3,
      color: metrics.beta <= 1.0 ? "text-emerald-400" : "text-amber-400",
    },
  ];
}

interface RiskMetricsProps {
  metrics?: RiskMetricsType;
}

export function RiskMetrics({ metrics = defaultRiskMetrics }: RiskMetricsProps) {
  const cards = getMetricCards(metrics);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <card.icon className={`h-4 w-4 ${card.color}`} />
              {card.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="mt-1 text-xs text-zinc-500">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
