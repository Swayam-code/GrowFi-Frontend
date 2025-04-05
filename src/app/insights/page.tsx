'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for AI insights
const insightsData = {
  portfolioScore: 78,
  diversificationScore: 82,
  riskScore: 65,
  performanceScore: 84,
  summary: "Your portfolio is well-diversified with a good mix of equity and debt assets. However, there's room for improvement in the risk management aspect. Consider exploring some of our recommendations to optimize your investments.",
  recommendations: [
    {
      id: 1,
      title: "Reduce concentration risk",
      description: "Your portfolio has over 30% exposure to the technology sector which increases concentration risk. Consider diversifying into other sectors like healthcare or consumer staples.",
      impact: "High",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Increase fixed income exposure",
      description: "Given the current market volatility, increasing your fixed income allocation from 20% to 25-30% could provide better stability.",
      impact: "Medium",
      difficulty: "Low"
    },
    {
      id: 3,
      title: "Optimize tax efficiency",
      description: "Consider moving some of your equity investments to ELSS funds to avail tax benefits under Section 80C while maintaining your equity exposure.",
      impact: "Medium",
      difficulty: "Low"
    },
    {
      id: 4,
      title: "Explore international diversification",
      description: "Adding 5-10% allocation to international funds could provide geographical diversification and reduce country-specific risks.",
      impact: "Medium",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Rebalance your portfolio",
      description: "Your asset allocation has drifted from your target. Consider rebalancing to align with your long-term financial goals.",
      impact: "High",
      difficulty: "Low"
    }
  ],
  investmentIdeas: [
    {
      id: 101,
      name: "NIFTY Next 50 Index Fund",
      type: "Index Fund",
      reason: "Provides exposure to the next 50 large companies after NIFTY 50, offering growth potential with moderate risk.",
      expectedReturn: "12-15%"
    },
    {
      id: 102,
      name: "Parag Parikh Flexi Cap Fund",
      type: "Equity Fund",
      reason: "Well-diversified fund with domestic and international exposure, managed with a value investing approach.",
      expectedReturn: "14-16%"
    },
    {
      id: 103,
      name: "SBI Corporate Bond Fund",
      type: "Debt Fund",
      reason: "Offers better yields than traditional fixed deposits with relatively lower risk compared to equity.",
      expectedReturn: "7-8%"
    },
    {
      id: 104,
      name: "Motilal Oswal S&P 500 Index Fund",
      type: "International Fund",
      reason: "Provides exposure to top 500 US companies, adding geographical diversification to your portfolio.",
      expectedReturn: "10-12%"
    }
  ],
  marketOutlook: {
    shortTerm: "The markets are expected to remain volatile in the near term due to ongoing global uncertainties, inflation concerns, and potential interest rate changes.",
    mediumTerm: "Over the next 1-2 years, selective sectors like manufacturing, infrastructure, and financial services are expected to perform well as economic growth stabilizes.",
    longTerm: "Long-term outlook remains positive for Indian markets, driven by favorable demographics, increasing financialization of savings, and economic reforms."
  }
};

