import fs from 'fs';
import path from 'path';
import { connectToDatabase } from './db';
import { 
  ServiceModel, 
  EventModel, 
  PackageModel, 
  GalleryModel, 
  EnquiryModel, 
  TestimonialModel
} from '@/models';
import { 
  INITIAL_SERVICES, 
  INITIAL_EVENTS, 
  INITIAL_PACKAGES, 
  INITIAL_GALLERY, 
  INITIAL_ENQUIRIES, 
  INITIAL_TESTIMONIALS 
} from './seedData';
import { 
  ServiceItem, 
  ShowcaseEvent, 
  DecorationPackage, 
  GalleryImage, 
  CustomerEnquiry, 
  Testimonial,
  EnquiryStatus 
} from '@/types';

// Persistent Local File DB directory
const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Ignore error in read-only environments
  }
}

function loadFromFile<T>(filename: string, fallback: T): T {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } else {
      saveToFile(filename, fallback);
      return fallback;
    }
  } catch (err) {
    console.error(`Error reading ${filename}, using fallback:`, err);
    return fallback;
  }
}

function saveToFile<T>(filename: string, data: T) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${filename}:`, err);
  }
}

// Memory / File-backed Cache
let memoryServices: ServiceItem[] = loadFromFile('services.json', [...INITIAL_SERVICES]);
let memoryEvents: ShowcaseEvent[] = loadFromFile('events.json', [...INITIAL_EVENTS]);
let memoryPackages: DecorationPackage[] = loadFromFile('packages.json', [...INITIAL_PACKAGES]);
let memoryGallery: GalleryImage[] = loadFromFile('gallery.json', [...INITIAL_GALLERY]);
let memoryEnquiries: CustomerEnquiry[] = loadFromFile('enquiries.json', [...INITIAL_ENQUIRIES]);
let memoryTestimonials: Testimonial[] = loadFromFile('testimonials.json', [...INITIAL_TESTIMONIALS]);

// === SERVICES ===
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbServices = await ServiceModel.find().lean();
      if (dbServices && dbServices.length > 0) {
        return dbServices.map((s: any) => ({
          ...s,
          id: s._id.toString(),
        })) as ServiceItem[];
      }
    }
  } catch (err) {
    console.error('Error fetching services from DB, using fallback:', err);
  }
  return memoryServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function createService(serviceData: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const newService: ServiceItem = {
    ...serviceData,
    id: `srv-${Date.now()}`
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const doc = await ServiceModel.create(serviceData);
      newService.id = doc._id.toString();
    }
  } catch (err) {
    console.error('DB error creating service:', err);
  }

  memoryServices.unshift(newService);
  saveToFile('services.json', memoryServices);
  return newService;
}

export async function updateService(id: string, updateData: Partial<ServiceItem>): Promise<ServiceItem | null> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      const updated = await ServiceModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) {
        return { ...(updated as any), id: (updated as any)._id.toString() };
      }
    }
  } catch (err) {
    console.error('DB error updating service:', err);
  }

  const idx = memoryServices.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memoryServices[idx] = { ...memoryServices[idx], ...updateData };
    saveToFile('services.json', memoryServices);
    return memoryServices[idx];
  }
  return null;
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      await ServiceModel.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('DB error deleting service:', err);
  }

  const initialLen = memoryServices.length;
  memoryServices = memoryServices.filter((s) => s.id !== id);
  saveToFile('services.json', memoryServices);
  return memoryServices.length < initialLen;
}

// === EVENTS ===
export async function getEvents(): Promise<ShowcaseEvent[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbEvents = await EventModel.find().lean();
      if (dbEvents && dbEvents.length > 0) {
        return dbEvents.map((e: any) => ({
          ...e,
          id: e._id.toString(),
        })) as ShowcaseEvent[];
      }
    }
  } catch (err) {
    console.error('Error fetching events from DB:', err);
  }
  return memoryEvents;
}

export async function getEventBySlug(slug: string): Promise<ShowcaseEvent | null> {
  const events = await getEvents();
  return events.find((e) => e.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function createEvent(eventData: Omit<ShowcaseEvent, 'id'>): Promise<ShowcaseEvent> {
  const newEvent: ShowcaseEvent = {
    ...eventData,
    id: `evt-${Date.now()}`
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const doc = await EventModel.create(eventData);
      newEvent.id = doc._id.toString();
    }
  } catch (err) {
    console.error('DB error creating event:', err);
  }

  memoryEvents.unshift(newEvent);
  saveToFile('events.json', memoryEvents);
  return newEvent;
}

export async function updateEvent(id: string, updateData: Partial<ShowcaseEvent>): Promise<ShowcaseEvent | null> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      const updated = await EventModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) {
        return { ...(updated as any), id: (updated as any)._id.toString() };
      }
    }
  } catch (err) {
    console.error('DB error updating event:', err);
  }

  const idx = memoryEvents.findIndex((e) => e.id === id);
  if (idx !== -1) {
    memoryEvents[idx] = { ...memoryEvents[idx], ...updateData };
    saveToFile('events.json', memoryEvents);
    return memoryEvents[idx];
  }
  return null;
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      await EventModel.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('DB error deleting event:', err);
  }

  const initialLen = memoryEvents.length;
  memoryEvents = memoryEvents.filter((e) => e.id !== id);
  saveToFile('events.json', memoryEvents);
  return memoryEvents.length < initialLen;
}

// === PACKAGES ===
export async function getPackages(): Promise<DecorationPackage[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbPackages = await PackageModel.find().lean();
      if (dbPackages && dbPackages.length > 0) {
        return dbPackages.map((p: any) => ({
          ...p,
          id: p._id.toString(),
        })) as DecorationPackage[];
      }
    }
  } catch (err) {
    console.error('Error fetching packages from DB:', err);
  }
  return memoryPackages;
}

export async function createPackage(packageData: Omit<DecorationPackage, 'id'>): Promise<DecorationPackage> {
  const newPackage: DecorationPackage = {
    ...packageData,
    id: `pkg-${Date.now()}`
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const doc = await PackageModel.create(packageData);
      newPackage.id = doc._id.toString();
    }
  } catch (err) {
    console.error('DB error creating package:', err);
  }

  memoryPackages.unshift(newPackage);
  saveToFile('packages.json', memoryPackages);
  return newPackage;
}

export async function updatePackage(id: string, updateData: Partial<DecorationPackage>): Promise<DecorationPackage | null> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      const updated = await PackageModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) {
        return { ...(updated as any), id: (updated as any)._id.toString() };
      }
    }
  } catch (err) {
    console.error('DB error updating package:', err);
  }

  const idx = memoryPackages.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryPackages[idx] = { ...memoryPackages[idx], ...updateData };
    saveToFile('packages.json', memoryPackages);
    return memoryPackages[idx];
  }
  return null;
}

export async function deletePackage(id: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      await PackageModel.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('DB error deleting package:', err);
  }

  const initialLen = memoryPackages.length;
  memoryPackages = memoryPackages.filter((p) => p.id !== id);
  saveToFile('packages.json', memoryPackages);
  return memoryPackages.length < initialLen;
}

// === GALLERY ===
export async function getGallery(category?: string): Promise<GalleryImage[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const query = category ? { category } : {};
      const dbGallery = await GalleryModel.find(query).lean();
      if (dbGallery && dbGallery.length > 0) {
        return dbGallery.map((g: any) => ({
          ...g,
          id: g._id.toString(),
        })) as GalleryImage[];
      }
    }
  } catch (err) {
    console.error('Error fetching gallery from DB:', err);
  }
  if (category) {
    return memoryGallery.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }
  return memoryGallery;
}

export async function createGalleryImage(galleryData: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
  const newImage: GalleryImage = {
    ...galleryData,
    id: `gal-${Date.now()}`
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const doc = await GalleryModel.create(galleryData);
      newImage.id = doc._id.toString();
    }
  } catch (err) {
    console.error('DB error creating gallery item:', err);
  }

  memoryGallery.unshift(newImage);
  saveToFile('gallery.json', memoryGallery);
  return newImage;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      await GalleryModel.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('DB error deleting gallery item:', err);
  }

  const initialLen = memoryGallery.length;
  memoryGallery = memoryGallery.filter((g) => g.id !== id);
  saveToFile('gallery.json', memoryGallery);
  return memoryGallery.length < initialLen;
}

// === ENQUIRIES ===
export async function getEnquiries(): Promise<CustomerEnquiry[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbEnquiries = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
      if (dbEnquiries && dbEnquiries.length > 0) {
        return dbEnquiries.map((e: any) => ({
          ...e,
          id: e._id.toString(),
          createdAt: e.createdAt instanceof Date ? e.createdAt.toISOString() : e.createdAt,
        })) as CustomerEnquiry[];
      }
    }
  } catch (err) {
    console.error('Error fetching enquiries from DB:', err);
  }
  return memoryEnquiries;
}

export async function createEnquiry(enquiryData: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): Promise<CustomerEnquiry> {
  const newEnquiry: CustomerEnquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const doc = await EnquiryModel.create({
        ...enquiryData,
        status: 'New',
        createdAt: new Date()
      });
      newEnquiry.id = doc._id.toString();
    }
  } catch (err) {
    console.error('DB error creating enquiry:', err);
  }

  memoryEnquiries.unshift(newEnquiry);
  saveToFile('enquiries.json', memoryEnquiries);
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status?: EnquiryStatus, notes?: string): Promise<CustomerEnquiry | null> {
  const updateFields: any = {};
  if (status) updateFields.status = status;
  if (notes !== undefined) updateFields.notes = notes;

  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      const updated = await EnquiryModel.findByIdAndUpdate(id, updateFields, { new: true }).lean();
      if (updated) {
        return {
          ...(updated as any),
          id: (updated as any)._id.toString(),
          createdAt: (updated as any).createdAt instanceof Date ? (updated as any).createdAt.toISOString() : (updated as any).createdAt,
        };
      }
    }
  } catch (err) {
    console.error('DB error updating enquiry status:', err);
  }

  const idx = memoryEnquiries.findIndex((e) => e.id === id);
  if (idx !== -1) {
    if (status) memoryEnquiries[idx].status = status;
    if (notes !== undefined) (memoryEnquiries[idx] as any).notes = notes;
    saveToFile('enquiries.json', memoryEnquiries);
    return memoryEnquiries[idx];
  }
  return null;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      await EnquiryModel.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('DB error deleting enquiry:', err);
  }

  const initialLen = memoryEnquiries.length;
  memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);
  saveToFile('enquiries.json', memoryEnquiries);
  return memoryEnquiries.length < initialLen;
}

// === TESTIMONIALS ===
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbTestimonials = await TestimonialModel.find().lean();
      if (dbTestimonials && dbTestimonials.length > 0) {
        return dbTestimonials.map((t: any) => ({
          ...t,
          id: t._id.toString(),
        })) as Testimonial[];
      }
    }
  } catch (err) {
    console.error('Error fetching testimonials from DB:', err);
  }
  return memoryTestimonials;
}

export async function createTestimonial(testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const newTestimonial: Testimonial = {
    ...testimonialData,
    id: `test-${Date.now()}`
  };

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const doc = await TestimonialModel.create(testimonialData);
      newTestimonial.id = doc._id.toString();
    }
  } catch (err) {
    console.error('DB error creating testimonial:', err);
  }

  memoryTestimonials.unshift(newTestimonial);
  saveToFile('testimonials.json', memoryTestimonials);
  return newTestimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn && id.length === 24) {
      await TestimonialModel.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('DB error deleting testimonial:', err);
  }

  const initialLen = memoryTestimonials.length;
  memoryTestimonials = memoryTestimonials.filter((t) => t.id !== id);
  saveToFile('testimonials.json', memoryTestimonials);
  return memoryTestimonials.length < initialLen;
}

// === ADMIN STATS ===
export async function getAdminStats() {
  const [enquiries, services, events, gallery] = await Promise.all([
    getEnquiries(),
    getServices(),
    getEvents(),
    getGallery(),
  ]);

  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const confirmedEnquiries = enquiries.filter(e => e.status === 'Confirmed').length;

  return {
    totalEnquiries: enquiries.length,
    newEnquiries,
    confirmedEnquiries,
    totalServices: services.length,
    totalEvents: events.length,
    totalGallery: gallery.length,
  };
}
