'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { ShieldCheck, CreditCard, ChevronRight, Lock, MapPin, Truck, HelpCircle, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, discountAmount, couponCode, clearCart } = useCartStore();
  
  const subtotal = getSubtotal();
  const total = getTotal();

  // Wizard state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center font-serif text-forest p-4">
        <h2 className="text-2xl mb-4">Your Cart is Empty</h2>
        <button onClick={() => router.push('/shop')} className="bg-forest text-warm-white px-6 py-2 rounded-md font-sans text-sm">
          Browse Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Place Order
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API request to Server Action/Route Handler to create order, send email confirmation and update inventory
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate a random order ID
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    clearCart();
    setIsProcessing(false);
    
    router.push(`/checkout/success?orderId=${orderId}&email=${encodeURIComponent(formData.email)}&total=${total}`);
  };

  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-12 z-10 relative font-alt">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left - Checkout Wizard (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Indicators */}
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/60 bg-white border border-stone/30 p-4 rounded-xl">
            <span className={step === 1 ? 'text-forest font-bold' : ''}>1. Shipping Address</span>
            <ChevronRight className="h-4 w-4" />
            <span className={step === 2 ? 'text-forest font-bold' : ''}>2. Logistics Carrier</span>
            <ChevronRight className="h-4 w-4" />
            <span className={step === 3 ? 'text-forest font-bold' : ''}>3. Secure Payment</span>
          </div>

          <div className="bg-white border border-stone/30 rounded-xl p-6 sm:p-8 shadow-2xs">
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* Step 1 - Shipping Address */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-forest flex items-center gap-2"><MapPin className="h-5 w-5" /> Shipping Address Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal">Shipping Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 - Logistics Carrier selection (Shiprocket integration serviceability details) */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-forest flex items-center gap-2"><Truck className="h-5 w-5" /> Choose Logistics Provider</h3>
                  <p className="text-xs text-charcoal/80">Real-time shipping serviceability rates based on pincode: <strong>{formData.pincode}</strong></p>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-forest rounded-lg bg-forest/5 cursor-pointer text-xs">
                      <div className="flex items-center gap-3">
                        <input type="radio" defaultChecked className="text-forest focus:ring-forest" />
                        <div>
                          <p className="font-bold text-forest">Shiprocket Express Ground</p>
                          <p className="text-stone-500">Delivered within 3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-bold text-forest">{subtotal >= 999 ? 'FREE' : '₹60.00'}</span>
                    </label>

                    <label className="flex items-center justify-between p-4 border border-stone/30 rounded-lg opacity-60 cursor-not-allowed text-xs">
                      <div className="flex items-center gap-3">
                        <input type="radio" disabled className="text-forest focus:ring-forest" />
                        <div>
                          <p className="font-bold text-charcoal">Premium Air Express</p>
                          <p className="text-stone-500">Next-day delivery (Unserviceable for current pincode)</p>
                        </div>
                      </div>
                      <span className="font-bold text-charcoal">₹150.00</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3 - Secured Payments */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-forest flex items-center gap-2"><CreditCard className="h-5 w-5" /> Select Secure Payment Gateway</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'razorpay', name: 'Razorpay UPI/Cards' },
                      { id: 'stripe', name: 'Stripe Credit Card' },
                      { id: 'cod', name: 'Cash on Delivery (COD)' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer text-center text-xs font-semibold ${
                          formData.paymentMethod === method.id
                            ? 'border-forest bg-forest/5 text-forest'
                            : 'border-stone/30 hover:border-forest text-charcoal'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span>{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-stone/20">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-bold text-stone-500 hover:text-charcoal transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 bg-forest hover:bg-moss text-warm-white px-6 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Transaction...' : step === 3 ? 'Place Secure Order' : 'Continue'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right - Cart Summary Sticky Drawer (1 column) */}
        <div className="bg-white border border-stone/30 rounded-xl p-6 shadow-2xs sticky top-24 space-y-4">
          <h3 className="font-serif text-lg text-forest border-b border-stone/20 pb-2 flex justify-between items-center">
            <span>Order Summary</span>
            <span className="text-xs bg-forest/20 text-forest px-2 py-0.5 rounded-full">{items.length} items</span>
          </h3>

          <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="min-w-0 pr-2">
                  <p className="font-semibold text-charcoal truncate">{item.name}</p>
                  <p className="text-stone-500">Qty: {item.quantity} &times; ₹{item.price}</p>
                </div>
                <span className="font-bold text-forest shrink-0">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone/20 pt-3 space-y-2 text-xs text-charcoal/90">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-terracotta">
                <span>Discount ({couponCode})</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{subtotal >= 999 ? 'FREE' : '₹60.00'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-forest pt-2.5 border-t border-stone/20">
              <span>Total Bill</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-2 items-center text-[10px] text-stone-500 bg-ivory p-3 rounded-lg border border-stone/20 mt-2">
            <Lock className="h-4 w-4 text-forest shrink-0" />
            <p>Payment information is encrypted and transmitted securely via secure SSL protocol.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
