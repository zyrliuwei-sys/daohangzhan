import { createFileRoute } from '@tanstack/react-router';

import { type CatalogLocale } from '@/lib/mock-ai-products';
import { listCatalogProductsFn } from '@/lib/product-submissions-server';
import { HomeDirectory } from '@/blocks/home-directory';

import { seoPageHead, seoPageLoader } from './-seo-route';

/** Homepage: the AI tools directory (primary keyword "ai tools directory"). */
export const Route = createFileRoute('/')({
  loader: async () => {
    const page = await seoPageLoader('home');
    const locale: CatalogLocale = page.locale === 'zh' ? 'zh' : 'en';
    const products = await listCatalogProductsFn({
      data: { locale },
    });

    return {
      ...page,
      products,
    };
  },
  head: ({ loaderData }) => seoPageHead('/', loaderData),
  component: HomePage,
});

function HomePage() {
  const data = Route.useLoaderData();
  return <HomeDirectory h1={data.json.h1} products={data.products} />;
}
