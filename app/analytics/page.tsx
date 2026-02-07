import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PerformanceChart } from "@/components/performance-chart";
import { CorrelationHeatmap } from "@/components/correlation-heatmap";
import { RiskMetrics } from "@/components/risk-metrics";

export const metadata: Metadata = {
  title: "Analytics | CryptoVision",
  description: "Deep dive into your portfolio performance, risk metrics, and asset correlations.",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
          Analytics
        </h2>
        <p className="text-sm text-zinc-500">
          Deep dive into your portfolio performance and risk metrics.
        </p>
      </div>

      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5" style={{ animationDelay: "100ms" }}>
        <CardHeader>
          <CardTitle className="text-zinc-100">Portfolio Performance</CardTitle>
          <CardDescription className="text-zinc-500">
            30-day portfolio value trend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceChart />
        </CardContent>
      </Card>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: "200ms" }}>
        <h3 className="mb-4 text-lg font-semibold text-zinc-100">Risk Metrics</h3>
        <RiskMetrics />
      </div>

      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5" style={{ animationDelay: "300ms" }}>
        <CardHeader>
          <CardTitle className="text-zinc-100">Asset Correlation</CardTitle>
          <CardDescription className="text-zinc-500">
            How your assets move relative to each other
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CorrelationHeatmap />
        </CardContent>
      </Card>
    </div>
  );
}
