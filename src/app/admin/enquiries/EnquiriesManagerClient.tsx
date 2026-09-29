'use client';

import React, { useState } from 'react';
import { Search, Inbox, Filter, Phone, Mail, Calendar } from 'lucide-react';
import { CustomerEnquiry, EnquiryStatus } from '@/types';
import EnquiryRowAction from './EnquiryRowAction';

interface Props {
  initialEnquiries: CustomerEnquiry[];
}

const TABS: ('All' | EnquiryStatus)[] = ['All', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

export default function EnquiriesManagerClient({ initialEnquiries }: Props) {
  const [activeTab, setActiveTab] = useState<'All' | EnquiryStatus>('All');
  const [search, setSearch] = useState('');

  const statusColors: Record<string, string> = {
    New: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    Contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    Confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Completed: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    Cancelled: 'bg-red-500/20 text-red-300 border-red-500/40',
  };

  const filtered = initialEnquiries.filter((enq) => {
    const matchesTab = activeTab === 'All' || enq.status === activeTab;
    const matchesSearch =
      enq.fullName.toLowerCase().includes(search.toLowerCase()) ||
      enq.mobile.includes(search) ||
      enq.eventType.toLowerCase().includes(search.toLowerCase()) ||
      enq.eventLocation.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Tabs */}
      <div className="glass-panel p-4 rounded-2xl border border-gold-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries by name, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {TABS.map((tab) => {
            const count = tab === 'All' 
              ? initialEnquiries.length 
              : initialEnquiries.filter(e => e.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === tab
                    ? 'bg-gold-500 text-black shadow-gold-glow font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab ? 'bg-black/30 text-black' : 'bg-zinc-800 text-zinc-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enquiries Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl p-8 border border-zinc-800">
          <Inbox className="w-10 h-10 text-gold-400 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-white">No enquiries match your criteria</h3>
          <p className="text-xs text-zinc-400 mt-1">Try resetting the status filter or search query.</p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-gold-500/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#181722] text-white font-serif uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="p-4 font-bold">Customer Details</th>
                  <th className="p-4 font-bold">Event & Date</th>
                  <th className="p-4 font-bold">Location & Guests</th>
                  <th className="p-4 font-bold">Approx Budget</th>
                  <th className="p-4 font-bold text-center">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 font-sans">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-4 font-medium text-white">
                      <div className="font-bold text-sm">{enq.fullName}</div>
                      <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                        <span className="text-gold-300">{enq.mobile}</span>
                        <span>•</span>
                        <span className="truncate max-w-[140px]">{enq.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gold-300 font-semibold block">{enq.eventType}</span>
                      <span className="text-[11px] text-zinc-400">{enq.eventDate}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-zinc-200">{enq.eventLocation}</div>
                      <div className="text-[11px] text-zinc-500">{enq.guestCount} Guests</div>
                    </td>
                    <td className="p-4 text-zinc-300 font-medium">
                      {enq.approxBudget}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[enq.status] || 'bg-zinc-800'}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <EnquiryRowAction enquiry={enq} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
