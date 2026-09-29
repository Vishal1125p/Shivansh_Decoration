'use client';

import React, { useState } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import SafeImage from './SafeImage';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-16 sm:py-20 relative bg-white overflow-hidden border-b border-slate-100">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Words of Appreciation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Client <span className="text-emerald-gradient">Testimonials</span>
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            What families and event hosts say about our decoration craftsmanship.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        {active && (
          <div className="relative bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-3xl mx-auto">
            {/* Top Quote Icon */}
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <Quote className="w-5 h-5" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 text-amber-400 mb-4">
              {[...Array(active.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="font-serif text-base sm:text-xl text-slate-800 italic leading-relaxed">
              "{active.comment}"
            </p>

            {/* Client Profile */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {active.avatarUrl ? (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-sm">
                    <SafeImage
                      src={active.avatarUrl}
                      alt={active.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    {active.name[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">
                    {active.name}
                  </h4>
                  <p className="text-xs text-emerald-700 font-semibold">
                    {active.eventType} • {active.location}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-colors shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-colors shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
