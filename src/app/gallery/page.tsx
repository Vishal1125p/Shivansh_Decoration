import React from 'react';
import { Metadata } from 'next';
import { getGallery } from '@/lib/store';
import GalleryPreview from '@/components/GalleryPreview';

export const metadata: Metadata = {
  title: 'Decoration Photo & Video Gallery | Mandap, Stage, Floral & Party Themes',
  description: 'Browse our complete visual gallery of luxury Indian wedding mandaps, reception stages, Haldi, Mehendi setups, cinematic walkthrough videos, and birthday decor.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const galleryImages = await getGallery();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header */}
      <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Visual <span className="text-emerald-gradient">Gallery & Reels</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-lg font-normal leading-relaxed">
          Explore high-definition photographs and cinematic walkthrough video reels of our handcrafted stages, mandaps, floral arches, and festive setups.
        </p>
      </section>

      {/* Full Gallery Grid with Lightbox */}
      <GalleryPreview images={galleryImages} isFullPage={true} />
    </div>
  );
}
