'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, ArrowRight } from 'lucide-react';

const guides = [
  {
    slug: 'beginner-terrace-gardening',
    title: 'Beginner Guide to Terrace Gardening',
    summary: 'Rooftops are windy and sunny. Learn the basic setup tips to start growing vegetables on your concrete roof safely.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    author: 'Vriksha Expert',
  },
  {
    slug: 'home-composting-guide',
    title: 'Home Kitchen Waste Composting',
    summary: 'Turn vegetable trims, coffee grounds, and leaf waste into nutrient-dense compost for organic crops.',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
    author: 'ZeroWaste Guru',
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-8 z-10 relative font-alt">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">Grower Academy</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-forest tracking-tight">Rooftop Planting Guides</h1>
          <p className="text-base text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Step-by-step editorial tutorials on soil preparation, sowing timelines, and natural composting for terrace gardening.
          </p>
        </div>

        {/* List of guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.slug}
              className="bg-white border border-stone/30 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brown uppercase tracking-wider">Guide by {guide.author}</span>
                  <h3 className="font-serif text-xl text-forest group-hover:text-brown transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed min-h-[50px]">
                    {guide.summary}
                  </p>
                </div>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-brown transition-colors pt-2 group-hover:translate-x-1"
                >
                  Read Full Tutorial <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
