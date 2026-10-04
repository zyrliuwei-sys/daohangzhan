import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft, Calendar } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { BlogShell } from '@/blocks/blog-shell';
import { MarkdownContent } from '@/components/markdown-content';
import { mdxComponents } from '@/components/mdx-components';
import {
  formatPostDate,
  loadLocalPost,
  RETIRED_POST_SLUGS,
} from '@/content/posts';
import { getBlogPostFn } from '@/content/posts/server';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    if (RETIRED_POST_SLUGS.includes(params.slug)) {
      throw redirect({ to: '/blog', statusCode: 301 });
    }
    const locale = getLocale();
    const post = await getBlogPostFn({
      data: { slug: params.slug, locale },
    });
    if (!post) throw notFound();
    return { locale, post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { locale, post } = loaderData;
    const urlFor = (loc: string) =>
      localizeUrl(`${envConfigs.app_url}/blog/${post.slug}`, {
        locale: loc as any,
      }).href;
    const canonical = urlFor(locale);
    const title = `${post.title} | ${envConfigs.app_name}`;
    const image = post.image
      ? new URL(post.image, envConfigs.app_url).href
      : undefined;
    return {
      meta: [
        { title },
        { name: 'description', content: post.description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: post.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: canonical },
        ...(image ? [{ property: 'og:image', content: image }] : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          'script:ld+json': {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            ...(image ? { image } : {}),
            datePublished: post.createdAt,
            inLanguage: locale,
            mainEntityOfPage: canonical,
            author: {
              '@type': 'Organization',
              name: post.authorName || envConfigs.app_name,
            },
            publisher: {
              '@type': 'Organization',
              name: envConfigs.app_name,
            },
          },
        },
      ],
      links: [
        { rel: 'canonical', href: canonical },
        // Local MDX posts exist in every locale; db posts are single-locale.
        ...(post.source === 'local'
          ? locales.map((loc) => ({
              rel: 'alternate',
              hrefLang: loc,
              href: urlFor(loc),
            }))
          : []),
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { locale, post } = Route.useLoaderData();

  // Local posts render their bundled MDX component; database posts render
  // raw markdown through MarkdownContent.
  const LocalContent =
    post.source === 'local' ? loadLocalPost(post.slug, locale)?.default : null;

  return (
    <BlogShell>
      <div className="px-6 py-12 md:px-8 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="size-4" />
            {m['blog.back_to_blog']()}
          </Link>

          <header className="border-border mt-8 mb-6 border-b pb-6">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-muted-foreground mt-3">{post.description}</p>
            )}
            <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatPostDate(post.createdAt, locale)}
              </span>
              {(post.authorName || post.authorImage) && (
                <span className="inline-flex items-center gap-2">
                  {post.authorImage && (
                    <img
                      src={post.authorImage}
                      alt={post.authorName || ''}
                      width={20}
                      height={20}
                      className="size-5 rounded-full object-cover"
                    />
                  )}
                  {post.authorName}
                </span>
              )}
            </div>
          </header>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="border-border mb-8 w-full rounded-2xl border object-cover"
            />
          )}

          {LocalContent ? (
            <div className="text-foreground/90 text-[15px] leading-7">
              <MDXProvider components={mdxComponents}>
                <LocalContent />
              </MDXProvider>
            </div>
          ) : (
            <MarkdownContent content={post.content || ''} />
          )}
        </article>
      </div>
    </BlogShell>
  );
}
