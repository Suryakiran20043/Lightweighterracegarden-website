'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-12 z-10 relative font-alt">
      
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sage/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-terracotta/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">GET IN TOUCH</span>
          <h1 className="text-4xl font-serif text-forest tracking-tight">Contact Us</h1>
          <p className="text-sm text-charcoal/70 max-w-xl">
            Have questions about lightweight terrace setups, seed germination, or your order tracking? Get in touch with our team directly.
          </p>
        </div>

        {/* Two-Column Grid: Form (Left) & Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Form (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-stone/30 p-6 sm:p-10 rounded-2xl shadow-xs">
            <h3 className="font-serif text-2xl text-forest mb-6">Send Us a Message</h3>
            
            {submitted ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 bg-forest/15 rounded-full flex items-center justify-center text-forest mx-auto">
                  <Send className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-forest">Inquiry Received</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our team will contact you back via <strong>{formData.email}</strong> within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-brown transition-colors underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-stone-500">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Surya Kumar"
                      className="w-full bg-white text-charcoal border border-charcoal rounded-md px-3.5 py-3 outline-none focus:outline-none focus:ring-0 focus:border-forest placeholder-stone-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-stone-500">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="surya@gmail.com"
                      className="w-full bg-white text-charcoal border border-charcoal rounded-md px-3.5 py-3 outline-none focus:outline-none focus:ring-0 focus:border-forest placeholder-stone-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-stone-500">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 99892 21100"
                      className="w-full bg-white text-charcoal border border-charcoal rounded-md px-3.5 py-3 outline-none focus:outline-none focus:ring-0 focus:border-forest placeholder-stone-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-stone-500">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Terrace consultation query"
                      className="w-full bg-white text-charcoal border border-charcoal rounded-md px-3.5 py-3 outline-none focus:outline-none focus:ring-0 focus:border-forest placeholder-stone-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-stone-500">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Enter details of your terrace space or order issue..."
                    className="w-full bg-white text-charcoal border border-charcoal rounded-md px-3.5 py-3 outline-none focus:outline-none focus:ring-0 focus:border-forest placeholder-stone-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-moss text-warm-white py-4 rounded-md font-medium text-sm transition-all duration-300 shadow-md hover:translate-y-[-1px]"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information (5 columns) */}
          <div className="lg:col-span-5 space-y-8 lg:pl-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-forest">Contact Details</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-alt">
                Feel free to call or write to us. Our customer support team is available during operating hours.
              </p>
            </div>

            <div className="space-y-6 text-xs text-charcoal/80 leading-relaxed">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-forest/15 rounded-full text-forest shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-charcoal">Registered Address</h4>
                  <p className="text-stone-500">
                    Venkampet,Rajanna Sircilla,TS,India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-forest/15 rounded-full text-forest shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-charcoal">Voice Helpline</h4>
                  <p className="text-stone-500">+91 73860 38056</p>
                  <p className="text-[10px] text-stone-400 font-semibold">9:00 AM - 6:00 PM (Monday to Saturday)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-forest/15 rounded-full text-forest shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-charcoal">Support Email</h4>
                  <p className="text-stone-500">lightweightterracegarden@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
