import { createFileRoute } from '@tanstack/react-router';

import { listPublishedProductSubmissions } from '@/modules/product-submissions/service';
import {
  toCatalogProduct,
  type CatalogLocale,
  type CatalogProduct,
} from '@/lib/mock-ai-products';
import { HomeDirectory } from '@/blocks/home-directory';

import { seoPageHead, seoPageLoader } from './-seo-route';

/** Primary keyword URL for the live AI channel directory. */
export const Route = createFileRoute('/ai-livestream')({
  loader: async () => {
    const page = await seoPageLoader('home');
    const locale: CatalogLocale = page.locale === 'zh' ? 'zh' : 'en';
    const submittedProducts = await listPublishedProductSubmissions().catch(
      () => []
    );

    return {
      ...page,
      submittedProducts: submittedProducts.map((product) =>
        toCatalogProduct(product, locale)
      ),
    } satisfies typeof page & { submittedProducts: CatalogProduct[] };
  },
  head: ({ loaderData }) => seoPageHead('/ai-livestream', loaderData),
  component: AiLivestreamPage,
});

function AiLivestreamPage() {
  const data = Route.useLoaderData();
  const locale: CatalogLocale = data.locale === 'zh' ? 'zh' : 'en';
  return (
    <HomeDirectory
      h1={data.json.h1}
      segments={data.segments}
      locale={locale}
      submittedProducts={data.submittedProducts}
    />
  );
}
