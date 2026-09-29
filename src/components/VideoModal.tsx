'use client';

import React, { useEffect } from 'react';
import { X, Film, ExternalLink } from 'lucide-react';
import { getCleanMediaInfo } from '@/lib/mediaHelper';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  title?: string;
  category?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title = 'Cinematic Event Video',
  category = 'Celebration'
}: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const mediaInfo = getCleanMediaInfo(videoUrl, category);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between text-white z-20 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif text-base font-bold text-white tracking-wide">
                {title}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-[10px] text-white font-bold uppercase">
                {mediaInfo.type === 'instagram' ? 'Instagram Reel' : 'Cinematic Video'}
              </span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">{category}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <span>Open Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {mediaInfo.type === 'instagram' && mediaInfo.instagramCode ? (
          <div className="w-full max-w-md h-full max-h-[80vh] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-black flex items-center justify-center">
            <iframe
              src={`https://www.instagram.com/reel/${mediaInfo.instagramCode}/embed/`}
              className="w-full h-full border-0 rounded-2xl"
              allowFullScreen
              scrolling="no"
              title={title}
            />
          </div>
        ) : mediaInfo.type === 'youtube' && mediaInfo.youtubeId ? (
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${mediaInfo.youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-black">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
        <span>Shivansh Decoration • Crafted with Excellence & Royal Aesthetics</span>
      </div>
    </div>
  );
}
