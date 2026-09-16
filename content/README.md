# Content Contract — Live AI Channel Directory

All English page copy and metadata for the directory lives in `content/`.
This file is the contract: formats, rules, and the definition of done.
No route/component may hardcode page copy that belongs here.

## Layout

```
data/channels.json            # Verified channel facts (the ONLY fact source for copy)
content/
  README.md                   # This contract
  keywords.json               # Keyword → page ownership registry (anti-cannibalization)
  links.json                  # Internal link map (canonical anchors)
  pages/                      # Static pages — one JSON + one MD per route
    home.json / home.md               → /
    director.json / director.md       → /director
    tv-show-generator.json / .md      → /tv-show-generator
    real-time.json / real-time.md     → /real-time
    interactive.json / interactive.md → /interactive
    channels.json / channels.md       → /channels
    creators.json / creators.md       → /creators
  channels/                   # Channel detail pages — one JSON + one MD per channel
    _template.json / _template.md     # Pattern reference (not a route)
    <slug>.json / <slug>.md           → /channel/<slug>
```

## Page JSON schema (pages/ and channels/)

```json
{
  "route": "/director",
  "meta": {
    "title": "≤ 60 chars, primary keyword front-loaded",
    "description": "140–160 chars, primary + one secondary + an action verb"
  },
  "h1": "Matches the MD's single H1",
  "keywords": { "primary": "...", "secondary": ["..."] },
  "faqs": [{ "q": "...", "a": "..." }]
}
```

Channel pages add `"channel": "<slug>"` (must exist in `data/channels.json`)
and `"related": ["<slug>", ...]` (2–4 siblings).

## Markdown conventions

- The MD starts with the H1 exactly as in the JSON. One H1 per page.
- Body copy only. Channel grids and channel cards are rendered from
  `data/channels.json` by code, injected at include markers:

  ```
  <!-- grid: tag=chat-directed -->
  <!-- grid: type=channel limit=6 -->
  <!-- grid: tag=launch-your-own+open-source -->
  ```

- Internal links use locale-free paths (`/channels`, `/channel/infinite-slop`).
- FAQs in the MD must match the JSON `faqs` verbatim, comparing rendered text (an inline link like `[launch guide](/creators)` counts as its visible text).

## Hard rules

1. **Facts come from `data/channels.json`.** Nothing else. Missing/null field →
   write "check the official site" or omit. Never guess numbers, dates, names.
2. **The subject is the user's action** (watch / understand / launch), never
   the site. Banned constructions: "our directory", "we are a curated
   collection of…", "welcome to the best list of…".
3. **Keyword ownership is `keywords.json`.** One keyword family = one page.
   Never mention a keyword from another page's family as YOUR target; linking
   with that keyword as anchor to the owning page is encouraged.
4. **Banned head terms** (listed in `keywords.json`): `ai tv`, `ai television`,
   `ai channel` (bare), `real time ai` (bare), `ai streaming` (bare),
   `ai tv show` (bare), `ai director` (bare). These SERP intents are
   hardware-shopping, movie listings, job posts, or game characters —
   zero conversion. Exception: a brand's own verbatim tagline may appear on
   that brand's channel page only (e.g. fal.live's "AI television directed by
   everyone").
5. **`realtime` / `real-time` is never a homepage or category primary.** It is
   an explainer topic on `/real-time` and a `Realtime / Low-latency` filter tag
   everywhere else.
6. English only (US idiom). No marketing fluff, no exclamation stacking.

## Definition of done (per page self-check)

1. Every channel fact traces to a `verifiedFacts` entry (or the engines list).
2. Primary keyword appears in: title, meta description, H1 (or a tight
   variant), the first ~100 words, and ≥1 H2.
3. Every secondary keyword appears naturally somewhere on the page.
4. No banned head term used as an optimization target.
5. No keyword owned by another route is targeted on this page.
6. No self-referential site description; subjects are user actions.
7. ≥3 internal links out, following `links.json` anchors; no orphan pages.
8. Title ≤60 chars; meta description 140–160 chars; one H1; FAQ JSON ↔ MD
   match.

## Adding a channel page (rollout workflow)

1. Verify the channel against its official site; add the entry to
   `data/channels.json` (with `lastVerifiedAt`). Unverified → do not add.
2. Copy `_template.json` / `_template.md` → `<slug>.*`.
3. Write meta around: brand name + an `ai livestream` variant.
4. Check `links.json`: add the new page's links (up to `/channels`, sideways
   to ≥2 siblings, one intent page) and add it to `/channels`' inbound list.
5. Run the definition-of-done checklist; report per item.
6. Remaining roster pages to write (batch 2): `neuro-sama`, `channel-1`,
   `aitv`, `retake-tv`, `infinite-tv`,
   `sloptv`, `wallie-v2`, `airi`, `aituber-kit`.
