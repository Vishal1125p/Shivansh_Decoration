'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Users, ArrowRight, Search, Play, Film, Sparkles } from 'lucide-react';
import { ShowcaseEvent } from '@/types';
import SafeImage from '@/components/SafeImage';
import VideoModal from '@/components/VideoModal';
import { getCleanMediaInfo, isVideoUrl, CATEGORY_FALLBACK_IMAGES } from '@/lib/mediaHelper';

interface Props {
  initialEvents: ShowcaseEvent[];
}

const CATEGORIES = [
  'All',
  'Wedding',
  'Mandap',
  'Birthday',
  'Engagement',
  'Haldi',
  'Baby Shower'
];

export default function EventsCatalogClient({ initialEvents }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; category: string } | null>(null);

  const filtered = initialEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' || event.eventType.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-green-glow font-bold'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <Sparkles className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-slate-900">No events found</h3>
          <p className="text-xs text-slate-500 mt-1">Try selecting a different filter category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((event) => {
            const mediaInfo = getCleanMediaInfo(event.heroImage || event.videoUrl, event.eventType);
            const hasVideo = !!event.videoUrl || isVideoUrl(event.heroImage);
            const videoLink = event.videoUrl || (isVideoUrl(event.heroImage) ? event.heroImage : null);
            const fallbackCover = CATEGORY_FALLBACK_IMAGES[event.eventType] || CATEGORY_FALLBACK_IMAGES.Default;

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-xl shadow-sm transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <SafeImage
                    src={mediaInfo.displayImageUrl}
                    alt={event.title}
                    fill
                    fallbackSrc={fallbackCover}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 text-[11px] font-semibold text-emerald-800 shadow-sm">
                      {event.eventType}
                    </span>
                    {hasVideo && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-[10px] text-white font-bold flex items-center gap-1 shadow-md">
                        <Film className="w-3 h-3 text-white" />
                        <span>Reel / Video</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] text-slate-700 flex items-center gap-1 border border-slate-200 shadow-sm font-medium">
                    <Users className="w-3 h-3 text-emerald-600" />
                    <span>{event.guestCount} Guests</span>
                  </div>

                  {hasVideo && videoLink && (
                    <button
                      onClick={() => setActiveVideo({ url: videoLink, title: event.title, category: event.eventType })}
                      className="absolute inset-0 flex items-center justify-center group/btn"
                      aria-label="Play video"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-green-glow transition-transform duration-300 group-hover/btn:scale-110">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </button>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {event.shortDesc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/events/${event.slug}`}
                      className="btn-green px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                    >
                      <span>View Event</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {hasVideo && videoLink ? (
                      <button
                        onClick={() => setActiveVideo({ url: videoLink, title: event.title, category: event.eventType })}
                        className="text-xs text-emerald-700 hover:text-emerald-600 font-bold flex items-center gap-1 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        <span>Watch Reel</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {event.packageUsed}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          category={activeVideo.category}
        />
      )}
    </div>
  );
}
