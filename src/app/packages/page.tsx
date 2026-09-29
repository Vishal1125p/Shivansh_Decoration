import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { getPackages } from '@/lib/store';
import PackagesSection from '@/components/PackagesSection';

export const metadata: Metadata = {
  title: 'Decoration Packages & Pricing | Basic, Premium & Royal Luxury',
  description: 'Compare Shivansh Decoration event packages. Basic, Premium, and Royal tiers for weddings, mandaps, engagements, and parties.',
};

export const revalidate = 60;

const COMPARISON_FEATURES = [
  { name: 'Backdrop Dimensions', basic: '10 x 8 ft Standard', premium: '24 x 12 ft 3D Frame', royal: 'Grand 360° Turnkey' },
  { name: 'Floral Materials', basic: 'Marigold & Artificial', premium: 'Fresh Indian Florals', royal: 'Imported Dutch Exotic' },
  { name: 'Mandap / Stage Furniture', basic: 'Couple Chairs', premium: 'Royal Maharaja Sofa', royal: 'Palace Throne & Lounges' },
  { name: 'Entrance Decoration', basic: 'Welcome Board', premium: 'Floral Arch & Lanterns', royal: 'Palace Tunnel & Red Carpet' },
  { name: 'Venue Lighting Canopy', basic: 'Focus Spotlights (4)', premium: 'Stage Fairy Canopy', royal: 'Full Sky Fairy Lighting' },
  { name: 'Custom Neon Monogram', basic: 'Not Included', premium: 'Included', royal: 'Included + 3D Acrylics' },
  { name: 'On-site Supervisor', basic: 'Setup Lead', premium: 'Dedicated Coordinator', royal: 'Senior Creative Director' },
  { name: 'Cold Pyros / Low Fog', basic: 'Optional Add-on', premium: 'Included for Entry', royal: 'Included (Multiple Cues)' },
];

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Banner */}
      <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Decoration <span className="text-emerald-gradient">Packages & Pricing</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-lg font-normal leading-relaxed">
          Transparent, all-inclusive packages designed to provide breathtaking aesthetics for celebrations of any scale.
        </p>
      </section>

      {/* 3 Packages Cards */}
      <PackagesSection packages={packages} isFullPage={true} />

      {/* Comparison Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Feature <span className="text-emerald-gradient">Comparison Matrix</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Side-by-side breakdown to help you choose the ideal package for your venue.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-900 font-serif text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4 sm:p-5 font-bold">Feature / Inclusions</th>
                  <th className="p-4 sm:p-5 font-bold text-center">Basic Package</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-emerald-800 bg-emerald-50 border-x border-emerald-200">
                    Premium Package
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-center">Royal Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {COMPARISON_FEATURES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{item.name}</td>
                    <td className="p-4 sm:p-5 text-center text-slate-600">{item.basic}</td>
                    <td className="p-4 sm:p-5 text-center text-emerald-800 bg-emerald-50/50 border-x border-emerald-200 font-semibold">
                      {item.premium}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-slate-700 font-medium">{item.royal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-950 p-8 rounded-3xl border border-emerald-700/50 text-center max-w-3xl mx-auto shadow-xl text-white">
          <Sparkles className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
          <h4 className="font-serif text-2xl font-bold text-white">
            Need a Custom Mix & Match?
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-xl mx-auto">
            We happily tailor packages to match specific spiritual rituals, floral colorways, or multi-day wedding sequences.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Request Custom Estimate
            </Link>
            <a
              href="https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20would%20like%20to%20discuss%20a%20customized%20decoration%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold border border-emerald-400/40 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
