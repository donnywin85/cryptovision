"use client";

import { useState, useEffect, useCallback } from "react";
import type { Portfolio, Asset, PriceData } from "@/types";
import { fetchPrices } from "@/lib/api";
import { mockAssets, mockPortfolio } from "@/lib/mock-data";

interface UsePortfolioReturn {
  portfolio: Portfolio;
  isLoading: boolean;
  error: string | null;
}

interface HoldingDefinition {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  buyDate: string;
}

const holdings: HoldingDefinition[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", amount: 2.5, buyPrice: 42000, buyDate: "2023-06-15" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", amount: 15, buyPrice: 2200, buyDate: "2023-09-22" },
  { id: "usd-coin", symbol: "usdc", name: "USD Coin", amount: 50000, buyPrice: 1.0, buyDate: "2024-01-10" },
  { id: "chainlink", symbol: "link", name: "Chainlink", amount: 1000, buyPrice: 14.5, buyDate: "2023-11-05" },
  { id: "cardano", symbol: "ada", name: "Cardano", amount: 5000, buyPrice: 0.45, buyDate: "2024-03-18" },
];

function buildPortfolio(priceMap: Map<string, PriceData>): Portfolio {
  const assets: Asset[] = holdings.map((h) => {
    const priceData = priceMap.get(h.id);
    const currentPrice = priceData?.current_price ?? 0;
    const value = h.amount * currentPrice;
    const change24h = priceData?.price_change_percentage_24h ?? 0;

    return {
      id: h.id,
      symbol: h.symbol,
      name: h.name,
      amount: h.amount,
      buyPrice: h.buyPrice,
      buyDate: h.buyDate,
      currentPrice,
      value,
      change24h,
      change7d: 0,
      sparkline7d: priceData?.sparkline_in_7d ?? { price: [] },
    };
  });

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);

  // Weighted average 24h change
  const totalChange24h =
    totalValue > 0
      ? assets.reduce((sum, a) => sum + a.change24h * (a.value / totalValue), 0)
      : 0;

  return { totalValue, totalChange24h, assets };
}

export function usePortfolio(): UsePortfolioReturn {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = useCallback(async () => {
    const ids = holdings.map((h) => h.id);

    try {
      const prices = await fetchPrices(ids);
      const priceMap = new Map<string, PriceData>();
      for (const p of prices) {
        priceMap.set(p.id, p);
      }
      const built = buildPortfolio(priceMap);
      setPortfolio(built);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load portfolio";
      setError(message);
      // Fall back to mock portfolio
      setPortfolio({
        totalValue: mockAssets.reduce((sum, a) => sum + a.value, 0),
        totalChange24h: 2.15,
        assets: mockAssets,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadPortfolio();

    // Poll every 60 seconds
    const interval = setInterval(() => {
      loadPortfolio();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadPortfolio]);

  return { portfolio, isLoading, error };
}
