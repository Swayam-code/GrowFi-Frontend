'use client';

import { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useGemini } from '@/context/GeminiContext';
import Link from 'next/link';

// Define the portfolio data interface
interface HoldingType {
  id: number;
  name: string;
  category: string;
  platform: string;
  value: number;
  riskLevel: string;
}

interface PortfolioDataType {
  totalValue: number;
  totalGain: number;
  holdings: HoldingType[];
  platforms: string[];
}

// Define interface for insight items
interface InsightItem {
  type: 'alert' | 'optimization' | 'opportunity' | 'analysis';
  title: string;
  description: string;
  action: string;
}

// Interface for cached data
interface CachedInsightsData {
  insights: InsightItem[];
  geminiResponse: string;
  portfolioScore: number;
  potentialImprovement: number;
  timestamp: number;
}

export default function Insights() {
  const { portfolioData } = usePortfolio();
  const { generateInsights, isProcessing } = useGemini();
  
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [geminiResponse, setGeminiResponse] = useState('');
  const [portfolioScore, setPortfolioScore] = useState(0);
  const [potentialImprovement, setPotentialImprovement] = useState(0);
  const [manualRefresh, setManualRefresh] = useState(false);

  // To control global chatbot (accessed via global state in a real app)
  const openChatBot = () => {
    // In a real implementation, you would use a global state or event emitter
    // For now, we'll use a custom event
    const event = new CustomEvent('openChatBot');
    document.dispatchEvent(event);
  };

  // Animation for page loading
  useEffect(() => {
    document.querySelectorAll('.animate-fade-in').forEach((el) => {
      setTimeout(() => {
        el.classList.remove('opacity-0');
      }, 100);
    });
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    setManualRefresh(true);
    setLoading(true);
  };

  // Real Gemini API call with session persistence
  useEffect(() => {
    const fetchInsightsFromGemini = async () => {
      try {
        // Try to get cached data from sessionStorage
        const cachedData = sessionStorage.getItem('growfi_insights');
        
        // If we have cached data and not forcing a refresh, use it
        if (cachedData && !manualRefresh) {
          const parsedData: CachedInsightsData = JSON.parse(cachedData);
          setInsights(parsedData.insights);
          setGeminiResponse(parsedData.geminiResponse);
          setPortfolioScore(parsedData.portfolioScore);
          setPotentialImprovement(parsedData.potentialImprovement);
          setLoading(false);
          return;
        }
        
        setLoading(true);
        
        // Call Gemini API through our context
        const geminiData = await generateInsights(portfolioData);
        
        if (geminiData) {
          setGeminiResponse(geminiData.summary || '');
          setPortfolioScore(geminiData.score || 70);
          setPotentialImprovement(geminiData.potentialImprovement || 10);
          
          if (Array.isArray(geminiData.insights)) {
            setInsights(geminiData.insights);
          }
          
          // Cache the data in sessionStorage
          const dataToCache: CachedInsightsData = {
            insights: geminiData.insights || [],
            geminiResponse: geminiData.summary || '',
            portfolioScore: geminiData.score || 70,
            potentialImprovement: geminiData.potentialImprovement || 10,
            timestamp: Date.now()
          };
          
          sessionStorage.setItem('growfi_insights', JSON.stringify(dataToCache));
        }
        
        setLoading(false);
        if (manualRefresh) setManualRefresh(false);
      } catch (error) {
        console.error("Error fetching insights from Gemini:", error);
        setLoading(false);
        if (manualRefresh) setManualRefresh(false);
        
        // Fallback insights in case of API failure
        const fallbackInsights: InsightItem[] = [
          {
            type: 'alert',
            title: 'Analysis Temporarily Unavailable',
            description: 'We couldn\'t generate personalized insights at this moment. Please try again later.',
            action: 'Refresh Analysis'
          }
        ];
        
        setInsights(fallbackInsights);
        
        // Still cache the fallback response
        const fallbackData: CachedInsightsData = {
          insights: fallbackInsights,
          geminiResponse: 'Unable to generate personalized insights at this time.',
          portfolioScore: 50,
          potentialImprovement: 0,
          timestamp: Date.now()
        };
        
        sessionStorage.setItem('growfi_insights', JSON.stringify(fallbackData));
      }
    };

    fetchInsightsFromGemini();
  }, [portfolioData, generateInsights, manualRefresh]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white opacity-0 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <h1 className="text-2xl font-bold">AI Portfolio Insights</h1>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Powered by Gemini</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="text-white hover:bg-white/10 rounded-full p-2 transition-colors"
            title="Refresh insights"
          >
            <svg className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {loading ? (
          <div className="py-4 flex flex-col items-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-white/70 rounded-full"></div>
              <div className="w-3 h-3 bg-white/70 rounded-full"></div>
              <div className="w-3 h-3 bg-white/70 rounded-full"></div>
            </div>
            <p className="mt-3 text-sm text-white/80">Analyzing your portfolio with Gemini...</p>
          </div>
        ) : (
          <>
            <p className="mb-6">{geminiResponse}</p>
            <div className="grid grid-cols-2 gap-4 text-blue-900">
              <div className="bg-white/90 rounded-lg p-4">
                <p className="text-sm font-medium">Portfolio Health Score</p>
                <p className="text-3xl font-bold">{portfolioScore}/100</p>
              </div>
              <div className="bg-white/90 rounded-lg p-4">
                <p className="text-sm font-medium">Optimization Potential</p>
                <p className="text-3xl font-bold">+{potentialImprovement}%</p>
              </div>
            </div>
          </>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm animate-pulse">
              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-gray-200 h-10 w-10 mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all opacity-0 animate-fade-in"
              style={{ animationDelay: `${150 + index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 rounded-full p-2 mr-4 ${
                  insight.type === 'alert' ? 'bg-red-100 text-red-600' :
                  insight.type === 'optimization' ? 'bg-green-100 text-green-600' :
                  insight.type === 'opportunity' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {insight.type === 'alert' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  {insight.type === 'optimization' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {insight.type === 'opportunity' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                  {insight.type === 'analysis' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-gray-700 mb-3">{insight.description}</p>
                  <button 
                    onClick={openChatBot}
                    className="text-blue-600 font-medium hover:text-blue-800 text-sm transition-colors flex items-center"
                  >
                    {insight.action}
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
        <p className="text-gray-700 mb-4">Want to see more detailed analysis or ask specific questions?</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link href="/portfolio">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center">
              <span>View Full Portfolio</span>
              <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
          <button 
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center"
            onClick={openChatBot}
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>Ask Gemini a Question</span>
          </button>
        </div>
      </div>
    </div>
  );
} 