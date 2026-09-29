import { NextResponse } from 'next/server';
import { getEvents, createEvent } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, eventType, location, date, guestCount, shortDesc, fullDesc, heroImage, servicesIncluded, packageUsed, clientReview, isFeatured } = body;

    if (!title || !slug || !eventType || !location || !heroImage) {
      return NextResponse.json({ success: false, error: 'Missing required event fields' }, { status: 400 });
    }

    const newEvent = await createEvent({
      title,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      eventType,
      location,
      date: date || 'Recent Event',
      guestCount: Number(guestCount) || 100,
      shortDesc: shortDesc || 'Luxury Event Decoration',
      fullDesc: fullDesc || shortDesc,
      heroImage,
      galleryImages: body.galleryImages || [heroImage],
      servicesIncluded: servicesIncluded || ['Stage Decoration', 'Lighting'],
      packageUsed: packageUsed || 'Custom Package',
      clientReview: clientReview || undefined,
      isFeatured: !!isFeatured
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
  }
}
