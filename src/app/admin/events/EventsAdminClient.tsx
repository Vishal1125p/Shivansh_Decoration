'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Calendar, MapPin, Users, X, Sparkles, Film, Image as ImageIcon, Link as LinkIcon, Eye, Play } from 'lucide-react';
import { ShowcaseEvent, EventCategory } from '@/types';
import SafeImage from '@/components/SafeImage';
import VideoModal from '@/components/VideoModal';
import { getCleanMediaInfo, isVideoUrl, CATEGORY_FALLBACK_IMAGES } from '@/lib/mediaHelper';

interface Props {
  initialEvents: ShowcaseEvent[];
}

const CATEGORIES: EventCategory[] = [
  'Wedding',
  'Mandap',
  'Birthday',
  'Engagement',
  'Haldi',
  'Mehendi',
  'Baby Shower',
  'Corporate'
];

export default function EventsAdminClient({ initialEvents }: Props) {
  const [events, setEvents] = useState<ShowcaseEvent[]>(initialEvents);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; category: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    eventType: 'Birthday' as EventCategory,
    location: '',
    date: 'Recent Event',
    guestCount: 350,
    shortDesc: '',
    fullDesc: '',
    heroImage: CATEGORY_FALLBACK_IMAGES['Birthday'],
    videoUrl: '',
    galleryImagesInput: '',
    packageUsed: 'Royal Package',
    servicesIncluded: 'Stage Decoration, Balloon Arch, Custom Backdrop, Pathway Lighting',
    author: '',
    rating: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (cat: EventCategory) => {
    setFormData(prev => ({
      ...prev,
      eventType: cat,
      heroImage: prev.heroImage === CATEGORY_FALLBACK_IMAGES[prev.eventType] ? CATEGORY_FALLBACK_IMAGES[cat] : prev.heroImage
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const heroMedia = getCleanMediaInfo(formData.heroImage, formData.eventType);
      const isHeroAVideo = isVideoUrl(formData.heroImage);
      
      // If user put a video URL into heroImage, set that as videoUrl and assign clean fallback cover
      const finalHeroImage = isHeroAVideo 
        ? CATEGORY_FALLBACK_IMAGES[formData.eventType] || CATEGORY_FALLBACK_IMAGES.Default
        : (formData.heroImage.trim() || CATEGORY_FALLBACK_IMAGES[formData.eventType]);
        
      const finalVideoUrl = formData.videoUrl.trim() || (isHeroAVideo ? formData.heroImage.trim() : '');

      const galleryList = formData.galleryImagesInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          heroImage: finalHeroImage,
          videoUrl: finalVideoUrl,
          galleryImages: galleryList.length > 0 ? galleryList : [finalHeroImage],
          servicesIncluded: formData.servicesIncluded.split(',').map(s => s.trim()).filter(Boolean),
          clientReview: formData.author ? {
            author: formData.author,
            rating: formData.rating,
            comment: formData.comment
          } : undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEvents([data.event, ...events]);
        setIsAddOpen(false);
        setFormData({
          title: '',
          slug: '',
          eventType: 'Birthday',
          location: '',
          date: 'Recent Event',
          guestCount: 350,
          shortDesc: '',
          fullDesc: '',
          heroImage: CATEGORY_FALLBACK_IMAGES['Birthday'],
          videoUrl: '',
          galleryImagesInput: '',
          packageUsed: 'Royal Package',
          servicesIncluded: 'Stage Decoration, Balloon Arch, Custom Backdrop, Pathway Lighting',
          author: '',
          rating: 5,
          comment: ''
        });
        router.refresh();
      } else {
        alert(data.error || 'Failed to create event');
      }
    } catch (e) {
      alert('Network error creating event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete event "${title}"?`)) return;

    try {
      const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
        router.refresh();
      }
    } catch (e) {
      alert('Error deleting event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">Total Showcase Events: {events.length}</span>
        <button
          onClick={() => setIsAddOpen(true)}
          className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const mediaInfo = getCleanMediaInfo(event.heroImage || event.videoUrl, event.eventType);
          const hasVideo = !!event.videoUrl || isVideoUrl(event.heroImage);
          const videoLink = event.videoUrl || (isVideoUrl(event.heroImage) ? event.heroImage : null);
          const fallbackCover = CATEGORY_FALLBACK_IMAGES[event.eventType] || CATEGORY_FALLBACK_IMAGES.Default;

          return (
            <div
              key={event.id}
              className="glass-card rounded-2xl overflow-hidden border border-gold-500/20 p-4 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-zinc-900">
                  <SafeImage
                    src={mediaInfo.displayImageUrl}
                    alt={event.title}
                    fill
                    fallbackSrc={fallbackCover}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] text-gold-300 font-semibold border border-gold-500/30">
                    {event.eventType}
                  </span>

                  {hasVideo && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-600/90 text-[10px] text-white font-semibold flex items-center gap-1">
                      <Film className="w-3 h-3" />
                      <span>Reel / Video</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gold-400/90 mt-1">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 mt-2">
                  {event.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{event.guestCount} Guests</span>
                </div>

                <div className="flex items-center gap-2">
                  {hasVideo && videoLink && (
                    <button
                      onClick={() => setActiveVideo({ url: videoLink, title: event.title, category: event.eventType })}
                      className="px-2 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-500/40 text-[11px] font-semibold flex items-center gap-1 hover:bg-rose-900 hover:text-white transition-colors"
                    >
                      <Play className="w-3 h-3 fill-rose-300" />
                      <span>Play Video</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(event.id, event.title)}
                    className="p-1.5 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900 hover:text-white transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel-glow w-full max-w-2xl rounded-3xl p-6 border border-gold-500/40 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-xl font-bold text-white">
                  Add Completed Showcase Event
                </h3>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="py-5 space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    });
                  }}
                  placeholder="e.g. Royal Wedding of Priya & Amit"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Event Category *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => handleCategoryChange(e.target.value as EventCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Location / Venue *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Divashi BK, Satara, Maharashtra"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Guest Count</label>
                  <input
                    type="number"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Package Used</label>
                  <input
                    type="text"
                    value={formData.packageUsed}
                    onChange={(e) => setFormData({ ...formData, packageUsed: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Event Cover Photo Input */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-gold-500/25 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-zinc-200 font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-gold-400" />
                    <span>Event Cover Photo (Image URL) *</span>
                  </label>
                  <span className="text-[10px] text-zinc-400">Live Instant Preview</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="https://... photo URL"
                    className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, heroImage: CATEGORY_FALLBACK_IMAGES[formData.eventType] })}
                    className="px-3 py-1.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[11px] whitespace-nowrap"
                  >
                    Use Preset
                  </button>
                </div>

                {formData.heroImage && (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-gold-500/30 bg-black">
                    <SafeImage
                      src={getCleanMediaInfo(formData.heroImage, formData.eventType).displayImageUrl}
                      alt="Cover Preview"
                      fill
                      fallbackSrc={CATEGORY_FALLBACK_IMAGES[formData.eventType]}
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-gold-300 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>Live Cover Preview</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Video / Reel Link */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-rose-500/30 space-y-2">
                <label className="block text-zinc-200 font-semibold flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-rose-400" />
                  <span>Cinematic Video / Instagram Reel Link (Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.instagram.com/reel/... or https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none text-xs"
                />
                <p className="text-[10px] text-zinc-400">
                  Supports Instagram Reels (<code className="text-rose-300">instagram.com/reel/...</code>), YouTube videos (<code className="text-rose-300">youtu.be/...</code>), and MP4 clips.
                </p>
              </div>

              {/* Additional Photos */}
              <div>
                <label className="block text-zinc-300 font-semibold mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                  <span>Additional Decoration Highlights Photos (1 URL per line)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.galleryImagesInput}
                  onChange={(e) => setFormData({ ...formData, galleryImagesInput: e.target.value })}
                  placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Services Included (comma separated)</label>
                <input
                  type="text"
                  value={formData.servicesIncluded}
                  onChange={(e) => setFormData({ ...formData, servicesIncluded: e.target.value })}
                  placeholder="Stage Decoration, Balloon Arch, Custom Backdrop, Pathway Lighting"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Brief summary of the decoration concept and highlights..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider"
                >
                  {loading ? 'Publishing...' : 'Publish Showcase Event'}
                </button>
              </div>
            </form>
          </div>
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
