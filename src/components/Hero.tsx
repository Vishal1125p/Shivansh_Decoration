'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Star, ShieldCheck, Clock, Award, MessageSquare } from 'lucide-react';

export default function Hero() {
  const whatsappUrl = 'https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20would%20like%20to%20inquire%20about%20event%20decoration%20services.';

  return (
    <section className="relative min-h-[90vh] pt-24 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white">
      {/* Background Hero Image with Light Elegant Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Shivansh Decoration Luxury Indian Wedding Mandap"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Emerald Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Premier Event & Mandap Decorators</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.15] sm:leading-[1.1]">
          Make Every Celebration{' '}
          <span className="text-emerald-gradient block mt-1 sm:mt-2">
            Beautiful
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-sans font-normal leading-relaxed">
          Premium Wedding, Mandap, Birthday & Special Event Decoration Services crafted with royal elegance and fresh florals.
        </p>

        {/* Action Buttons: Green Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          <Link
            href="/services"
            className="btn-green w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-green-glow group"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-green-glow transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
            <span>WhatsApp Us</span>
          </a>

          <Link
            href="/quote"
            className="btn-outline-green w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Get Free Quote</span>
          </Link>
        </div>

        {/* Trust Badges / Highlights */}
        <div className="mt-12 sm:mt-14 max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-md grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center gap-1.5 p-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Creative Designs</span>
              <span className="text-[11px] text-slate-500 font-medium">Unique Custom Themes</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1.5 p-2 border-l border-slate-100">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Premium Quality</span>
              <span className="text-[11px] text-slate-500 font-medium">Fresh Florals & Silk Drapes</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1.5 p-2 border-t md:border-t-0 md:border-l border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Expert Team</span>
              <span className="text-[11px] text-slate-500 font-medium">Experienced Artisans</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1.5 p-2 border-t md:border-t-0 md:border-l border-slate-100">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">On-Time Setup</span>
              <span className="text-[11px] text-slate-500 font-medium">100% Punctual Guarantee</span>
            </div>
          </div>
        </div>

        {/* Micro Rating Indicator */}
        <div className="mt-6 sm:mt-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>Rated <strong className="text-slate-900">4.9 / 5.0</strong> by 500+ Happy Families</span>
        </div>
      </div>
    </section>
  );
}
