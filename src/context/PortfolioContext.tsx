'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our portfolio data
export interface Holding {
  id: number;
  name: string;
  category: string;
  type: string;
  platform: string;
  units: number;
  nav: number;
  value: number;
  gain: number;
  riskLevel: string;
  minInvestment?: number;
  lotSize?: number;
}

export interface Platform {
  id: number;
  name: string;
  value: number;
  gain: number;
}

export interface PortfolioData {
  totalValue: number;
  totalGain: number;
  holdings: Holding[];
  platforms: string[];
}

interface TradeParams {
  id: number;
  units: number;
  tradeType: 'buy' | 'sell';
  price: number;
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateHolding: (id: number, data: Partial<Holding>) => void;
  executeTrade: (params: TradeParams) => boolean;
}

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Initial portfolio data
const initialPortfolioData: PortfolioData = {
  totalValue: 125840,
  totalGain: 12450,
  platforms: ['Groww', 'Zerodha', 'Kuvera', 'Coin'],
  holdings: [
    {
      id: 1,
      name: 'HDFC Small Cap Fund',
      category: 'Equity',
      type: 'Mutual Fund',
      platform: 'Groww',
      units: 152.45,
      nav: 125.75,
      value: 19170.69,
      gain: 3250.45,
      riskLevel: 'high',
      minInvestment: 500
    },
    {
      id: 2,
      name: 'Reliance Industries',
      category: 'Equity',
      type: 'Stock',
      platform: 'Zerodha',
      units: 10,
      nav: 2450.50,
      value: 24505,
      gain: 1250.30,
      riskLevel: 'medium',
      lotSize: 1
    },
    {
      id: 3,
      name: 'ICICI Prudential Technology Fund',
      category: 'Equity',
      type: 'Mutual Fund',
      platform: 'Coin',
      units: 85.32,
      nav: 210.35,
      value: 17947.05,
      gain: 3542.75,
      riskLevel: 'high',
      minInvestment: 1000
    },
    {
      id: 4,
      name: 'TATA Motors',
      category: 'Equity',
      type: 'Stock',
      platform: 'Zerodha',
      units: 15,
      nav: 825.25,
      value: 12378.75,
      gain: -548.25,
      riskLevel: 'high',
      lotSize: 1
    },
    {
      id: 5,
      name: 'SBI Liquid Fund',
      category: 'Debt',
      type: 'Mutual Fund',
      platform: 'Groww',
      units: 452.32,
      nav: 34.85,
      value: 15763.35,
      gain: 865.45,
      riskLevel: 'low',
      minInvestment: 500
    },
    {
      id: 6,
      name: 'Digital Gold',
      category: 'Gold',
      type: 'Gold',
      platform: 'Kuvera',
      units: 25.5,
      nav: 6250,
      value: 15937.5,
      gain: 2450.75,
      riskLevel: 'medium'
    },
    {
      id: 7,
      name: 'US Stocks ETF',
      category: 'Equity',
      type: 'ETF',
      platform: 'Groww',
      units: 42.8,
      nav: 475.60,
      value: 20355.68,
      gain: 1650.85,
      riskLevel: 'medium',
      minInvestment: 0
    }
  ]
};

// Provider component
export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);

  // Load portfolio data from localStorage if available (for persistence)
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing portfolio data:', error);
      }
    }
  }, []);

  // Save portfolio data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Function to update a holding
  const updateHolding = (id: number, data: Partial<Holding>) => {
    setPortfolioData(prevData => {
      const updatedHoldings = prevData.holdings.map(holding => {
        if (holding.id === id) {
          const updatedHolding = { ...holding, ...data };
          // Recalculate value if units or nav changed
          if (data.units || data.nav) {
            updatedHolding.value = updatedHolding.units * updatedHolding.nav;
          }
          return updatedHolding;
        }
        return holding;
      });

      // Recalculate total value and gain
      const totalValue = updatedHoldings.reduce((sum, holding) => sum + holding.value, 0);
      const totalGain = updatedHoldings.reduce((sum, holding) => sum + holding.gain, 0);

      return {
        ...prevData,
        holdings: updatedHoldings,
        totalValue,
        totalGain
      };
    });
  };

  // Function to execute a trade (buy or sell)
  const executeTrade = ({ id, units, tradeType, price }: TradeParams): boolean => {
    try {
      setPortfolioData(prevData => {
        const holdingIndex = prevData.holdings.findIndex(h => h.id === id);
        
        if (holdingIndex === -1) {
          throw new Error('Holding not found');
        }
        
        const holding = prevData.holdings[holdingIndex];
        const updatedHoldings = [...prevData.holdings];
        
        if (tradeType === 'buy') {
          // For buying, add units
          const newUnits = holding.units + units;
          const tradeValue = units * price;
          const avgPrice = ((holding.units * holding.nav) + tradeValue) / newUnits;
          const newValue = newUnits * avgPrice;
          const newGain = holding.gain; // Gain doesn't change immediately on buy
          
          updatedHoldings[holdingIndex] = {
            ...holding,
            units: newUnits,
            nav: avgPrice,
            value: newValue,
            gain: newGain
          };
        } else {
          // For selling, reduce units
          if (units > holding.units) {
            throw new Error('Cannot sell more units than owned');
          }
          
          const newUnits = holding.units - units;
          const tradeValue = units * price;
          const soldCost = units * holding.nav;
          const tradeProfitLoss = tradeValue - soldCost;
          
          // If selling all units, remove the holding
          if (newUnits === 0) {
            updatedHoldings.splice(holdingIndex, 1);
          } else {
            // Otherwise update the holding
            const newValue = newUnits * holding.nav;
            const newGain = holding.gain + tradeProfitLoss;
            
            updatedHoldings[holdingIndex] = {
              ...holding,
              units: newUnits,
              value: newValue,
              gain: newGain
            };
          }
        }
        
        // Recalculate total value and gain
        const totalValue = updatedHoldings.reduce((sum, h) => sum + h.value, 0);
        const totalGain = updatedHoldings.reduce((sum, h) => sum + h.gain, 0);
        
        return {
          ...prevData,
          holdings: updatedHoldings,
          totalValue,
          totalGain
        };
      });
      
      return true;
    } catch (error) {
      console.error('Error executing trade:', error);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updateHolding, executeTrade }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Hook for using the context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}; 