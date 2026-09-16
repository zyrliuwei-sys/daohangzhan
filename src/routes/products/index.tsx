import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { listPublishedProductSubmissions } from '@/modules/product-submissions/service';
import {
  getProducts,
  toCatalogProduct,
  type CatalogLocale,
} from '@/lib/mock-ai-products';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { AiDirectory } from '@/blocks/ai-directory';

/**
 * The original AI video tools directory — kept as its own page so the
 * `/products/<slug>` detail pages keep a browse entry point after the
 * homepage moved to the live-channel directory copy.
 */
export const Route = createFileRoute('/products/')({
  loader: async ({ location }) => {
    const locale: CatalogLocale = getLocale() === 'zh' ? 'zh' : 'en';
    const initialQuery =
      new URLSearchParams(location.searchStr).get('query') ?? '';
    const submittedProducts = await listPublishedProductSubmissions().catch(
      () => []
    );
    const products = [
      ...getProducts(locale),
      ...submittedProducts.map((product) => toCatalogProduct(product, locale)),
    ];
    return { locale, initialQuery, products };
  },
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? 'en';
    const urlFor = (loc: string) =>
      localizeUrl(`${envConfigs.app_url}/products`, { locale: loc as any })
        .href;
    return {
      meta: [
        { title: m['catalog.meta.title']({}, { locale: locale as any }) },
        {
          name: 'description',
          content: m['catalog.meta.description']({}, { locale: locale as any }),
        },
      ],
      links: [
        { rel: 'canonical', href: urlFor(locale) },
        ...locales.map((loc) => ({
          rel: 'alternate',
          hrefLang: loc,
          href: urlFor(loc),
        })),
        { rel: 'alternate', hrefLang: 'x-default', href: urlFor('en') },
      ],
    };
  },
  component: () => {
    const { locale, initialQuery, products } = Route.useLoaderData();
    return (
      <AiDirectory
        locale={locale}
        initialQuery={initialQuery}
        products={products}
      />
    );
  },
});
