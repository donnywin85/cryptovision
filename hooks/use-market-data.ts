"use client";

import { useState, useEffect, useCallback } from "react";
import type { MarketData } from "@/types";
import { fetchMarketData } from "@/lib/api";
import { mockMarketData } from "@/lib/mock-data";

const DEFAULT_IDS = [
  "bitcoin",
  "ethereum",
  "usd-coin",
  "chainlink",
  "cardano",
  "solana",
  "polkadot",
  "avalanche-2",
];

interface UseMarketDataReturn {
  markets: MarketData[];
  isLoading: boolean;
  error: string | null;
}

export function useMarketData(): UseMarketDataReturn {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMarkets = useCallback(async () => {
    try {
      const data = await fetchMarketData(DEFAULT_IDS);
      setMarkets(data);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch market data";
      setError(message);
      // Fall back to mock data
      setMarkets(mockMarketData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadMarkets();

    // Poll every 60 seconds
    const interval = setInterval(() => {
      loadMarkets();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadMarkets]);

  return { markets, isLoading, error };
}
