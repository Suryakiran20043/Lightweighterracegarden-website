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
      <div className="w-full px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold font-alt">
            Meticulously Curated Range
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-forest">
            Explore Our Core Collections
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-alt">
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
                className="group relative bg-white border border-stone/30 rounded-xl overflow-hidden shadow-2xs premium-card"
              >
                {/* Image block with hover zoom */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-warm-white/90 backdrop-blur-xs p-2.5 rounded-full text-forest border border-stone/30">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-lg text-forest group-hover:text-brown transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-alt min-h-[50px]">
                    {category.description}
                  </p>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-brown transition-colors pt-2 group-hover:translate-x-1"
                  >
                    View Collection
                    <motion.span>&rarr;</motion.span>
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
