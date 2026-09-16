import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  AiIndexFooter,
  AiIndexHeader,
  type AiIndexChromeContent,
} from '@/components/ai-index-chrome';
import { AiProductLogo } from '@/components/ai-product-logo';

export interface AiDetailMetaItem {
  label: string;
  value: ReactNode;
}

export function AiDetailLayout({
  chromeContent,
  backHref,
  backLabel,
  visual,
  name,
  logo,
  website,
  eyebrow,
  tagline,
  meta,
  primaryAction,
  secondaryAction,
  children,
  pageClassName,
}: {
  chromeContent: AiIndexChromeContent;
  backHref: string;
  backLabel: string;
  visual: ReactNode;
  name: string;
  logo?: string;
  website?: string;
  eyebrow: string;
  tagline: string;
  meta: AiDetailMetaItem[];
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
  children: ReactNode;
  pageClassName?: string;
}) {
  return (
    <div className={cn('ai-index-page', pageClassName)}>
      <AiIndexHeader content={chromeContent} />
      <main className="ai-index-shell ai-index-detail">
        <Link href={backHref} className="ai-index-back">
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>

        <div className="ai-index-detail-grid">
          <div className="ai-index-detail-media">{visual}</div>
          <article>
            <div className="ai-index-detail-brand">
              <AiProductLogo name={name} src={logo} website={website} large />
              <div>
                <p className="ai-index-eyebrow">{eyebrow}</p>
                <h1>{name}</h1>
              </div>
            </div>
            <p className="ai-index-detail-lede">{tagline}</p>
            <dl className="ai-index-detail-meta">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="ai-index-detail-actions">
              {primaryAction}
              {secondaryAction}
            </div>
          </article>
        </div>

        {children}
      </main>
      <AiIndexFooter content={chromeContent} />
    </div>
  );
}
