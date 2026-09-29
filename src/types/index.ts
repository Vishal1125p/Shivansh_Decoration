export type EventCategory = 
  | 'Wedding'
  | 'Mandap'
  | 'Birthday'
  | 'Engagement'
  | 'Haldi'
  | 'Mehendi'
  | 'Baby Shower'
  | 'Anniversary'
  | 'Naming Ceremony'
  | 'Corporate'
  | 'Festival Events';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  features: string[];
  packagesAvailable: string[];
  faqs: { question: string; answer: string }[];
  isFeatured?: boolean;
}

export interface ShowcaseEvent {
  id: string;
  slug: string;
  title: string;
  eventType: EventCategory;
  location: string;
  date: string;
  guestCount: number;
  shortDesc: string;
  fullDesc: string;
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  servicesIncluded: string[];
  packageUsed: string;
  clientReview?: {
    author: string;
    rating: number;
    comment: string;
  };
  isFeatured?: boolean;
}

export interface DecorationPackage {
  id: string;
  name: 'Basic Package' | 'Premium Package' | 'Royal Package' | string;
  tagline: string;
  startingPrice: number;
  description: string;
  badge?: string;
  highlighted?: boolean;
  idealFor: string;
  inclusions: string[];
  exclusions?: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  category: EventCategory | 'All';
  mediaType?: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  youtubeId?: string;
  duration?: string;
  location?: string;
  description?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  isFeatured?: boolean;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface CustomerEnquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: number;
  approxBudget: string;
  decorationPreference?: string;
  message?: string;
  status: EnquiryStatus;
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  eventImage?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
}
