export interface SparklineData {
  price: number[];
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  buyDate: string;
  currentPrice: number;
  value: number;
  change24h: number;
  change7d: number;
  sparkline7d: SparklineData;
}

export interface Portfolio {
  totalValue: number;
  totalChange24h: number;
  assets: Asset[];
}

export interface PriceData {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: SparklineData;
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: SparklineData;
}

export interface RiskMetrics {
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
  beta: number;
}

export type InsightType = "bullish" | "bearish" | "neutral" | "alert";
export type Sentiment = "positive" | "negative" | "neutral";

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  sentiment: Sentiment;
  confidence: number;
}

export interface SentimentIndicator {
  coinId: string;
  sentiment: Sentiment;
  score: number;
  summary: string;
}

export interface RebalanceSuggestion {
  fromAsset: string;
  toAsset: string;
  percentage: number;
  reason: string;
}
