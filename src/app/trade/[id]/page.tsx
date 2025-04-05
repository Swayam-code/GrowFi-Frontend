'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock data for investments
const investmentsData = [
  {
    id: '1',
    name: 'HDFC Small Cap Fund',
    type: 'Mutual Fund',
    platform: 'MF Central',
    units: 450.256,
    nav: 58.25,
    value: 26227.41,
    gain: 8227.41,
    gainPercentage: 45.7,
    trustScore: 4.5,
    riskLevel: 'medium',
    returnForecast: 12.5,
    sipEnabled: true,
    minInvestment: 500,
    exitLoad: '1% for redemption within 365 days',
    category: 'Equity: Small Cap',
    amc: 'HDFC Mutual Fund',
  },
  {
    id: '2',
    name: 'Reliance Industries',
    type: 'Stock',
    platform: 'Zerodha',
    units: 15,
    nav: 2480.50,
    value: 37207.50,
    gain: 7207.50,
    gainPercentage: 24.0,
    trustScore: 4.8,
    riskLevel: 'low',
    returnForecast: 10.2,
    sipEnabled: false,
    lotSize: 1,
    marketCap: 'Large Cap',
    sector: 'Oil & Gas, Telecom',
    segment: 'NSE',
  },
  {
    id: '3',
    name: 'ICICI Prudential Technology Fund',
    type: 'Mutual Fund',
    platform: 'MF Central',
    units: 1200.125,
    nav: 32.75,
    value: 39304.09,
    gain: 9304.09,
    gainPercentage: 31.0,
    trustScore: 3.9,
    riskLevel: 'high',
    returnForecast: 18.5,
    sipEnabled: true,
    minInvestment: 1000,
    exitLoad: '1% for redemption within 180 days',
    category: 'Equity: Sectoral/Thematic',
    amc: 'ICICI Prudential Mutual Fund',
  },
  {
    id: '4',
    name: 'TATA Motors',
    type: 'Stock',
    platform: 'Angel One',
    units: 40,
    nav: 650.75,
    value: 26030.00,
    gain: 10030.00,
    gainPercentage: 62.7,
    trustScore: 4.2,
    riskLevel: 'medium',
    returnForecast: 15.8,
    sipEnabled: false,
    lotSize: 1,
    marketCap: 'Large Cap',
    sector: 'Automobile',
    segment: 'NSE',
  },
];

interface TradeInfoProps {
  item: any;
  tradeType: 'buy' | 'sell';
}

const TradeInfo = ({ item, tradeType }: TradeInfoProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md opacity-0 translate-y-4 animate-fade-in-up">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 mr-2">{item.name}</h1>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              item.type === 'Mutual Fund' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {item.type}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Via {item.platform}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-blue-50 px-3 py-1 rounded-lg">
            <span className="text-sm font-medium text-blue-700">
              {tradeType === 'buy' ? 'Buy Order' : 'Sell Order'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Current NAV/Price</p>
          <p className="font-medium">₹{item.nav.toFixed(2)}</p>
        </div>
        
        {tradeType === 'sell' && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Your Units</p>
            <p className="font-medium">{item.units.toFixed(3)}</p>
          </div>
        )}
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Expected Return</p>
          <p className="font-medium text-green-600">+{item.returnForecast}%</p>
        </div>
        
        {item.type === 'Mutual Fund' && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Minimum Investment</p>
            <p className="font-medium">₹{item.minInvestment}</p>
          </div>
        )}
        
        {item.type === 'Stock' && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Lot Size</p>
            <p className="font-medium">{item.lotSize}</p>
          </div>
        )}
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Risk Level</p>
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full mr-1 ${
              item.riskLevel === 'low' ? 'bg-green-500' :
              item.riskLevel === 'medium' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}></div>
            <p className="font-medium">{item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1)}</p>
          </div>
        </div>
      </div>
      
      {tradeType === 'buy' && item.type === 'Mutual Fund' && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
          <p className="text-xs text-yellow-700">
            <span className="font-medium">Exit Load:</span> {item.exitLoad}
          </p>
        </div>
      )}
    </div>
  );
};

