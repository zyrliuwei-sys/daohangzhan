/**
 * Remote homepage capture used for products that do not have a curated local
 * screenshot yet, including newly submitted products.
 */
export function getWebsiteScreenshotUrl(website: string) {
  return `https://image.thum.io/get/width/1200/crop/800/noanimate/${website}`;
}
