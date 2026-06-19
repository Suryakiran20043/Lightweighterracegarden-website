'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden z-10 bg-black">
      {/* Background Image with Zoom Animation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2000&q=80"
          alt="Premium Organic Terrace Garden"
          className="w-full h-full object-cover animate-[zoom_20s_infinite_alternate]"
        />
        {/* Soft overlay gradient for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center text-center mt-20">
        
        {/* Floating Badge */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 fill-mode-both">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full shadow-2xl">
            <Leaf className="w-4 h-4 text-[#4CAF50]" /> 100% Organic & Non-GMO
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight text-white drop-shadow-2xl mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both max-w-5xl">
          Cultivate Your <br className="hidden sm:block"/>
          <span className="text-[#A5D6A7] italic">Organic Sanctuary</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-lg sm:text-2xl text-white/90 leading-relaxed max-w-2xl font-medium drop-shadow-lg mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both" style={{ fontFamily: 'var(--font-sans)' }}>
          Premium quality seeds, traditional groceries, and essential supplies for your thriving terrace garden. Handpicked for home growers.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
          <Link
            href="/shop"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4CAF50] text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-[#2E7D32] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(76,175,80,0.3)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Shop Collection
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/guides"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white hover:text-[#1B5E20] hover:-translate-y-1 transition-all duration-300"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Explore Guides
          </Link>
        </div>
        
      </div>

      {/* CSS Animation Keyframes for Zoom */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}} />
    </div>
  );
}
