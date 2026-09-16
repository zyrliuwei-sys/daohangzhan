import {
  ArrowUpRight,
  Bookmark,
  Check,
  CircleHelp,
  Globe2,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  getProducts,
  type CatalogLocale,
  type CatalogProduct,
} from '@/lib/mock-ai-products';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { AiDetailLayout } from '@/components/ai-detail-layout';
import { AiProductLogo } from '@/components/ai-product-logo';
import { buttonVariants } from '@/components/ui/button';

function ProductPreviewMedia({
  product,
  detail = false,
}: {
  product: CatalogProduct;
  detail?: boolean;
}) {
  if (product.previewImage) {
    return (
      <img
        src={product.previewImage}
        alt={`${product.name} official homepage preview`}
        className={detail ? 'ai-index-detail-preview' : undefined}
        loading={detail ? 'eager' : 'lazy'}
        fetchPriority={detail ? 'high' : undefined}
        decoding="async"
      />
    );
  }

  return (
    <div
      className={cn(
        'ai-index-site-media',
        detail && 'ai-index-site-media-detail'
      )}
    >
      <span className="ai-index-site-media-kicker">REAL-TIME WEB</span>
      <strong>{product.name}</strong>
      <span>{product.sourceDomain}</span>
    </div>
  );
}

function ProductDetailCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn('ai-index-related', `ai-index-tone-${product.tone}`)}
    >
      <div className="ai-index-related-media">
        <ProductPreviewMedia product={product} />
      </div>
      <div className="ai-index-related-name">
        <AiProductLogo
          name={product.name}
          src={product.logo}
          website={product.website}
        />
        <h3>{product.name}</h3>
      </div>
      <span className="text-muted-foreground text-sm">
        {product.categoryName}
      </span>
    </Link>
  );
}

