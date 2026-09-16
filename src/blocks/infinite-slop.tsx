import { m } from '@/paraglide/messages.js';
import { InfiniteSlopTv } from '@/components/infinite-slop-tv';

export function InfiniteSlop() {
  return (
    <InfiniteSlopTv
      content={{
        title: m['slop.title'](),
        tagline: m['slop.tagline'](),
        invitation: m['slop.invitation'](),
        credit: m['slop.credit'](),
        adminLogin: m['slop.admin_login'](),
        live: m['slop.live'](),
        interfaceLabel: m['slop.interface'](),
        mute: m['slop.mute'](),
        unmute: m['slop.unmute'](),
        buyAd: m['slop.buy_ad'](),
        channels: m['slop.channels'](),
        chat: m['slop.chat'](),
        queue: m['slop.queue'](),
        placeholder: m['slop.placeholder'](),
        send: m['slop.send'](),
        next: m['slop.next'](),
        generating: m['slop.generating'](),
        onAir: m['slop.on_air'](),
        watching: m['slop.watching'](),
        start: m['slop.start'](),
        messages: [
          {
            id: 'mika',
            name: m['slop.message_one_name'](),
            message: m['slop.message_one_text'](),
            time: 'now',
            tone: 'mint',
          },
          {
            id: 'drew',
            name: m['slop.message_two_name'](),
            message: m['slop.message_two_text'](),
            time: '1m',
            tone: 'lavender',
          },
          {
            id: 'nia',
            name: m['slop.message_three_name'](),
            message: m['slop.message_three_text'](),
            time: '2m',
            tone: 'peach',
          },
        ],
        queueItems: [
          {
            id: 'jules',
            name: m['slop.queue_one_name'](),
            prompt: m['slop.queue_one_text'](),
            votes: 23,
            status: 'next',
          },
          {
            id: 'ari',
            name: m['slop.queue_two_name'](),
            prompt: m['slop.queue_two_text'](),
            votes: 11,
            status: 'generating',
          },
          {
            id: 'liv',
            name: m['slop.queue_three_name'](),
            prompt: m['slop.queue_three_text'](),
            votes: 8,
            status: 'queued',
          },
        ],
      }}
    />
  );
}
