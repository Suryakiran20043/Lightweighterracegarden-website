import React from 'react';
import Link from 'next/link';
import { Leaf, ShieldCheck, Sprout, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Story | Terrace Garden Organics',
  description: 'Learn about our mission to bring sustainable, organic farming back to urban environments through lightweight soils and heirloom seeds.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden z-10 bg-[#1B5E20]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=2000&q=80"
            alt="Lush Terrace Garden"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center text-center mt-20">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
            <Leaf className="w-4 h-4 text-[#A5D6A7]" /> Our Origins
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight text-white drop-shadow-2xl mb-8 max-w-5xl">
            Rooted in Nature.<br />
            <span className="text-[#A5D6A7] italic">Grown on Your Terrace.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white/90 leading-relaxed max-w-3xl font-medium drop-shadow-lg" style={{ fontFamily: 'var(--font-sans)' }}>
            Terrace Garden Organics was born from a simple belief: that everyone, no matter how little space they have, deserves the joy of harvesting their own pesticide-free food.
          </p>
        </div>
      </section>

      {/* 2. The Narrative (Text heavy, highly editorial) */}
      <section className="py-24 sm:py-32 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] leading-tight">
            We are bringing the farm back to the city.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            For decades, urban dwellers have been disconnected from the source of their food. We watched as concrete replaced greenery, and chemically-treated produce became the norm. We decided to change that. By engineering incredibly lightweight potting soils and sourcing pure heirloom seeds, we've made it possible for any rooftop, balcony, or terrace to transform into a thriving organic sanctuary.
          </p>
        </div>
      </section>

      {/* 3. The 3 Core Pillars (Alternating Layout) */}
      <section className="py-12 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Pillar 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 py-16 lg:py-24">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-6">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center text-[#2E7D32]">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-serif text-[#1A1A1A]">100% Heirloom & Organic</h3>
              <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Our seeds are strictly non-hybrid and non-GMO. We believe in preserving agricultural biodiversity. That means our seeds aren't coated in toxic fungicides or genetic modifications. They are pure, open-pollinated varieties that you can harvest, save, and replant season after season.
              </p>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=1000&q=80" alt="Heirloom Seeds" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 py-16 lg:py-24">
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80" alt="Lightweight Soil" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center text-[#2E7D32]">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-serif text-[#1A1A1A]">The Lightweight Soil Science</h3>
              <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                The biggest fear of urban gardeners is roof damage from heavy, wet mud. We solved this by engineering a custom potting mix that relies on premium coco-peat, vermicompost, and perlite. It retains perfect moisture while weighing up to 60% less than traditional garden soil—keeping your roof safe and your plants extraordinarily healthy.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 py-16 lg:py-24">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-6">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center text-[#2E7D32]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-serif text-[#1A1A1A]">Traditional Groceries</h3>
              <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                We don't just stop at the garden. We partner with rural farmers to bring you pantry staples the way they were meant to be consumed. From cold-pressed groundnut oils to unrefined forest honeys, we bypass the industrial food system entirely, delivering pure nutrition directly to your kitchen.
              </p>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80" alt="Traditional Groceries" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Community Impact Stats */}
      <section className="py-24 bg-[#1B5E20] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-serif mb-16">The Movement in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <span className="text-6xl font-serif font-bold text-[#A5D6A7] mb-4">5,000+</span>
              <span className="text-lg text-white/80 uppercase tracking-widest font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Urban Terraces Transformed</span>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <span className="text-6xl font-serif font-bold text-[#A5D6A7] mb-4">90%</span>
              <span className="text-lg text-white/80 uppercase tracking-widest font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Guaranteed Germination</span>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <span className="text-6xl font-serif font-bold text-[#A5D6A7] mb-4">Zero</span>
              <span className="text-lg text-white/80 uppercase tracking-widest font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Single-Use Plastics in Shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] mb-8">Ready to grow with us?</h2>
          <p className="text-xl text-gray-600 mb-10" style={{ fontFamily: 'var(--font-sans)' }}>
            Join thousands of others who have taken back control of their food supply.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#2E7D32] text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-[#1B5E20] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Start Your Garden Today
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
