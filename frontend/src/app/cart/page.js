// src/app/cart/page.js
'use client';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, isLoading, removeFromCart, updateCartItem } = useCart();
  const router = useRouter();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.productId.basePrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateTotal();
  const gst = subtotal * 0.03;
  const total = subtotal + gst;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.productId.mainImage || '/placeholder.jpg'}
                  alt={item.productId.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.productId.metal.purity} {item.productId.metal.type}
                </p>
                <p className="text-blue-600 font-semibold mt-1">
                  ₹{item.productId.basePrice.toLocaleString()}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => updateCartItem({
                      itemId: item._id,
                      data: { quantity: Math.max(1, item.quantity - 1) }
                    })}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem({
                      itemId: item._id,
                      data: { quantity: item.quantity + 1 }
                    })}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart({ itemId: item._id })}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>GST (3%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block text-center text-blue-600 mt-4 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}