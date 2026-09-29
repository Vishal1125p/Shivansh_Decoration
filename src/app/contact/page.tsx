import React from 'react';
import { Metadata } from 'next';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock 
} from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Contact Us | Shivansh Decoration Office, Phone & Location',
  description: 'Get in touch with Shivansh Decoration. Visit our design studio, call +91 97666 86373, or chat on WhatsApp for wedding and event decoration consultations.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Banner */}
      <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>We Are Here For You</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Contact <span className="text-emerald-gradient">Shivansh Decoration</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-lg font-normal leading-relaxed">
          Let’s discuss how to bring your dream celebration to life. Reach out via phone, WhatsApp, email, or visit our design studio.
        </p>
      </section>

      {/* Main Grid: Contact Info Cards + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Studio & Headquarters
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our master design studio is equipped with material swatches, floral catalogs, miniature stage prototypes, and fabric drape collections.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Design Studio Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Shivansh House, Marul Haveli Road, Divashi BK, Satara 415209, Maharashtra, India
                  </p>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-1">(Serving all major cities & destinations across Maharashtra)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Direct Phone Call</h4>
                  <a href="tel:+919766686373" className="text-xs text-emerald-700 hover:underline block mt-1 font-bold">
                    +91 97666 86373
                  </a>
                  <span className="text-[10px] text-slate-500">Available 9:00 AM – 9:00 PM (Daily)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Official WhatsApp</h4>
                  <a 
                    href="https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20would%20like%20to%20discuss%20an%20event%20decoration%20project." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:underline block mt-1 font-bold"
                  >
                    +91 97666 86373 (Click to Chat)
                  </a>
                  <span className="text-[10px] text-slate-500">Fastest response for catalogs & pricing</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Email Inquiries</h4>
                  <a href="mailto:info@shivanshdecoration.com" className="text-xs text-emerald-700 hover:underline block mt-1 font-semibold">
                    info@shivanshdecoration.com
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Business Hours</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Monday to Sunday: 9:00 AM – 9:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>

        </div>
      </section>

      {/* Google Maps Integration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
            <iframe
              title="Shivansh Decoration Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121966.50549216124!2d73.95368487714845!3d17.680464223164137!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3bc239be08d96bbd%3A0x5f4ada5501d90703!2sSatara%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
