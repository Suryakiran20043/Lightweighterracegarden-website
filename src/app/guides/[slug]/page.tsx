'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Sprout } from 'lucide-react';

const guidesData: Record<string, any> = {
  'beginner-terrace-gardening': {
    title: 'Beginner Guide to Terrace Gardening',
    author: 'Vriksha Expert',
    date: 'June 10, 2026',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    summary: 'Rooftops are windy and sunny. Learn the basic setup tips to start growing vegetables on your concrete roof safely.',
    content: `Terrace gardening is a rewarding way to bring fresh organic vegetables to your kitchen table. However, rooftops have unique microclimates: they receive high winds, long hours of direct sun, and have weight restrictions.

### Step 1: Weight Distribution
Before placing any pots, understand that wet soil is heavy. We recommend using a lightweight growing medium made of coco-peat, vermicompost, and perlite instead of heavy red garden clay. Woven grow bags are also much lighter and safer for roofs than clay or cement pots.

### Step 2: Choosing Your First Seeds
Start with easy-to-grow leafy greens like spinach, coriander, and mint. Once you gain confidence, progress to fruiting vegetables like cherry tomatoes and green chilies.

### Step 3: Watering Routine
Rooftops dry out quickly. Water your plants early in the morning or late in the evening. Avoid watering during peak hot hours to prevent soil baking.`,
  },
  'home-composting-guide': {
    title: 'Home Kitchen Waste Composting',
    author: 'ZeroWaste Guru',
    date: 'June 12, 2026',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80',
    summary: 'Turn vegetable trims, coffee grounds, and leaf waste into nutrient-dense compost for organic crops.',
    content: `Composting at home reduces waste sent to landfills and supplies your plants with premium nutrients.

### Step 1: Gather Carbon and Nitrogen
Good compost needs a balance of "greens" (nitrogen-rich kitchen wastes like potato peels, vegetable trims, and coffee grounds) and "browns" (carbon-rich materials like dry leaves, shredded cardboard, or coco-peat).

### Step 2: Choose a Composting Bin
A small aerated container or terracotta composter is ideal for balcony spaces. Ensure it has ventilation holes.

### Step 3: Layering and Turning
Start with a layer of browns at the bottom. Add a layer of greens, and cover with soil or coco-peat to prevent odors. Turn the mixture once a week to add oxygen. Within 4-6 weeks, you will have black, rich, earthy organic fertilizer!`,
  }
};

export default function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const guide = guidesData[slug] || guidesData['beginner-terrace-gardening'];

  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-8 z-10 relative font-alt">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-forest transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Guides
        </Link>

        {/* Title & Author Meta */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest tracking-tight leading-tight">
            {guide.title}
          </h1>
          <div className="flex gap-6 text-xs text-stone-500 font-semibold items-center">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-forest" /> {guide.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-forest" /> {guide.date}</span>
          </div>
        </div>

        {/* Banner image */}
        <div className="h-[300px] sm:h-[400px] rounded-xl overflow-hidden border border-stone/30 bg-white">
          <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
        </div>

        {/* Rich Text Editorial Content */}
        <article className="prose max-w-none text-sm text-charcoal/90 leading-relaxed font-alt space-y-6 pt-4 border-t border-stone/20">
          <p className="text-base font-medium text-forest italic">"{guide.summary}"</p>
          <div className="whitespace-pre-line space-y-4">
            {guide.content}
          </div>
        </article>

      </div>
    </div>
  );
}
