'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const prefilledMessage = encodeURIComponent(
    'Hello Shivansh Decoration, I am interested in your event decoration services. I would like to get a quote.'
  );

  return (
    <a
      href={`https://wa.me/919766686373?text=${prefilledMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group border-2 border-white/20"
      aria-label="Chat with Shivansh Decoration on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-white" />
      <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
        WhatsApp Us
      </span>
    </a>
  );
}
