# AI livestreams, generated live while you watch

An **AI livestream** is a stream with no camera behind it. A video model generates every frame as it airs, creating an endless reality show steered by its chat, a sitcom written scene-by-scene since 2023, news read by synthetic anchors, or VTubers who are pure software. Whether you call it an AI live stream or AI live streaming, it's the same shift: the video isn't recorded, it's _happening_.

And unlike normal AI video, you're not waiting on a render. You drop in, the show is already on, and on the best channels, typing in chat changes what happens next.

## What is an AI livestream?

The difference from everything you've watched before comes down to four things:

| Normal AI video                    | Live AI channels                                         |
| ---------------------------------- | -------------------------------------------------------- |
| Prompt → queue → render → download | Frames generated _while it plays_. No render queue       |
| Output is a video file             | Output is a continuous, never-ending stream              |
| The viewer is the operator         | The viewer votes and types. The audience is the director |
| One prompt, one clip               | One standing premise. The story keeps evolving           |

That last row is why these feel like television. A channel's premise, including its world, cast, and tone, is written once as a resident prompt, and the show generates from it 24/7. You can read the full mechanics in the [real-time AI video explainer](/real-time).

## What's on tonight

### Chat-directed shows

The signature format: the audience proposes, the chat votes, the next scene appears in seconds.

<!-- grid: tag=chat-directed -->

### 24/7 channel surfing

Endless streams that never sign off. Hop in at 3 a.m. and the show is on.

<!-- grid: tag=24-7 -->

### AI news channels

News networks where the anchors, scripts, and stories are all machine-generated.

<!-- grid: tag=news -->

### AI VTubers

Personality-first streams: AI characters who sing, game, and answer chat live.

<!-- grid: tag=vtuber -->

The complete roster, including platforms for launching your own channel, is in the [live AI channel directory](/channels).

## Watching is directing

The strange pleasure of these channels is that watching _is_ participating. On [Infinite Slop](/channel/infinite-slop), you vote on what the cast does next and earn karma for pitching in. On [Renoise Live](/channel/renoise-live), chat decides what four stranded islanders face next. On [fal.live](/channel/fal-live), the top-voted prompt literally becomes the next scene.

There's a craft to this: writing the premise that runs the show, designing the voting loops, and keeping a live model coherent. It's covered in [the AI video director guide](/director), and the wider format landscape is mapped in [interactive video generators](/interactive).

## Under the hood

Every channel here runs on a realtime video model:

- **MiniMax H3 on fal** renders Infinite Slop's endless show and fal.live's channels; the H3 Max Director experience streams 480p/768p at 24fps with 48kHz stereo over WebRTC.
- **Veo**, Google's model family, powers Flow TV's free channels, with the prompt behind each clip shown on screen.
- **LTX Video** renders Infinite TV's Twitch-chat-directed station in real time.

If you're curious how live generation differs from a render queue, and where the latency goes, read [how real-time AI video works](/real-time). If you'd rather run a channel than watch one, start with [how to launch an AI channel](/creators).

## Quick answers

### Is an AI livestream actually live?

Yes. Nothing is pre-recorded: a video model generates the frames as the stream airs. There is no footage file behind it. Stop the model and the picture stops with it.

### Can viewers change what happens on screen?

On chat-directed channels, yes. Viewers type suggestions, the chat votes, and the winning direction is rendered as the next scene within seconds.

### What powers these streams?

Realtime video models. Verified examples: MiniMax H3 running on fal powers Infinite Slop, Google's Veo powers Flow TV, and LTX Video renders Infinite TV's chat-directed scenes.

### Are AI livestreams free to watch?

Many are. Flow TV streams free with no account; Nothing, Forever airs on Twitch. Platform-run channels and studios set their own terms. Check the official site.
