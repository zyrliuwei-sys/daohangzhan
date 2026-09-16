import { useState, type ComponentProps, type FormEvent } from 'react';
import type {
  InfiniteSlopContent,
  InfiniteSlopMessage,
  InfiniteSlopQueueItem,
} from '@/types/infinite-slop';
import {
  BadgeDollarSign,
  Eye,
  Heart,
  LogIn,
  PanelRightClose,
  PanelRightOpen,
  Play,
  Radio,
  Send,
  Tv,
  Volume2,
  VolumeX,
  Vote,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';

type ActiveTab = 'chat' | 'queue';

const bubbleTone: Record<InfiniteSlopMessage['tone'], string> = {
  mint: 'bg-[hsla(154,70%,85%,0.72)] text-[#122219]',
  lavender: 'bg-[hsla(258,72%,88%,0.72)] text-[#1d1830]',
  peach: 'bg-[hsla(22,86%,86%,0.72)] text-[#301a11]',
  blue: 'bg-[hsla(204,82%,85%,0.72)] text-[#102233]',
  holographic:
    '!border-transparent bg-[linear-gradient(115deg,#ff2fd0,#8a4bff,#42a5ff,#22ffd0,#ffe14d,#ff8a3d,#ff2fd0)] bg-[length:300%_100%] text-white [animation:slop-holo-shift_4s_linear_infinite]',
};

function FrostedButton({
  children,
  className = '',
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[var(--slop-glass)] px-3 py-1.5 text-[13px] font-bold text-[var(--slop-text)] shadow-none backdrop-blur-[14px] transition-transform active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

function QueueBubble({
  item,
  onVote,
}: {
  item: InfiniteSlopQueueItem;
  onVote: () => void;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="max-w-[calc(100%-55px)] rounded-2xl border border-white/35 bg-white/72 px-3.5 py-2 text-[15px] leading-[1.35] text-[#17171c] shadow-[0_3px_14px_rgba(0,0,0,0.22)] backdrop-blur-[10px]">
        <span className="mr-1.5 font-bold">{item.name}</span>
        {item.prompt}
      </div>
      <button
        type="button"
        aria-label={`Vote for ${item.prompt}`}
        onClick={onVote}
        className="flex min-w-9 flex-col items-center rounded-xl border border-white/10 bg-[var(--slop-glass-strong)] px-2 py-1.5 text-xs font-bold text-[var(--slop-text)] backdrop-blur-[14px] transition-transform active:scale-95"
      >
        <Vote className="size-3.5" />
        <span>{item.votes}</span>
      </button>
    </div>
  );
}

export function InfiniteSlopTv({ content }: { content: InfiniteSlopContent }) {
  const [started, setStarted] = useState(false);
  const [interfaceOpen, setInterfaceOpen] = useState(true);
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(content.messages);
  const [queueItems, setQueueItems] = useState(content.queueItems);
  const [likes, setLikes] = useState(47);
  const [heartVisible, setHeartVisible] = useState(false);

  const nextItem = queueItems.find((item) => item.status === 'next');
  const generatingItems = queueItems.filter(
    (item) => item.status === 'generating'
  );
  const queuedItems = queueItems.filter((item) => item.status === 'queued');
  const onAirPrompt = nextItem?.prompt ?? queueItems[0]?.prompt ?? '';

  function submitPrompt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = messageInput.trim();
    if (!prompt) return;

    const id = `local-${Date.now()}`;
    setMessages((current) => [
      ...current,
      { id, name: 'you', message: prompt, time: 'now', tone: 'holographic' },
    ]);
    setQueueItems((current) => [
      ...current,
      { id, name: 'you', prompt, votes: 1, status: 'queued' },
    ]);
    setMessageInput('');
  }

  function voteFor(id: string) {
    setQueueItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    );
  }

  function like() {
    setLikes((current) => current + 1);
    setHeartVisible(false);
    requestAnimationFrame(() => setHeartVisible(true));
  }

  return (
    <main
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#101016] font-sans text-[var(--slop-text)]"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      }}
    >
      <img
        src="/imgs/generated/infinite-tv-frame-1788489516739.png"
        alt=""
        className="slop-background absolute inset-0 h-full w-full scale-[1.03] [animation:slop-background-drift_14s_ease-in-out_infinite] object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,17,23,0.1),rgba(4,6,14,0.78))]" />

      <Link
        href="/admin"
        className="absolute top-[10px] left-[14px] z-50 inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--slop-accent)] px-3.5 py-2 text-[13px] font-bold text-white shadow-[0_3px_12px_rgba(0,0,0,0.32)] transition-transform hover:brightness-110 active:scale-95"
      >
        <LogIn className="size-4" aria-hidden="true" />
        {content.adminLogin}
      </Link>

      <div className="absolute top-[22px] left-1/2 z-20 -translate-x-1/2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slop-accent)] px-[15px] py-2 text-xs font-bold tracking-[0.04em] text-white shadow-[0_3px_12px_rgba(0,0,0,0.32)]">
          <Radio className="size-3 animate-pulse" aria-hidden="true" />
          {content.live}
        </div>
      </div>

      <section className="absolute top-[66px] left-1/2 z-20 w-[min(360px,calc(100vw-180px))] -translate-x-1/2 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-[#18191d] shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-[14px] max-[820px]:top-[64px]">
        <p className="mb-1 text-[11px] font-bold tracking-[0.14em] text-[var(--slop-accent)]">
          {content.onAir}
        </p>
        <p className="line-clamp-2 text-sm leading-snug font-semibold">
          {onAirPrompt}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#68676d]">
          <Eye className="size-3.5 text-[var(--slop-accent)]" />
          <span className="font-bold text-[var(--slop-accent)]">1,384</span>
          {content.watching}
        </p>
      </section>

      <div className="absolute top-[10px] right-[14px] z-30 flex flex-col items-end gap-2">
        <FrostedButton
          type="button"
          onClick={() => setInterfaceOpen((current) => !current)}
          aria-label={content.interfaceLabel}
        >
          {interfaceOpen ? (
            <PanelRightClose className="size-4" />
          ) : (
            <PanelRightOpen className="size-4" />
          )}
          {content.interfaceLabel}
        </FrostedButton>
        <FrostedButton
          type="button"
          onClick={() => setMuted((current) => !current)}
          aria-label={muted ? content.unmute : content.mute}
        >
          {muted ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
          {muted ? content.unmute : content.mute}
        </FrostedButton>
        <FrostedButton type="button" className="text-[#ffd257]">
          <BadgeDollarSign className="size-4" />
          {content.buyAd}
        </FrostedButton>
        <FrostedButton type="button">
          <Tv className="size-4" />
          {content.channels}
        </FrostedButton>
      </div>

      {interfaceOpen ? (
        <aside className="absolute top-[176px] right-[14px] bottom-[14px] z-20 flex w-[min(400px,calc(100vw-28px))] flex-col max-[820px]:top-1/2 max-[820px]:right-0 max-[820px]:bottom-0 max-[820px]:w-full max-[820px]:px-1.5 max-[820px]:pb-2">
          <div className="mb-2.5 flex gap-2">
            {(['chat', 'queue'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-full border px-3 py-2 text-[13px] font-bold tracking-[0.04em] backdrop-blur-[14px] transition-transform active:scale-95 ${
                  activeTab === tab
                    ? 'border-transparent bg-[var(--slop-accent)] text-white'
                    : 'border-white/10 bg-[var(--slop-glass)] text-[var(--slop-text)]'
                }`}
              >
                {tab === 'chat' ? content.chat : content.queue}
              </button>
            ))}
          </div>

          {activeTab === 'chat' ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent_0,#000_56px)] px-1 pt-1 pb-3">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`max-w-[92%] self-start rounded-2xl border border-white/35 px-3.5 py-2 text-base leading-[1.35] shadow-[0_3px_14px_rgba(0,0,0,0.22)] backdrop-blur-[10px] ${bubbleTone[message.tone]}`}
                  >
                    <span className="mr-1.5 font-bold">{message.name}</span>
                    <span className="mr-1.5 text-[0.78em] opacity-55">
                      {message.time}
                    </span>
                    {message.message}
                  </article>
                ))}
              </div>
              <form onSubmit={submitPrompt} className="flex gap-2.5">
                <input
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  maxLength={3000}
                  placeholder={content.placeholder}
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-[var(--slop-glass-strong)] px-4 py-2.5 text-base font-semibold text-[var(--slop-text)] outline-none placeholder:text-white/55 focus:border-white/45"
                />
                <button
                  type="submit"
                  aria-label={content.send}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--slop-accent)] px-4 py-2.5 text-sm font-bold text-white transition-transform active:scale-95"
                >
                  <Send className="size-4" />
                  <span className="max-[440px]:hidden">{content.send}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto px-1 pt-1">
              {nextItem ? (
                <section className="mb-4">
                  <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-[var(--slop-muted)]">
                    {content.next}
                  </p>
                  <QueueBubble
                    item={nextItem}
                    onVote={() => voteFor(nextItem.id)}
                  />
                </section>
              ) : null}
              <section className="mb-4">
                <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-[var(--slop-muted)]">
                  {content.generating}
                </p>
                <div className="flex flex-col gap-2.5">
                  {generatingItems.map((item) => (
                    <QueueBubble
                      key={item.id}
                      item={item}
                      onVote={() => voteFor(item.id)}
                    />
                  ))}
                </div>
              </section>
              <section>
                <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-[var(--slop-muted)]">
                  {content.queue}
                </p>
                <div className="flex flex-col gap-2.5">
                  {queuedItems.map((item) => (
                    <QueueBubble
                      key={item.id}
                      item={item}
                      onVote={() => voteFor(item.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </aside>
      ) : (
        <div
          className="absolute right-[14px] bottom-[16px] z-20 [font-family:Shrikhand,cursive] text-2xl text-white [text-shadow:3px_3px_0_rgba(0,0,0,0.8),7px_7px_0_rgba(0,0,0,0.65)]"
          aria-hidden="true"
        >
          {content.title}
        </div>
      )}

      <div className="absolute bottom-14 left-[14px] z-20 max-[820px]:bottom-[14px]">
        <button
          type="button"
          aria-label="Like"
          onClick={like}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[var(--slop-glass)] px-3.5 py-2 text-sm font-bold text-[var(--slop-text)] backdrop-blur-[14px] transition-transform active:scale-95"
        >
          <Heart className="size-4" />
          <span className="text-[var(--slop-accent)]">{likes}</span>
        </button>
      </div>
      {heartVisible ? (
        <Heart
          className="slop-heart pointer-events-none absolute bottom-[78px] left-[31px] z-20 size-10 [animation:slop-heart-float_2.6s_ease-out_forwards] fill-[var(--slop-accent)] text-[var(--slop-accent)] max-[820px]:bottom-[36px]"
          aria-hidden="true"
          onAnimationEnd={() => setHeartVisible(false)}
        />
      ) : null}
      <p className="absolute bottom-[14px] left-[14px] z-20 rounded-full border border-white/10 bg-[var(--slop-glass)] px-3.5 py-2 text-sm font-bold text-[var(--slop-text)] backdrop-blur-[14px] max-[820px]:hidden">
        {content.credit}
      </p>

      {!started ? (
        <button
          type="button"
          aria-label={content.start}
          onClick={() => setStarted(true)}
          className="absolute inset-0 z-40 flex cursor-pointer items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.46),rgba(0,0,0,0.64))] px-6 text-center"
        >
          <span className="flex max-w-xl flex-col items-center">
            <span className="[font-family:Shrikhand,cursive] text-[min(84px,11vw)] leading-[1.25] text-white [text-shadow:5px_5px_0_rgba(0,0,0,0.85),10px_10px_0_rgba(0,0,0,0.78),15px_15px_0_rgba(0,0,0,0.65)] max-[820px]:text-[min(56px,13vw)]">
              {content.title}
            </span>
            <Play className="mt-2 size-16 fill-white text-white drop-shadow-[0_0_22px_rgba(255,71,66,0.78)]" />
            <span className="mt-4 text-[15px] leading-relaxed font-bold text-white [text-shadow:0_1px_4px_#000,0_0_12px_rgba(0,0,0,0.8)]">
              {content.tagline}
              <br />
              {content.invitation}
            </span>
            <span className="mt-5 text-sm font-bold text-white/90 [text-shadow:0_1px_4px_#000]">
              {content.credit}
            </span>
            <span className="mt-7 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              {content.start}
            </span>
          </span>
        </button>
      ) : null}
    </main>
  );
}
