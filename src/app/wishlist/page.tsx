'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/wishlist';
import { products as catalog } from '@/lib/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  // Find the full product details from the catalog based on stored IDs
  const wishlistProducts = items
    .map(wishlistItem => catalog.find(p => p.id === wishlistItem.id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-serif font-bold text-gray-900">My Wishlist</h1>
          </div>
          <span className="text-gray-500 font-medium">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Save your favorite plants, seeds, and gardening tools here. They'll be waiting for you when you're ready!
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-[#2E7D32] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#1B5E20] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2E7D32] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
