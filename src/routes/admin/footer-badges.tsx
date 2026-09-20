import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { parseFooterBadgeMarkup } from '@/features/footer-badges/markup';
import {
  MAX_FOOTER_BADGES,
  type FooterBadge,
} from '@/features/footer-badges/types';
import { ArrowDown, ArrowUp, BadgeCheck, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { useRouter } from '@/core/i18n/navigation';
import { apiGet, apiPost } from '@/lib/api-client';
import { m } from '@/paraglide/messages.js';
import { useUserPermissions } from '@/hooks/use-user-permissions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const queryKey = ['admin-footer-badges'];

function AdminFooterBadgesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const permissionsQuery = useUserPermissions();
  const isSuperAdmin =
    permissionsQuery.data?.permissions?.includes('*') === true;
  const [markup, setMarkup] = useState('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (permissionsQuery.isSuccess && !isSuperAdmin) {
      router.replace('/admin');
    }
  }, [isSuperAdmin, permissionsQuery.isSuccess, router]);

  const badgesQuery = useQuery({
    queryKey,
    queryFn: () => apiGet<FooterBadge[]>('/api/admin/footer-badges'),
    enabled: isSuperAdmin,
  });
  const badges = badgesQuery.data ?? [];

  const saveMutation = useMutation({
    mutationFn: (nextBadges: FooterBadge[]) =>
      apiPost<FooterBadge[]>('/api/admin/footer-badges', {
        badges: nextBadges,
      }),
    onSuccess: (savedBadges) => {
      queryClient.setQueryData(queryKey, savedBadges);
      queryClient.invalidateQueries({ queryKey: ['public-config'] });
      toast.success(m['admin.footer_badges.saved']());
      setMarkup('');
      setInputError(false);
    },
    onError: () => toast.error(m['admin.footer_badges.save_error']()),
  });

  useEffect(() => {
    if (badgesQuery.isError && isSuperAdmin) {
      toast.error(m['admin.footer_badges.load_error']());
    }
  }, [badgesQuery.isError, isSuperAdmin]);

  function save(nextBadges: FooterBadge[]) {
    saveMutation.mutate(nextBadges);
  }

  function addBadge() {
    setInputError(false);
    try {
      const parsed = parseFooterBadgeMarkup(markup);
      if (badges.length + parsed.length > MAX_FOOTER_BADGES) {
        setInputError(true);
        return;
      }
      save([...badges, ...parsed]);
    } catch {
      setInputError(true);
    }
  }

  function removeBadge(index: number) {
    save(badges.filter((_, itemIndex) => itemIndex !== index));
  }

  function moveBadge(index: number, direction: -1 | 1) {
    const next = badges.slice();
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    save(next);
  }

  if (!permissionsQuery.isSuccess || !isSuperAdmin) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  const saving = saveMutation.isPending;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary mt-1 rounded-lg p-2">
          <BadgeCheck className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {m['admin.footer_badges.title']()}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {m['admin.footer_badges.description']()}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{m['admin.footer_badges.add_title']()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label htmlFor="footer-badge-markup" className="text-sm font-medium">
            {m['admin.footer_badges.code_label']()}
          </label>
          <Textarea
            id="footer-badge-markup"
            value={markup}
            onChange={(event) => {
              setMarkup(event.target.value);
              setInputError(false);
            }}
            placeholder={m['admin.footer_badges.code_placeholder']()}
            rows={6}
            aria-invalid={inputError}
            aria-describedby="footer-badge-help"
            className="font-mono text-xs"
            disabled={saving || badgesQuery.isLoading}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              id="footer-badge-help"
              className={
                inputError
                  ? 'text-destructive text-sm'
                  : 'text-muted-foreground text-sm'
              }
            >
              {inputError
                ? m['admin.footer_badges.invalid_code']()
                : m['admin.footer_badges.code_help']({
                    max: MAX_FOOTER_BADGES,
                  })}
            </p>
            <Button
              type="button"
              onClick={addBadge}
              disabled={saving || badgesQuery.isLoading || !markup.trim()}
            >
              {saving ? (
                m['admin.footer_badges.adding']()
              ) : (
                <>
                  <Plus data-icon="inline-start" />
                  {m['admin.footer_badges.add_button']()}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{m['admin.footer_badges.current_title']()}</CardTitle>
        </CardHeader>
        <CardContent>
          {badgesQuery.isLoading ? (
            <p className="text-muted-foreground text-sm">
              {m['admin.footer_badges.loading']()}
            </p>
          ) : badges.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {m['admin.footer_badges.empty']()}
            </p>
          ) : (
            <ul className="space-y-3">
              {badges.map((badge, index) => (
                <li
                  key={`${badge.href}:${badge.src}:${index}`}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-2">
                    <div className="flex min-h-12 items-center">
                      <img
                        src={badge.src}
                        alt={badge.alt}
                        width={badge.width ?? 250}
                        height={badge.height}
                        className="h-auto max-h-16 max-w-full"
                      />
                    </div>
                    <p className="text-muted-foreground truncate text-xs">
                      {badge.href}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={saving || index === 0}
                      onClick={() => moveBadge(index, -1)}
                      aria-label={m['admin.footer_badges.move_up']()}
                      title={m['admin.footer_badges.move_up']()}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={saving || index === badges.length - 1}
                      onClick={() => moveBadge(index, 1)}
                      aria-label={m['admin.footer_badges.move_down']()}
                      title={m['admin.footer_badges.move_down']()}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={saving}
                      onClick={() => removeBadge(index)}
                      aria-label={m['admin.footer_badges.remove']()}
                    >
                      <Trash2 data-icon="inline-start" />
                      {m['admin.footer_badges.remove']()}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute('/admin/footer-badges')({
  component: AdminFooterBadgesPage,
});
