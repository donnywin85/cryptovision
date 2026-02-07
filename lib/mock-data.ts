import type {
  Asset,
  Portfolio,
  MarketData,
  AIInsight,
  SentimentIndicator,
  RebalanceSuggestion,
  RiskMetrics,
} from "@/types";

// --- Sparkline Generator ---
// Generates 168 data points (7 days * 24 hours) with realistic price fluctuations
function generateSparkline(basePrice: number, volatility: number): number[] {
  const points: number[] = [];
  let price = basePrice * (1 - volatility * 0.5 + Math.random() * volatility);

  for (let i = 0; i < 168; i++) {
    const change = (Math.random() - 0.48) * volatility * basePrice * 0.01;
    price = Math.max(price + change, basePrice * 0.85);
    price = Math.min(price, basePrice * 1.15);
    points.push(parseFloat(price.toFixed(2)));
  }

  return points;
}

// --- 30-day Price History Generator ---
function generatePriceHistory(
  basePrice: number,
  volatility: number
): number[] {
  const points: number[] = [];
  let price = basePrice * (1 - volatility * 0.3 + Math.random() * volatility * 0.6);

  for (let i = 0; i < 30; i++) {
    const dailyChange = (Math.random() - 0.47) * volatility * basePrice * 0.03;
    price = Math.max(price + dailyChange, basePrice * 0.7);
    price = Math.min(price, basePrice * 1.3);
    points.push(parseFloat(price.toFixed(2)));
  }

  return points;
}

// --- Mock Holdings ---
const btcSparkline = generateSparkline(96500, 0.04);
const ethSparkline = generateSparkline(3450, 0.05);
const usdcSparkline = generateSparkline(1.0, 0.001);
const linkSparkline = generateSparkline(22.8, 0.07);
const adaSparkline = generateSparkline(0.92, 0.06);

export const mockAssets: Asset[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    amount: 2.5,
    buyPrice: 42000,
    buyDate: "2023-06-15",
    currentPrice: 96500,
    value: 241250,
    change24h: 2.34,
    change7d: 5.12,
    sparkline7d: { price: btcSparkline },
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    amount: 15,
    buyPrice: 2200,
    buyDate: "2023-09-22",
    currentPrice: 3450,
    value: 51750,
    change24h: 1.87,
    change7d: 3.45,
    sparkline7d: { price: ethSparkline },
  },
  {
    id: "usd-coin",
    symbol: "usdc",
    name: "USD Coin",
    amount: 50000,
    buyPrice: 1.0,
    buyDate: "2024-01-10",
    currentPrice: 1.0,
    value: 50000,
    change24h: 0.01,
    change7d: 0.02,
    sparkline7d: { price: usdcSparkline },
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    amount: 1000,
    buyPrice: 14.5,
    buyDate: "2023-11-05",
    currentPrice: 22.8,
    value: 22800,
    change24h: -1.23,
    change7d: 4.56,
    sparkline7d: { price: linkSparkline },
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    amount: 5000,
    buyPrice: 0.45,
    buyDate: "2024-03-18",
    currentPrice: 0.92,
    value: 4600,
    change24h: 3.45,
    change7d: -2.18,
    sparkline7d: { price: adaSparkline },
  },
];

// --- Mock Portfolio ---
export const mockPortfolio: Portfolio = {
  totalValue: mockAssets.reduce((sum, asset) => sum + asset.value, 0),
  totalChange24h: 2.15,
  assets: mockAssets,
};

// --- 30-Day Price Histories ---
export const mockPriceHistories: Record<string, number[]> = {
  bitcoin: generatePriceHistory(96500, 0.04),
  ethereum: generatePriceHistory(3450, 0.05),
  "usd-coin": generatePriceHistory(1.0, 0.001),
  chainlink: generatePriceHistory(22.8, 0.07),
  cardano: generatePriceHistory(0.92, 0.06),
};

// --- Mock Market Data ---
export const mockMarketData: MarketData[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 96500,
    market_cap: 1893000000000,
    total_volume: 42500000000,
    price_change_percentage_24h: 2.34,
    sparkline_in_7d: { price: btcSparkline },
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3450,
    market_cap: 415000000000,
    total_volume: 18700000000,
    price_change_percentage_24h: 1.87,
    sparkline_in_7d: { price: ethSparkline },
  },
  {
    id: "usd-coin",
    symbol: "usdc",
    name: "USD Coin",
    image: "https://assets.coingecko.com/coins/images/6319/large/usdc.png",
    current_price: 1.0,
    market_cap: 44000000000,
    total_volume: 8200000000,
    price_change_percentage_24h: 0.01,
    sparkline_in_7d: { price: usdcSparkline },
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink.png",
    current_price: 22.8,
    market_cap: 14200000000,
    total_volume: 1100000000,
    price_change_percentage_24h: -1.23,
    sparkline_in_7d: { price: linkSparkline },
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.92,
    market_cap: 32500000000,
    total_volume: 980000000,
    price_change_percentage_24h: 3.45,
    sparkline_in_7d: { price: adaSparkline },
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 198.5,
    market_cap: 92000000000,
    total_volume: 5400000000,
    price_change_percentage_24h: 4.12,
    sparkline_in_7d: { price: generateSparkline(198.5, 0.06) },
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 8.45,
    market_cap: 11800000000,
    total_volume: 420000000,
    price_change_percentage_24h: -0.89,
    sparkline_in_7d: { price: generateSparkline(8.45, 0.06) },
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/avalanche.png",
    current_price: 42.3,
    market_cap: 16700000000,
    total_volume: 780000000,
    price_change_percentage_24h: 1.56,
    sparkline_in_7d: { price: generateSparkline(42.3, 0.07) },
  },
];

