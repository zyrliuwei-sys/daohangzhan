import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import type { ChannelRecord } from '@/lib/seo-content';
import { AiProductLogo } from '@/components/ai-product-logo';

function displayCopy(value: string) {
  return value.replace(/[—–]/g, '-');
}

/**
 * Channel card grid — all content arrives via props.
 * Renders wherever a `<!-- grid: tag=… -->` marker sits in the page copy.
 */
export function ChannelGrid({
  channels,
  tagLabels,
}: {
  channels: ChannelRecord[];
  tagLabels: Record<string, string>;
}) {
  if (!channels.length) return null;

  return (
    <div className="seo-channel-grid">
      {channels.map((channel) => (
        <article key={channel.slug} className="seo-channel-card">
          <div className="seo-channel-card-head">
            <Link
              href={`/channel/${channel.slug}`}
              className="seo-channel-card-name"
            >
              <AiProductLogo
                name={channel.name}
                src={channel.logo ?? undefined}
                website={channel.website}
              />
              <h3>{channel.name}</h3>
            </Link>
            <a
              href={channel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="seo-channel-card-visit"
              aria-label={`Open the ${channel.name} official site`}
            >
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <p className="seo-channel-card-tagline">
            {displayCopy(channel.tagline)}
          </p>
          <p className="seo-channel-card-tags">
            {channel.tags
              .map((tag) => tagLabels[tag] ?? tag.replace(/-/g, ' '))
              .join(' · ')}
          </p>
        </article>
      ))}
    </div>
  );
}
