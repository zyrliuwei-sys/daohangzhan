# AI Product Detail Specification

## Scope

- **Target route:** `src/routes/products/$slug.tsx`
- **Renderer:** `src/blocks/ai-product-detail.tsx`
- **Styling:** `src/styles/ai-index.css`
- **Interaction model:** static layout with existing link, save button, FAQ disclosure, theme toggle, and responsive navigation behavior
- **Data contract:** unchanged; every product slug uses the same template

## Reference DNA

The reference is a verified-startup profile page: a muted page background, a centered narrow content column, compact breadcrumb navigation, a lightweight product header, repeated white bordered cards, and dense label/value metadata. The page is information-first rather than campaign-first.

## Page Topology

1. Shared site header.
2. Centered detail column, approximately `960px` on desktop.
3. Back/breadcrumb row.
4. Product profile header: preview/logo, product name, category, description, metadata, and actions.
5. Product insights card: heading, four insight rows, market and stack chips.
6. SEO detail sections: compact white cards for overview, workflow, features, use cases, FAQ, and source.
7. Related products grid.
8. Shared site footer.

## Layout Rules

- Desktop content width: `min(calc(100% - 2rem), 960px)`.
- Desktop detail header uses a media column plus a content column; the content column places actions beside the title and metadata in a four-column strip.
- Cards use the existing neutral token system, `1px` borders, `14px` radius, and no decorative gradients or heavy shadows.
- Section headings stay compact and data-oriented; avoid the previous oversized editorial headings.
- On mobile, all columns stack, metadata becomes two columns, cards remain edge-to-edge within the page padding, and primary actions stay full-width.

## Computed Reference Notes

- Reference body: muted gray background, `16px` body type, `24px` line height.
- Reference content: centered `max-w-5xl` column with `32px 16px` inner padding.
- Reference cards: white surface, `1px` neutral border, `14px` radius, `24px` vertical padding.
- Reference summary grid: four equal columns with `16px` gap at desktop.
- Reference labels: small muted uppercase metadata labels.
- Reference mobile behavior: single column, compact `16px` page padding, actions and media expand to available width.

## Responsive Behavior

- **Desktop (`>= 960px`):** centered `960px` detail column; profile header is two columns; metadata is four columns; insights are a two-column grid.
- **Tablet (`640px–959px`):** detail column remains padded; profile header stacks; metadata uses two columns; insights remain two columns until the mobile breakpoint.
- **Mobile (`< 640px`):** detail header and insight grids stack; metadata stays two columns; SEO sections use one column; primary action buttons fill the row.

## Content Preservation

Do not change product names, descriptions, metadata values, source URLs, FAQ copy, related-product selection, or loader/API behavior. This specification only changes hierarchy, spacing, card treatment, and responsive composition.
