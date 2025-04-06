import { ExtendedMarketData, InvestmentOption } from '@/types/comparison';

const API_KEY = 'dW7ZovQdr3jh35yrsmZrY0X2QizDIRQM';
const STOCK_API_BASE_URL = 'https://api.marketstack.com/v1';

// Helper to fetch stock data from external API
export async function fetchStockData(symbol: string): Promise<any> {
  try {
    const response = await fetch(`${STOCK_API_BASE_URL}/eod?access_key=${API_KEY}&symbols=${symbol}.XNSE&limit=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

// Fetch local stock data from our JSON file
export async function fetchLocalStockData(): Promise<InvestmentOption[]> {
  try {
    const response = await fetch('/stock_data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    const data = await response.json();
    return data.map((stock: any) => ({
      id: stock.id,
      name: stock.name,
      type: 'Stock',
      symbol: stock.symbol,
      category: stock.category,
      platform: stock.platform,
      price: stock.price,
      sector: stock.sector,
      ...mapExtendedMarketData(stock)
    }));
  } catch (error) {
    console.error('Error fetching local stock data:', error);
    return [];
  }
}

// Fetch local mutual fund data from our JSON file
export async function fetchLocalMutualFundData(): Promise<InvestmentOption[]> {
  try {
    const response = await fetch('/mutual_fund_data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch mutual fund data');
    }
    const data = await response.json();
    return data.map((fund: any) => ({
      id: fund.id,
      name: fund.name,
      type: 'Mutual Fund',
      category: fund.category,
      platform: fund.platform,
      nav: fund.nav,
      minInvestment: fund.minInvestment,
      fundManager: fund.fundManager,
      fundHouse: fund.fundHouse,
      ...mapExtendedMarketData(fund)
    }));
  } catch (error) {
    console.error('Error fetching local mutual fund data:', error);
    return [];
  }
}

// Map the raw data to our ExtendedMarketData format
function mapExtendedMarketData(data: any): ExtendedMarketData {
  return {
    oneMonthReturn: data.oneMonthReturn,
    threeMonthReturn: data.threeMonthReturn,
    sixMonthReturn: data.sixMonthReturn,
    oneYearReturn: data.oneYearReturn,
    threeYearReturn: data.threeYearReturn,
    fiveYearReturn: data.fiveYearReturn,
    volatility: data.volatility,
    maxDrawdown: data.maxDrawdown,
    sharpeRatio: data.sharpeRatio,
    expense: data.expense || 0,
    entryLoad: data.entryLoad || '0%',
    exitLoad: data.exitLoad || '0%',
    taxEfficiency: data.taxEfficiency,
    trustScore: data.trustScore,
    recommendation: data.recommendation,
    returnForecast: data.returnForecast,
    riskLevel: data.riskLevel
  };
}

// Fetch all investment options for comparison
export async function fetchAllInvestmentOptions(): Promise<InvestmentOption[]> {
  const stocks = await fetchLocalStockData();
  const mutualFunds = await fetchLocalMutualFundData();
  
  return [...stocks, ...mutualFunds];
} 