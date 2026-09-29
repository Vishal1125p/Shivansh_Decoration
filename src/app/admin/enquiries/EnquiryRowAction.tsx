'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Save, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { CustomerEnquiry, EnquiryStatus } from '@/types';

interface Props {
  enquiry: CustomerEnquiry;
}

const STATUS_OPTIONS: EnquiryStatus[] = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

export default function EnquiryRowAction({ enquiry }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    setMsg('');

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg('Saved successfully!');
        router.refresh();
        setTimeout(() => setMsg(''), 2000);
      } else {
        setMsg(data.error || 'Failed to update.');
      }
    } catch (e) {
      setMsg('Error saving status.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (e) {
      alert('Failed to delete.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500 hover:text-black border border-gold-500/40 text-gold-300 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>Manage</span>
      </button>

      {/* Detail Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow w-full max-w-2xl rounded-3xl border border-gold-500/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                  Enquiry ID: {enquiry.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {enquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details Grid */}
            <div className="py-6 space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase text-zinc-500 block">Contact Info</span>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>{enquiry.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="w-3.5 h-3.5 text-gold-400" />
                    <span>{enquiry.email}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase text-zinc-500 block">Event & Date</span>
                  <div className="text-gold-300 font-semibold">{enquiry.eventType}</div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{enquiry.eventDate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-500 block">Venue Location</span>
                  <div className="text-white font-medium truncate mt-0.5">{enquiry.eventLocation}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-500 block">Guests</span>
                  <div className="text-white font-medium mt-0.5">{enquiry.guestCount} Attendees</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-500 block">Approx Budget</span>
                  <div className="text-gold-300 font-semibold mt-0.5">{enquiry.approxBudget}</div>
                </div>
              </div>

              {enquiry.decorationPreference && (
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-500 block">Theme / Preference</span>
                  <p className="text-zinc-200 mt-1">{enquiry.decorationPreference}</p>
                </div>
              )}

              {enquiry.message && (
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-500 block">Customer Message</span>
                  <p className="text-zinc-300 mt-1 italic whitespace-pre-line">"{enquiry.message}"</p>
                </div>
              )}

              {/* Status Update & Internal Notes */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-gold-500/20 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                    Enquiry Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setStatus(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                          status === opt
                            ? 'bg-gold-500 text-black shadow-gold-glow'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Internal Admin Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Sent PDF proposal on WhatsApp, follow-up scheduled for Friday..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                {msg && (
                  <div className="text-xs text-emerald-400 font-medium">
                    {msg}
                  </div>
                )}
              </div>

              {/* Quick Communication Triggers */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${enquiry.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enquiry.fullName)},%20this%20is%20Shivansh%20Decoration%20regarding%20your%20${encodeURIComponent(enquiry.eventType)}%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Client</span>
                </a>

                <a
                  href={`tel:${enquiry.mobile.replace(/[^0-9]/g, '')}`}
                  className="btn-outline-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Call</span>
                </a>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
