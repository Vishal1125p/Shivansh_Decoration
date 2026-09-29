/**
 * Universal Media Helper
 * Parses YouTube, Instagram Reels, MP4 Videos, and Image assets.
 */

export function extractYoutubeId(url?: string | null): string | null {
  if (!url) return null;
  const clean = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = clean.match(regExp);
  if (match && match[1]) return match[1];
  if (clean.length === 11 && !clean.includes('/') && !clean.includes('.')) return clean;
  return null;
}

export function extractInstagramCode(url?: string | null): { code: string; type: 'reel' | 'p' } | null {
  if (!url) return null;
  const clean = url.trim();
  const regExp = /(?:instagram\.com\/(?:reel|p|tv)\/)([a-zA-Z0-9_-]+)/i;
  const match = clean.match(regExp);
  if (match && match[1]) {
    const isPost = clean.includes('/p/');
    return { code: match[1], type: isPost ? 'p' : 'reel' };
  }
  return null;
}

export function isVideoUrl(url?: string | null): boolean {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) return true;
  if (clean.includes('instagram.com/reel') || clean.includes('instagram.com/p') || clean.includes('instagram.com/tv')) return true;
  if (clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov') || clean.includes('/uploads/video-')) return true;
  return false;
}

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  Birthday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
  Wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  Mandap: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
  Engagement: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
  Haldi: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
  Mehendi: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  'Baby Shower': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
  Corporate: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  Default: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
};

export function getCleanMediaInfo(mediaUrl?: string | null, category: string = 'Default') {
  if (!mediaUrl) {
    return {
      type: 'image' as const,
      displayImageUrl: CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.Default,
      videoUrl: null,
      youtubeId: null,
      instagramCode: null
    };
  }

  const clean = mediaUrl.trim();
  const ytId = extractYoutubeId(clean);
  const igData = extractInstagramCode(clean);

  if (ytId) {
    return {
      type: 'youtube' as const,
      displayImageUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      videoUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1`,
      youtubeId: ytId,
      instagramCode: null
    };
  }

  if (igData) {
    return {
      type: 'instagram' as const,
      displayImageUrl: CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.Default,
      videoUrl: `https://www.instagram.com/${igData.type}/${igData.code}/embed/`,
      youtubeId: null,
      instagramCode: igData.code
    };
  }

  if (clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.includes('/uploads/video-')) {
    return {
      type: 'video_file' as const,
      displayImageUrl: CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.Default,
      videoUrl: clean,
      youtubeId: null,
      instagramCode: null
    };
  }

  // Regular image URL
  return {
    type: 'image' as const,
    displayImageUrl: clean,
    videoUrl: null,
    youtubeId: null,
    instagramCode: null
  };
}