const TradeForm = ({ 
  item, 
  tradeType, 
  setOrderPlaced 
}: { 
  item: any; 
  tradeType: 'buy' | 'sell';
  setOrderPlaced: (value: boolean) => void;
}) => {
  const [amount, setAmount] = useState<string>('');
  const [units, setUnits] = useState<string>('');
  const [tradeBy, setTradeBy] = useState<'amount' | 'units'>('amount');
  const [errors, setErrors] = useState<{amount?: string; units?: string}>({});
  const [estimatedValue, setEstimatedValue] = useState<number>(0);
  const [estimatedUnits, setEstimatedUnits] = useState<number>(0);
  const [isSIP, setIsSIP] = useState<boolean>(false);
  const [sipFrequency, setSipFrequency] = useState<string>('monthly');

  // Calculate estimated values when inputs change
  useEffect(() => {
    if (tradeBy === 'amount' && amount) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        const calculatedUnits = amountValue / item.nav;
        setEstimatedUnits(calculatedUnits);
      }
    } else if (tradeBy === 'units' && units) {
      const unitsValue = parseFloat(units);
      if (!isNaN(unitsValue)) {
        const calculatedAmount = unitsValue * item.nav;
        setEstimatedValue(calculatedAmount);
      }
    }
  }, [amount, units, tradeBy, item.nav]);

  const validateForm = () => {
    const newErrors: {amount?: string; units?: string} = {};
    let isValid = true;
    
    if (tradeBy === 'amount') {
      if (!amount) {
        newErrors.amount = 'Amount is required';
        isValid = false;
      } else if (parseFloat(amount) <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
        isValid = false;
      } else if (item.type === 'Mutual Fund' && parseFloat(amount) < item.minInvestment) {
        newErrors.amount = `Minimum investment is ₹${item.minInvestment}`;
        isValid = false;
      }
    } else {
      if (!units) {
        newErrors.units = 'Units are required';
        isValid = false;
      } else if (parseFloat(units) <= 0) {
        newErrors.units = 'Units must be greater than 0';
        isValid = false;
      } else if (tradeType === 'sell' && parseFloat(units) > item.units) {
        newErrors.units = `You only have ${item.units.toFixed(3)} units`;
        isValid = false;
      } else if (item.type === 'Stock' && parseFloat(units) % item.lotSize !== 0) {
        newErrors.units = `Units must be in multiples of ${item.lotSize}`;
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call to place order
      setTimeout(() => {
        setOrderPlaced(true);
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mt-6 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Trade Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Trade by</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200 ${
                tradeBy === 'amount' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTradeBy('amount')}
            >
              Amount (₹)
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200 ${
                tradeBy === 'units' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTradeBy('units')}
            >
              Units
            </button>
          </div>
        </div>
        
        {/* Amount Input */}
        {tradeBy === 'amount' && (
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="number"
                id="amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.amount ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
            {amount && !errors.amount && (
              <p className="mt-1 text-sm text-gray-500">
                Estimated Units: <span className="font-medium">{estimatedUnits.toFixed(3)}</span>
              </p>
            )}
          </div>
        )}
        
        {/* Units Input */}
        {tradeBy === 'units' && (
          <div className="mb-4">
            <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Units
            </label>
            <input
              type="number"
              id="units"
              placeholder="0.000"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.units ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
            />
            {errors.units && (
              <p className="mt-1 text-sm text-red-600">{errors.units}</p>
            )}
            {units && !errors.units && (
              <p className="mt-1 text-sm text-gray-500">
                Estimated Value: <span className="font-medium">₹{estimatedValue.toFixed(2)}</span>
              </p>
            )}
          </div>
        )}
        
        {/* SIP Option (only for buy and mutual funds) */}
        {tradeType === 'buy' && item.type === 'Mutual Fund' && item.sipEnabled && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="sip"
                checked={isSIP}
                onChange={(e) => setIsSIP(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="sip" className="ml-2 block text-sm font-medium text-gray-700">
                Set up as SIP (Systematic Investment Plan)
              </label>
            </div>
            
            {isSIP && (
              <div className="mt-3 bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  SIP Frequency
                </label>
                <select
                  value={sipFrequency}
                  onChange={(e) => setSipFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semiannually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
                
                <p className="mt-3 text-sm text-blue-700">
                  Your account will be debited ₹{amount || '0'} {sipFrequency} until canceled.
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200 ${
            tradeType === 'buy' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {tradeType === 'buy' 
            ? isSIP ? 'Set Up SIP' : 'Buy Now' 
            : 'Sell Now'}
        </button>
      </form>
    </div>
  );
};

const OrderSuccess = ({ 
  item, 
  tradeType 
}: { 
  item: any; 
  tradeType: 'buy' | 'sell';
}) => {
  const router = useRouter();
  
  return (
    <div className="mt-6 bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center opacity-0 translate-y-4 animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Order Placed Successfully!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Your {tradeType === 'buy' ? 'purchase' : 'sell'} order for{' '}
        <span className="font-medium">{item.name}</span> has been placed and will be processed shortly.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Go to Dashboard
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
};

export default function Trade() {
  const params = useParams();
  const router = useRouter();
  const [investment, setInvestment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API call to fetch investment data
    fetchInvestment();
    
    // Initialize animations
    setTimeout(() => {
      document.querySelectorAll('.animate-fade-in-up').forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove('opacity-0', 'translate-y-4');
        }, i * 100);
      });
    }, 100);
  }, [params.id]);

  const fetchInvestment = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const found = investmentsData.find(item => item.id === params.id);
      setInvestment(found || null);
      setLoading(false);
    }, 500);
  };

  const handleTradeTypeChange = (type: 'buy' | 'sell') => {
    setTradeType(type);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-20 bg-gray-200 animate-pulse rounded-xl mb-4"></div>
          <div className="h-64 bg-gray-200 animate-pulse rounded-xl mb-4"></div>
          <div className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!investment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-md text-center">
          <div className="bg-red-100 p-4 rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Investment Not Found</h1>
          <p className="text-gray-600 mb-6">The investment you're looking for doesn't exist or has been removed.</p>
          <Link href="/dashboard">
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Return to Dashboard
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <Link href="/dashboard">
          <span className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </span>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Trading Tabs */}
        <div className="bg-white rounded-xl p-3 shadow-md mb-6 flex opacity-0 translate-y-4 animate-fade-in-up">
          <button
            className={`flex-1 py-2 rounded-lg text-center font-medium transition-colors duration-200 ${
              tradeType === 'buy' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleTradeTypeChange('buy')}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-center font-medium transition-colors duration-200 ${
              tradeType === 'sell' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleTradeTypeChange('sell')}
          >
            Sell
          </button>
        </div>
        
        {/* Order confirmation */}
        {orderPlaced ? (
          <OrderSuccess item={investment} tradeType={tradeType} />
        ) : (
          <>
            {/* Investment info */}
            <TradeInfo item={investment} tradeType={tradeType} />
            
            {/* Trade form */}
            <div className="mt-6">
              <TradeForm 
                item={investment} 
                tradeType={tradeType}
                setOrderPlaced={setOrderPlaced}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
} 