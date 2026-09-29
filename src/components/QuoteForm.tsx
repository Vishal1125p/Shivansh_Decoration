'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  MessageSquare, 
  Phone, 
  Mail, 
  User 
} from 'lucide-react';

interface QuoteFormProps {
  defaultService?: string;
  defaultPackage?: string;
}

const EVENT_TYPES = [
  'Wedding / Marriage',
  'Mandap Decoration',
  'Birthday Celebration',
  'Engagement / Ring Ceremony',
  'Haldi Ceremony',
  'Mehendi Ceremony',
  'Baby Shower / Godh Bharai',
  'Anniversary Party',
  'Naming Ceremony',
  'Corporate Gala / Event',
  'Festival & Cultural Event',
  'Turnkey Venue Transformation'
];

const BUDGET_RANGES = [
  '₹25,000 - ₹50,000 (Basic Intimate)',
  '₹50,000 - ₹1,00,000 (Standard Setup)',
  '₹1,00,000 - ₹2,50,000 (Premium Floral)',
  '₹2,50,000 - ₹5,00,000 (Royal Luxury)',
  '₹5,00,000+ (Grand Turnkey Palace)',
  'Flexible / Need Advice'
];

export default function QuoteForm({ defaultService, defaultPackage }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    eventType: defaultService || (defaultPackage ? `${defaultPackage}` : 'Wedding / Marriage'),
    eventDate: '',
    eventLocation: '',
    guestCount: 150,
    approxBudget: defaultPackage ? `Aligned with ${defaultPackage}` : '₹50,000 - ₹1,00,000 (Standard Setup)',
    decorationPreference: defaultPackage ? `Selected Package: ${defaultPackage}` : '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Basic client validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      setLoading(false);
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (!formData.eventDate) {
      setErrorMsg('Please select your event date.');
      setLoading(false);
      return;
    }
    if (!formData.eventLocation.trim()) {
      setErrorMsg('Please enter the venue or event location.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // Ignore if canvas confetti isn't active
        }
      } else {
        setErrorMsg(data.error || 'Unable to submit enquiry. Please try again or WhatsApp us.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto relative">
      {/* Top Emerald Badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Quick & Transparent Estimation</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Request Your <span className="text-emerald-gradient">Free Custom Quote</span>
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Tell us about your celebration and receive a tailored quotation with design concepts within 2 hours.
        </p>
      </div>

      {submitted ? (
        <div className="py-12 px-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Thank you!
          </h4>
          <p className="text-lg text-emerald-700 font-bold">
            Shivansh Decoration will contact you shortly.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-3 leading-relaxed">
            Our creative lead has received your event details and is preparing an initial theme outline and quotation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20just%20submitted%20a%20quote%20request%20for%20my%20${encodeURIComponent(formData.eventType)}%20on%20${encodeURIComponent(formData.eventDate)}.%20Please%20connect%20with%20me.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-green-glow transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect Immediately on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  mobile: '',
                  email: '',
                  eventType: 'Wedding / Marriage',
                  eventDate: '',
                  eventLocation: '',
                  guestCount: 150,
                  approxBudget: '₹50,000 - ₹1,00,000 (Standard Setup)',
                  decorationPreference: '',
                  message: ''
                });
              }}
              className="btn-outline-green px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Row 1: Name, Mobile, Email */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mobile Number <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 97666 86373"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Row 2: Event Type, Date, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Event Type <span className="text-emerald-600">*</span>
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-white text-slate-900">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Event Date <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Event Location / Venue <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  placeholder="e.g. Satara Resort, Pune"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Row 3: Guest Count, Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Estimated Number of Guests
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  min={20}
                  max={5000}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Approximate Budget Range
              </label>
              <select
                name="approxBudget"
                value={formData.approxBudget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
              >
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range} className="bg-white text-slate-900">
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Decoration Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Decoration Style & Theme Preference
            </label>
            <input
              type="text"
              name="decorationPreference"
              value={formData.decorationPreference}
              onChange={handleChange}
              placeholder="e.g. Royal Red & Gold Mandap, Pastel Floral Stage, Bohemian Haldi..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          {/* Row 5: Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Special Requests or Message
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Share any special timing, stage dimensions, floral varieties, or custom requirements..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors resize-none"
            />
          </div>

          {/* Submit Button: Green Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-green w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-green-glow disabled:opacity-50"
            >
              {loading ? (
                <span>Sending Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Free Quote</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500 font-medium">
            🔒 Your contact information is kept strictly confidential. We reply within 2 hours.
          </div>
        </form>
      )}
    </div>
  );
}
