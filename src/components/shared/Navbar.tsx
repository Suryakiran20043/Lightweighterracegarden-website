'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ShoppingBag, User, Menu, Search, Sprout, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import AnimatedSearchPlaceholder from './AnimatedSearchPlaceholder';

interface NavbarProps {
  onCartOpen: () => void;
  onSearchOpen: () => void;
}

const promoMessages = [
  "Free Shipping in India on Orders Above ₹499!",
  "100% Organic & Non-GMO Seeds Available Now",
  "Premium Gardening Kits at 20% Off - Shop Today!"
];

function NavbarContent({ onCartOpen, onSearchOpen }: NavbarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Rotating Promo
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const cartItemsCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistItemsCount = useWishlistStore((state) => state.items.length);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Vegetable Seeds', href: '/shop?category=vegetables' },
    { name: 'Flower Seeds', href: '/shop?category=flower-seeds' },
    { name: 'Fruit Seeds', href: '/shop?category=fruits-seeds' },
    { name: 'Roots & Tubers', href: '/shop?category=roots-tubers' },
    { name: 'Microgreens', href: '/shop?category=micro-seeds' },
    { name: 'Pots & Planters', href: '/shop?category=pots-planters' },
    { name: 'Combo Packs', href: '/shop?category=combo-packs' },
    { name: 'Grocery', href: '/shop?category=grocery' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/shop';
    if (searchQuery) {
      url += `?search=${encodeURIComponent(searchQuery)}`;
    }
    router.push(url);
  };

  return (
    <header className="w-full bg-white z-40 relative flex flex-col font-sans">
      {/* 1. Top Announcement Bar - Thin green strip */}
      <div className="bg-[#2E7D32] text-white text-xs py-2 px-4 font-medium overflow-hidden">
        <div className="w-full max-w-screen-xl mx-auto flex justify-center items-center relative h-4">
          {promoMessages.map((msg, idx) => (
            <div 
              key={idx}
              className={`absolute transition-all duration-500 transform ${
                idx === promoIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="w-full bg-white px-4 sm:px-6 lg:px-12 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left: Logo & "Browse All Categories" button */}
          <div className="flex flex-col items-start shrink-0">
            <Link href="/" className="flex items-center gap-2 group mb-2">
              <div className="text-[#2E7D32] flex items-center justify-center transition-all duration-300">
                <Sprout className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-2xl sm:text-3xl tracking-tight text-[#1A1A1A] leading-none">
                  Light Weight
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[#4CAF50] font-semibold leading-none mt-1">
                  TERRACE GARDEN
                </span>
              </div>
            </Link>

            <button 
              className="flex items-center gap-2 text-[#333] hover:text-[#2E7D32] transition-colors font-semibold text-[14px] tracking-[0.5px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span>Browse All Categories</span>
            </button>
          </div>

          {/* Center: Large Animated Search Bar */}
          <div className="flex-1 w-full flex justify-center max-w-3xl">
            <form 
              onSubmit={handleSearchSubmit} 
              className="w-full relative flex items-center h-[50px] bg-white border border-[#E0E0E0] focus-within:border-[#2E7D32] focus-within:shadow-[0_0_0_1px_#2E7D32] rounded-xl overflow-hidden transition-all duration-300 group"
            >
              <AnimatedSearchPlaceholder 
                isFocused={isSearchFocused} 
                value={searchQuery} 
              />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-full pl-12 pr-4 bg-transparent outline-none text-[#1A1A1A] font-normal text-[15px] z-10 relative"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#2E7D32] transition-colors z-20 pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
              
              <button 
                type="submit" 
                className="h-full px-8 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-[14px] tracking-[0.5px] transition-colors z-20"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right: Actions */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8">
            <Link
              href="/dashboard"
              className="flex flex-col items-center justify-center text-[#333] hover:text-[#2E7D32] transition-colors group"
            >
              <User className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[12px] font-medium">Account</span>
            </Link>

            <Link
              href="/dashboard/wishlist"
              className="flex flex-col items-center justify-center text-[#333] hover:text-[#2E7D32] transition-colors group relative"
            >
              <div className="relative">
                <Heart className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                {wishlistItemsCount > 0 && (
                  <span className="bg-[#2E7D32] text-white text-[10px] font-semibold h-4 w-4 rounded-full flex items-center justify-center absolute -top-1 -right-2">
                    {wishlistItemsCount}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-medium">Wishlist</span>
            </Link>

            <button
              onClick={onCartOpen}
              className="flex flex-col items-center justify-center text-[#333] hover:text-[#2E7D32] transition-colors group relative cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="bg-[#2E7D32] text-white text-[10px] font-semibold h-4 w-4 rounded-full flex items-center justify-center absolute -top-1 -right-2">
                  {cartItemsCount}
                </span>
              </div>
              <span className="text-[12px] font-medium">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Bar */}
      <div className="hidden md:block bg-white border-b border-[#EAEAEA]">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 py-3">
            {navLinks.map((link) => {
              let isActive = false;
              if (link.href === '/') {
                isActive = pathname === '/';
              } else if (link.href.includes('category=')) {
                const cat = link.href.split('category=')[1];
                isActive = pathname === '/shop' && searchParams.get('category') === cat;
              } else {
                isActive = pathname === link.href;
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium tracking-[1px] uppercase transition-colors duration-200 ${
                    isActive 
                      ? 'text-[#2E7D32]' 
                      : 'text-[#333333] hover:text-[#2E7D32]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="bg-white border-t border-stone-200 py-4 px-6 space-y-2 animate-fade-in absolute top-full left-0 right-0 shadow-xl border-b z-50">
          <div className="pb-4 border-b border-stone-100 mb-2">
            <h3 className="font-semibold text-[#1A1A1A] uppercase tracking-[1px] text-xs mb-3">All Categories</h3>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#333] hover:text-[#2E7D32] py-2.5 px-3 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar(props: NavbarProps) {
  return (
    <Suspense fallback={<div className="h-40 bg-white w-full border-b border-stone-200"></div>}>
      <NavbarContent {...props} />
    </Suspense>
  );
}
