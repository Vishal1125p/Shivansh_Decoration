import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CallButton from '@/components/CallButton';
import Chatbot from '@/components/Chatbot';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shivanshdecoration.com'),
  title: {
    default: 'Shivansh Decoration | Luxury Wedding & Event Decorators',
    template: '%s | Shivansh Decoration'
  },
  description: 'Shivansh Decoration – “We Make Your Moments Beautiful”. Specializing in luxury Indian wedding mandaps, reception stages, Haldi, Mehendi, birthday party themes, and turnkey venue transformations.',
  keywords: [
    'Shivansh Decoration',
    'Wedding decoration',
    'Mandap decoration',
    'Marriage decoration',
    'Birthday decoration',
    'Engagement decoration',
    'Haldi decoration',
    'Mehendi decoration',
    'Event decoration',
    'Wedding stage decoration',
    'Event decorators near me',
    'Mandap decorators near me',
    'Luxury Indian wedding decorators',
    'Flower decoration services'
  ],
  authors: [{ name: 'Shivansh Decoration Team' }],
  creator: 'Shivansh Decoration',
  publisher: 'Shivansh Decoration',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shivanshdecoration.com',
    title: 'Shivansh Decoration | We Make Your Moments Beautiful',
    description: 'Transforming weddings and events with bespoke mandaps, royal stages, and fresh floral setups.',
    siteName: 'Shivansh Decoration',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Shivansh Decoration Luxury Wedding Setup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivansh Decoration | Luxury Wedding & Event Decorators',
    description: 'We Make Your Moments Beautiful. Premium Indian wedding mandap, stage & event decoration.',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Shivansh Decoration',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    '@id': 'https://shivanshdecoration.com',
    url: 'https://shivanshdecoration.com',
    telephone: '+91 98765 43210',
    priceRange: '₹₹ - ₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shivansh House, Palace Road',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.9124,
      longitude: 75.7873,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
    sameAs: [
      'https://www.instagram.com',
      'https://www.facebook.com',
      'https://www.youtube.com',
    ],
    description: 'Shivansh Decoration provides premium wedding mandap, reception stage, floral decoration, birthday party, and event management services across India.',
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CallButton />
        <Chatbot />
      </body>
    </html>
  );
}
