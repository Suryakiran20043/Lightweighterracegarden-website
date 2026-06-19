'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getSubtotal, getTotal, discountAmount, couponCode, applyCoupon, removeCoupon, addItem } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();

  const handleApplySampleCoupon = () => {
    if (couponCode) {
      removeCoupon();
    } else {
      applyCoupon('GROW10', 10, true); // 10% discount
    }
  };

  // Free shipping logic
  const FREE_SHIPPING_THRESHOLD = 500;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Quick cross-sells
  const crossSells = [
    {
      id: 'var_soil_1',
      productId: 'prod_soil_1',
      name: 'Premium Potting Mix (2 kg)',
      price: 180,
      sku: 'SOIL-LT-2KG',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'var_fert_1',
      productId: 'prod_fert_1',
      name: 'Organic Plant Booster (500ml)',
      price: 220,
      sku: 'FERT-BST-500',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80'
    },
  ];

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
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-2 text-gray-900">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="font-serif text-xl font-bold tracking-tight">Your Cart</h3>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close Cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="bg-[#F8FDF9] px-6 py-3 border-b border-gray-100 shrink-0">
                <p className="text-xs font-semibold text-[#1B5E20] text-center mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                  {amountToFreeShipping > 0 
                    ? `You are ₹${amountToFreeShipping.toFixed(2)} away from Free Shipping!` 
                    : `🎉 You've unlocked Free Shipping!`}
                </p>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="h-full bg-[#4CAF50] rounded-full"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 bg-[#FAFAFA]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium" style={{ fontFamily: 'var(--font-sans)' }}>Your cart is empty.</p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="bg-[#1B5E20] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#2E7D32] transition-colors shadow-md"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group">
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider hover:text-red-500 transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        Remove
                      </button>

                      <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex flex-col justify-between flex-1 py-1 pr-6">
                        <div>
                          <h4 className="font-serif text-[15px] font-bold text-gray-900 leading-tight line-clamp-2 pr-4">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-sans)' }}>SKU: {item.sku}</p>
                        </div>
                        
                        <div className="flex items-end justify-between mt-3">
                          <span className="font-bold text-[#1B5E20]" style={{ fontFamily: 'var(--font-sans)' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                          
                          {/* Elegant Quantity Toggle */}
                          <div className="flex items-center bg-[#F8F8F8] rounded-lg border border-gray-200 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2.5 py-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 text-xs font-bold text-gray-900 w-8 text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Cross-sells */}
                  <div className="pt-6 pb-2">
                    <h5 className="font-serif text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      You might also like
                    </h5>
                    <div className="space-y-3">
                      {crossSells.map((crossSell) => (
                        <div key={crossSell.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <img src={crossSell.image} alt={crossSell.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h6 className="text-xs font-bold text-gray-900 line-clamp-1" style={{ fontFamily: 'var(--font-sans)' }}>{crossSell.name}</h6>
                            <span className="text-[11px] font-bold text-[#1B5E20]" style={{ fontFamily: 'var(--font-sans)' }}>₹{crossSell.price}</span>
                          </div>
                          <button
                            onClick={() => addItem({ ...crossSell, image: crossSell.image || '' }, 1)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 p-2 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Order Summary */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 bg-white p-6 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] relative z-10">
                {/* Coupon Code section */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={couponCode || ''}
                      readOnly
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    />
                  </div>
                  <button
                    onClick={handleApplySampleCoupon}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                      couponCode
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {couponCode ? 'Remove' : 'Apply'}
                  </button>
                </div>

                <div className="space-y-2 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-[#4CAF50] font-medium">
                      <span>Discount ({couponCode})</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">{amountToFreeShipping <= 0 ? 'Free' : 'Calculated at checkout'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3">
                    <span className="text-base font-bold text-gray-900">Estimated Total</span>
                    <span className="text-xl font-bold text-[#1B5E20]">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-[#1B5E20] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2E7D32] transition-all hover:shadow-lg active:scale-[0.98]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>
                
                <div className="mt-3 flex items-center justify-center gap-1.5 text-gray-400 text-[10px] uppercase tracking-wider font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
                  <ShieldCheck className="w-3 h-3" /> Secure Encrypted Checkout
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
