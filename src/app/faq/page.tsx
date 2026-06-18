'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Do you deliver products across India?',
    a: 'Yes. We deliver seeds, plants, Pots, and gardening essentials across India. Delivery timelines may vary depending on your location and product availability.',
  },
  {
    q: 'Are your seeds organic and non-GMO?',
    a: 'Yes. We provide high-quality organic and non-GMO seeds with excellent germination rates when proper growing conditions are maintained.',
  },
  {
    q: 'I am new to gardening. Can you help me get started?',
    a: 'Absolutely! We will provides guidance on seed selection, pot sizes, soil preparation, watering schedules, and terrace garden setup.',
  },
  {
    q: 'How long does seed germination take?',
    a: 'Germination time varies by crop. Most vegetable seeds germinate within 5–15 days under suitable moisture, sunlight, and temperature conditions.',
  },
  {
    q: 'How can I contact you for gardening advice?',
    a: 'You can contact us directly through WhatsApp at +91 7386038056 for product recommendations and gardening guidance.',
  },
  {
    q: 'Do you offer seasonal vegetable seed kits?',
    a: 'Yes. We provide seasonal seed collections and combo packs specially curated for home gardeners and terrace gardens.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI a secure online payment options.',
  },
  {
    q: 'How do I know which plants are suitable for my area?',
    a: 'Simply contact us on WhatsApp. Our team will recommend suitable vegetables, fruits, herbs, and flowering plants based on your location and season.',
  },
  {
    q: 'Do you sell lightweight soil mixes for terrace gardening?',
    a: 'Yes. Our lightweight growing media is specially designed for terrace gardens to reduce roof load while promoting healthy plant growth.',
  },
  {
    q: 'Can I order products directly through WhatsApp?',
    a: 'Yes. You can browse products, ask questions, and place orders directly through WhatsApp for a quick and convenient shopping experience.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-20 px-4 sm:px-6 lg:px-8 z-10 relative font-sans">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-sm uppercase tracking-[0.2em] text-[#2E7D32] font-semibold">Common Queries</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">Have a question? We are here to help. Find answers to common questions about our products, delivery, and organic gardening.</p>
        </div>

        {/* FAQs list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-serif text-lg text-gray-900 font-semibold">{faq.q}</span>
                  {isOpen ? (
                    <div className="bg-[#E8F5E9] p-2 rounded-full">
                      <ChevronUp className="h-5 w-5 text-[#2E7D32]" />
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-2 rounded-full">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-100 pt-4">
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
