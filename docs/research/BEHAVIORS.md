# Infinite Slop Behavior Notes

## Confirmed interaction model

| Element           | Model        | Reference behavior                         | Local UI scope                                         |
| ----------------- | ------------ | ------------------------------------------ | ------------------------------------------------------ |
| Startup splash    | Click        | Click starts the channel experience.       | Dismisses overlay.                                     |
| CHAT / QUEUE      | Click        | Switches the content pane.                 | Switches mock panes.                                   |
| Interface control | Click        | Hides chat and related side UI.            | Toggles the chat pane.                                 |
| Sound control     | Click        | Toggles muted/unmuted state.               | Toggles label and icon only.                           |
| Like button       | Click / hold | Sends a like and produces floating hearts. | Increments a local count and briefly animates a heart. |
| Prompt composer   | Submit       | Sends a request after human verification.  | Adds a local holographic message.                      |

## Responsive behavior

- Desktop: fixed right panel is 400px wide and begins around 176px from the top.
- Tablet and mobile: the chat panel spans the screen width and occupies the lower half of the viewport.
- Mobile: the central wordmark is reduced, the top-center on-air panel makes room for the right controls, and side buttons remain fixed with 14px insets.

## Motion

- The original live indicator pulses its internal dot.
- The reference video supplies most perceived motion. The clone uses a small background drift to preserve this sense of life without copying the live stream.
- The clone respects `prefers-reduced-motion` by disabling the drift and heart float animation.
