// Client-side product search shared by the homepage search box and the
// directory grid. Name/alias matches always rank above maker/tag/tagline
// matches; multi-word queries fall back to matching every word anywhere.

export interface SearchableProduct {
  name: string;
  aliases?: string[];
  maker?: string;
  description?: string;
  tagline?: string;
  tagNames?: string[];
  categoryName?: string;
}

/** Lowercase and drop punctuation/spacing so "LM Studio" matches "lmstudio". */
function normalize(value: string) {
  return value.toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
}

function scoreName(name: string, q: string) {
  const normalized = normalize(name);
  if (normalized === q) return 100;
  if (normalized.startsWith(q)) return 80;
  const words = name.toLowerCase().split(/[\s\-_.]+/);
  if (words.some((word) => normalize(word).startsWith(q))) return 70;
  if (normalized.includes(q)) return 60;
  return 0;
}

/** Higher is better; 0 means no match. */
export function scoreProduct(product: SearchableProduct, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const nameScore = scoreName(product.name, q);
  if (nameScore) return nameScore;
  // Aliases rank just below the same kind of match on the real name.
  const aliasScore = Math.max(
    0,
    ...(product.aliases ?? []).map((alias) => scoreName(alias, q))
  );
  if (aliasScore) return aliasScore - 5;

  if (product.maker && normalize(product.maker).includes(q)) return 40;
  const secondary = [
    ...(product.tagNames ?? []),
    product.categoryName ?? '',
    product.tagline ?? '',
  ];
  if (secondary.some((text) => normalize(text).includes(q))) return 20;

  // "vikas photo prompts": every word must appear somewhere in the listing.
  const tokens = query.split(/\s+/).map(normalize).filter(Boolean);
  if (tokens.length > 1) {
    const haystack = normalize(
      [
        product.name,
        ...(product.aliases ?? []),
        product.maker ?? '',
        ...secondary,
        product.description ?? '',
      ].join(' ')
    );
    if (tokens.every((token) => haystack.includes(token))) return 10;
  }
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
