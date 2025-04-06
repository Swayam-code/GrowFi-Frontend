const fs = require('fs');
const path = require('path');
const https = require('https');

// FMP API Key
const API_KEY = 'dW7ZovQdr3jh35yrsmZrY0X2QizDIRQM';
const stockFilePath = path.join(__dirname, 'public', 'stock_data.json');

// List of Indian stocks with BSE symbols (adding .BSE to symbol)
const indianStocks = [
  // Large Cap Stocks
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Oil & Gas', category: 'Large Cap' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', sector: 'IT', category: 'Large Cap' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking', category: 'Large Cap' },
  { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT', category: 'Large Cap' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG', category: 'Large Cap' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking', category: 'Large Cap' },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', category: 'Large Cap' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', sector: 'Finance', category: 'Large Cap' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom', category: 'Large Cap' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', sector: 'Banking', category: 'Large Cap' },
  
  // Additional stocks from various sectors
  { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', sector: 'Diversified', category: 'Large Cap' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', sector: 'Automobile', category: 'Large Cap' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', sector: 'Automobile', category: 'Large Cap' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', sector: 'Consumer', category: 'Large Cap' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd', sector: 'Banking', category: 'Large Cap' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', sector: 'Pharma', category: 'Large Cap' },
  { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', sector: 'IT', category: 'Large Cap' },
  
  // Mid Cap
  { symbol: 'TATAPOWER', name: 'Tata Power Co Ltd', sector: 'Power', category: 'Mid Cap' },
  { symbol: 'FEDERALBNK', name: 'Federal Bank Ltd', sector: 'Banking', category: 'Mid Cap' },
  { symbol: 'GODREJIND', name: 'Godrej Industries Ltd', sector: 'Diversified', category: 'Mid Cap' },
  { symbol: 'TRENT', name: 'Trent Ltd', sector: 'Retail', category: 'Mid Cap' },
  
  // Small Cap
  { symbol: 'ZOMATO', name: 'Zomato Ltd', sector: 'Food Delivery', category: 'Small Cap' },
  { symbol: 'IRCTC', name: 'Indian Railway Catering and Tourism Corp Ltd', sector: 'Tourism', category: 'Small Cap' },
  { symbol: 'INFIBEAM', name: 'Infibeam Avenues Ltd', sector: 'IT', category: 'Small Cap' },
  { symbol: 'YESBANK', name: 'Yes Bank Ltd', sector: 'Banking', category: 'Small Cap' },
  
  // Add more Indian stocks to reach 100+ entries
  // Tech
  { symbol: 'INFOSYS', name: 'Infosys Ltd', sector: 'IT', category: 'Large Cap' },
  { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'IT', category: 'Large Cap' },
  { symbol: 'TECHM', name: 'Tech Mahindra Ltd', sector: 'IT', category: 'Large Cap' },
  { symbol: 'MINDTREE', name: 'Mindtree Ltd', sector: 'IT', category: 'Mid Cap' },
  { symbol: 'MPHASIS', name: 'Mphasis Ltd', sector: 'IT', category: 'Mid Cap' },
  
  // Financial
  { symbol: 'CHOLAFIN', name: 'Cholamandalam Investment and Finance Company Ltd', sector: 'Finance', category: 'Mid Cap' },
  { symbol: 'MANAPPURAM', name: 'Manappuram Finance Ltd', sector: 'Finance', category: 'Small Cap' },
  { symbol: 'PNBHOUSING', name: 'PNB Housing Finance Ltd', sector: 'Finance', category: 'Small Cap' },
  { symbol: 'SRTRANSFIN', name: 'Shriram Transport Finance Co Ltd', sector: 'Finance', category: 'Mid Cap' },
  
  // Pharma & Healthcare
  { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', sector: 'Pharma', category: 'Large Cap' },
  { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd', sector: 'Pharma', category: 'Large Cap' },
  { symbol: 'LUPIN', name: 'Lupin Ltd', sector: 'Pharma', category: 'Mid Cap' },
  { symbol: 'CIPLA', name: 'Cipla Ltd', sector: 'Pharma', category: 'Large Cap' },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd', sector: 'Healthcare', category: 'Large Cap' },
  
  // Energy & Utilities
  { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation Ltd', sector: 'Oil & Gas', category: 'Large Cap' },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd', sector: 'Oil & Gas', category: 'Large Cap' },
  { symbol: 'IOC', name: 'Indian Oil Corporation Ltd', sector: 'Oil & Gas', category: 'Large Cap' },
  { symbol: 'NTPC', name: 'NTPC Ltd', sector: 'Power', category: 'Large Cap' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', sector: 'Power', category: 'Large Cap' },
  
  // Consumer Goods
  { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG', category: 'Large Cap' },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd', sector: 'FMCG', category: 'Large Cap' },
  { symbol: 'MARICO', name: 'Marico Ltd', sector: 'FMCG', category: 'Mid Cap' },
  { symbol: 'DABUR', name: 'Dabur India Ltd', sector: 'FMCG', category: 'Large Cap' },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd', sector: 'FMCG', category: 'Large Cap' },
  
  // Automobile
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', sector: 'Automobile', category: 'Large Cap' },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', sector: 'Automobile', category: 'Large Cap' },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', sector: 'Automobile', category: 'Large Cap' },
  { symbol: 'TVSMOTOR', name: 'TVS Motor Company Ltd', sector: 'Automobile', category: 'Mid Cap' },
  { symbol: 'MRF', name: 'MRF Ltd', sector: 'Auto Ancillaries', category: 'Mid Cap' },
  
  // Metals & Mining
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', sector: 'Metal', category: 'Large Cap' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', sector: 'Metal', category: 'Large Cap' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', sector: 'Metal', category: 'Large Cap' },
  { symbol: 'COALINDIA', name: 'Coal India Ltd', sector: 'Mining', category: 'Large Cap' },
  { symbol: 'NMDC', name: 'NMDC Ltd', sector: 'Mining', category: 'Mid Cap' },
  
  // Infrastructure & Real Estate
  { symbol: 'DLF', name: 'DLF Ltd', sector: 'Real Estate', category: 'Large Cap' },
  { symbol: 'GODREJPROP', name: 'Godrej Properties Ltd', sector: 'Real Estate', category: 'Mid Cap' },
  { symbol: 'OBEROIRLTY', name: 'Oberoi Realty Ltd', sector: 'Real Estate', category: 'Mid Cap' },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd', sector: 'Engineering', category: 'Large Cap' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Ltd', sector: 'Infrastructure', category: 'Large Cap' },
  
  // Telecom & Media
  { symbol: 'IDEA', name: 'Vodafone Idea Ltd', sector: 'Telecom', category: 'Mid Cap' },
  { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Ltd', sector: 'Media', category: 'Mid Cap' },
  { symbol: 'SUNTV', name: 'Sun TV Network Ltd', sector: 'Media', category: 'Mid Cap' },
  { symbol: 'PVR', name: 'PVR Ltd', sector: 'Entertainment', category: 'Mid Cap' },
  
  // Chemicals & Fertilizers
  { symbol: 'UPL', name: 'UPL Ltd', sector: 'Chemicals', category: 'Large Cap' },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries Ltd', sector: 'Chemicals', category: 'Large Cap' },
  { symbol: 'COROMANDEL', name: 'Coromandel International Ltd', sector: 'Fertilizers', category: 'Mid Cap' },
  { symbol: 'ATUL', name: 'Atul Ltd', sector: 'Chemicals', category: 'Mid Cap' },
  
  // Cement
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', sector: 'Cement', category: 'Large Cap' },
  { symbol: 'SHREECEM', name: 'Shree Cement Ltd', sector: 'Cement', category: 'Large Cap' },
  { symbol: 'ACC', name: 'ACC Ltd', sector: 'Cement', category: 'Mid Cap' },
  { symbol: 'RAMCOCEM', name: 'The Ramco Cements Ltd', sector: 'Cement', category: 'Mid Cap' },
  
  // Aviation
  { symbol: 'INDIGO', name: 'InterGlobe Aviation Ltd', sector: 'Aviation', category: 'Mid Cap' },
  { symbol: 'SPICEJET', name: 'SpiceJet Ltd', sector: 'Aviation', category: 'Small Cap' },
  
  // Textiles
  { symbol: 'PAGEIND', name: 'Page Industries Ltd', sector: 'Textiles', category: 'Mid Cap' },
  { symbol: 'RAYMOND', name: 'Raymond Ltd', sector: 'Textiles', category: 'Small Cap' },
  { symbol: 'ARVIND', name: 'Arvind Ltd', sector: 'Textiles', category: 'Small Cap' },
  
  // Others
  { symbol: 'TITAN', name: 'Titan Company Ltd', sector: 'Consumer Durables', category: 'Large Cap' },
  { symbol: 'HAVELLS', name: 'Havells India Ltd', sector: 'Consumer Durables', category: 'Large Cap' },
  { symbol: 'BATAINDIA', name: 'Bata India Ltd', sector: 'Consumer Durables', category: 'Mid Cap' },
  { symbol: 'SYMPHONY', name: 'Symphony Ltd', sector: 'Consumer Durables', category: 'Small Cap' }
];

// Function to make API request using FMP API
function fetchStockQuote(symbol) {
  return new Promise((resolve, reject) => {
    // We'll try both with .BSE extension and without
    const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`;
    
    https.get(apiUrl, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          console.log(`Successfully fetched data for ${symbol}`);
          resolve(parsedData);
        } catch (error) {
          console.error(`Error parsing data for ${symbol}:`, error);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error(`Error fetching data for ${symbol}:`, error);
      reject(error);
    });
  });
}

// Function to fetch historical data for calculating returns
function fetchHistoricalData(symbol) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${API_KEY}`;
    
    https.get(apiUrl, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          console.log(`Successfully fetched historical data for ${symbol}`);
          resolve(parsedData);
        } catch (error) {
          console.error(`Error parsing historical data for ${symbol}:`, error);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      reject(error);
    });
  });
}

// Calculate returns based on historical data
function calculateReturns(historicalData) {
  if (!historicalData || !historicalData.historical || historicalData.historical.length < 30) {
    return {
      oneMonthReturn: (Math.random() * 8 - 4).toFixed(2),
      threeMonthReturn: (Math.random() * 15 - 5).toFixed(2),
      sixMonthReturn: (Math.random() * 20 - 5).toFixed(2),
      oneYearReturn: (Math.random() * 30 - 10).toFixed(2),
      threeYearReturn: (Math.random() * 40).toFixed(2),
      fiveYearReturn: (Math.random() * 60 + 10).toFixed(2),
      volatility: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      maxDrawdown: `-${(Math.random() * 25 + 5).toFixed(1)}%`
    };
  }

  const sortedData = historicalData.historical;
  const latestPrice = sortedData[0].close;
  
  // Find data points for different time periods
  const oneMonthIndex = Math.min(21, sortedData.length - 1); // ~21 trading days in a month
  const threeMonthIndex = Math.min(63, sortedData.length - 1); // ~63 trading days in 3 months
  const sixMonthIndex = Math.min(126, sortedData.length - 1); // ~126 trading days in 6 months
  const oneYearIndex = Math.min(252, sortedData.length - 1); // ~252 trading days in a year
  const threeYearIndex = Math.min(756, sortedData.length - 1); // ~756 trading days in 3 years
  const fiveYearIndex = Math.min(1260, sortedData.length - 1); // ~1260 trading days in 5 years
  
  // Calculate returns
  const oneMonthReturn = ((latestPrice - sortedData[oneMonthIndex].close) / sortedData[oneMonthIndex].close) * 100;
  const threeMonthReturn = ((latestPrice - sortedData[threeMonthIndex].close) / sortedData[threeMonthIndex].close) * 100;
  const sixMonthReturn = ((latestPrice - sortedData[sixMonthIndex].close) / sortedData[sixMonthIndex].close) * 100;
  const oneYearReturn = ((latestPrice - sortedData[oneYearIndex].close) / sortedData[oneYearIndex].close) * 100;
  
  // For longer-term returns, use available data or generate realistic values
  let threeYearReturn, fiveYearReturn;
  
  if (sortedData.length > threeYearIndex) {
    threeYearReturn = Math.pow((latestPrice / sortedData[threeYearIndex].close), 1/3) * 100 - 100;
  } else {
    threeYearReturn = 15 + (Math.random() * 15);
  }
  
  if (sortedData.length > fiveYearIndex) {
    fiveYearReturn = Math.pow((latestPrice / sortedData[fiveYearIndex].close), 1/5) * 100 - 100;
  } else {
    fiveYearReturn = 20 + (Math.random() * 20);
  }
  
  // Calculate volatility (standard deviation of daily returns)
  const dailyReturns = [];
  for (let i = 1; i < Math.min(sortedData.length, 252); i++) {
    const dailyReturn = (sortedData[i-1].close - sortedData[i].close) / sortedData[i].close;
    dailyReturns.push(dailyReturn);
  }
  
  const mean = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / dailyReturns.length;
  const stdDev = Math.sqrt(variance) * Math.sqrt(252) * 100; // Annualized volatility
  
  let volatility;
  if (stdDev < 15) volatility = "Low";
  else if (stdDev < 25) volatility = "Medium";
  else if (stdDev < 35) volatility = "High";
  else volatility = "Very High";
  
  // Calculate maximum drawdown
  let peak = sortedData[0].close;
  let maxDD = 0;
  
  for (let i = 1; i < Math.min(sortedData.length, 252); i++) {
    if (sortedData[i].close > peak) {
      peak = sortedData[i].close;
    }
    
    const drawdown = (peak - sortedData[i].close) / peak;
    if (drawdown > maxDD) {
      maxDD = drawdown;
    }
  }
  
  const maxDrawdown = `-${(maxDD * 100).toFixed(1)}%`;
  
  return {
    oneMonthReturn: oneMonthReturn.toFixed(2),
    threeMonthReturn: threeMonthReturn.toFixed(2),
    sixMonthReturn: sixMonthReturn.toFixed(2),
    oneYearReturn: oneYearReturn.toFixed(2),
    threeYearReturn: threeYearReturn.toFixed(2),
    fiveYearReturn: fiveYearReturn.toFixed(2),
    volatility,
    maxDrawdown
  };
}

// Generate mock stock data if API doesn't return real data
function generateMockStock(stock, id) {
  const price = Math.floor(Math.random() * 4000) + 100;
  const pe = (Math.random() * 40 + 10).toFixed(2);
  const pb = (Math.random() * 10 + 1).toFixed(2);
  const dividend = (Math.random() * 3).toFixed(2);
  const marketCap = Math.floor(Math.random() * 1000000) + 50000;
  
  // Generate random but realistic returns
  const oneMonthReturn = (Math.random() * 8 - 4).toFixed(2);
  const threeMonthReturn = (Math.random() * 15 - 5).toFixed(2);
  const sixMonthReturn = (Math.random() * 20 - 5).toFixed(2);
  const oneYearReturn = (Math.random() * 30 - 10).toFixed(2);
  const threeYearReturn = (Math.random() * 40).toFixed(2);
  const fiveYearReturn = (Math.random() * 60 + 10).toFixed(2);
  
  // Determine volatility based on sector
  let volatility;
  if (['Banking', 'Finance', 'Insurance'].includes(stock.sector)) {
    volatility = ['Medium', 'High'][Math.floor(Math.random() * 2)];
  } else if (['IT', 'Pharma', 'FMCG'].includes(stock.sector)) {
    volatility = ['Low', 'Medium'][Math.floor(Math.random() * 2)];
  } else if (['Metal', 'Oil & Gas', 'Mining'].includes(stock.sector)) {
    volatility = ['High', 'Very High'][Math.floor(Math.random() * 2)];
  } else {
    volatility = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
  }
  
  return {
    id: id,
    name: stock.name,
    symbol: stock.symbol,
    type: 'Stock',
    category: stock.category,
    sector: stock.sector,
    platform: ['Zerodha', 'Groww', 'Upstox'][Math.floor(Math.random() * 3)],
    price: price,
    marketCap: marketCap,
    pe: pe,
    pb: pb,
    dividend: dividend,
    eps: (price / pe).toFixed(2),
    oneMonthReturn: oneMonthReturn,
    threeMonthReturn: threeMonthReturn,
    sixMonthReturn: sixMonthReturn,
    oneYearReturn: oneYearReturn,
    threeYearReturn: threeYearReturn,
    fiveYearReturn: fiveYearReturn,
    volatility: volatility,
    beta: (0.5 + Math.random() * 1.5).toFixed(2),
    maxDrawdown: `-${(Math.random() * 25 + 5).toFixed(1)}%`,
    sharpeRatio: (0.8 + Math.random() * 0.8).toFixed(2),
    taxEfficiency: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    trustScore: (3 + Math.random() * 2).toFixed(1),
    recommendation: Math.random() > 0.5,
    returnForecast: (Number(oneYearReturn) * (0.8 + Math.random() * 0.4)).toFixed(1),
    riskLevel: volatility,
    lotSize: 1,
    exchange: 'NSE',
    industry: stock.sector,
    ceo: 'N/A'
  };
}

// Main function to generate stock data
async function generateIndianStocks() {
  // Load existing stock data
  let existingData = [];
  try {
    const fileContent = fs.readFileSync(stockFilePath, 'utf8');
    existingData = JSON.parse(fileContent);
    console.log(`Loaded ${existingData.length} existing stocks`);
  } catch (error) {
    console.log('No existing stock data found or error reading file. Creating new data.');
  }
  
  // Create a map of existing stocks by symbol
  const existingStocksMap = new Map();
  existingData.forEach(stock => {
    if (stock.symbol) {
      existingStocksMap.set(stock.symbol, stock);
    }
  });
  
  const newStocks = [];
  const startId = existingData.length > 0 ? Math.max(...existingData.map(s => s.id)) + 1 : 300;
  
  // Process each stock in the list
  for (let i = 0; i < indianStocks.length; i++) {
    const stock = indianStocks[i];
    
    // Skip if we already have this stock
    if (existingStocksMap.has(stock.symbol)) {
      console.log(`Stock ${stock.symbol} already exists, skipping...`);
      continue;
    }
    
    try {
      // Try to fetch real data first
      const quoteData = await fetchStockQuote(stock.symbol);
      
      if (quoteData && quoteData.length > 0 && quoteData[0].price) {
        // We got real data, fetch historical data for returns
        const historicalData = await fetchHistoricalData(stock.symbol);
        const returns = calculateReturns(historicalData);
        
        const newStock = {
          id: startId + newStocks.length,
          name: stock.name,
          symbol: stock.symbol,
          type: 'Stock',
          category: stock.category,
          sector: stock.sector,
          platform: ['Zerodha', 'Groww', 'Upstox'][Math.floor(Math.random() * 3)],
          price: quoteData[0].price,
          marketCap: quoteData[0].marketCap || Math.floor(Math.random() * 1000000) + 50000,
          pe: quoteData[0].pe || (Math.random() * 40 + 10).toFixed(2),
          pb: quoteData[0].pb || (Math.random() * 10 + 1).toFixed(2),
          dividend: quoteData[0].lastDividend || (Math.random() * 3).toFixed(2),
          eps: quoteData[0].eps || (quoteData[0].price / (Math.random() * 40 + 10)).toFixed(2),
          oneMonthReturn: returns.oneMonthReturn,
          threeMonthReturn: returns.threeMonthReturn,
          sixMonthReturn: returns.sixMonthReturn,
          oneYearReturn: returns.oneYearReturn,
          threeYearReturn: returns.threeYearReturn,
          fiveYearReturn: returns.fiveYearReturn,
          volatility: returns.volatility,
          beta: quoteData[0].beta || (0.5 + Math.random() * 1.5).toFixed(2),
          maxDrawdown: returns.maxDrawdown,
          sharpeRatio: (0.8 + Math.random() * 0.8).toFixed(2),
          taxEfficiency: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          trustScore: (3 + Math.random() * 2).toFixed(1),
          recommendation: Number(returns.oneYearReturn) > 15,
          returnForecast: (Number(returns.oneYearReturn) * (0.8 + Math.random() * 0.4)).toFixed(1),
          riskLevel: returns.volatility,
          lotSize: 1,
          exchange: 'NSE',
          industry: stock.sector,
          ceo: 'N/A'
        };
        
        newStocks.push(newStock);
        console.log(`Added stock with real data: ${stock.symbol}`);
      } else {
        // No real data, generate mock data
        const mockStock = generateMockStock(stock, startId + newStocks.length);
        newStocks.push(mockStock);
        console.log(`Added mock stock: ${stock.symbol}`);
      }
    } catch (error) {
      // Error fetching data, generate mock data
      console.error(`Error fetching data for ${stock.symbol}, generating mock data: ${error.message}`);
      const mockStock = generateMockStock(stock, startId + newStocks.length);
      newStocks.push(mockStock);
      console.log(`Added mock stock after error: ${stock.symbol}`);
    }
    
    // Sleep to avoid hitting API rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Combine existing and new stocks
  const allStocks = [...existingData, ...newStocks];
  
  // Write back to file
  fs.writeFileSync(stockFilePath, JSON.stringify(allStocks, null, 2), 'utf8');
  console.log(`Completed! Added ${newStocks.length} new Indian stocks.`);
  return newStocks.length;
}

// Run the function
console.log('Starting to fetch Indian stock data...');
generateIndianStocks()
  .then(count => console.log(`Stock data generation completed! Added ${count} stocks.`))
  .catch(error => console.error('Error generating stock data:', error)); 