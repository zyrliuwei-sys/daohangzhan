import { useMemo, useState, type FormEvent } from 'react';
import { ArrowUpRight, Bookmark, Search } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  categoryKeys,
  productCategoryLabels,
  type CatalogLocale,
  type CatalogProduct,
  type ProductCategory,
} from '@/lib/mock-ai-products';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { AiIndexFooter, AiIndexHeader } from '@/components/ai-index-chrome';
import { AiProductLogo } from '@/components/ai-product-logo';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function getCategoryLabel(category: ProductCategory, locale: CatalogLocale) {
  return (
    productCategoryLabels[category]?.[locale] ??
    productCategoryLabels.realtime[locale]
  );
}

function ProductCard({
  product,
  saved,
  onSave,
  saveLabel,
}: {
  product: CatalogProduct;
  saved: boolean;
  onSave: () => void;
  saveLabel: string;
}) {
  const sourceActionLabel = m['catalog.card.open_website']();

  return (
    <article
      className={cn('ai-index-product', `ai-index-tone-${product.tone}`)}
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
          <button
            type="button"
            className={cn('ai-index-save', saved && 'is-saved')}
            onClick={onSave}
            aria-pressed={saved}
            aria-label={`${saved ? m['catalog.card.saved']() : saveLabel} ${product.name}`}
          >
            <Bookmark
              className="size-4"
              fill={saved ? 'currentColor' : 'none'}
            />
            <span>{saved ? m['catalog.card.saved']() : saveLabel}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function AiDirectory({
  locale,
  initialQuery = '',
  products: initialProducts,
}: {
  locale: CatalogLocale;
  initialQuery?: string;
  products: CatalogProduct[];
}) {
  const products = initialProducts;
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    'all'
  );
  const [activeTag, setActiveTag] = useState('all');
  const [savedProducts, setSavedProducts] = useState<Record<string, boolean>>(
    {}
  );

  const allTags = useMemo(
    () =>
      Array.from(
        new Map(
          products.flatMap((product) =>
            product.tags.map((tag) => [tag.key, tag] as const)
          )
        ).values()
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesTag =
        activeTag === 'all' ||
        product.tags.some((tag) => tag.key === activeTag);
      const searchable = [
        product.name,
        product.maker,
        product.categoryName,
        product.tagline,
        product.description,
        product.note,
        product.sourceDomain,
        product.website,
        ...product.tagNames,
      ]
        .join(' ')
        .toLowerCase();
      return (
        matchesCategory &&
        matchesTag &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [activeCategory, activeTag, products, query]);

  const realtimeCategoryKeys = categoryKeys.filter(
    (category) => category === 'realtime'
  );
  const categoryCounts = useMemo(
    () =>
      realtimeCategoryKeys.reduce<Record<string, number>>(
        (counts, category) => {
          counts[category] = products.filter(
            (product) => product.category === category
          ).length;
          return counts;
        },
        {}
      ),
    [products, realtimeCategoryKeys]
  );

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('all');
    setActiveTag('all');
  };

  const scrollToDirectory = () => {
    document
      .getElementById('directory')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scrollToDirectory();
  };

  const chromeContent = {
    browse: m['catalog.nav.browse'](),
    categories: m['catalog.nav.categories'](),
    submit: m['catalog.nav.submit'](),
    signIn: m['common.nav.sign_in'](),
    menu: m['catalog.nav.menu'](),
    close: m['catalog.nav.close'](),
    tagline: m['catalog.footer.tagline'](),
    footerSubmit: m['catalog.footer.submit'](),
    footerBrowse: m['catalog.footer.browse'](),
    footerNote: m['catalog.footer.note'](),
  };

  return (
    <div className="ai-index-page ai-product-catalog-page">
      <AiIndexHeader content={chromeContent} />
      <main>
        <section
          className="ai-index-shell ai-index-hero"
          aria-labelledby="catalog-title"
        >
          <div className="ai-index-hero-copy">
            <p className="ai-index-eyebrow">{m['catalog.hero.eyebrow']()}</p>
            <h1 id="catalog-title">{m['catalog.hero.title']()}</h1>
            <p className="ai-index-hero-lede">
              {m['catalog.hero.description']()}
            </p>
            <form
              className="ai-product-hero-search"
              onSubmit={handleSearchSubmit}
              role="search"
            >
              <label className="ai-index-search" htmlFor="catalog-search">
                <Search className="size-6" aria-hidden="true" />
                <span className="sr-only">
                  {m['catalog.hero.search_label']()}
                </span>
                <Input
                  id="catalog-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={m['catalog.hero.search_placeholder']()}
                  type="search"
                  autoComplete="off"
                  aria-describedby="catalog-search-meta"
                />
              </label>
              <button type="submit" className="ai-product-hero-search-action">
                {m['catalog.hero.search_action']()}
              </button>
            </form>
            <div
              className="ai-product-hero-search-meta"
              id="catalog-search-meta"
            >
              <span>
                {m['catalog.hero.search_scope']({ count: products.length })}
              </span>
            </div>
          </div>
        </section>

        <section
          className="ai-index-shell ai-index-section"
          id="categories"
          aria-labelledby="categories-title"
        >
          <div className="ai-index-section-head">
            <p className="ai-index-eyebrow">
              {m['catalog.categories.eyebrow']()}
            </p>
            <h2 id="categories-title" className="ai-index-section-title">
              {m['catalog.categories.title']()}
            </h2>
            <p className="ai-index-section-description">
              {m['catalog.categories.description']()}
            </p>
          </div>
          <div className="ai-index-category-list">
            <button
              type="button"
              className={cn(
                'ai-index-category-button',
                activeCategory === 'all' && 'is-active'
              )}
              onClick={() => setActiveCategory('all')}
            >
              <span>{m['catalog.filter.all']()}</span>
              <span>{products.length}</span>
            </button>
            {realtimeCategoryKeys.map((category) => (
              <button
                key={category}
                type="button"
                className={cn(
                  'ai-index-category-button',
                  activeCategory === category && 'is-active'
                )}
                onClick={() => setActiveCategory(category)}
              >
                <span>{getCategoryLabel(category, locale)}</span>
                <span>{categoryCounts[category]}</span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="ai-index-shell ai-index-section"
          id="directory"
          aria-labelledby="directory-title"
        >
          <div className="ai-index-section-head">
            <p className="ai-index-eyebrow">
              {m['catalog.directory.eyebrow']()}
            </p>
            <h2 id="directory-title" className="ai-index-section-title">
              {m['catalog.directory.title']()}
            </h2>
            <p className="ai-index-section-description">
              {m['catalog.directory.description']()}
            </p>
          </div>

          <div
            className="ai-index-tag-filter"
            aria-label={m['catalog.filter.tag']()}
          >
            <button
              type="button"
              className={cn(
                'ai-index-tag-button',
                activeTag === 'all' && 'is-active'
              )}
              onClick={() => setActiveTag('all')}
            >
              {m['catalog.filter.all']()}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                className={cn(
                  'ai-index-tag-button',
                  activeTag === tag.key && 'is-active'
                )}
                onClick={() => setActiveTag(tag.key)}
              >
                {tag.label[locale]}
              </button>
            ))}
          </div>

          <div className="ai-index-filter-summary" aria-live="polite">
            <span>
              {m['catalog.filter.results']({ count: filteredProducts.length })}
            </span>
            {(query || activeCategory !== 'all' || activeTag !== 'all') && (
              <button
                type="button"
                className="ai-index-clear"
                onClick={clearFilters}
              >
                {m['catalog.filter.clear']()}
              </button>
            )}
          </div>

          {filteredProducts.length ? (
            <div className="ai-index-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  saved={Boolean(savedProducts[product.slug])}
                  onSave={() =>
                    setSavedProducts((current) => ({
                      ...current,
                      [product.slug]: !current[product.slug],
                    }))
                  }
                  saveLabel={m['catalog.card.save']()}
                />
              ))}
            </div>
          ) : (
            <div className="ai-index-empty">
              <p>{m['catalog.filter.no_results']()}</p>
              <Button type="button" variant="outline" onClick={clearFilters}>
                {m['catalog.filter.clear']()}
              </Button>
            </div>
          )}
        </section>

        <section
          className="ai-index-shell ai-index-submit-band"
          aria-labelledby="submit-band-title"
        >
          <div>
            <h2 id="submit-band-title">{m['catalog.submit.band_title']()}</h2>
            <p>{m['catalog.submit.band_description']()}</p>
          </div>
          <Link
            href="/submit"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'ai-index-submit-cta'
            )}
          >
            {m['catalog.submit.band_button']()}
            <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </main>
      <AiIndexFooter content={chromeContent} />
    </div>
  );
}
