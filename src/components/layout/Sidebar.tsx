'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      current: activePage === 'dashboard',
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      current: activePage === 'portfolio',
    },
    {
      name: 'Compare',
      href: '/compare',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      current: activePage === 'compare',
    },
    {
      name: 'AI Insights',
      href: '/insights',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      current: activePage === 'insights',
    },
    {
      name: 'Trade',
      href: '/trade',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      current: activePage === 'trade',
    },
  ];

  const secondaryNavigation = [
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      current: activePage === 'settings',
    },
    {
      name: 'Help & Support',
      href: '/support',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      current: activePage === 'support',
    },
  ];

  // User profile info
  const user = {
    name: 'Amit Kumar',
    email: 'amit@example.com',
    initial: 'AK',
    role: 'Premium User',
    imageUrl: null
  };

  return (
    <>
      {/* Mobile menu button (visible on small screens) */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile sidebar (off-canvas) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar panel */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col transition ease-in-out duration-300 transform">
            <div className="h-20 flex items-center justify-between px-6 bg-blue-600 text-white">
              <span className="text-xl font-bold">GrowFi</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* User profile */}
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-medium text-lg shadow-md">
                  {user.initial}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="px-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-l-4 hover:border-blue-300'
                    }
                     group flex items-center py-2 px-3 text-base font-medium rounded-r-md transition-all duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={`${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'} mr-4 flex-shrink-0`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Support
                </h3>
                <nav className="mt-1 px-4 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        item.current
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-l-4 hover:border-blue-300'
                      }
                      group flex items-center py-2 px-3 text-base font-medium rounded-r-md transition-all duration-200`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={`${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'} mr-4 flex-shrink-0`}>
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:z-40">
        <div className="flex flex-col w-64 h-full border-r border-gray-200 bg-white shadow-sm">
          {/* Logo & Header */}
          <div className="h-16 flex items-center justify-between px-6 bg-blue-600 text-white">
            <span className="text-xl font-bold">GrowFi</span>
          </div>
          
          {/* User profile */}
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-medium text-lg shadow-md">
                {user.initial}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-l-4 hover:border-blue-300'
                  }
                  group flex items-center py-2 px-3 text-sm font-medium rounded-r-md transition-all duration-200`}
                >
                  <span className={`${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'} mr-3 flex-shrink-0`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-6">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Support
              </h3>
              <nav className="mt-1 px-4 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-l-4 hover:border-blue-300'
                    }
                    group flex items-center py-2 px-3 text-sm font-medium rounded-r-md transition-all duration-200`}
                  >
                    <span className={`${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'} mr-3 flex-shrink-0`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 