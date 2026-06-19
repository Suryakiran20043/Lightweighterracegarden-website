'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { Product } from '@/lib/data/products';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = mounted ? isInWishlist(product.id) : false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  // Default = Vegetable, Hover = Package
  const defaultImage = product.image;
  const hoverImage = product.hoverImage || null; 
  
  const isOutOfStock = product.stock === 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full w-full mx-auto group transition-all duration-[0.45s] ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative"
    >
      
      {/* Product Image Box (280x280 strict) */}
      <div className="relative w-full aspect-square bg-[#F9F9F9] overflow-hidden">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />

        {/* Wishlist Button */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-30 bg-white rounded-full p-2 shadow-sm hover:scale-110 active:scale-95 transition-transform duration-200 group/btn"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-[18px] h-[18px] transition-colors duration-200 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/btn:text-red-500'}`} 
          />
        </button>

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-3 left-3 z-30 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-md">
            OUT OF STOCK
          </div>
        )}

        {/* Default View (Package) */}
        <img 
          src={defaultImage} 
          alt={`${product.name} Package`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 pointer-events-none ${hoverImage && !isOutOfStock ? 'group-hover:opacity-0' : ''} ${isOutOfStock ? 'opacity-60 grayscale-[30%]' : ''}`} 
          loading="lazy"
        />

        {/* Hover View (Actual Vegetable) */}
        {hoverImage && !isOutOfStock && (
          <img 
            src={hoverImage} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
            loading="lazy"
          />
        )}
      </div>

      {/* Product Details (Centered, Compact) */}
      <div className="flex flex-col flex-1 p-4 items-center justify-between text-center bg-white">
        
        <div className="w-full flex flex-col items-center">
          {/* Name */}
          <Link href={`/shop/${product.slug}`} className="w-full">
            <h3 className="text-[#0B6B55] text-[15px] font-medium mb-1.5 leading-snug line-clamp-2 hover:underline decoration-[#0B6B55] underline-offset-2">
              {product.name}
            </h3>
          </Link>
          
          {/* Pricing */}
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-[#0B6B55] text-[14px]">Rs. {product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-[13px] text-[#0B6B55] line-through opacity-70">Rs. {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          disabled={isOutOfStock}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem({ id: product.id, productId: product.productId, name: product.name, price: product.price, sku: product.sku, image: product.image }, 1); }}
          className={`w-full text-white text-[12px] tracking-[0.5px] font-bold py-3 rounded-full transition-all duration-300
            ${isOutOfStock 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:-translate-y-[2px] shadow-sm hover:shadow-md'
            }`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
        </button>
      </div>

    </div>
  );
}
