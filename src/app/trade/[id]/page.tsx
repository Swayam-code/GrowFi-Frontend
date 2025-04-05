"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import React from "react";

// Mock data for investments
const investmentsData = [
  {
    id: "1",
    name: "HDFC Small Cap Fund",
    type: "Mutual Fund",
    platform: "MF Central",
    units: 450.256,
    nav: 58.25,
    value: 26227.41,
    gain: 8227.41,
    gainPercentage: 45.7,
    trustScore: 4.5,
    riskLevel: "medium",
    returnForecast: 12.5,
    sipEnabled: true,
    minInvestment: 500,
    exitLoad: "1% for redemption within 365 days",
    category: "Equity: Small Cap",
    amc: "HDFC Mutual Fund",
  },
  {
    id: "2",
    name: "Reliance Industries",
    type: "Stock",
    platform: "Zerodha",
    units: 15,
    nav: 2480.5,
    value: 37207.5,
    gain: 7207.5,
    gainPercentage: 24.0,
    trustScore: 4.8,
    riskLevel: "low",
    returnForecast: 10.2,
    sipEnabled: false,
    lotSize: 1,
    marketCap: "Large Cap",
    sector: "Oil & Gas, Telecom",
    segment: "NSE",
  },
  {
    id: "3",
    name: "ICICI Prudential Technology Fund",
    type: "Mutual Fund",
    platform: "MF Central",
    units: 1200.125,
    nav: 32.75,
    value: 39304.09,
    gain: 9304.09,
    gainPercentage: 31.0,
    trustScore: 3.9,
    riskLevel: "high",
    returnForecast: 18.5,
    sipEnabled: true,
    minInvestment: 1000,
    exitLoad: "1% for redemption within 180 days",
    category: "Equity: Sectoral/Thematic",
    amc: "ICICI Prudential Mutual Fund",
  },
  {
    id: "4",
    name: "TATA Motors",
    type: "Stock",
    platform: "Angel One",
    units: 40,
    nav: 650.75,
    value: 26030.0,
    gain: 10030.0,
    gainPercentage: 62.7,
    trustScore: 4.2,
    riskLevel: "medium",
    returnForecast: 15.8,
    sipEnabled: false,
    lotSize: 1,
    marketCap: "Large Cap",
    sector: "Automobile",
    segment: "NSE",
  },
];

interface TradeInfoProps {
  item: any;
  tradeType: "buy" | "sell";
}

