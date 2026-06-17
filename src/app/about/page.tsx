'use client';

import React from 'react';
import { Sprout, Heart, Leaf, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-8 z-10 relative font-alt">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Editorial Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">Our Heritage & Mission</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-forest tracking-tight">Returning to Nature</h1>
          <p className="text-base text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Every seed carries possibility. Every ingredient carries heritage. Every purchase supports conscious, sustainable urban living.
          </p>
        </div>

        {/* Brand Story block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"
            alt="Terrace Garden setup"
            className="rounded-xl border border-stone/30 shadow-md h-80 w-full object-cover"
          />
          <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed">
            <h3 className="font-serif text-2xl text-forest leading-tight">The Seed of an Idea</h3>
            <p>
              Light Weight Terrace Garden Organics was born from a desire to bridge traditional Indian organic lifestyle wisdom with modern urban settings.
            </p>
            <p>
              In growing concrete cities, we noticed that individuals wanted to connect with nature, but heavy garden soil, structural weight constraints on rooftops, and lack of space stood in the way.
            </p>
            <p>
              We set out to create lightweight growing mediums, non-hybrid seeds, and sustainable essentials that make rooftop organic gardening effortless and safe.
            </p>
          </div>
        </div>

        {/* Our values */}
        <div className="border-t border-stone/30 pt-16 space-y-8">
          <h3 className="font-serif text-3xl text-forest text-center">Core Pillars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-xs">
            <div className="space-y-3 p-6 bg-white border border-stone/30 rounded-xl shadow-2xs">
              <Sprout className="h-6 w-6 text-forest mx-auto" />
              <h4 className="font-serif text-sm text-forest font-bold">Urban Greening</h4>
              <p className="text-charcoal/70">Transforming balconies and concrete roofs into lush, edible micro-gardens.</p>
            </div>
            <div className="space-y-3 p-6 bg-white border border-stone/30 rounded-xl shadow-2xs">
              <Leaf className="h-6 w-6 text-forest mx-auto" />
              <h4 className="font-serif text-sm text-forest font-bold">Conscious Nutrition</h4>
              <p className="text-charcoal/70">Heritage staples free from chemical enhancers, supporting traditional farming communities.</p>
            </div>
            <div className="space-y-3 p-6 bg-white border border-stone/30 rounded-xl shadow-2xs">
              <Shield className="h-6 w-6 text-forest mx-auto" />
              <h4 className="font-serif text-sm text-forest font-bold">Absolute Trust</h4>
              <p className="text-charcoal/70">Honest packaging, certified organic ingredients, and verified trace logs.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-stone/30">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-forest text-warm-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-moss transition-colors shadow-md"
          >
            Start Your Planting Journey
          </Link>
        </div>

      </div>
    </div>
  );
}
