'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

// Components
const PortfolioSummary = ({ data }: { data: any }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 shadow-lg text-white opacity-0 translate-y-4 animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Portfolio Summary</h2>
        <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          + Add Investment
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Total Value</p>
          <p className="text-2xl font-bold">₹{data.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Total Gain</p>
          <p className="text-2xl font-bold text-green-300">
            +₹{data.totalGain.toLocaleString()} (+{data.gainPercentage}%)
          </p>
        </div>
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Platforms</p>
          <p className="text-xl font-bold">{data.platforms.length}</p>
        </div>
      </div>
    </div>
  );
};

const PlatformCards = ({ platforms }: { platforms: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
          <p className="text-lg font-bold text-gray-800">₹{platform.value.toLocaleString()}</p>
          <p className={`text-sm ${platform.gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {platform.gain > 0 ? '+' : ''}₹{platform.gain.toLocaleString()} ({platform.gain > 0 ? '+' : ''}{platform.gainPercentage}%)
          </p>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
              View Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const HoldingCard = ({ holding, index }: { holding: any; index: number }) => {
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
    <div
      className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 opacity-0 translate-y-4 animate-fade-in-up"
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-blue-800">{holding.name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {holding.type}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {holding.platform}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${getRiskColor(holding.riskLevel)} mr-1`}></div>
          <span className="text-xs font-medium">{holding.riskLevel.charAt(0).toUpperCase() + holding.riskLevel.slice(1)} Risk</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-gray-500">Units</p>
          <p className="font-medium">{holding.units.toFixed(3)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">NAV/Price</p>
          <p className="font-medium">₹{holding.nav.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Value</p>
          <p className="font-medium">₹{holding.value.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Gain</p>
          <p className={`font-medium ${holding.gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {holding.gain > 0 ? '+' : ''}₹{holding.gain.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="mt-4 bg-blue-50 p-3 rounded-lg">
        <div className="flex justify-between mb-1">
          <p className="text-xs font-medium text-blue-700">ML Insights</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xs">
                {star <= Math.floor(holding.trustScore) ? '★' : '☆'}
                {star === Math.floor(holding.trustScore) && 
                  holding.trustScore % 1 >= 0.5 && '½'}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-blue-800">
          Expected Return: <span className="font-medium">{holding.returnForecast}%</span>
        </p>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Link href={`/trade/${holding.id}`} className="flex-1">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors duration-200">
            Trade
          </button>
        </Link>
        <Link href={`/compare?ids=${holding.id}`} className="flex-1">
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg text-sm transition-colors duration-200">
            Compare
          </button>
        </Link>
        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 p-2 rounded-lg text-sm transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  useEffect(() => {
    // Add animation classes
    document.querySelectorAll('.animate-fade-in-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, i * 100);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your investments.</p>
      </div>
      
      <PortfolioSummary data={portfolioData} />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Platforms</h2>
        <PlatformCards platforms={portfolioData.platforms} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.holdings.map((holding, index) => (
            <HoldingCard key={holding.id} holding={holding} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 