# CryptoVision

A real-time cryptocurrency portfolio dashboard with AI-powered insights, built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-3-ff7300?style=flat-square)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black?style=flat-square)

## Features

- **Portfolio Dashboard** - Real-time portfolio value tracking with animated counters and asset allocation donut chart
- **Holdings Table** - Detailed holdings view with 7-day sparkline charts, 24h change badges, and hover interactions
- **Analytics** - 30-day performance chart, risk metrics (Sharpe ratio, volatility, max drawdown, beta), and asset correlation heatmap
- **AI Insights** - AI-powered portfolio analysis, sentiment indicators per asset, and smart rebalancing suggestions
- **Responsive Design** - Desktop sidebar navigation with fixed bottom nav on mobile
- **Dark Theme** - Polished dark UI with consistent zinc color palette and indigo accents
- **Skeleton Loading** - Graceful loading states with skeleton placeholders for all data-dependent sections
- **Smooth Animations** - Entrance fade-in/slide-up animations with staggered delays, animated number counter, and hover effects

## Screenshots

![Dashboard](/screenshots/dashboard.png)
![Analytics](/screenshots/analytics.png)
![AI Insights](/screenshots/ai-insights.png)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cryptovision

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
cryptovision/
├── app/
│   ├── layout.tsx          # Root layout with sidebar, mobile nav, SEO metadata
│   ├── loading.tsx         # Page-level skeleton loading state
│   ├── page.tsx            # Dashboard page
│   ├── analytics/
│   │   └── page.tsx        # Analytics page with charts and risk metrics
│   ├── ai-insights/
│   │   └── page.tsx        # AI insights page with sentiment and suggestions
│   └── api/
│       ├── prices/route.ts # CoinGecko price proxy
│       └── markets/route.ts# CoinGecko market data proxy
├── components/
│   ├── ui/                 # shadcn/ui primitives (card, table, badge, etc.)
│   ├── animated-counter.tsx# Animated number count-up component
│   ├── correlation-heatmap.tsx
│   ├── holdings-table.tsx
│   ├── mobile-nav.tsx      # Mobile bottom navigation bar
│   ├── performance-chart.tsx
│   ├── portfolio-donut-chart.tsx
│   ├── portfolio-hero.tsx
│   ├── rebalance-suggestions.tsx
│   ├── risk-metrics.tsx
│   ├── sentiment-cards.tsx
│   ├── sidebar.tsx         # Desktop sidebar navigation
│   ├── skeletons.tsx       # Skeleton loading components
│   ├── sparkline-chart.tsx
│   └── top-movers.tsx
├── hooks/
│   ├── use-market-data.ts  # Market data hook with polling
│   ├── use-portfolio.ts    # Portfolio state hook with live pricing
│   └── use-prices.ts       # Price data hook with fallback to mock
├── lib/
│   ├── api.ts              # API client for CoinGecko proxy routes
│   ├── mock-data.ts        # Mock data for offline/demo mode
│   └── utils.ts            # Tailwind merge utility
└── types/
    └── index.ts            # TypeScript type definitions
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with tw-animate-css
- **Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts 3 (area, pie, line/sparkline)
- **Icons**: Lucide React
- **Data**: CoinGecko API with mock data fallback
