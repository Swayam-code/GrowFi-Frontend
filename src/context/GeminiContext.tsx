'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePortfolio } from './PortfolioContext';

// Define proper types for holdings
interface Holding {
  id: number;
  name: string;
  category: string;
  platform: string;
  value: number;
  riskLevel: string;
  type?: string;
  nav?: number;
  units?: number;
}

interface PortfolioData {
  totalValue: number;
  totalGain: number;
  holdings: Holding[];
  platforms: string[];
}

interface GeminiContextType {
  generateInsights: (userPortfolio: PortfolioData) => Promise<any>;
  generateChatResponse: (query: string, chatHistory: any[]) => Promise<string>;
  isProcessing: boolean;
}

const GeminiContext = createContext<GeminiContextType | null>(null);

export function GeminiProvider({ children }: { children: ReactNode }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { portfolioData } = usePortfolio();
  
  // Get API key from environment variable
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  // Log initialization of Gemini API
  useEffect(() => {
    if (API_KEY) {
      console.log('Gemini API client initialized with real API key');
    } else {
      console.warn('Gemini API key not found in environment variables');
    }
  }, [API_KEY]);

  /**
   * Generate portfolio insights using Gemini API
   */
  const generateInsights = async (userPortfolio: PortfolioData) => {
    setIsProcessing(true);
    try {
      if (!API_KEY) {
        throw new Error('Gemini API key not configured');
      }
      
      const formattedPortfolio = {
        totalValue: userPortfolio.totalValue,
        totalGain: userPortfolio.totalGain,
        holdingsCount: userPortfolio.holdings.length,
        platformsCount: userPortfolio.platforms.length,
        topHoldings: userPortfolio.holdings.slice(0, 5).map((h: Holding) => ({
          name: h.name,
          value: h.value,
          category: h.category,
          riskLevel: h.riskLevel
        })),
        riskDistribution: {
          low: userPortfolio.holdings.filter((h: Holding) => h.riskLevel === 'low').length,
          medium: userPortfolio.holdings.filter((h: Holding) => h.riskLevel === 'medium').length,
          high: userPortfolio.holdings.filter((h: Holding) => h.riskLevel === 'high').length,
        }
      };

      // Make real API call to Gemini
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a financial advisor AI. Analyze this investment portfolio data and provide insights:
                  ${JSON.stringify(formattedPortfolio)}
                  
                  Provide the following in a JSON format:
                  1. A "summary" field with a concise overview of the portfolio
                  2. A "score" field with a health score from 0-100
                  3. A "potentialImprovement" field with a percentage improvement possible
                  4. An "insights" array containing objects with these fields:
                     - "type": one of "alert", "optimization", "opportunity", or "analysis"
                     - "title": a brief title for the insight
                     - "description": a detailed explanation
                     - "action": a call-to-action phrase
                     
                  Return ONLY the JSON with no additional text or markdown.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(e => ({ error: `Failed to parse error response: ${e.message}` }));
        console.error('API Error Details:', errorData);
        throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json().catch(e => {
        console.error('Failed to parse API response:', e);
        throw new Error(`Failed to parse API response: ${e.message}`);
      });
      
      console.log('API Response:', data); // Log the response for debugging
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.error('No text in API response:', data);
        throw new Error('No text in Gemini response');
      }

      // Parse JSON response - we need to find the JSON object in the text
      // Sometimes Gemini might return markdown code blocks or extra text
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/) || [null, text];
      const jsonStr = jsonMatch[1] || text;
      const cleanJsonStr = jsonStr.replace(/```json|```/g, '').trim();
      
      try {
        return JSON.parse(cleanJsonStr);
      } catch (e) {
        console.error("Failed to parse JSON from Gemini response:", cleanJsonStr);
        throw new Error('Invalid JSON response from Gemini');
      }
    } catch (error) {
      console.error('Error generating insights with Gemini:', error);
      
      // Return a fallback response
      return {
        summary: `Based on my analysis of your portfolio with ${userPortfolio.holdings.length} investments across ${userPortfolio.platforms.length} platforms, I've identified several key insights that could help optimize your investments.`,
        score: 74,
        potentialImprovement: 15.7,
        insights: [
          {
            type: 'alert',
            title: 'API Connection Issue',
            description: 'We encountered an issue connecting to our AI service. Showing default insights instead.',
            action: 'Try Again Later'
          },
          {
            type: 'optimization',
            title: 'Tax-Loss Harvesting Opportunity',
            description: 'You have several positions with unrealized losses that could be leveraged for tax benefits.',
            action: 'See Tax Strategy'
          }
        ]
      };
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Generate a chat response using Gemini API
   */
  const generateChatResponse = async (query: string, chatHistory: any[] = []) => {
    setIsProcessing(true);
    try {
      if (!API_KEY) {
        throw new Error('Gemini API key not configured');
      }
      
      // Format portfolio data to avoid sending too much info
      const formattedPortfolio = {
        totalValue: portfolioData.totalValue,
        totalGain: portfolioData.totalGain,
        holdingsCount: portfolioData.holdings.length,
        platformsCount: portfolioData.platforms.length,
        topHoldings: portfolioData.holdings.slice(0, 3).map((h: Holding) => ({
          name: h.name,
          value: h.value,
          category: h.category,
          riskLevel: h.riskLevel
        })),
        riskProfile: {
          low: portfolioData.holdings.filter((h: Holding) => h.riskLevel === 'low').length,
          medium: portfolioData.holdings.filter((h: Holding) => h.riskLevel === 'medium').length,
          high: portfolioData.holdings.filter((h: Holding) => h.riskLevel === 'high').length,
        }
      };

      // Simplify - use a single prompt with chat context instead of multiple messages
      // This is more compatible with the Gemini API
      
      // Format past conversations into a string
      let conversationHistory = '';
      // Skip the initial greeting message
      const relevantHistory = chatHistory.slice(1);
      
      if (relevantHistory.length > 0) {
        conversationHistory = "\n\nPrevious conversation:\n";
        relevantHistory.forEach(msg => {
          conversationHistory += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        });
      }
      
      // Create a single prompt with all context
      const promptText = `You are a financial assistant for GrowFi, an investment tracking app. 
      
      The user's portfolio data: ${JSON.stringify(formattedPortfolio)}
      
      Your role is to provide helpful, concise financial advice based on the user's portfolio. Be professional but friendly. Limit responses to 3-4 sentences unless detailed analysis is specifically requested.${conversationHistory}
      
      User's current question: "${query}"
      
      Your response:`;

      // Make real API call to Gemini with simpler format
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: 800,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(e => ({ error: `Failed to parse error response: ${e.message}` }));
        console.error('API Error Details:', errorData);
        throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json().catch(e => {
        console.error('Failed to parse API response:', e);
        throw new Error(`Failed to parse API response: ${e.message}`);
      });
      
      console.log('API Response:', data); // Log the response for debugging
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.error('No text in API response:', data);
        throw new Error('No text in Gemini response');
      }

      return text;
    } catch (error) {
      console.error('Error generating chat response with Gemini:', error);
      
      // Generate fallback response based on query
      const queryLower = query.toLowerCase();
      
      if (queryLower.includes('portfolio value') || queryLower.includes('worth')) {
        return `Your portfolio is currently worth ₹${portfolioData.totalValue.toLocaleString()}. You have ${portfolioData.holdings.length} holdings across ${portfolioData.platforms.length} different platforms.`;
      } else if (queryLower.includes('error') || queryLower.includes('issue')) {
        return 'I encountered an error connecting to my AI service. This could be due to API limits or network issues. Please try again in a moment.';
      } else {
        return 'Sorry, I encountered an error processing your request. Please try again later or ask a different question.';
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <GeminiContext.Provider value={{ 
      generateInsights,
      generateChatResponse,
      isProcessing 
    }}>
      {children}
    </GeminiContext.Provider>
  );
}

export function useGemini() {
  const context = useContext(GeminiContext);
  if (!context) {
    throw new Error('useGemini must be used within a GeminiProvider');
  }
  return context;
} 