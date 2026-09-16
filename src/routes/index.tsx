import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import { HomeDirectory } from '@/blocks/home-directory';

import { seoPageRouteOptions } from './-seo-route';

export const Route = createFileRoute('/')({
  ...seoPageRouteOptions('home', '/', HomePage),
});

/**
 * The homepage is directory-first: the browsable channel grid leads, and the
 * long-form copy from `content/pages/home.md` renders below it.
 */
function HomePage() {
  const data = useLoaderData({ strict: false });
  if (!data) return null;
  return <HomeDirectory h1={data.json.h1} segments={data.segments} />;
}
