import MarkdownIt from 'markdown-it';

/**
 * SEO content pipeline.
 *
 * Page copy lives in `content/` (one JSON + one MD per page) and channel
 * facts live in `data/channels.json`. This module turns those files into
 * renderable data:
 *
 * - MD bodies are split on `<!-- grid: tag=… -->` markers into segments
 *   (rendered HTML chunks interleaved with channel-grid slots).
 * - Curated channel pages come from `content/channels/<slug>.{json,md}`;
 *   channels without curated copy fall back to an auto page built from
 *   their verified record in `data/channels.json`.
 * - Files are loaded via non-eager `import.meta.glob` so each route only
 *   pulls the content it renders.
 */

export interface SeoMeta {
  title: string;
  description: string;
}

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoPageJson {
  route: string;
  channel?: string;
  meta: SeoMeta;
  h1: string;
  keywords: { primary: string; secondary?: string[] };
  related?: string[];
  faqs?: SeoFaq[];
}

export type ChannelType = 'channel' | 'platform' | 'open-source';

export interface ChannelRecord {
  slug: string;
  name: string;
  maker: string;
  website: string;
  logo: string | null;
  type: ChannelType;
  format: string;
  tags: string[];
  airsOn: string | null;
  tagline: string;
  description: string;
  verifiedFacts: string[];
  lastVerifiedAt: string;
}

export interface ChannelsData {
  schemaVersion: number;
  lastVerifiedAt: string;
  filterTags: { key: string; label: string }[];
  channels: ChannelRecord[];
}

export interface GridSegment {
  kind: 'grid';
  tag?: string;
  type?: string;
  limit?: number;
}

export interface HtmlSegment {
  kind: 'html';
  html: string;
}

export type Segment = HtmlSegment | GridSegment;

export interface SeoPageData {
  slug: string;
  json: SeoPageJson;
  segments: Segment[];
}

export interface CuratedChannelData {
  slug: string;
  json: SeoPageJson;
  segments: Segment[];
}

const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});

const GRID_MARKER =
  /^<!--\s*grid:\s*(tag|type)=([a-z0-9-]+)(?:\s+limit=(\d+))?\s*-->$/;

const pagesJsonModules = import.meta.glob('/content/pages/*.json') as Record<
  string,
  () => Promise<unknown>
>;

const pagesMdModules = import.meta.glob('/content/pages/*.md', {
  query: '?raw',
}) as Record<string, () => Promise<unknown>>;

const channelJsonModules = import.meta.glob(
  '/content/channels/*.json'
) as Record<string, () => Promise<unknown>>;

const channelMdModules = import.meta.glob('/content/channels/*.md', {
  query: '?raw',
}) as Record<string, () => Promise<unknown>>;

const channelsDataModules = import.meta.glob('/data/channels.json', {
  eager: true,
}) as Record<string, unknown>;

const HIDDEN_CHANNEL_SLUGS = new Set([
  'infinite-tv',
  'sloptv',
  'wallie-v2',
  'airi',
  'aituber-kit',
]);

/** Glob loaders return the module namespace — unwrap `.default` when present. */
function unwrap<T>(mod: unknown): T {
  if (mod && typeof mod === 'object' && 'default' in (mod as object)) {
    return (mod as { default: T }).default;
  }
  return mod as T;
}

/**
 * Resolve a lazy glob module to its value. Depending on the environment
 * (dev SSR vs build) raw/JSON modules arrive as `{ default: value }` or as
 * `{ default: () => value }` — handle both.
 */
async function resolveGlob<T>(mod: unknown): Promise<T | undefined> {
  let value = unwrap<unknown>(mod);
  if (typeof value === 'function') {
    value = await (value as () => unknown)();
  }
  if (value && typeof value === 'object' && 'default' in (value as object)) {
    value = (value as { default: unknown }).default;
  }
  return value as T | undefined;
}

