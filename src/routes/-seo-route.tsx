import type { ReactNode } from 'react';
import { notFound, useLoaderData } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { getSeoPage, type SeoPageData } from '@/lib/seo-content';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { SeoPage } from '@/blocks/seo-page';

type LoaderData = SeoPageData & { locale: string };

/** Loader for a content-pages route — throws notFound when the pair is missing. */
export async function seoPageLoader(slug: string): Promise<LoaderData> {
  const page = await getSeoPage(slug);
  if (!page) throw notFound();
  return { ...page, locale: getLocale() };
}

/** head() for a content-pages route — meta + canonical/hreflang links. */
export function seoPageHead(urlPath: string, loaderData?: LoaderData) {
  if (!loaderData) return {};
  const { meta } = loaderData.json;
  const { locale } = loaderData;
  const urlFor = (loc: string) =>
    localizeUrl(`${envConfigs.app_url}${urlPath}`, {
      locale: loc as ReturnType<typeof getLocale>,
    }).href;
  return {
    meta: [
      { title: meta.title },
      { name: 'description', content: meta.description },
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
}

/**
 * Shared route options for the static SEO pages (`home`, `director`,
 * `tv-show-generator`, …). Each page is an explicit route file so static
 * segments outrank dynamic ones — add a page by creating the content pair
 * under `content/pages/` plus a thin route file using this factory.
 * The homepage passes its own `component` (directory-first layout).
 */
export function seoPageRouteOptions(
  slug: string,
  urlPath: string,
  component: () => ReactNode = SeoRoutePage
) {
  return {
    loader: async (): Promise<LoaderData> => seoPageLoader(slug),
    head: ({ loaderData }: { loaderData?: LoaderData }) =>
      seoPageHead(urlPath, loaderData),
    component,
  };
}

function SeoRoutePage() {
  const data = useLoaderData({ strict: false }) as LoaderData | undefined;
  if (!data) return null;
  return (
    <SeoPage
      data={{
        h1: data.json.h1,
        segments: data.segments,
        faqs: data.json.faqs,
      }}
    />
  );
}
