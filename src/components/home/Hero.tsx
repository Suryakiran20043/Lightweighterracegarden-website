'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRight, ChevronRight, Sprout, ShoppingCart, Leaf } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const stages = [
    {
      label: 'The Seed',
      title: 'Every seed carries possibility',
      desc: 'All life starts small. A simple organic seed holds the heritage and memories of traditional growing.',
      color: '#D6A84F', // Golden Harvest
      svg: (
        <svg className="w-48 h-48 text-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="65" rx="15" ry="8" fill="#6B4F3B" /> {/* Soil */}
          <circle cx="50" cy="50" r="6" fill="#D6A84F" className="animate-pulse" /> {/* Seed */}
        </svg>
      ),
    },
    {
      label: 'The Sprout',
      title: 'Awakening with conscious care',
      desc: 'Nurtured by light potting soil and organic water, a tiny green shoot breaks through the earth.',
      color: '#A6B89B', // Sage
      svg: (
        <svg className="w-48 h-48 text-sage" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 80C50 80 50 60 55 50C60 40 70 35 70 35" stroke="#6B4F3B" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 80C50 80 48 55 45 45C42 35 30 30 30 30" stroke="#739072" strokeWidth="4" strokeLinecap="round" />
          <path d="M45 45C45 45 35 48 32 40C29 32 35 25 45 45Z" fill="#A6B89B" /> {/* Tiny leaf */}
        </svg>
      ),
    },
    {
      label: 'The Leaves',
      title: 'Branching out into the light',
      desc: 'Reaching higher on your terrace, expanding green leaves breathe clean life into urban rooftops.',
      color: '#739072', // Leaf Green
      svg: (
        <svg className="w-48 h-48 text-leaf" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90V40" stroke="#6B4F3B" strokeWidth="6" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M50 70Q30 65 35 50Q40 35 50 45" fill="#739072" />
          <path d="M50 55Q70 50 65 35Q60 20 50 30" fill="#4F6F52" />
        </svg>
      ),
    },
    {
      label: 'The Bloom',
      title: 'A celebration of growth',
      desc: 'Flowers open, inviting pollinators. The terrace comes alive with colors and traditional fragrances.',
      color: '#C97B63', // Terracotta
      svg: (
        <svg className="w-48 h-48 text-terracotta" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90V30" stroke="#6B4F3B" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 60Q25 50 35 30" stroke="#739072" strokeWidth="4" fill="none" />
          <circle cx="50" cy="30" r="14" fill="#C97B63" />
          <circle cx="50" cy="30" r="6" fill="#D6A84F" />
        </svg>
      ),
    },
    {
      label: 'The Harvest',
      title: 'Plucking the fruits of your care',
      desc: 'Fresh, nutrient-dense organic produce, handpicked directly from your sustainable terrace home.',
      color: '#4F6F52', // Moss Green
      svg: (
        <svg className="w-48 h-48 text-moss" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="55" width="50" height="30" rx="4" fill="#6B4F3B" /> {/* Wooden crate */}
          {/* Veggies */}
          <circle cx="40" cy="50" r="12" fill="#C97B63" />
          <circle cx="60" cy="52" r="10" fill="#D6A84F" />
          <path d="M35 42C35 42 40 30 45 42Z" fill="#739072" />
        </svg>
      ),
    },
    {
      label: 'The Marketplace',
      title: 'Conscious organic living',
      desc: 'Completing the circle. Bringing seeds, traditional groceries, and herbal wellness back to your home.',
      color: '#1E4D2B', // Forest Green
      svg: (
        <svg className="w-48 h-48 text-forest" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#1E4D2B" />
          <path d="M35 45L50 30L65 45" stroke="#FCFBF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="55" r="8" fill="#D6A84F" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // Check reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentStep(5); // skip straight to final marketplace layout
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 1.5, ease: 'power3.inOut' },
        onRepeat: () => {
          setCurrentStep(0);
        },
      });

      // Animate stages sequentially
      stages.forEach((_, index) => {
        tl.to({}, {
          duration: 3, // stay on each stage for 3s
          onStart: () => {
            setCurrentStep(index);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkip = () => {
    setCurrentStep(5);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center bg-warm-white px-4 py-16 overflow-hidden border-b border-stone/50 z-10"
    >
      {/* Decorative organic background meshes */}
      <div className="absolute top-10 left-10 opacity-30 text-sage/30">
        <Leaf className="h-48 w-48 floating-leaf" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-30 text-sage/30">
        <Leaf className="h-64 w-64 floating-leaf" style={{ animationDelay: '2s' }} />
      </div>

      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brown font-semibold bg-ivory px-3 py-1 rounded-full border border-stone/40">
          RETURNS TO NATURE
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-forest tracking-tight">
          {stages[currentStep].title}
        </h1>
      </div>

      {/* Animation Display */}
      <div className="my-8 flex flex-col items-center justify-center min-h-[220px] transition-all duration-700">
        {stages[currentStep].svg}
      </div>

      {/* Slide Description */}
      <div className="text-center max-w-xl mx-auto space-y-6">
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed min-h-[60px] px-4 font-alt">
          {stages[currentStep].desc}
        </p>

        {/* Step indicators */}
        <div className="flex justify-center gap-2">
          {stages.map((stage, idx) => (
            <button
              key={stage.label}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentStep === idx ? 'w-8 bg-forest' : 'w-2 bg-stone'
              }`}
              aria-label={`Go to stage: ${stage.label}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          {currentStep === 5 ? (
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-forest text-warm-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-moss transition-all duration-300 shadow-md hover:translate-y-[-2px]"
            >
              Shop Terrace Organics
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              ref={skipBtnRef}
              onClick={handleSkip}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brown hover:text-forest transition-colors py-2 px-4 rounded-full border border-stone/40 hover:bg-stone/20"
            >
              Skip Story
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
