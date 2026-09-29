import React from 'react';
import { Metadata } from 'next';
import { getEvents } from '@/lib/store';
import EventsCatalogClient from './EventsCatalogClient';

export const metadata: Metadata = {
  title: 'Real Events Portfolio | Shivansh Decoration Celebrations',
  description: 'Explore real weddings, mandaps, haldi ceremonies, engagements, and birthday celebrations styled by Shivansh Decoration.',
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Banner */}
      <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Real Events <span className="text-emerald-gradient">Portfolio</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-lg font-normal leading-relaxed">
          Authentic stories and behind-the-scenes photography from our royal weddings, traditional rituals, and luxury parties.
        </p>
      </section>

      <EventsCatalogClient initialEvents={events} />
    </div>
  );
}
