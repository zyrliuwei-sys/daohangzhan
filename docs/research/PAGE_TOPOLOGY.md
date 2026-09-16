# Infinite Slop Page Topology

Source: https://infiniteslop.ai/ (captured 2026-09-04)

## Page model

The reference is a single fixed, full-viewport interactive TV experience rather than a scrolling landing page. A 16:9 live video fills the viewport. The chrome is layered on top, with the right side devoted to chat and queue controls.

1. **Video stage** - fixed background video, `object-fit: cover` on desktop and mobile.
2. **Startup splash** - centered channel wordmark, play affordance, explanation, and credit. Click driven.
3. **Top-left admin entry** - a persistent coral `Admin login` link. It opens the guarded local `/admin` route, which sends unsigned users to sign-in and returns them to the dashboard afterwards.
4. **Top center live indicator** - a coral `LIVE` pill.
5. **Top-right actions** - interface toggle, sound toggle, buy-ad link, channels trigger. Static buttons with press feedback.
6. **Right panel** - chat and queue tabs, messages or queue items, and a prompt composer. Click driven tab state.
7. **Top-center now-playing panel** - translucent status card, only populated during a live clip.
8. **Bottom-left social controls** - like count and attribution pill.

## Implementation scope

The first UI implements the visual shell, startup state, tab state, local mock chat submission, sound toggle, interface toggle, and local like state. It intentionally excludes the original HLS stream, Cloudflare verification, remote queue/chat APIs, ads, and analytics.

## Reference capture note

The browser screenshot bridge timed out on this video-heavy page. The live HTML and CSS were fetched directly from the reference and used as the source of truth for colors, typography, positioning, and responsive rules.
