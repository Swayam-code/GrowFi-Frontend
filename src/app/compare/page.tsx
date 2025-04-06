'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';
import { fetchAllInvestmentOptions } from '@/services/ComparisonService';
import { ComparisonMetric, InvestmentOption, SectionVisibility } from '@/types/comparison';

// Additional comparison metrics and data
const comparisonMetrics: ComparisonMetric[] = [
  { id: 'basicInfo', label: 'Basic Information', isHeader: true },
  { id: 'type', label: 'Type', category: 'basicInfo' },
  { id: 'category', label: 'Category', category: 'basicInfo' },
  { id: 'platform', label: 'Platform', category: 'basicInfo' },
  
  // Stock specific metrics
  { id: 'stockInfo', label: 'Stock Details', isHeader: true },
  { id: 'symbol', label: 'Symbol', category: 'stockInfo' },
  { id: 'price', label: 'Current Price', category: 'stockInfo' },
  { id: 'marketCap', label: 'Market Cap (Cr)', category: 'stockInfo' },
  { id: 'pe', label: 'P/E Ratio', category: 'stockInfo' },
  { id: 'pb', label: 'P/B Ratio', category: 'stockInfo' },
  { id: 'dividend', label: 'Dividend Yield (%)', category: 'stockInfo' },
  { id: 'eps', label: 'EPS (₹)', category: 'stockInfo' },
  { id: 'beta', label: 'Beta', category: 'stockInfo' },
  
  // Mutual Fund specific metrics
  { id: 'mfInfo', label: 'Mutual Fund Details', isHeader: true },
  { id: 'nav', label: 'NAV (₹)', category: 'mfInfo' },
  { id: 'aum', label: 'AUM (Cr)', category: 'mfInfo' },
  { id: 'minInvestment', label: 'Min Investment (₹)', category: 'mfInfo' },
  { id: 'fundManager', label: 'Fund Manager', category: 'mfInfo' },
  { id: 'fundHouse', label: 'Fund House', category: 'mfInfo' },
  { id: 'benchmark', label: 'Benchmark', category: 'mfInfo' },
  { id: 'inceptionDate', label: 'Inception Date', category: 'mfInfo' },
  
  // Return metrics - common for both
  { id: 'returns', label: 'Returns', isHeader: true },
  { id: 'oneMonthReturn', label: '1M Return (%)', category: 'returns' },
  { id: 'threeMonthReturn', label: '3M Return (%)', category: 'returns' },
  { id: 'sixMonthReturn', label: '6M Return (%)', category: 'returns' },
  { id: 'oneYearReturn', label: '1Y Return (%)', category: 'returns' },
  { id: 'threeYearReturn', label: '3Y Return (%)', category: 'returns' },
  { id: 'fiveYearReturn', label: '5Y Return (%)', category: 'returns' },
  
  // Risk metrics - common for both
  { id: 'risk', label: 'Risk Analysis', isHeader: true },
  { id: 'riskLevel', label: 'Risk Level', category: 'risk' },
  { id: 'volatility', label: 'Volatility', category: 'risk' },
  { id: 'maxDrawdown', label: 'Max Drawdown', category: 'risk' },
  { id: 'sharpeRatio', label: 'Sharpe Ratio', category: 'risk' },
  
  // Cost metrics - common for both but more relevant for MFs
  { id: 'costs', label: 'Costs & Fees', isHeader: true },
  { id: 'expense', label: 'Expense Ratio (%)', category: 'costs' },
  { id: 'entryLoad', label: 'Entry Load', category: 'costs' },
  { id: 'exitLoad', label: 'Exit Load', category: 'costs' },
  { id: 'taxEfficiency', label: 'Tax Efficiency', category: 'costs' },
  
  // AI Analysis - common for both
  { id: 'aiAnalysis', label: 'AI Analysis', isHeader: true },
  { id: 'trustScore', label: 'Trust Score', category: 'aiAnalysis' },
  { id: 'returnForecast', label: 'Return Forecast (%)', category: 'aiAnalysis' },
  { id: 'recommendation', label: 'Recommendation', category: 'aiAnalysis' }
];

interface InvestmentItemProps {
  item: InvestmentOption;
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
          {item.category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 mt-1 ml-1 inline-block">
              {item.category}
            </span>
          )}
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

