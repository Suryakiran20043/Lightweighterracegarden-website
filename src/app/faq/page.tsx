'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Why should I use lightweight soil instead of standard red soil on my terrace?',
    a: 'Standard red mud becomes extremely heavy when watered, causing high structural load stress on concrete roofs. Our lightweight potting soil is formulated with coco-peat, compost, and perlite, reducing wet weight load by 60% while maintaining aeration for roots.',
  },
  {
    q: 'Which grow bag sizes are best for cherry tomatoes and chilies?',
    a: 'Deep root vegetable crops like cherry tomatoes require at least a 12x12 inch grow bag to spread roots. Herb crops like basil and coriander thrive easily in shallower 9x9 inch vertical planter pockets.',
  },
  {
    q: 'How does the organic reward points program work?',
    a: 'For every purchase made on our marketplace, 10% of the cart value is credited as reward points to your account. Points can be redeemed during checkout on seeds, vertical planters, and organic compost packages.',
  },
  {
    q: 'Do you ship lightweight compost and vertical setups across all pin codes in India?',
    a: 'Yes, we are integrated with Shiprocket logistics allowing us to serve over 20,000 pin codes across India, utilizing reliable ground fleets for heavy mixes and express delivery for seeds.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-8 z-10 relative font-alt">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">Common Queries</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-forest tracking-tight">Frequently Asked Questions</h1>
        </div>

        {/* FAQs list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-stone/30 rounded-xl overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-serif text-base text-forest focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-brown" /> : <ChevronDown className="h-4 w-4 text-brown" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-charcoal/80 leading-relaxed font-alt border-t border-stone/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
