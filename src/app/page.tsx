'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  // FAQ items data
  const faqItems = [
    {
      question: "How does GrowFi connect to my investment accounts?",
      answer: "GrowFi uses secure API connections with industry-standard encryption to safely link to your investment platforms. We use read-only access by default, meaning we can never make transactions without your explicit permission."
    },
    {
      question: "Is my financial data secure with GrowFi?",
      answer: "Absolutely. We employ bank-level security measures including 256-bit encryption, two-factor authentication, and regular security audits. Your data is encrypted both in transit and at rest, and we never share your information with third parties without your consent."
    },
    {
      question: "What investment platforms does GrowFi support?",
      answer: "GrowFi currently supports major platforms including Zerodha, Groww, Angel One, Upstox, MF Central, Kuvera, and more. We're constantly adding support for additional platforms based on user requests."
    },
    {
      question: "How does the AI recommendation system work?",
      answer: "Our AI analyzes your portfolio composition, historical performance, risk profile, and market trends to provide personalized recommendations. The system considers factors like diversification, tax efficiency, and alignment with your financial goals to suggest optimizations."
    },
    {
      question: "Does GrowFi offer a free trial?",
      answer: "Yes! GrowFi offers a 14-day free trial with full access to all features. No credit card is required to start your trial, and you can upgrade to a paid plan anytime if you decide to continue using our service."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-100 py-4 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center opacity-0 animate-fade-in delay-100">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">GrowFi</span>
            </div>
            <nav className="hidden md:flex items-center space-x-10">
              {['Why GrowFi', 'Features', 'Analytics', 'Pricing'].map((item, index) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-3 opacity-0 animate-fade-in delay-500">
              <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 pt-16 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-40 left-1/4 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <div className="mb-2 opacity-0 animate-slide-in-left delay-200">
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Unify & Optimize</span>
                </div>
                <div className="opacity-0 animate-slide-in-left delay-400">
                  <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Your Investments</span>
                </div>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg opacity-0 animate-fade-in-up delay-500">
                Professional portfolio management across multiple platforms. Make data-driven investment decisions powered by AI insights.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 opacity-0 animate-fade-in-up delay-700">
                <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  Start Free Trial
                </Link>
                <Link href="/dashboard" className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300 hover:border-blue-600 hover:text-blue-600 hover:shadow-md transform hover:-translate-y-1">
                  View Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-500 opacity-0 animate-fade-in delay-1000">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card required • 14-day free trial
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 opacity-0 animate-fade-in delay-500">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 animate-pulse-slow"></div>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden relative z-10 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="GrowFi Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 opacity-0 animate-fade-in-up">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by thousands of investors</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[
              { name: 'TradeFirm', delay: '100ms' },
              { name: 'InvestCorp', delay: '200ms' },
              { name: 'TechFunds', delay: '300ms' },
              { name: 'CapitalX', delay: '400ms' },
              { name: 'StockPro', delay: '500ms' }
            ].map((company, index) => (
              <div key={company.name} className="h-8 opacity-0 animate-fade-in" style={{ animationDelay: company.delay }}>
                <div className="bg-blue-50 px-4 py-2 rounded-md">
                  <span className="text-blue-700 font-semibold">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Improved */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Modern Tools for Modern Investors
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">
              GrowFi combines all your investment accounts into one powerful dashboard with AI-powered tools to maximize your returns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'All-in-One Portfolio',
                description: 'Seamlessly integrate and manage all your investments from Zerodha, MF Central, and other platforms in a single dashboard.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                features: ['Real-time portfolio tracking', 'Investment consolidation', 'Multi-platform support'],
                delay: '100ms'
              },
              {
                title: 'Advanced Analytics',
                description: 'Get detailed visual insights into your investment performance, risk assessment, and asset allocation to make informed decisions.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                features: ['Performance comparison', 'Risk visualization', 'Historical analysis'],
                delay: '300ms'
              },
              {
                title: 'AI Recommendations',
                description: 'Receive personalized investment suggestions and portfolio optimization guidance based on your goals and risk tolerance.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                features: ['Smart rebalancing', 'Tax-efficient strategies', 'Goal-based planning'],
                delay: '500ms'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 opacity-0 animate-fade-in-up hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-800 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-center text-sm text-gray-800">
                      <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
          <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 opacity-0 animate-slide-in-left delay-200">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 animate-pulse-slow"></div>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="GrowFi Support" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 opacity-0 animate-slide-in-right delay-300">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                24/7 Support When You Need It
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our dedicated support team is always ready to assist you with any questions or concerns about your investments.
              </p>
              <ul className="space-y-4">
                {[
                  'Expert advice from certified financial advisors',
                  'Multiple support channels including chat, email, and phone',
                  'Comprehensive help resources and FAQs',
                  'Community forums to connect with other investors'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start opacity-0 animate-fade-in" style={{ animationDelay: `${400 + index * 100}ms` }}>
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-fade-in-up delay-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                AI-Powered Investment Insights
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our machine learning algorithms analyze market trends and your portfolio to provide personalized recommendations.
              </p>
              <ul className="space-y-4">
                {[
                  'Risk assessment scores for each investment',
                  'Potential overexposure warnings',
                  'Diversification suggestions',
                  'SIP optimization recommendations'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start opacity-0 animate-fade-in" style={{ animationDelay: `${300 + index * 100}ms` }}>
                    <svg className="h-6 w-6 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="opacity-0 animate-fade-in-up delay-400">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 animate-pulse-slow"></div>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="GrowFi AI Insights" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your investment needs. All plans include our core portfolio management features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Starter</h3>
                <p className="text-gray-500 text-sm mb-4">For new investors</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹499</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Portfolio visualization',
                    'Up to 2 platform connections',
                    'Basic analytics',
                    'Email support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Start Free Trial
                </Link>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-xl border-2 border-blue-600 overflow-hidden transition-all hover:shadow-lg relative opacity-0 animate-fade-in-up transform hover:-translate-y-1" style={{ animationDelay: '300ms' }}>
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
                <p className="text-gray-500 text-sm mb-4">For active investors</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹999</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Everything in Starter',
                    'Unlimited platform connections',
                    'Advanced analytics',
                    'AI investment recommendations',
                    'Priority email & chat support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block text-center py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </Link>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Enterprise</h3>
                <p className="text-gray-500 text-sm mb-4">For wealth managers</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹2499</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Everything in Pro',
                    'Client management dashboard',
                    'Portfolio comparison tools',
                    'Advanced reporting',
                    'Dedicated account manager',
                    'Custom integrations'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6 opacity-0 animate-fade-in-up">
            Ready to transform your investment strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Join thousands of investors who are already using GrowFi to optimize their portfolios and make better investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fade-in-up delay-400">
            <Link href="/signup" className="px-8 py-3 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Start Your Free Trial
            </Link>
            <Link href="/dashboard" className="px-8 py-3 bg-blue-700 text-white rounded-lg text-sm font-medium border border-blue-300 hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">
              Everything you need to know about GrowFi to get started
            </p>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${activeFaqIndex === index ? 'ring-2 ring-blue-200 shadow-md' : 'hover:shadow-md'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 focus:outline-none"
                  aria-expanded={activeFaqIndex === index}
                >
                  <h3 className={`text-lg font-semibold ${activeFaqIndex === index ? 'text-blue-700' : 'text-gray-900'}`}>
                    {faq.question}
                  </h3>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${activeFaqIndex === index ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    <svg 
                      className={`w-5 h-5 transform transition-transform duration-300 ${activeFaqIndex === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">Still have questions?</p>
            <Link href="/support" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Contact our support team
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="opacity-0 animate-fade-in-up delay-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="opacity-0 animate-fade-in-up delay-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="opacity-0 animate-fade-in-up delay-300">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Help Center', 'Guides', 'API Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="opacity-0 animate-fade-in-up delay-400">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Cookie Policy', 'Security'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0 opacity-0 animate-fade-in-up delay-500">
              <span className="text-xl font-bold text-blue-700 mr-2">GrowFi</span>
              <span className="text-sm text-gray-500">© {new Date().getFullYear()} GrowFi. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 opacity-0 animate-fade-in-up delay-600">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
