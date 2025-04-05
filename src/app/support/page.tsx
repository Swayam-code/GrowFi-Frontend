'use client';

import { useState } from 'react';

// FAQ data
const faqData = [
  {
    question: 'How do I get started with GrowFi?',
    answer: 'Sign up for an account, connect your existing investment accounts, and explore the dashboard. You can also use our AI-powered insights to get personalized recommendations for your portfolio.'
  },
  {
    question: 'Is my financial data secure?',
    answer: 'Yes, we use bank-level encryption to secure your data. We never store your account passwords, and we use tokenized connections to your financial institutions.'
  },
  {
    question: 'How accurate are the AI predictions?',
    answer: 'Our AI models are trained on historical data and updated regularly. While no prediction can be 100% accurate, our algorithms have shown a high level of precision in forecasting market trends. We recommend using these insights as one of many tools in your investment strategy.'
  },
  {
    question: 'Can I connect multiple brokerage accounts?',
    answer: 'Yes, GrowFi supports connections to all major brokerages and financial institutions. You can connect as many accounts as you need to get a complete view of your portfolio.'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription anytime from your account settings. Navigate to Settings > Billing and click on "Cancel Subscription". Your access will continue until the end of your current billing period.'
  },
  {
    question: 'What information do I need to import my portfolio?',
    answer: 'You\'ll need your login credentials for your brokerage accounts. Alternatively, you can manually enter your holdings by providing the security name, number of units, and purchase price.'
  },
  {
    question: 'How often is my portfolio data updated?',
    answer: 'Portfolio data is updated in real-time during market hours for most brokerages. For manually entered holdings, prices are updated every 15 minutes during market hours.'
  },
  {
    question: 'What should I do if I find an error in my portfolio data?',
    answer: 'If you notice any discrepancies, please contact our support team through the form on this page. We\'ll investigate and correct any issues as quickly as possible.'
  }
];

export default function Support() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to an API
    alert('Form submitted! We\'ll get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 shadow-lg text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="mt-2 text-blue-100">Get answers to your questions and contact our support team</p>
        </div>
        
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full py-3 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Help Categories</h2>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === 'all'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setActiveCategory('account')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === 'account'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Account & Security
              </button>
              <button
                onClick={() => setActiveCategory('portfolio')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === 'portfolio'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Portfolio Management
              </button>
              <button
                onClick={() => setActiveCategory('billing')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === 'billing'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Billing & Subscription
              </button>
              <button
                onClick={() => setActiveCategory('technical')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === 'technical'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Technical Issues
              </button>
            </nav>
            
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  User Guides
                </a>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video Tutorials
                </a>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Webinars
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:flex-1 p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Contact our support team and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleContactFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={contactForm.category}
                      onChange={handleContactFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="account">Account Issue</option>
                      <option value="billing">Billing</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-medium text-gray-900 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600">support@growfi.com</p>
                  <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="font-medium text-gray-900 mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available 9am-5pm IST</p>
                  <p className="text-xs text-gray-500 mt-1">Monday to Friday</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="font-medium text-gray-900 mb-1">Phone Support</h3>
                  <p className="text-sm text-gray-600">+91 800-123-4567</p>
                  <p className="text-xs text-gray-500 mt-1">Premium users only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="text-center">
          <h2 className="text-lg font-bold text-blue-800">Join Our Community</h2>
          <p className="mt-2 text-sm text-gray-600">Connect with other GrowFi users, share strategies, and learn from the community</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Join Discord
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Follow on Twitter
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 