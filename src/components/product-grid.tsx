import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import type { CatalogProduct } from '@/lib/mock-ai-products';
import { AiProductLogo } from '@/components/ai-product-logo';

function compactTagline(value: string) {
  const normalized = value
    .replace(/\s+/g, ' ')
    .replace(/\b([a-z0-9]+)(?:\s*\1){2,}\b/gi, '$1')
    .trim();
  const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0].trim();
  const concise = firstSentence || normalized;

  return concise.length > 116 ? `${concise.slice(0, 113).trimEnd()}…` : concise;
}

export function ProductGrid({
  products,
  sourceActionLabel,
}: {
  products: CatalogProduct[];
  sourceActionLabel: string;
}) {
  if (!products.length) return null;

  return (
    <div className="seo-channel-grid ai-index-product-grid">
      {products.map((product) => (
        <article key={product.slug} className="seo-channel-card">
          <div className="seo-channel-card-head">
            <Link
              href={`/products/${product.slug}`}
              className="seo-channel-card-name"
            >
              <AiProductLogo
                name={product.name}
                src={product.logo}
                website={product.website}
                loading="eager"
              />
              <h3>{product.name}</h3>
            </Link>
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="seo-channel-card-visit"
              aria-label={`${sourceActionLabel} ${product.name}`}
            >
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <p className="seo-channel-card-tagline seo-product-card-tagline">
            {compactTagline(product.tagline)}
          </p>
          <p className="seo-channel-card-tags">
            {product.tagNames.slice(0, 2).join(' · ')}
          </p>
        </article>
      ))}
    </div>
  );
}
