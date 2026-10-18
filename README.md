# GrowFi - Investment Portfolio Manager

GrowFi is a modern web application built with Next.js, TypeScript, and Tailwind CSS that helps users manage and optimize their investment portfolios across multiple platforms including Zerodha, MF Central, and Angel One.

## Features

- **Unified Dashboard**: View all your investments in one place with detailed analytics
- **AI-Powered Insights**: Get personalized recommendations and risk assessments
- **Portfolio Comparison**: Compare different funds and stocks side by side with an expanded dataset of 90+ Indian stocks and mutual funds
- **Trade Execution**: Buy, sell, or set up SIPs directly from the platform
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Animations**: CSS Transitions and Animations
- **Data**: Comprehensive Indian stock and mutual fund data (both real and simulated)
- **Authentication**: JWT-based authentication (simulated for demo)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Swayam-code/GrowFi-Frontend.git
   cd GrowFi-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
GrowFi-Frontend/
├── public/                     # Static assets
│   ├── mutual_fund_data.json   # Comprehensive mutual fund dataset
│   ├── stock_data.json         # Indian stock market data
│   └── ...                     # Icons and other assets
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── compare/            # Fund comparison page
│   │   ├── dashboard/          # Main portfolio dashboard
│   │   ├── login/              # Authentication pages
│   │   ├── signup/             # User registration
│   │   ├── trade/              # Buy/Sell execution
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable UI components
│   └── styles/                 # Global styles
├── fetch_fmp_stocks.js         # Script to fetch and generate Indian stock data
├── tailwind.config.ts          # Tailwind CSS configuration
└── next.config.ts              # Next.js configuration
```

## Data Assets

The application includes comprehensive data for financial analysis:

- **Indian Stocks**: 90+ stocks across large cap, mid cap, and small cap segments with detailed metrics
- **Mutual Funds**: Large dataset of mutual funds with performance history, ratings, and fund manager details
- **Comparison Tools**: Advanced filtering and side-by-side comparison capabilities

### Expanding the Dataset

To add more financial data, you can run the included data fetching script:

```bash
node fetch_fmp_stocks.js
```

This will attempt to fetch real-time data for Indian stocks or generate realistic mock data when API data isn't available.

## Demo Access

Use the following credentials to access the demo:
- **Email**: demo@example.com
- **Password**: any password will work

## Planned Features

- Real API integration with financial platforms
- User profile management and preferences
- Advanced portfolio analysis with historical data
- Mobile app version with React Native

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Financial data is both real (when available) and simulated for demonstration purposes
- Icons provided by Heroicons
- Uses Financial Modeling Prep API for some market data

## Server credential setup

Copy `.env.example` to `.env.local`. Configure `MARKETSTACK_API_KEY` for live stock comparisons and `GEMINI_API_KEY` for AI chat/insights in the Next.js server environment, then redeploy. Remove `NEXT_PUBLIC_GEMINI_API_KEY` from deployment settings: public environment variables are bundled into browser JavaScript. Browser code now calls fixed local API routes; neither key is sent to the browser. Routes return generic provider failures without upstream error bodies.

The standalone stock-data generator reads `FMP_API_KEY` from the shell environment. It does not load `.env.local`; export that variable before running `node fetch_fmp_stocks.js`. Missing configuration stops the generator before any provider requests.

Rotate the committed key used in both the Marketstack service and FMP generator in the corresponding provider account(s). Rotate any Gemini key previously deployed using `NEXT_PUBLIC_GEMINI_API_KEY`, even if it was never committed. Old Git history and published browser bundles remain exposed after this fix. The Gemini route streams at most 50 KB of JSON and limits prompts to 40,000 characters; upstream requests time out. Routes apply a modest per-instance fixed-window cap (20 AI requests/minute; 30 stock requests/minute). These limits are shared by users of one instance and reset on restart; configure deployment authentication and gateway-wide rate/usage controls before exposing paid credentials publicly.
