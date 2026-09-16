import { useMemo, useState } from 'react';

import {
  buildFaqJsonLd,
  cutSegmentsBetween,
  filterChannels,
  getChannelsData,
  tagLabelMap,
  type Segment,
} from '@/lib/seo-content';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { AiHomeCta } from '@/blocks/ai-home-cta';
import { AiHomeFaq, getHomeFaqItems } from '@/blocks/ai-home-faq';
import { ProductDirectoryPreview } from '@/blocks/product-directory-preview';
import { AiIndexFooter, AiIndexHeader } from '@/components/ai-index-chrome';
import { ChannelGrid } from '@/components/channel-grid';
import { Button } from '@/components/ui/button';
import { Component as VibeToPromptAiInput } from '@/components/ui/vibe-to-prompt-ai-input';

/**
 * Directory-first homepage: the browsable channel grid (tag filters)
 * comes first, the long-form SEO copy from `content/pages/home.md` follows
 * below. The MD's "What's on tonight" tagged grids are cut. The interactive
 * directory above replaces them.
 */
export function HomeDirectory({
  h1,
  segments,
}: {
  h1: string;
  segments: Segment[];
}) {
  const [activeTag, setActiveTag] = useState('all');

  const { channels, filterTags } = getChannelsData();
  const tagLabels = tagLabelMap();

  const articleSegments = useMemo(
    () =>
      cutSegmentsBetween(
        segments,
        /<h2[^>]*>[^<]*What's on tonight/,
        /<h2[^>]*>[^<]*Watching is directing/
      ),
    [segments]
  );

  const filteredChannels = useMemo(() => {
    return channels.filter((channel) => {
      const matchesTag =
        activeTag === 'all' || channel.tags.includes(activeTag);
      return matchesTag;
    });
  }, [activeTag, channels]);

  const clearFilters = () => {
    setActiveTag('all');
  };

  const hasFilters = activeTag !== 'all';
  const faqJsonLd = buildFaqJsonLd(
    getHomeFaqItems().map(({ question, answer }) => ({
      q: question,
      a: answer,
    }))
  );
  const chromeContent = {
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
    browseHref: '#directory',
    categoriesHref: '/tv-show-generator',
  };

  return (
    <div className="ai-index-page">
      <AiIndexHeader content={chromeContent} />
      <main>
        <div className="ai-product-catalog-page">
          <VibeToPromptAiInput
            copy={{
              eyebrow: m['seo.home.hero_prompt_eyebrow'](),
              title: h1,
              description: m['seo.home.hero_description'](),
              inputLabel: m['seo.home.hero_input_label'](),
              placeholder: m['seo.home.hero_input_placeholder'](),
              generating: m['seo.home.hero_input_generating'](),
              reset: m['seo.home.hero_input_reset'](),
              keywordLabel: m['seo.home.hero_input_keyword_label'](),
              baseTags: [
                m['seo.home.hero_input_tag_format'](),
                m['seo.home.hero_input_tag_context'](),
                m['seo.home.hero_input_tag_signal'](),
                m['seo.home.hero_input_tag_rhythm'](),
              ],
            }}
          />
        </div>

        <section
          className="ai-index-shell ai-index-section seo-home-directory"
          id="directory"
          aria-labelledby="directory-title"
        >
          <div className="ai-index-section-head">
            <p className="ai-index-eyebrow">{m['seo.home.eyebrow']()}</p>
            <h2
              id="directory-title"
              className="ai-index-section-title seo-home-directory-title"
            >
              {m['seo.home.directory_title']()}
            </h2>
            <p className="ai-index-section-description">
              {m['seo.home.directory_description']()}
            </p>
          </div>

          <div className="ai-index-tag-filter">
            <button
              type="button"
              className={cn(
                'ai-index-tag-button',
                activeTag === 'all' && 'is-active'
              )}
              onClick={() => setActiveTag('all')}
            >
              {m['catalog.filter.all']()}
            </button>
            {filterTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                className={cn(
                  'ai-index-tag-button',
                  activeTag === tag.key && 'is-active'
                )}
                onClick={() => setActiveTag(tag.key)}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="ai-index-filter-summary" aria-live="polite">
            <span>
              {m['seo.home.results']({ count: filteredChannels.length })}
            </span>
            {hasFilters && (
              <button
                type="button"
                className="ai-index-clear"
                onClick={clearFilters}
              >
                {m['catalog.filter.clear']()}
              </button>
            )}
          </div>

          {filteredChannels.length ? (
            <ChannelGrid channels={filteredChannels} tagLabels={tagLabels} />
          ) : (
            <div className="ai-index-empty">
              <p>{m['seo.home.no_results']()}</p>
              <Button type="button" variant="outline" onClick={clearFilters}>
                {m['catalog.filter.clear']()}
              </Button>
            </div>
          )}
        </section>

        <ProductDirectoryPreview />

        <section
          className="ai-index-shell ai-index-section seo-home-article"
          aria-labelledby="home-article-title"
        >
          <div className="ai-index-section-head">
            <p className="ai-index-eyebrow">
              {m['seo.home.article_eyebrow']()}
            </p>
            <h2 id="home-article-title" className="ai-index-section-title">
              {m['seo.home.article_title']()}
            </h2>
            <p className="ai-index-section-description">
              {m['seo.home.article_description']()}
            </p>
          </div>
          {articleSegments.map((segment, index) =>
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
        </section>

        <AiHomeFaq />
        <AiHomeCta />
      </main>
      <AiIndexFooter content={chromeContent} />
    </div>
  );
}
