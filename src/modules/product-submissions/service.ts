import { and, count, desc, eq, inArray, like, or, type SQL } from 'drizzle-orm';

import { db } from '@/core/db';
import {
  config,
  productSubmission,
  type NewProductSubmission,
} from '@/config/db/schema';
import { getUuid } from '@/lib/hash';
import { getProducts } from '@/lib/mock-ai-products';

const ARCHIVED_STATIC_SLUGS_CONFIG = 'product_catalog.archived_static_slugs';

export const PRODUCT_SUBMISSION_STATUS = {
  /** Submitted from the public form; hidden until an admin approves it. */
  PENDING: 'pending',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
} as const;

export type ProductSubmissionStatus =
  (typeof PRODUCT_SUBMISSION_STATUS)[keyof typeof PRODUCT_SUBMISSION_STATUS];

export const PRODUCT_SUBMISSION_CATEGORIES = [
  'realtime',
  'text-to-video',
  'image-to-video',
  'avatar-live',
  'video-editing',
  'workflow',
  'assistant',
  'research',
  'models',
  'coding',
  'audio',
  'writing',
] as const;

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

/** Host + path without www/trailing slash, so URL variants compare equal. */
export function normalizeWebsite(website: string) {
  try {
    const url = new URL(website);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    return `${host}${path}`;
  } catch {
    return website.trim().toLowerCase();
  }
}

/**
 * Whether this website is already listed (curated catalog or an approved
 * submission) or waiting for review. Rejected/archived ones may resubmit.
 */
export async function findExistingProductWebsite(
  website: string
): Promise<'published' | 'pending' | null> {
  const target = normalizeWebsite(website);
  const archivedStatic = new Set(await listArchivedStaticProductSlugs());
  const inCatalog = getProducts('en').some(
    (product) =>
      !archivedStatic.has(product.slug) &&
      normalizeWebsite(product.website) === target
  );
  if (inCatalog) return 'published';

  const rows = await db()
    .select({
      website: productSubmission.website,
      status: productSubmission.status,
    })
    .from(productSubmission)
    .where(
      inArray(productSubmission.status, [
        PRODUCT_SUBMISSION_STATUS.PUBLISHED,
        PRODUCT_SUBMISSION_STATUS.PENDING,
      ])
    );
  const matches = (rows as Array<{ website: string; status: string }>).filter(
    (row) => normalizeWebsite(row.website) === target
  );
  if (matches.some((row) => row.status === PRODUCT_SUBMISSION_STATUS.PUBLISHED))
    return 'published';
  return matches.length ? 'pending' : null;
}

/**
 * Create a product submission. Public submissions default to `pending` and
 * stay hidden until approved; admins create already-published entries.
 * The UUID suffix keeps repeated submissions with the same name unique.
 */
export async function createProductSubmission(
  input: CreateProductSubmissionInput,
  status: ProductSubmissionStatus = PRODUCT_SUBMISSION_STATUS.PENDING
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
    status,
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

export async function listAllProductSubmissions() {
  return db()
    .select()
    .from(productSubmission)
    .orderBy(desc(productSubmission.createdAt));
}

export async function listArchivedStaticProductSlugs() {
  const [row] = await db()
    .select({ value: config.value })
    .from(config)
    .where(eq(config.name, ARCHIVED_STATIC_SLUGS_CONFIG))
    .limit(1);

  if (!row?.value) return [];

  try {
    const parsed: unknown = JSON.parse(row.value);
    return Array.isArray(parsed)
      ? parsed.filter((slug): slug is string => typeof slug === 'string')
      : [];
  } catch {
    return [];
  }
}

export async function archiveStaticProductSlug(slug: string) {
  const archivedSlugs = new Set(await listArchivedStaticProductSlugs());
  archivedSlugs.add(slug);
  const value = JSON.stringify([...archivedSlugs]);

  await db().transaction(async (tx) => {
    const [existing] = await tx
      .select({ name: config.name })
      .from(config)
      .where(eq(config.name, ARCHIVED_STATIC_SLUGS_CONFIG))
      .limit(1);

    if (existing) {
      await tx
        .update(config)
        .set({ value })
        .where(eq(config.name, ARCHIVED_STATIC_SLUGS_CONFIG));
    } else {
      await tx
        .insert(config)
        .values({ name: ARCHIVED_STATIC_SLUGS_CONFIG, value });
    }
  });
}

export async function listProductSubmissions(params: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { search, page = 1, pageSize = 20 } = params;
  const offset = (page - 1) * pageSize;
  const conditions: SQL[] = [];

  if (search) {
    conditions.push(
      or(
        like(productSubmission.name, `%${search}%`),
        like(productSubmission.slug, `%${search}%`),
        like(productSubmission.website, `%${search}%`),
        like(productSubmission.email, `%${search}%`)
      )!
    );
  }

  const where = conditions.length ? and(...conditions) : undefined;
  const [totalResult] = await db()
    .select({ count: count() })
    .from(productSubmission)
    .where(where);
  const items = await db()
    .select()
    .from(productSubmission)
    .where(where)
    .orderBy(desc(productSubmission.createdAt))
    .limit(pageSize)
    .offset(offset);

  return { items, total: totalResult.count };
}

export async function archiveProductSubmission(id: string) {
  await db()
    .update(productSubmission)
    .set({ status: PRODUCT_SUBMISSION_STATUS.ARCHIVED })
    .where(eq(productSubmission.id, id));
}

export async function setProductSubmissionStatus(
  id: string,
  status: ProductSubmissionStatus
) {
  await db()
    .update(productSubmission)
    .set({ status })
    .where(eq(productSubmission.id, id));
}

export async function getPublishedProductSubmission(slug: string) {
  const [result] = await db()
    .select()
    .from(productSubmission)
    .where(
      and(
        eq(productSubmission.slug, slug),
        eq(productSubmission.status, PRODUCT_SUBMISSION_STATUS.PUBLISHED)
      )
    )
    .limit(1);
  return result;
}
