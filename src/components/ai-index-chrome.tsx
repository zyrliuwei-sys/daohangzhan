import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { useSession } from '@/core/auth/client';
import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { cn } from '@/lib/utils';
import { FooterBadgeList } from '@/components/footer-badge-list';
import { SiteUserMenu } from '@/components/site-user-menu';
import { Button, buttonVariants } from '@/components/ui/button';

export interface AiIndexChromeContent {
  browse: string;
  categories: string;
  submit: string;
  signIn: string;
  menu: string;
  close: string;
  tagline: string;
  footerSubmit: string;
  footerBrowse: string;
  footerNote: string;
  /** Optional href overrides — defaults are absolute so they work from any page. */
  browseHref?: string;
  categoriesHref?: string;
  submitHref?: string;
}

export function AiIndexHeader({ content }: { content: AiIndexChromeContent }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="ai-index-header">
      <div className="ai-index-header-inner">
        <div className="ai-index-header-main">
          <Link
            href="/"
            className="ai-index-brand"
            onClick={() => setOpen(false)}
          >
            <span className="ai-index-brand-signal" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="sr-only">{envConfigs.app_name}</span>
          </Link>
          <nav className="ai-index-nav" aria-label="Primary">
            <Link href={content.browseHref ?? '/#directory'}>
              {content.browse}
            </Link>
            <Link href={content.categoriesHref ?? '/products#categories'}>
              {content.categories}
            </Link>
            <Link href={content.submitHref ?? '/submit'}>{content.submit}</Link>
          </nav>
          <div className="ai-index-header-actions">
            {user ? (
              <SiteUserMenu
                name={user.name || 'User'}
                email={user.email}
                image={user.image}
              />
            ) : (
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'ai-index-header-sign-in'
                )}
              >
                {content.signIn}
              </Link>
            )}
            <Link
              href="/submit"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'ai-index-header-submit'
              )}
            >
              {content.submit}
            </Link>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="ai-index-mobile-menu"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? content.close : content.menu}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <div className="ai-index-mobile-panel">
            <nav aria-label="Mobile">
              <Link
                href={content.browseHref ?? '/#directory'}
                onClick={() => setOpen(false)}
              >
                {content.browse}
              </Link>
              <Link
                href={content.categoriesHref ?? '/products#categories'}
                onClick={() => setOpen(false)}
              >
                {content.categories}
              </Link>
              <Link
                href={content.submitHref ?? '/submit'}
                onClick={() => setOpen(false)}
              >
                {content.submit}
              </Link>
            </nav>
            <div className="ai-index-mobile-tools">
              {user ? (
                <SiteUserMenu
                  name={user.name || 'User'}
                  email={user.email}
                  image={user.image}
                />
              ) : (
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'lg' }),
                    'ai-index-header-sign-in'
                  )}
                  onClick={() => setOpen(false)}
                >
                  {content.signIn}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function AiIndexFooter({
  content,
  showBadges = false,
}: {
  content: AiIndexChromeContent;
  showBadges?: boolean;
}) {
  return (
    <>
      {showBadges && (
        <div className="ai-index-shell ai-index-footer-badges">
          <FooterBadgeList />
        </div>
      )}
      <footer className="ai-index-footer">
        <div className="ai-index-shell ai-index-footer-inner">
          <Link href="/" className="ai-index-footer-brand">
            <span className="ai-index-brand-signal" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="sr-only">{envConfigs.app_name}</span>
          </Link>
          <span className="ai-index-footer-tagline">{content.tagline}</span>
          <div className="ai-index-footer-links">
            <Link href="/#directory">{content.footerBrowse}</Link>
            <Link href="/submit">{content.footerSubmit}</Link>
          </div>
          <span className="ai-index-footer-note">{content.footerNote}</span>
        </div>
      </footer>
    </>
  );
}
