import { NextResponse } from 'next/server';
import { getGallery, createGalleryImage, deleteGalleryImage } from '@/lib/store';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const items = await getGallery(category);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      category, 
      imageUrl, 
      mediaType = 'image', 
      videoUrl, 
      thumbnailUrl, 
      youtubeId, 
      duration, 
      location, 
      description, 
      aspectRatio = 'landscape',
      isFeatured = false 
    } = body;

    if (!title || !category) {
      return NextResponse.json({ success: false, error: 'Title and category are required' }, { status: 400 });
    }

    if (mediaType === 'image' && !imageUrl) {
      return NextResponse.json({ success: false, error: 'Image URL is required for photos' }, { status: 400 });
    }

    if (mediaType === 'video' && !videoUrl && !imageUrl) {
      return NextResponse.json({ success: false, error: 'Video URL or file is required for videos' }, { status: 400 });
    }

    const finalImageUrl = imageUrl || thumbnailUrl || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : '');

    const newItem = await createGalleryImage({
      title,
      category,
      mediaType,
      imageUrl: finalImageUrl,
      videoUrl: videoUrl || '',
      thumbnailUrl: thumbnailUrl || finalImageUrl,
      youtubeId: youtubeId || '',
      duration: duration || '',
      location: location || '',
      description: description || '',
      aspectRatio,
      isFeatured
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create gallery item' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Image ID required' }, { status: 400 });
    }

    const success = await deleteGalleryImage(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
