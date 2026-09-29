'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Heart, Crown, Gift, Sun, Flower, Baby, GlassWater, Building2, Flame } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Wedding / Marriage',
    desc: 'Complete wedding decoration and venue styling.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    slug: 'complete-venue-decoration',
    icon: Crown,
    count: '250+ Hosted'
  },
  {
    title: 'Mandap Decoration',
    desc: 'Traditional and modern luxury mandap designs.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    slug: 'mandap-decoration',
    icon: Sparkles,
    count: '300+ Designs'
  },
  {
    title: 'Birthday Decoration',
    desc: 'Creative birthday themes for kids and adults.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    slug: 'birthday-decoration',
    icon: Gift,
    count: '150+ Themes'
  },
  {
    title: 'Engagement',
    desc: 'Elegant stage and venue decoration.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    slug: 'engagement-decoration',
    icon: Heart,
    count: '180+ Celebrations'
  },
  {
    title: 'Haldi',
    desc: 'Colorful and vibrant Haldi decoration.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    slug: 'haldi-decoration',
    icon: Sun,
    count: '140+ Setups'
  },
  {
    title: 'Mehendi',
    desc: 'Beautiful floral and traditional Mehendi setups.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    slug: 'mehendi-decoration',
    icon: Flower,
    count: '120+ Setups'
  },
  {
    title: 'Baby Shower',
    desc: 'Elegant and customized baby shower decoration.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    slug: 'baby-shower-decoration',
    icon: Baby,
    count: '90+ Moments'
  },
  {
    title: 'Anniversary',
    desc: 'Romantic anniversary celebration decoration.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    slug: 'reception-decoration',
    icon: GlassWater,
    count: '80+ Milestones'
  },
  {
    title: 'Naming Ceremony',
    desc: 'Traditional and modern naming ceremony setups.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    slug: 'baby-shower-decoration',
    icon: Sparkles,
    count: '70+ Cradles'
  },
  {
    title: 'Corporate Events',
    desc: 'Professional corporate event and gala decoration.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    slug: 'corporate-event-decoration',
    icon: Building2,
    count: '50+ Corporate'
  },
  {
    title: 'Festival Events',
    desc: 'Decoration for cultural and festival celebrations.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    slug: 'lighting-decoration',
    icon: Flame,
    count: '100+ Festivals'
  }
];

export default function EventCategories() {
  return (
    <section className="py-20 relative bg-white pattern-mandala border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Celebration Types</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Event <span className="text-emerald-gradient">Categories</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            From royal traditional Indian weddings to joyful birthday parties, we curate bespoke decoration concepts for every milestone.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.title}
                href={`/services/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-white h-80 flex flex-col justify-end p-6 border border-slate-200 hover:border-emerald-500/60 transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
              >
                {/* Background Card Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200 text-[11px] font-semibold text-emerald-800 shadow-sm">
                  <IconComponent className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{cat.count}</span>
                </div>

                {/* Top Right Action Arrow */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-200 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
