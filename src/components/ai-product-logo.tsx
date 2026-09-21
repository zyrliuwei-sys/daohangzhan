import { useEffect, useMemo, useState } from 'react';

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

function getWebsiteFavicon(website?: string) {
  if (!website) return undefined;
  try {
    const hostname = new URL(website).hostname.replace(/^www\./, '');
    return `https://${hostname}/favicon.ico`;
  } catch {
    return undefined;
  }
}

function getGoogleFavicon(website?: string) {
  if (!website) return undefined;
  try {
    const hostname = new URL(website).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return undefined;
  }
}

function getDuckDuckGoFavicon(website?: string) {
  if (!website) return undefined;
  try {
    const hostname = new URL(website).hostname.replace(/^www\./, '');
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
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
  loading = 'lazy',
}: {
  name: string;
  src?: string;
  website?: string;
  hero?: string;
  large?: boolean;
  loading?: 'eager' | 'lazy';
}) {
  const directSrc = src && !isGitHubUrl(src) ? src : undefined;
  const candidates = useMemo(
    () =>
      Array.from(
        new Set(
          [
            directSrc,
            getWebsiteFavicon(website),
            getGoogleFavicon(website),
            getDuckDuckGoFavicon(website),
          ].filter((value): value is string => Boolean(value))
        )
      ),
    [directSrc, website]
  );
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setImageFailed(false);
    setImageLoaded(false);
  }, [candidates]);

  const imageSrc = candidates[candidateIndex];

  useEffect(() => {
    if (!imageSrc || imageFailed || imageLoaded) return;

    const timeout = window.setTimeout(() => {
      setCandidateIndex((index) => {
        if (index < candidates.length - 1) return index + 1;
        setImageFailed(true);
        return index;
      });
    }, 2500);

    return () => window.clearTimeout(timeout);
  }, [candidateIndex, candidates.length, imageFailed, imageLoaded, imageSrc]);

  const handleImageError = () => {
    setImageLoaded(false);
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((index) => index + 1);
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
          className="ai-product-logo-image"
          width={large ? 72 : 40}
          height={large ? 72 : 40}
          loading={loading}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
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
