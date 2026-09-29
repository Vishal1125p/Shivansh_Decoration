import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, Award, Clock, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Turning Ideas Into Beautiful Celebrations',
  description: 'Learn about Shivansh Decoration – our 5+ years of experience, passionate artisan team, and dedication to crafting royal Indian wedding mandaps and events.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Banner */}
      <section className="relative py-16 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Our Heritage & Craft</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Turning Your Ideas Into{' '}
          <span className="text-emerald-gradient block mt-1">
            Beautiful Celebrations
          </span>
        </h1>
        <p className="mt-6 text-slate-600 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
          For over 5+ years, <strong>Shivansh Decoration</strong> has been trusted by families across India to elevate their most sacred and joyous milestones with bespoke luxury event aesthetics.
        </p>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="Shivansh Decoration Wedding Setup"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-slate-700">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Passion for Perfection, Reverence for Tradition
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Founded on the belief that celebration is an expression of deep familial love and spiritual tradition, <strong>Shivansh Decoration</strong> has grown from a specialized floral boutique to one of India’s most dependable luxury event decoration powerhouses.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              We specialize in blending the regal architecture of Indian palaces and sacred Vedic traditions with modern minimalist lighting, crystal chandelier installations, and farm-fresh exotic florals. Whether you envision a 10,000-bloom red rose Mandap, a serene pastel Seemantham cradle, or a vibrant sunflower Haldi setup, our crew executes with impeccable finesse.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <span className="font-serif text-3xl font-bold text-emerald-700">500+</span>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Weddings & Galas Done</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <span className="font-serif text-3xl font-bold text-emerald-700">100%</span>
                <p className="text-xs text-slate-600 mt-1 font-semibold">On-Time Execution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-serif text-3xl font-bold text-slate-900">
            Our Guiding <span className="text-emerald-gradient">Values</span>
          </h3>
          <p className="text-slate-600 text-sm mt-2">
            The foundation of every stage, mandap, and photo corner we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Bespoke Storytelling</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No two couples or families are alike. We design customized blueprints reflecting your unique story, tastes, and customs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Uncompromising Quality</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              From fresh farm-cut Dutch roses to premium silk drapes and architectural focus lights, we never compromise on materials.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Punctual Peace of Mind</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our 20+ member artisan crew finishes full venue installations hours before ceremonies begin, giving you complete calm.
            </p>
          </div>
        </div>

        {/* CTA: Green Button */}
        <div className="mt-16 text-center">
          <Link
            href="/quote"
            className="btn-green px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-green-glow"
          >
            <span>Plan Your Event With Shivansh Decoration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
