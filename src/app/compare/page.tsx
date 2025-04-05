'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';

// Additional comparison metrics and data
const comparisonMetrics = [
  { id: 'basicInfo', label: 'Basic Information', isHeader: true },
  { id: 'type', label: 'Type', category: 'basicInfo' },
  { id: 'category', label: 'Category', category: 'basicInfo' },
  { id: 'platform', label: 'Platform', category: 'basicInfo' },
  { id: 'returns', label: 'Returns', isHeader: true },
  { id: 'oneMonthReturn', label: '1M Return', category: 'returns' },
  { id: 'threeMonthReturn', label: '3M Return', category: 'returns' },
  { id: 'sixMonthReturn', label: '6M Return', category: 'returns' },
  { id: 'oneYearReturn', label: '1Y Return', category: 'returns' },
  { id: 'threeYearReturn', label: '3Y Return', category: 'returns' },
  { id: 'fiveYearReturn', label: '5Y Return', category: 'returns' },
  { id: 'risk', label: 'Risk Analysis', isHeader: true },
  { id: 'riskLevel', label: 'Risk Level', category: 'risk' },
  { id: 'volatility', label: 'Volatility', category: 'risk' },
  { id: 'maxDrawdown', label: 'Max Drawdown', category: 'risk' },
  { id: 'sharpeRatio', label: 'Sharpe Ratio', category: 'risk' },
  { id: 'costs', label: 'Costs & Fees', isHeader: true },
  { id: 'expense', label: 'Expense Ratio', category: 'costs' },
  { id: 'entryLoad', label: 'Entry Load', category: 'costs' },
  { id: 'exitLoad', label: 'Exit Load', category: 'costs' },
  { id: 'taxEfficiency', label: 'Tax Efficiency', category: 'costs' },
  { id: 'aiAnalysis', label: 'AI Analysis', isHeader: true },
  { id: 'trustScore', label: 'Trust Score', category: 'aiAnalysis' },
  { id: 'returnForecast', label: 'Return Forecast', category: 'aiAnalysis' },
  { id: 'recommendation', label: 'Recommendation', category: 'aiAnalysis' }
];

// Define a type for the extended market data
interface ExtendedMarketData {
  oneMonthReturn?: number;
  threeMonthReturn?: number;
  sixMonthReturn?: number;
  oneYearReturn?: number;
  threeYearReturn?: number;
  fiveYearReturn?: number;
  volatility?: string;
  maxDrawdown?: string;
  sharpeRatio?: number;
  entryLoad?: string;
  exitLoad?: string;
  taxEfficiency?: string;
  trustScore?: number;
  recommendation?: boolean;
  returnForecast?: number;
}

