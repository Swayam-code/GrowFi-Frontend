'use client';

import { useState } from 'react';
import Link from 'next/link';

// Remove Navbar - now handled by layout

// Mock data for comparison
const comparisonData = [
  {
    id: 1,
    name: 'HDFC Small Cap Fund',
    type: 'Mutual Fund',
    platform: 'MF Central',
    oneYearReturn: 16.5,
    threeYearReturn: 24.7,
    fiveYearReturn: 18.2,
    expense: 1.2,
    risk: 'medium',
    trustScore: 4.5,
    recommendation: true
  },
  {
    id: 2,
    name: 'Nippon India Small Cap Fund',
    type: 'Mutual Fund',
    platform: 'MF Central',
    oneYearReturn: 18.2,
    threeYearReturn: 26.1,
    fiveYearReturn: 19.5,
    expense: 1.4,
    risk: 'medium',
    trustScore: 4.7,
    recommendation: true
  },
  {
    id: 3,
    name: 'Axis Small Cap Fund',
    type: 'Mutual Fund',
    platform: 'MF Central',
    oneYearReturn: 14.8,
    threeYearReturn: 22.3,
    fiveYearReturn: 17.1,
    expense: 1.1,
    risk: 'medium',
    trustScore: 4.1,
    recommendation: false
  }
];

// Popular investment options
const popularOptions = [
  { id: 1, name: 'HDFC Bank', type: 'Stock' },
  { id: 2, name: 'Mirae Asset Large Cap Fund', type: 'Mutual Fund' },
  { id: 3, name: 'SBI Small Cap Fund', type: 'Mutual Fund' },
  { id: 4, name: 'Tata Digital India Fund', type: 'Mutual Fund' },
  { id: 5, name: 'Reliance Industries', type: 'Stock' },
  { id: 6, name: 'TCS', type: 'Stock' }
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

const ComparisonTable = ({ data }: { data: any[] }) => {
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
              <th className="py-3 px-6 text-left text-sm font-medium text-blue-800">Metrics</th>
              {data.map(item => (
                <th key={item.id} className="py-3 px-6 text-left text-sm font-medium text-blue-800">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">Type</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm text-gray-600">
                  {item.type}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">Platform</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm text-gray-600">
                  {item.platform}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">1Y Return</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm font-medium text-green-600">
                  {item.oneYearReturn}%
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">3Y Return</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm font-medium text-green-600">
                  {item.threeYearReturn}%
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">5Y Return</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm font-medium text-green-600">
                  {item.fiveYearReturn}%
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">Expense Ratio</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm text-gray-600">
                  {item.expense}%
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">Risk Level</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.risk === 'low' ? 'bg-green-100 text-green-700' :
                    item.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="py-3 px-6 text-sm font-medium text-gray-700">Trust Score</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">{item.trustScore}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-xs">
                          {star <= Math.floor(item.trustScore) ? '★' : '☆'}
                          {star === Math.floor(item.trustScore) && 
                            item.trustScore % 1 >= 0.5 && '½'}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="bg-blue-50">
              <td className="py-3 px-6 text-sm font-medium text-blue-800">ML Recommendation</td>
              {data.map(item => (
                <td key={item.id} className="py-3 px-6">
                  {item.recommendation ? (
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
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-blue-800">ML Analysis Result</h3>
            <p className="text-xs text-gray-500 mt-1">Our AI suggests Nippon India Small Cap Fund for maximum returns.</p>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Compare() {
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3]);

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      // Don't remove if only one item is selected
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter(item => item !== id));
      }
    } else {
      // Don't add more than 3 items
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  // Filter comparison data based on selected items
  const filteredData = comparisonData.filter(item => selectedItems.includes(item.id));

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Compare Investments</h1>
        <p className="text-gray-600">Compare different investment options side by side.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-bold text-blue-800 mb-4">Select Investments</h2>
            
            <div className="space-y-3 mb-6">
              {comparisonData.map(item => (
                <InvestmentItem 
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={() => handleSelectItem(item.id)}
                />
              ))}
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-blue-800 mb-2">Popular Options</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularOptions.map(item => (
                  <div key={item.id} className="text-xs p-2 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all duration-200">
                    <p className="font-medium truncate">{item.name}</p>
                    <span className="text-gray-500 text-[10px]">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <ComparisonTable data={filteredData} />
        </div>
      </div>
    </div>
  );
} 