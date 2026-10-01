// Client-side product search shared by the homepage search box and the
// directory grid. Name matches always rank above maker/tag/tagline matches.

export interface SearchableProduct {
  name: string;
  maker?: string;
  tagline?: string;
  tagNames?: string[];
  categoryName?: string;
}

/** Lowercase and drop punctuation/spacing so "LM Studio" matches "lmstudio". */
function normalize(value: string) {
  return value.toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
}

/** Higher is better; 0 means no match. */
export function scoreProduct(product: SearchableProduct, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const name = normalize(product.name);
  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  const words = product.name.toLowerCase().split(/[\s\-_.]+/);
  if (words.some((word) => normalize(word).startsWith(q))) return 70;
  if (name.includes(q)) return 60;

  if (product.maker && normalize(product.maker).includes(q)) return 40;
  const secondary = [
    ...(product.tagNames ?? []),
    product.categoryName ?? '',
    product.tagline ?? '',
  ];
  if (secondary.some((text) => normalize(text).includes(q))) return 20;
  return 0;
}

/** Products matching `query`, best match first (stable for equal scores). */
export function searchProducts<T extends SearchableProduct>(
  products: T[],
  query: string
): T[] {
  return products
    .map((product, index) => ({
      product,
      index,
      score: scoreProduct(product, query),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.product);
}
