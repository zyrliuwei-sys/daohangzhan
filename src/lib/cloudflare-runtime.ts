/**
 * Cloudflare's runtime bindings are attached by src/server.ts at the start of
 * each request. Do not snapshot the runtime check at module evaluation time:
 * that happens before __CF_ENV__ exists in a Worker.
 */
export function getCloudflareEnv(): Record<string, any> | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const runtime = globalThis as typeof globalThis & {
    __CF_ENV__?: Record<string, any>;
    __env__?: Record<string, any>;
  };
  return runtime.__CF_ENV__ ?? runtime.__env__;
}

export function isCloudflareWorkerRuntime(): boolean {
  if (typeof globalThis === 'undefined') return false;
  const runtime = globalThis as typeof globalThis & {
    Cloudflare?: unknown;
    __CF_ENV__?: unknown;
    __env__?: unknown;
  };
  return (
    (typeof navigator !== 'undefined' &&
      navigator.userAgent === 'Cloudflare-Workers') ||
    'Cloudflare' in runtime ||
    '__CF_ENV__' in runtime ||
    '__env__' in runtime
  );
}
