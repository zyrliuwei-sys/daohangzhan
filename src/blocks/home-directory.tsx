import { useMemo, useState } from 'react';

import {
  categoryKeys,
  type CatalogProduct,
  type ProductCategory,
} from '@/lib/mock-ai-products';
import { searchProducts } from '@/lib/product-search';
import { buildFaqJsonLd } from '@/lib/seo-content';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { AiHomeCta } from '@/blocks/ai-home-cta';
import { AiHomeFaq, getHomeFaqItems } from '@/blocks/ai-home-faq';
import { AiIndexFooter, AiIndexHeader } from '@/components/ai-index-chrome';
import { ChannelGrid } from '@/components/channel-grid';
import { Button } from '@/components/ui/button';
import { Component as VibeToPromptAiInput } from '@/components/ui/vibe-to-prompt-ai-input';

const FEATURED_PRODUCT_SLUGS = [
  'higgsfield',
  'kling-ai',
  'manus',
  'perplexity',
  'gemini-notebook',
  'suno',
  'emergent',
  'recraft',
  'luma-ai',
  'consensus',
  'leonardo-ai',
  'vectorizer-ai',
  'vozo-ai',
  'cartesia',
  'winston-ai',
  'jev',
  'reapi-qwen-image-2-1',
  'comfyui',
  'migos-ai-song',
  'dreamina-migos-ai-video',
] as const;

/** Featured tools first, then the rest of the catalog in its own order. */
function orderProducts(products: CatalogProduct[]) {
  const rank = new Map<string, number>(
    FEATURED_PRODUCT_SLUGS.map((slug, index) => [slug, index])
  );
  return [...products].sort(
    (a, b) =>
      (rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER)
  );
}

/**
 * Directory-first homepage: the AI tools grid (category filters),
 * product preview, FAQ and CTA.
 */
export function HomeDirectory({
  h1,
  products,
}: {
  h1: string;
  products: CatalogProduct[];
}) {
  const [activeTag, setActiveTag] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orderedProducts = useMemo(() => orderProducts(products), [products]);
  const filterTags = useMemo(
    () =>
      categoryKeys.flatMap((key) => {
        const product = products.find((item) => item.category === key);
        return product ? [{ key, label: product.categoryName }] : [];
      }),
    [products]
  );

  const searchableProducts = useMemo(
    () =>
      orderedProducts.map((product) => ({
        ...product,
        href: `/products/${product.slug}`,
      })),
    [orderedProducts]
  );

  const filteredProducts = useMemo(() => {
    const inCategory =
      activeTag === 'all'
        ? orderedProducts
        : orderedProducts.filter((product) => product.category === activeTag);
    return searchQuery ? searchProducts(inCategory, searchQuery) : inCategory;
  }, [activeTag, orderedProducts, searchQuery]);

  const clearFilters = () => {
    setActiveTag('all');
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) return;
    setActiveTag('all');
    document
      .getElementById('directory')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const hasFilters = activeTag !== 'all' || searchQuery !== '';
  const faqJsonLd = buildFaqJsonLd(
    getHomeFaqItems().map(({ question, answer }) => ({
      q: question,
      a: answer,
    }))
  );
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
    browseHref: '#directory',
    categoriesHref: '/products',
  };

  return (
    <div className="ai-index-page ai-home-directory-page">
      <AiIndexHeader content={chromeContent} />
      <main>
        <div className="ai-home-hero-frame">
          <VibeToPromptAiInput
            copy={{
              eyebrow: m['seo.home.hero_prompt_eyebrow'](),
              title: h1,
              description: m['seo.home.hero_description'](),
              inputLabel: m['seo.home.hero_input_label'](),
              placeholder: m['seo.home.hero_input_placeholder'](),
              noResults: m['seo.home.search_no_results'](),
              viewAll: (count) => m['seo.home.search_view_all']({ count }),
            }}
            products={searchableProducts}
            onSearch={handleSearch}
          />
        </div>

        <section
          className="ai-index-shell ai-index-section seo-home-directory"
          id="directory"
          aria-labelledby="directory-title"
        >
          <div className="ai-index-section-head">
            <p className="ai-index-eyebrow">{m['seo.home.eyebrow']()}</p>
            <h2
              id="directory-title"
              className="ai-index-section-title seo-home-directory-title"
            >
              {m['seo.home.directory_title']()}
            </h2>
            <p className="ai-index-section-description">
              {m['seo.home.directory_description']()}
            </p>
          </div>

          <div className="ai-index-tag-filter">
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
            {filterTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                className={cn(
                  'ai-index-tag-button',
                  activeTag === tag.key && 'is-active'
                )}
                onClick={() => setActiveTag(tag.key)}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="ai-index-filter-summary" aria-live="polite">
            <span>
              {m['seo.home.results']({ count: filteredProducts.length })}
              {searchQuery &&
                ` · ${m['seo.home.search_query']({ query: searchQuery })}`}
            </span>
            {hasFilters && (
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
            <ChannelGrid
              channels={[]}
              tagLabels={{}}
              featuredProducts={filteredProducts}
            />
          ) : (
            <div className="ai-index-empty">
              <p>
                {searchQuery
                  ? m['seo.home.search_no_results']()
                  : m['seo.home.no_results']()}
              </p>
              <Button type="button" variant="outline" onClick={clearFilters}>
                {m['catalog.filter.clear']()}
              </Button>
            </div>
          )}
        </section>

        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqJsonLd }}
          />
        )}

        <AiHomeFaq />
        <AiHomeCta />
      </main>
      <AiIndexFooter content={chromeContent} showBadges />
    </div>
  );
}
