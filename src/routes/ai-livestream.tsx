import { createFileRoute } from '@tanstack/react-router';

import { type CatalogLocale } from '@/lib/mock-ai-products';
import { listCatalogProductsFn } from '@/lib/product-submissions-server';
import { HomeDirectory } from '@/blocks/home-directory';

import { seoPageHead, seoPageLoader } from './-seo-route';

/** Primary keyword URL for the live AI channel directory. */
export const Route = createFileRoute('/ai-livestream')({
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
  head: ({ loaderData }) => seoPageHead('/ai-livestream', loaderData),
  component: AiLivestreamPage,
});

function AiLivestreamPage() {
  const data = Route.useLoaderData();
  return (
    <HomeDirectory
      h1={data.json.h1}
      segments={data.segments}
      products={data.products}
    />
  );
}
