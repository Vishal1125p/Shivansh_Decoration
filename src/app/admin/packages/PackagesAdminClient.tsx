'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit3, Check, Save, IndianRupee, Sparkles } from 'lucide-react';
import { DecorationPackage } from '@/types';

interface Props {
  initialPackages: DecorationPackage[];
}

export default function PackagesAdminClient({ initialPackages }: Props) {
  const [packages, setPackages] = useState<DecorationPackage[]>(initialPackages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<DecorationPackage>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStartEdit = (pkg: DecorationPackage) => {
    setEditingId(pkg.id);
    setEditForm({
      ...pkg,
      inclusions: [...pkg.inclusions]
    });
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPackages(packages.map(p => p.id === id ? data.package : p));
        setEditingId(null);
        router.refresh();
      } else {
        alert(data.error || 'Failed to update package');
      }
    } catch (e) {
      alert('Network error updating package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => {
        const isEditing = editingId === pkg.id;

        return (
          <div
            key={pkg.id}
            className="glass-card p-6 rounded-3xl border border-gold-500/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {pkg.name}
                  </h3>
                  {pkg.badge && (
                    <span className="text-[10px] uppercase font-bold text-gold-400">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {!isEditing && (
                  <button
                    onClick={() => handleStartEdit(pkg)}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-gold-300 hover:text-white"
                    title="Edit Package"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="py-4 space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Starting Price (₹)</label>
                    <input
                      type="number"
                      value={editForm.startingPrice || 0}
                      onChange={(e) => setEditForm({ ...editForm, startingPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Ideal For</label>
                    <input
                      type="text"
                      value={editForm.idealFor || ''}
                      onChange={(e) => setEditForm({ ...editForm, idealFor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editForm.tagline || ''}
                      onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Inclusions (one per line)</label>
                    <textarea
                      rows={5}
                      value={(editForm.inclusions || []).join('\n')}
                      onChange={(e) => setEditForm({ ...editForm, inclusions: e.target.value.split('\n').filter(i => i.trim()) })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-gold-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  <div className="p-3 rounded-2xl bg-zinc-900/80 border border-gold-500/20 text-center">
                    <span className="text-[10px] uppercase text-zinc-400">Starting Price</span>
                    <div className="flex items-center justify-center text-2xl font-bold text-gold-300 mt-0.5">
                      <IndianRupee className="w-5 h-5" />
                      <span>{pkg.startingPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">{pkg.idealFor}</span>
                  </div>

                  <p className="text-xs text-zinc-300 min-h-[32px]">{pkg.tagline}</p>

                  <div className="space-y-2">
                    <span className="text-[11px] uppercase font-bold text-gold-400 block">Inclusions ({pkg.inclusions.length})</span>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(pkg.id)}
                  disabled={loading}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
