'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Users, ArrowRight, Play, Film } from 'lucide-react';
import { ShowcaseEvent } from '@/types';
import SafeImage from './SafeImage';
import VideoModal from './VideoModal';
import { getCleanMediaInfo, isVideoUrl, CATEGORY_FALLBACK_IMAGES } from '@/lib/mediaHelper';

interface FeaturedEventsProps {
  events: ShowcaseEvent[];
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; category: string } | null>(null);

  return (
    <section className="py-16 sm:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Featured <span className="text-emerald-gradient">Events Showcase</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Explore our recent completed events captured in authentic detail with high-res photos and video walkthroughs.
            </p>
          </div>

          <Link
            href="/events"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-600 group"
          >
            <span>View All Events Portfolio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.slice(0, 6).map((event) => {
            const mediaInfo = getCleanMediaInfo(event.heroImage || event.videoUrl, event.eventType);
            const hasVideo = !!event.videoUrl || isVideoUrl(event.heroImage);
            const videoLink = event.videoUrl || (isVideoUrl(event.heroImage) ? event.heroImage : null);
            const fallbackCover = CATEGORY_FALLBACK_IMAGES[event.eventType] || CATEGORY_FALLBACK_IMAGES.Default;

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-xl shadow-sm transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Event Image / Video Poster */}
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

                  {/* Top Badges */}
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

                  {/* Guest Count */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] text-slate-700 flex items-center gap-1 border border-slate-200 shadow-sm font-medium">
                    <Users className="w-3 h-3 text-emerald-600" />
                    <span>{event.guestCount} Guests</span>
                  </div>

                  {/* Play Video Button Overlay (if video exists) */}
                  {hasVideo && videoLink && (
                    <button
                      onClick={() => setActiveVideo({ url: videoLink, title: event.title, category: event.eventType })}
                      className="absolute inset-0 flex items-center justify-center group/btn"
                      aria-label="Play event video"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-green-glow transition-transform duration-300 group-hover/btn:scale-110">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Event Content */}
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

                  {/* Actions Bar: Green Buttons */}
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
      </div>

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
    </section>
  );
}
