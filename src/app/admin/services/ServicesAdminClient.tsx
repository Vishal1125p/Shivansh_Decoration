'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit3, IndianRupee, Layers, X, Sparkles, Film } from 'lucide-react';
import { ServiceItem, EventCategory } from '@/types';
import MediaUploader from '@/components/admin/MediaUploader';
import SafeImage from '@/components/SafeImage';

interface Props {
  initialServices: ServiceItem[];
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

export default function ServicesAdminClient({ initialServices }: Props) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Wedding' as EventCategory,
    shortDesc: '',
    fullDesc: '',
    startingPrice: 35000,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '',
    features: 'Bespoke custom design\n100% Fresh exotic florals\nOn-time setup commitment'
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: formData.features.split('\n').filter(f => f.trim())
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setServices([data.service, ...services]);
        setIsAddOpen(false);
        setFormData({
          title: '',
          slug: '',
          category: 'Wedding',
          shortDesc: '',
          fullDesc: '',
          startingPrice: 35000,
          heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          videoUrl: '',
          features: 'Bespoke custom design\n100% Fresh exotic florals\nOn-time setup commitment'
        });
        router.refresh();
      } else {
        alert(data.error || 'Failed to create service');
      }
    } catch (e) {
      alert('Network error creating service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">Total Services: {services.length}</span>
        <button
          onClick={() => setIsAddOpen(true)}
          className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="glass-card rounded-2xl overflow-hidden border border-gold-500/20 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-zinc-900">
                <SafeImage
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  fallbackSrc="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] text-gold-300 font-semibold border border-gold-500/30">
                  {service.category}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                {service.title}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                {service.shortDesc}
              </p>

              <div className="mt-3 flex items-center text-gold-300 font-bold text-sm">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>{service.startingPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-zinc-500 font-normal ml-1">(Starting)</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">/services/{service.slug}</span>
              <span className="text-gold-400 font-medium text-[11px]">Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow w-full max-w-xl rounded-3xl border border-gold-500/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <span>Add New Decoration Service</span>
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="py-5 space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Service Title *</label>
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
                  placeholder="e.g. Royal Maharaja Mandap"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <MediaUploader
                  label="Service Hero Cover Image"
                  allowedTypes="image"
                  initialType="image"
                  initialUrl={formData.heroImage}
                  onMediaSelect={(res) => setFormData(prev => ({ ...prev, heroImage: res.url }))}
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-rose-400" />
                  <span>Concept Walkthrough Video Link (Optional YouTube / MP4)</span>
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or MP4 URL"
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
                  placeholder="Summary of the decoration concept..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
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
                  {loading ? 'Creating...' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
