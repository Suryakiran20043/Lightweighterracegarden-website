'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sprout, Box, Package, Sparkles, ArrowRight } from 'lucide-react';

const categories = [
  {
    slug: 'vegetables',
    name: 'Vegetable Seeds',
    description: 'High-yield non-hybrid vegetable seeds for home grow setups.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    icon: Sprout,
  },
  {
    slug: 'pots-planters',
    name: 'Pots & Planters',
    description: 'Coco-peat mixes, organic compost, and vertical grow bags.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    icon: Box,
  },
  {
    slug: 'flower-seeds',
    name: 'Flower Seeds',
    description: 'Beautiful seasonal flowers to brighten up your terrace garden.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    icon: Sparkles,
  },
  {
    slug: 'grocery',
    name: 'Organic Grocery',
    description: 'Cold-pressed oils, native rice varieties, and pure jaggery.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    icon: Package,
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 bg-white relative z-10">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
            Meticulously Curated Range
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
            Explore Our Collections
          </h2>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Specially selected components for a complete organic life, from sowing terrace seeds to consuming heritage staples.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[450px] sm:h-[500px] rounded-[32px] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-500"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top Icon */}
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Bottom Text & CTA */}
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-3xl font-bold text-white mb-3">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" style={{ fontFamily: 'var(--font-sans)' }}>
                      {category.description}
                    </p>
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="inline-flex items-center justify-center gap-2 bg-white text-[#1B5E20] px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-[#4CAF50] hover:text-white transition-colors w-full"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      View Collection <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
