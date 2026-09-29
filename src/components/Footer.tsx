'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  ArrowUp,
  Clock,
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-800/30 pt-14 pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800">

          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-[1.5px] shadow-green-glow flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Shivansh Decoration
                </span>
                <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-sans font-semibold -mt-1">
                  We Make Your Moments Beautiful
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Premier event and wedding decoration services. We specialize in luxury mandaps, reception stages, Haldi, Mehendi, birthdays, and turnkey venue styling in Maharashtra & beyond.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Real Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-emerald-400 transition-colors">
                  Packages & Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Decoration Services */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/services/mandap-decoration" className="hover:text-emerald-400 transition-colors">
                  Mandap Decoration
                </Link>
              </li>
              <li>
                <Link href="/services/wedding-stage-decoration" className="hover:text-emerald-400 transition-colors">
                  Wedding Stage Decoration
                </Link>
              </li>
              <li>
                <Link href="/services/birthday-decoration" className="hover:text-emerald-400 transition-colors">
                  Birthday Themes & Balloons
                </Link>
              </li>
              <li>
                <Link href="/services/engagement-decoration" className="hover:text-emerald-400 transition-colors">
                  Engagement Ceremony
                </Link>
              </li>
              <li>
                <Link href="/services/haldi-decoration" className="hover:text-emerald-400 transition-colors">
                  Haldi & Marigold Setup
                </Link>
              </li>
              <li>
                <Link href="/services/mehendi-decoration" className="hover:text-emerald-400 transition-colors">
                  Mehendi Bohemian Swings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Get In Touch
            </h4>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Shivansh House, Marul Haveli Road, Divashi BK, Satara 415209, Maharashtra, India</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a href="tel:+919766686373" className="hover:text-emerald-300 transition-colors font-semibold">
                +91 97666 86373
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a
                href="https://wa.me/919766686373"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400"
              >
                +91 97666 86373 (WhatsApp)
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a href="mailto:info@shivanshdecoration.com" className="hover:text-emerald-400 transition-colors">
                info@shivanshdecoration.com
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Mon - Sun: 9:00 AM - 9:00 PM</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Shivansh Decoration. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-emerald-400 transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
