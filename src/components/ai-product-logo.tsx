import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

function isGitHubUrl(value?: string) {
  if (!value) return false;
  try {
    const hostname = new URL(value).hostname;
    return hostname === 'github.com' || hostname.endsWith('.github.com');
  } catch {
    return false;
  }
}

function getFaviconFallback(website?: string) {
  if (!website || isGitHubUrl(website)) return undefined;
  try {
    const hostname = new URL(website).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return undefined;
  }
}

function getLogoMark(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function AiProductLogo({
  name,
  src,
  website,
  hero,
  large = false,
}: {
  name: string;
  src?: string;
  website?: string;
  hero?: string;
  large?: boolean;
}) {
  const directSrc = src && !isGitHubUrl(src) ? src : undefined;
  const fallbackSrc = getFaviconFallback(website);
  const [imageSrc, setImageSrc] = useState(fallbackSrc ?? directSrc);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageSrc(fallbackSrc ?? directSrc);
    setImageFailed(false);
  }, [directSrc, fallbackSrc]);

  const handleImageError = () => {
    if (directSrc && imageSrc === fallbackSrc) {
      setImageSrc(directSrc);
      return;
    }
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }
    setImageFailed(true);
  };

  return (
    <span
      className={cn('ai-product-logo', large && 'ai-product-logo-large')}
      role="img"
      aria-label={`${name} logo`}
    >
      <span className="ai-product-logo-fallback" aria-hidden="true">
        {getLogoMark(name)}
      </span>
      {imageSrc && !imageFailed && (
        <img
          src={imageSrc}
          alt=""
          width={large ? 72 : 40}
          height={large ? 72 : 40}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
      )}
      {hero && (
        <img
          src={hero}
          className="ai-product-logo-hero"
          alt=""
          width={large ? 72 : 40}
          height={large ? 72 : 40}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )}
    </span>
  );
}
