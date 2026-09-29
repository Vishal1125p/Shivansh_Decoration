'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageIcon } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';

export default function SafeImage({
  src,
  alt = 'Shivansh Decoration',
  fallbackSrc = DEFAULT_FALLBACK,
  className = '',
  fill = false,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  // If src changes externally, update imageSrc
  React.useEffect(() => {
    setError(false);
    setImageSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  if (!imageSrc || error) {
    return (
      <div className={`relative flex items-center justify-center bg-zinc-900 border border-zinc-800 ${className} ${fill ? 'w-full h-full absolute inset-0' : ''}`}>
        <Image
          src={fallbackSrc}
          alt={alt}
          fill={fill}
          unoptimized
          className={className}
          onError={() => setError(true)}
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      unoptimized
      onError={() => {
        setError(true);
        setImageSrc(fallbackSrc);
      }}
      className={className}
      {...props}
    />
  );
}
