import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import { HomeDirectory } from '@/blocks/home-directory';

import { seoPageRouteOptions } from './-seo-route';

/** Primary keyword URL for the live AI channel directory. */
export const Route = createFileRoute('/ai-livestream')({
  ...seoPageRouteOptions('home', '/ai-livestream', AiLivestreamPage),
});

function AiLivestreamPage() {
  const data = useLoaderData({ strict: false });
  if (!data) return null;
  return <HomeDirectory h1={data.json.h1} segments={data.segments} />;
}
