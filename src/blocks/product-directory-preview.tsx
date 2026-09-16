import { useMemo } from 'react';

import { Link } from '@/core/i18n/navigation';
import { getProducts, type CatalogLocale } from '@/lib/mock-ai-products';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { ProductGrid } from '@/components/product-grid';
import { buttonVariants } from '@/components/ui/button';

const PREVIEW_LIMIT = 30;

export function ProductDirectoryPreview() {
  const locale: CatalogLocale = getLocale() === 'zh' ? 'zh' : 'en';
  const products = useMemo(
    () => getProducts(locale).slice(0, PREVIEW_LIMIT),
    [locale]
  );

  return (
    <section
      className="ai-index-shell ai-index-section ai-index-product-preview"
      aria-labelledby="product-directory-title"
    >
      <div className="ai-index-section-head">
        <p className="ai-index-eyebrow">{m['catalog.hero.eyebrow']()}</p>
        <h2 id="product-directory-title" className="ai-index-section-title">
          {m['catalog.directory.title']()}
        </h2>
        <p className="ai-index-section-description">
          {m['catalog.directory.description']()}
        </p>
        <Link
          href="/products"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          {m['catalog.hero.browse_all']()}
        </Link>
      </div>
      <div className="ai-index-filter-summary" aria-live="polite">
        <span>{m['catalog.filter.results']({ count: products.length })}</span>
      </div>
      <ProductGrid
        products={products}
        sourceActionLabel={m['catalog.card.open_website']()}
      />
    </section>
  );
}
