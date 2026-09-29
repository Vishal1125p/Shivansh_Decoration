import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Quote, 
  PackageCheck,
  Film,
  Camera
} from 'lucide-react';
import { getEventBySlug, getEvents } from '@/lib/store';
import QuoteForm from '@/components/QuoteForm';
import SafeImage from '@/components/SafeImage';
import { getCleanMediaInfo, isVideoUrl, CATEGORY_FALLBACK_IMAGES } from '@/lib/mediaHelper';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: 'Event Not Found | Shivansh Decoration' };

  return {
    title: `${event.title} | Shivansh Decoration Showcase`,
    description: `${event.shortDesc} - Executed at ${event.location} with ${event.guestCount} guests by Shivansh Decoration.`,
    openGraph: {
      title: `${event.title} | Shivansh Decoration`,
      description: event.shortDesc,
      images: [{ url: event.heroImage }],
    },
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const mediaInfo = getCleanMediaInfo(event.heroImage || event.videoUrl, event.eventType);
  const fallbackCover = CATEGORY_FALLBACK_IMAGES[event.eventType] || CATEGORY_FALLBACK_IMAGES.Default;
  const rawVideo = event.videoUrl || (isVideoUrl(event.heroImage) ? event.heroImage : null);
  const videoMedia = rawVideo ? getCleanMediaInfo(rawVideo, event.eventType) : null;

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/events" className="hover:text-emerald-700">Events</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-700 font-bold line-clamp-1">{event.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">
          <SafeImage
            src={mediaInfo.displayImageUrl}
            alt={event.title}
            fill
            priority
            fallbackSrc={fallbackCover}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Details Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  {event.eventType}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {event.location}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {event.title}
              </h1>
            </div>

            {/* Event Meta Box */}
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 flex items-center gap-6 flex-shrink-0 shadow-lg">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Date</span>
                <span className="text-sm font-extrabold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{event.date}</span>
                </span>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Gathering</span>
                <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{event.guestCount} Guests</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Case Study */}
        <div className="lg:col-span-8 space-y-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Celebration <span className="text-emerald-gradient">Overview</span>
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              {event.fullDesc || event.shortDesc}
            </p>
          </div>

          {/* Cinematic Video Walkthrough Player (if video exists) */}
          {videoMedia && videoMedia.videoUrl && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Cinematic Walkthrough & Reel
                </h3>
              </div>

              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-black flex items-center justify-center">
                {videoMedia.type === 'instagram' && videoMedia.instagramCode ? (
                  <div className="w-full max-w-md h-[550px]">
                    <iframe
                      src={`https://www.instagram.com/reel/${videoMedia.instagramCode}/embed/`}
                      className="w-full h-full border-0 rounded-2xl"
                      allowFullScreen
                      scrolling="no"
                      title={event.title}
                    />
                  </div>
                ) : videoMedia.type === 'youtube' && videoMedia.youtubeId ? (
                  <div className="w-full aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoMedia.youtubeId}?rel=0`}
                      title={event.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video">
                    <video
                      src={rawVideo!}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Included */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-600" />
              <span>Services Delivered for This Event</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.servicesIncluded.map((srv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Package Chosen: <strong className="text-emerald-700 font-bold">{event.packageUsed}</strong></span>
              <Link href="/packages" className="text-emerald-700 hover:underline font-semibold">
                Compare Packages →
              </Link>
            </div>
          </div>

          {/* Decoration Photos */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>Event Decoration Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {event.galleryImages.map((imgUrl, idx) => {
                  const itemMedia = getCleanMediaInfo(imgUrl, event.eventType);
                  return (
                    <div key={idx} className="relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-100">
                      <SafeImage
                        src={itemMedia.displayImageUrl}
                        alt={`${event.title} gallery photo ${idx + 1}`}
                        fill
                        fallbackSrc={fallbackCover}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Client Review */}
          {event.clientReview && (
            <div className="bg-white p-8 rounded-3xl border border-emerald-200 relative shadow-xl">
              <Quote className="w-8 h-8 text-emerald-600/30 mb-3" />
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(event.clientReview.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-serif text-lg sm:text-xl text-slate-800 italic leading-relaxed">
                "{event.clientReview.comment}"
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700">
                — {event.clientReview.author}
              </div>
            </div>
          )}
        </div>

        {/* Right: Quote Request */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <QuoteForm defaultService={event.eventType} defaultPackage={event.packageUsed} />
          </div>
        </div>
      </section>
    </div>
  );
}
