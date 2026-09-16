import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { buttonVariants } from '@/components/ui/button';

export function AiHomeCta() {
  return (
    <section
      className="ai-index-shell ai-index-submit-band ai-home-cta"
      aria-labelledby="home-cta-title"
    >
      <div>
        <p className="ai-home-cta-eyebrow">{m['catalog.home_cta.eyebrow']()}</p>
        <h2 id="home-cta-title">{m['catalog.home_cta.title']()}</h2>
        <p>{m['catalog.home_cta.description']()}</p>
      </div>
      <div className="ai-home-cta-actions">
        <Link
          href="/submit"
          className={cn(buttonVariants({ size: 'lg' }), 'ai-index-submit-cta')}
        >
          {m['catalog.home_cta.button']()}
          <ArrowUpRight className="size-4" />
        </Link>
        <Link href="/products" className="ai-home-cta-secondary">
          {m['catalog.home_cta.browse']()}
        </Link>
      </div>
    </section>
  );
}
