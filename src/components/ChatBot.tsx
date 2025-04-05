'use client';

import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useGemini } from '@/context/GeminiContext';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const { portfolioData } = usePortfolio();
  const { generateChatResponse, isProcessing } = useGemini();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your GrowFi assistant powered by Gemini. I can help answer questions about your portfolio, investment strategies, or financial planning. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChatBot = () => {
      setIsOpen(true);
      // Focus the input after a short delay to ensure the UI is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    document.addEventListener('openChatBot', handleOpenChatBot);
    
    return () => {
      document.removeEventListener('openChatBot', handleOpenChatBot);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isTyping) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      // Extract chat history for context
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Generate response using the Gemini context
      const response = await generateChatResponse(inputMessage, chatHistory);
      
      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if there are any unread messages that were added since the chat was last closed
  const hasUnreadMessages = messages.length > 1 && !isOpen;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {hasUnreadMessages && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                !
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transform transition-transform duration-200 ease-in-out"
          style={{ height: '500px', maxHeight: 'calc(100vh - 100px)' }}
          aria-label="Chat window"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center">
            <div className="w-8 h-8 bg-white rounded-full mr-3 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">G</span>
            </div>
            <div>
              <h3 className="font-bold">GrowFi Assistant</h3>
              <p className="text-xs opacity-80">Powered by Gemini</p>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className={`text-sm whitespace-pre-wrap ${message.role === 'user' ? 'text-white' : 'text-black'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your portfolio..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                disabled={isTyping}
                aria-label="Chat message input"
              />
              <button 
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg ${
                  !inputMessage.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 