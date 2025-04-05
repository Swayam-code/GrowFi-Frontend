'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for available investments
const investmentsData = {
  recommended: [
    {
      id: 1,
      name: 'HDFC Small Cap Fund',
      type: 'Mutual Fund',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 12.5,
      minInvestment: 500,
      popularity: 92,
    },
    {
      id: 101,
      name: 'NIFTY Next 50 Index Fund',
      type: 'Index Fund',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 13.5,
      minInvestment: 1000,
      popularity: 88,
    },
    {
      id: 102,
      name: 'Parag Parikh Flexi Cap Fund',
      type: 'Equity Fund',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 15.0,
      minInvestment: 1000,
      popularity: 95,
    },
    {
      id: 103,
      name: 'SBI Corporate Bond Fund',
      type: 'Debt Fund',
      category: 'Debt',
      riskLevel: 'low',
      returnForecast: 7.5,
      minInvestment: 5000,
      popularity: 84,
    },
  ],
  trending: [
    {
      id: 5,
      name: 'Reliance Industries',
      type: 'Stock',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 12.8,
      price: 2785.25,
      changePercent: 1.2,
      popularity: 98,
    },
    {
      id: 6,
      name: 'HDFC Bank',
      type: 'Stock',
      category: 'Equity',
      riskLevel: 'low',
      returnForecast: 10.2,
      price: 1621.75,
      changePercent: 0.8,
      popularity: 96,
    },
    {
      id: 7,
      name: 'Infosys',
      type: 'Stock',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 14.5,
      price: 1850.30,
      changePercent: 2.1,
      popularity: 92,
    },
    {
      id: 8,
      name: 'Axis Small Cap Fund',
      type: 'Mutual Fund',
      category: 'Equity',
      riskLevel: 'high',
      returnForecast: 16.2,
      minInvestment: 500,
      popularity: 91,
    },
  ],
  newListings: [
    {
      id: 9,
      name: 'Motilal Oswal S&P 500 Index Fund',
      type: 'International Fund',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 11.0,
      minInvestment: 1000,
      launchDate: '2 days ago',
    },
    {
      id: 10,
      name: 'Tata Digital India Fund',
      type: 'Thematic Fund',
      category: 'Equity',
      riskLevel: 'high',
      returnForecast: 18.5,
      minInvestment: 1000,
      launchDate: '1 week ago',
    },
    {
      id: 11,
      name: 'ICICI Prudential Silver ETF',
      type: 'ETF',
      category: 'Commodities',
      riskLevel: 'medium',
      returnForecast: 9.8,
      price: 45.15,
      launchDate: '2 weeks ago',
    },
  ],
  recentlyViewed: [
    {
      id: 3,
      name: 'ICICI Prudential Technology Fund',
      type: 'Mutual Fund',
      category: 'Equity',
      riskLevel: 'high',
      returnForecast: 18.5,
      minInvestment: 1000,
    },
    {
      id: 4,
      name: 'TATA Motors',
      type: 'Stock',
      category: 'Equity',
      riskLevel: 'medium',
      returnForecast: 15.8,
      price: 650.75,
    },
  ]
};

const assetCategories = [
  { id: 'all', label: 'All Assets' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'mutual-funds', label: 'Mutual Funds' },
  { id: 'etfs', label: 'ETFs' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'gold', label: 'Gold' },
];

interface InvestmentCardProps {
  investment: any;
}

