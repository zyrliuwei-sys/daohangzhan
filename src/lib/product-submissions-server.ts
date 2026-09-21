import { createServerFn } from '@tanstack/react-start';

import {
  getProduct,
  getProducts,
  toCatalogProduct,
  type CatalogLocale,
} from '@/lib/mock-ai-products';

/**
 * Product submissions are database-backed. Keep the database module behind a
 * server function so client-side route navigation never tries to execute
 * Drizzle in the browser.
 */
export const getPublishedProductFn = createServerFn()
  .inputValidator((data: { slug: string; locale: CatalogLocale }) => data)
  .handler(async ({ data }) => {
    try {
      const { getPublishedProductSubmission } =
        await import('@/modules/product-submissions/service');
      const product = await getPublishedProductSubmission(data.slug);
      return product ? toCatalogProduct(product, data.locale) : null;
    } catch (error) {
      console.error('[product-submissions] detail lookup failed', error);
      return null;
    }
  });

export const getCatalogProductFn = createServerFn()
  .inputValidator((data: { slug: string; locale: CatalogLocale }) => data)
  .handler(async ({ data }) => {
    let archivedSlugs: string[] = [];
    try {
      const { getPublishedProductSubmission, listArchivedStaticProductSlugs } =
        await import('@/modules/product-submissions/service');
      const submittedProduct = await getPublishedProductSubmission(data.slug);
      if (submittedProduct) {
        return toCatalogProduct(submittedProduct, data.locale);
      }
      archivedSlugs = await listArchivedStaticProductSlugs();
    } catch (error) {
      console.error(
        '[product-submissions] catalog detail lookup failed',
        error
      );
    }

    if (archivedSlugs.includes(data.slug)) return null;
    return getProduct(data.slug, data.locale);
  });

export const listPublishedProductsFn = createServerFn()
  .inputValidator((data: { locale: CatalogLocale }) => data)
  .handler(async ({ data }) => {
    try {
      const { listPublishedProductSubmissions } =
        await import('@/modules/product-submissions/service');
      const products = await listPublishedProductSubmissions();
      return products.map((product) => toCatalogProduct(product, data.locale));
    } catch (error) {
      console.error('[product-submissions] list lookup failed', error);
      return [];
    }
  });

export const listCatalogProductsFn = createServerFn()
  .inputValidator((data: { locale: CatalogLocale }) => data)
  .handler(async ({ data }) => {
    let submittedProducts: Array<Parameters<typeof toCatalogProduct>[0]> = [];
    let archivedSlugs: string[] = [];
    try {
      const {
        listArchivedStaticProductSlugs,
        listPublishedProductSubmissions,
      } = await import('@/modules/product-submissions/service');
      [submittedProducts, archivedSlugs] = await Promise.all([
        listPublishedProductSubmissions(),
        listArchivedStaticProductSlugs(),
      ]);
    } catch (error) {
      console.error('[product-submissions] catalog list lookup failed', error);
    }
    const archived = new Set(archivedSlugs);
    const staticProducts = getProducts(data.locale).filter(
      (product) => !archived.has(product.slug)
    );

    const catalogProducts = [
      ...submittedProducts.map((product) =>
        toCatalogProduct(product, data.locale)
      ),
      ...staticProducts,
    ];

    // A submitted product can already exist in the curated static catalog with
    // a different slug. Prefer the submitted record because it appears first
    // and carries the latest public description, but only render one card.
    const seenProducts = new Set<string>();
    return catalogProducts.filter((product) => {
      const name = product.name.trim().toLowerCase().replace(/\s+/g, ' ');
      const key = `${name}::${product.sourceDomain.toLowerCase()}`;
      if (seenProducts.has(key)) return false;
      seenProducts.add(key);
      return true;
    });
  });
