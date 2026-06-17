'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sprout, Filter, Heart, ShoppingBag, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';

// Product Catalog
const catalog = [
  {
    id: 'var_seeds_1',
    productId: 'prod_seeds_1',
    name: 'Premium Cherry Tomato Seeds',
    category: 'vegetables',
    price: 99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    sku: 'SEED-TOM-CHY',
    desc: 'Easy-to-grow, high-yield sweet cherry tomato seeds. Ideal for lightweight grow bags on balconies.',
  },
  {
    id: 'var_seeds_2',
    productId: 'prod_seeds_2',
    name: 'Organic Sweet Basil Seeds',
    category: 'micro-seeds',
    price: 79,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1618386365622-78094157355e?auto=format&fit=crop&w=400&q=80',
    sku: 'SEED-BSL-SWT',
    desc: 'Highly aromatic leaves perfect for pestos and Italian cuisines. Quick sprouting.',
  },
  {
    id: 'var_soil_1',
    productId: 'prod_soil_1',
    name: 'Lightweight Premium Potting Soil (5 kg)',
    category: 'pots-planters',
    price: 399,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
    sku: 'SOIL-LT-5KG',
    desc: 'Enriched with organic compost, coco-peat, and perlite. Weighs 60% less than normal garden soil.',
  },
  {
    id: 'var_soil_2',
    productId: 'prod_soil_2',
    name: 'Reusable Vertical Grow Bags (Set of 3)',
    category: 'pots-planters',
    price: 450,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
    sku: 'GROW-BAG-V3',
    desc: 'Heavy-duty breathable fabric planters. Fits vertical slots perfectly to optimize space.',
  },
  {
    id: 'var_grocery_1',
    productId: 'prod_grocery_1',
    name: 'Cold Pressed Yellow Mustard Oil (1L)',
    category: 'spices-masalas',
    price: 260,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    sku: 'OIL-MSTD-1L',
    desc: 'Traditionally extracted using wooden Ghani. Retains natural antioxidants and strong flavor.',
  },
  {
    id: 'var_grocery_2',
    productId: 'prod_grocery_2',
    name: 'Organic Wild Forest Honey (500g)',
    category: 'sweet-snacks',
    price: 380,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
    sku: 'HONEY-WLD-500',
    desc: 'Raw and unfiltered honey sourced from tribal forests. A natural sweetener packed with minerals.',
  },
  {
    id: 'var_care_1',
    productId: 'prod_care_1',
    name: 'Organic Amla Fruit Powder (200g)',
    category: 'pickles-powder',
    price: 320,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
    sku: 'HAIR-OIL-AB200',
    desc: 'Pure wild amla fruit powder rich in Vitamin C. Ideal for internal wellness and hair health.',
  },
  {
    id: 'var_care_2',
    productId: 'prod_care_2',
    name: 'Monsoon Protection Herbal Spray',
    category: 'seasonal',
    price: 190,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1607006342465-b771dfec3298?auto=format&fit=crop&w=400&q=80',
    sku: 'SOAP-NT-P2',
    desc: 'All-natural seasonal protection spray made with essential oils to repel pests and insects.',
  },
  {
    id: 'var_seeds_3',
    productId: 'prod_seeds_3',
    name: 'French Marigold Flower Seeds',
    category: 'flower-seeds',
    price: 69,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80',
    sku: 'SEED-MGD-FRN',
    desc: 'Bright golden marigold seeds. Acts as a natural companion plant to deter garden pests.',
  },
  {
    id: 'var_seeds_4',
    productId: 'prod_seeds_4',
    name: 'Sugar Baby Watermelon Seeds',
    category: 'fruits-seeds',
    price: 89,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=400&q=80',
    sku: 'SEED-WML-SGB',
    desc: 'Sweet, juicy dwarf watermelon seeds suitable for raised bed containers on terraces.',
  },
  {
    id: 'var_seeds_5',
    productId: 'prod_seeds_5',
    name: 'Organic Turmeric Seed Rhizomes',
    category: 'roots-tubers',
    price: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    sku: 'ROOT-TUM-ORG',
    desc: 'Premium seed rhizomes for growing medicinal, high-curcumin turmeric at home.',
  }
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category') || 'all';

  const [filteredProducts, setFilteredProducts] = useState(catalog);
  const [sortBy, setSortBy] = useState('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    let result = [...catalog];
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    const searchQuery = searchParams.get('search') || '';
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alpha-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'alpha-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'best-selling') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy, searchParams]);

  const selectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-warm-white py-12 px-4 sm:px-6 lg:px-12 z-10 relative">
      <div className="w-full space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-serif text-forest">Shop Collection</h1>
          <p className="text-sm text-charcoal/70 font-alt">
            Returning to nature through premium, conscious terrace gardening and organic living.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-stone/30 pb-6">
          {/* Categories Filter tab buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', name: 'All Products' },
              { id: 'vegetables', name: 'Vegetables' },
              { id: 'micro-seeds', name: 'Micro seeds' },
              { id: 'flower-seeds', name: 'Flower seeds' },
              { id: 'fruits-seeds', name: 'Fruits seeds' },
              { id: 'roots-tubers', name: 'Roots and tubers' },
              { id: 'pickles-powder', name: 'Pickles & Powder' },
              { id: 'sweet-snacks', name: 'Sweet & Snacks' },
              { id: 'seasonal', name: 'Seasonal collection' },
              { id: 'pots-planters', name: 'Pots & Planters' },
              { id: 'spices-masalas', name: 'Seasonings, Spices & Masalas' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-forest border-forest text-warm-white'
                    : 'bg-white border-stone/30 text-charcoal hover:border-forest'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sorting controls */}
          <div className="relative z-20">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center justify-between w-48 bg-white border border-forest text-forest text-sm font-medium px-4 py-2.5 rounded-md focus:outline-none hover:bg-stone/5 transition-colors"
            >
              <span>Sort by</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 sm:left-0 top-full mt-1 w-56 bg-white border border-stone/30 rounded-md shadow-lg py-2">
                {[
                  { value: 'featured', label: 'Featured' },
                  { value: 'relevant', label: 'Most relevant' },
                  { value: 'best-selling', label: 'Best selling' },
                  { value: 'alpha-asc', label: 'Alphabetically, A-Z' },
                  { value: 'alpha-desc', label: 'Alphabetically, Z-A' },
                  { value: 'price-low', label: 'Price, low to high' },
                  { value: 'price-high', label: 'Price, high to low' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortDropdownOpen(false);
                    }}
                    className="w-full text-left px-5 py-2 text-sm text-charcoal hover:bg-stone/10 transition-colors flex items-center"
                  >
                    <span className="w-5 inline-block text-stone-400">
                      {sortBy === option.value ? '—' : ''}
                    </span>
                    <span className={sortBy === option.value ? 'font-medium' : ''}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-sm text-stone-500 py-12">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const inWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white border border-stone/30 rounded-xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    
                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                      className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors duration-200 ${
                        inWish ? 'bg-terracotta text-white' : 'bg-white/80 hover:bg-white text-stone-400 hover:text-terracotta'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] text-brown font-semibold uppercase tracking-wider font-alt">
                        <span>{product.category}</span>
                        <span>★ {product.rating}</span>
                      </div>
                      <h3 className="font-serif text-base text-forest line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed font-alt">
                        {product.desc}
                      </p>
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
                        })}
                        className="bg-forest hover:bg-moss text-warm-white p-2 rounded-full transition-colors duration-200"
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
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg text-forest bg-warm-white">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
