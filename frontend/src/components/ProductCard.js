// src/components/ProductCard.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { addToCart } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addToCart({
        userId: session.user.id,
        productId: product._id,
        quantity: 1
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        {/* Image */}
        <div className="relative h-64 bg-gray-100">
          <Image
            src={product.mainImage || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className={`p-2 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white'} shadow-md`}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
            >
              <ShoppingCart size={18} />
            </button>
          </div>

          {/* Badge */}
          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{product.metal.purity} {product.metal.type}</span>
            <span>{product.metal.weight}g</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-blue-600">
                {formatPrice(product.basePrice)}
              </p>
              <p className="text-xs text-gray-500">+ GST & Making</p>
            </div>
            
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}