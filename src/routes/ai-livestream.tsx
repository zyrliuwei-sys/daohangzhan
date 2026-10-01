import { createFileRoute, redirect } from '@tanstack/react-router';

/** Former homepage URL — permanently redirected to the AI tools directory. */
export const Route = createFileRoute('/ai-livestream')({
  beforeLoad: () => {
    throw redirect({ to: '/', statusCode: 301 });
  },
});
