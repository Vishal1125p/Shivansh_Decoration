import React from 'react';
import { getEnquiries } from '@/lib/store';
import EnquiriesManagerClient from './EnquiriesManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Customer <span className="text-gold-gradient">Enquiries</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review, filter, update status, and manage client follow-ups across all booked and prospective events.
        </p>
      </div>

      <EnquiriesManagerClient initialEnquiries={enquiries} />
    </div>
  );
}
