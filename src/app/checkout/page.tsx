'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { ShieldCheck, CreditCard, ChevronRight, Lock, MapPin, Truck, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, discountAmount, couponCode, clearCart } = useCartStore();
  
  const subtotal = getSubtotal();
  const total = getTotal();

  // Wizard state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center font-serif text-[#1B5E20] p-4">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 font-sans mb-8">Add items to your cart to checkout.</p>
        <button onClick={() => router.push('/shop')} className="bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-sans text-sm font-bold shadow-md hover:bg-[#2E7D32]">
          Continue Shopping
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
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    setIsProcessing(false);
    
    router.push(`/checkout/success?orderId=${orderId}&email=${encodeURIComponent(formData.email)}&total=${total}`);
  };

  // Modern Floating Label Input Component
  const InputField = ({ label, name, type = 'text', required = false, className = '' }: any) => (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        placeholder=" "
        className="block px-4 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-[#4CAF50] peer"
        style={{ fontFamily: 'var(--font-sans)' }}
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-4 peer-focus:text-[#4CAF50] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label} {required && '*'}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Ultra-minimal header just for checkout */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-center lg:justify-start">
          <Link href="/" className="font-serif text-2xl font-bold text-[#1B5E20] tracking-tight">
            Light Weight<br/><span className="text-xs tracking-[0.2em] uppercase text-[#4CAF50] font-sans">Terrace Garden</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row min-h-[calc(100vh-80px)]">
        
        {/* Left Side: Checkout Flow */}
        <div className="w-full lg:w-[55%] xl:w-[60%] lg:pr-12 xl:pr-16 pt-10 pb-20 px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Progress */}
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-10 uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
            <Link href="/cart" className="hover:text-gray-900 transition-colors">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className={step === 1 ? 'text-gray-900' : (step > 1 ? 'text-[#1B5E20] cursor-pointer' : '')} onClick={() => step > 1 && setStep(1)}>Information</span>
            <ChevronRight className="w-3 h-3" />
            <span className={step === 2 ? 'text-gray-900' : (step > 2 ? 'text-[#1B5E20] cursor-pointer' : '')} onClick={() => step > 2 && setStep(2)}>Shipping</span>
            <ChevronRight className="w-3 h-3" />
            <span className={step === 3 ? 'text-gray-900' : ''}>Payment</span>
          </nav>

          {/* Express Checkout */}
          {step === 1 && (
            <div className="mb-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'var(--font-sans)' }}>Express Checkout</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#5A31F4] hover:bg-[#4825C9] text-white py-3 rounded-lg flex items-center justify-center transition-colors shadow-sm">
                  <span className="font-bold tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>ShopPay</span>
                </button>
                <button className="bg-black hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center transition-colors shadow-sm">
                  <span className="font-bold tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>GPay</span>
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'var(--font-sans)' }}>OR CONTINUE BELOW</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
            </div>
          )}

          <form onSubmit={handleNextStep}>
            
            {/* Step 1: Contact & Shipping */}
            <div className={`transition-all duration-300 ${step !== 1 ? 'hidden' : 'block'}`}>
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Contact Information</h2>
                <InputField label="Email or mobile phone number" name="email" type="email" required />
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <InputField label="First name" name="firstName" required />
                  <InputField label="Last name" name="lastName" required />
                </div>
                <InputField label="Address" name="address" required className="mb-3" />
                <InputField label="Apartment, suite, etc. (optional)" name="apartment" className="mb-3" />
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <InputField label="City" name="city" required className="col-span-1" />
                  <div className="relative col-span-1">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="block px-4 pb-2.5 pt-6 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-[#4CAF50] peer"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      <option value="">State</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="KA">Karnataka</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="MH">Maharashtra</option>
                      <option value="DL">Delhi</option>
                    </select>
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-4" style={{ fontFamily: 'var(--font-sans)' }}>State/Territory *</label>
                  </div>
                  <InputField label="PIN code" name="pincode" required className="col-span-1" />
                </div>
                <InputField label="Phone" name="phone" required type="tel" />
              </div>

              <div className="mt-8 flex justify-end">
                <button type="submit" className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8 py-4 rounded-lg font-bold text-sm transition-colors shadow-md w-full sm:w-auto" style={{ fontFamily: 'var(--font-sans)' }}>
                  Continue to shipping
                </button>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className={`transition-all duration-300 ${step !== 2 ? 'hidden' : 'block'}`}>
              
              {/* Summary of Step 1 */}
              <div className="border border-gray-200 rounded-lg p-4 mb-8 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
                  <div className="flex gap-6">
                    <span className="text-gray-500 w-16">Contact</span>
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-[#1B5E20] text-xs hover:underline">Change</button>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-6">
                    <span className="text-gray-500 w-16">Ship to</span>
                    <span className="text-gray-900">{formData.address}, {formData.city}, {formData.state} {formData.pincode}</span>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-[#1B5E20] text-xs hover:underline">Change</button>
                </div>
              </div>

              <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Shipping Method</h2>
              
              <div className="border border-[#4CAF50] bg-[#F8FDF9] rounded-lg p-4 flex items-center justify-between cursor-pointer shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-[5px] border-[#1B5E20]"></div>
                  <span className="text-gray-900 font-medium" style={{ fontFamily: 'var(--font-sans)' }}>Standard Shipping (3-5 Business Days)</span>
                </div>
                <span className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-sans)' }}>Free</span>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button type="button" onClick={() => setStep(1)} className="text-[#1B5E20] text-sm hover:underline" style={{ fontFamily: 'var(--font-sans)' }}>
                  <ChevronRight className="w-4 h-4 inline rotate-180" /> Return to information
                </button>
                <button type="submit" className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8 py-4 rounded-lg font-bold text-sm transition-colors shadow-md" style={{ fontFamily: 'var(--font-sans)' }}>
                  Continue to payment
                </button>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className={`transition-all duration-300 ${step !== 3 ? 'hidden' : 'block'}`}>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-8 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
                  <div className="flex gap-6">
                    <span className="text-gray-500 w-16">Contact</span>
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-[#1B5E20] text-xs hover:underline">Change</button>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
                  <div className="flex gap-6">
                    <span className="text-gray-500 w-16">Ship to</span>
                    <span className="text-gray-900">{formData.address}, {formData.city}, {formData.state} {formData.pincode}</span>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-[#1B5E20] text-xs hover:underline">Change</button>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-6">
                    <span className="text-gray-500 w-16">Method</span>
                    <span className="text-gray-900">Standard Shipping · <b>Free</b></span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Payment</h2>
              <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
                {/* UPI Option */}
                <label className={`flex flex-col border-b border-gray-200 cursor-pointer ${formData.paymentMethod === 'upi' ? 'bg-[#F8FDF9] border-[#4CAF50]' : ''}`}>
                  <div className="flex items-center gap-3 p-4">
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} className="w-4 h-4 text-[#1B5E20] focus:ring-[#4CAF50]" />
                    <span className="font-medium text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
                  </div>
                  {formData.paymentMethod === 'upi' && (
                    <div className="px-11 pb-4 text-sm text-gray-500">
                      You will be redirected to securely complete your purchase using your preferred UPI app.
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label className={`flex flex-col border-b border-gray-200 cursor-pointer ${formData.paymentMethod === 'card' ? 'bg-[#F8FDF9] border-[#4CAF50]' : ''}`}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="w-4 h-4 text-[#1B5E20] focus:ring-[#4CAF50]" />
                      <span className="font-medium text-gray-900">Credit / Debit Card</span>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                  {formData.paymentMethod === 'card' && (
                    <div className="px-11 pb-4 space-y-3">
                      <input type="text" placeholder="Card number" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Expiration date (MM / YY)" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
                        <input type="text" placeholder="Security code" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
                      </div>
                      <input type="text" placeholder="Name on card" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
                    </div>
                  )}
                </label>

                {/* COD Option */}
                <label className={`flex flex-col cursor-pointer ${formData.paymentMethod === 'cod' ? 'bg-[#F8FDF9] border-[#4CAF50]' : ''}`}>
                  <div className="flex items-center gap-3 p-4">
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="w-4 h-4 text-[#1B5E20] focus:ring-[#4CAF50]" />
                    <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Pay ₹{total.toFixed(2)}
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                  <ShieldCheck className="w-4 h-4" /> Secure 256-bit SSL Encryption
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button type="button" onClick={() => setStep(2)} className="text-[#1B5E20] text-sm hover:underline text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                  <ChevronRight className="w-4 h-4 inline rotate-180" /> Return to shipping
                </button>
              </div>
            </div>

          </form>

        </div>

        {/* Right Side: Order Summary (Sticky Sidebar) */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#FAFAFA] border-l border-gray-200 relative pt-10 pb-20 px-4 sm:px-6 lg:px-12">
          
          <div className="sticky top-28">
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center relative">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ fontFamily: 'var(--font-sans)' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm font-sans line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>{item.sku}</p>
                  </div>
                  <span className="font-medium text-gray-900 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4CAF50] bg-white"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
                <button className="bg-gray-200 text-gray-500 px-4 rounded-lg font-bold text-sm" style={{ fontFamily: 'var(--font-sans)' }}>Apply</button>
              </div>

              <div className="space-y-3 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#4CAF50]">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-gray-500">Calculated at next step</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <span className="text-lg text-gray-900 font-sans">Total</span>
                <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-sans)' }}>
                  <span className="text-sm font-normal text-gray-500 mr-2">INR</span>
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