const PortfolioScorecard = ({ data }: { data: any }) => {
  const scoreToColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-400";
    if (score >= 60) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 opacity-0 translate-y-4 animate-fade-in-up">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Portfolio Scorecard</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto relative">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="#E5E7EB"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="url(#gradient-overall)"
                strokeLinecap="round"
                strokeDasharray={`${data.portfolioScore}, 100`}
              />
              <defs>
                <linearGradient id="gradient-overall" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="stop-color-blue-600" />
                  <stop offset="100%" className="stop-color-blue-400" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">{data.portfolioScore}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Overall</p>
        </div>
        
        <div className="text-center">
          <div className="w-24 h-24 mx-auto relative">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="#E5E7EB"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="url(#gradient-diversification)"
                strokeLinecap="round"
                strokeDasharray={`${data.diversificationScore}, 100`}
              />
              <defs>
                <linearGradient id="gradient-diversification" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={`stop-color-${scoreToColor(data.diversificationScore).split('-')[1]}`} />
                  <stop offset="100%" className={`stop-color-${scoreToColor(data.diversificationScore).split('-')[3]}`} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold text-${scoreToColor(data.diversificationScore).split('-')[1]}-500`}>{data.diversificationScore}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Diversification</p>
        </div>
        
        <div className="text-center">
          <div className="w-24 h-24 mx-auto relative">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="#E5E7EB"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="url(#gradient-risk)"
                strokeLinecap="round"
                strokeDasharray={`${data.riskScore}, 100`}
              />
              <defs>
                <linearGradient id="gradient-risk" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={`stop-color-${scoreToColor(data.riskScore).split('-')[1]}`} />
                  <stop offset="100%" className={`stop-color-${scoreToColor(data.riskScore).split('-')[3]}`} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold text-${scoreToColor(data.riskScore).split('-')[1]}-500`}>{data.riskScore}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Risk Management</p>
        </div>
        
        <div className="text-center">
          <div className="w-24 h-24 mx-auto relative">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="#E5E7EB"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeWidth="3"
                fill="none"
                stroke="url(#gradient-performance)"
                strokeLinecap="round"
                strokeDasharray={`${data.performanceScore}, 100`}
              />
              <defs>
                <linearGradient id="gradient-performance" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={`stop-color-${scoreToColor(data.performanceScore).split('-')[1]}`} />
                  <stop offset="100%" className={`stop-color-${scoreToColor(data.performanceScore).split('-')[3]}`} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold text-${scoreToColor(data.performanceScore).split('-')[1]}-500`}>{data.performanceScore}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Performance</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-blue-800 text-sm">{data.summary}</p>
      </div>
    </div>
  );
};

const RecommendationCard = ({ recommendation }: { recommendation: any }) => {
  const getImpactClass = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-blue-800">{recommendation.title}</h3>
        <div className="flex space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getImpactClass(recommendation.impact)}`}>
            {recommendation.impact} Impact
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyClass(recommendation.difficulty)}`}>
            {recommendation.difficulty}
          </span>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-600">{recommendation.description}</p>
      
      <div className="mt-4 flex justify-end">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Apply This Recommendation →
        </button>
      </div>
    </div>
  );
};

const InvestmentIdea = ({ idea }: { idea: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{idea.name}</h3>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            {idea.type}
          </span>
        </div>
        <span className="text-sm font-medium text-green-600">{idea.expectedReturn}</span>
      </div>
      
      <p className="mt-3 text-sm text-gray-600">{idea.reason}</p>
      
      <div className="mt-4 flex justify-between items-center">
        <Link href={`/compare?add=${idea.id}`}>
          <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
            Compare
          </button>
        </Link>
        <Link href={`/trade/${idea.id}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium">
            Invest Now
          </button>
        </Link>
      </div>
    </div>
  );
};

const MarketOutlook = ({ data }: { data: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Market Outlook</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="ml-3 text-md font-medium text-blue-800">Short-term (0-6 months)</h3>
          </div>
          <p className="mt-2 text-sm text-blue-700 ml-9">{data.shortTerm}</p>
        </div>
        
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="ml-3 text-md font-medium text-indigo-800">Medium-term (1-2 years)</h3>
          </div>
          <p className="mt-2 text-sm text-indigo-700 ml-9">{data.mediumTerm}</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="ml-3 text-md font-medium text-purple-800">Long-term (3+ years)</h3>
          </div>
          <p className="mt-2 text-sm text-purple-700 ml-9">{data.longTerm}</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/analytics">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            View Detailed Analytics
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function Insights() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'ideas'>('recommendations');
  
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
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl p-6 shadow-lg text-white opacity-0 translate-y-4 animate-fade-in-up">
        <div className="flex items-center">
          <div className="mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Insights & Recommendations</h1>
            <p className="text-blue-100 mt-1">Personalized recommendations powered by machine learning to optimize your portfolio</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <PortfolioScorecard data={insightsData} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'recommendations'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('recommendations')}
              >
                Top Recommendations
              </button>
              <button
                className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'ideas'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('ideas')}
              >
                Investment Ideas
              </button>
            </div>
            
            <div className="mt-6">
              {activeTab === 'recommendations' ? (
                <div className="space-y-4">
                  {insightsData.recommendations.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insightsData.investmentIdeas.map((idea) => (
                    <InvestmentIdea key={idea.id} idea={idea} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <MarketOutlook data={insightsData.marketOutlook} />
        </div>
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-blue-800">Get personalized investment advice</h2>
            <p className="mt-1 text-sm text-gray-600">
              Schedule a call with our AI-powered advisor to get detailed insights tailored to your goals.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 