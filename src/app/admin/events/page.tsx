import React from 'react';
import { getEvents } from '@/lib/store';
import EventsAdminClient from './EventsAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Manage <span className="text-gold-gradient">Showcase Events</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Publish real event case studies, showcase high-res photos, guest counts, and client reviews.
        </p>
      </div>

      <EventsAdminClient initialEvents={events} />
    </div>
  );
}
