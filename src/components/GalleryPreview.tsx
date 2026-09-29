'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Maximize2, ArrowRight, Play, Film, Camera, Layers } from 'lucide-react';
import { GalleryImage } from '@/types';
import LightboxModal from './LightboxModal';
import SafeImage from './SafeImage';

interface GalleryPreviewProps {
  images: GalleryImage[];
  isFullPage?: boolean;
}

const CATEGORIES = [
  'All',
  'Wedding',
  'Mandap',
  'Birthday',
  'Engagement',
  'Haldi',
  'Mehendi',
  'Baby Shower',
  'Corporate',
];

export default function GalleryPreview({ images, isFullPage = false }: GalleryPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'video' | 'image'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = images.filter((img) => {
    const isVideo = img.mediaType === 'video' || !!img.videoUrl;
    const matchesCategory = selectedCategory === 'All' || img.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesMedia = mediaFilter === 'all' || (mediaFilter === 'video' ? isVideo : !isVideo);
    return matchesCategory && matchesMedia;
  });

  const displayedImages = isFullPage ? filteredImages : filteredImages.slice(0, 8);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayedImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayedImages.length) % displayedImages.length);
    }
  };

  return (
    <section className={`relative ${isFullPage ? 'py-12' : 'py-20 sm:py-24'} bg-[#F8FAF9] border-y border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {!isFullPage && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Visual Grandeur</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Our Work <span className="text-emerald-gradient">Gallery & Reels</span>
              </h2>
              <p className="mt-3 text-slate-600 text-base max-w-xl">
                Glimpses into our handcrafted mandaps, fairy light avenues, cinematic walkthroughs, and celebratory stage decors.
              </p>
            </div>

            <Link
              href="/gallery"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-600 group"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* Filter Controls: Media Type Tabs & Category Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Media Type Switcher */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm self-start">
            <button
              onClick={() => setMediaFilter('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mediaFilter === 'all'
                  ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Media</span>
            </button>

            <button
              onClick={() => setMediaFilter('video')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mediaFilter === 'video'
                  ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos & Reels</span>
            </button>

            <button
              onClick={() => setMediaFilter('image')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mediaFilter === 'image'
                  ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                    : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedImages.map((img, idx) => {
            const isVideo = img.mediaType === 'video' || !!img.videoUrl;
            const displayImg = img.thumbnailUrl || img.imageUrl;

            return (
              <div
                key={img.id || idx}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-white h-72 cursor-pointer border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <SafeImage
                  src={displayImg}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

                {/* Video Play Overlay */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-green-glow transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                    isVideo
                      ? 'bg-emerald-700 text-white border-emerald-500/50'
                      : 'bg-white/90 backdrop-blur-md text-emerald-800 border-emerald-200'
                  }`}>
                    {isVideo ? <Film className="w-3 h-3 text-white" /> : <Camera className="w-3 h-3 text-emerald-600" />}
                    <span>{isVideo ? 'VIDEO REEL' : img.category}</span>
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 transition-all transform translate-y-1 group-hover:translate-y-0">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-white line-clamp-1 mt-0.5">
                    {img.title}
                  </h4>
                  {img.location && (
                    <p className="text-[11px] text-slate-200 truncate mt-0.5 font-medium">
                      {img.location}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA on Home Preview */}
        {!isFullPage && (
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="btn-outline-green inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold bg-white"
            >
              <span>View Full Photo & Video Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={displayedImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
}
