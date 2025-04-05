'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';

// Mock data for portfolio
const portfolioData = {
  totalValue: 254680.45,
  totalGain: 32450.75,
  gainPercentage: 14.6,
  platforms: [
    {
      name: 'Zerodha',
      value: 125680.25,
      gain: 12450.75,
      gainPercentage: 11.2,
    },
    {
      name: 'MF Central',
      value: 85000.20,
      gain: 15000.00,
      gainPercentage: 21.4,
    },
    {
      name: 'Angel One',
      value: 44000.00,
      gain: 5000.00,
      gainPercentage: 12.8,
    }
  ],
  holdings: [
    {
      id: 1,
      name: 'HDFC Small Cap Fund',
      type: 'Mutual Fund',
      platform: 'MF Central',
      units: 450.256,
      nav: 58.25,
      value: 26227.41,
      gain: 8227.41,
      gainPercentage: 45.7,
      trustScore: 4.5,
      riskLevel: 'medium',
      returnForecast: 12.5,
    },
    {
      id: 2,
      name: 'Reliance Industries',
      type: 'Stock',
      platform: 'Zerodha',
      units: 15,
      nav: 2480.50,
      value: 37207.50,
      gain: 7207.50,
      gainPercentage: 24.0,
      trustScore: 4.8,
      riskLevel: 'low',
      returnForecast: 10.2,
    },
    {
      id: 3,
      name: 'ICICI Prudential Technology Fund',
      type: 'Mutual Fund',
      platform: 'MF Central',
      units: 1200.125,
      nav: 32.75,
      value: 39304.09,
      gain: 9304.09,
      gainPercentage: 31.0,
      trustScore: 3.9,
      riskLevel: 'high',
      returnForecast: 18.5,
    },
    {
      id: 4,
      name: 'TATA Motors',
      type: 'Stock',
      platform: 'Angel One',
      units: 40,
      nav: 650.75,
      value: 26030.00,
      gain: 10030.00,
      gainPercentage: 62.7,
      trustScore: 4.2,
      riskLevel: 'medium',
      returnForecast: 15.8,
    },
  ]
};

// Define types for platform and holding data display
interface PlatformCardProps {
  name: string;
  value: number;
  gain: number;
  gainPercentage?: number;
}

interface HoldingCardProps {
  id: string;
  name: string;
  type: string;
  platform: string;
  units: number;
  nav: number;
  value: number;
  gain: number;
  riskLevel: string;
  expectedReturn: number;
}

// Components
const PortfolioSummary = ({ totalValue, totalGain, platforms, gainPercentage }: { 
  totalValue: number; 
  totalGain: number; 
  platforms: string[];
  gainPercentage: number;
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 shadow-lg text-white opacity-0 translate-y-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold">Portfolio Summary</h2>
        <Link href="/trade">
          <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            + Add Investment
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Total Value</p>
          <p className="text-2xl font-bold">₹{totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Total Gain</p>
          <p className="text-2xl font-bold text-green-300">
            +₹{totalGain.toLocaleString(undefined, { maximumFractionDigits: 2 })} (+{Number(gainPercentage).toLocaleString(undefined, { maximumFractionDigits: 2 })}%)
          </p>
        </div>
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Platforms</p>
          <p className="text-xl font-bold">{platforms.length}</p>
        </div>
      </div>
    </div>
  );
};

const PlatformCards = ({ platforms }: { platforms: PlatformCardProps[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8">
      {platforms.map((platform, index) => (
        <div
          key={platform.name}
          className="bg-white rounded-xl p-5 shadow-md border border-gray-100 opacity-0 translate-y-4 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-800">{platform.name}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              Platform
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">₹{platform.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          <p className={`text-sm ${platform.gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {platform.gain > 0 ? '+' : ''}₹{platform.gain.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({platform.gain > 0 ? '+' : ''}{platform.gainPercentage ? Number(platform.gainPercentage).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00'}%)
          </p>
        </div>
      ))}
    </div>
  );
};

const HoldingCard = ({ 
  id, 
  name, 
  value, 
  gain, 
  riskLevel, 
  expectedReturn,
  type,
  platform,
  units,
  nav
}: HoldingCardProps) => {
  // Function to get risk level color
  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 opacity-0 translate-y-4 animate-fade-in-up">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-blue-800">{name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {type}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {platform}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${getRiskColor(riskLevel)} mr-1`}></div>
          <span className="text-xs font-medium">{riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-3">
        <div>
          <p className="text-xs text-black">Units</p>
          <p className="font-medium">{units.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</p>
        </div>
        <div>
          <p className="text-xs text-black">NAV/Price</p>
          <p className="font-medium">₹{nav.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-xs text-black">Value</p>
          <p className="font-medium">₹{value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-xs text-black">Gain</p>
          <p className={`font-medium ${gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {gain > 0 ? '+' : ''}₹{gain.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-gray-700">
        <div>
          <p className="text-xs mb-1">Trust Score</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xs">
                {star <= Math.floor(4.5) ? '★' : '☆'}
                {star === Math.floor(4.5) && 4.5 % 1 >= 0.5 && '½'}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-blue-800">
          Expected Return: <span className="font-medium">{expectedReturn}%</span>
        </p>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Link href={`/trade/${id}`} className="flex-1">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors duration-200">
            Trade
          </button>
        </Link>
        <Link href={`/compare?ids=${id}`} className="flex-1">
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg text-sm transition-colors duration-200">
            Compare
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { portfolioData } = usePortfolio();

  useEffect(() => {
    // Add animation classes
    document.querySelectorAll('.animate-fade-in-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, i * 100);
    });
  }, []);

  // Calculate total gain percentage
  const gainPercentage = useMemo(() => {
    return portfolioData.totalValue > 0 
      ? (portfolioData.totalGain / portfolioData.totalValue) * 100 
      : 0;
  }, [portfolioData.totalGain, portfolioData.totalValue]);

  // Format platforms data
  const platformsData = useMemo(() => {
    const platforms: Record<string, PlatformCardProps> = {};
    
    // Group holdings by platform
    portfolioData.holdings.forEach(holding => {
      if (!platforms[holding.platform]) {
        platforms[holding.platform] = {
          name: holding.platform,
          value: 0,
          gain: 0,
          gainPercentage: 0
        };
      }
      platforms[holding.platform].value += holding.value;
      platforms[holding.platform].gain += holding.gain;
    });
    
    // Calculate gain percentages
    Object.values(platforms).forEach(platform => {
      platform.gainPercentage = platform.value > 0 
        ? (platform.gain / platform.value) * 100 
        : 0;
    });
    
    return Object.values(platforms);
  }, [portfolioData.holdings]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your investments.</p>
      </div>
      
      <PortfolioSummary 
        totalValue={portfolioData.totalValue} 
        totalGain={portfolioData.totalGain} 
        platforms={portfolioData.platforms} 
        gainPercentage={gainPercentage}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Platforms</h2>
        <PlatformCards platforms={platformsData} />
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Holdings</h2>
          <div className="flex space-x-2">
            <Link href="/compare" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
              Compare Investments →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {portfolioData.holdings.map((holding) => (
            <HoldingCard 
              key={holding.id} 
              id={holding.id.toString()} 
              name={holding.name} 
              value={holding.value} 
              gain={holding.gain}
              riskLevel={holding.riskLevel} 
              expectedReturn={8.5}
              type={holding.type}
              platform={holding.platform}
              units={holding.units}
              nav={holding.nav}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 