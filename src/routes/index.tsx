import { createFileRoute, redirect } from '@tanstack/react-router';

/** Keep the brand root as a permanent alias of the keyword-focused homepage. */
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/ai-livestream', statusCode: 301 });
  },
});
