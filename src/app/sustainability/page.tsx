'use client';

import React from 'react';
import { Leaf, ShieldCheck, Heart, Wind } from 'lucide-react';
import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-8 z-10 relative font-alt">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">Our Green Pledge</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-forest tracking-tight">Conscious Ecology</h1>
          <p className="text-base text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Protecting the soil, conserving native seed heritages, and ensuring carbon neutral deliveries across Indian cities.
          </p>
        </div>

        {/* Core initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed">
            <h3 className="font-serif text-2xl text-forest leading-tight">1. Native Seed Conservation</h3>
            <p>
              Traditional non-hybrid seed varieties are disappearing. We collaborate directly with organic farming cooperatives to preserve heirloom seed heritages that pass down resilient properties generation after generation.
            </p>
            <h3 className="font-serif text-2xl text-forest leading-tight">2. Zero Plastics Packaging</h3>
            <p>
              Our lightweight grow bags are woven from recycled fibers that breathe easily and decompose safely. Orders are packed in compostable cartons using paper tapes and plant-based organic inks.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80"
            alt="Eco composting"
            className="rounded-xl border border-stone/30 shadow-md h-80 w-full object-cover"
          />
        </div>

        {/* Energy and delivery details */}
        <div className="bg-ivory border border-stone/20 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-center">
          <Wind className="h-12 w-12 text-forest shrink-0" />
          <div className="space-y-2 text-xs text-charcoal/90">
            <h4 className="font-serif text-sm text-forest font-bold">Carbon Neutral Shipments</h4>
            <p className="leading-relaxed">
              Logistics transit is a major emitter. Through our Shiprocket partners, we offset carbon footprints for every delivery by funding afforestation projects and supporting micro-solar grids in remote rural farming sectors.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-stone/30">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-forest text-warm-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-moss transition-colors shadow-md"
          >
            Support Sustainable Agriculture
          </Link>
        </div>

      </div>
    </div>
  );
}
