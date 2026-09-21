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
  // If a curated logo URL exists, do not replace it with a generic browser
  // favicon when it fails. The initials are a cleaner and more honest fallback.
  const fallbackSrc = directSrc ? undefined : getFaviconFallback(website);
  // A curated product logo is more trustworthy than a favicon inferred from
  // the page URL. Only use the inferred favicon when no logo was supplied.
  const [imageSrc, setImageSrc] = useState(directSrc ?? fallbackSrc);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(directSrc ?? fallbackSrc);
    setImageFailed(false);
    setImageLoaded(false);
  }, [directSrc, fallbackSrc]);

  const handleImageError = () => {
    if (fallbackSrc && imageSrc === directSrc) {
      setImageSrc(fallbackSrc);
      return;
    }
    setImageLoaded(false);
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
          className="ai-product-logo-image"
          width={large ? 72 : 40}
          height={large ? 72 : 40}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          style={{ opacity: imageLoaded ? 1 : 0 }}
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
