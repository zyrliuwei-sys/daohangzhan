import {
  getChannelsData,
  tagLabelMap,
  type Segment,
  type SeoFaq,
} from '@/lib/seo-content';
import { m } from '@/paraglide/messages.js';
import { AiIndexFooter, AiIndexHeader } from '@/components/ai-index-chrome';
import { SeoContentPage } from '@/components/seo-content-page';

/**
 * Zero-config shell for the static SEO pages (`home`, `director`,
 * `tv-show-generator`, …). Wires chrome + channel data around the
 * SeoContentPage component.
 */
export function SeoPage({
  data,
}: {
  data: {
    h1: string;
    segments: Segment[];
    faqs?: SeoFaq[];
  };
}) {
  const chrome = {
    browse: m['seo.nav.watch'](),
    categories: m['seo.nav.formats'](),
    submit: m['catalog.nav.submit'](),
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

  const { channels } = getChannelsData();

  return (
    <>
      <AiIndexHeader content={chrome} />
      <main className="ai-index-shell seo-main">
        <SeoContentPage
          h1={data.h1}
          segments={data.segments}
          faqs={data.faqs}
          channels={channels}
          tagLabels={tagLabelMap()}
        />
      </main>
      <AiIndexFooter content={chrome} />
    </>
  );
}
