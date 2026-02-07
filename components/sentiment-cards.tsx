"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockSentiment as defaultSentiments } from "@/lib/mock-data";
import type { SentimentIndicator, Sentiment } from "@/types";

const COIN_NAMES: Record<string, string> = {
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
  solana: "Solana",
  cardano: "Cardano",
  chainlink: "Chainlink",
};

function getSentimentConfig(sentiment: Sentiment) {
  switch (sentiment) {
    case "positive":
      return {
        icon: TrendingUp,
        label: "Bullish",
        badgeClass: "bg-emerald-400/10 text-emerald-400 border-none",
        progressClass: "[&>div]:bg-emerald-400",
      };
    case "negative":
      return {
        icon: TrendingDown,
        label: "Bearish",
        badgeClass: "bg-red-400/10 text-red-400 border-none",
        progressClass: "[&>div]:bg-red-400",
      };
    case "neutral":
      return {
        icon: Minus,
        label: "Neutral",
        badgeClass: "bg-amber-400/10 text-amber-400 border-none",
        progressClass: "[&>div]:bg-amber-400",
      };
  }
}

interface SentimentCardsProps {
  sentiments?: SentimentIndicator[];
}

export function SentimentCards({ sentiments = defaultSentiments }: SentimentCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sentiments.map((indicator) => {
        const config = getSentimentConfig(indicator.sentiment);
        const Icon = config.icon;
        const name = COIN_NAMES[indicator.coinId] ?? indicator.coinId;

        return (
          <Card key={indicator.coinId} className="border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-100">{name}</span>
                <Badge className={config.badgeClass}>
                  <Icon className="h-3 w-3" />
                  {config.label}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs leading-relaxed text-zinc-400">
                {indicator.summary}
              </p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Confidence</span>
                  <span className="font-medium text-zinc-300">{indicator.score}%</span>
                </div>
                <Progress
                  value={indicator.score}
                  className={`h-1.5 bg-zinc-800 ${config.progressClass}`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
