import React from 'react';
import Link from 'next/link';
import { Sprout, Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-stone border-t border-stone/20 pt-16 pb-8 z-10 relative">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        
        {/* Core Value Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone/10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-forest/20 text-sage">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif text-warm-white text-base">100% Certified Organic</h4>
              <p className="text-xs text-stone/70">Verified seeds and chemical-free nutrients.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-forest/20 text-sage">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif text-warm-white text-base">Carbon Neutral Shipping</h4>
              <p className="text-xs text-stone/70">Partnered with green delivery fleets across India.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-forest/20 text-sage">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif text-warm-white text-base">Easy Returns & Exchanges</h4>
              <p className="text-xs text-stone/70">No questions asked refund window on setups.</p>
            </div>
          </div>
        </div>

        {/* Links and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 py-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-sage" />
              <span className="font-serif text-lg text-warm-white font-bold tracking-tight">
                Terrace Garden Organics
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone/70">
              Returning to nature through conscious living. Empowering city dwellers to grow fresh, chemical-free greens on their roof.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="font-serif text-warm-white text-base mb-4">Product Collections</h4>
            <ul className="space-y-2 text-sm text-stone/70">
              <li><Link href="/shop?category=seeds" className="hover:text-warm-white transition-colors">Terrace Vegetable Seeds</Link></li>
              <li><Link href="/shop?category=fertilizers" className="hover:text-warm-white transition-colors">Lightweight Potting Soil</Link></li>
              <li><Link href="/shop?category=grocery" className="hover:text-warm-white transition-colors">Traditional Pantry Staples</Link></li>
              <li><Link href="/shop?category=care" className="hover:text-warm-white transition-colors">Herbal Hair & Skin Care</Link></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="font-serif text-warm-white text-base mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm text-stone/70">
              <li><Link href="/contact" className="hover:text-warm-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-warm-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/sustainability" className="hover:text-warm-white transition-colors">Sustainability Mission</Link></li>
              <li><Link href="/privacy" className="hover:text-warm-white transition-colors">Privacy Policy & Terms</Link></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-warm-white text-base">Subscribe & Save</h4>
            <p className="text-sm text-stone/70">Get 10% off your first setup purchase and receive expert weekly planting tips.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-stone/10 border border-stone/30 text-stone px-4 py-2 text-sm rounded-l-md w-full focus:outline-none focus:border-sage"
                required
              />
              <button
                type="submit"
                className="bg-forest text-warm-white px-4 py-2 text-sm rounded-r-md hover:bg-moss transition-colors font-medium"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Contact Info and Copyright */}
        <div className="border-t border-stone/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone/50">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Venkampet,Rajanna Sircilla,TS,India</span>
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> +91 73860 38056</span>
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> lightweightterracegarden@gmail.com</span>
          </div>
          <p>© 2026 Light Weight Terrace Garden. All Rights Reserved. Powerd by SURYA WORKS</p>
        </div>

      </div>
    </footer>
  );
}
