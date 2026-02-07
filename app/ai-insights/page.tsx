import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentCards } from "@/components/sentiment-cards";
import { RebalanceSuggestions } from "@/components/rebalance-suggestions";

export const metadata: Metadata = {
  title: "AI Insights | CryptoVision",
  description: "AI-powered market analysis, sentiment indicators, and portfolio rebalancing suggestions.",
};

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-zinc-100">
          <Sparkles className="h-7 w-7 text-indigo-400" />
          AI Insights
        </h2>
        <p className="text-sm text-zinc-500">
          AI-powered market analysis and portfolio recommendations.
        </p>
      </div>

      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5" style={{ animationDelay: "100ms" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            Portfolio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-sm leading-relaxed text-zinc-300">
              Your portfolio is currently <strong className="text-emerald-400">well-positioned</strong> for
              the current market conditions. Bitcoin dominance remains strong at 68% of your holdings,
              which is slightly above the recommended allocation. The overall Sharpe ratio of 1.85
              indicates excellent risk-adjusted returns.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Key observations: Solana has been the standout performer with{" "}
              <strong className="text-emerald-400">+12.8% weekly gains</strong>, driven by increased
              developer activity and ecosystem growth. Cardano shows{" "}
              <strong className="text-red-400">weakness</strong> with -2.1% over 7 days. Consider
              the rebalancing suggestions below to optimize your risk-return profile.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Market sentiment is broadly <strong className="text-emerald-400">bullish</strong> with
              institutional inflows accelerating. On-chain metrics suggest accumulation patterns
              across major assets. The current portfolio volatility of 42.3% is within normal
              range for a crypto portfolio, but could be reduced through better diversification.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: "200ms" }}>
        <h3 className="mb-4 text-lg font-semibold text-zinc-100">
          Sentiment Indicators
        </h3>
        <SentimentCards />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: "300ms" }}>
        <h3 className="mb-4 text-lg font-semibold text-zinc-100">
          Rebalancing Suggestions
        </h3>
        <RebalanceSuggestions />
      </div>
    </div>
  );
}
