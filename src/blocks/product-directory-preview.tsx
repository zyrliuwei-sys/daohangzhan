import { useMemo } from 'react';

import { Link } from '@/core/i18n/navigation';
import type { CatalogProduct } from '@/lib/mock-ai-products';
import { m } from '@/paraglide/messages.js';
import { ProductGrid } from '@/components/product-grid';
import { buttonVariants } from '@/components/ui/button';

const PREVIEW_LIMIT = 30;

export function ProductDirectoryPreview({
  products,
}: {
  products: CatalogProduct[];
}) {
  const visibleProducts = useMemo(
    () => products.slice(0, PREVIEW_LIMIT),
    [products]
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
        <span>
          {m['catalog.filter.results']({ count: visibleProducts.length })}
        </span>
      </div>
      <ProductGrid
        products={visibleProducts}
        sourceActionLabel={m['catalog.card.open_website']()}
      />
    </section>
  );
}
