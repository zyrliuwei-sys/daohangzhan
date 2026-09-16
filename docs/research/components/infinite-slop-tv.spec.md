# InfiniteSlopTv Specification

## Overview

- **Target file:** `src/components/infinite-slop-tv.tsx`
- **Interaction model:** Click-driven UI over a time-driven background visual.
- **Visual source:** `https://infiniteslop.ai/`, extracted 2026-09-04 from live HTML/CSS.

## DOM Structure

```
full-viewport stage
  generated 16:9 background image with dark scrim
  start overlay
  fixed admin login link
  fixed live pill
  fixed top-right action stack
  fixed right chat/queue panel
    tab controls
    chat bubbles or queue items
    input and send button
  fixed top-center on-air card
  fixed bottom-left like + attribution controls
```

## Computed Styles

### Stage

- position: fixed/inset: 0 equivalent
- background: `#000` in the original; use `#101016` local fallback
- body font: `-apple-system, BlinkMacSystemFont, Segoe UI, Inter, Roboto, sans-serif`
- background image: viewport-cover, centered

### Accent and glass

- accent: `#ff4742`
- primary glass: `rgba(22,22,28,.72)`
- secondary glass: `rgba(30,30,38,.6)`
- text: `#f4f4f6`
- muted text: `rgba(255,255,255,.55)`
- line: `rgba(255,255,255,.1)`
- primary controls: `border: 1px solid rgba(255,255,255,.1)`, `border-radius: 999px`, `backdrop-filter: blur(14px)`

### Placement

- live pill: top 22px, horizontally centered, 12px 700 weight, 8px 15px padding.
- admin login: top 10px, left 14px, coral rounded control. It opens `/admin`; the existing admin guard redirects unsigned visitors to sign-in and preserves `/admin` as the return path.
- top-right actions: right 14px; controls at 10px, 52px, 94px, 136px respectively.
- chat: right 14px, top 176px, bottom 14px, width `min(400px, calc(100vw - 28px))`.
- chat tabs: 8px gap, 10px bottom margin; each fills half row.
- chat bubble: max width 92%, 16px radius, 16px body size, 1px translucent white line, `0 3px 14px rgba(0,0,0,.22)` shadow.
- composer: rounded 999px input and coral send control.
- bottom attribution: left 14px, bottom 14px.
- like control: left 14px, bottom 56px.

### Logo / splash

- logo font: Shrikhand.
- wordmark size: `min(84px, 11vw)`; white fill with black outline/extrusion in original. Use a dark, soft text shadow locally.
- play mark: 64px.
- supporting copy: 15px bold with a dark shadow.

## States and Behaviors

### Startup

- **Trigger:** Click the centered splash.
- **Before:** full-screen overlay visible; player controls are visually obscured.
- **After:** overlay fades out and interaction shell becomes usable.
- **Transition:** opacity 250ms ease.

### Tab switch

- **Trigger:** CHAT or QUEUE click.
- **State A:** chat messages and composer.
- **State B:** `NEXT`, `NOW GENERATING`, and `QUEUE` rows.

### Interface collapse

- **Trigger:** the top-right interface button.
- **State A:** right panel visible.
- **State B:** right panel hidden; wordmark watermark shown at bottom-right.

### Local prompt

- **Trigger:** form submit with nonblank text.
- **Result:** add a holographic gradient bubble in chat and queue.

## Assets

- Background: `/imgs/generated/infinite-tv-frame-1788489516739.png`
- Icons: `lucide-react` only.

## Text Content

All labels and messages are passed as props from `src/blocks/infinite-slop.tsx`, which sources Paraglide message functions.

## Responsive Behavior

- Desktop: right panel is a 400px side column; controls occupy the top-right stack.
- Mobile (`<= 820px`): the right panel becomes a full-width lower-half overlay; splash logo uses `min(56px, 13vw)`; lower controls remain reachable above the safe viewport inset.
