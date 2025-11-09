// src/components/LivePriceWidget.js
'use client';
import { useQuery } from '@tanstack/react-query';
import { getLivePrices } from '@/lib/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function LivePriceWidget() {
  const { data: prices, isLoading } = useQuery({
    queryKey: ['livePrices'],
    queryFn: getLivePrices,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg">
        <p className="text-center">Loading prices...</p>
      </div>
    );
  }

  const priceData = prices?.data;
  const isPositive = priceData?.change24h >= 0;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Live Market Rates</h3>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1">{Math.abs(priceData?.change24h || 0).toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs opacity-80">Gold 24K</p>
          <p className="text-lg font-bold">₹{priceData?.gold?.['24K']?.toLocaleString()}/g</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Gold 22K</p>
          <p className="text-lg font-bold">₹{priceData?.gold?.['22K']?.toLocaleString()}/g</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Silver</p>
          <p className="text-lg font-bold">₹{priceData?.silver?.['925']?.toLocaleString()}/g</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Platinum</p>
          <p className="text-lg font-bold">₹{priceData?.platinum?.['PT950']?.toLocaleString()}/g</p>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-2">
        Updated: {new Date(priceData?.lastUpdated).toLocaleTimeString()}
        {priceData?.isEstimated && ' (Estimated)'}
      </p>
    </div>
  );
}