import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import {
  createProductSubmission,
  findExistingProductWebsite,
  PRODUCT_SUBMISSION_CATEGORIES,
} from '@/modules/product-submissions/service';
import { enforceMinIntervalRateLimit } from '@/lib/rate-limit';
import { respData, respErr } from '@/lib/resp';
import { m } from '@/paraglide/messages.js';

const submissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  website: z
    .string()
    .trim()
    .url()
    .refine((value) => ['http:', 'https:'].includes(new URL(value).protocol)),
  category: z.enum(PRODUCT_SUBMISSION_CATEGORIES),
  description: z.string().trim().min(20).max(2000),
  email: z.string().trim().email().max(320),
  // Submitter confirms this is a usable AI product (catalog policy).
  aiConfirmed: z.literal(true),
  // Honeypot: hidden from people, bots tend to fill it.
  company: z.string().optional(),
  locale: z.enum(['en', 'zh']).optional(),
});

async function POST({ request }: { request: Request }) {
  const body = await request.json().catch(() => null);
  const locale = body?.locale === 'zh' ? 'zh' : 'en';

  const limited = enforceMinIntervalRateLimit(request, {
    intervalMs: 20_000,
    keyPrefix: 'product-submission-create',
  });
  if (limited) {
    return respErr(m['catalog.submit.error_rate_limited']({}, { locale }));
  }

  try {
    const parsed = submissionSchema.safeParse(body);
    if (!parsed.success) {
      return respErr(m['catalog.submit.error_invalid']({}, { locale }));
    }

    const {
      company,
      aiConfirmed: _ai,
      locale: _locale,
      ...input
    } = parsed.data;
    // Pretend success so bots don't learn to skip the honeypot.
    if (company?.trim()) return respData({ status: 'pending' });

    const existing = await findExistingProductWebsite(input.website);
    if (existing === 'published') {
      return respErr(
        m['catalog.submit.error_duplicate_listed']({}, { locale })
      );
    }
    if (existing === 'pending') {
      return respErr(
        m['catalog.submit.error_duplicate_pending']({}, { locale })
      );
    }

    await createProductSubmission(input);
    return respData({ status: 'pending' });
  } catch (error) {
    console.error('[product-submissions] create failed', error);
    return respErr(m['catalog.submit.error']({}, { locale }));
  }
}

export const Route = createFileRoute('/api/product-submissions')({
  server: {
    handlers: { POST },
  },
});
