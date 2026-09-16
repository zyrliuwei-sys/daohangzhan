export interface InfiniteSlopMessage {
  id: string;
  name: string;
  message: string;
  time: string;
  tone: 'mint' | 'lavender' | 'peach' | 'blue' | 'holographic';
}

export interface InfiniteSlopQueueItem {
  id: string;
  name: string;
  prompt: string;
  votes: number;
  status: 'next' | 'generating' | 'queued';
}

export interface InfiniteSlopContent {
  title: string;
  tagline: string;
  invitation: string;
  credit: string;
  adminLogin: string;
  live: string;
  interfaceLabel: string;
  mute: string;
  unmute: string;
  buyAd: string;
  channels: string;
  chat: string;
  queue: string;
  placeholder: string;
  send: string;
  next: string;
  generating: string;
  onAir: string;
  watching: string;
  start: string;
  messages: InfiniteSlopMessage[];
  queueItems: InfiniteSlopQueueItem[];
}
