'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  LayoutDashboard, 
  Inbox, 
  Layers, 
  Calendar, 
  Package, 
  Image as ImageIcon, 
  MessageSquareQuote, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';

interface Props {
  session: { email: string; name: string; role: string } | null;
}

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Customer Enquiries', href: '/admin/enquiries', icon: Inbox },
  { name: 'Manage Services', href: '/admin/services', icon: Layers },
  { name: 'Manage Events', href: '/admin/events', icon: Calendar },
  { name: 'Manage Packages', href: '/admin/packages', icon: Package },
  { name: 'Media (Photos & Videos)', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Manage Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
];

export default function AdminNav({ session }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return null;

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between p-4 sm:p-6 flex-shrink-0">
      <div>
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-[1.5px] shadow-green-glow flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-white block">
              Shivansh Admin
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
              Management Portal
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="space-y-1.5">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Actions */}
      <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
        <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="truncate">
            <span className="text-white font-semibold block truncate">
              {session?.name || 'Administrator'}
            </span>
            <span className="text-[10px] text-emerald-400 block truncate">
              {session?.email || 'admin@shivanshdecoration.com'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/"
            target="_blank"
            className="btn-outline-green py-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 text-center bg-slate-900 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600 hover:text-white"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 py-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
