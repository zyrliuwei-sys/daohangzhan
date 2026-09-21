import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { getAuth } from '@/core/auth';
import {
  archiveProductSubmission,
  archiveStaticProductSlug,
  createProductSubmission,
  listAllProductSubmissions,
  listArchivedStaticProductSlugs,
  PRODUCT_SUBMISSION_CATEGORIES,
} from '@/modules/product-submissions/service';
import { hasPermission } from '@/modules/rbac/service';
import { getProducts } from '@/lib/mock-ai-products';
import { respData, respErr, respOk, respPage } from '@/lib/resp';

const productSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  website: z
    .string()
    .trim()
    .url()
    .refine((value) => ['http:', 'https:'].includes(new URL(value).protocol)),
  category: z.enum(PRODUCT_SUBMISSION_CATEGORIES),
  description: z.string().trim().min(20).max(2000),
  email: z.string().trim().email().max(320),
});

async function checkAdmin(request: Request) {
  const auth = getAuth();
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) throw new Error('Unauthorized');
  if (!(await hasPermission(session.user.id, 'admin.*'))) {
    throw new Error('Forbidden');
  }
  return session;
}

async function GET({ request }: { request: Request }) {
  try {
    await checkAdmin(request);
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get('pageSize') || '20'))
    );
    const search = searchParams.get('search') || undefined;
    const [submittedProducts, archivedSlugs] = await Promise.all([
      listAllProductSubmissions(),
      listArchivedStaticProductSlugs(),
    ]);
    const archived = new Set(archivedSlugs);
    const staticProducts = getProducts('en').map((product) => ({
      id: `static:${product.slug}`,
      slug: product.slug,
      name: product.name,
      website: product.website,
      category: product.category,
      description: product.description,
      email: '',
      status: archived.has(product.slug) ? 'archived' : 'published',
      createdAt: product.sourceUpdatedAt,
      updatedAt: product.sourceUpdatedAt,
      source: 'catalog' as const,
    }));
    const submitted = submittedProducts.map((product) => ({
      ...product,
      source: 'submission' as const,
      createdAt:
        product.createdAt instanceof Date
          ? product.createdAt.toISOString()
          : String(product.createdAt ?? ''),
      updatedAt:
        product.updatedAt instanceof Date
          ? product.updatedAt.toISOString()
          : String(product.updatedAt ?? ''),
    }));
    const normalizedSearch = search?.trim().toLowerCase();
    const filtered = [...submitted, ...staticProducts]
      .filter((product) => {
        if (!normalizedSearch) return true;
        return [
          product.name,
          product.slug,
          product.website,
          product.category,
          product.description,
          product.email,
        ].some((value) => value.toLowerCase().includes(normalizedSearch));
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    const total = filtered.length;
    const items = filtered.slice((page - 1) * pageSize, page * pageSize);
    return respPage(items, total);
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}

async function POST({ request }: { request: Request }) {
  try {
    await checkAdmin(request);
    const parsed = productSubmissionSchema.safeParse(
      await request.json().catch(() => null)
    );
    if (!parsed.success) return respErr('Please check the submitted fields.');

    const result = await createProductSubmission(parsed.data);
    return respData(result);
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}

async function DELETE({ request }: { request: Request }) {
  try {
    await checkAdmin(request);
    const id = new URL(request.url).searchParams.get('id');
    if (!id) return respErr('ID is required');
    if (id.startsWith('static:')) {
      await archiveStaticProductSlug(id.slice('static:'.length));
    } else {
      await archiveProductSubmission(id);
    }
    return respOk();
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}

export const Route = createFileRoute('/api/admin/product-submissions')({
  server: {
    handlers: { GET, POST, DELETE },
  },
});
