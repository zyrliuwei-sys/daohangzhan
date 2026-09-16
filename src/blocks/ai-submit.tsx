import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { z } from 'zod';

import { Link } from '@/core/i18n/navigation';
import { apiPost } from '@/lib/api-client';
import { type CatalogLocale } from '@/lib/mock-ai-products';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { AiIndexFooter, AiIndexHeader } from '@/components/ai-index-chrome';
import { TextField } from '@/components/form-field';
import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

type ProductSubmissionPayload = {
  name: string;
  website: string;
  category: string;
  description: string;
  email: string;
};

export function AiSubmit({ locale: _locale }: { locale: CatalogLocale }) {
  const [createdProduct, setCreatedProduct] = useState<{
    slug: string;
    name: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState('');
  const productSubmissionMutation = useMutation({
    mutationFn: (payload: ProductSubmissionPayload) =>
      apiPost<{ slug: string; name: string }>(
        '/api/product-submissions',
        payload
      ),
  });
  const submitSchema = z.object({
    name: z.string().min(2, m['catalog.submit.validation.name']()),
    url: z
      .string()
      .url(m['catalog.submit.validation.url']())
      .refine((value) => {
        const protocol = new URL(value).protocol;
        return protocol === 'http:' || protocol === 'https:';
      }, m['catalog.submit.validation.url']()),
    category: z.string().min(1, m['catalog.submit.validation.category']()),
    description: z
      .string()
      .min(20, m['catalog.submit.validation.description']()),
    email: z.string().email(m['catalog.submit.validation.email']()),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      url: '',
      category: '',
      description: '',
      email: '',
    },
    validators: { onSubmit: submitSchema },
    onSubmit: async ({ value }) => {
      setSubmitError('');
      try {
        const product = await productSubmissionMutation.mutateAsync({
          name: value.name.trim(),
          website: value.url.trim(),
          category: value.category,
          description: value.description.trim(),
          email: value.email.trim(),
        });
        setCreatedProduct(product);
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : m['catalog.submit.error']()
        );
      }
    },
  });

  const chromeContent = {
    browse: m['catalog.nav.browse'](),
    categories: m['catalog.nav.categories'](),
    submit: m['catalog.nav.submit'](),
    signIn: m['common.nav.sign_in'](),
    menu: m['catalog.nav.menu'](),
    close: m['catalog.nav.close'](),
    tagline: m['catalog.footer.tagline'](),
    footerSubmit: m['catalog.footer.submit'](),
    footerBrowse: m['catalog.footer.browse'](),
    footerNote: m['catalog.footer.note'](),
  };

  return (
    <div className="ai-index-page">
      <AiIndexHeader content={chromeContent} />
      <main className="ai-index-shell ai-index-submit-page">
        <Link href="/" className="ai-index-back">
          <ArrowLeft className="size-4" />
          {m['catalog.submit.back']()}
        </Link>
        <div className="ai-index-form-intro">
          <p className="ai-index-eyebrow">{m['catalog.submit.eyebrow']()}</p>
          <h1>{m['catalog.submit.title']()}</h1>
          <p>{m['catalog.submit.description']()}</p>
        </div>

        {createdProduct ? (
          <div className="ai-index-submit-success" role="status">
            <h2>{m['catalog.submit.success_title']()}</h2>
            <p>{m['catalog.submit.success_description']()}</p>
            <Link
              href={`/products/${createdProduct.slug}`}
              className={cn(buttonVariants({ variant: 'link' }), 'mt-4 px-0')}
            >
              {m['catalog.submit.success_view']({
                name: createdProduct.name,
              })}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        ) : (
          <form
            className="ai-index-submit-form"
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="ai-index-form-grid">
              <form.Field name="name">
                {(field) => (
                  <TextField
                    field={field}
                    label={m['catalog.submit.name']()}
                    placeholder={m['catalog.submit.name_placeholder']()}
                    required
                  />
                )}
              </form.Field>
              <form.Field name="url">
                {(field) => (
                  <TextField
                    field={field}
                    label={m['catalog.submit.url']()}
                    placeholder={m['catalog.submit.url_placeholder']()}
                    required
                  />
                )}
              </form.Field>
            </div>

            <form.Field name="category">
              {(field) => (
                <Field className="ai-index-form-field">
                  <FieldLabel htmlFor="category">
                    {m['catalog.submit.category']()}
                  </FieldLabel>
                  <select
                    id="category"
                    name="category"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    required
                  >
                    <option value="">
                      {m['catalog.submit.category_placeholder']()}
                    </option>
                    <option value="realtime">
                      {m['catalog.category.realtime']()}
                    </option>
                    <option value="text-to-video">
                      {m['catalog.category.text_to_video']()}
                    </option>
                    <option value="image-to-video">
                      {m['catalog.category.image_to_video']()}
                    </option>
                    <option value="avatar-live">
                      {m['catalog.category.avatar_live']()}
                    </option>
                    <option value="video-editing">
                      {m['catalog.category.video_editing']()}
                    </option>
                    <option value="workflow">
                      {m['catalog.category.workflow']()}
                    </option>
                  </select>
                  {field.state.meta.isTouched &&
                  field.state.meta.errors?.[0] ? (
                    <p className="ai-index-field-error">
                      {String(field.state.meta.errors[0])}
                    </p>
                  ) : null}
                </Field>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <Field className="ai-index-form-field">
                  <FieldLabel htmlFor="description">
                    {m['catalog.submit.description_label']()}
                  </FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={m['catalog.submit.description_placeholder']()}
                    required
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors?.[0] ? (
                    <p className="ai-index-field-error">
                      {String(field.state.meta.errors[0])}
                    </p>
                  ) : null}
                </Field>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <TextField
                  field={field}
                  label={m['catalog.submit.email']()}
                  type="email"
                  placeholder={m['catalog.submit.email_placeholder']()}
                  required
                />
              )}
            </form.Field>

            {submitError ? (
              <p className="ai-index-field-error" role="alert">
                {submitError}
              </p>
            ) : null}

            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  size="lg"
                  className="ai-index-submit-cta"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? m['catalog.submit.sending']()
                    : m['catalog.submit.button']()}
                  <ArrowUpRight className="size-4" />
                </Button>
              )}
            </form.Subscribe>
          </form>
        )}
      </main>
      <AiIndexFooter content={chromeContent} />
    </div>
  );
}
