'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getSubtotal, getTotal, discountAmount, couponCode, applyCoupon, removeCoupon } =
    useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();

  const handleApplySampleCoupon = () => {
    if (couponCode) {
      removeCoupon();
    } else {
      applyCoupon('GROW10', 10, true); // 10% discount
    }
  };

  // Quick cross-sells
  const crossSells = [
    {
      id: 'var_soil_1',
      productId: 'prod_soil_1',
      name: 'Lightweight Premium Potting Soil (2 kg)',
      price: 180,
      sku: 'SOIL-LT-2KG',
    },
    {
      id: 'var_fert_1',
      productId: 'prod_fert_1',
      name: 'Organic Plant Booster Booster (500ml)',
      price: 220,
      sku: 'FERT-BST-500',
    },
  ];

  const { addItem } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 z-50 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-warm-white shadow-2xl z-50 flex flex-col border-l border-stone/50"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone/30 flex justify-between items-center bg-ivory">
              <div className="flex items-center gap-2 text-forest">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold">Your Garden Cart</h3>
                <span className="text-xs bg-forest/20 px-2 py-0.5 rounded-full text-forest font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-stone/20 text-charcoal transition-colors"
                aria-label="Close Cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-stone-500 text-sm">Your cart is empty. Start planting!</p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 bg-forest text-warm-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-moss transition-colors"
                  >
                    Browse Terrace Seeds
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-warm-white border border-stone/20 rounded-lg shadow-2xs"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-md border border-stone/10"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-stone/20 rounded-md flex items-center justify-center text-forest">
                            <ShoppingBag className="h-6 w-6" />
                          </div>
                        )}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-alt text-xs font-semibold text-charcoal line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-stone-500 font-medium">₹{item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-stone/30 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-charcoal hover:bg-stone/10"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-xs font-bold text-charcoal">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-charcoal hover:bg-stone/10"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-stone-400 hover:text-terracotta transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Smart Cross-Sell Section */}
                  <div className="border-t border-stone/30 pt-6">
                    <h4 className="font-serif text-sm text-brown font-semibold mb-3">
                      Terrace Garden Add-ons
                    </h4>
                    <div className="space-y-3">
                      {crossSells.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex justify-between items-center p-3 bg-ivory border border-stone/20 rounded-lg text-xs"
                        >
                          <div className="flex-1 pr-2">
                            <p className="font-medium text-charcoal">{addon.name}</p>
                            <p className="text-stone-500">₹{addon.price}</p>
                          </div>
                          <button
                            onClick={() => addItem(addon)}
                            className="bg-forest/10 hover:bg-forest text-forest hover:text-warm-white border border-forest/20 px-3 py-1.5 rounded-md transition-colors duration-200"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary / Checkout actions */}
            {items.length > 0 && (
              <div className="p-6 border-t border-stone/30 bg-ivory space-y-4">
                {/* Coupon Code section */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Apply Coupon (GROW10)</span>
                  </div>
                  <button
                    onClick={handleApplySampleCoupon}
                    className={`font-semibold hover:underline ${
                      couponCode ? 'text-terracotta' : 'text-forest'
                    }`}
                  >
                    {couponCode ? 'Remove' : 'Apply'}
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-charcoal">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-terracotta font-medium">
                      <span>Discount ({couponCode})</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{subtotal >= 999 ? 'FREE' : '₹60.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-forest pt-2 border-t border-stone/20">
                    <span>Estimated Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-moss text-warm-white py-3 px-4 rounded-md font-medium text-sm transition-all duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
