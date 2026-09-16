import { createFileRoute, notFound } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import {
  autoChannelMeta,
  findChannel,
  getCuratedChannelPage,
  type ChannelRecord,
  type Segment,
  type SeoFaq,
  type SeoMeta,
} from '@/lib/seo-content';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { ChannelPage } from '@/blocks/channel-page';

type LoaderData = {
  channel: ChannelRecord;
  curated: { h1: string; segments: Segment[]; faqs?: SeoFaq[] } | null;
  meta: SeoMeta;
  locale: string;
};

export const Route = createFileRoute('/channel/$slug')({
  loader: async ({ params }): Promise<LoaderData> => {
    const channel = findChannel(params.slug);
    if (!channel) throw notFound();

    const curated = await getCuratedChannelPage(params.slug);
    const meta = curated?.json.meta ?? autoChannelMeta(channel);

    return { channel, curated, meta, locale: getLocale() };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { channel, meta, locale } = loaderData;
    const urlFor = (loc: string) =>
      localizeUrl(`${envConfigs.app_url}/channel/${channel.slug}`, {
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
  },
  component: () => {
    const { channel, curated } = Route.useLoaderData();
    return (
      <ChannelPage
        channel={channel}
        curated={
          curated
            ? {
                h1: curated.json.h1,
                segments: curated.segments,
                faqs: curated.json.faqs,
              }
            : null
        }
      />
    );
  },
});
