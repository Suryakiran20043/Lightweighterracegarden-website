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
      <section className="py-24 bg-white relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold">
                Favorites Among Growers
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#1B5E20]">
                Our Best Sellers
              </h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] transition-colors">
              Explore Full Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => {
              const inWish = isInWishlist(product.id);
              return (
                <div key={product.id} className="group relative bg-white border border-stone-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
                  <div className="relative h-72 overflow-hidden rounded-t-[20px]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <button
                      onClick={() => toggleItem(product)}
                      className={`absolute top-4 right-4 p-2.5 rounded-full shadow-sm transition-all duration-300 hover:scale-110 ${
                        inWish ? 'bg-[#E53935] text-white' : 'bg-white/90 backdrop-blur-md text-stone-400 hover:text-[#E53935]'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={`h-5 w-5 ${inWish ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] line-clamp-2">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#F59E0B]">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                      <span className="text-xl font-bold text-[#1B5E20]">₹{product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addItem({
                          id: product.id,
                          productId: product.productId,
                          name: product.name,
                          price: product.price,
                          sku: product.sku,
                          image: product.image
                        }, 1)}
                        className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span className="text-sm font-semibold">Add</span>
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
      <section className="py-24 bg-[#FAFAFA] relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold">
              Quality & Care Assurance
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#1B5E20]">
              Why Choose Terrace Organics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-stone-100 p-10 rounded-[20px] space-y-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-[#E8F5E9] rounded-2xl text-[#2E7D32] w-fit mx-auto"><Sprout className="h-8 w-8" /></div>
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">100% Certified Organic</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Heirloom seeds tested for 90%+ germination rates without heavy pesticide treatments.</p>
            </div>
            <div className="bg-white border border-stone-100 p-10 rounded-[20px] space-y-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-[#E8F5E9] rounded-2xl text-[#2E7D32] w-fit mx-auto"><Leaf className="h-8 w-8" /></div>
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Lightweight Guarantee</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Potting soil designed specifically to protect roofs from heavy structural mud stresses.</p>
            </div>
            <div className="bg-white border border-stone-100 p-10 rounded-[20px] space-y-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-[#E8F5E9] rounded-2xl text-[#2E7D32] w-fit mx-auto"><ShieldCheck className="h-8 w-8" /></div>
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Traditional Recipes</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Cold pressed pantry staple oils and sweeteners preserving regional culinary heritages.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Gardening & Organic Living Guides */}
      <section className="py-24 bg-white relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div className="space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4CAF50] font-bold">
                Weekly Growers Tips
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#1B5E20]">
                Gardening & Living Guides
              </h2>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] transition-colors">
              Read More Guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gardeningGuides.map((guide) => (
              <div key={guide.slug} className="group grid grid-cols-1 sm:grid-cols-2 bg-white border border-stone-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="overflow-hidden">
                  <img src={guide.image} alt={guide.title} className="h-64 sm:h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#2E7D32] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {guide.desc}
                    </p>
                  </div>
                  <Link href={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] transition-colors mt-auto">
                    Read Guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
