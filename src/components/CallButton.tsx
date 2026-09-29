'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function CallButton() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-20 left-6 z-40 sm:hidden">
      <a
        href="tel:+919766686373"
        className="btn-green p-3.5 rounded-full text-white shadow-green-glow flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        aria-label="Call Shivansh Decoration"
      >
        <PhoneCall className="w-5 h-5 fill-white text-white" />
      </a>
    </div>
  );
}
