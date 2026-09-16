import { createFileRoute } from '@tanstack/react-router';

import { seoPageRouteOptions } from './-seo-route';

export const Route = createFileRoute('/real-time')({
  ...seoPageRouteOptions('real-time', '/real-time'),
});
