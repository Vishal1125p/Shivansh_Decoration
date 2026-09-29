import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Inbox, 
  Layers, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail 
} from 'lucide-react';
import { getAdminStats, getEnquiries } from '@/lib/store';
import EnquiryRowAction from './enquiries/EnquiryRowAction';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const allEnquiries = await getEnquiries();

  const statusColors: Record<string, string> = {
    New: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    Contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    Confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Completed: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    Cancelled: 'bg-red-500/20 text-red-300 border-red-500/40',
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shivansh Decoration Control</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
            Executive <span className="text-gold-gradient">Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>View All Enquiries ({stats.totalEnquiries})</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-6 rounded-2xl border border-gold-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Enquiries</span>
            <Inbox className="w-5 h-5 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {stats.totalEnquiries}
          </div>
          <div className="mt-2 text-xs text-amber-400 font-medium">
            {stats.newEnquiries} Pending Action
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Confirmed Bookings</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {stats.confirmedEnquiries}
          </div>
          <div className="mt-2 text-xs text-emerald-400 font-medium">
            Active Celebrations
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Active Services</span>
            <Layers className="w-5 h-5 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {stats.totalServices}
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Mandap, Stage, Haldi, etc.
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gold-500/20">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Gallery Photos</span>
            <ImageIcon className="w-5 h-5 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {stats.totalGallery}
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Across 9 Event Categories
          </div>
        </div>
      </div>

      {/* Recent Enquiries Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-gold-400" />
            <span>Recent Customer Enquiries</span>
          </h2>

          <Link href="/admin/enquiries" className="text-xs text-gold-400 hover:underline">
            Manage All ({allEnquiries.length}) →
          </Link>
        </div>

        <div className="glass-panel rounded-2xl border border-gold-500/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#181722] text-white font-serif uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Event & Date</th>
                  <th className="p-4 font-bold">Location</th>
                  <th className="p-4 font-bold">Budget</th>
                  <th className="p-4 font-bold text-center">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 font-sans">
                {allEnquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-4 font-medium text-white">
                      <div className="font-bold">{enq.fullName}</div>
                      <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                        <span>{enq.mobile}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gold-300 font-semibold block">{enq.eventType}</span>
                      <span className="text-[11px] text-zinc-400">{enq.eventDate}</span>
                    </td>
                    <td className="p-4 text-zinc-300">{enq.eventLocation}</td>
                    <td className="p-4 text-zinc-300">{enq.approxBudget}</td>
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
      </div>
    </div>
  );
}
