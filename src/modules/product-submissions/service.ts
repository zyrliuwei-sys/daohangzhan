import { desc, eq } from 'drizzle-orm';

import { db } from '@/core/db';
import {
  productSubmission,
  type NewProductSubmission,
} from '@/config/db/schema';
import { getUuid } from '@/lib/hash';

export const PRODUCT_SUBMISSION_STATUS = {
  PUBLISHED: 'published',
} as const;

export type CreateProductSubmissionInput = {
  name: string;
  website: string;
  category: string;
  description: string;
  email: string;
};

function slugPart(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

/**
 * Create and immediately publish a product submitted from the public form.
 * The UUID suffix keeps repeated submissions with the same name unique.
 */
export async function createProductSubmission(
  input: CreateProductSubmissionInput
) {
  const id = getUuid();
  const slug = `${slugPart(input.name) || 'product'}-${id.slice(0, 8)}`;
  const values: NewProductSubmission = {
    id,
    slug,
    name: input.name,
    website: input.website,
    category: input.category,
    description: input.description,
    email: input.email,
    status: PRODUCT_SUBMISSION_STATUS.PUBLISHED,
  };

  const [created] = await db()
    .insert(productSubmission)
    .values(values)
    .returning();
  return created;
}

export async function listPublishedProductSubmissions() {
  return db()
    .select()
    .from(productSubmission)
    .where(eq(productSubmission.status, PRODUCT_SUBMISSION_STATUS.PUBLISHED))
    .orderBy(desc(productSubmission.createdAt));
}

export async function getPublishedProductSubmission(slug: string) {
  const [result] = await db()
    .select()
    .from(productSubmission)
    .where(eq(productSubmission.slug, slug))
    .limit(1);

  if (result?.status !== PRODUCT_SUBMISSION_STATUS.PUBLISHED) return null;
  return result;
}