const InvestmentCard = ({ investment }: InvestmentCardProps) => {
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
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{investment.name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {investment.type}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {investment.category}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${getRiskColor(investment.riskLevel)} mr-1`}></div>
          <span className="text-xs font-medium">{investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)} Risk</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-black mb-1">Expected Return</p>
          <p className="font-medium text-green-600">+{investment.returnForecast}%</p>
        </div>
        
        {investment.minInvestment && (
          <div>
            <p className="text-xs text-black mb-1">Min. Investment</p>
            <p className="font-medium">₹{investment.minInvestment}</p>
          </div>
        )}
        
        {investment.price && (
          <div>
            <p className="text-xs text-black mb-1">Price</p>
            <p className="font-medium">₹{investment.price}</p>
          </div>
        )}
        
        {investment.changePercent && (
          <div>
            <p className="text-xs text-black mb-1">Today</p>
            <p className={`font-medium ${investment.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {investment.changePercent >= 0 ? '+' : ''}{investment.changePercent}%
            </p>
          </div>
        )}
        
        {investment.popularity && (
          <div>
            <p className="text-xs text-black mb-1">Popularity</p>
            <div className="flex items-center">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                <div 
                  className="h-1.5 bg-blue-600 rounded-full" 
                  style={{ width: `${investment.popularity}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs">{investment.popularity}%</span>
            </div>
          </div>
        )}
        
        {investment.launchDate && (
          <div>
            <p className="text-xs text-black mb-1">Launched</p>
            <p className="font-medium">{investment.launchDate}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Link href={`/trade/${investment.id}`} className="flex-1">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors duration-200">
            Trade
          </button>
        </Link>
        <Link href={`/compare?ids=${investment.id}`} className="flex-1">
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg text-sm transition-colors duration-200">
            Compare
          </button>
        </Link>
      </div>
    </div>
  );
};

const InvestmentSection = ({ title, investments }: { title: string; investments: any[] }) => {
  return (
    <div className="mt-8 opacity-0 translate-y-4 animate-fade-in-up">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {investments.map((investment) => (
          <InvestmentCard key={investment.id} investment={investment} />
        ))}
      </div>
    </div>
  );
};

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Search for stocks, mutual funds, ETFs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="md:ml-6 flex flex-wrap gap-2">
          {assetCategories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Trade() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    // Add animation classes
    document.querySelectorAll('.animate-fade-in-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, 100 + i * 50);
    });
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 shadow-lg text-white opacity-0 translate-y-4 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Trade & Invest</h1>
            <p className="text-blue-100 mt-1">Discover and invest in stocks, mutual funds, ETFs, and more</p>
          </div>
          <Link href="/portfolio">
            <button className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              View Portfolio
            </button>
          </Link>
        </div>
      </div>
      
      <div className="mt-6">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      
      {searchTerm ? (
        <div className="mt-8 opacity-0 translate-y-4 animate-fade-in-up">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
          <p className="text-black">Showing results for "{searchTerm}"</p>
          
          <div className="mt-4 bg-white rounded-xl p-6 shadow-md">
            <p className="text-center text-black">This is a demo app with mock data. Try using the main categories below.</p>
          </div>
        </div>
      ) : (
        <>
          {selectedCategory === 'all' && (
            <>
              {investmentsData.recentlyViewed.length > 0 && (
                <InvestmentSection title="Recently Viewed" investments={investmentsData.recentlyViewed} />
              )}
              <InvestmentSection title="Recommended for You" investments={investmentsData.recommended} />
              <InvestmentSection title="Trending Now" investments={investmentsData.trending} />
              <InvestmentSection title="New Listings" investments={investmentsData.newListings} />
            </>
          )}
          
          {selectedCategory === 'stocks' && (
            <InvestmentSection 
              title="Stocks" 
              investments={[
                ...investmentsData.trending.filter(item => item.type === 'Stock'),
                ...investmentsData.recentlyViewed.filter(item => item.type === 'Stock')
              ]} 
            />
          )}
          
          {selectedCategory === 'mutual-funds' && (
            <InvestmentSection 
              title="Mutual Funds" 
              investments={[
                ...investmentsData.recommended.filter(item => item.type.includes('Fund')),
                ...investmentsData.trending.filter(item => item.type.includes('Fund')),
                ...investmentsData.newListings.filter(item => item.type.includes('Fund')),
                ...investmentsData.recentlyViewed.filter(item => item.type.includes('Fund'))
              ]} 
            />
          )}
          
          {selectedCategory === 'etfs' && (
            <InvestmentSection 
              title="ETFs" 
              investments={investmentsData.newListings.filter(item => item.type === 'ETF')} 
            />
          )}
          
          {selectedCategory === 'bonds' && (
            <div className="mt-8 opacity-0 translate-y-4 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bonds</h2>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-center text-black">No bonds are available for trading at the moment.</p>
              </div>
            </div>
          )}
          
          {selectedCategory === 'gold' && (
            <div className="mt-8 opacity-0 translate-y-4 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Gold</h2>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-center text-black">Gold trading will be available soon. Check back later.</p>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-12 bg-blue-50 rounded-xl p-6 opacity-0 translate-y-4 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800">Not sure what to invest in?</h2>
            <p className="mt-1 text-sm text-blue-600">
              Our AI-powered advisor can analyze your portfolio and suggest the best investments based on your goals and risk profile.
            </p>
            <div className="mt-4">
              <Link href="/insights">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Get AI Recommendations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 