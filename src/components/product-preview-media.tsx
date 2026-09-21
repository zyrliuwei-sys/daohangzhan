import { useEffect, useMemo, useState } from 'react';

import type { CatalogProduct } from '@/lib/mock-ai-products';
import { cn } from '@/lib/utils';
import { AiProductLogo } from '@/components/ai-product-logo';

/**
 * Shared product visual used by cards, related products, and product details.
 * Prefer a curated homepage capture, but never leave a broken image behind:
 * fall back through the local thumb, the product logo, and a branded panel.
 */
export function ProductPreviewMedia({
  product,
  detail = false,
  showLogo = false,
}: {
  product: CatalogProduct;
  detail?: boolean;
  showLogo?: boolean;
}) {
  const candidates = useMemo(
    () =>
      Array.from(
        new Set(
          [product.previewImage, product.heroThumb, product.logo].filter(
            (value): value is string => Boolean(value)
          )
        )
      ),
    [product.heroThumb, product.logo, product.previewImage]
  );
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setImageFailed(false);
  }, [candidates]);

  const imageSrc = candidates[candidateIndex];
  const isBrandFallback = !imageSrc || imageFailed;

  return (
    <div
      className={cn(
        'ai-index-preview-media',
        detail && 'ai-index-detail-preview-frame',
        isBrandFallback && 'is-brand-fallback'
      )}
    >
      {isBrandFallback ? (
        <div className="ai-index-preview-brand-panel">
          <AiProductLogo
            name={product.name}
            src={product.logo}
            website={product.website}
            large
          />
          <div className="ai-index-preview-brand-copy">
            <span>OFFICIAL WEBSITE</span>
            <strong>{product.name}</strong>
            <small>{product.sourceDomain}</small>
          </div>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={`${product.name} official homepage preview`}
          className="ai-index-preview-image"
          loading={detail ? 'eager' : 'lazy'}
          fetchPriority={detail ? 'high' : undefined}
          decoding="async"
          onError={() => {
            if (candidateIndex < candidates.length - 1) {
              setCandidateIndex((index) => index + 1);
            } else {
              setImageFailed(true);
            }
          }}
        />
      )}
      {showLogo && !isBrandFallback && (
        <span className="ai-index-preview-logo" aria-hidden="true">
          <AiProductLogo
            name={product.name}
            src={product.logo}
            website={product.website}
          />
        </span>
      )}
    </div>
  );
}
