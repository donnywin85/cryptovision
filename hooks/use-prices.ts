"use client";

import { useState, useEffect, useCallback } from "react";
import type { PriceData } from "@/types";
import { fetchPrices } from "@/lib/api";
import { mockMarketData } from "@/lib/mock-data";

interface UsePricesReturn {
  prices: PriceData[];
  isLoading: boolean;
  error: string | null;
}

function getMockPrices(ids: string[]): PriceData[] {
  return mockMarketData
    .filter((m) => ids.includes(m.id))
    .map((m) => ({
      id: m.id,
      symbol: m.symbol,
      current_price: m.current_price,
      price_change_percentage_24h: m.price_change_percentage_24h,
      sparkline_in_7d: m.sparkline_in_7d,
    }));
}

export function usePrices(ids: string[]): UsePricesReturn {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPrices = useCallback(async () => {
    if (ids.length === 0) {
      setPrices([]);
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchPrices(ids);
      setPrices(data);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch prices";
      setError(message);
      // Fall back to mock data
      setPrices(getMockPrices(ids));
    } finally {
      setIsLoading(false);
    }
  }, [ids]);

  useEffect(() => {
    setIsLoading(true);
    loadPrices();

    // Poll every 60 seconds
    const interval = setInterval(() => {
      loadPrices();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadPrices]);

  return { prices, isLoading, error };
}
