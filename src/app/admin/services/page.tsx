import React from 'react';
import { getServices } from '@/lib/store';
import ServicesAdminClient from './ServicesAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Manage <span className="text-gold-gradient">Services</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Add new decoration services, update starting prices, edit descriptions, and manage image banners.
        </p>
      </div>

      <ServicesAdminClient initialServices={services} />
    </div>
  );
}
