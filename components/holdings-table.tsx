"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SparklineChart } from "@/components/sparkline-chart";
import { mockAssets as defaultAssets } from "@/lib/mock-data";
import type { Asset } from "@/types";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface HoldingsTableProps {
  assets?: Asset[];
}

export function HoldingsTable({ assets = defaultAssets }: HoldingsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-zinc-400">Coin</TableHead>
          <TableHead className="text-right text-zinc-400">Amount</TableHead>
          <TableHead className="text-right text-zinc-400">Price</TableHead>
          <TableHead className="text-right text-zinc-400">Value</TableHead>
          <TableHead className="text-right text-zinc-400">24h</TableHead>
          <TableHead className="text-right text-zinc-400">7d Chart</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id} className="border-zinc-800 transition-colors hover:bg-zinc-800/50">
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
                  {asset.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-zinc-100">{asset.name}</p>
                  <p className="text-xs text-zinc-500">{asset.symbol}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {asset.amount.toLocaleString()}
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {formatCurrency(asset.currentPrice)}
            </TableCell>
            <TableCell className="text-right font-medium text-zinc-100">
              {formatCurrency(asset.value)}
            </TableCell>
            <TableCell className="text-right">
              <Badge
                variant="outline"
                className={`border-none ${
                  asset.change24h >= 0
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {asset.change24h >= 0 ? "+" : ""}
                {asset.change24h.toFixed(1)}%
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                <SparklineChart data={asset.sparkline7d.price} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
