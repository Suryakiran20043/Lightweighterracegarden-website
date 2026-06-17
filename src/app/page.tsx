'use client';

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import { ArrowRight, Star, ShieldCheck, Heart, ShoppingBag, Sprout, Leaf } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';

// Sample Best Seller products
const bestSellers = [
  {
    id: 'var_seeds_1',
    productId: 'prod_seeds_1',
    name: 'Premium Cherry Tomato Seeds',
    price: 99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    sku: 'SEED-TOM-CHY',
  },
  {
    id: 'var_soil_1',
    productId: 'prod_soil_1',
    name: 'Lightweight Potting Soil (5 kg)',
    price: 399,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
    sku: 'SOIL-LT-5KG',
  },
  {
    id: 'var_grocery_2',
    productId: 'prod_grocery_2',
    name: 'Organic Wild Forest Honey (500g)',
    price: 380,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
    sku: 'HONEY-WLD-500',
  },
];

// Sample guides
const gardeningGuides = [
  {
    slug: 'beginner-terrace-gardening',
    title: 'Beginner Guide to Terrace Gardening',
    desc: 'How to choose grow bags, seed trays, and potting soil setup for rooftop gardening.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'home-composting-guide',
    title: 'Home Kitchen Waste Composting',
    desc: 'Turn tea leaves and veggie peels into premium nutrient booster compost.',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=400&q=80',
  },
];

export default function Home() {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  return (
    <div className="space-y-0">
      {/* 1. Hero Storytelling */}
      <Hero />

      {/* 2. Featured Category Grid */}
      <FeaturedCategories />

      {/* 3. Best Sellers Carousel / Grid */}
      <section className="py-24 bg-white border-b border-stone/50 relative z-10 font-alt">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">Favorites Among Growers</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-forest">Our Best Sellers</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-brown transition-colors">
              Explore Full Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {bestSellers.map((product) => {
              const inWish = isInWishlist(product.id);
              return (
                <div key={product.id} className="bg-warm-white border border-stone/30 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-103" />
                    <button
                      onClick={() => toggleItem(product)}
                      className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors ${
                        inWish ? 'bg-terracotta text-white' : 'bg-white/80 hover:bg-white text-stone-400 hover:text-terracotta'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg text-forest truncate">{product.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-semibold text-gold">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-bold text-forest">₹{product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addItem({
                          id: product.id,
                          productId: product.productId,
                          name: product.name,
                          price: product.price,
                          sku: product.sku,
                          image: product.image
                        }, 1)}
                        className="bg-forest hover:bg-moss text-warm-white p-2 rounded-full transition-colors"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us / Quality stats */}
      <section className="py-24 bg-ivory border-b border-stone/50 relative z-10 font-alt">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-brown font-semibold">Quality & Care Assurance</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-forest">Why Choose Terrace Organics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-stone/30 p-8 rounded-xl space-y-4 shadow-2xs">
              <div className="p-4 bg-forest/10 rounded-full text-forest w-fit mx-auto"><Sprout className="h-8 w-8" /></div>
              <h3 className="font-serif text-lg text-forest">100% Certified Organic</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">Heirloom seeds tested for 90%+ germination rates without heavy pesticide treatments.</p>
            </div>
            <div className="bg-white border border-stone/30 p-8 rounded-xl space-y-4 shadow-2xs">
              <div className="p-4 bg-forest/10 rounded-full text-forest w-fit mx-auto"><Leaf className="h-8 w-8" /></div>
              <h3 className="font-serif text-lg text-forest">Lightweight Guarantee</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">Potting soil designed specifically to protect roofs from heavy structural mud stresses.</p>
            </div>
            <div className="bg-white border border-stone/30 p-8 rounded-xl space-y-4 shadow-2xs">
              <div className="p-4 bg-forest/10 rounded-full text-forest w-fit mx-auto"><ShieldCheck className="h-8 w-8" /></div>
              <h3 className="font-serif text-lg text-forest">Traditional Recipes</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">Cold pressed pantry staple oils and sweeteners preserving regional culinary heritages.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Gardening & Organic Living Guides */}
      <section className="py-24 bg-white relative z-10 font-alt">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">Weekly Growers Tips</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-forest">Gardening & Living Guides</h2>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-brown transition-colors">
              Read More Guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {gardeningGuides.map((guide) => (
              <div key={guide.slug} className="grid grid-cols-1 sm:grid-cols-2 bg-warm-white border border-stone/30 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
                <img src={guide.image} alt={guide.title} className="h-48 sm:h-full w-full object-cover" />
                <div className="p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-base text-forest leading-snug">{guide.title}</h3>
                    <p className="text-xs text-charcoal/75 leading-relaxed">{guide.desc}</p>
                  </div>
                  <Link href={`/guides/${guide.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-brown transition-colors">
                    Read Guide &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
