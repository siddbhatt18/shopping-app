// src/app/page.js
'use client';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import LivePriceWidget from '@/components/LivePriceWidget';
import Link from 'next/link';
import { ArrowRight, Award, Shield, Truck } from 'lucide-react';

export default function Home() {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Discover Timeless Elegance
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Premium certified jewellery with live market rates and transparent pricing
            </p>
            <div className="flex space-x-4">
              <Link
                href="/products"
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 flex items-center"
              >
                Shop Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/live-rates"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50"
              >
                View Live Rates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Prices */}
      <section className="container mx-auto px-4 -mt-10 mb-16">
        <LivePriceWidget />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Award className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-semibold text-lg mb-2">100% Certified</h3>
            <p className="text-gray-600">All jewellery comes with authenticity certificates</p>
          </div>
          <div className="text-center p-6">
            <Shield className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-gray-600">Safe and encrypted payment processing</p>
          </div>
          <div className="text-center p-6">
            <Truck className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders above ₹50,000</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Collection</h2>
          <Link href="/products" className="text-blue-600 hover:underline flex items-center">
            View All <ArrowRight className="ml-1" size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredProducts?.data?.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['rings', 'necklaces', 'earrings', 'bracelets'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group"
              >
                <div className="bg-gray-100 rounded-lg p-8 text-center hover:bg-blue-50 transition-colors">
                  <h3 className="text-xl font-semibold capitalize group-hover:text-blue-600">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}