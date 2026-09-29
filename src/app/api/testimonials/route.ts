import { NextResponse } from 'next/server';
import { getTestimonials, createTestimonial, deleteTestimonial } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, eventType, location, rating, comment, date, avatarUrl } = body;

    if (!name || !eventType || !comment) {
      return NextResponse.json({ success: false, error: 'Missing required testimonial fields' }, { status: 400 });
    }

    const newTestimonial = await createTestimonial({
      name,
      eventType,
      location: location || 'India',
      rating: Number(rating) || 5,
      comment,
      date: date || 'Recent Event',
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Testimonial ID required' }, { status: 400 });
    }

    const success = await deleteTestimonial(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
