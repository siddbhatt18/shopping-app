// src/components/Navbar.js
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>✨ Free Shipping on Orders Above ₹50,000</p>
          <p>🔒 100% Certified Jewellery</p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            💎 LuxeJewels
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products?category=rings" className="hover:text-blue-600">Rings</Link>
            <Link href="/products?category=necklaces" className="hover:text-blue-600">Necklaces</Link>
            <Link href="/products?category=earrings" className="hover:text-blue-600">Earrings</Link>
            <Link href="/products?category=bracelets" className="hover:text-blue-600">Bracelets</Link>
            <Link href="/live-rates" className="hover:text-blue-600">Live Rates</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/search" className="hover:text-blue-600">
              <Search size={20} />
            </Link>
            
            <Link href="/wishlist" className="hover:text-blue-600">
              <Heart size={20} />
            </Link>
            
            <Link href="/cart" className="hover:text-blue-600 relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <Link href="/account" className="hover:text-blue-600">
                <User size={20} />
              </Link>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products?category=rings" className="block py-2 hover:text-blue-600">Rings</Link>
            <Link href="/products?category=necklaces" className="block py-2 hover:text-blue-600">Necklaces</Link>
            <Link href="/products?category=earrings" className="block py-2 hover:text-blue-600">Earrings</Link>
            <Link href="/products?category=bracelets" className="block py-2 hover:text-blue-600">Bracelets</Link>
            <Link href="/live-rates" className="block py-2 hover:text-blue-600">Live Rates</Link>
          </div>
        )}
      </div>
    </nav>
  );
}