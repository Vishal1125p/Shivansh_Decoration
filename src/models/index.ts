import mongoose, { Schema } from 'mongoose';

// Service Schema
const ServiceSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  heroImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  videoUrl: { type: String },
  features: [{ type: String }],
  packagesAvailable: [{ type: String }],
  faqs: [{ question: String, answer: String }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// Event Schema
const EventSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  eventType: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  guestCount: { type: Number, default: 100 },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  heroImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  videoUrl: { type: String },
  servicesIncluded: [{ type: String }],
  packageUsed: { type: String, default: 'Custom Package' },
  clientReview: {
    author: String,
    rating: Number,
    comment: String
  },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// Package Schema
const PackageSchema = new Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  description: { type: String, required: true },
  badge: { type: String },
  highlighted: { type: Boolean, default: false },
  idealFor: { type: String, required: true },
  inclusions: [{ type: String }],
  exclusions: [{ type: String }]
}, { timestamps: true });

// Gallery Schema
const GallerySchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String },
  thumbnailUrl: { type: String },
  youtubeId: { type: String },
  duration: { type: String },
  location: { type: String },
  description: { type: String },
  aspectRatio: { type: String, default: 'landscape' },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// Enquiry Schema
const EnquirySchema = new Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventLocation: { type: String, required: true },
  guestCount: { type: Number, default: 100 },
  approxBudget: { type: String, required: true },
  decorationPreference: { type: String },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'], 
    default: 'New' 
  },
  notes: { type: String }
}, { timestamps: true });

// Testimonial Schema
const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  eventType: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 5 },
  comment: { type: String, required: true },
  date: { type: String, required: true },
  avatarUrl: { type: String },
  eventImage: { type: String }
}, { timestamps: true });

// Admin Schema
const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: 'Admin' },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

export const ServiceModel = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const EventModel = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const PackageModel = mongoose.models.Package || mongoose.model('Package', PackageSchema);
export const GalleryModel = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
export const EnquiryModel = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
export const TestimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
