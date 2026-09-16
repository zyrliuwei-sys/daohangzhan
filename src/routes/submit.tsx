import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { type CatalogLocale } from '@/lib/mock-ai-products';
import { m } from '@/paraglide/messages.js';
import { getLocale, localizeUrl } from '@/paraglide/runtime.js';
import { AiSubmit } from '@/blocks/ai-submit';

export const Route = createFileRoute('/submit')({
  loader: () => {
    const locale: CatalogLocale = getLocale() === 'zh' ? 'zh' : 'en';
    return {
      locale,
      title: m['catalog.submit.meta_title']({}, { locale: locale as any }),
      description: m['catalog.submit.meta_description'](
        {},
        { locale: locale as any }
      ),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | ${envConfigs.app_name}` },
          { name: 'description', content: loaderData.description },
        ]
      : [],
    links: loaderData
      ? [
          {
            rel: 'canonical',
            href: localizeUrl(`${envConfigs.app_url}/submit`, {
              locale: loaderData.locale,
            }).href,
          },
        ]
      : [],
  }),
  component: () => <AiSubmit locale={Route.useLoaderData().locale} />,
});
