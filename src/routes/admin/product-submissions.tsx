import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  apiDelete,
  apiGet,
  apiPost,
  pageQuery,
  type PageResult,
} from '@/lib/api-client';
import { formatDateTime } from '@/lib/time';
import { m } from '@/paraglide/messages.js';
import { DataTable, type Column } from '@/components/data-table';
import { TextField } from '@/components/form-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

interface ProductSubmission {
  id: string;
  slug: string;
  name: string;
  website: string;
  category: string;
  description: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 20;
const CATEGORY_VALUES = [
  'realtime',
  'text-to-video',
  'image-to-video',
  'avatar-live',
  'video-editing',
  'workflow',
  'assistant',
  'research',
  'models',
  'coding',
  'audio',
  'writing',
] as const;

const productSchema = z.object({
  name: z.string().min(2),
  website: z.string().url(),
  category: z.enum(CATEGORY_VALUES),
  description: z.string().min(20),
  email: z.string().email(),
});

type ProductForm = z.infer<typeof productSchema>;

const emptyForm: ProductForm = {
  name: '',
  website: '',
  category: 'realtime',
  description: '',
  email: '',
};

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    realtime: m['catalog.category.realtime'](),
    'text-to-video': m['catalog.category.text_to_video'](),
    'image-to-video': m['catalog.category.image_to_video'](),
    'avatar-live': m['catalog.category.avatar_live'](),
    'video-editing': m['catalog.category.video_editing'](),
    workflow: m['catalog.category.workflow'](),
    assistant: m['catalog.category.assistant'](),
    research: m['catalog.category.research'](),
    models: m['catalog.category.models'](),
    coding: m['catalog.category.coding'](),
    audio: m['catalog.category.audio'](),
    writing: m['catalog.category.writing'](),
  };
  return labels[category] || category;
}

function ProductSubmissionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] =
    useState<ProductSubmission | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const listQuery = useQuery({
    queryKey: ['admin-product-submissions', page, debouncedSearch],
    queryFn: () =>
      apiGet<PageResult<ProductSubmission>>(
        pageQuery('/api/admin/product-submissions', {
          page,
          pageSize: PAGE_SIZE,
          search: debouncedSearch,
        })
      ),
    placeholderData: keepPreviousData,
  });

  const createForm = useForm({
    defaultValues: emptyForm,
    validators: { onSubmit: productSchema },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync(value);
    },
  });

  const createMutation = useMutation({
    mutationFn: (value: ProductForm) =>
      apiPost('/api/admin/product-submissions', value),
    onSuccess: () => {
      toast.success(m['admin.product_submissions.created']());
      setCreateOpen(false);
      createForm.reset();
      queryClient.invalidateQueries({
        queryKey: ['admin-product-submissions'],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiDelete(`/api/admin/product-submissions?id=${id}`),
    onSuccess: () => {
      toast.success(m['admin.product_submissions.deleted']());
      setDeletingProduct(null);
      queryClient.invalidateQueries({
        queryKey: ['admin-product-submissions'],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const columns: Column<ProductSubmission>[] = [
    {
      header: m['admin.product_submissions.name_col'](),
      cell: (product) => (
        <div className="min-w-[180px]">
          <div className="font-medium">{product.name}</div>
          <div className="text-muted-foreground font-mono text-xs">
            {product.slug}
          </div>
        </div>
      ),
    },
    {
      header: m['admin.product_submissions.website_col'](),
      cell: (product) => (
        <a
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex max-w-[220px] items-center gap-1 truncate hover:underline"
          title={product.website}
        >
          <span className="truncate">{product.website}</span>
          <ExternalLink className="size-3 shrink-0" />
        </a>
      ),
    },
    {
      header: m['admin.product_submissions.category_col'](),
      cell: (product) => categoryLabel(product.category),
    },
    {
      header: m['admin.product_submissions.email_col'](),
      cell: (product) => product.email || '—',
    },
    {
      header: m['admin.product_submissions.status_col'](),
      cell: (product) => (
        <Badge
          variant={product.status === 'published' ? 'default' : 'secondary'}
        >
          {product.status}
        </Badge>
      ),
    },
    {
      header: m['admin.product_submissions.created_at'](),
      cell: (product) => (
        <span className="text-muted-foreground text-sm">
          {formatDateTime(product.createdAt)}
        </span>
      ),
    },
    {
      header: m['admin.product_submissions.actions_col'](),
      className: 'w-[80px]',
      cell: (product) => (
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => setDeletingProduct(product)}
          aria-label={m['admin.product_submissions.delete']()}
        >
          <Trash2 className="size-3" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {m['admin.product_submissions.title']()}
          </h1>
          <p className="text-muted-foreground">
            {m['admin.product_submissions.description']()}
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors">
            <Plus className="size-4" />
            {m['admin.product_submissions.create']()}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {m['admin.product_submissions.create_title']()}
              </DialogTitle>
              <DialogDescription>
                {m['admin.product_submissions.create_description']()}
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                createForm.handleSubmit();
              }}
            >
              <div className="space-y-4 py-4">
                <createForm.Field name="name">
                  {(field) => (
                    <TextField
                      field={field}
                      label={m['admin.product_submissions.name_field']()}
                      placeholder={m[
                        'admin.product_submissions.name_placeholder'
                      ]()}
                    />
                  )}
                </createForm.Field>
                <createForm.Field name="website">
                  {(field) => (
                    <TextField
                      field={field}
                      label={m['admin.product_submissions.website_field']()}
                      placeholder="https://example.com"
                      type="url"
                    />
                  )}
                </createForm.Field>
                <createForm.Field name="category">
                  {(field) => (
                    <Field>
                      <FieldLabel>
                        {m['admin.product_submissions.category_field']()}
                      </FieldLabel>
                      <select
                        className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(
                            event.target.value as ProductForm['category']
                          )
                        }
                      >
                        {CATEGORY_VALUES.map((category) => (
                          <option key={category} value={category}>
                            {categoryLabel(category)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}
                </createForm.Field>
                <createForm.Field name="description">
                  {(field) => (
                    <Field>
                      <FieldLabel>
                        {m['admin.product_submissions.description_field']()}
                      </FieldLabel>
                      <Textarea
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder={m[
                          'admin.product_submissions.description_placeholder'
                        ]()}
                      />
                    </Field>
                  )}
                </createForm.Field>
                <createForm.Field name="email">
                  {(field) => (
                    <TextField
                      field={field}
                      label={m['admin.product_submissions.email_field']()}
                      placeholder="admin@example.com"
                      type="email"
                    />
                  )}
                </createForm.Field>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateOpen(false)}
                >
                  {m['admin.product_submissions.cancel']()}
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {m['admin.product_submissions.save']()}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={listQuery.data?.items ?? []}
            total={listQuery.data?.total ?? 0}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            rowKey={(product) => product.id}
            emptyText={m['admin.product_submissions.no_data']()}
            search={search}
            onSearchChange={setSearch}
            onRefresh={() => listQuery.refetch()}
            loading={listQuery.isFetching}
          />
        </CardContent>
      </Card>

      <Dialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {m['admin.product_submissions.delete_title']()}
            </DialogTitle>
            <DialogDescription>
              {m['admin.product_submissions.delete_confirm']({
                name: deletingProduct?.name || '',
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingProduct(null)}>
              {m['admin.product_submissions.cancel']()}
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending || !deletingProduct}
              onClick={() =>
                deletingProduct && deleteMutation.mutate(deletingProduct.id)
              }
            >
              {m['admin.product_submissions.confirm_delete']()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute('/admin/product-submissions')({
  component: ProductSubmissionsPage,
});
