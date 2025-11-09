'use client';
import { useQuery } from '@tanstack/react-query';
import { getLivePrices } from '@/lib/api';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export default function LiveRatesPage() {
  const { data: prices, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['livePrices'],
    queryFn: getLivePrices,
    refetchInterval: 30 * 60 * 1000,
  });

  const priceData = prices?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading live prices...</p>
      </div>
    );
  }

  const isPositive = priceData?.change24h >= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Live Metal Rates</h1>
          <p className="text-gray-600">Real-time market prices updated every 30 minutes</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} size={20} />
          Refresh
        </button>
      </div>

      {/* 24h Change */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">24 Hour Change</p>
            <div className={`flex items-center text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="mr-2" /> : <TrendingDown className="mr-2" />}
              {isPositive ? '+' : ''}{priceData?.change24h?.toFixed(2)}%
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Last Updated</p>
            <p className="font-semibold text-gray-700">
              {new Date(priceData?.lastUpdated).toLocaleString()}
            </p>
            {priceData?.isEstimated && (
              <p className="text-yellow-600 font-medium mt-1">⚠️ Estimated Prices</p>
            )}
          </div>
        </div>
      </div>

      {/* Gold Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">💛 Gold Rates</h2>
          <div className="space-y-3">
            {Object.entries(priceData?.gold || {}).map(([purity, price]) => (
              <div key={purity} className="flex justify-between items-center bg-white/20 rounded-md p-3">
                <span className="font-semibold">{purity}</span>
                <span className="text-xl font-bold">₹{price?.toLocaleString()}/gram</span>
              </div>
            ))}
          </div>
        </div>

        {/* Silver Rates */}
        <div className="bg-gradient-to-br from-gray-300 to-gray-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">⚪ Silver Rates</h2>
          <div className="space-y-3">
            {Object.entries(priceData?.silver || {}).map(([purity, price]) => (
              <div key={purity} className="flex justify-between items-center bg-white/20 rounded-md p-3">
                <span className="font-semibold">{purity}</span>
                <span className="text-xl font-bold">₹{price?.toLocaleString()}/gram</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platinum Rates */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">💎 Platinum Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(priceData?.platinum || {}).map(([purity, price]) => (
            <div key={purity} className="flex justify-between items-center bg-white/20 rounded-md p-3">
              <span className="font-semibold">{purity}</span>
              <span className="text-xl font-bold">₹{price?.toLocaleString()}/gram</span>
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
        <h3 className="font-bold text-lg mb-2">ℹ️ Important Information</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Prices are updated every 30 minutes from international markets</li>
          <li>Final product prices include making charges and GST (3%)</li>
          <li>Prices may vary based on product weight and design complexity</li>
          <li>All jewellery comes with 100% purity certification</li>
        </ul>
      </div>
    </div>
  );
}