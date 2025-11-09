// src/components/Footer.js
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">💎 LuxeJewels</h3>
            <p className="text-gray-400 text-sm">
              Your trusted destination for premium certified jewellery with live market rates.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="cursor-pointer hover:text-blue-400" size={20} />
              <Instagram className="cursor-pointer hover:text-blue-400" size={20} />
              <Twitter className="cursor-pointer hover:text-blue-400" size={20} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns & Exchange</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products?category=rings" className="hover:text-white">Rings</Link></li>
              <li><Link href="/products?category=necklaces" className="hover:text-white">Necklaces</Link></li>
              <li><Link href="/products?category=earrings" className="hover:text-white">Earrings</Link></li>
              <li><Link href="/products?category=bracelets" className="hover:text-white">Bracelets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                +91 1234567890
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@luxejewels.com
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 LuxeJewels. All rights reserved. | 100% Certified Jewellery</p>
        </div>
      </div>
    </footer>
  );
}