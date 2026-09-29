import React from 'react';
import { Metadata } from 'next';
import { getServices } from '@/lib/store';
import ServicesCatalogClient from './ServicesCatalogClient';

export const metadata: Metadata = {
  title: 'Event & Wedding Decoration Services | Mandap, Stages, Birthdays & Themes',
  description: 'Explore all 14+ premium decoration services by Shivansh Decoration. Mandap designs, reception stages, Haldi, Mehendi, birthday balloons, fairy lighting and turnkey venues.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Banner */}
      <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Our Decoration <span className="text-emerald-gradient">Services</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-lg font-normal leading-relaxed">
          From traditional sacred rituals to modern celebratory glamour, explore our complete portfolio of event decoration services.
        </p>
      </section>

      {/* Interactive Catalog Client with search & filters */}
      <ServicesCatalogClient initialServices={services} />
    </div>
  );
}
