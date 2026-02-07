import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioHero } from "@/components/portfolio-hero";
import { PortfolioDonutChart } from "@/components/portfolio-donut-chart";
import { HoldingsTable } from "@/components/holdings-table";
import { TopMovers } from "@/components/top-movers";

export const metadata: Metadata = {
  title: "Dashboard | CryptoVision",
  description: "View your cryptocurrency portfolio overview with real-time data.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
          Dashboard
        </h2>
        <p className="text-sm text-zinc-500">
          Your cryptocurrency portfolio at a glance.
        </p>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: "100ms" }}>
        <PortfolioHero />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="text-zinc-100">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioDonutChart />
          </CardContent>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="text-zinc-100">Top Movers (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <TopMovers />
          </CardContent>
        </Card>
      </div>

      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5" style={{ animationDelay: "400ms" }}>
        <CardHeader>
          <CardTitle className="text-zinc-100">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <HoldingsTable />
        </CardContent>
      </Card>
    </div>
  );
}
