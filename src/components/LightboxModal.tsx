'use client';

import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, Film } from 'lucide-react';
import { GalleryImage } from '@/types';
import { extractYoutubeId } from '@/components/admin/MediaUploader';
import SafeImage from '@/components/SafeImage';

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  const isVideo = currentImage.mediaType === 'video' || !!currentImage.videoUrl;
  const youtubeId = currentImage.youtubeId || (currentImage.videoUrl ? extractYoutubeId(currentImage.videoUrl) : null);
  const isDirectVideo = currentImage.videoUrl && (currentImage.videoUrl.endsWith('.mp4') || currentImage.videoUrl.startsWith('/uploads/'));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-white z-20 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            {isVideo ? <Film className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-base font-bold text-white tracking-wide">
                {currentImage.title}
              </h4>
              {isVideo && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-[10px] text-white font-bold uppercase">
                  Video Reel
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="text-emerald-400 font-semibold">{currentImage.category}</span>
              {currentImage.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {currentImage.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Arrow Left */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Media: Video Player or Image */}
        <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
          {isVideo && youtubeId ? (
            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={currentImage.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : isVideo && isDirectVideo ? (
            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-black">
              <video
                src={currentImage.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <SafeImage
              src={currentImage.imageUrl}
              alt={currentImage.title}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
          aria-label="Next item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Caption */}
      <div className="text-center text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto border-t border-slate-800 pt-3 font-medium">
        {currentImage.description || 'Shivansh Decoration Luxury Indian Wedding & Event Decor'}
      </div>
    </div>
  );
}