const TradeInfo = ({ item, tradeType }: TradeInfoProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {item?.name || "Investment"}
          </h2>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                item?.type === "Mutual Fund"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {item?.type || "Investment"}
            </span>
          </div>
          <p className="text-sm text-black mt-1">
            Via {item?.platform || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-blue-50 px-3 py-1 rounded-lg">
            <span className="text-sm font-medium text-blue-700">
              {tradeType === "buy" ? "Buy Order" : "Sell Order"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-black mb-1">Current NAV/Price</p>
          <p className="font-medium">
            ₹
            {item?.nav
              ? Number(item.nav).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "0.00"}
          </p>
        </div>

        {tradeType === "sell" && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-black mb-1">Your Units</p>
            <p className="font-medium">
              {item?.units
                ? Number(item.units).toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                : "0.000"}
            </p>
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-black mb-1">Expected Return</p>
          <p className="font-medium text-green-600">
            +{item?.returnForecast || "0.00"}%
          </p>
        </div>

        {item?.type === "Mutual Fund" && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-black mb-1">Minimum Investment</p>
            <p className="font-medium">₹{item?.minInvestment || "0.00"}</p>
          </div>
        )}

        {item?.type === "Stock" && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-black mb-1">Lot Size</p>
            <p className="font-medium">{item?.lotSize || "1"}</p>
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-black mb-1">Risk Level</p>
          <div className="flex items-center">
            <div
              className={`h-2 w-2 rounded-full mr-1 ${
                item?.riskLevel === "low"
                  ? "bg-green-500"
                  : item?.riskLevel === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>
            <p className="font-medium">
              {item?.riskLevel
                ? item.riskLevel.charAt(0).toUpperCase() +
                  item.riskLevel.slice(1)
                : "Medium"}
            </p>
          </div>
        </div>
      </div>

      {tradeType === "buy" && item?.type === "Mutual Fund" && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
          <p className="text-xs text-yellow-700">
            <span className="font-medium">Exit Load:</span>{" "}
            {item?.exitLoad || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

const TradeForm = ({
  item,
  tradeType,
  setOrderPlaced,
}: {
  item: any;
  tradeType: "buy" | "sell";
  setOrderPlaced: (value: boolean) => void;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [units, setUnits] = useState<string>("");
  const [tradeBy, setTradeBy] = useState<"amount" | "units">("amount");
  const [errors, setErrors] = useState<{ amount?: string; units?: string }>({});
  const [estimatedValue, setEstimatedValue] = useState<number>(0);
  const [estimatedUnits, setEstimatedUnits] = useState<number>(0);
  const [isSIP, setIsSIP] = useState<boolean>(false);
  const [sipFrequency, setSipFrequency] = useState<string>("monthly");

  // Calculate estimated values when inputs change
  useEffect(() => {
    if (tradeBy === "amount" && amount) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        const calculatedUnits = amountValue / item.nav;
        setEstimatedUnits(calculatedUnits);
      }
    } else if (tradeBy === "units" && units) {
      const unitsValue = parseFloat(units);
      if (!isNaN(unitsValue)) {
        const calculatedAmount = unitsValue * item.nav;
        setEstimatedValue(calculatedAmount);
      }
    }
  }, [amount, units, tradeBy, item.nav]);

  const validateForm = () => {
    const newErrors: { amount?: string; units?: string } = {};
    let isValid = true;

    if (tradeBy === "amount") {
      if (!amount) {
        newErrors.amount = "Amount is required";
        isValid = false;
      } else if (parseFloat(amount) <= 0) {
        newErrors.amount = "Amount must be greater than 0";
        isValid = false;
      } else if (
        item.type === "Mutual Fund" &&
        item.minInvestment &&
        parseFloat(amount) < item.minInvestment
      ) {
        newErrors.amount = `Minimum investment is ₹${item.minInvestment}`;
        isValid = false;
      }
    } else {
      if (!units) {
        newErrors.units = "Units are required";
        isValid = false;
      } else if (parseFloat(units) <= 0) {
        newErrors.units = "Units must be greater than 0";
        isValid = false;
      } else if (
        tradeType === "sell" &&
        item.units &&
        parseFloat(units) > item.units
      ) {
        newErrors.units = `You only have ${item.units.toFixed(3)} units`;
        isValid = false;
      } else if (
        item.type === "Stock" &&
        item.lotSize &&
        parseFloat(units) % item.lotSize !== 0
      ) {
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
    <div
      className="bg-white rounded-xl p-6 shadow-md mt-6 opacity-0 translate-y-4 animate-fade-in-up"
      style={{ animationDelay: "100ms" }}
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {tradeType === "buy" ? "Place Buy Order" : "Place Sell Order"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Trade Options */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="tradeBy"
              className="block text-sm font-medium text-black"
            >
              Trade By
            </label>
          </div>
          <div className="flex">
            <button
              type="button"
              className={`flex-1 py-2 px-3 text-sm font-medium ${
                tradeBy === "amount"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setTradeBy("amount")}
            >
              Amount
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-3 text-sm font-medium ${
                tradeBy === "units"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setTradeBy("units")}
            >
              Units
            </button>
          </div>
        </div>

        {/* Amount Input */}
        {tradeBy === "amount" && (
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-black mb-2"
            >
              {tradeType === "buy" ? "Investment Amount" : "Redemption Amount"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-black">₹</span>
              </div>
              <input
                type="number"
                id="amount"
                className="block w-full pl-8 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {tradeType === "buy" && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    onClick={() =>
                      item.minInvestment &&
                      setAmount(item.minInvestment.toString())
                    }
                  >
                    Min
                  </button>
                </div>
              )}
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
            {estimatedUnits > 0 && (
              <p className="mt-2 text-sm text-black">
                Estimated Units: {estimatedUnits.toFixed(3)}
              </p>
            )}
          </div>
        )}

        {/* Units Input */}
        {tradeBy === "units" && (
          <div className="mb-6">
            <label
              htmlFor="units"
              className="block text-sm font-medium text-black mb-2"
            >
              Number of Units
            </label>
            <input
              type="number"
              id="units"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter units"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
            {errors.units && (
              <p className="mt-1 text-sm text-red-600">{errors.units}</p>
            )}
            {estimatedValue > 0 && (
              <p className="mt-2 text-sm text-black">
                Estimated Value: ₹{estimatedValue.toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* SIP Option (only for buy and mutual funds) */}
        {tradeType === "buy" &&
          item.type === "Mutual Fund" &&
          item.sipEnabled && (
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="sip"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={isSIP}
                  onChange={() => setIsSIP(!isSIP)}
                />
                <label htmlFor="sip" className="ml-2 block text-sm text-black">
                  Set up SIP (Systematic Investment Plan)
                </label>
              </div>

              {isSIP && (
                <div className="mt-3 pl-6">
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                    value={sipFrequency}
                    onChange={(e) => setSipFrequency(e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                  <p className="mt-2 text-sm text-black">
                    Your account will be debited ₹{amount || "0"} every{" "}
                    {sipFrequency === "daily" ? "day" : sipFrequency}
                  </p>
                </div>
              )}
            </div>
          )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200 ${
            tradeType === "buy"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {tradeType === "buy"
            ? isSIP
              ? "Set Up SIP"
              : "Buy Now"
            : "Sell Now"}
        </button>
      </form>
    </div>
  );
};

const OrderSuccess = ({
  item,
  tradeType,
}: {
  item: any;
  tradeType: "buy" | "sell";
}) => {
  const router = useRouter();

  return (
    <div className="mt-6 bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center opacity-0 translate-y-4 animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Order Placed Successfully!
      </h2>

      <p className="text-gray-600 mb-6">
        Your {tradeType === "buy" ? "purchase" : "sell"} order for{" "}
        <span className="font-medium">{item.name}</span> has been placed and
        will be processed shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => router.push("/dashboard")}
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

export default function TradePage() {
  const router = useRouter();
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const { portfolioData, executeTrade } = usePortfolio();
  const [tradeType, setTradeType] = useState<string>("buy");
  const [units, setUnits] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [marketPrice, setMarketPrice] = useState<number | null>(null);

  // Find the holding from portfolio data
  const holding = portfolioData.holdings.find((h) => h.id.toString() === id);

  // Get market price on load
  useEffect(() => {
    if (holding) {
      // Simulate market price with some variation (in a real app, this would be an API call)
      const variation = Math.random() * 0.04 - 0.02; // -2% to +2%
      const simulatedPrice = holding.nav * (1 + variation);
      setMarketPrice(simulatedPrice);
      setPrice(simulatedPrice.toFixed(2));
    }
  }, [holding]);

  // Reset error when inputs change
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [units, price, tradeType]);

  const handleUnitsChange = (value: string) => {
    // Only allow numeric input with up to 3 decimal places
    if (value === "" || /^\d*\.?\d{0,3}$/.test(value)) {
      setUnits(value);
    }
  };

  const handlePriceChange = (value: string) => {
    // Only allow numeric input with up to 2 decimal places
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  const handleUseMarketPrice = () => {
    if (marketPrice) {
      setPrice(
        marketPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  };

  const validateInputs = (): boolean => {
    if (!units || parseFloat(units) <= 0) {
      setError("Please enter a valid number of units.");
      return false;
    }

    if (!price || parseFloat(price) <= 0) {
      setError("Please enter a valid price.");
      return false;
    }

    if (tradeType === "sell" && holding && parseFloat(units) > holding.units) {
      setError(
        `You cannot sell more than ${Number(holding.units).toLocaleString(
          undefined,
          { minimumFractionDigits: 3, maximumFractionDigits: 3 }
        )} units.`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      setProcessing(true);
      setError(null);

      try {
        const success = executeTrade({
          id: parseInt(id),
          units: parseFloat(units),
          tradeType: tradeType as "buy" | "sell",
          price: parseFloat(price),
        });

        if (success) {
          setProcessingStatus("success");
          setTimeout(() => {
            router.push("/portfolio");
          }, 1500);
        } else {
          setProcessingStatus("error");
          setError("Failed to execute trade. Please try again.");
          setTimeout(() => {
            setProcessing(false);
            setProcessingStatus("idle");
          }, 1500);
        }
      } catch (err) {
        setProcessingStatus("error");
        setError(
          "There was an error processing your transaction. Please try again."
        );
        setTimeout(() => {
          setProcessing(false);
          setProcessingStatus("idle");
        }, 1500);
      }
    }
  };

  // If holding not found
  if (!holding) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Investment Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The investment you are looking for does not exist or has been
            removed.
          </p>
          <Link href="/portfolio">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Return to Portfolio
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {tradeType === "buy" ? "Buy" : "Sell"} {holding.name}
        </h1>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
              tradeType === "buy"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setTradeType("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
              tradeType === "sell"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setTradeType("sell")}
          >
            Sell
          </button>
        </div>
      </div>

      <TradeInfo item={holding} tradeType={tradeType as "buy" | "sell"} />

      <div className="bg-white rounded-xl p-6 shadow-md mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Trade Details</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="units"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Units
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="units"
              className="block w-full pr-20 sm:text-sm border-gray-300 rounded-md py-2 px-3 border focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="0.000"
              value={units}
              onChange={(e) => handleUnitsChange(e.target.value)}
              disabled={processing}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-600 hover:text-blue-800 focus:outline-none mx-2"
                onClick={() => {
                  if (holding && tradeType === "sell") {
                    handleUnitsChange(holding.units.toString());
                  }
                }}
                disabled={processing || tradeType !== "sell"}
              >
                Use max (
                {Number(holding.units).toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}
                )
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price per Unit (₹)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="price"
              className="block w-full pr-20 sm:text-sm border-gray-300 rounded-md py-2 px-3 border focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="0.00"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              disabled={processing}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-600 hover:text-blue-800 focus:outline-none mx-2"
                onClick={handleUseMarketPrice}
                disabled={processing}
              >
                Use market price (₹
                {marketPrice
                  ? Number(marketPrice).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "Loading..."}
                )
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">Total Value:</p>
            <p className="text-lg font-bold text-gray-900">
              ₹
              {units && price
                ? (parseFloat(units) * parseFloat(price)).toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )
                : "0.00"}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className={`w-full py-3 px-4 rounded-lg text-base font-medium text-white transition-all duration-200 ${
              processing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
            }`}
            onClick={handleSubmit}
            disabled={processing}
          >
            {processing ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {processingStatus === "success"
                  ? "Order Placed!"
                  : processingStatus === "error"
                  ? "Failed"
                  : "Processing..."}
              </div>
            ) : (
              `Place ${tradeType === "buy" ? "Buy" : "Sell"} Order`
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/portfolio"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Cancel and return to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
