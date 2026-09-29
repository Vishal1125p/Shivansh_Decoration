import React from 'react';
import { getPackages } from '@/lib/store';
import PackagesAdminClient from './PackagesAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminPackagesPage() {
  const packages = await getPackages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          Manage <span className="text-gold-gradient">Decoration Packages</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Update starting rates, inclusions, feature lists, and badges for Basic, Premium, and Royal tiers.
        </p>
      </div>

      <PackagesAdminClient initialPackages={packages} />
    </div>
  );
}
