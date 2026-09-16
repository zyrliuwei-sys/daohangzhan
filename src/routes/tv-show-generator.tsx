import { createFileRoute } from '@tanstack/react-router';

import { seoPageRouteOptions } from './-seo-route';

export const Route = createFileRoute('/tv-show-generator')({
  ...seoPageRouteOptions('tv-show-generator', '/tv-show-generator'),
});
