'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, IndianRupee } from 'lucide-react';
import { ServiceItem } from '@/types';
import SafeImage from './SafeImage';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Wedding', 'Mandap', 'Birthday', 'Engagement', 'Haldi', 'Mehendi', 'Corporate'];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="services" className="py-16 sm:py-20 relative bg-[#F8FAF9] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Decoration Specialties</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Our Premium <span className="text-emerald-gradient">Services</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Impeccable decoration craft customized for grand stages, sacred rituals, and joyful celebrations.
            </p>
          </div>

          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-600 group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-green-glow font-bold'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid - 6 clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col group shadow-sm"
            >
              {/* Service Hero Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <SafeImage
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Category Tag */}
                <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 text-[11px] font-semibold text-emerald-800 shadow-sm">
                  {service.category}
                </span>

                {/* Starting Price Pill */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-0.5 shadow-md">
                  <span className="text-[10px] text-slate-500 font-normal mr-1">Starts</span>
                  <IndianRupee className="w-3 h-3 text-emerald-600" />
                  <span>{service.startingPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3.5 space-y-1">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action: Green Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn-green px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/quote?service=${encodeURIComponent(service.title)}`}
                    className="text-xs text-slate-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="btn-outline-green inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs uppercase tracking-widest font-bold bg-white"
          >
            <span>Explore All Decoration Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
