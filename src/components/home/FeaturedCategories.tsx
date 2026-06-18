'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sprout, Box, Package, Shield, Sparkles } from 'lucide-react';

const categories = [
  {
    slug: 'seeds',
    name: 'Terrace Seeds',
    description: 'High-yield non-hybrid vegetable, fruit, and herb seeds for home grow setups.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80',
    icon: Sprout,
  },
  {
    slug: 'fertilizers',
    name: 'Lightweight Growing Essentials',
    description: 'Coco-peat mixes, organic compost, vermicompost, and space-saving vertical grow bags.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
    icon: Box,
  },
  {
    slug: 'grocery',
    name: 'Traditional Pantry',
    description: 'Cold-pressed oils, native rice varieties, pure jaggery, and hand-ground spices.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
    icon: Package,
  },
  {
    slug: 'care',
    name: 'Ayurvedic Personal Care',
    description: 'Chemical-free herbal hair oils, handmade soaps, and traditional bath powders.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
    icon: Sparkles,
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 bg-warm-white border-b border-stone/50 relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold">
            Meticulously Curated Range
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#1B5E20]">
            Explore Our Core Collections
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-lg mx-auto">
            Specially selected components for a complete organic life, from sowing terrace seeds to consuming heritage staples.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white border border-stone-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                {/* Image block with hover zoom */}
                <div className="h-64 overflow-hidden relative rounded-t-[24px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-[#2E7D32] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content info */}
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div className="space-y-3 mb-6">
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#2E7D32] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] transition-colors mt-auto"
                  >
                    View Collection
                    <motion.span className="group-hover:translate-x-1 transition-transform">&rarr;</motion.span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
