import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { createProductSubmission } from '@/modules/product-submissions/service';
import { enforceMinIntervalRateLimit } from '@/lib/rate-limit';
import { respData, respErr } from '@/lib/resp';

const CATEGORY_VALUES = [
  'realtime',
  'text-to-video',
  'image-to-video',
  'avatar-live',
  'video-editing',
  'workflow',
] as const;

const submissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  website: z
    .string()
    .trim()
    .url()
    .refine((value) => ['http:', 'https:'].includes(new URL(value).protocol)),
  category: z.enum(CATEGORY_VALUES),
  description: z.string().trim().min(20).max(2000),
  email: z.string().trim().email().max(320),
});

async function POST({ request }: { request: Request }) {
  const limited = enforceMinIntervalRateLimit(request, {
    intervalMs: 20_000,
    keyPrefix: 'product-submission-create',
  });
  if (limited) return limited;

  try {
    const body = await request.json().catch(() => null);
    const parsed = submissionSchema.safeParse(body);
    if (!parsed.success) return respErr('Please check the submitted fields.');

    const product = await createProductSubmission(parsed.data);
    return respData({
      id: product.id,
      slug: product.slug,
      name: product.name,
    });
  } catch (error) {
    console.error('[product-submissions] create failed', error);
    return respErr('Unable to publish this product right now.');
  }
}

export const Route = createFileRoute('/api/product-submissions')({
  server: {
    handlers: { POST },
  },
});