export function AiProductDetail({
  locale,
  product,
}: {
  locale: CatalogLocale;
  product: CatalogProduct;
}) {
  const relatedProducts = getProducts(locale)
    .filter(
      (item) => item.slug !== product.slug && item.category === product.category
    )
    .slice(0, 3);
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
    <AiDetailLayout
      pageClassName="ai-product-detail-page"
      chromeContent={chromeContent}
      backHref="/#directory"
      backLabel={m['catalog.detail.back']()}
      visual={
        <div className={cn(`ai-index-tone-${product.tone}`)}>
          <ProductPreviewMedia product={product} detail />
        </div>
      }
      name={product.name}
      logo={product.logo}
      website={product.website}
      eyebrow={product.categoryName}
      tagline={product.tagline}
      meta={[
        {
          label: m['catalog.detail.category'](),
          value: product.categoryName,
        },
        { label: m['catalog.detail.maker'](), value: product.maker },
        { label: m['catalog.detail.source'](), value: product.sourceDomain },
        {
          label: m['catalog.detail.updated'](),
          value: product.sourceUpdatedAt,
        },
      ]}
      primaryAction={
        <a
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: 'lg' }), 'ai-index-submit-cta')}
        >
          {m['catalog.detail.visit_website']()}
          <ArrowUpRight className="size-4" />
        </a>
      }
      secondaryAction={
        <button
          type="button"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
        >
          <Bookmark className="size-4" />
          {m['catalog.detail.save']()}
        </button>
      }
    >
      <section
        className="ai-index-detail-insights"
        aria-labelledby={`insights-${product.slug}`}
      >
        <div className="ai-index-detail-insights-head">
          <p className="ai-index-eyebrow">{m['catalog.detail.insights']()}</p>
          <h2 id={`insights-${product.slug}`}>
            {m['catalog.detail.insights_title']({ name: product.name })}
          </h2>
        </div>
        <div className="ai-index-insight-grid">
          <article>
            <h3>{m['catalog.detail.value_proposition']()}</h3>
            <p>{product.profile.valueProposition}</p>
          </article>
          <article>
            <h3>{m['catalog.detail.problem_solved']()}</h3>
            <p>{product.profile.problemSolved}</p>
          </article>
          <article>
            <h3>{m['catalog.detail.audience']()}</h3>
            <p>{product.profile.audience}</p>
          </article>
          <article>
            <h3>{m['catalog.detail.pricing']()}</h3>
            <p>{product.profile.pricing}</p>
          </article>
        </div>
        <div className="ai-index-detail-facts">
          <div>
            <h3>{m['catalog.detail.market']()}</h3>
            <ul>
              {product.profile.market.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{m['catalog.detail.tech_stack']()}</h3>
            <ul>
              {product.profile.techStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="ai-index-detail-sections">
        <section
          className="ai-index-seo-section ai-index-seo-intro"
          aria-labelledby={`what-is-${product.slug}`}
        >
          <div className="ai-index-seo-section-label">
            <span>01</span>
            <span>{m['catalog.detail.about']()}</span>
          </div>
          <h2 id={`what-is-${product.slug}`}>
            {m['catalog.detail.what_is']({ name: product.name })}
          </h2>
          <p>{product.seo.whatIs}</p>
        </section>

        <section
          className="ai-index-seo-section"
          aria-labelledby={`how-to-use-${product.slug}`}
        >
          <div className="ai-index-seo-section-label">
            <span>02</span>
            <span>{m['catalog.detail.how_to_use_label']()}</span>
          </div>
          <h2 id={`how-to-use-${product.slug}`}>
            {m['catalog.detail.how_to_use']({ name: product.name })}
          </h2>
          <ol className="ai-index-seo-steps">
            {product.seo.howToUse.map((step, index) => (
              <li key={step.title} className="ai-index-seo-step">
                <span className="ai-index-seo-step-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="ai-index-seo-section"
          aria-labelledby={`features-${product.slug}`}
        >
          <div className="ai-index-seo-section-label">
            <span>03</span>
            <span>{m['catalog.detail.features_label']()}</span>
          </div>
          <h2 id={`features-${product.slug}`}>
            {m['catalog.detail.key_features']({ name: product.name })}
          </h2>
          <ul className="ai-index-seo-feature-grid">
            {product.seo.keyFeatures.map((feature) => (
              <li key={feature}>
                <Check className="size-4" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="ai-index-seo-section ai-index-seo-best-for"
          aria-labelledby={`best-for-${product.slug}`}
        >
          <div className="ai-index-seo-section-label">
            <span>04</span>
            <span>{m['catalog.detail.best_for_label']()}</span>
          </div>
          <div>
            <h2 id={`best-for-${product.slug}`}>
              {m['catalog.detail.best_for']({ name: product.name })}
            </h2>
            <ul className="ai-index-seo-best-for-list">
              {product.seo.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="ai-index-seo-section ai-index-seo-faq"
          aria-labelledby={`faq-${product.slug}`}
        >
          <div className="ai-index-seo-section-label">
            <span>05</span>
            <span>{m['catalog.detail.faq_label']()}</span>
          </div>
          <h2 id={`faq-${product.slug}`}>
            {m['catalog.detail.faq']({ name: product.name })}
          </h2>
          <div className="ai-index-seo-faq-list">
            {product.seo.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <CircleHelp className="size-4" aria-hidden="true" />
                  <span>{faq.question}</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="ai-index-seo-section ai-index-seo-source">
          <div className="ai-index-seo-source-icon" aria-hidden="true">
            <Globe2 className="size-5" />
          </div>
          <div>
            <p className="ai-index-seo-source-kicker">
              {m['catalog.detail.source_website']()}
            </p>
            <p className="ai-index-seo-source-repo">{product.sourceDomain}</p>
            <p className="ai-index-seo-source-copy">{product.description}</p>
          </div>
        </section>
      </div>

      {relatedProducts.length > 0 && (
        <section
          className="ai-index-detail-body"
          aria-labelledby="related-title"
        >
          <h2 id="related-title">{m['catalog.detail.related']()}</h2>
          <div className="ai-index-related-grid">
            {relatedProducts.map((item) => (
              <ProductDetailCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </AiDetailLayout>
  );
}
