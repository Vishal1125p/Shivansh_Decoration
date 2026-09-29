import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ success: true, services });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, category, shortDesc, fullDesc, startingPrice, heroImage, features, packagesAvailable, faqs, isFeatured } = body;

    if (!title || !slug || !category || !shortDesc || !heroImage) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newService = await createService({
      title,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      category,
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      startingPrice: Number(startingPrice) || 25000,
      heroImage,
      galleryImages: body.galleryImages || [heroImage],
      features: features || [],
      packagesAvailable: packagesAvailable || ['Basic Package', 'Premium Package', 'Royal Package'],
      faqs: faqs || [],
      isFeatured: !!isFeatured
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 500 });
  }
}