// --- Mock AI Insights ---
export const mockAIInsights: AIInsight[] = [
  {
    id: "insight-1",
    type: "bullish",
    title: "Bitcoin Breaking Resistance",
    description:
      "BTC has broken above the $95,000 resistance level with strong volume, suggesting a potential continuation toward $100,000. On-chain metrics show accumulation by long-term holders.",
    sentiment: "positive",
    confidence: 0.85,
  },
  {
    id: "insight-2",
    type: "neutral",
    title: "Ethereum Network Upgrade Impact",
    description:
      "The upcoming Ethereum protocol upgrade could increase staking yields by 0.5-1%. Market is pricing in minimal disruption, but volatility may increase around the upgrade date.",
    sentiment: "neutral",
    confidence: 0.72,
  },
  {
    id: "insight-3",
    type: "bearish",
    title: "LINK Faces Short-term Pressure",
    description:
      "Chainlink is showing bearish divergence on the 4h RSI. A retest of the $20 support level is likely before any meaningful recovery. Consider reducing exposure temporarily.",
    sentiment: "negative",
    confidence: 0.68,
  },
  {
    id: "insight-4",
    type: "alert",
    title: "Portfolio Concentration Warning",
    description:
      "Your portfolio has 65% allocation in Bitcoin. Consider diversifying to reduce single-asset risk. Current Sharpe ratio could improve by 0.15 with better allocation balance.",
    sentiment: "neutral",
    confidence: 0.91,
  },
  {
    id: "insight-5",
    type: "bullish",
    title: "Cardano Ecosystem Growth",
    description:
      "ADA DeFi TVL has grown 34% in the past 30 days. Increased developer activity and upcoming governance features signal strong fundamentals for mid-term price appreciation.",
    sentiment: "positive",
    confidence: 0.76,
  },
];

// --- Mock Sentiment Indicators ---
export const mockSentiment: SentimentIndicator[] = [
  {
    coinId: "bitcoin",
    sentiment: "positive",
    score: 78,
    summary: "Strong institutional buying and ETF inflows driving bullish sentiment.",
  },
  {
    coinId: "ethereum",
    sentiment: "positive",
    score: 65,
    summary: "Network upgrades and increasing DeFi activity maintaining positive outlook.",
  },
  {
    coinId: "usd-coin",
    sentiment: "neutral",
    score: 50,
    summary: "Stablecoin maintaining peg as expected. No significant sentiment shift.",
  },
  {
    coinId: "chainlink",
    sentiment: "negative",
    score: 38,
    summary: "Short-term selling pressure after recent rally. CCIP adoption remains strong.",
  },
  {
    coinId: "cardano",
    sentiment: "positive",
    score: 62,
    summary: "Governance rollout and DeFi growth driving cautiously optimistic sentiment.",
  },
];

// --- Mock Rebalance Suggestions ---
export const mockRebalanceSuggestions: RebalanceSuggestion[] = [
  {
    fromAsset: "Bitcoin",
    toAsset: "Ethereum",
    percentage: 5,
    reason:
      "Reduce BTC concentration from 65% to 60%. ETH shows stronger risk-adjusted returns over the next quarter based on network activity metrics.",
  },
  {
    fromAsset: "USD Coin",
    toAsset: "Solana",
    percentage: 3,
    reason:
      "Deploy idle stablecoin capital into SOL during its current momentum phase. DeFi TVL growth on Solana suggests continued ecosystem expansion.",
  },
  {
    fromAsset: "Bitcoin",
    toAsset: "Cardano",
    percentage: 2,
    reason:
      "Small allocation to ADA ahead of governance milestones. Risk-reward ratio favorable at current price levels with upcoming catalyst.",
  },
];

// --- Mock Risk Metrics ---
export const mockRiskMetrics: RiskMetrics = {
  sharpeRatio: 1.2,
  volatility: 0.35,
  maxDrawdown: -0.18,
  beta: 1.15,
};
