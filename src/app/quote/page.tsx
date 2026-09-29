import React from 'react';
import { Metadata } from 'next';
import { Sparkles, Phone, MessageSquare } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Get Free Quote | Event & Wedding Decoration Cost Estimator',
  description: 'Request a customized free decoration quote from Shivansh Decoration. 100% transparent pricing for Mandaps, Stages, Haldi, Mehendi, Birthdays and Venue Decor.',
};

export default function QuotePage({
  searchParams,
}: {
  searchParams: { service?: string; package?: string };
}) {
  return (
    <div className="pt-28 pb-20 bg-white pattern-mandala">
      {/* Header Banner */}
      <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>No Obligation Quotation</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Get Your <span className="text-emerald-gradient">Free Custom Quote</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-lg font-normal leading-relaxed">
          Share your celebration vision with our creative team. We deliver transparent rate cards and concept mockups within 2 hours.
        </p>
      </section>

      {/* Main Quote Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <QuoteForm
          defaultService={searchParams.service}
          defaultPackage={searchParams.package}
        />
      </section>

      {/* Direct Contact Alternatives */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="tel:+919766686373"
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-md flex items-center gap-4 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Prefer Calling?</span>
              <h4 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">+91 97666 86373</h4>
            </div>
          </a>

          <a
            href="https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20would%20like%20to%20get%20a%20free%20decoration%20quote%20for%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-500/60 shadow-sm hover:shadow-md flex items-center gap-4 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:bg-emerald-700 transition-colors shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Instant WhatsApp</span>
              <h4 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Chat on WhatsApp</h4>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
