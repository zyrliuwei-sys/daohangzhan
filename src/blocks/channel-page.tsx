import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  getChannelsData,
  relatedChannels,
  tagLabelMap,
  type ChannelRecord,
  type Segment,
  type SeoFaq,
} from '@/lib/seo-content';
import { cn } from '@/lib/utils';
import { getWebsiteScreenshotUrl } from '@/lib/website-preview';
import { m } from '@/paraglide/messages.js';
import { AiDetailLayout } from '@/components/ai-detail-layout';
import { ChannelGrid } from '@/components/channel-grid';
import { ProductPreviewMedia } from '@/components/product-preview-media';
import { SeoContentPage } from '@/components/seo-content-page';
import { buttonVariants } from '@/components/ui/button';

function chromeContent() {
  return {
    browse: m['seo.nav.watch'](),
    categories: m['seo.nav.formats'](),
    submit: m['catalog.nav.submit'](),
    blog: m['catalog.nav.blog'](),
    signIn: m['common.nav.sign_in'](),
    menu: m['catalog.nav.menu'](),
    close: m['catalog.nav.close'](),
    tagline: m['seo.footer.tagline'](),
    footerSubmit: m['catalog.footer.submit'](),
    footerBrowse: m['catalog.footer.browse'](),
    footerNote: m['catalog.footer.note'](),
    browseHref: '/channels',
    categoriesHref: '/tv-show-generator',
  };
}

function getWebsiteHost(website: string) {
  try {
    return new URL(website).hostname.replace(/^www\./, '');
  } catch {
    return website;
  }
}

const channelPreviewImages: Record<string, string> = {
  'infinite-slop': '/imgs/product-thumbs/infinite-slop.jpg',
  'fal-live': '/imgs/product-thumbs/fal-live.jpg',
  'renoise-live': '/imgs/product-thumbs/renoise-live.jpg',
  'flow-tv': '/imgs/product-thumbs/flow-tv.jpg',
  'nothing-forever': '/imgs/product-thumbs/nothing-forever.jpg',
  'neuro-sama': '/imgs/product-thumbs/neuro-sama.jpg',
  'channel-1': '/imgs/product-thumbs/channel-1.jpg',
  aitv: '/imgs/product-thumbs/aitv.jpg',
  'retake-tv': '/imgs/product-thumbs/retake-tv.jpg',
};

function ChannelDetailVisual({ channel }: { channel: ChannelRecord }) {
  return (
    <ProductPreviewMedia
      product={{
        name: channel.name,
        logo: channel.logo,
        website: channel.website,
        sourceDomain: getWebsiteHost(channel.website),
        previewImage:
          channelPreviewImages[channel.slug] ??
          getWebsiteScreenshotUrl(channel.website),
      }}
      detail
      showLogo
    />
  );
}

/** Auto content for channels whose curated page is not written yet (batch 2). */
function AutoChannelContent({ channel }: { channel: ChannelRecord }) {
  const tagLabels = tagLabelMap();
  const related = relatedChannels(channel.slug, 3);
  const launchesOwn = channel.type !== 'channel';
  const intentHref = launchesOwn ? '/creators' : '/tv-show-generator';
  const intentLabel = launchesOwn
    ? m['seo.channel.launch_own']()
    : m['seo.channel.how_shows']();

  return (
    <>
      <section
        className="ai-index-detail-insights"
        aria-labelledby={`channel-facts-${channel.slug}`}
      >
        <div className="ai-index-detail-insights-head">
          <p className="ai-index-eyebrow">{m['seo.channel.facts']()}</p>
          <h2 id={`channel-facts-${channel.slug}`}>{channel.description}</h2>
        </div>
        <div className="ai-index-detail-facts ai-index-channel-facts">
          <div>
            <h3>{m['seo.channel.facts']()}</h3>
            <ul>
              {channel.verifiedFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{m['seo.channel.tags']()}</h3>
            <ul>
              {channel.tags.map((tag) => (
                <li key={tag}>{tagLabels[tag] ?? tag.replace(/-/g, ' ')}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="ai-index-detail-body ai-index-channel-related"
        aria-labelledby={`channel-related-${channel.slug}`}
      >
        <h2 id={`channel-related-${channel.slug}`}>
          {m['seo.channel.related']()}
        </h2>
        <ChannelGrid channels={related} tagLabels={tagLabels} />
        <p className="seo-article-footer-links">
          <Link href="/channels">{m['seo.channel.all']()}</Link>
          {' · '}
          <Link href={intentHref}>{intentLabel}</Link>
        </p>
      </section>
    </>
  );
}

/**
 * Channel detail block: renders the curated page from `content/channels/`
 * when it exists, otherwise an auto page built from verified data.
 */
export function ChannelPage({
  channel,
  curated,
}: {
  channel: ChannelRecord;
  curated: { h1: string; segments: Segment[]; faqs?: SeoFaq[] } | null;
}) {
  const chrome = chromeContent();
  const { channels } = getChannelsData();
  const tags = channel.tags
    .map((tag) => tagLabelMap()[tag] ?? tag.replace(/-/g, ' '))
    .join(' · ');

  return (
    <AiDetailLayout
      chromeContent={chrome}
      backHref="/channels"
      backLabel={m['seo.channel.all']()}
      breadcrumbLabel={m['catalog.breadcrumb.label']()}
      breadcrumbs={[
        { label: m['catalog.breadcrumb.home'](), href: '/' },
        { label: m['seo.breadcrumb.channels'](), href: '/channels' },
        { label: channel.name },
      ]}
      visual={<ChannelDetailVisual channel={channel} />}
      name={channel.name}
      logo={channel.logo ?? undefined}
      website={channel.website}
      eyebrow={channel.format}
      tagline={channel.tagline}
      meta={[
        { label: m['catalog.detail.category'](), value: channel.format },
        { label: m['seo.channel.maker'](), value: channel.maker || '—' },
        { label: m['seo.channel.tags'](), value: tags || '—' },
        {
          label: m['catalog.detail.updated'](),
          value: channel.lastVerifiedAt,
        },
      ]}
      primaryAction={
        <a
          href={channel.website}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: 'lg' }), 'ai-index-submit-cta')}
        >
          {m['seo.channel.visit']()}
          <ArrowUpRight className="size-4" />
        </a>
      }
    >
      {curated ? (
        <div className="ai-index-detail-sections ai-index-channel-content">
          <SeoContentPage
            h1={curated.h1}
            showHeading={false}
            segments={curated.segments}
            faqs={curated.faqs}
            channels={channels}
            tagLabels={tagLabelMap()}
          />
        </div>
      ) : (
        <AutoChannelContent channel={channel} />
      )}
    </AiDetailLayout>
  );
}
