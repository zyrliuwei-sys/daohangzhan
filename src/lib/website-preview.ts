/**
 * Homepage capture used for products that do not have a curated local
 * screenshot yet, including newly submitted products.
 *
 * This is only the synchronous fallback used while catalog data is being
 * assembled. Detail loaders resolve it to a verified Microlink image URL
 * before rendering.
 */
export function getWebsiteScreenshotUrl(website: string) {
  return `https://image.thum.io/get/width/1200/crop/800/noanimate/${website}`;
}

const resolvedPreviewCache = new Map<string, Promise<string>>();

/** Resolve a stable public image URL so browsers never parse the provider's
 * JSON API response themselves. */
export function resolveWebsiteScreenshotUrl(website: string) {
  const cached = resolvedPreviewCache.get(website);
  if (cached) return cached;

  const result = (async () => {
    try {
      const captureUrl = new URL('https://api.microlink.io/');
      captureUrl.searchParams.set('url', website);
      captureUrl.searchParams.set('screenshot', 'true');
      captureUrl.searchParams.set('meta', 'false');
      const response = await fetch(captureUrl, {
        headers: { accept: 'application/json' },
      });
      if (response.ok) {
        const capture = (await response.json()) as {
          status?: string;
          data?: { screenshot?: { url?: string } };
        };
        const screenshotUrl = capture.data?.screenshot?.url;
        if (capture.status === 'success' && screenshotUrl) {
          return screenshotUrl;
        }
      }
    } catch (error) {
      console.error('[website-preview] capture resolution failed', error);
    }

    return getWebsiteScreenshotUrl(website);
  })();

  resolvedPreviewCache.set(website, result);
  return result;
}
