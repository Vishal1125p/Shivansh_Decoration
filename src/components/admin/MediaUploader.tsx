'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Link as LinkIcon, 
  Video, 
  Check, 
  Sparkles, 
  Play, 
  AlertCircle, 
  Loader2,
  Film,
  Camera
} from 'lucide-react';
import SafeImage from '@/components/SafeImage';

export interface MediaUploadResult {
  url: string;
  mediaType: 'image' | 'video';
  thumbnailUrl?: string;
  youtubeId?: string;
  duration?: string;
}

interface MediaUploaderProps {
  initialUrl?: string;
  initialType?: 'image' | 'video';
  allowedTypes?: 'all' | 'image' | 'video';
  onMediaSelect: (result: MediaUploadResult) => void;
  label?: string;
}

const PRESET_ASSETS = [
  {
    type: 'image',
    title: 'Royal Mandap Flowers',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    category: 'Mandap'
  },
  {
    type: 'image',
    title: 'Palace Stage Gold Arc',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    category: 'Wedding'
  },
  {
    type: 'image',
    title: 'Sunflower Haldi Setup',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    category: 'Haldi'
  },
  {
    type: 'image',
    title: 'Pastel Engagement Ring',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    category: 'Engagement'
  },
  {
    type: 'video',
    title: 'Palace Wedding Cinematic (YouTube)',
    url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
    youtubeId: 'ScMzIvxBSi4',
    duration: '02:45'
  },
  {
    type: 'video',
    title: 'Glass Mandap Walkthrough (YouTube)',
    url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    youtubeId: 'kJQP7kiw5Fk',
    duration: '01:30'
  }
];

