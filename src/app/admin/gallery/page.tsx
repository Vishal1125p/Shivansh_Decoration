import React from 'react';
import { getGallery } from '@/lib/store';
import GalleryAdminClient from './GalleryAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const images = await getGallery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Manage <span className="text-gold-gradient">Photos & Video Reels</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Upload and manage high-definition decoration photography, YouTube walkthrough videos, and wedding reels.
        </p>
      </div>

      <GalleryAdminClient initialImages={images} />
    </div>
  );
}
