// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LuxeJewels - Premium Certified Jewellery',
  description: 'Shop certified gold, silver, and diamond jewellery with live market rates',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}