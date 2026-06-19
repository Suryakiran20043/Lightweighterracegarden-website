'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, Grid2X2, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import { products as catalog } from '@/lib/data/products';
import ProductCard from '@/components/shop/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const VEGETABLE_SUBCATEGORIES = [
  'Tomato', 'Brinjal', 'Okra', 'Chilli', 'Cucumber', 'Bottle Gourd', 
  'Ridge Gourd', 'Beans', 'Carrot', 'Beetroot', 'Spinach', 'Radish', 
  'Pumpkin', 'Onion', 'Cabbage', 'Cauliflower'
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category') || 'all';

  const [filteredProducts, setFilteredProducts] = useState(catalog);
  const [sortBy, setSortBy] = useState('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [columns, setColumns] = useState(4); // Default 4 columns
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  useEffect(() => {
    let result = [...catalog];
    
    // 1. Filter by Main Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by Sub Category (Keyword match in name)
    if (activeSubCategory) {
      result = result.filter((p) => p.name.toLowerCase().includes(activeSubCategory.toLowerCase()));
    }

    // 3. Search Search Query
    const searchQuery = searchParams.get('search') || '';
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 4. Sort
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
  }, [activeCategory, activeSubCategory, sortBy, searchParams]);

  // Reset subcategory when changing main category
  useEffect(() => {
    setActiveSubCategory(null);
  }, [activeCategory]);

  const getCategoryName = (slug: string) => {
    if (slug === 'all') return 'All Products';
    const categoryMap: Record<string, string> = {
      'vegetables': 'Vegetable Seeds',
      'flower-seeds': 'Flower Seeds',
      'fruits-seeds': 'Fruit Seeds',
      'microgreens': 'Microgreens',
      'grocery': 'Grocery',
      'pots-planters': 'Pots & Planters',
      'roots-tubers': 'Roots & Tubers'
    };
    return categoryMap[slug] || 'Products';
  };

  const ColumnIcon = ({ cols, active }: { cols: number, active: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`transition-colors ${active ? "text-[#1B5E20]" : "text-gray-400 hover:text-gray-600"}`}>
      {Array.from({length: cols}).map((_, i) => (
        <rect key={i} x={i * (20/cols)} y="2" width={(20/cols) - 2} height="16" rx="2" fill="currentColor" />
      ))}
    </svg>
  );

  return (
    <div className="min-h-screen bg-white z-10 relative pb-16">
      
      {/* 1. Breadcrumb - Top */}
      <div className="w-full bg-[#F9FAFB] py-4 border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[13px] text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-800">{getCategoryName(activeCategory)}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* 2. Title & Sub-filters */}
        <div className="mb-4 text-center">
          <h1 className="text-[28px] font-sans font-bold text-gray-800 mb-6 tracking-tight">{getCategoryName(activeCategory)}</h1>
          
          {/* Subcategory Pills (Only show if Vegetables) */}
          {activeCategory === 'vegetables' && (
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
              <button 
                onClick={() => setActiveSubCategory(null)}
                className={`px-4 py-2 rounded-md border text-[13px] font-medium transition-colors ${!activeSubCategory ? 'bg-[#387635] text-white border-[#387635]' : 'bg-white text-[#4A4A4A] border-gray-200 hover:border-[#387635] hover:text-[#387635]'}`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                View All
              </button>
              {VEGETABLE_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-4 py-2 rounded-md border text-[13px] font-medium transition-colors ${activeSubCategory === sub ? 'bg-[#387635] text-white border-[#387635]' : 'bg-white text-[#4A4A4A] border-gray-200 hover:border-[#387635] hover:text-[#387635]'}`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. View Switch & Sort Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center py-3 border-b border-gray-100 mb-5 relative z-20">
          
          {/* View Switcher (Left side) */}
          <div className="flex items-center gap-4 justify-start">
            <span className="text-[13px] font-medium text-gray-600 hidden xl:inline" style={{ fontFamily: 'var(--font-sans)' }}>View As:</span>
            <div className="flex items-center gap-1.5">
              {[2, 3, 4].map(num => (
                <button 
                  key={num} 
                  onClick={() => setColumns(num)} 
                  className={`w-[34px] h-[34px] rounded-md border flex items-center justify-center transition-colors ${columns === num ? 'border-[#387635] text-[#387635] bg-white' : 'border-gray-200 text-gray-400 bg-white hover:border-gray-300'}`} 
                  title={`${num} Columns`}
                >
                  <ColumnIcon cols={num} active={columns === num} />
                </button>
              ))}
              {/* Optional List Icon to match screenshot perfectly */}
              <button 
                onClick={() => setColumns(1)} 
                className={`w-[34px] h-[34px] rounded-md border flex items-center justify-center transition-colors ${columns === 1 ? 'border-[#387635] text-[#387635] bg-white' : 'border-gray-200 text-gray-400 bg-white hover:border-gray-300'}`} 
                title="List View"
              >
                <List className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

          {/* Center (Showing Products) */}
          <div className="hidden md:flex justify-center">
            <span className="text-[13px] font-medium text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>
              Showing {filteredProducts.length} Products
            </span>
          </div>

          {/* Sort Dropdown (Right side) */}
          <div className="relative flex justify-end">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center justify-between w-48 bg-white border border-gray-200 text-gray-700 text-sm font-bold px-4 py-2.5 rounded-lg focus:outline-none hover:border-gray-300 transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span>Sort by: {sortBy === 'featured' ? 'Featured' : sortBy.includes('price') ? 'Price' : sortBy.includes('alpha') ? 'Alphabetically' : 'Best Selling'}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 overflow-hidden">
                {[
                  { value: 'featured', label: 'Featured' },
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
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center ${sortBy === option.value ? 'bg-gray-50 text-[#1B5E20] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    <span className="w-5 inline-block">
                      {sortBy === option.value ? '✓' : ''}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. Product Grid */}
        <div className="relative min-h-[400px]">
          {filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-lg text-stone-500 font-serif">No products found for this selection.</p>
            </div>
          ) : (
            <motion.div 
              key={`${activeCategory}-${activeSubCategory}-${sortBy}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.04 }
                }
              }}
              className={`grid gap-4 md:gap-5 lg:gap-6 justify-center ${
                columns === 1 ? 'grid-cols-1 max-w-3xl mx-auto' :
                columns === 2 ? 'grid-cols-2 lg:grid-cols-2' : 
                columns === 3 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3' : 
                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.45, ease: "easeInOut" } 
                    }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg text-[#2E7D32] bg-white">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
