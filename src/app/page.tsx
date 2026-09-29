import React from 'react';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import GalleryPreview from '@/components/GalleryPreview';
import WhyChooseUs from '@/components/WhyChooseUs';
import PackagesSection from '@/components/PackagesSection';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import QuickCTABanner from '@/components/QuickCTABanner';
import { getServices, getEvents, getPackages, getGallery, getTestimonials } from '@/lib/store';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [services, events, packages, gallery, testimonials] = await Promise.all([
    getServices(),
    getEvents(),
    getPackages(),
    getGallery(),
    getTestimonials()
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Showcase */}
      <ServicesSection services={services} />

      {/* 3. Real Featured Events Showcase (New Events Appear Here Instantly) */}
      <FeaturedEvents events={events} />

      {/* 4. Real Work Gallery Showcase with Lightbox */}
      <GalleryPreview images={gallery} />

      {/* 5. Why Choose Shivansh */}
      <WhyChooseUs />

      {/* 6. Curated Packages */}
      <PackagesSection packages={packages} />

      {/* 7. Client Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* 8. Quick WhatsApp & Quote CTA Banner */}
      <QuickCTABanner />

      {/* 9. Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
}
