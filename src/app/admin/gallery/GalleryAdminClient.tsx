'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Play, 
  X, 
  Sparkles, 
  Film, 
  Camera, 
  Eye, 
  Layers,
  MapPin,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import { GalleryImage, EventCategory } from '@/types';
import MediaUploader, { MediaUploadResult, extractYoutubeId } from '@/components/admin/MediaUploader';
import SafeImage from '@/components/SafeImage';

interface Props {
  initialImages: GalleryImage[];
}

const CATEGORIES: (EventCategory | 'All')[] = [
  'All',
  'Wedding',
  'Mandap',
  'Birthday',
  'Engagement',
  'Haldi',
  'Mehendi',
  'Baby Shower',
  'Corporate'
];

export default function GalleryAdminClient({ initialImages }: Props) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'image' | 'video'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<GalleryImage | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding' as EventCategory,
    mediaType: 'image' as 'image' | 'video',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '',
    thumbnailUrl: '',
    youtubeId: '',
    duration: '',
    location: 'Jaipur, Rajasthan',
    description: 'Luxury Indian wedding decoration setup.',
    aspectRatio: 'landscape' as 'square' | 'portrait' | 'landscape',
    isFeatured: false
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Filter images by both Category and MediaType
  const filtered = images.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const itemType = item.mediaType || (item.videoUrl ? 'video' : 'image');
    const matchesMediaType = mediaFilter === 'all' || itemType === mediaFilter;
    return matchesCategory && matchesMediaType;
  });

  const photoCount = images.filter(i => (i.mediaType || 'image') === 'image' && !i.videoUrl).length;
  const videoCount = images.filter(i => i.mediaType === 'video' || !!i.videoUrl).length;

  const handleMediaUploadSelect = (res: MediaUploadResult) => {
    setFormData((prev) => ({
      ...prev,
      mediaType: res.mediaType,
      imageUrl: res.mediaType === 'image' ? res.url : (res.thumbnailUrl || res.url),
      videoUrl: res.mediaType === 'video' ? res.url : '',
      thumbnailUrl: res.thumbnailUrl || (res.mediaType === 'image' ? res.url : ''),
      youtubeId: res.youtubeId || '',
      duration: res.duration || prev.duration
    }));
  };

  const handleDirectUrlChange = (val: string) => {
    const trimmed = val.trim();
    const ytId = extractYoutubeId(trimmed);
    const isYt = !!ytId;
    const isDirectVideo = /\.(mp4|webm|mov|m4v)$/i.test(trimmed) || trimmed.includes('vimeo.com') || isYt;
    const determinedType: 'image' | 'video' = isDirectVideo || formData.mediaType === 'video' ? 'video' : 'image';

    setFormData((prev) => ({
      ...prev,
      mediaType: determinedType,
      imageUrl: determinedType === 'image' ? trimmed : (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : trimmed),
      videoUrl: determinedType === 'video' ? trimmed : '',
      thumbnailUrl: ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : (determinedType === 'image' ? trimmed : prev.thumbnailUrl),
      youtubeId: ytId || ''
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImages([data.item, ...images]);
        setIsAddOpen(false);
        setFormData({
          title: '',
          category: 'Wedding',
          mediaType: 'image',
          imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          videoUrl: '',
          thumbnailUrl: '',
          youtubeId: '',
          duration: '',
          location: 'Jaipur, Rajasthan',
          description: 'Luxury Indian wedding decoration setup.',
          aspectRatio: 'landscape',
          isFeatured: false
        });
        router.refresh();
      } else {
        alert(data.error || 'Failed to add media');
      }
    } catch (e) {
      alert('Network error adding media');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this media item?')) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setImages(images.filter(img => img.id !== id));
        router.refresh();
      }
    } catch (e) {
      alert('Failed to delete media');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Media Type Switcher & Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div 
          onClick={() => setMediaFilter('all')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            mediaFilter === 'all'
              ? 'bg-zinc-900 border-gold-500 shadow-gold-glow'
              : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">All Media Assets</span>
            <Layers className="w-4 h-4 text-gold-400" />
          </div>
          <p className="font-serif text-2xl font-bold text-white mt-1">{images.length}</p>
        </div>

        <div 
          onClick={() => setMediaFilter('image')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            mediaFilter === 'image'
              ? 'bg-zinc-900 border-gold-500 shadow-gold-glow'
              : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Photographs</span>
            <Camera className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-serif text-2xl font-bold text-white mt-1">{photoCount}</p>
        </div>

        <div 
          onClick={() => setMediaFilter('video')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            mediaFilter === 'video'
              ? 'bg-zinc-900 border-gold-500 shadow-gold-glow'
              : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Videos & Reels</span>
            <Film className="w-4 h-4 text-rose-400" />
          </div>
          <p className="font-serif text-2xl font-bold text-white mt-1">{videoCount}</p>
        </div>
      </div>

      {/* Category Tabs & Add Button */}
      <div className="glass-panel p-4 rounded-2xl border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media (Video / Photo)</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => {
          const isVideo = item.mediaType === 'video' || !!item.videoUrl;
          const displayImage = item.thumbnailUrl || item.imageUrl;

          return (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden glass-card h-72 border border-gold-500/20 hover:border-gold-500/60 flex flex-col justify-between p-3 transition-all duration-300"
            >
              {displayImage ? (
                <SafeImage
                  src={displayImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <Film className="w-10 h-10 text-zinc-700" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60" />

              {/* Video Play Overlay */}
              {isVideo && (
                <div 
                  onClick={() => setPreviewMedia(item)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-500/90 hover:bg-gold-400 text-black flex items-center justify-center shadow-gold-glow transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Top Bar Badges */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                    isVideo
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                      : 'bg-black/80 text-gold-300 border-gold-500/30'
                  }`}>
                    {isVideo ? <Film className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                    <span>{isVideo ? 'VIDEO' : 'PHOTO'}</span>
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-black/80 text-[10px] text-zinc-300 font-medium border border-zinc-700">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewMedia(item)}
                    className="p-1.5 rounded-full bg-black/80 border border-zinc-700 text-zinc-300 hover:text-gold-300 hover:border-gold-500 transition-colors"
                    title="Preview Media"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 hover:bg-red-800 transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Info Details */}
              <div className="relative z-20">
                <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-400">
                  <span className="truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                    {item.location || 'Decoration Venue'}
                  </span>
                  {item.duration && (
                    <span className="flex items-center gap-1 text-gold-400/90 font-mono text-[10px]">
                      <Clock className="w-2.5 h-2.5" />
                      {item.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 border border-zinc-800 rounded-3xl bg-zinc-950/40">
          <Film className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-300">No media found matching the filter.</p>
          <p className="text-xs text-zinc-500 mt-1">Try switching categories or upload a new photo or video reel.</p>
        </div>
      )}

      {/* Add Media Modal (Photo or Video) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow w-full max-w-xl rounded-3xl border border-gold-500/40 p-6 sm:p-8 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <span>Add Gallery Media (Video / Photo)</span>
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="py-5 space-y-4 text-xs">
              {/* Media Uploader Integration */}
              <MediaUploader
                label="Select, Upload, or Paste Media"
                allowedTypes="all"
                initialType={formData.mediaType}
                initialUrl={formData.mediaType === 'video' ? (formData.videoUrl || formData.imageUrl) : formData.imageUrl}
                onMediaSelect={handleMediaUploadSelect}
              />

              {/* Direct Media Link Input for Verification */}
              <div>
                <label className="block text-zinc-300 font-semibold mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-gold-400" />
                  <span>Direct Image or Video URL *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.mediaType === 'video' ? (formData.videoUrl || formData.imageUrl) : formData.imageUrl}
                  onChange={(e) => handleDirectUrlChange(e.target.value)}
                  placeholder="https://... direct image link, Google photo, or YouTube link"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Title / Setup Name *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Grand Royal Palace Mandap Setup"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Location Venue</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Udaipur Lakeside Resort"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {formData.mediaType === 'video' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Video Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 01:45"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Aspect Ratio</label>
                    <select
                      value={formData.aspectRatio}
                      onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                    >
                      <option value="landscape">Landscape (16:9 Standard)</option>
                      <option value="portrait">Portrait (9:16 Reel / Short)</option>
                      <option value="square">Square (1:1 Feed)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Description / Caption</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief note about the floral styling and theme..."
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
                  {loading ? 'Publishing...' : 'Publish Media Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Inline Media Player / Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-panel-glow w-full max-w-3xl rounded-3xl border border-gold-500/40 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">{previewMedia.title}</h4>
                <p className="text-xs text-gold-400">{previewMedia.category} • {previewMedia.location}</p>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
              {previewMedia.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${previewMedia.youtubeId}?autoplay=1&rel=0`}
                  title={previewMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : previewMedia.videoUrl && previewMedia.videoUrl.endsWith('.mp4') ? (
                <video
                  src={previewMedia.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : previewMedia.videoUrl && extractYoutubeId(previewMedia.videoUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYoutubeId(previewMedia.videoUrl)}?autoplay=1&rel=0`}
                  title={previewMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <SafeImage
                  src={previewMedia.imageUrl}
                  alt={previewMedia.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
              {previewMedia.description || 'Shivansh Decoration luxury setup.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
