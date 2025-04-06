'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

// Fund options for dropdown
const FUND_OPTIONS = [
  "UTI Short term Income Direct Growth",
  "ICICI Prudential All Seasons Bond Fund Direct Growth",
  "Axis Short Term Direct Fund Growth",
  "Kotak Bond Short Term Fund Direct Growth",
  "ICICI Prudential Short Term Fund Direct Growth",
  "HDFC Short Term Debt Fund Direct Growth",
  "SBI Short Term Debt Fund Direct Growth",
  "Aditya Birla Sun Life Short Term Fund Direct Growth",
  "DSP Short Term Fund Direct Growth"
];

// Category options for dropdown
const CATEGORY_OPTIONS = [
  "Equity",
  "Debt",
  "Hybrid",
  "Other"
];

// Risk type options for dropdown
const RISK_TYPE_OPTIONS = [
  "Low",
  "Moderate",
  "High",
  "Very High",
  "Low Risk",
  "Low to Moderate Risk",
  "Moderate Risk",
  "Moderately Low Risk",
  "Moderately High Risk",
  "High Risk",
  "Very High Risk"
];

interface PredictionResult {
  prediction?: number;
  error?: string;
}

export default function Insights() {
  // Form state
  const [fundName, setFundName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [riskType, setRiskType] = useState<string>("");
  const [fundRating, setFundRating] = useState<number>(3.0);
  const [return1yr, setReturn1yr] = useState<string>("");
  const [return3yr, setReturn3yr] = useState<string>("");
  
  // Loading and results state
  const [loading1yr, setLoading1yr] = useState<boolean>(false);
  const [loading3yr, setLoading3yr] = useState<boolean>(false);
  const [result1yr, setResult1yr] = useState<PredictionResult | null>(null);
  const [result3yr, setResult3yr] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle 1-year prediction
  const handlePredict1yr = async () => {
    if (!validateForm()) return;
    
    setLoading1yr(true);
    setError(null);
    
    try {
      const payload = createPayload();
      console.log("Request payload:", JSON.stringify(payload, null, 2));
      
      // Fix: Use traditional fetch with proper headers and stringify
      const response = await fetch("https://fund-rate-kt32.onrender.com/predict_1yr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      console.log("Response status:", response.status);
      
      // Try to get response body even if status is error
      const responseText = await response.text();
      console.log("Response body:", responseText);
      
      if (!response.ok) {
        throw new Error(`API returned error: ${response.status}. Response: ${responseText}`);
      }
      
      // Parse the JSON only if we have text
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error("Invalid response format from API");
      }
      
      // Extract the prediction from the result array
      setResult1yr({ prediction: data.result?.[0] || 0 });
    } catch (err) {
      console.error("Error predicting 1-year return:", err);
      setResult1yr({ error: err instanceof Error ? err.message : "Unknown error occurred" });
      setError("Failed to get prediction. Please try again. Error: " + (err instanceof Error ? err.message : "Unknown"));
    } finally {
      setLoading1yr(false);
    }
  };

  // Handle 3-year prediction
  const handlePredict3yr = async () => {
    if (!validateForm()) return;
    
    setLoading3yr(true);
    setError(null);
    
    try {
      const payload = createPayload();
      console.log("Request payload:", JSON.stringify(payload, null, 2));
      
      // Fix: Use traditional fetch with proper headers and stringify
      const response = await fetch("https://fund-rate-kt32.onrender.com/predict_3yr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      console.log("Response status:", response.status);
      
      // Try to get response body even if status is error
      const responseText = await response.text();
      console.log("Response body:", responseText);
      
      if (!response.ok) {
        throw new Error(`API returned error: ${response.status}. Response: ${responseText}`);
      }
      
      // Parse the JSON only if we have text
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error("Invalid response format from API");
      }
      
      // Extract the prediction from the result array
      setResult3yr({ prediction: data.result?.[0] || 0 });
    } catch (err) {
      console.error("Error predicting 3-year return:", err);
      setResult3yr({ error: err instanceof Error ? err.message : "Unknown error occurred" });
      setError("Failed to get prediction. Please try again. Error: " + (err instanceof Error ? err.message : "Unknown"));
    } finally {
      setLoading3yr(false);
    }
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    if (!fundName) {
      setError("Please select a fund name");
      return false;
    }
    
    if (!category) {
      setError("Please select a category");
      return false;
    }
    
    if (!riskType) {
      setError("Please select a risk type");
      return false;
    }
    
    return true;
  };

  // Create payload for API
  const createPayload = () => {
    // Define payload type with optional properties
    interface PayloadType {
      "fund_name": string;
      "category": string;
      "risk_type": string;
      "fund_rating": number;
      "return_1yr"?: number;
      "return_3yr"?: number;
    }
    
    const payload: PayloadType = {
      "fund_name": fundName,
      "category": category,
      "risk_type": riskType,
      "fund_rating": fundRating
    };
    
    // Add optional parameters if provided
    if (return1yr) {
      payload["return_1yr"] = parseFloat(return1yr);
    }
    
    if (return3yr) {
      payload["return_3yr"] = parseFloat(return3yr);
    }
    
    return payload;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-black">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black">Fund Return Prediction</h2>
        <p className="text-black">Enter fund details to predict potential returns</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
              </div>
      )}
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="fund-name" className="text-black font-medium">Fund Name</label>
          <select
            id="fund-name"
            value={fundName}
            onChange={(e) => setFundName(e.target.value)}
            className="form-select text-black border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select a fund</option>
            {FUND_OPTIONS.map((fund) => (
              <option key={fund} value={fund}>
                {fund}
              </option>
            ))}
          </select>
            </div>
        
        <div className="grid gap-2">
          <label htmlFor="category" className="text-black font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select text-black border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select a category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          </div>
        
        <div className="grid gap-2">
          <label htmlFor="risk-type" className="text-black font-medium">Risk Type</label>
          <select
            id="risk-type"
            value={riskType}
            onChange={(e) => setRiskType(e.target.value)}
            className="form-select text-black border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select risk type</option>
            {RISK_TYPE_OPTIONS.map((risk) => (
              <option key={risk} value={risk}>
                {risk}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="fund-rating" className="text-black font-medium">
            Fund Rating: {fundRating.toFixed(1)}
          </label>
          <input
            type="range"
            id="fund-rating"
            min={0}
            max={5}
            step={0.1}
            value={fundRating}
            onChange={(e) => setFundRating(parseFloat(e.target.value))}
            className="py-4"
          />
            </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="return-1yr" className="text-black font-medium">1 Year Return (%) - Optional</label>
            <input
              type="number"
              id="return-1yr"
              value={return1yr}
              onChange={(e) => setReturn1yr(e.target.value)}
              placeholder="e.g., 12.5"
              className="border border-gray-300 rounded-md p-2 text-black"
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="return-3yr" className="text-black font-medium">3 Year Return (%) - Optional</label>
            <input
              type="number"
              id="return-3yr"
              value={return3yr}
              onChange={(e) => setReturn3yr(e.target.value)}
              placeholder="e.g., 24.8"
              className="border border-gray-300 rounded-md p-2 text-black"
            />
              </div>
            </div>
      </div>

      <div className="mt-8 flex justify-between flex-col sm:flex-row gap-4">
        <button
          onClick={handlePredict1yr}
          disabled={loading1yr || loading3yr}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
        >
          {loading1yr ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.163 0 1 5.163 1 12s5.163 12 12 12 12-5.163 12-12S18.837 0 12 0v4c3.996 0 7.5 3.004 8 7z"></path>
                    </svg>
              Predicting...
            </>
          ) : (
            "Predict 1 Year Return"
          )}
        </button>
        
                  <button 
          onClick={handlePredict3yr}
          disabled={loading1yr || loading3yr}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
        >
          {loading3yr ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.163 0 1 5.163 1 12s5.163 12 12 12 12-5.163 12-12S18.837 0 12 0v4c3.996 0 7.5 3.004 8 7z"></path>
                    </svg>
              Predicting...
            </>
          ) : (
            "Predict 3 Year Return"
          )}
                  </button>
                </div>
      
      {(result1yr || result3yr) && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black">Prediction Results</h2>
          
          {result1yr && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h3 className="font-medium text-blue-800 mb-2">1 Year Prediction</h3>
              {result1yr.prediction !== undefined ? (
                <p className="text-2xl font-bold text-blue-700">
                  {result1yr.prediction.toFixed(2)}%
                </p>
              ) : (
                <p className="text-red-600">{result1yr.error || "Unable to get prediction"}</p>
              )}
              </div>
          )}
          
          {result3yr && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <h3 className="font-medium text-green-800 mb-2">3 Year Prediction</h3>
              {result3yr.prediction !== undefined ? (
                <p className="text-2xl font-bold text-green-700">
                  {result3yr.prediction.toFixed(2)}%
                </p>
              ) : (
                <p className="text-red-600">{result3yr.error || "Unable to get prediction"}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
