// Extended market data for detailed comparisons
export interface ExtendedMarketData {
  oneMonthReturn?: number;
  threeMonthReturn?: number;
  sixMonthReturn?: number;
  oneYearReturn?: number;
  threeYearReturn?: number;
  fiveYearReturn?: number;
  volatility?: string;
  maxDrawdown?: string;
  sharpeRatio?: number;
  expense?: number;
  entryLoad?: string;
  exitLoad?: string;
  taxEfficiency?: string;
  trustScore?: number;
  recommendation?: boolean;
  returnForecast?: number;
  riskLevel?: string;
}

// Stock-specific information
export interface StockDetails {
  symbol?: string;
  price?: number;
  marketCap?: number;
  pe?: number;
  pb?: number;
  dividend?: number;
  eps?: number;
  beta?: number;
  lotSize?: number;
  exchange?: string;
  industry?: string;
  sector?: string;
  ceo?: string;
}

// Mutual Fund-specific information
export interface MutualFundDetails {
  nav?: number;
  aum?: number;
  minInvestment?: number;
  fundManager?: string;
  fundHouse?: string;
  benchmark?: string;
  inceptionDate?: string;
}

// Base investment option interface
export interface InvestmentOption extends Partial<ExtendedMarketData>, Partial<StockDetails>, Partial<MutualFundDetails> {
  id: number;
  name: string;
  type: string;
  category: string;
  platform: string;
}

// Comparison metric structure
export interface ComparisonMetric {
  id: string;
  label: string;
  isHeader?: boolean;
  category?: string;
}

// Interface for a grouped set of comparison items
export interface ComparisonGroup {
  label: string;
  metrics: ComparisonMetric[];
}

// Section visibility state
export interface SectionVisibility {
  [key: string]: boolean;
} 