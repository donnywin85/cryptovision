"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAssets as defaultAssets } from "@/lib/mock-data";
import type { Asset } from "@/types";

interface TopMoversProps {
  assets?: Asset[];
}

export function TopMovers({ assets = defaultAssets }: TopMoversProps) {
  const sorted = [...assets].sort((a, b) => b.change24h - a.change24h);
  const topGainer = sorted[0];
  const topLoser = sorted[sorted.length - 1];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {topGainer && (
        <Card className="border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Top Gainer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-zinc-100">
                  {topGainer.name}
                </p>
                <p className="text-sm text-zinc-500">{topGainer.symbol}</p>
              </div>
              <Badge className="border-none bg-emerald-400/10 text-emerald-400">
                +{topGainer.change24h.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
      {topLoser && (
        <Card className="border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <TrendingDown className="h-4 w-4 text-red-400" />
              Top Loser
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-zinc-100">
                  {topLoser.name}
                </p>
                <p className="text-sm text-zinc-500">{topLoser.symbol}</p>
              </div>
              <Badge className="border-none bg-red-400/10 text-red-400">
                {topLoser.change24h.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
