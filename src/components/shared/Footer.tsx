'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#18181B] text-gray-300 border-t border-white/10 pt-16 pb-8 z-10 relative font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        
        {/* Core Value Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#4CAF50]/10 text-[#4CAF50]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif !text-white text-base font-bold">100% Certified Organic</h4>
              <p className="text-[13px] text-gray-400 mt-1 font-medium">Verified seeds and chemical-free nutrients.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#4CAF50]/10 text-[#4CAF50]">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif !text-white text-base font-bold">Carbon Neutral Shipping</h4>
              <p className="text-[13px] text-gray-400 mt-1 font-medium">Partnered with green delivery fleets across India.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#4CAF50]/10 text-[#4CAF50]">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif !text-white text-base font-bold">Easy Returns &amp; Exchanges</h4>
              <p className="text-[13px] text-gray-400 mt-1 font-medium">No questions asked refund window on setups.</p>
            </div>
          </div>
        </div>

        {/* Links and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 py-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-7 w-7 text-[#4CAF50]" />
              <span className="font-serif text-xl text-white font-bold tracking-tight">
                Light Weight Terrace Garden
              </span>
            </Link>
            <p className="text-[14px] leading-relaxed text-gray-400 font-medium">
              Returning to nature through conscious living. Empowering city dwellers to grow fresh, chemical-free greens on their roof.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="font-serif !text-white text-base font-bold mb-5">Product Collections</h4>
            <ul className="space-y-3 text-[14px] text-gray-400 font-medium">
              <li><Link href="/shop?category=seeds" className="hover:text-[#4CAF50] transition-colors">Terrace Vegetable Seeds</Link></li>
              <li><Link href="/shop?category=fertilizers" className="hover:text-[#4CAF50] transition-colors">Lightweight Potting Soil</Link></li>
              <li><Link href="/shop?category=grocery" className="hover:text-[#4CAF50] transition-colors">Traditional Pantry Staples</Link></li>
              <li><Link href="/shop?category=care" className="hover:text-[#4CAF50] transition-colors">Herbal Hair &amp; Skin Care</Link></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="font-serif !text-white text-base font-bold mb-5">Customer Support</h4>
            <ul className="space-y-3 text-[14px] text-gray-400 font-medium">
              <li><Link href="/about" className="hover:text-[#4CAF50] transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#4CAF50] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#4CAF50] transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/sustainability" className="hover:text-[#4CAF50] transition-colors">Sustainability Mission</Link></li>
              <li><Link href="/privacy" className="hover:text-[#4CAF50] transition-colors">Privacy Policy &amp; Terms</Link></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif !text-white text-base font-bold mb-5">Subscribe &amp; Save</h4>
            <p className="text-[14px] text-gray-400 font-medium">Get 10% off your first setup purchase and receive expert weekly planting tips.</p>
            <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm rounded-l-md w-full focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-all placeholder:text-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-[#2E7D32] text-white px-5 py-2.5 text-sm rounded-r-md hover:bg-[#1B5E20] transition-colors font-medium whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Contact Info and Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col xl:flex-row justify-between items-center gap-6 text-[13px] text-gray-500 font-medium">
          <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Venkampet,Rajanna Sircilla,TS,India</span>
            <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> +91 73860 38056</span>
            <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> lightweightterracegarden@gmail.com</span>
          </div>
          <p className="text-center xl:text-right">© 2026 Light Weight Terrace Garden. All Rights Reserved. Powerd by SURYA WORKS</p>
        </div>

      </div>
    </footer>
  );
}
