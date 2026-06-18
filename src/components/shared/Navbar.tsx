'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ShoppingBag, User, Menu, Search, Sprout, Heart, Leaf, Phone } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import AnimatedSearchPlaceholder from './AnimatedSearchPlaceholder';

interface NavbarProps {
  onCartOpen: () => void;
  onSearchOpen: () => void;
}

const promoMessages = [
  "🌱 Fresh Organic Seeds Delivered Across India",
  "🚛 All India Delivery Available",
  "🎁 Free Shipping Only In Telangana & Andhra Pradesh On Orders Above ₹3500",
  "🪴 Expert Terrace Gardening Support",
  "🌿 High Germination Rate Seeds",
  "📱 WhatsApp Support For Instant Assistance",
  "🌾 Trusted By Home Gardeners Across India",
  "⭐ Premium Seeds, Plants & Organic Products",
  "🎁 Special Combo Packs & Seasonal Offers"
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
      {/* 1. Top Announcement Bar - Premium Trust Header */}
      <div className="w-full h-[40px] bg-gradient-to-r from-[#244A2A] to-[#3D6B3D] text-white text-[13px] font-medium tracking-[0.3px] border-b border-white/10 shadow-sm relative z-50 flex items-center justify-center">
        <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 flex items-center justify-between h-full">
          
          {/* Left: Phone / WhatsApp (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-300">
            <Phone className="w-3.5 h-3.5" />
            <a 
              href="tel:+917386038056" 
              className="flex items-center gap-1.5 cursor-pointer relative group"
            >
              <span>Call / WhatsApp:</span>
              <span className="font-semibold relative">
                +91 7386038056
                <span className="absolute -inset-1 bg-white/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300 pointer-events-none" />
              </span>
            </a>
          </div>

          {/* Middle: Rotating Announcements */}
          <div className="flex-1 flex justify-center items-center relative h-full overflow-hidden">
            {promoMessages.map((msg, idx) => (
              <div 
                key={idx}
                className={`absolute transition-all duration-500 transform w-full flex items-center justify-center gap-2 ${
                  idx === promoIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                {/* Promotional Message */}
                <span className="truncate max-w-[220px] sm:max-w-none">{msg}</span>
              </div>
            ))}
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a 
              href="https://www.instagram.com/lightweight_terrace_garden" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Light Weight Terrace Garden on Instagram"
              className="text-white/80 hover:text-[#4CAF50] transition-all duration-300 hover:scale-[1.15] hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(76,175,80,0.5)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <div className="w-px h-3 bg-white/20" />
            <a 
              href="https://www.facebook.com/share/16WpiGNcuv" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Light Weight Terrace Garden on Facebook"
              className="text-white/80 hover:text-[#4CAF50] transition-all duration-300 hover:scale-[1.15] hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(76,175,80,0.5)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <div className="w-px h-3 bg-white/20" />
            <a 
              href="https://youtube.com/@lightweightterracegardenga5556" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Light Weight Terrace Garden on YouTube"
              className="text-white/80 hover:text-[#4CAF50] transition-all duration-300 hover:scale-[1.15] hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(76,175,80,0.5)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <div className="w-px h-3 bg-white/20" />
            <a 
              href="https://wa.me/917386038056?text=Hello%20Gajawada%20Swaroopa%20Garu%20%F0%9F%99%8F%F0%9F%8F%BB%0A%0AI%20am%20interested%20in%20your%20products.%0A%0APlease%20share%20your%20latest%20seed%20catalog%2C%20plant%20availability%2C%20prices%2C%20and%20delivery%20details.%0A%0AThank%20you%20%F0%9F%8C%B1" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Chat with Light Weight Terrace Garden on WhatsApp"
              className="text-white/80 hover:text-[#4CAF50] transition-all duration-300 hover:scale-[1.15] hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(76,175,80,0.5)] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
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
              className="w-full relative flex items-center h-[55px] bg-white border border-[#E0E0E0] focus-within:border-[#2E7D32] focus-within:shadow-[0_4px_15px_rgba(46,125,50,0.15)] rounded-xl overflow-hidden transition-all duration-300 group shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
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
                className="h-full px-8 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-[14px] tracking-[0.5px] transition-colors z-20 shrink-0 relative"
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
              <User className="h-7 w-7 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[12px] font-medium">Account</span>
            </Link>

            <Link
              href="/dashboard/wishlist"
              className="flex flex-col items-center justify-center text-[#333] hover:text-[#2E7D32] transition-colors group relative"
            >
              <div className="relative">
                <Heart className="h-7 w-7 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
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
                <ShoppingBag className="h-7 w-7 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
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
          <div className="flex justify-center items-center flex-nowrap whitespace-nowrap overflow-x-auto hide-scrollbar gap-x-5 lg:gap-x-7 py-3">
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
                <div key={link.name} className="relative group py-1 px-1">
                  <Link
                    href={link.href}
                    className={`block text-[12px] lg:text-[13px] tracking-[1px] uppercase transition-all duration-300 ${
                      isActive 
                        ? 'text-[#2E7D32] font-bold' 
                        : 'text-[#333333] hover:text-[#2E7D32] font-bold hover:-translate-y-[2px]'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-1/2 h-[2px] bg-[#2E7D32] transition-all duration-300 -translate-x-1/2 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </div>
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
