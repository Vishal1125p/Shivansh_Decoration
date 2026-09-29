'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 relative bg-white overflow-hidden border-b border-slate-100">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 p-2 shadow-2xl bg-slate-50">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Shivansh Decoration Team Craftsmanship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-5 rounded-2xl border border-emerald-200 shadow-xl max-w-xs animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  5+
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-900">Years of Excellence</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">Creating Royal Memories Across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Counters */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>About Shivansh Decoration</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Turning Your Ideas Into{' '}
              <span className="text-emerald-gradient">Beautiful Celebrations</span>
            </h2>

            <p className="mt-6 text-slate-700 text-base sm:text-lg leading-relaxed">
              At <strong>Shivansh Decoration</strong>, we believe every milestone in life deserves an awe-inspiring ambiance. As a premier Indian event decoration and management company, we provide tailored solutions that unite timeless heritage aesthetics with contemporary luxury craftsmanship.
            </p>

            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              From majestic wedding mandaps and royal reception stages to cheerful birthday party themes and traditional Haldi-Mehendi setups, our passionate creative directors and skilled craftsmen execute every project with pristine flowers, quality fabrics, and punctual professionalism.
            </p>

            {/* Stat Counters */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {inView ? '500+' : '500+'}
                </span>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Events Executed</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {inView ? '100+' : '100+'}
                </span>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Happy Clients</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {inView ? '50+' : '50+'}
                </span>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Decor Themes</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {inView ? '5+' : '5+'}
                </span>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Years Experience</p>
              </div>
            </div>

            {/* Action CTA: Green Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="btn-green px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-green-glow"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/quote"
                className="btn-outline-green px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
