import type { ReactNode } from 'react';

import { m } from '@/paraglide/messages.js';
import { AiIndexFooter, AiIndexHeader } from '@/components/ai-index-chrome';

/** Catalog header + footer around the blog index and post pages. */
export function BlogShell({ children }: { children: ReactNode }) {
  const chrome = {
    browse: m['catalog.nav.browse'](),
    categories: m['catalog.nav.categories'](),
    submit: m['catalog.nav.submit'](),
    blog: m['catalog.nav.blog'](),
    signIn: m['common.nav.sign_in'](),
    menu: m['catalog.nav.menu'](),
    close: m['catalog.nav.close'](),
    tagline: m['catalog.footer.tagline'](),
    footerSubmit: m['catalog.footer.submit'](),
    footerBrowse: m['catalog.footer.browse'](),
    footerNote: m['catalog.footer.note'](),
    categoriesHref: '/products',
  };

  return (
    <div className="ai-index-page flex min-h-screen flex-col">
      <AiIndexHeader content={chrome} />
      <main className="flex-1">{children}</main>
      <AiIndexFooter content={chrome} />
    </div>
  );
}
