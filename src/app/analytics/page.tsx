'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock data for analytics
const analyticsData = {
  historicalPerformance: [
    { month: 'Jan', value: 200000 },
    { month: 'Feb', value: 210000 },
    { month: 'Mar', value: 205000 },
    { month: 'Apr', value: 220000 },
    { month: 'May', value: 215000 },
    { month: 'Jun', value: 230000 },
    { month: 'Jul', value: 240000 },
    { month: 'Aug', value: 235000 },
    { month: 'Sep', value: 245000 },
    { month: 'Oct', value: 250000 },
    { month: 'Nov', value: 248000 },
    { month: 'Dec', value: 254680 }
  ],
  returns: {
    oneMonth: 2.7,
    threeMonths: 3.95,
    sixMonths: 10.73,
    oneYear: 27.34,
    threeYears: 42.5
  },
  portfolioByRisk: [
    { risk: 'Low', percentage: 40, value: 101872.18 },
    { risk: 'Medium', percentage: 45, value: 114606.20 },
    { risk: 'High', percentage: 15, value: 38202.07 }
  ],
  performanceByPlatform: [
    { 
      name: 'Zerodha', 
      returns: [8.2, 9.5, 12.4, 10.8, 11.2, 13.5] 
    },
    { 
      name: 'MF Central', 
      returns: [7.5, 10.2, 15.6, 18.5, 20.1, 21.4] 
    },
    { 
      name: 'Angel One', 
      returns: [6.8, 8.5, 10.2, 9.8, 11.5, 12.8] 
    }
  ],
  topPerformers: [
    {
      id: 4,
      name: 'TATA Motors',
      type: 'Stock',
      platform: 'Angel One',
      gainPercentage: 62.7
    },
    {
      id: 1,
      name: 'HDFC Small Cap Fund',
      type: 'Mutual Fund',
      platform: 'MF Central',
      gainPercentage: 45.7
    },
    {
      id: 3,
      name: 'ICICI Prudential Technology Fund',
      type: 'Mutual Fund',
      platform: 'MF Central',
      gainPercentage: 31.0
    }
  ],
  assetClassPerformance: [
    { name: 'Equity', returns: [5.2, 8.5, 12.4, 15.8, 24.5, 32.8] },
    { name: 'Debt', returns: [2.1, 3.5, 5.6, 6.2, 7.1, 6.1] },
    { name: 'Gold', returns: [3.5, 4.2, 5.8, 7.9, 9.5, 11.1] },
    { name: 'Others', returns: [4.8, 7.5, 9.2, 10.5, 12.8, 13.6] }
  ]
};

