import { createFileRoute, notFound } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { getPublishedProductSubmission } from '@/modules/product-submissions/service';
import {
  getProduct,
  toCatalogProduct,
  type CatalogLocale,
} from '@/lib/mock-ai-products';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { AiProductDetail } from '@/blocks/ai-product-detail';

function getProductSchema(
  product: ReturnType<typeof getProduct>,
  canonical: string,
  locale: CatalogLocale
) {
  if (!product) return null;

  const sourceSchema = {
    '@type': 'SoftwareApplication',
    '@id': `${canonical}#software`,
    name: product.name,
    description: product.seo.whatIs,
    url: product.website,
    ...(product.previewImage
      ? { image: new URL(product.previewImage, envConfigs.app_url).href }
      : {}),
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    publisher: {
      '@type': 'Organization',
      name: product.maker,
    },
    keywords: product.tagNames,
    inLanguage: locale,
    mainEntityOfPage: canonical,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      sourceSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'zh' ? '首页' : 'Home',
            item: localizeUrl(`${envConfigs.app_url}/`, { locale }).href,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'zh' ? '产品目录' : 'Products',
            item: localizeUrl(`${envConfigs.app_url}/products`, { locale })
              .href,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: product.seo.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export const Route = createFileRoute('/products/$slug')({
  loader: async ({ params }) => {
    const locale: CatalogLocale = getLocale() === 'zh' ? 'zh' : 'en';
    let product = getProduct(params.slug, locale);
    if (!product) {
      const submittedProduct = await getPublishedProductSubmission(
        params.slug
      ).catch(() => null);
      product = submittedProduct
        ? toCatalogProduct(submittedProduct, locale)
        : null;
    }
    if (!product) throw notFound();
    return { locale, product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { locale, product } = loaderData;
    const canonical = localizeUrl(
      `${envConfigs.app_url}/products/${product.slug}`,
      {
        locale,
      }
    ).href;
    const title =
      locale === 'zh'
        ? `${product.name}：功能、使用方法与产品介绍 | ${envConfigs.app_name}`
        : `${product.name}: features, how to use, and overview | ${envConfigs.app_name}`;
    const description = product.seo.whatIs;
    const previewImage = product.previewImage
      ? new URL(product.previewImage, envConfigs.app_url).href
      : undefined;
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: canonical },
        ...(previewImage
          ? [{ property: 'og:image', content: previewImage }]
          : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { 'script:ld+json': getProductSchema(product, canonical, locale) },
      ],
      links: [
        { rel: 'canonical', href: canonical },
        ...locales.map((localizedLocale) => ({
          rel: 'alternate',
          hrefLang: localizedLocale,
          href: localizeUrl(`${envConfigs.app_url}/products/${product.slug}`, {
            locale: localizedLocale as CatalogLocale,
          }).href,
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: localizeUrl(`${envConfigs.app_url}/products/${product.slug}`, {
            locale: 'en',
          }).href,
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { locale, product } = Route.useLoaderData();
  return <AiProductDetail locale={locale} product={product} />;
}
