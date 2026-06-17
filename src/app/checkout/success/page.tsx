'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, ClipboardList } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-998822';
  const email = searchParams.get('email') || 'customer@gmail.com';
  const total = searchParams.get('total') || '399.00';

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-alt z-10 relative">
      <div className="max-w-md w-full bg-white border border-stone/30 rounded-xl p-8 text-center shadow-lg space-y-6">
        
        {/* Animated Check Icon */}
        <div className="flex justify-center text-forest animate-bounce">
          <CheckCircle2 className="h-16 w-16" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-forest">Order Placed Successfully!</h1>
          <p className="text-sm text-stone-500">
            Thank you for returning to nature through conscious living. Your order has been placed.
          </p>
        </div>

        {/* Invoice Info */}
        <div className="bg-ivory border border-stone/20 rounded-lg p-4 text-xs text-charcoal/90 text-left space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Order ID</span>
            <span className="font-bold text-forest">#{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Confirmation Email</span>
            <span>{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Paid</span>
            <span className="font-bold text-forest">₹{parseFloat(total).toFixed(2)}</span>
          </div>
        </div>

        <p className="text-[11px] text-stone-400">
          A confirmation email has been dispatched via Resend. Check your spam folder if it doesn't show up in a minute.
        </p>

        {/* Action button routing */}
        <div className="flex flex-col gap-3 pt-4 border-t border-stone/10">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-forest hover:bg-moss text-warm-white py-3 rounded-md font-medium text-sm transition-all duration-300 shadow-md"
          >
            Continue Growing (Shop)
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-white hover:bg-stone/20 border border-stone/30 text-charcoal py-3 rounded-md font-medium text-sm transition-all duration-300"
          >
            <ClipboardList className="h-4 w-4 text-forest" />
            Track Order Status
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg text-forest bg-warm-white">Loading Order Confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
