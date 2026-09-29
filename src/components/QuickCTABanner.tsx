'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageSquare, Phone, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function QuickCTABanner() {
  const whatsappNumber = '919766686373';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Shivansh%20Decoration,%20I%20would%20like%20to%20inquire%20about%20event%20decoration%20services.`;

  return (
    <section className="py-16 sm:py-20 relative bg-[#F8FAF9] overflow-hidden border-b border-slate-100">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 md:p-14 border border-emerald-600/30 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle decorative accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-400/40 text-emerald-100 text-xs uppercase tracking-widest font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Ready to Plan Your Dream Celebration?</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Let’s Make Your Special Day{' '}
            <span className="text-emerald-300">Extraordinary</span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Get instant customized quotation, theme mood boards, and on-site venue consultation from our senior decoration experts.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* WhatsApp Direct Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Direct Call */}
            <a
              href="tel:+919766686373"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-400/40 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call +91 97666 86373</span>
            </a>

            {/* Quote Form Link */}
            <Link
              href="/quote"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Micro Trust Points */}
          <div className="mt-8 pt-6 border-t border-emerald-700/60 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>100% Quality & Fresh Flowers Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-300" />
              <span>Punctual Setup Before Event Time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Free Theme Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
