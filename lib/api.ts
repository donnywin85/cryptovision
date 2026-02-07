import type { PriceData, MarketData } from "@/types";

interface CoinGeckoPriceEntry {
  usd: number;
  usd_24h_change: number;
}

interface CoinGeckoPriceResponse {
  [id: string]: CoinGeckoPriceEntry;
}

interface CoinGeckoMarketEntry {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export async function fetchPrices(ids: string[]): Promise<PriceData[]> {
  const joinedIds = ids.join(",");
  const res = await fetch(
    `/api/prices?ids=${encodeURIComponent(joinedIds)}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch prices: ${res.status}`);
  }

  const data: CoinGeckoPriceResponse = await res.json();

  return Object.entries(data).map(([id, entry]) => ({
    id,
    symbol: id,
    current_price: entry.usd,
    price_change_percentage_24h: entry.usd_24h_change,
    sparkline_in_7d: { price: [] },
  }));
}

export async function fetchMarketData(ids: string[]): Promise<MarketData[]> {
  const joinedIds = ids.join(",");
  const res = await fetch(
    `/api/markets?ids=${encodeURIComponent(joinedIds)}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch market data: ${res.status}`);
  }

  const data: CoinGeckoMarketEntry[] = await res.json();

  return data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
    current_price: coin.current_price,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    sparkline_in_7d: {
      price: coin.sparkline_in_7d?.price ?? [],
    },
  }));
}
