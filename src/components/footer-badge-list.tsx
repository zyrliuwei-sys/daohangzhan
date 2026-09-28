import { useEffect, useState } from 'react';
import { DEFAULT_FOOTER_BADGES } from '@/features/footer-badges/defaults';
import { parseStoredFooterBadges } from '@/features/footer-badges/validation';

import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { usePublicConfig } from '@/hooks/use-public-config';

export function FooterBadgeList({ className }: { className?: string }) {
  const [hydrated, setHydrated] = useState(false);
  const { data } = usePublicConfig();
  const badges =
    data?.footer_badges === undefined
      ? DEFAULT_FOOTER_BADGES
      : parseStoredFooterBadges(data.footer_badges);

  useEffect(() => setHydrated(true), []);

  if (!hydrated || badges.length === 0) return null;

  return (
    <div
      className={cn('footer-badge-marquee', className)}
      aria-label={m['common.footer_badges.label']()}
      role="region"
    >
      <div className="footer-badge-marquee-viewport">
        <div className="footer-badge-marquee-track">
          {[false, true].map((duplicate) => (
            <div
              key={duplicate ? 'duplicate' : 'original'}
              className="footer-badge-marquee-group"
              aria-hidden={duplicate || undefined}
            >
              {badges.map((badge, index) => (
                <a
                  key={`${duplicate ? 'duplicate-' : ''}${badge.href}:${badge.src}:${index}`}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={duplicate ? -1 : undefined}
                  className="footer-badge-marquee-item"
                >
                  <img
                    src={badge.src}
                    alt={duplicate ? '' : badge.alt}
                    width={badge.width ?? 250}
                    height={badge.height}
                    loading="lazy"
                    className="footer-badge-marquee-image"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
