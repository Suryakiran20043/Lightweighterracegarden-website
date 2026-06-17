'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTotal, discountAmount, couponCode, applyCoupon, removeCoupon } =
    useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = (formData.get('code') as string).trim().toUpperCase();
    if (code === 'GROW10') {
      applyCoupon('GROW10', 10, true);
    } else {
      alert('Invalid Coupon! Try: GROW10');
    }
  };

  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-12 z-10 relative font-alt">
      <div className="w-full space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif text-forest">Shopping Cart</h1>
          <p className="text-sm text-charcoal/70">
            Review your lightweight planting essentials and organic products before proceeding to secure checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone/30 rounded-xl space-y-6">
            <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto" />
            <div className="space-y-2">
              <h3 className="font-serif text-xl text-forest">Your cart is empty</h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto">
                Looks like you haven't added any products to your cart yet. Let's start growing together!
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-forest text-warm-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-moss transition-colors shadow-md"
            >
              Browse Terrace Seeds
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left - Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6 bg-white border border-stone/30 rounded-xl shadow-2xs justify-between items-start sm:items-center"
                >
                  <div className="flex gap-4 items-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded-md border border-stone/10" />
                    ) : (
                      <div className="h-20 w-20 bg-stone/20 rounded-md flex items-center justify-center text-forest">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-serif text-base text-forest">{item.name}</h3>
                      <p className="text-xs text-stone-500 font-semibold mt-0.5">SKU: {item.sku}</p>
                      <p className="text-sm font-bold text-forest mt-1.5">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone/10">
                    <div className="flex items-center border border-stone/30 rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 text-charcoal hover:bg-stone/10"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-charcoal">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 text-charcoal hover:bg-stone/10"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-forest">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-stone-400 hover:text-terracotta font-semibold mt-1 flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Right - Order Summary Panel */}
            <div className="space-y-6">
              <div className="bg-white border border-stone/30 rounded-xl p-6 shadow-2xs space-y-6">
                <h3 className="font-serif text-lg text-forest border-b border-stone/20 pb-3">Order Summary</h3>

                {/* Coupon form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-forest" /> Have a Coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="code"
                      placeholder="e.g. GROW10"
                      className="flex-1 bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold uppercase focus:outline-none focus:border-forest"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-stone hover:bg-stone/80 text-charcoal px-4 py-2 rounded-md text-xs font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponCode && (
                    <div className="flex justify-between items-center text-xs bg-forest/10 p-2.5 rounded-md text-forest font-semibold">
                      <span>Coupon Applied: {couponCode}</span>
                      <button type="button" onClick={removeCoupon} className="text-terracotta hover:underline">
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Totals */}
                <div className="space-y-3 text-xs text-charcoal/90">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-terracotta font-medium">
                      <span>Coupon Discount</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{subtotal >= 999 ? 'FREE' : '₹60.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-forest pt-3 border-t border-stone/20">
                    <span>Order Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-moss text-warm-white py-3.5 rounded-md font-medium text-sm transition-all duration-300 shadow-md hover:translate-y-[-1px]"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Secure badge */}
              <div className="flex items-center gap-3 bg-ivory border border-stone/20 p-4 rounded-xl text-xs text-charcoal/80">
                <ShieldCheck className="h-5 w-5 text-forest shrink-0" />
                <p>Secure SSL Checkout. Verified gateway payments via Stripe and Razorpay.</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
