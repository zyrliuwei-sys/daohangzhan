import { createFileRoute } from '@tanstack/react-router';

import { seoPageRouteOptions } from './-seo-route';

export const Route = createFileRoute('/creators')({
  ...seoPageRouteOptions('creators', '/creators'),
});
