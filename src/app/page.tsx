'use client';

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import { ArrowRight, ShieldCheck, Sprout, Leaf, Mail } from 'lucide-react';
import { products } from '@/lib/data/products';
import ProductCard from '@/components/shop/ProductCard';

// Sample guides
const gardeningGuides = [
  {
    slug: 'beginner-terrace-gardening',
    title: 'Beginner Guide to Terrace Gardening',
    desc: 'How to choose grow bags, seed trays, and potting soil setup for rooftop gardening.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'home-composting-guide',
    title: 'Home Kitchen Waste Composting',
    desc: 'Turn tea leaves and veggie peels into premium nutrient booster compost.',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  // Grab the first 5 best sellers
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 5);

  return (
    <div className="space-y-0">
      {/* 1. Hero Storytelling */}
      <Hero />

      {/* 2. Featured Category Grid */}
      <FeaturedCategories />

      {/* 3. Best Sellers dynamic grid */}
      <section className="py-24 bg-[#FAFAFA] relative z-10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
                Favorites Among Growers
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
                Our Best Sellers
              </h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-base font-bold text-[#1B5E20] hover:text-[#4CAF50] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              Explore Full Catalog <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Render Actual ProductCards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={`home-best-${product.id}`} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us / Trust Section (Apple-like minimal) */}
      <section className="py-32 bg-white relative z-10 border-t border-gray-100">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
              The Organic Promise
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
              Why Choose Terrace Garden
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              We provide the highest quality inputs designed specifically for home growers, ensuring your terrace thrives organically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#F8FDF9] rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-[#4CAF50]/20">
                <Sprout className="h-10 w-10 text-[#4CAF50]" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">100% Certified Organic</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                Heirloom seeds tested for 90%+ germination rates without heavy pesticide treatments or chemical coatings.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#F8FDF9] rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-[#4CAF50]/20">
                <Leaf className="h-10 w-10 text-[#4CAF50]" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">Lightweight Mixes</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                Potting soil designed specifically to protect roofs from heavy structural mud stresses while maximizing yield.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#F8FDF9] rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-[#4CAF50]/20">
                <ShieldCheck className="h-10 w-10 text-[#4CAF50]" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">Traditional Groceries</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                Cold pressed pantry staple oils and sweeteners preserving regional culinary heritages and robust health.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Gardening Guides */}
      <section className="py-24 bg-[#FAFAFA] relative z-10 border-t border-gray-100">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
                Weekly Growers Tips
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
                Gardening Guides
              </h2>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-base font-bold text-[#1B5E20] hover:text-[#4CAF50] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              Read More Guides <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {gardeningGuides.map((guide) => (
              <div key={guide.slug} className="group flex flex-col sm:flex-row bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-auto sm:h-[300px]">
                <div className="w-full sm:w-2/5 overflow-hidden relative">
                  <img src={guide.image} alt={guide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="w-full sm:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] leading-snug mb-4 group-hover:text-[#4CAF50] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
                    {guide.desc}
                  </p>
                  <Link href={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#1B5E20] group-hover:text-[#4CAF50] transition-colors mt-auto" style={{ fontFamily: 'var(--font-sans)' }}>
                    Read Full Guide <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Newsletter / Join Club */}
      <section className="py-32 relative z-10 overflow-hidden bg-[#1B5E20]">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover" alt="Background pattern" />
        </div>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Mail className="w-16 h-16 text-white/80 mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
            Join the Grower's Club
          </h2>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Subscribe to receive exclusive offers, seasonal planting calendars, and advanced organic gardening tips directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-lg"
              style={{ fontFamily: 'var(--font-sans)' }}
              required
            />
            <button 
              type="submit" 
              className="bg-white text-[#1B5E20] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#F8F8F8] hover:-translate-y-1 transition-all duration-300 shadow-xl"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
