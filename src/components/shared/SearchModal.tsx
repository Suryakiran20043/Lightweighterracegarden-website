'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sprout } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Simple mock indexing client search for demonstration
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const mockProducts = [
      { id: '1', name: 'Premium Cherry Tomato Seeds', category: 'Seeds', price: 99, slug: 'cherry-tomato-seeds' },
      { id: '2', name: 'Organic Red Chilli Seeds', category: 'Seeds', price: 79, slug: 'red-chilli-seeds' },
      { id: '3', name: 'Lightweight Potting Soil Mix (5kg)', category: 'Fertilizers', price: 399, slug: 'lightweight-potting-soil' },
      { id: '4', name: 'Premium Coco Peat Block (1kg)', category: 'Fertilizers', price: 149, slug: 'coco-peat-block' },
      { id: '5', name: 'Herbal Neem Hair Oil (200ml)', category: 'Personal Care', price: 299, slug: 'neem-hair-oil' },
      { id: '6', name: 'Homemade Sweet Mango Pickle', category: 'Pickles', price: 199, slug: 'sweet-mango-pickle' },
    ];

    const filtered = mockProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/85 backdrop-blur-xs"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-2xl bg-warm-white rounded-xl shadow-2xl border border-stone/50 overflow-hidden z-10"
          >
            {/* Search Input bar */}
            <div className="p-4 flex items-center gap-3 border-b border-stone/20 bg-ivory">
              <Search className="h-5 w-5 text-forest" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search seeds, potting mixes, groceries..."
                className="flex-1 bg-transparent border-none focus:outline-none text-charcoal placeholder-stone-500 font-alt text-sm"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-stone/20 text-charcoal transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results pane */}
            <div className="p-6 max-h-[300px] overflow-y-auto space-y-4">
              {query && results.length === 0 && (
                <p className="text-center text-xs text-stone-500">No items found matching "{query}"</p>
              )}
              {!query && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-brown uppercase tracking-wider">Suggested Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Tomato Seeds', 'Potting Mix', 'Mango Pickle', 'Compost', 'Hair Oil'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="bg-stone/15 hover:bg-forest hover:text-warm-white text-charcoal px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {results.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-brown uppercase tracking-wider">Matching Products ({results.length})</p>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 bg-warm-white border border-stone/20 rounded-lg hover:border-forest transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 text-charcoal">
                        <Sprout className="h-4 w-4 text-forest" />
                        <span className="font-alt text-xs font-semibold">{product.name}</span>
                      </div>
                      <span className="text-xs font-bold text-forest">₹{product.price}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
