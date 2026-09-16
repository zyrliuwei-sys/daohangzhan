import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import type { CatalogProduct } from '@/lib/mock-ai-products';
import { AiProductLogo } from '@/components/ai-product-logo';

export function ProductGrid({
  products,
  sourceActionLabel,
}: {
  products: CatalogProduct[];
  sourceActionLabel: string;
}) {
  if (!products.length) return null;

  return (
    <div className="ai-index-product-grid">
      {products.map((product) => (
        <article
          key={product.slug}
          className={`ai-index-product ai-index-tone-${product.tone}`}
        >
          <div className="ai-index-product-info">
            <div className="ai-index-product-title-row">
              <Link
                href={`/products/${product.slug}`}
                className="ai-index-product-name"
              >
                <AiProductLogo
                  name={product.name}
                  src={product.logo}
                  website={product.website}
                />
                <h3>{product.name}</h3>
              </Link>
              <a
                href={product.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex min-h-9 min-w-9 items-center justify-center"
                aria-label={`${sourceActionLabel} ${product.name}`}
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>
            <p className="ai-index-product-maker">
              {product.maker}
              <span aria-hidden="true"> · </span>
              {product.sourceDomain}
            </p>
            <p className="ai-index-product-tags">
              {product.tagNames.join('  /  ')}
            </p>
            <div className="ai-index-product-foot">
              <span>{product.categoryName}</span>
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