const ComparisonTable = ({ data, visibleSections }: { data: InvestmentOption[]; visibleSections: SectionVisibility }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 opacity-0 translate-y-4 animate-fade-in-up">
        <p className="text-center text-gray-500">Please select investments to compare.</p>
      </div>
    );
  }

  const getBestInvestment = (metricId: string, data: InvestmentOption[]) => {
    if (metricId === 'maxDrawdown') {
      // For max drawdown, smaller (less negative) is better
      return data.reduce((prev, current) => {
        const prevVal = typeof prev[metricId] === 'string' ? parseFloat(prev[metricId]?.replace('%', '') || '0') : (prev[metricId] || 0);
        const currVal = typeof current[metricId] === 'string' ? parseFloat(current[metricId]?.replace('%', '') || '0') : (current[metricId] || 0);
        return currVal > prevVal ? current : prev;
      });
    } else if (['expense', 'volatility'].includes(metricId)) {
      // For these metrics, lower is better
      return data.reduce((prev, current) => {
        return (current[metricId] || 0) < (prev[metricId] || 0) ? current : prev;
      });
    } else {
      // For other metrics, higher is better
      return data.reduce((prev, current) => {
        return (current[metricId] || 0) > (prev[metricId] || 0) ? current : prev;
      });
    }
  };

  const renderMetricValue = (metricId: string, item: InvestmentOption) => {
    let value = item[metricId];
    let bestItem = getBestInvestment(metricId, data);
    let isBest = bestItem.id === item.id && data.length > 1;
    
    if (value === undefined) return <span className="text-gray-400">N/A</span>;
    
    if (metricId === 'recommendation') {
      return (
        <span className={`px-2 py-1 rounded-md text-white text-xs ${value ? 'bg-green-500' : 'bg-red-500'}`}>
          {value ? 'Recommended' : 'Not Recommended'}
        </span>
      );
    }
    
    if (metricId === 'trustScore') {
      const score = Number(value);
      return (
        <div className={`flex items-center ${isBest ? 'font-bold text-green-600' : ''}`}>
          <div className="flex mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`w-4 h-4 ${star <= score ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {score.toFixed(1)}
        </div>
      );
    }
    
    if (['oneMonthReturn', 'threeMonthReturn', 'sixMonthReturn', 'oneYearReturn', 'threeYearReturn', 'fiveYearReturn', 'returnForecast', 'dividend'].includes(metricId)) {
      const numValue = Number(value);
      return (
        <span className={`${isBest ? 'font-bold text-green-600' : ''} ${numValue < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
          {numValue.toFixed(2)}%
        </span>
      );
    }
    
    if (['price', 'nav', 'eps'].includes(metricId)) {
      return <span className={isBest ? 'font-bold text-green-600' : ''}>₹{Number(value).toLocaleString('en-IN')}</span>;
    }
    
    if (['marketCap', 'aum'].includes(metricId)) {
      const valueInCr = Number(value);
      return <span className={isBest ? 'font-bold text-green-600' : ''}>₹{valueInCr.toLocaleString('en-IN')} Cr</span>;
    }
    
    if (['minInvestment'].includes(metricId)) {
      return <span className={isBest ? 'font-bold text-green-600' : ''}>₹{Number(value).toLocaleString('en-IN')}</span>;
    }
    
    if (['pe', 'pb', 'sharpeRatio', 'beta'].includes(metricId)) {
      return <span className={isBest ? 'font-bold text-green-600' : ''}>{Number(value).toFixed(2)}</span>;
    }
    
    if (['expense'].includes(metricId)) {
      return <span className={isBest ? 'font-bold text-green-600' : ''}>{Number(value).toFixed(2)}%</span>;
    }
    
    return <span className={isBest ? 'font-bold text-green-600' : ''}>{value}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-0 translate-y-4 animate-fade-in-up">
      <div className="p-6 bg-blue-700 text-white">
        <h2 className="text-xl font-bold">Detailed Comparison</h2>
        <p className="text-blue-100 text-sm mt-1">Compare investment options side by side</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 shadow-sm z-10 min-w-[200px]">
                Comparison Metric
              </th>
              {data.map((item) => (
                <th key={item.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparisonMetrics
              .filter(metric => {
                // Check for section visibility and appropriate type
                if (metric.isHeader) {
                  return visibleSections[metric.id] !== false;
                } 
                
                if (metric.category && !visibleSections[metric.category]) {
                  return false;
                }
                
                // Filter stock-specific metrics for non-stock items
                if (metric.category === 'stockInfo' && data.some(item => item.type !== 'Stock')) {
                  return data.some(item => item.type === 'Stock');
                }
                
                // Filter MF-specific metrics for non-MF items
                if (metric.category === 'mfInfo' && data.some(item => item.type !== 'Mutual Fund')) {
                  return data.some(item => item.type === 'Mutual Fund');
                }
                
                return true;
              })
              .map((metric) => (
                <tr 
                  key={metric.id} 
                  className={metric.isHeader ? 'bg-gray-100' : 'hover:bg-blue-50'}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium sticky left-0 ${metric.isHeader ? 'bg-gray-100 text-blue-800 font-semibold' : 'bg-white text-gray-900'} shadow-sm`}>
                    {metric.label}
                  </td>
                  {data.map((item) => (
                    <td 
                      key={`${item.id}-${metric.id}`} 
                      className={`px-6 py-4 whitespace-nowrap text-sm ${metric.isHeader ? 'bg-gray-100 font-semibold text-gray-500' : 'text-gray-800'}`}
                    >
                      {metric.isHeader ? '' : renderMetricValue(metric.id, item)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Compare() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [availableInvestments, setAvailableInvestments] = useState<InvestmentOption[]>([]);
  const [visibleSections, setVisibleSections] = useState<SectionVisibility>({
    basicInfo: true,
    stockInfo: true,
    mfInfo: true,
    returns: true,
    risk: true,
    costs: true,
    aiAnalysis: true
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const { portfolioData } = usePortfolio();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const compare = searchParams?.get('compare');
    if (compare) {
      const itemIds = compare.split(',').map(id => parseInt(id));
      setSelectedItems(itemIds);
    }
  }, [searchParams]);
  
  // Fetch all investment options
  useEffect(() => {
    const loadInvestments = async () => {
      setLoading(true);
      try {
        const investments = await fetchAllInvestmentOptions();
        setAvailableInvestments(investments);
      } catch (error) {
        console.error('Error loading investments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInvestments();
  }, []);
  
  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        // Limit to 4 items for comparison
        const newSelected = [...prev, id];
        return newSelected.length > 4 ? newSelected.slice(-4) : newSelected;
      }
    });
  };
  
  const toggleSection = (sectionId: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  const filteredInvestments = availableInvestments.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === null || item.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  const selectedInvestments = availableInvestments.filter(item => selectedItems.includes(item.id));
  
  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Compare Investments</h1>
        <p className="text-gray-600">Compare different investment options side by side to make informed decisions.</p>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Investment Options</h2>
            
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-4 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedType === null ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors whitespace-nowrap`}
                onClick={() => setSelectedType(null)}
              >
                All Types
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedType === 'Stock' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors whitespace-nowrap`}
                onClick={() => setSelectedType('Stock')}
              >
                Stocks
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedType === 'Mutual Fund' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors whitespace-nowrap`}
                onClick={() => setSelectedType('Mutual Fund')}
              >
                Mutual Funds
              </button>
            </div>
            
            {loading ? (
              <div className="py-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
                {filteredInvestments.length > 0 ? (
                  filteredInvestments.map(item => (
                    <InvestmentItem 
                      key={item.id} 
                      item={item} 
                      isSelected={selectedItems.includes(item.id)}
                      onSelect={() => handleSelectItem(item.id)}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No investments match your search.</p>
                )}
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected for Comparison ({selectedInvestments.length}/4)</h3>
              {selectedInvestments.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedInvestments.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center text-sm"
                    >
                      {item.name}
                      <button 
                        className="ml-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleSelectItem(item.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select up to 4 investments to compare</p>
              )}
            </div>
          </div>
          
          {selectedInvestments.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h3 className="text-lg font-bold text-blue-800 mb-3">Customize Comparison</h3>
              <p className="text-sm text-gray-600 mb-4">Toggle sections to customize your comparison view.</p>
              
              <div className="space-y-2">
                {Object.keys(visibleSections).map(section => (
                  <div 
                    key={section} 
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => toggleSection(section)}
                  >
                    <span className="text-gray-700 capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className={`relative inline-block w-10 h-5 transition-colors duration-200 ease-in-out rounded-full ${visibleSections[section] ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      <span 
                        className={`absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${visibleSections[section] ? 'translate-x-5' : 'translate-x-0'}`}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <ComparisonTable data={selectedInvestments} visibleSections={visibleSections} />
          
          {selectedInvestments.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Investment Actions</h2>
              <div className="flex flex-wrap gap-4">
                {selectedInvestments.map(item => (
                  <Link 
                    key={item.id}
                    href={`/trade?instrument=${item.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6L4 9m4 4L4 9" />
                    </svg>
                    Invest in {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 