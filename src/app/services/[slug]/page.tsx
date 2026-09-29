import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Sparkles, 
  CheckCircle2, 
  IndianRupee, 
  MessageSquare, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight 
} from 'lucide-react';
import { getServiceBySlug, getServices } from '@/lib/store';
import QuoteForm from '@/components/QuoteForm';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found | Shivansh Decoration' };

  return {
    title: `${service.title} | Shivansh Decoration`,
    description: `${service.shortDesc} - Starting from ₹${service.startingPrice.toLocaleString('en-IN')}. Book luxury wedding and event decorators with Shivansh Decoration.`,
    openGraph: {
      title: `${service.title} | Shivansh Decoration`,
      description: service.shortDesc,
      images: [{ url: service.heroImage }],
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Shivansh Decoration',
      url: 'https://shivanshdecoration.com',
      telephone: '+91 97666 86373',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    description: service.shortDesc,
    offers: {
      '@type': 'Offer',
      price: service.startingPrice,
      priceCurrency: 'INR',
    },
  };

  return (
    <div className="pt-28 pb-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services" className="hover:text-emerald-700">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-700 font-bold">{service.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[450px] flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                {service.category} Decoration
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {service.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-200 line-clamp-2">
                {service.shortDesc}
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 text-right flex-shrink-0 shadow-lg">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">Starting From</span>
              <div className="flex items-center justify-end text-2xl sm:text-3xl font-extrabold text-emerald-700">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                <span>{service.startingPrice.toLocaleString('en-IN')}</span>
              </div>
              <a
                href="#enquiry-section"
                className="btn-green mt-2.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Full Description & Features */}
        <div className="lg:col-span-8 space-y-12">
          {/* Detailed Overview */}
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Overview & Concept
            </h2>
            <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Craft Features */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>What Makes Our {service.title} Exceptional</span>
            </h3>

            <div className="space-y-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery for this Service */}
          {service.galleryImages && service.galleryImages.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">
                Recent {service.title} Setups
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.galleryImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                    <Image
                      src={imgUrl}
                      alt={`${service.title} photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Package Availability */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">
              Available in Decoration Packages:
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.packagesAvailable.map((pkg, idx) => (
                <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs text-emerald-800 font-semibold shadow-sm">
                  ✨ {pkg}
                </span>
              ))}
            </div>
          </div>

          {/* Service FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-serif text-base font-bold text-slate-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quick Consultation Booking */}
        <div className="lg:col-span-4" id="enquiry-section">
          <div className="sticky top-24 space-y-6">
            <QuoteForm defaultService={service.title} />

            {/* Direct Quick WhatsApp Card */}
            <div className="bg-white p-5 rounded-2xl border border-emerald-200 text-center shadow-md">
              <h4 className="font-serif font-bold text-slate-900 text-base">
                Have Instant Questions?
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Chat directly with our lead decorator on WhatsApp.
              </p>
              <a
                href={`https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.%20Please%20guide%20me.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green mt-3 w-full py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-green-glow font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
