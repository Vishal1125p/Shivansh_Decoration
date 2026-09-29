import React from 'react';
import { getTestimonials } from '@/lib/store';
import TestimonialsAdminClient from './TestimonialsAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Manage <span className="text-gold-gradient">Customer Testimonials</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Add authentic client feedback, ratings, and event reviews displayed on the website.
        </p>
      </div>

      <TestimonialsAdminClient initialTestimonials={testimonials} />
    </div>
  );
}
