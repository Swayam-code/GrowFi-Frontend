'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for portfolio
const portfolioData = {
  totalValue: 254680.45,
  totalGain: 32450.75,
  gainPercentage: 14.6,
  returnThisMonth: 4.2,
  totalHoldings: 12,
  valueByAssetClass: [
    { name: 'Equity', value: 152808.27, percentage: 60 },
    { name: 'Debt', value: 50936.09, percentage: 20 },
    { name: 'Gold', value: 25468.05, percentage: 10 },
    { name: 'Others', value: 25468.05, percentage: 10 }
  ],
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
      category: 'Equity',
      platform: 'MF Central',
      units: 450.256,
      nav: 58.25,
      value: 26227.41,
      investedAmount: 18000.00,
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
      category: 'Equity',
      platform: 'Zerodha',
      units: 15,
      nav: 2480.50,
      value: 37207.50,
      investedAmount: 30000.00,
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
      category: 'Equity',
      platform: 'MF Central',
      units: 1200.125,
      nav: 32.75,
      value: 39304.09,
      investedAmount: 30000.00,
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
      category: 'Equity',
      platform: 'Angel One',
      units: 40,
      nav: 650.75,
      value: 26030.00,
      investedAmount: 16000.00,
      gain: 10030.00,
      gainPercentage: 62.7,
      trustScore: 4.2,
      riskLevel: 'medium',
      returnForecast: 15.8,
    },
    {
      id: 5,
      name: 'SBI Liquid Fund',
      type: 'Mutual Fund',
      category: 'Debt',
      platform: 'MF Central',
      units: 15.423,
      nav: 3301.25,
      value: 50911.18,
      investedAmount: 48000.00,
      gain: 2911.18,
      gainPercentage: 6.1,
      trustScore: 4.6,
      riskLevel: 'low',
      returnForecast: 5.2,
    },
    {
      id: 6,
      name: 'Digital Gold',
      type: 'Gold',
      category: 'Gold',
      platform: 'Zerodha',
      units: 10.00,
      nav: 5000.00,
      value: 50000.00,
      investedAmount: 45000.00,
      gain: 5000.00,
      gainPercentage: 11.1,
      trustScore: 4.3,
      riskLevel: 'low',
      returnForecast: 8.0,
    },
    {
      id: 7,
      name: 'US Stocks ETF',
      type: 'ETF',
      category: 'Others',
      platform: 'Angel One',
      units: 250.00,
      nav: 100.00,
      value: 25000.00,
      investedAmount: 22000.00,
      gain: 3000.00,
      gainPercentage: 13.6,
      trustScore: 4.0,
      riskLevel: 'medium',
      returnForecast: 11.5,
    },
  ]
};

const PortfolioSummary = ({ data }: { data: any }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 shadow-lg text-white opacity-0 translate-y-4 animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Portfolio Overview</h2>
        <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          + Add Investment
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <p className="text-blue-100 mb-1">This Month</p>
          <p className="text-2xl font-bold text-green-300">+{data.returnThisMonth}%</p>
        </div>
        <div className="bg-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-100 mb-1">Holdings</p>
          <p className="text-2xl font-bold">{data.totalHoldings}</p>
        </div>
      </div>
    </div>
  );
};

const AssetAllocation = ({ data }: { data: any[] }) => {
  const colors = ["#3B82F6", "#A855F7", "#F59E0B", "#10B981"];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h3 className="font-bold text-blue-800 mb-4">Asset Allocation</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              // Calculate the slice
              const startAngle = index === 0 ? 0 : data.slice(0, index).reduce((sum, d) => sum + d.percentage, 0);
              const endAngle = startAngle + item.percentage;
              
              // Convert to coordinates
              const startCoord = {
                x: 50 + 40 * Math.cos(2 * Math.PI * (startAngle / 100)),
                y: 50 + 40 * Math.sin(2 * Math.PI * (startAngle / 100))
              };
              const endCoord = {
                x: 50 + 40 * Math.cos(2 * Math.PI * (endAngle / 100)), 
                y: 50 + 40 * Math.sin(2 * Math.PI * (endAngle / 100))
              };
              
              // Create path
              const largeArcFlag = item.percentage > 50 ? 1 : 0;
              const path = [
                `M 50 50`,
                `L ${startCoord.x} ${startCoord.y}`,
                `A 40 40 0 ${largeArcFlag} 1 ${endCoord.x} ${endCoord.y}`,
                'Z'
              ].join(' ');
              
              return (
                <path
                  key={item.name}
                  d={path}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }}></div>
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">₹{item.value.toLocaleString()} ({item.percentage}%)</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Link href="/analytics" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Detailed Analytics →
        </Link>
      </div>
    </div>
  );
};

const HoldingsList = ({ holdings }: { holdings: any[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Equity', 'Debt', 'Gold', 'Others'];
  
  const filteredHoldings = selectedCategory === 'All' 
    ? holdings 
    : holdings.filter(h => h.category === selectedCategory);
  
  return (
    <div className="mt-8 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Holdings</h3>
        
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHoldings.map((holding) => (
                <tr key={holding.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{holding.name}</div>
                        <div className="text-xs text-gray-500">{holding.platform}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      holding.category === 'Equity' ? 'bg-blue-100 text-blue-800' :
                      holding.category === 'Debt' ? 'bg-green-100 text-green-800' :
                      holding.category === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {holding.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {holding.units.toFixed(holding.type === 'Stock' ? 0 : 3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{holding.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${holding.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.gain >= 0 ? '+' : ''}₹{holding.gain.toLocaleString()} ({holding.gain >= 0 ? '+' : ''}{holding.gainPercentage}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        holding.riskLevel === 'low' ? 'bg-green-500' :
                        holding.riskLevel === 'medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-gray-500">
                        {holding.riskLevel.charAt(0).toUpperCase() + holding.riskLevel.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/trade/${holding.id}`}>
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">Trade</button>
                      </Link>
                      <Link href={`/compare?ids=${holding.id}`}>
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">Compare</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  useEffect(() => {
    // Add animation classes
    document.querySelectorAll('.animate-fade-in-up').forEach((el) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, 100);
    });
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <PortfolioSummary data={portfolioData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <AssetAllocation data={portfolioData.valueByAssetClass} />
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 opacity-0 translate-y-4 animate-fade-in-up"
              style={{ animationDelay: `${150 + index * 50}ms` }}
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
                <Link href={`/analytics?platform=${platform.name}`}>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                    View Details →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <HoldingsList holdings={portfolioData.holdings} />
    </div>
  );
} 