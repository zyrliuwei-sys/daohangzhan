import {
  buildFaqJsonLd,
  filterChannels,
  type ChannelRecord,
  type Segment,
  type SeoFaq,
} from '@/lib/seo-content';
import { ChannelGrid } from '@/components/channel-grid';

/**
 * Renders one SEO page body: H1, markdown segments, and channel grids at the
 * `<!-- grid: … -->` marker positions. FAQPage JSON-LD is injected when the
 * page JSON carries faqs. All content arrives via props.
 */
export function SeoContentPage({
  h1,
  segments,
  faqs,
  channels,
  tagLabels,
  showHeading = true,
}: {
  h1: string;
  segments: Segment[];
  faqs?: SeoFaq[];
  channels: ChannelRecord[];
  tagLabels: Record<string, string>;
  showHeading?: boolean;
}) {
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <article className="seo-article">
      {showHeading && <h1 className="seo-article-h1">{h1}</h1>}
      {segments.map((segment, index) =>
        segment.kind === 'html' ? (
          <div
            key={index}
            className="seo-article-body"
            dangerouslySetInnerHTML={{ __html: segment.html }}
          />
        ) : (
          <ChannelGrid
            key={index}
            channels={filterChannels(segment, channels)}
            tagLabels={tagLabels}
          />
        )
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}
    </article>
  );
}
