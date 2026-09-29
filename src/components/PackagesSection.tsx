'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Check, ArrowRight, IndianRupee } from 'lucide-react';
import { DecorationPackage } from '@/types';

interface PackagesSectionProps {
  packages: DecorationPackage[];
  isFullPage?: boolean;
}

export default function PackagesSection({ packages, isFullPage = false }: PackagesSectionProps) {
  return (
    <section id="packages" className={`relative ${isFullPage ? 'py-10' : 'py-16 sm:py-20'} bg-[#F8FAF9] pattern-mandala border-b border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tailored Value</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Curated Decoration <span className="text-emerald-gradient">Packages</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Transparent starting rates designed to provide maximum aesthetic grandeur for any celebration.
          </p>
        </div>

        {/* Packages 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg) => {
            const isHighlighted = pkg.highlighted;
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                  isHighlighted
                    ? 'border-2 border-emerald-600 lg:-translate-y-2 shadow-xl shadow-emerald-950/10'
                    : 'border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Highlight Ribbon */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Package Title & Tagline */}
                  <div className="text-center pb-5 border-b border-slate-100">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 min-h-[28px]">
                      {pkg.tagline}
                    </p>

                    {/* Starting Price Box */}
                    <div className="mt-4 inline-flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 w-full">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">Starting From</span>
                      <div className="flex items-center text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-0.5">
                        <IndianRupee className="w-5 h-5 mr-0.5 text-emerald-600" />
                        <span>{pkg.startingPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        Ideal for: {pkg.idealFor}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div className="py-5 space-y-2.5">
                    <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 block mb-3">
                      What’s Included:
                    </span>
                    {pkg.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action: Green Buttons */}
                <div className="pt-5 border-t border-slate-100">
                  <Link
                    href={`/quote?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isHighlighted
                        ? 'btn-green shadow-green-glow'
                        : 'btn-outline-green bg-emerald-50/50'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
