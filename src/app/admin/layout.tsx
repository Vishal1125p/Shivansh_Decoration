import React from 'react';
import { getAdminSession } from '@/lib/auth';
import AdminNav from './AdminNav';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Dashboard | Shivansh Decoration',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getAdminSession();

  return (
    <div className="min-h-screen bg-[#09080C] text-zinc-100 flex flex-col md:flex-row">
      <AdminNav session={session} />
      <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