// Extended market data for comparison with proper type
const extendedMarketData: Record<number, ExtendedMarketData> = {
  // Map of ID to extended data
  1: {
    oneMonthReturn: 2.6,
    threeMonthReturn: 6.8,
    sixMonthReturn: 10.5,
    oneYearReturn: 16.5,
    threeYearReturn: 24.7,
    fiveYearReturn: 18.2,
    volatility: 'Medium',
    maxDrawdown: '-15.2%',
    sharpeRatio: 1.28,
    entryLoad: '0%',
    exitLoad: '1% (< 1 year)',
    taxEfficiency: 'High',
    trustScore: 4.5,
    recommendation: true,
    returnForecast: 15.8
  },
  2: {
    oneMonthReturn: 1.5,
    threeMonthReturn: 4.3,
    sixMonthReturn: 7.8,
    oneYearReturn: 10.2,
    threeYearReturn: 18.6,
    fiveYearReturn: 15.8,
    volatility: 'Low',
    maxDrawdown: '-12.1%',
    sharpeRatio: 1.42,
    entryLoad: '0%',
    exitLoad: '0%',
    taxEfficiency: 'Medium',
    trustScore: 4.2,
    recommendation: true,
    returnForecast: 12.5
  },
  3: {
    oneMonthReturn: 4.2,
    threeMonthReturn: 9.1,
    sixMonthReturn: 16.4,
    oneYearReturn: 31.0,
    threeYearReturn: 42.3,
    fiveYearReturn: 24.5,
    volatility: 'High',
    maxDrawdown: '-22.5%',
    sharpeRatio: 1.15,
    entryLoad: '0%',
    exitLoad: '1% (< 1 year)',
    taxEfficiency: 'Medium',
    trustScore: 3.8,
    recommendation: false,
    returnForecast: 21.2
  },
  4: {
    oneMonthReturn: 3.8,
    threeMonthReturn: 12.6,
    sixMonthReturn: 24.3,
    oneYearReturn: 62.7,
    threeYearReturn: 53.8,
    fiveYearReturn: 28.1,
    volatility: 'Very High',
    maxDrawdown: '-28.7%',
    sharpeRatio: 1.08,
    entryLoad: '0%',
    exitLoad: '0%',
    taxEfficiency: 'Low',
    trustScore: 3.5,
    recommendation: false,
    returnForecast: 36.5
  },
  5: {
    oneMonthReturn: 0.5,
    threeMonthReturn: 1.4,
    sixMonthReturn: 2.9,
    oneYearReturn: 6.1,
    threeYearReturn: 7.5,
    fiveYearReturn: 7.8,
    volatility: 'Very Low',
    maxDrawdown: '-1.8%',
    sharpeRatio: 1.65,
    entryLoad: '0%',
    exitLoad: '0%',
    taxEfficiency: 'Low',
    trustScore: 4.7,
    recommendation: true,
    returnForecast: 7.0
  },
  6: {
    oneMonthReturn: 0.9,
    threeMonthReturn: 2.8,
    sixMonthReturn: 5.7,
    oneYearReturn: 11.1,
    threeYearReturn: 8.5,
    fiveYearReturn: 9.8,
    volatility: 'Low',
    maxDrawdown: '-5.2%',
    sharpeRatio: 1.38,
    entryLoad: '0%',
    exitLoad: '0%',
    taxEfficiency: 'High',
    trustScore: 4.9,
    recommendation: true,
    returnForecast: 10.5
  },
  7: {
    oneMonthReturn: 2.1,
    threeMonthReturn: 5.9,
    sixMonthReturn: 8.3,
    oneYearReturn: 13.6,
    threeYearReturn: 22.5,
    fiveYearReturn: 19.6,
    volatility: 'Medium',
    maxDrawdown: '-18.4%',
    sharpeRatio: 1.22,
    entryLoad: '0%',
    exitLoad: '0.5% (< 6 months)',
    taxEfficiency: 'Medium',
    trustScore: 4.1,
    recommendation: true,
    returnForecast: 14.8
  }
};

// Popular investment options
const popularOptions = [
  { id: 1, name: 'HDFC Small Cap Fund', type: 'Mutual Fund' },
  { id: 2, name: 'Reliance Industries', type: 'Stock' },
  { id: 3, name: 'ICICI Prudential Technology Fund', type: 'Mutual Fund' },
  { id: 4, name: 'TATA Motors', type: 'Stock' },
  { id: 5, name: 'SBI Liquid Fund', type: 'Mutual Fund' },
  { id: 6, name: 'Digital Gold', type: 'Gold' },
  { id: 7, name: 'US Stocks ETF', type: 'ETF' },
  { id: 101, name: 'NIFTY Next 50 Index Fund', type: 'Index Fund' },
  { id: 102, name: 'Parag Parikh Flexi Cap Fund', type: 'Equity Fund' },
  { id: 103, name: 'SBI Corporate Bond Fund', type: 'Debt Fund' }
];

interface InvestmentItemProps {
  item: any;
  isSelected: boolean;
  onSelect: () => void;
}