const PerformanceChart = ({ data }: { data: any[] }) => {
  // Find min and max values for chart scaling
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;
  
  // Calculate percentages for chart heights
  const calculateHeight = (value: number) => {
    return ((value - minValue) / range) * 80 + 20; // min height 20%
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up">
      <h3 className="font-bold text-blue-800 mb-4">Portfolio Performance (12 Months)</h3>
      
      <div className="mt-6">
        <div className="flex h-64 items-end space-x-2">
          {data.map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm relative group"
                style={{ height: `${calculateHeight(item.value)}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹{item.value.toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div>
          <div className="text-sm text-gray-600">Starting Value</div>
          <div className="font-bold">₹{data[0].value.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Growth</div>
          <div className="font-bold text-green-600">
            +{((data[data.length - 1].value - data[0].value) / data[0].value * 100).toFixed(2)}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Current Value</div>
          <div className="font-bold">₹{data[data.length - 1].value.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

const ReturnMetrics = ({ data }: { data: any }) => {
  const timeframes = [
    { key: 'oneMonth', label: '1M' },
    { key: 'threeMonths', label: '3M' },
    { key: 'sixMonths', label: '6M' },
    { key: 'oneYear', label: '1Y' },
    { key: 'threeYears', label: '3Y' }
  ];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h3 className="font-bold text-blue-800 mb-4">Return Metrics</h3>
      
      <div className="grid grid-cols-5 gap-4">
        {timeframes.map((timeframe) => (
          <div key={timeframe.key} className="text-center">
            <div className={`text-lg font-bold ${data[timeframe.key] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data[timeframe.key] >= 0 ? '+' : ''}{data[timeframe.key]}%
            </div>
            <div className="text-xs text-gray-500 mt-1">{timeframe.label}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="text-sm text-gray-600">
          Your portfolio has <span className="font-medium text-green-600">outperformed</span> the market by 5.2% over the last year.
        </div>
      </div>
    </div>
  );
};

const RiskDistribution = ({ data }: { data: any[] }) => {
  const colors = {
    Low: '#10B981', // green
    Medium: '#F59E0B', // yellow/amber
    High: '#EF4444' // red
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
      <h3 className="font-bold text-blue-800 mb-4">Portfolio by Risk Level</h3>
      
      <div className="flex justify-center mb-6">
        <div className="w-40 h-40 relative">
          <svg viewBox="0 0 100 100">
            {data.map((item, index) => {
              // Calculate starting position
              const startPos = index === 0 ? 0 : data.slice(0, index).reduce((sum, d) => sum + d.percentage, 0);
              const endPos = startPos + item.percentage;
              
              // Convert to radians for path calculation
              const startAngle = (startPos / 100) * 2 * Math.PI - (Math.PI / 2);
              const endAngle = (endPos / 100) * 2 * Math.PI - (Math.PI / 2);
              
              const x1 = 50 + 40 * Math.cos(startAngle);
              const y1 = 50 + 40 * Math.sin(startAngle);
              const x2 = 50 + 40 * Math.cos(endAngle);
              const y2 = 50 + 40 * Math.sin(endAngle);
              
              const largeArc = item.percentage > 50 ? 1 : 0;
              
              return (
                <path
                  key={item.risk}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[item.risk as keyof typeof colors]}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.risk} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors[item.risk as keyof typeof colors] }}
              ></div>
              <span className="text-sm">{item.risk} Risk</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">₹{item.value.toLocaleString()}</span>
              <span className="text-sm text-gray-500">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4 text-sm">
        <p className="text-gray-600">
          Your portfolio has a <span className="font-medium">balanced risk profile</span>. Consider our AI insights for optimizing your risk-adjusted returns.
        </p>
        <Link href="/insights" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
          Get AI Recommendations →
        </Link>
      </div>
    </div>
  );
};

const PlatformComparison = ({ data }: { data: any[] }) => {
  const timeframes = ['1M', '3M', '6M', '1Y', '2Y', '3Y'];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h3 className="font-bold text-blue-800 mb-4">Performance by Platform</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
              {timeframes.map((timeframe) => (
                <th key={timeframe} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {timeframe}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((platform) => (
              <tr key={platform.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {platform.name}
                </td>
                {platform.returns.map((returnValue: number, index: number) => (
                  <td key={index} className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`${returnValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {returnValue >= 0 ? '+' : ''}{returnValue}%
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">MF Central</span> has been your best performing platform in the last year.
        </p>
      </div>
    </div>
  );
};

const TopPerformers = ({ data }: { data: any[] }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
      <h3 className="font-bold text-blue-800 mb-4">Top Performers</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{item.platform}</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-green-600">+{item.gainPercentage}%</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, item.gainPercentage)}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Link href="/compare" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Compare Top Performers →
        </Link>
      </div>
    </div>
  );
};

const AssetClassComparison = ({ data }: { data: any[] }) => {
  const timeframes = ['1M', '3M', '6M', '1Y', '2Y', '3Y'];
  const colors = {
    Equity: '#3B82F6',
    Debt: '#10B981',
    Gold: '#F59E0B',
    Others: '#A855F7'
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <h3 className="font-bold text-blue-800 mb-4">Asset Class Comparison</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Asset Class</th>
              {timeframes.map((timeframe) => (
                <th key={timeframe} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {timeframe}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((assetClass) => (
              <tr key={assetClass.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: colors[assetClass.name as keyof typeof colors] }}
                    ></div>
                    <span className="text-sm font-medium">{assetClass.name}</span>
                  </div>
                </td>
                {assetClass.returns.map((returnValue: number, index: number) => (
                  <td key={index} className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`${returnValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {returnValue >= 0 ? '+' : ''}{returnValue}%
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Equity</span> has been the best performing asset class over all time periods.
        </p>
      </div>
    </div>
  );
};

export default function Analytics() {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform');
  
  useEffect(() => {
    // Animate elements on load
    document.querySelectorAll('.animate-fade-in-up').forEach((el) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, 100);
    });
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 shadow-lg text-white opacity-0 translate-y-4 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Analytics</h1>
            {platform && (
              <p className="text-blue-100 mt-1">Filtered by platform: {platform}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Link href="/insights">
              <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50">
                View AI Insights
              </button>
            </Link>
            <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Export Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart data={analyticsData.historicalPerformance} />
        </div>
        <div>
          <ReturnMetrics data={analyticsData.returns} />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskDistribution data={analyticsData.portfolioByRisk} />
        <TopPerformers data={analyticsData.topPerformers} />
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6">
        <PlatformComparison data={analyticsData.performanceByPlatform} />
        <AssetClassComparison data={analyticsData.assetClassPerformance} />
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-blue-800">AI Analysis Summary</h3>
            <p className="mt-1 text-sm text-blue-600">
              Your portfolio is well-diversified with a balanced risk profile. The equity component has been the main growth driver. 
              Consider increasing allocation to small-cap funds for potentially higher returns, but be mindful of the increased volatility.
              Check our AI insights for a detailed analysis and personalized recommendations.
            </p>
            <div className="mt-4">
              <Link href="/insights">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Get Personalized Insights
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 