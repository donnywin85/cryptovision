"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animated-counter";
import { mockPortfolio as defaultPortfolio } from "@/lib/mock-data";
import type { Portfolio } from "@/types";

interface PortfolioHeroProps {
  portfolio?: Portfolio;
}

export function PortfolioHero({ portfolio = defaultPortfolio }: PortfolioHeroProps) {
  const isPositive = portfolio.totalChange24h >= 0;

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">Total Portfolio Value</p>
          <AnimatedCounter
            value={portfolio.totalValue}
            className="text-4xl font-bold tracking-tight text-zinc-100"
          />
        </div>
        <div
          className={`flex items-center gap-1 text-lg font-semibold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="h-5 w-5" />
          ) : (
            <ArrowDownRight className="h-5 w-5" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {portfolio.totalChange24h.toFixed(2)}%
          </span>
          <span className="text-sm font-normal text-zinc-500">24h</span>
        </div>
      </CardContent>
    </Card>
  );
}
