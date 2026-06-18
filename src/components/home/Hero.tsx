'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden z-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e736?auto=format&fit=crop&w=2000&q=80"
          alt="Premium Organic Terrace Garden"
          className="w-full h-full object-cover"
        />
        {/* Soft overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl text-white space-y-8 animate-in slide-in-from-bottom-8 duration-1000 fade-in">
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold bg-[#4CAF50] text-white px-4 py-1.5 rounded-full shadow-lg">
            100% Organic & Non-GMO
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight text-white drop-shadow-md">
            Cultivate Your <br/>
            <span className="text-[#A5D6A7]">Organic Sanctuary</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl font-medium drop-shadow-sm">
            Premium quality seeds, traditional groceries, and essential supplies for your thriving terrace garden. Handpicked for home growers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 bg-[#2E7D32] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#1B5E20] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              Shop Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/guides"
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-[#1B5E20] transition-all duration-300"
            >
              Explore Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