const InvestmentItem = ({ item, isSelected, onSelect }: InvestmentItemProps) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-blue-800">{item.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 mt-1 inline-block">
            {item.type}
          </span>
        </div>
        {isSelected && (
          <span className="bg-blue-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

const ComparisonTable = ({ data, visibleSections }: { data: any[]; visibleSections: string[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 opacity-0 translate-y-4 animate-fade-in-up">
        <p className="text-center text-black">Please select investments to compare.</p>
      </div>
    );
  }

  // Combine holding data with extended market data
  const enhancedData = data.map(item => {
    const extendedData = extendedMarketData[item.id] || {};
    return { ...item, ...extendedData };
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-0 translate-y-4 animate-fade-in-up">
      <div className="p-6 bg-blue-700 text-white">
        <h2 className="text-xl font-bold">Detailed Comparison</h2>
        <p className="text-blue-100 text-sm mt-1">Compare investment options side by side</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-6 text-left text-sm font-medium text-blue-800 sticky left-0 bg-blue-50 z-10">Metrics</th>
              {enhancedData.map(item => (
                <th key={item.id} className="py-3 px-6 text-left text-sm font-medium text-blue-800">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonMetrics.map((metric, index) => {
              // Skip sections that aren't selected
              if (metric.isHeader && !visibleSections.includes(metric.id)) {
                return null;
              }
              
              // Skip metrics that don't belong to selected sections
              if (!metric.isHeader && metric.category && !visibleSections.includes(metric.category)) {
                return null;
              }
              
              return (
                <tr 
                  key={metric.id} 
                  className={`${
                    metric.isHeader 
                      ? 'bg-gray-100 font-medium'
                      : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b border-gray-100`}
                >
                  <td className={`py-3 px-6 text-sm ${metric.isHeader ? 'font-medium text-blue-800' : 'font-medium text-black'} sticky left-0 ${metric.isHeader ? 'bg-gray-100' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} z-10`}>
                    {metric.label}
                  </td>
                  
                  {enhancedData.map(item => (
                    <td key={`${item.id}-${metric.id}`} className="py-3 px-6 text-sm">
                      {metric.isHeader ? (
                        <span className="text-transparent">.</span>
                      ) : renderMetricValue(metric.id, item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-sm font-medium text-blue-800">AI Analysis Result</h3>
            <p className="text-xs text-black mt-1">Our AI suggests {getBestInvestment(enhancedData)} for your portfolio based on the comparison.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/portfolio">
              <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                View Portfolio
              </button>
            </Link>
            <Link href="/trade">
              <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                Invest Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine the best investment
const getBestInvestment = (data: any[]) => {
  if (data.length === 0) return "no investment";
  
  // Sort by return forecast and get the highest
  const sorted = [...data].sort((a, b) => (b.returnForecast || 0) - (a.returnForecast || 0));
  return sorted[0].name;
};

// Helper function to render different metric values appropriately
const renderMetricValue = (metricId: string, item: any) => {
  switch (metricId) {
    case 'type':
    case 'category':
    case 'platform':
    case 'volatility':
      return item[metricId] || '-';
    
    case 'trustScore':
      return item[metricId] ? (
        <div className="flex items-center">
          <span className="mr-2">{item[metricId]}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xs">
                {star <= Math.floor(item[metricId]) ? '★' : '☆'}
                {star === Math.floor(item[metricId]) && 
                  item[metricId] % 1 >= 0.5 && '½'}
              </span>
            ))}
          </div>
        </div>
      ) : '-';
    
    case 'riskLevel':
      return item[metricId] ? (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item[metricId] === 'low' ? 'bg-green-100 text-green-700' :
          item[metricId] === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {item[metricId].charAt(0).toUpperCase() + item[metricId].slice(1)}
        </span>
      ) : '-';
    
    case 'recommendation':
      return item.recommendation !== undefined ? (
        item.recommendation ? (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Recommended
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium w-fit">
            Neutral
          </span>
        )
      ) : '-';
    
    case 'oneMonthReturn':
    case 'threeMonthReturn':
    case 'sixMonthReturn':
    case 'oneYearReturn':
    case 'threeYearReturn':
    case 'fiveYearReturn':
    case 'returnForecast':
      return item[metricId] !== undefined ? (
        <span className={item[metricId] >= 0 ? 'text-green-600' : 'text-red-600'}>
          {item[metricId] >= 0 ? '+' : ''}{item[metricId]}%
        </span>
      ) : '-';
    
    case 'expense':
    case 'entryLoad':
    case 'exitLoad':
      return item[metricId] || '-';
    
    case 'maxDrawdown':
      return item[metricId] || '-';
    
    case 'sharpeRatio':
      return item[metricId] !== undefined ? (
        <span className={item[metricId] >= 1.0 ? 'text-green-600' : 'text-yellow-600'}>
          {item[metricId]}
        </span>
      ) : '-';
    
    case 'taxEfficiency':
      return item[metricId] ? (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item[metricId] === 'High' ? 'bg-green-100 text-green-700' :
          item[metricId] === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {item[metricId]}
        </span>
      ) : '-';
      
    default:
      return item[metricId] !== undefined ? item[metricId] : '-';
  }
};

export default function Compare() {
  const searchParams = useSearchParams();
  const { portfolioData } = usePortfolio();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>(['basicInfo', 'returns', 'risk', 'costs', 'aiAnalysis']);

  // Get the selected IDs from URL params
  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',').map(id => parseInt(id));
      setSelectedItems(ids);
    } else {
      // Default selections if no IDs provided
      setSelectedItems([1, 2, 3]);
    }
  }, [searchParams]);

  // Animations
  useEffect(() => {
    document.querySelectorAll('.animate-fade-in-up').forEach((el) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, 100);
    });
  }, []);

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      // Don't remove if only one item is selected
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter(item => item !== id));
      }
    } else {
      // Don't add more than 4 items
      if (selectedItems.length < 4) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const toggleSection = (sectionId: string) => {
    if (visibleSections.includes(sectionId)) {
      setVisibleSections(visibleSections.filter(id => id !== sectionId));
    } else {
      setVisibleSections([...visibleSections, sectionId]);
    }
  };

  // Filter comparison data based on selected items
  const filteredData = portfolioData.holdings.filter(item => selectedItems.includes(item.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Compare Investments</h1>
        <p className="text-gray-600">Compare different investment options side by side to make informed decisions.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-bold text-blue-800 mb-4">Select Investments</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Selected: {selectedItems.length}/4</p>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-1.5 bg-blue-600 rounded-full transition-all duration-300" 
                  style={{ width: `${(selectedItems.length / 4) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold text-gray-700">Your Holdings</p>
              {portfolioData.holdings.map(item => (
                <InvestmentItem 
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={() => handleSelectItem(item.id)}
                />
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-blue-800 mb-2">Visible Sections</h3>
              <div className="space-y-2">
                {comparisonMetrics.filter(m => m.isHeader).map(section => (
                  <div key={section.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`section-${section.id}`}
                      checked={visibleSections.includes(section.id)}
                      onChange={() => toggleSection(section.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                    <label htmlFor={`section-${section.id}`} className="ml-2 text-sm text-gray-700">
                      {section.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-blue-800 mb-2">Popular Options</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularOptions.map(item => (
                  <div 
                    key={item.id} 
                    className={`text-xs p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedItems.includes(item.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                    onClick={() => handleSelectItem(item.id)}
                  >
                    <p className="font-medium truncate">{item.name}</p>
                    <span className="text-gray-500 text-[10px]">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <ComparisonTable data={filteredData} visibleSections={visibleSections} />
          
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-800">Comparison Tips</h3>
                <p className="mt-1 text-xs text-black">
                  When comparing investments, consider your personal goals, time horizon, and risk tolerance. 
                  High returns often come with higher risk. Expense ratios directly affect your long-term returns.
                  For long-term investments, 3-5 year performance is more relevant than short-term fluctuations.
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="text-xs font-semibold text-blue-800">Returns</div>
                    <div className="text-[10px] text-black">Past performance is not a guarantee of future results.</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="text-xs font-semibold text-blue-800">Risks</div>
                    <div className="text-[10px] text-black">Look at volatility, drawdowns, and Sharpe ratio for a full picture.</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="text-xs font-semibold text-blue-800">Costs</div>
                    <div className="text-[10px] text-black">Even a 1% difference in expenses can significantly impact long-term returns.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 