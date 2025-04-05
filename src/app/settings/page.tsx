'use client';

import { useState } from 'react';

// Mock user data
const userData = {
  name: 'Amit Kumar',
  email: 'amit@example.com',
  phone: '+91 9876543210',
  profilePicture: null,
  role: 'Premium User',
  twoFactorEnabled: true,
  loginHistory: [
    { date: 'May 16, 2023', device: 'Windows PC', location: 'Bangalore, India', status: 'Success' },
    { date: 'May 14, 2023', device: 'iPhone', location: 'Bangalore, India', status: 'Success' },
    { date: 'May 10, 2023', device: 'Android', location: 'Mumbai, India', status: 'Success' }
  ]
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [accountForm, setAccountForm] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone
  });
  const [notifications, setNotifications] = useState({
    email: {
      marketUpdates: true,
      portfolioAlerts: true,
      weeklyReport: true,
      newFeatures: false
    },
    mobile: {
      marketUpdates: false,
      portfolioAlerts: true,
      securityAlerts: true,
      newFeatures: false
    }
  });
  const [appearance, setAppearance] = useState({
    theme: 'light',
    dashboardLayout: 'default',
    chartColors: 'default',
    fontSize: 'medium'
  });

  const handleAccountFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (category: 'email' | 'mobile', setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[category]]
      }
    }));
  };

  const handleAppearanceChange = (setting: string, value: string) => {
    setAppearance(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Sidebar for tabs */}
          <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'account'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'appearance'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'privacy'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Privacy
              </button>
            </nav>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="p-6 md:flex-1">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{userData.name}</h3>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {userData.role}
                        </span>
                      </div>
                      <div className="mt-4">
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                          Upload New Picture
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={accountForm.name}
                          onChange={handleAccountFormChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={accountForm.email}
                          onChange={handleAccountFormChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={accountForm.phone}
                          onChange={handleAccountFormChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="pt-4">
                        <button type="button" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="pt-2">
                        <button type="button" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            Status: <span className={userData.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}>
                              {userData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </p>
                        </div>
                        <button 
                          className={`px-4 py-2 text-sm font-medium rounded-md ${
                            userData.twoFactorEnabled 
                              ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          } transition-colors`}
                        >
                          {userData.twoFactorEnabled ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Login History</h3>
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userData.loginHistory.map((login, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{login.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{login.device}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{login.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {login.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                    <div className="mt-4 space-y-3">
                      {Object.entries(notifications.email).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <input
                            id={`email-${key}`}
                            name={`email-${key}`}
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationChange('email', key)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`email-${key}`} className="ml-3 text-sm text-gray-700">
                            {key.split(/(?=[A-Z])/).join(' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Mobile Notifications</h3>
                    <div className="mt-4 space-y-3">
                      {Object.entries(notifications.mobile).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <input
                            id={`mobile-${key}`}
                            name={`mobile-${key}`}
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationChange('mobile', key)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`mobile-${key}`} className="ml-3 text-sm text-gray-700">
                            {key.split(/(?=[A-Z])/).join(' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button type="button" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Theme</h3>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {['light', 'dark', 'system'].map((theme) => (
                        <div
                          key={theme}
                          onClick={() => handleAppearanceChange('theme', theme)}
                          className={`p-4 border rounded-lg cursor-pointer ${
                            appearance.theme === theme 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                              theme === 'light' ? 'bg-white border border-gray-200' : 
                              theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-100 to-gray-800'
                            }`}>
                              {theme === 'light' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                                </svg>
                              )}
                              {theme === 'dark' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                              )}
                              {theme === 'system' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              )}
                            </div>
                            <div className="mt-2 text-sm font-medium text-gray-900 capitalize">{theme}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Dashboard Layout</h3>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-4">
                        {['default', 'compact', 'expanded'].map((layout) => (
                          <div
                            key={layout}
                            onClick={() => handleAppearanceChange('dashboardLayout', layout)}
                            className={`p-3 border rounded-lg cursor-pointer flex-1 min-w-[120px] ${
                              appearance.dashboardLayout === layout 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-900 capitalize">{layout}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Font Size</h3>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-4">
                        {['small', 'medium', 'large'].map((size) => (
                          <div
                            key={size}
                            onClick={() => handleAppearanceChange('fontSize', size)}
                            className={`p-3 border rounded-lg cursor-pointer flex-1 min-w-[100px] ${
                              appearance.fontSize === size
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className={`font-medium text-gray-900 capitalize ${
                                size === 'small' ? 'text-xs' : 
                                size === 'medium' ? 'text-sm' : 
                                'text-base'
                              }`}>
                                {size}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button type="button" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Privacy Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Data Sharing</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage how your data is used and shared</p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Share Analytics Data</p>
                          <p className="text-xs text-gray-500">Help us improve by sharing anonymous usage data</p>
                        </div>
                        <div className="flex items-center">
                          <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-blue-600" role="switch" aria-checked="true">
                            <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Personalized Recommendations</p>
                          <p className="text-xs text-gray-500">Allow us to use your data for personalized recommendations</p>
                        </div>
                        <div className="flex items-center">
                          <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-blue-600" role="switch" aria-checked="true">
                            <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Privacy Controls</h3>
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Download My Data
                      </button>
                      <p className="mt-2 text-xs text-gray-500">
                        Request a copy of your personal data. This may take up to 48 hours to process.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Third-Party Integrations</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage access to your GrowFi account by third-party applications</p>
                    <div className="mt-4 space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-xs font-medium">App1</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Trading App</p>
                              <p className="text-xs text-gray-500">Last accessed: 3 days ago</p>
                            </div>
                          </div>
                          <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-xs font-medium">App2</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Portfolio Tracker</p>
                              <p className="text-xs text-gray-500">Last accessed: 1 week ago</p>
                            </div>
                          </div>
                          <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 