function parseSegments(md: string): Segment[] {
  const segments: Segment[] = [];
  let buffer: string[] = [];

  // The MD's leading `# H1` duplicates the h1 the page renders from JSON —
  // drop it before rendering so each page has exactly one H1.
  const body = md.replace(/^#[^\S\n]*[^\n]*\n/, '');

  const flush = () => {
    if (!buffer.length) return;
    const html = markdown.render(buffer.join('\n')).trim();
    if (html) segments.push({ kind: 'html', html });
    buffer = [];
  };

  for (const line of body.split('\n')) {
    const match = GRID_MARKER.exec(line.trim());
    if (match) {
      flush();
      const [, kind, value, limit] = match;
      segments.push({
        kind: 'grid',
        [kind]: value,
        ...(limit ? { limit: Number(limit) } : {}),
      } as GridSegment);
    } else {
      buffer.push(line);
    }
  }
  flush();

  return segments;
}

/**
 * Remove the run from the first `<h2>` matching `start` up to (excluding) the
 * first `<h2>` matching `end`, dropping any grid segments in between. The cut
 * works inside segments: a segment containing the start heading keeps only the
 * html before it, a segment containing the end heading keeps from it onward.
 * Used by the homepage, whose tagged grids are replaced by the interactive
 * directory. Returns the input unchanged when `start` doesn't match.
 */
export function cutSegmentsBetween(
  segments: Segment[],
  start: RegExp,
  end: RegExp
): Segment[] {
  const startsAt = segments.findIndex(
    (segment) => segment.kind === 'html' && start.test(segment.html)
  );
  if (startsAt === -1) return segments;
  const endsAt = segments.findIndex(
    (segment, index) =>
      index > startsAt && segment.kind === 'html' && end.test(segment.html)
  );

  const kept: Segment[] = segments
    .slice(0, startsAt)
    .filter((segment) => segment.kind !== 'grid');

  const startSegment = segments[startsAt] as HtmlSegment;
  const startMatch = start.exec(startSegment.html);
  const before = startMatch
    ? startSegment.html.slice(0, startMatch.index).trim()
    : startSegment.html;
  if (before) kept.push({ kind: 'html', html: before });

  if (endsAt === -1) return kept;

  const endSegment = segments[endsAt] as HtmlSegment;
  const endMatch = end.exec(endSegment.html);
  const after = endMatch
    ? endSegment.html.slice(endMatch.index).trim()
    : endSegment.html;
  if (after) kept.push({ kind: 'html', html: after });
  kept.push(...segments.slice(endsAt + 1));

  return kept;
}

/** Full page data for a static SEO page (`home`, `director`, …). Null if missing. */
export async function getSeoPage(slug: string): Promise<SeoPageData | null> {
  const [jsonMod, mdMod] = await Promise.all([
    pagesJsonModules[`/content/pages/${slug}.json`]?.(),
    pagesMdModules[`/content/pages/${slug}.md`]?.(),
  ]);
  const [json, md] = await Promise.all([
    resolveGlob<SeoPageJson>(jsonMod),
    resolveGlob<string>(mdMod),
  ]);
  if (!json || !md) return null;
  return { slug, json, segments: parseSegments(md) };
}

/** Curated copy for a channel page. Null when the channel has no MD yet. */
export async function getCuratedChannelPage(
  slug: string
): Promise<CuratedChannelData | null> {
  const [jsonMod, mdMod] = await Promise.all([
    channelJsonModules[`/content/channels/${slug}.json`]?.(),
    channelMdModules[`/content/channels/${slug}.md`]?.(),
  ]);
  const [json, md] = await Promise.all([
    resolveGlob<SeoPageJson>(jsonMod),
    resolveGlob<string>(mdMod),
  ]);
  if (!json || !md) return null;
  return { slug, json, segments: parseSegments(md) };
}

/** The visible channel roster — small, shared, and eagerly bundled. */
function getAllChannelsData(): ChannelsData {
  const data = unwrap<ChannelsData>(channelsDataModules['/data/channels.json']);
  if (!data) {
    throw new Error('data/channels.json not found');
  }
  return data;
}

export function getChannelsData(): ChannelsData {
  const data = getAllChannelsData();
  const channels = data.channels.filter(
    (channel) => !HIDDEN_CHANNEL_SLUGS.has(channel.slug)
  );
  const visibleTags = new Set(channels.flatMap((channel) => channel.tags));

  return {
    ...data,
    channels,
    filterTags: data.filterTags.filter((tag) => visibleTags.has(tag.key)),
  };
}

export function findChannel(slug: string): ChannelRecord | undefined {
  return getAllChannelsData().channels.find((channel) => channel.slug === slug);
}

export function filterChannels(
  filter: {
    tag?: string;
    type?: string;
    limit?: number;
  },
  source?: ChannelRecord[]
): ChannelRecord[] {
  let channels = source ?? getChannelsData().channels;
  if (filter.tag) {
    channels = channels.filter((channel) => channel.tags.includes(filter.tag!));
  }
  if (filter.type) {
    channels = channels.filter((channel) => channel.type === filter.type);
  }
  if (filter.limit) {
    channels = channels.slice(0, filter.limit);
  }
  return channels;
}

/** Channels sharing the most tags with `slug` (excluding itself). */
export function relatedChannels(slug: string, limit = 3): ChannelRecord[] {
  const all = getChannelsData().channels;
  const self = all.find((channel) => channel.slug === slug);
  if (!self) return all.slice(0, limit);

  return all
    .filter((channel) => channel.slug !== slug)
    .map((channel) => ({
      channel,
      score: channel.tags.filter((tag) => self.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ channel }) => channel);
}

/** label map for tag chips, e.g. `realtime-low-latency` → "Realtime / Low-latency". */
export function tagLabelMap(): Record<string, string> {
  return Object.fromEntries(
    getChannelsData().filterTags.map(({ key, label }) => [key, label])
  );
}

/** FAQPage JSON-LD for a page's faqs — null when there are none. */
export function buildFaqJsonLd(faqs?: SeoFaq[]): string | null {
  if (!faqs?.length) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  });
}

/** Auto-generated meta for channels without curated copy (batch 2 upgrades these). */
export function autoChannelMeta(channel: ChannelRecord): SeoMeta {
  const title = `${channel.name} AI Livestream`.slice(0, 60);
  const description =
    channel.description.length > 160
      ? `${channel.description.slice(0, 157).trimEnd()}…`
      : channel.description;
  return { title, description };
}
