'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How far in advance should we book Shivansh Decoration for our event?',
    a: 'For major wedding dates and peak marriage season, we recommend booking 1 to 4 months in advance. For birthdays and home pooja decors, 1 to 2 weeks prior notice is usually sufficient.'
  },
  {
    q: 'Are the flowers used in your decoration 100% fresh?',
    a: 'Yes! We procure fresh farm-cut blooms (roses, orchids, lilies, rajnigandha, marigolds, and carnations) on the morning of your event, conditioned to stay radiant throughout your celebration.'
  },
  {
    q: 'Can you customize decorations according to our theme or Pinterest photos?',
    a: 'Yes, over 80% of our projects are bespoke. You can share your mood boards, Pinterest pins, or attire swatches, and our team will craft matching color palettes, drapes, and lighting.'
  },
  {
    q: 'Do you provide on-site venue visits before finalizing the design?',
    a: 'Yes. Once an initial discussion is completed, our coordinator conducts an on-site venue inspection to measure dimensions, calculate lighting, and plan exact layout arrangements.'
  },
  {
    q: 'Do you manage events across Maharashtra and nearby regions?',
    a: 'Yes! Shivansh Decoration operates across Satara, Pune, Mumbai, Kolhapur, Karad, and destination venues across Maharashtra with our dedicated team and transport.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 relative bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-emerald-gradient">Questions</span>
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Everything you need to know about booking, themes, and execution.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700 border-emerald-300' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