export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function MediaUploader({
  initialUrl = '',
  initialType = 'image',
  allowedTypes = 'all',
  onMediaSelect,
  label = 'Media Asset'
}: MediaUploaderProps) {
  const [tab, setTab] = useState<'upload' | 'url' | 'presets'>('url');
  const [mediaType, setMediaType] = useState<'image' | 'video'>(initialType);
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [customThumbnail, setCustomThumbnail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<MediaUploadResult | null>(
    initialUrl ? {
      url: initialUrl,
      mediaType: initialType,
      youtubeId: extractYoutubeId(initialUrl) || undefined,
      thumbnailUrl: extractYoutubeId(initialUrl) ? `https://img.youtube.com/vi/${extractYoutubeId(initialUrl)}/hqdefault.jpg` : initialUrl
    } : null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initialUrl if parent changes it
  useEffect(() => {
    if (initialUrl && initialUrl !== urlInput) {
      setUrlInput(initialUrl);
      const ytId = extractYoutubeId(initialUrl);
      setPreviewData({
        url: initialUrl,
        mediaType: initialType,
        youtubeId: ytId || undefined,
        thumbnailUrl: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : initialUrl
      });
    }
  }, [initialUrl, initialType]);

  const syncMediaUrl = (inputVal: string, typeVal = mediaType) => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const ytId = extractYoutubeId(trimmed);
    const isYt = !!ytId;
    const isDirectVideo = /\.(mp4|webm|mov|m4v)$/i.test(trimmed) || trimmed.includes('vimeo.com') || isYt;
    const determinedType: 'image' | 'video' = isDirectVideo || typeVal === 'video' ? 'video' : 'image';

    const result: MediaUploadResult = {
      url: trimmed,
      mediaType: determinedType,
      youtubeId: ytId || undefined,
      thumbnailUrl: customThumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : trimmed)
    };

    setMediaType(determinedType);
    setPreviewData(result);
    onMediaSelect(result);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    syncMediaUrl(val);
  };

  const handleApplyUrl = () => {
    syncMediaUrl(urlInput);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', mediaType);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setUrlInput(data.url);
        const result: MediaUploadResult = {
          url: data.url,
          mediaType: data.type || mediaType,
          thumbnailUrl: data.url
        };
        setPreviewData(result);
        onMediaSelect(result);
      } else {
        setUploadError(data.error || 'Failed to upload media. Please try entering a direct image/video URL.');
      }
    } catch (err) {
      setUploadError('Network error uploading file. You can paste a public URL instead.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_ASSETS[0]) => {
    const result: MediaUploadResult = {
      url: preset.url,
      mediaType: preset.type as 'image' | 'video',
      thumbnailUrl: (preset as any).thumbnail || preset.url,
      youtubeId: (preset as any).youtubeId
    };
    setUrlInput(preset.url);
    setMediaType(result.mediaType);
    setPreviewData(result);
    onMediaSelect(result);
  };

  return (
    <div className="space-y-4 rounded-2xl bg-slate-900 border border-slate-800 p-4">
      {/* Header & Type selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <label className="text-slate-200 font-semibold text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{label}</span>
        </label>

        {allowedTypes === 'all' && (
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMediaType('image');
                if (urlInput) syncMediaUrl(urlInput, 'image');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mediaType === 'image'
                  ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMediaType('video');
                if (urlInput) syncMediaUrl(urlInput, 'video');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mediaType === 'video'
                  ? 'bg-emerald-600 text-white font-bold shadow-green-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Video / Reel</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            tab === 'url'
              ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Image / Video Link (URL)</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            tab === 'upload'
              ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('presets')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            tab === 'presets'
              ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Presets</span>
        </button>
      </div>

      {/* Tab 1: URL Input */}
      {tab === 'url' && (
        <div className="space-y-3">
          <div>
            <label className="block text-slate-400 text-[11px] mb-1">
              {mediaType === 'video' ? 'Paste Video Link (YouTube, Vimeo, MP4 URL, or Reel)' : 'Paste Image Link (Unsplash, Google Photos, Cloudinary, Imgur, any web URL)'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={handleUrlChange}
                onBlur={() => syncMediaUrl(urlInput)}
                placeholder={mediaType === 'video' ? 'https://www.youtube.com/watch?v=...' : 'https://images.unsplash.com/... or https://...'}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="btn-green px-4 py-2 rounded-xl text-xs font-bold"
              >
                Apply
              </button>
            </div>
          </div>

          {mediaType === 'video' && (
            <div>
              <label className="block text-slate-400 text-[11px] mb-1">
                Custom Thumbnail Cover (Optional)
              </label>
              <input
                type="text"
                value={customThumbnail}
                onChange={(e) => {
                  setCustomThumbnail(e.target.value);
                  if (previewData) {
                    const res = { ...previewData, thumbnailUrl: e.target.value };
                    setPreviewData(res);
                    onMediaSelect(res);
                  }
                }}
                placeholder="https://... image URL for video poster"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Upload File */}
      {tab === 'upload' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept={mediaType === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/*'}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/60 hover:bg-slate-900/60 rounded-2xl p-6 text-center cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400 group-hover:scale-110 transition-transform">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              ) : mediaType === 'video' ? (
                <Video className="w-6 h-6" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <p className="text-xs font-semibold text-slate-200">
              {isUploading
                ? 'Uploading file to server...'
                : mediaType === 'video'
                ? 'Click to browse MP4 / WebM video file'
                : 'Click or drag & drop image (PNG, JPG, WEBP)'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {mediaType === 'video' ? 'Video clips & reels up to 50MB' : 'High resolution photography supported'}
            </p>
          </div>

          {uploadError && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-500/30">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Presets */}
      {tab === 'presets' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
          {PRESET_ASSETS.filter(p => allowedTypes === 'all' || p.type === allowedTypes).map((preset, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className="group relative rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/80 cursor-pointer h-24 transition-all"
            >
              <SafeImage
                src={(preset as any).thumbnail || preset.url}
                alt={preset.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-2 flex flex-col justify-between">
                <span className="self-start px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-emerald-300 border border-emerald-500/30 uppercase">
                  {preset.type}
                </span>
                <span className="text-[10px] text-white font-medium line-clamp-1">
                  {preset.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live Preview Card */}
      {previewData && previewData.url && (
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between bg-black/40 p-3 rounded-xl border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-emerald-500/40 bg-slate-900 flex-shrink-0 flex items-center justify-center">
              {previewData.thumbnailUrl || (previewData.mediaType === 'image' && previewData.url) ? (
                <SafeImage
                  src={previewData.thumbnailUrl || previewData.url}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Video className="w-5 h-5 text-emerald-400" />
              )}
              {previewData.mediaType === 'video' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-4 h-4 text-emerald-300 fill-emerald-400" />
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/40">
                  {previewData.mediaType}
                </span>
                <span className="text-white text-xs font-semibold truncate">
                  Ready to Publish
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate max-w-xs mt-0.5">
                {previewData.url}
              </p>
            </div>
          </div>

          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Attached</span>
          </span>
        </div>
      )}
    </div>
  );
}
