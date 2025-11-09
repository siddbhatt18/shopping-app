// src/app/products/page.js
'use client';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    metal: '',
    purity: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collection</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <div className="flex items-center mb-4">
              <Filter size={20} className="mr-2" />
              <h2 className="font-semibold text-lg">Filters</h2>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Categories</option>
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bracelets">Bracelets</option>
                <option value="pendants">Pendants</option>
                <option value="bangles">Bangles</option>
              </select>
            </div>

            {/* Metal Type */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Metal Type</label>
              <select
                value={filters.metal}
                onChange={(e) => handleFilterChange('metal', e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Metals</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>

            {/* Purity */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Purity</label>
              <select
                value={filters.purity}
                onChange={(e) => handleFilterChange('purity', e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Purities</option>
                <option value="24K">24K</option>
                <option value="22K">22K</option>
                <option value="18K">18K</option>
                <option value="14K">14K</option>
                <option value="925">925 Silver</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Price Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-1/2 border rounded-md p-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-1/2 border rounded-md p-2"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                category: '',
                metal: '',
                purity: '',
                minPrice: '',
                maxPrice: '',
                sort: 'newest',
              })}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {data?.data?.total || 0} products found
            </p>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : data?.data?.products?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.data.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}