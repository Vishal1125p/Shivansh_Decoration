'use client';

import React from 'react';
import { Palette, Gem, Clock, BadgePercent, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Palette,
    title: 'Creative Custom Themes',
    desc: 'Bespoke decoration concepts tailored specifically for your celebration with 3D visualization.'
  },
  {
    icon: Gem,
    title: 'Fresh Florals & Silk Drapes',
    desc: 'Only 100% farm-fresh flowers, premium imported fabrics, and crystal chandeliers.'
  },
  {
    icon: Clock,
    title: '100% On-Time Setup',
    desc: 'Guaranteed completion hours before your first guest arrives. Zero delays.'
  },
  {
    icon: BadgePercent,
    title: 'Transparent Pricing',
    desc: 'Clear upfront pricing packages with no hidden costs and maximum value.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 relative bg-white pattern-grid border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Shivansh Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Why Choose <span className="text-emerald-gradient">Shivansh</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            We blend royal Indian tradition with contemporary elegance and punctual perfection.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-xl shadow-sm transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Emerald Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Number indicator */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold group-hover:text-emerald-700 transition-colors">
                  <span>Trust Pillar</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
