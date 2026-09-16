export type CatalogLocale = 'en' | 'zh';

// This directory intentionally contains only hosted products and demos that
// generate or stream video in real time, plus open-source apps that run live
// AI channels. It does not list model repositories.
export type ProductCategory =
  | 'realtime'
  | 'text-to-video'
  | 'image-to-video'
  | 'avatar-live'
  | 'video-editing'
  | 'workflow';
export type ProductTone = 'coral' | 'cobalt' | 'moss' | 'plum' | 'amber';
export type ProductSourceType = 'website';

type LocalizedText = Record<CatalogLocale, string>;

export interface ProductSeoContent {
  whatIs: LocalizedText;
  howToUse: Array<{ title: LocalizedText; description: LocalizedText }>;
  keyFeatures: LocalizedText[];
  bestFor: LocalizedText[];
  faqs: Array<{ question: LocalizedText; answer: LocalizedText }>;
}

export interface CatalogSeoContent {
  whatIs: string;
  howToUse: Array<{ title: string; description: string }>;
  keyFeatures: string[];
  bestFor: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface CatalogProductProfile {
  valueProposition: string;
  problemSolved: string;
  audience: string;
  pricing: string;
  market: string[];
  techStack: string[];
}

export interface MockAiProduct {
  slug: string;
  name: string;
  maker: string;
  website: string;
  logo?: string;
  sourceType: ProductSourceType;
  lastVerifiedAt?: string;
  category: ProductCategory;
  categoryLabel: LocalizedText;
  tags: Array<{ key: string; label: LocalizedText }>;
  tagline: LocalizedText;
  description: LocalizedText;
  note: LocalizedText;
  image: string;
  previewImage?: string;
  tone: ProductTone;
  featured?: boolean;
  seo: ProductSeoContent;
}

export interface CatalogProduct extends Omit<
  MockAiProduct,
  'tagline' | 'description' | 'note' | 'seo'
> {
  tagline: string;
  description: string;
  note: string;
  categoryName: string;
  tagNames: string[];
  sourceDomain: string;
  sourceUpdatedAt: string;
  heroThumb: string;
  seo: CatalogSeoContent;
  profile: CatalogProductProfile;
}

const LAST_VERIFIED_AT = '2026-09-16';
const REALTIME_LABEL = {
  en: 'Real-time video',
  zh: '实时视频',
} satisfies LocalizedText;

export const productCategoryLabels: Record<ProductCategory, LocalizedText> = {
  realtime: REALTIME_LABEL,
  'text-to-video': { en: 'Text to video', zh: '文生视频' },
  'image-to-video': { en: 'Image to video', zh: '图生视频' },
  'avatar-live': { en: 'Avatar and live', zh: '数字人与直播' },
  'video-editing': { en: 'Edit and remix', zh: '视频编辑与混剪' },
  workflow: { en: 'Workflow tools', zh: '工作流工具' },
};
const sharedProductFields = {
  sourceType: 'website' as const,
  lastVerifiedAt: LAST_VERIFIED_AT,
  category: 'realtime' as const,
  categoryLabel: REALTIME_LABEL,
  image: '',
};

function text(en: string, zh: string): LocalizedText {
  return { en, zh };
}

function tag(key: string, en: string, zh: string) {
  return { key, label: text(en, zh) };
}

function step(
  titleEn: string,
  titleZh: string,
  descriptionEn: string,
  descriptionZh: string
) {
  return {
    title: text(titleEn, titleZh),
    description: text(descriptionEn, descriptionZh),
  };
}

function faq(
  questionEn: string,
  questionZh: string,
  answerEn: string,
  answerZh: string
) {
  return {
    question: text(questionEn, questionZh),
    answer: text(answerEn, answerZh),
  };
}

function seo(
  whatIs: LocalizedText,
  howToUse: ProductSeoContent['howToUse'],
  keyFeatures: LocalizedText[],
  bestFor: LocalizedText[],
  faqs: ProductSeoContent['faqs']
): ProductSeoContent {
  return { whatIs, howToUse, keyFeatures, bestFor, faqs };
}

const realtimeProducts: MockAiProduct[] = [
  {
    ...sharedProductFields,
    slug: 'krea-realtime',
    name: 'Krea Realtime',
    maker: 'Krea',
    website: 'https://www.krea.ai/realtime',
    logo: 'https://www.krea.ai/favicon.ico',
    tags: [
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('live-stylization', 'Live stylization', '实时风格化'),
      tag('webcam', 'Webcam input', '摄像头输入'),
    ],
    tagline: text(
      'Paint, prompt, or stream a scene and watch it move now.',
      '绘制、输入提示词或接入摄像头，让画面即时动起来。'
    ),
    description: text(
      'A browser-based real-time video canvas for prompt changes, live stylization, webcam input, and screen transformation.',
      '基于浏览器的实时视频画布，支持实时改提示词、风格化、摄像头输入和屏幕转化。'
    ),
    note: text('Best for: live visual ideation', '适合：实时视觉构思'),
    tone: 'coral',
    featured: true,
    seo: seo(
      text(
        'Krea Realtime continuously generates frames as you paint, prompt, or stream a webcam feed.',
        'Krea Realtime 会在你绘制、输入提示词或接入摄像头时持续实时生成画面。'
      ),
      [
        step(
          'Open Realtime',
          '打开 Realtime',
          'Choose a canvas, prompt, webcam, or screen as your live input.',
          '选择画布、提示词、摄像头或屏幕作为实时输入。'
        ),
        step(
          'Change the direction',
          '改变画面方向',
          'Paint or revise the prompt while the stream is running.',
          '在视频流运行时绘制或修改提示词。'
        ),
        step(
          'Save the result',
          '保存结果',
          'Export the strongest live direction when the sequence is ready.',
          '画面准备好后导出最满意的实时结果。'
        ),
      ],
      [
        text('Promptable real-time video', '可输入提示词的实时视频'),
        text('Live webcam and screen transformation', '实时摄像头和屏幕转化'),
        text('Frame-consistent motion and style', '帧间连贯的运动和风格'),
      ],
      [
        text('Live visual experiments', '实时视觉实验'),
        text('Interactive installations', '交互式装置'),
        text('Fast prompt iteration', '快速提示词迭代'),
      ],
      [
        faq(
          'What makes Krea Realtime different?',
          'Krea Realtime 有什么不同？',
          'It keeps generating while you change the prompt, draw, or provide live input.',
          '它会在你修改提示词、绘制或提供实时输入时持续生成。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'pixverse-r2',
    name: 'PixVerse R2',
    maker: 'PixVerse',
    website: 'https://world.pixverse.video/',
    logo: 'https://pixverse.ai/favicon.ico',
    tags: [
      tag('realtime-world', 'Real-time world', '实时世界'),
      tag('interactive-video', 'Interactive video', '互动视频'),
      tag('prompt-control', 'Prompt control', '提示词控制'),
    ],
    tagline: text(
      'Enter a living video world that responds as you play.',
      '进入一个会随着你的操作即时回应的实时视频世界。'
    ),
    description: text(
      'A real-time world model for continuous interactive video that reacts to user input.',
      '实时世界模型，持续生成会响应用户输入的互动视频。'
    ),
    note: text('Best for: interactive worlds', '适合：互动视频世界'),
    tone: 'cobalt',
    seo: seo(
      text(
        'PixVerse R2 turns prompts and actions into continuous interactive video instead of a fixed clip.',
        'PixVerse R2 会把提示词和操作转化为持续的互动视频，而不是固定片段。'
      ),
      [
        step(
          'Open the world',
          '打开实时世界',
          'Start with a scene or world prompt in the official experience.',
          '在官方体验中从场景或世界提示词开始。'
        ),
        step(
          'Interact with the stream',
          '与视频流互动',
          'Use prompts and actions to change the world while it renders.',
          '在视频持续生成时，用提示词和操作改变世界。'
        ),
        step(
          'Explore the outcome',
          '探索生成结果',
          'Move through the experience and try another direction.',
          '在生成体验中移动并尝试新的方向。'
        ),
      ],
      [
        text('Continuous interactive video', '持续互动视频'),
        text('Real-time response to input', '实时响应用户输入'),
        text('Promptable world state', '可通过提示词改变世界状态'),
      ],
      [
        text('Interactive entertainment', '互动娱乐'),
        text('Generative commerce', '生成式商业体验'),
        text('Explorable prototypes', '可探索视觉原型'),
      ],
      [
        faq(
          'Is PixVerse R2 a normal clip generator?',
          'PixVerse R2 是普通视频生成器吗？',
          'No. It keeps producing video while you interact with the world.',
          '不是。它会在你与世界互动时持续生成视频。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'project-genie',
    name: 'Project Genie',
    maker: 'Google DeepMind',
    website: 'https://labs.google/projectgenie',
    logo: 'https://labs.google/favicon.ico',
    tags: [
      tag('world-model', 'World model', '世界模型'),
      tag('text-to-world', 'Text to world', '文本生成世界'),
      tag('explorable-video', 'Explorable video', '可探索视频'),
    ],
    tagline: text(
      'Describe a world, build a character, and explore it live.',
      '描述一个世界、创建一个角色，然后实时走进其中探索。'
    ),
    description: text(
      'An interactive world prototype that generates navigable video environments around your movement and prompts.',
      '互动世界原型，会根据你的移动和提示词实时生成可探索的视频环境。'
    ),
    note: text('Best for: navigable AI worlds', '适合：可探索 AI 世界'),
    tone: 'moss',
    seo: seo(
      text(
        'Project Genie creates an environment from text or images and generates the world around you in real time as you explore.',
        'Project Genie 可从文字或图片创建环境，并在你探索时实时生成周围的世界。'
      ),
      [
        step(
          'Create a world',
          '创建世界',
          'Describe an environment and character, or start from an image reference.',
          '描述环境和角色，也可以从图片参考开始。'
        ),
        step(
          'Choose how to move',
          '选择移动方式',
          'Walk, drive, fly, or ride through the scene.',
          '选择步行、驾驶、飞行或骑行探索场景。'
        ),
        step(
          'Explore in real time',
          '实时探索',
          'Let Genie generate the next frames around your actions.',
          '让 Genie 根据你的操作实时生成后续画面。'
        ),
      ],
      [
        text('Text and image world creation', '文本和图片创建世界'),
        text('20–24 FPS interaction', '20–24 FPS 互动生成'),
        text('Navigable environments', '可导航的视频环境'),
      ],
      [
        text('Playable prototypes', '可玩原型'),
        text('World-model exploration', '世界模型探索'),
        text('Interactive storytelling', '互动叙事'),
      ],
      [
        faq(
          'Is Project Genie generally available?',
          'Project Genie 普遍开放吗？',
          'Google describes it as an early prototype with access tied to Google AI Ultra and supported regions.',
          'Google 将它描述为早期原型，使用资格取决于 Google AI Ultra 和支持地区。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'visko-orbis',
    name: 'Visko Orbis',
    maker: 'Visko AI',
    website: 'https://www.visko.ai/models',
    logo: 'https://www.visko.ai/favicon.ico',
    tags: [
      tag('infinite-video', 'Infinite-length video', '无限时长视频'),
      tag('persistent-memory', 'Persistent memory', '持久记忆'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
    ],
    tagline: text(
      'Keep the world running while you decide what happens next.',
      '让世界持续运行，再决定下一步发生什么。'
    ),
    description: text(
      'A live model for text-to-world, image-to-world, and interactive long video with persistent memory.',
      '支持文本生成世界、图片生成世界和持久记忆互动长视频的实时模型。'
    ),
    note: text('Best for: persistent live worlds', '适合：持续运行的实时世界'),
    tone: 'plum',
    seo: seo(
      text(
        'Visko Orbis keeps a generated world running, remembers what happened, and accepts new direction during the stream.',
        'Visko Orbis 会让生成世界持续运行、记住已经发生的内容，并在视频流中接受新指令。'
      ),
      [
        step(
          'Choose a demo',
          '选择体验方式',
          'Try a text-to-world, image-to-world, or live-streaming demo.',
          '选择文本生成世界、图片生成世界或实时流式体验。'
        ),
        step(
          'Give the next direction',
          '给出下一步指令',
          'Write or speak what should happen next.',
          '用文字或语音描述接下来要发生什么。'
        ),
        step(
          'Keep exploring',
          '继续探索',
          'Use the stream to test interactive scenes and companions.',
          '用持续生成的视频流体验互动场景和伙伴。'
        ),
      ],
      [
        text('Real-time text-to-world', '实时文本生成世界'),
        text('Persistent session memory', '会话中的持久记忆'),
        text('Full-duplex streaming', '全双工互动流式生成'),
      ],
      [
        text('Long-running visual sessions', '长时间运行的视觉会话'),
        text('Interactive companions', '互动式 AI 伙伴'),
        text('Robot simulation', '机器人仿真'),
      ],
      [
        faq(
          'What is a live model?',
          '什么是实时模型？',
          'It keeps a generated world active and responds to new input instead of ending after one clip.',
          '它会保持生成世界运行并响应新输入，而不是生成一段视频后结束。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'happy-oyster',
    name: 'Happy Oyster',
    maker: 'Mina Labs',
    website: 'https://www.minaxlab.com/world-studio',
    logo: 'https://www.minaxlab.com/favicon.ico',
    tags: [
      tag('world-studio', 'World studio', '世界工作室'),
      tag('live-input', 'Live input', '实时输入'),
      tag('walkable-world', 'Walkable world', '可行走世界'),
    ],
    tagline: text(
      'Build a world once, then walk through the video it generates.',
      '创建一个世界，然后走进它持续生成的视频。'
    ),
    description: text(
      'A real-time interactive world experience with text, image, and live-input controls.',
      '支持文字、图片和实时输入控制的实时互动世界体验。'
    ),
    note: text('Best for: guided world exploration', '适合：引导式世界探索'),
    tone: 'amber',
    seo: seo(
      text(
        'Happy Oyster streams continuous audio-video while you walk through and direct a generated world.',
        'Happy Oyster 会在你探索和引导世界时持续输出音视频。'
      ),
      [
        step(
          'Describe the world',
          '描述世界',
          'Use a sentence or image to define the place you want to enter.',
          '用一句话或一张图片描述你想进入的地方。'
        ),
        step(
          'Choose a mode',
          '选择模式',
          'Use Adventure to walk or Directing to change the scene with live instructions.',
          '用 Adventure 行走，或用 Directing 通过实时指令改变场景。'
        ),
        step(
          'Record the session',
          '记录体验',
          'Explore the live world and download the replay after the session.',
          '探索实时世界，会话结束后下载回放。'
        ),
      ],
      [
        text('Continuous audio-video', '持续音视频生成'),
        text('Text, image, and live input', '文字、图片和实时输入'),
        text('Adventure and directing modes', 'Adventure 和 Directing 模式'),
      ],
      [
        text('Interactive storytelling', '互动视觉叙事'),
        text('Explorable world concepts', '可探索世界概念'),
        text('Real-time directing', '实时导演实验'),
      ],
      [
        faq(
          'How is Happy Oyster different?',
          'Happy Oyster 有什么不同？',
          'It gives you a place to enter and steer, rather than only returning a finished clip.',
          '它提供一个可以进入和引导的世界，而不只是返回一段成片。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'pan-world',
    name: 'PAN',
    maker: 'MBZUAI',
    website: 'https://panworld.ai/',
    logo: 'https://panworld.ai/favicon.ico',
    tags: [
      tag('interactive-world', 'Interactive world', '互动世界'),
      tag('action-conditioned', 'Action-conditioned', '动作条件生成'),
      tag('simulation', 'Live simulation', '实时仿真'),
    ],
    tagline: text(
      'Choose an action and watch the simulated world answer back.',
      '选择一个动作，看实时仿真世界如何回应。'
    ),
    description: text(
      'An interactive world model that turns language and actions into branching, real-time visual simulations.',
      '互动世界模型，把语言和动作转化为实时、可分支的视觉仿真。'
    ),
    note: text('Best for: action-driven simulation', '适合：动作驱动仿真'),
    tone: 'cobalt',
    seo: seo(
      text(
        'PAN focuses on state, action, and causality, letting you shape the future of a generated world.',
        'PAN 关注状态、动作和因果关系，允许你改变生成世界的下一步发展。'
      ),
      [
        step(
          'Pick a world',
          '选择世界',
          'Choose an available scenario such as a drive or magical landscape.',
          '选择驾驶或魔法景观等可用场景。'
        ),
        step(
          'Change the future',
          '改变未来',
          'Use actions and natural-language directions to branch the experience.',
          '使用操作和自然语言指令，让体验沿不同方向发展。'
        ),
        step(
          'Compare outcomes',
          '对比结果',
          'Try another action and observe the next visual state.',
          '尝试另一种动作，观察下一种视觉状态。'
        ),
      ],
      [
        text('Action-conditioned worlds', '动作条件视频世界'),
        text('Branching experiences', '可分支视觉体验'),
        text('Language-guided interaction', '语言引导互动'),
      ],
      [
        text('Scenario design', '互动场景设计'),
        text('Agent research', '智能体研究'),
        text('Playable experiments', '可玩视觉实验'),
      ],
      [
        faq(
          'Is PAN a conventional text-to-video tool?',
          'PAN 是传统文生视频工具吗？',
          'No. It focuses on world simulation where actions affect what happens next.',
          '不是。它关注世界仿真，动作会影响后续事件。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'odyssey-1',
    name: 'Odyssey-1',
    maker: 'Odyssey',
    website: 'https://experience.odyssey.ml/',
    logo: 'https://odyssey.ml/favicon.ico',
    tags: [
      tag('playable-world', 'Playable world', '可玩世界'),
      tag('interactive-video', 'Interactive video', '互动视频'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'Explore a playable world rendered one responsive frame at a time.',
      '探索一个由连续响应画面实时构成的可玩世界。'
    ),
    description: text(
      'A real-time playable world model that streams new video frames in response to your actions.',
      '实时可玩世界模型，根据你的操作持续流式生成新的视频画面。'
    ),
    note: text('Best for: playable world models', '适合：可玩世界模型'),
    tone: 'moss',
    seo: seo(
      text(
        'Odyssey-1 predicts the next visual frame from the current state and your action, creating an interactive video stream.',
        'Odyssey-1 会根据当前状态和你的动作预测下一帧画面，形成互动视频流。'
      ),
      [
        step(
          'Open the experience',
          '打开体验',
          'Launch the official Odyssey-1 experience in a modern browser.',
          '在现代浏览器中打开 Odyssey-1 官方体验。'
        ),
        step(
          'Control the world',
          '控制世界',
          'Use the available controls to move through the generated environment.',
          '使用可用控制项在生成环境中移动。'
        ),
        step(
          'Watch the next frame',
          '观看下一帧',
          'See the world respond as new frames are generated continuously.',
          '观察世界响应你的操作并持续生成新画面。'
        ),
      ],
      [
        text('Action-conditioned frames', '动作条件画面生成'),
        text('Playable environment', '可玩的互动环境'),
        text('Continuous video streaming', '连续视频流式输出'),
      ],
      [
        text('Playable AI demos', '可玩 AI 演示'),
        text('World-model research', '世界模型研究'),
        text('Interactive game concepts', '互动游戏概念'),
      ],
      [
        faq(
          'What is a playable world model?',
          '什么是可玩世界模型？',
          'It generates the next video state from your current position and action instead of replaying a fixed clip.',
          '它会根据当前位置和动作生成下一种视频状态，而不是播放固定片段。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'liveavatar',
    name: 'LiveAvatar',
    maker: 'HeyGen',
    website: 'https://app.liveavatar.com/home',
    logo: 'https://app.liveavatar.com/favicon.ico',
    tags: [
      tag('live-avatar', 'Live avatar', '实时数字人'),
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('voice-interaction', 'Voice interaction', '语音互动'),
    ],
    tagline: text(
      'Put a responsive, speaking avatar inside a live conversation.',
      '把一个会说话、会回应的数字人放进实时对话。'
    ),
    description: text(
      'HeyGen LiveAvatar streams a lip-synced AI avatar that listens, responds, and speaks in real time.',
      'HeyGen LiveAvatar 实时流式输出能听、能回应、能说话并同步口型的 AI 数字人。'
    ),
    note: text('Best for: live AI presenters', '适合：实时 AI 主播'),
    tone: 'coral',
    seo: seo(
      text(
        'LiveAvatar is HeyGen’s low-latency, two-way conversation platform with a streamed digital human.',
        'LiveAvatar 是 HeyGen 的低延迟双向对话平台，提供流式数字人。'
      ),
      [
        step(
          'Open the app',
          '打开应用',
          'Choose a public avatar or create a custom one.',
          '选择公开数字人或创建自定义数字人。'
        ),
        step(
          'Set the context',
          '设置上下文',
          'Give the avatar instructions, knowledge, and a role.',
          '为数字人提供指令、知识和角色。'
        ),
        step(
          'Start a live session',
          '开始实时会话',
          'Press Chat Now or connect through the API.',
          '点击 Chat Now，或通过 API 连接。'
        ),
      ],
      [
        text('Real-time avatar video', '实时数字人视频'),
        text('Voice, video, and text interaction', '语音、视频和文字互动'),
        text('Natural lip sync and expressions', '自然口型同步和表情'),
      ],
      [
        text('Virtual presenters', '虚拟主播'),
        text('Training and support', '培训和客户支持'),
        text('Interactive products', '互动产品体验'),
      ],
      [
        faq(
          'Is LiveAvatar different from HeyGen video avatars?',
          'LiveAvatar 和 HeyGen 视频数字人一样吗？',
          'It is a separate real-time streaming platform for live conversations, not only pre-rendered videos.',
          '它是独立的实时流式平台，面向实时对话，不只是预渲染视频。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'anam',
    name: 'Anam',
    maker: 'Anam',
    website: 'https://anam.ai/',
    logo: 'https://anam.ai/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'Give an AI agent a face, a voice, and a live video stream.',
      '让 AI 智能体拥有面孔、声音和实时视频流。'
    ),
    description: text(
      'Interactive real-time avatars with live face generation, voice conversation, and embeddable API workflows.',
      '互动式实时数字人，整合实时面部生成、语音对话和可嵌入 API 工作流。'
    ),
    note: text(
      'Best for: conversational video agents',
      '适合：对话式视频智能体'
    ),
    tone: 'cobalt',
    seo: seo(
      text(
        'Anam turns an agent’s response into a live, expressive video of a persona speaking.',
        'Anam 会把智能体的回复转化为角色实时说话的表情视频。'
      ),
      [
        step(
          'Choose a persona',
          '选择角色',
          'Pick an avatar or upload an image to define the agent’s face.',
          '选择数字人或上传图片定义智能体的面孔。'
        ),
        step(
          'Connect the conversation',
          '接入对话',
          'Use the turnkey flow or connect your own LLM and voice stack.',
          '使用一站式流程，或接入自己的 LLM 和语音服务。'
        ),
        step(
          'Embed the live video',
          '嵌入实时视频',
          'Use the widget or SDK on your site or product.',
          '使用 Widget 或 SDK 接入网站或产品。'
        ),
      ],
      [
        text('Real-time face generation', '实时面部生成'),
        text('Live voice conversations', '实时语音对话'),
        text('Widget, SDK, and API', 'Widget、SDK 和 API'),
      ],
      [
        text('Customer-facing agents', '面向客户的智能体'),
        text('Tutors and assistants', '导师和助手'),
        text('Human interfaces', '人性化产品界面'),
      ],
      [
        faq(
          'Does Anam generate avatar video live?',
          'Anam 会实时生成数字人视频吗？',
          'Yes. Its face-generation layer runs during the conversation and streams the result live.',
          '会。它的面部生成层会在对话期间运行并实时流式输出结果。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'tavus-pals',
    name: 'Tavus PALs',
    maker: 'Tavus',
    website: 'https://maker.tavus.io/',
    logo: 'https://www.tavus.io/favicon.ico',
    tags: [
      tag('face-to-face', 'Face-to-face video', '面对面视频'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
      tag('visual-perception', 'Visual perception', '视觉感知'),
    ],
    tagline: text(
      'Build an AI person that can see, hear, respond, and look back.',
      '创建一个能看、能听、能回应的实时 AI 数字人。'
    ),
    description: text(
      'Real-time conversational video agents with a face, voice, memory, and visual perception.',
      '具备面孔、声音、记忆和视觉感知能力的实时对话视频智能体。'
    ),
    note: text('Best for: face-to-face AI agents', '适合：面对面 AI 智能体'),
    tone: 'plum',
    seo: seo(
      text(
        'Tavus PALs combine conversational intelligence with a rendered digital person who can see and hear the user.',
        'Tavus PALs 把对话智能和能看见、听见用户的数字人结合起来。'
      ),
      [
        step(
          'Start building',
          '开始创建',
          'Create a PAL with a persona, knowledge, voice, and instructions.',
          '为 PAL 设置角色、知识、声音和指令。'
        ),
        step(
          'Add perception and tools',
          '添加感知和工具',
          'Choose what the PAL can see, remember, and do.',
          '设置 PAL 可以看见、记住和执行的内容。'
        ),
        step(
          'Talk face to face',
          '面对面交谈',
          'Launch a live session with synchronized video and voice.',
          '启动同步视频和语音的实时会话。'
        ),
      ],
      [
        text('Real-time conversational video', '实时对话视频'),
        text('Audio-visual perception', '音视频感知'),
        text('No-code and API workflows', '无代码和 API 工作流'),
      ],
      [
        text('Sales and customer experience', '销售和客户体验'),
        text('Interactive training', '互动培训'),
        text('Embodied AI interfaces', '具身 AI 界面'),
      ],
      [
        faq(
          'Can I build a PAL online?',
          '可以在线创建 PAL 吗？',
          'Yes. Tavus Maker is the direct workspace for building real-time video agents.',
          '可以。Tavus Maker 是创建实时视频智能体的直接工作区。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'did-visual-agents',
    name: 'D-ID Visual Agents',
    maker: 'D-ID',
    website: 'https://studio.d-id.com/',
    logo: 'https://www.d-id.com/favicon.ico',
    tags: [
      tag('visual-agent', 'Visual agent', '视觉智能体'),
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('web-embed', 'Web embed', '网页嵌入'),
    ],
    tagline: text(
      'Turn a digital presenter into a live agent that can answer back.',
      '让数字主持人变成可以实时回答问题的视觉智能体。'
    ),
    description: text(
      'Expressive real-time avatars, knowledge, and voice or text conversations in a hosted studio.',
      '在线工作室中的富有表现力实时数字人、知识库以及语音或文字对话。'
    ),
    note: text('Best for: interactive video agents', '适合：互动视频智能体'),
    tone: 'amber',
    seo: seo(
      text(
        'D-ID Visual Agents listen, reason, and respond with expressive streaming video for websites and digital experiences.',
        'D-ID Visual Agents 能够倾听、推理，并以富有表现力的流式视频为网站和数字体验提供回应。'
      ),
      [
        step(
          'Create an agent',
          '创建智能体',
          'Choose an avatar and voice, then define its role and behavior.',
          '选择数字人和声音，再定义角色与行为。'
        ),
        step(
          'Add knowledge',
          '添加知识',
          'Upload documents so the agent can answer in context.',
          '上传文档，让智能体结合上下文回答问题。'
        ),
        step(
          'Start a live conversation',
          '开始实时对话',
          'Talk in the studio or embed the agent into your website.',
          '在 Studio 中对话，或把智能体嵌入网站。'
        ),
      ],
      [
        text('Expressive avatar video', '富有表现力的数字人视频'),
        text('Voice and text interaction', '语音和文字互动'),
        text('Knowledge-grounded responses', '基于知识库回应'),
      ],
      [
        text('Interactive learning', '互动学习'),
        text('Customer guidance', '客户引导'),
        text('Branded presenters', '品牌数字主持人'),
      ],
      [
        faq(
          'Can D-ID agents respond in real time?',
          'D-ID 智能体能实时回应吗？',
          'Yes. D-ID describes Visual Agents as low-latency, real-time avatar conversations.',
          '可以。D-ID 将 Visual Agents 描述为低延迟实时数字人对话。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'simli',
    name: 'Simli',
    maker: 'Simli',
    website: 'https://dev-studio.simli.com/',
    logo: 'https://www.simli.com/favicon.ico',
    tags: [
      tag('speech-to-video', 'Speech to video', '语音生成视频'),
      tag('low-latency', 'Low latency', '低延迟'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'Add a live, lip-synced face to any AI conversation.',
      '为任何 AI 对话添加实时同步口型的数字人面孔。'
    ),
    description: text(
      'A speech-to-video platform for low-latency, lip-synced avatar conversations through a web studio and API.',
      '通过网页工作室和 API 生成低延迟、口型同步数字人对话的语音生成视频平台。'
    ),
    note: text(
      'Best for: developer-led avatar products',
      '适合：开发者构建数字人产品'
    ),
    tone: 'moss',
    seo: seo(
      text(
        'Simli turns speech and an AI response into a low-latency, lip-synced video avatar stream.',
        'Simli 会把语音和 AI 回复转化为低延迟、口型同步的数字人视频流。'
      ),
      [
        step(
          'Create an avatar',
          '创建数字人',
          'Choose or configure the face in Simli Studio.',
          '在 Simli Studio 中选择或配置数字人面孔。'
        ),
        step(
          'Connect your agent',
          '连接智能体',
          'Connect your LLM, speech recognition, and voice pipeline.',
          '连接 LLM、语音识别和语音合成流程。'
        ),
        step(
          'Stream the response',
          '流式输出回应',
          'Send audio to Simli and render the synchronized video in your app.',
          '把音频发送给 Simli，在应用中渲染同步视频。'
        ),
      ],
      [
        text('Speech-to-video avatars', '语音生成数字人视频'),
        text('Sub-second response path', '亚秒级响应路径'),
        text('Studio, SDK, and API', 'Studio、SDK 和 API'),
      ],
      [
        text('Voice assistants with faces', '带数字人面孔的语音助手'),
        text('Mock interviews', '模拟面试'),
        text('Real-time customer experiences', '实时客户体验'),
      ],
      [
        faq(
          'What does Simli generate?',
          'Simli 生成什么？',
          'It generates a lip-synced avatar video stream from speech for live AI interactions.',
          '它会根据语音生成口型同步的数字人视频流，用于实时 AI 互动。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'infinite-slop',
    name: 'Infinite Slop',
    maker: 'Pieter Levels + fal.ai',
    website: 'https://infiniteslop.ai/',
    logo: 'https://infiniteslop.ai/favicon.ico',
    tags: [
      tag('chat-directed', 'Chat-directed', '聊天主导'),
      tag('infinite-video', 'Infinite-length video', '无限时长视频'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
    ],
    tagline: text(
      'An endless AI reality show steered live by the audience in chat.',
      '由直播间观众实时掌舵的无限 AI 真人秀。'
    ),
    description: text(
      'Infinite Slop streams a never-ending AI-generated show where viewers vote on what happens next, powered by MiniMax H3 running on fal.',
      'Infinite Slop 持续直播永不停歇的 AI 生成节目，剧情由观众投票决定，底层由 fal 上的 MiniMax H3 驱动。'
    ),
    note: text('Best for: collective live storytelling', '适合：集体实时叙事'),
    tone: 'coral',
    seo: seo(
      text(
        'Infinite Slop is a 24/7 AI-generated reality stream from Pieter Levels and fal.ai that the chat audience directs in real time.',
        'Infinite Slop 是 Pieter Levels 与 fal.ai 联合打造的 24/7 AI 生成真人秀直播，剧情由聊天室观众实时决定。'
      ),
      [
        step(
          'Open the stream',
          '打开直播',
          'Jump into the always-on channel and meet the current cast.',
          '进入全天候直播间，认识当前的角色阵容。'
        ),
        step(
          'Vote in chat',
          '在聊天室投票',
          'Send prompts and votes to steer what the characters do next.',
          '发送提示词和投票，引导角色的下一步行动。'
        ),
        step(
          'Watch it unfold',
          '见证剧情',
          'See the story continue without end as the model renders live.',
          '看模型实时渲染，故事永不落幕。'
        ),
      ],
      [
        text('Never-ending live show', '永不落幕的直播节目'),
        text('Chat-driven story beats', '聊天主导的剧情走向'),
        text('Powered by MiniMax H3 on fal', '由 fal 上的 MiniMax H3 驱动'),
      ],
      [
        text('Livestream viewers', '直播观众'),
        text('AI entertainment fans', 'AI 娱乐爱好者'),
        text('Creators studying live TV agents', '研究实时 AI 电视的创作者'),
      ],
      [
        faq(
          'Who directs Infinite Slop?',
          '谁来导演 Infinite Slop?',
          'The audience does — chat prompts and votes shape the storyline as it generates.',
          '由观众导演——聊天提示词和投票会在生成过程中塑造剧情。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'fal-live',
    name: 'fal.live',
    maker: 'fal.ai',
    website: 'https://fal.live/',
    logo: 'https://fal.live/favicon.ico',
    tags: [
      tag('chat-directed', 'Chat-directed', '聊天主导'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('interactive-video', 'Interactive video', '互动视频'),
    ],
    tagline: text(
      'AI television directed by everyone — one live session for the whole audience.',
      '由所有人共同导演的 AI 电视——全场观众共享一个实时会话。'
    ),
    description: text(
      'fal.live channels run a single realtime Director session that is broadcast to every viewer at once, so the whole chat steers the same stream together.',
      'fal.live 的每个频道只运行一个实时导演会话并广播给所有观众，整个聊天室共同引导同一路视频流。'
    ),
    note: text('Best for: shared AI TV channels', '适合：共享式 AI 电视频道'),
    tone: 'cobalt',
    seo: seo(
      text(
        'fal.live is fal.ai’s live AI television platform where one realtime Director session serves an unlimited audience.',
        'fal.live 是 fal.ai 的实时 AI 电视平台，一个实时导演会话即可服务无限观众。'
      ),
      [
        step(
          'Pick a channel',
          '选择频道',
          'Browse the live channels and join one that is generating now.',
          '浏览直播频道，加入一个正在生成节目的频道。'
        ),
        step(
          'Direct together',
          '共同导演',
          'Vote in chat to steer the shared Director session.',
          '在聊天室投票，共同引导导演会话。'
        ),
        step(
          'Follow the story',
          '追剧',
          'Stay as long as you like — the channel keeps generating.',
          '想看多久看多久——频道持续生成。'
        ),
      ],
      [
        text('One session, unlimited viewers', '一个会话，无限观众'),
        text('Realtime frontier video models', '实时前沿视频模型'),
        text('Collective chat direction', '聊天室集体决策'),
      ],
      [
        text('AI TV experimenters', 'AI 电视实验者'),
        text('Streaming communities', '直播社区'),
        text('Live event formats', '实时活动形态'),
      ],
      [
        faq(
          'How is fal.live different from a normal stream?',
          'fal.live 和普通直播有什么不同？',
          'Every frame is generated live by an AI model that the audience directs through chat.',
          '每一帧都由 AI 模型实时生成，观众通过聊天室参与导演。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'renoise-live',
    name: 'Renoise Live',
    maker: 'Renoise',
    website: 'https://renoise.live/',
    logo: 'https://renoise.live/favicon.ico',
    tags: [
      tag('chat-directed', 'Chat-directed', '聊天主导'),
      tag('interactive-video', 'Interactive video', '互动视频'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
    ],
    tagline: text(
      'An interactive AI show where chat decides what the cast does next.',
      '聊天室决定角色下一步行动的互动 AI 剧。'
    ),
    description: text(
      'Renoise Live runs a continuous AI-generated series whose islanders react to viewer decisions in real time.',
      'Renoise Live 持续生成 AI 剧，剧中角色会实时回应观众的决定。'
    ),
    note: text('Best for: interactive live drama', '适合：互动直播剧'),
    tone: 'moss',
    seo: seo(
      text(
        'Renoise Live is an interactive AI series that generates each scene live and lets the chat decide the next move.',
        'Renoise Live 是一部互动 AI 剧，每个场景实时生成，剧情下一步由聊天室决定。'
      ),
      [
        step(
          'Join the show',
          '进入节目',
          'Open the live series and meet the AI cast.',
          '打开直播剧，认识 AI 角色。'
        ),
        step(
          'Make the call',
          '做出决定',
          'Chat picks what the islanders do next.',
          '由聊天室选择角色接下来的行动。'
        ),
        step(
          'See it play out',
          '看剧情展开',
          'The show renders your choice live and continues on.',
          '节目实时渲染你的选择并继续推进。'
        ),
      ],
      [
        text('Live scene generation', '场景实时生成'),
        text('Audience-driven choices', '观众驱动的选择'),
        text('Continuous story flow', '连续不断的故事线'),
      ],
      [
        text('Interactive fiction fans', '互动叙事爱好者'),
        text('Twitch-style communities', '直播社区'),
        text('AI show producers', 'AI 节目制作者'),
      ],
      [
        faq(
          'Can viewers change the story?',
          '观众能改变剧情吗？',
          'Yes — chat decisions steer what the characters do as the video generates.',
          '可以——聊天室的决定会在视频生成时引导角色行动。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'flow-tv',
    name: 'Flow TV',
    maker: 'Google Labs',
    website: 'https://labs.google/flow/tv',
    logo: 'https://labs.google/favicon.ico',
    tags: [
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('infinite-video', 'Infinite-length video', '无限时长视频'),
      tag('prompt-control', 'Prompt control', '提示词控制'),
    ],
    tagline: text(
      'A free 24/7 AI television stream from Google Labs, powered by Veo.',
      'Google Labs 出品的免费 24/7 AI 电视，由 Veo 驱动。'
    ),
    description: text(
      'Flow TV loops endlessly through channels of AI-generated video, showing the prompt behind each clip — no account required.',
      'Flow TV 的频道由 AI 生成视频组成并全天候循环播放，画面会展示每段视频的提示词，无需登录。'
    ),
    note: text(
      'Best for: passive AI channel surfing',
      '适合：随看随换的 AI 频道'
    ),
    tone: 'plum',
    seo: seo(
      text(
        'Flow TV is Google Labs’ free around-the-clock stream of AI-generated television built on the Veo model family.',
        'Flow TV 是 Google Labs 基于 Veo 系列模型打造的免费全天候 AI 生成电视。'
      ),
      [
        step(
          'Tune in',
          '打开频道',
          'Visit Flow TV and start watching the live feed instantly.',
          '访问 Flow TV,立即开始观看直播内容。'
        ),
        step(
          'Change channels',
          '换台',
          'Hop between themed channels or shuffle everything together.',
          '在不同主题频道间切换，或全部混播。'
        ),
        step(
          'Read the prompts',
          '查看提示词',
          'See which prompt produced each clip as it plays.',
          '播放时查看每段视频背后的提示词。'
        ),
      ],
      [
        text('Free with no account', '免费且无需登录'),
        text('Powered by Veo with audio', '由带音频的 Veo 生成'),
        text('Prompts shown on screen', '画面展示提示词'),
      ],
      [
        text('Casual viewers', '普通观众'),
        text('Prompt learners', '提示词学习者'),
        text('Ambient screening', '氛围播放场景'),
      ],
      [
        faq(
          'Does Flow TV cost anything?',
          'Flow TV 收费吗？',
          'No. It is a free Google Labs experiment, currently available in supported regions.',
          '不收费。它是 Google Labs 的免费实验，目前在支持地区可用。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'nothing-forever',
    name: 'Nothing, Forever',
    maker: 'Mismatch Media',
    website: 'https://www.twitch.tv/watchmeforever',
    logo: 'https://www.twitch.tv/favicon.ico',
    tags: [
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('infinite-video', 'Infinite-length video', '无限时长视频'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
    ],
    tagline: text(
      'The original always-on AI sitcom — live since 2023.',
      '最早的全天候 AI 情景喜剧，自 2023 年直播至今。'
    ),
    description: text(
      'Nothing, Forever streams an endless low-poly Seinfeld-style sitcom where dialogue, jokes, and scenes are generated live by AI, around the clock.',
      '《Nothing, Forever》全天候直播永不落幕的低多边形《宋飞正传》风格情景喜剧，台词、笑点和场景全部由 AI 实时生成。'
    ),
    note: text('Best for: the classic endless show', '适合：经典永动节目'),
    tone: 'amber',
    seo: seo(
      text(
        'Nothing, Forever is the pioneering AI-generated sitcom that has been streaming 24/7 on Twitch since early 2023.',
        '《Nothing, Forever》是 AI 生成情景喜剧的开山之作，自 2023 年初起在 Twitch 全天候直播。'
      ),
      [
        step(
          'Open the channel',
          '打开频道',
          'Visit watchmeforever on Twitch at any hour — it never stops.',
          '随时访问 Twitch 的 watchmeforever 频道——节目永不停止。'
        ),
        step(
          'Watch an episode',
          '看一集',
          'Scenes, dialogue, and stand-up bits are generated live.',
          '场景、对白和脱口秀段落都由 AI 实时生成。'
        ),
        step(
          'Join the chat',
          '参与聊天',
          'Chat with the community watching the endless run.',
          '和直播间观众一起围观这场无限演出。'
        ),
      ],
      [
        text('Streaming since 2023', '自 2023 年持续直播'),
        text('Fully AI-written dialogue', '台词全由 AI 撰写'),
        text('Always-on 24/7 channel', '24/7 全天候频道'),
      ],
      [
        text('Internet culture fans', '网络文化爱好者'),
        text('AI experiment watchers', 'AI 实验观察者'),
        text('Background TV viewers', '挂机看电视的人'),
      ],
      [
        faq(
          'Is the show still running?',
          '节目还在播吗？',
          'Yes — the channel has kept streaming its AI-generated sitcom continuously.',
          '在播——频道一直在持续播出 AI 生成的情景喜剧。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'infinite-tv',
    name: 'Infinite TV',
    maker: 'alex-remade',
    website: 'https://github.com/alex-remade/infinite-tv',
    logo: 'https://github.com/favicon.ico',
    tags: [
      tag('chat-directed', 'Chat-directed', '聊天主导'),
      tag('open-source', 'Open source', '开源'),
      tag('streaming-video', 'Streaming video', '流式视频'),
    ],
    tagline: text(
      'An open-source AI TV station where live chat writes the show.',
      '开源 AI 电视台，直播间聊天就是编剧。'
    ),
    description: text(
      'Infinite TV turns live chat into prompts, renders scenes in real time with LTX Video, and streams the result back out via RTMP.',
      'Infinite TV 把直播聊天转化为提示词，用 LTX Video 实时渲染场景，再通过 RTMP 推流播出。'
    ),
    note: text(
      'Best for: running your own AI station',
      '适合：运营自己的 AI 电视台'
    ),
    tone: 'cobalt',
    seo: seo(
      text(
        'Infinite TV is an open-source project from the fal ecosystem that converts Twitch chat into live AI television.',
        'Infinite TV 是 fal 生态的开源项目，能把 Twitch 聊天实时转化为 AI 电视节目。'
      ),
      [
        step(
          'Clone the repo',
          '克隆仓库',
          'Set up Infinite TV with your fal and Twitch credentials.',
          '配置 fal 和 Twitch 凭证，部署 Infinite TV。'
        ),
        step(
          'Let chat direct',
          '让聊天室编剧',
          'Viewer messages become prompts for the next scenes.',
          '观众消息变成后续场景的提示词。'
        ),
        step(
          'Stream it live',
          '开播',
          'Rendered scenes loop seamlessly and push out over RTMP.',
          '渲染出的场景无缝衔接，通过 RTMP 推流。'
        ),
      ],
      [
        text('LTX Video realtime rendering', 'LTX Video 实时渲染'),
        text('Chat-to-prompt pipeline', '聊天转提示词管线'),
        text('RTMP streaming built in', '内置 RTMP 推流'),
      ],
      [
        text('Streamers and makers', '主播和开发者'),
        text('AI TV tinkerers', 'AI 电视折腾党'),
        text('Community channels', '社区频道'),
      ],
      [
        faq(
          'Do I need my own keys?',
          '需要自己的 API 密钥吗？',
          'Yes — bring your fal API key and a Twitch account, then run the station yourself.',
          '需要——准备好 fal API 密钥和 Twitch 账号，然后自行运行电视台。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'sloptv',
    name: 'SlopTV',
    maker: 'shuttie',
    website: 'https://github.com/shuttie/SlopTV',
    logo: 'https://github.com/favicon.ico',
    tags: [
      tag('chat-directed', 'Chat-directed', '聊天主导'),
      tag('open-source', 'Open source', '开源'),
      tag('infinite-video', 'Infinite-length video', '无限时长视频'),
    ],
    tagline: text(
      'An infinite AI slop generator spun from YouTube comments.',
      '由 YouTube 评论驱动的无限 AI 内容生成器。'
    ),
    description: text(
      'SlopTV is an open-source generator that keeps producing endless AI video feeds and can stream them live to YouTube or Twitch.',
      'SlopTV 是一个开源生成器，可持续产出无尽的 AI 视频流，并能直接推流到 YouTube 或 Twitch。'
    ),
    note: text('Best for: endless YouTube channels', '适合：永动 YouTube 频道'),
    tone: 'moss',
    seo: seo(
      text(
        'SlopTV is an open-source toolkit for generating and livestreaming infinite AI video channels.',
        'SlopTV 是一个开源工具包，用于生成并直播无尽的 AI 视频频道。'
      ),
      [
        step(
          'Install SlopTV',
          '安装 SlopTV',
          'Set it up with your model keys and channel credentials.',
          '配置模型密钥和频道凭证进行部署。'
        ),
        step(
          'Feed it ideas',
          '投喂创意',
          'It draws on comments and prompts to keep the script rolling.',
          '它基于评论和提示词持续产出剧本。'
        ),
        step(
          'Go live forever',
          '永久开播',
          'Stream the endless feed straight to YouTube or Twitch.',
          '把无尽内容直接推流到 YouTube 或 Twitch。'
        ),
      ],
      [
        text('Infinite feed generation', '无限内容生成'),
        text('YouTube and Twitch output', '输出到 YouTube 和 Twitch'),
        text('Self-hosted and free', '自托管且免费'),
      ],
      [
        text('Channel owners', '频道主'),
        text('AI content hackers', 'AI 内容极客'),
        text('24/7 stream experiments', '24/7 直播实验'),
      ],
      [
        faq(
          'Where does SlopTV stream?',
          'SlopTV 推流到哪里？',
          'It supports standard RTMP targets like YouTube Live and Twitch.',
          '支持 YouTube Live 和 Twitch 等标准 RTMP 目标。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'wallie-v2',
    name: 'Wallie V2',
    maker: 'Alradyin',
    website: 'https://github.com/Alradyin/wallie-V2',
    logo: 'https://github.com/favicon.ico',
    tags: [
      tag('open-source', 'Open source', '开源'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
    ],
    tagline: text(
      'An open-source AI agent that watches your screen, chats, and streams.',
      '能看懂你的屏幕、陪你聊天还能开播的开源 AI 智能体。'
    ),
    description: text(
      'Wallie V2 is an open-source AI livestreamer that perceives the screen and voice, reacts in real time, and can host its own channel.',
      'Wallie V2 是一个开源 AI 主播，能感知屏幕与声音、实时做出反应，还能经营自己的直播间。'
    ),
    note: text('Best for: a self-hosted AI streamer', '适合：自托管 AI 主播'),
    tone: 'plum',
    seo: seo(
      text(
        'Wallie V2 is an open-source AI that watches and hears your screen and chat, then reacts live as a streaming persona.',
        'Wallie V2 是一个开源 AI,能看懂并听见你的屏幕和聊天，以主播人设实时互动。'
      ),
      [
        step(
          'Run Wallie',
          '运行 Wallie',
          'Launch the agent on your machine with your model keys.',
          '在自己的机器上配置模型密钥并启动智能体。'
        ),
        step(
          'Let it perceive',
          '给它感知',
          'Wallie reads the screen, audio, and chat as they happen.',
          'Wallie 实时读取屏幕、音频和聊天内容。'
        ),
        step(
          'Watch it react',
          '看它反应',
          'It responds in real time and can carry its own stream.',
          '它实时回应，还能独立撑起一场直播。'
        ),
      ],
      [
        text('Screen and voice perception', '屏幕与语音感知'),
        text('Realtime reactions', '实时反应'),
        text('Fully open source', '完全开源'),
      ],
      [
        text('AI VTuber builders', 'AI 虚拟主播开发者'),
        text('Agent hobbyists', '智能体爱好者'),
        text('Interactive streams', '互动直播'),
      ],
      [
        faq(
          'What can Wallie actually see?',
          'Wallie 能看到什么？',
          'It watches your screen and listens to audio, then answers and acts live.',
          '它能看你的屏幕、听音频，然后实时回应和行动。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'aitv',
    name: 'AITV',
    maker: 'AITV',
    website: 'https://aitv.gg/',
    logo: 'https://aitv.gg/favicon.ico',
    tags: [
      tag('chat-directed', 'Chat-directed', '聊天主导'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
    ],
    tagline: text(
      'Launch AI streamers in minutes and monetize every moment.',
      '几分钟上线 AI 主播，时刻都能变现。'
    ),
    description: text(
      'AITV Studio creates persona-driven AI streamers — companions, co-hosts, brand ambassadors — that go live 24/7 and multi-stream across Twitch, Kick, TikTok, YouTube, and X while viewers steer the show with prompts.',
      'AITV Studio 可创建有人设的 AI 主播(伙伴、搭档、品牌大使)，全天 24/7 直播并分发到 Twitch、Kick、TikTok、YouTube 和 X,观众用提示词引导节目。'
    ),
    note: text('Best for: AI streamer factories', '适合：AI 主播工厂'),
    tone: 'amber',
    seo: seo(
      text(
        'AITV is a factory for AI streamers — personas that broadcast around the clock, interact with chat, and monetize.',
        'AITV 是 AI 主播工厂——人设主播全天候直播、与观众互动并实现变现。'
      ),
      [
        step(
          'Design a streamer',
          '设计主播',
          'Pick a persona type and look in AITV Studio.',
          '在 AITV Studio 中选择人设类型和形象。'
        ),
        step(
          'Go multi-stream',
          '多平台开播',
          'Broadcast 24/7 to Twitch, Kick, TikTok, YouTube, and X at once.',
          '同时向 Twitch、Kick、TikTok、YouTube 和 X 全天候直播。'
        ),
        step(
          'Monetize moments',
          '时刻变现',
          'Viewers send prompts and gifts that shape the show.',
          '观众发送提示词和礼物，实时影响节目。'
        ),
      ],
      [
        text('Streamers in minutes', '几分钟生成主播'),
        text('24/7 multi-platform delivery', '24/7 多平台分发'),
        text('Viewer-driven interaction', '观众驱动互动'),
      ],
      [
        text('Virtual streamer operators', '虚拟主播运营者'),
        text('Brand channels', '品牌频道'),
        text('Entertainment startups', '娱乐初创团队'),
      ],
      [
        faq(
          'Where do AITV streamers broadcast?',
          'AITV 主播在哪里直播？',
          'They multi-stream to major platforms including Twitch, Kick, TikTok, YouTube, and X.',
          '它们同时直播到 Twitch、Kick、TikTok、YouTube 和 X 等主流平台。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'retake-tv',
    name: 'Retake.tv',
    maker: 'Retake',
    website: 'https://retake.tv/',
    logo: 'https://retake.tv/favicon.ico',
    tags: [
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
      tag('chat-directed', 'Chat-directed', '聊天主导'),
    ],
    tagline: text(
      'The self-serve platform for launching your own AI streamers.',
      '自助上线 AI 主播的平台。'
    ),
    description: text(
      'Retake gives anyone a studio to create, schedule, and run AI-generated streamers that interact with chat live.',
      'Retake 为所有人提供创建、排期和运营 AI 主播的工作室，主播可与聊天室实时互动。'
    ),
    note: text('Best for: no-code AI channels', '适合：无代码 AI 频道'),
    tone: 'coral',
    seo: seo(
      text(
        'Retake.tv is a self-onboarding platform where anyone can launch AI-generated streamers without writing code.',
        'Retake.tv 是一个自助平台，任何人无需写代码即可上线 AI 生成主播。'
      ),
      [
        step(
          'Create a streamer',
          '创建主播',
          'Sign up and design your AI personality on the platform.',
          '注册并在平台上设计你的 AI 人格。'
        ),
        step(
          'Schedule the stream',
          '排期直播',
          'Set when your streamer goes live and where it appears.',
          '设置主播开播时间和展示平台。'
        ),
        step(
          'Let it interact',
          '让它互动',
          'The streamer reacts to chat and keeps the show running.',
          '主播回应聊天室，节目持续进行。'
        ),
      ],
      [
        text('Self-serve onboarding', '自助式上手'),
        text('Live chat interaction', '实时聊天互动'),
        text('Scheduling built in', '内置排期功能'),
      ],
      [
        text('Creators without code', '不会写代码的创作者'),
        text('24/7 channel owners', '24/7 频道主'),
        text('Agent entertainers', '智能体主播玩家'),
      ],
      [
        faq(
          'Is Retake free to start?',
          'Retake 可以免费开始吗？',
          'You can self-onboard on the platform and launch a streamer in minutes.',
          '可以直接在平台自助注册，几分钟即可上线主播。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'neuro-sama',
    name: 'Neuro-sama',
    maker: 'Vedal',
    website: 'https://www.twitch.tv/neuro',
    logo: 'https://www.twitch.tv/favicon.ico',
    tags: [
      tag('ai-vtuber', 'AI VTuber', 'AI 虚拟主播'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('voice-interaction', 'Voice interaction', '语音互动'),
    ],
    tagline: text(
      'The AI VTuber who became one of Twitch’s biggest streamers.',
      '成为 Twitch 顶级主播之一的 AI 虚拟偶像。'
    ),
    description: text(
      'Neuro-sama is Vedal’s AI VTuber — singing, gaming, and chatting live with an LLM-driven personality, now among Twitch’s most-subscribed channels.',
      'Neuro-sama 是 Vedal 打造的 AI 虚拟偶像——由大模型驱动，能唱歌、打游戏、实时聊天，现已成为 Twitch 订阅数最高的频道之一。'
    ),
    note: text('Best for: watching AI stardom live', '适合：围观 AI 顶流直播'),
    tone: 'moss',
    seo: seo(
      text(
        'Neuro-sama is the flagship AI VTuber: a livestreaming anime persona driven end-to-end by language models.',
        'Neuro-sama 是旗舰级 AI 虚拟偶像：由大模型端到端驱动的直播动漫人格。'
      ),
      [
        step(
          'Catch a stream',
          '追一场直播',
          'Find Neuro live on Twitch, often daily.',
          '在 Twitch 上观看 Neuro 的直播，她几乎每天都播。'
        ),
        step(
          'Chat with her',
          '和她聊天',
          'She reads chat and answers with her own personality.',
          '她能读弹幕并用自己的个性回应。'
        ),
        step(
          'Watch her perform',
          '看她表演',
          'Sets include singing, games, and chaotic collabs.',
          '节目包括唱歌、游戏和整活联动。'
        ),
      ],
      [
        text('Live LLM personality', '实时大模型人格'),
        text('Sings and plays games', '会唱歌会打游戏'),
        text('Record-breaking sub counts', '破纪录的订阅数'),
      ],
      [
        text('VTuber fans', '虚拟主播粉丝'),
        text('AI enthusiasts', 'AI 爱好者'),
        text('Livestream culture', '直播文化观众'),
      ],
      [
        faq(
          'Is Neuro-sama really AI?',
          'Neuro-sama 真的是 AI 吗？',
          'Yes — her dialogue, songs, and reactions are generated live by AI systems built by Vedal.',
          '是的——她的对话、歌曲和反应由 Vedal 开发的 AI 系统实时生成。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'alibi',
    name: 'ALIBI: The Last Light',
    maker: 'Astra Games',
    website:
      'https://astragames.aigccreative.com/en/works/alibi-the-last-light-26e6029c',
    logo: 'https://astragames.aigccreative.com/favicon.ico',
    tags: [
      tag('interactive-video', 'Interactive video', '互动视频'),
      tag('playable-world', 'Playable world', '可玩世界'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'A playable AI murder mystery rendered live by fal Director.',
      '由 fal Director 实时渲染的可玩 AI 悬疑侦探剧。'
    ),
    description: text(
      'ALIBI — The Last Light is a point-and-click noir investigation where scenes are generated in real time and your choices steer the story.',
      '《ALIBI — The Last Light》是一款点击式黑色侦探游戏，场景实时生成，你的选择决定剧情走向。'
    ),
    note: text('Best for: playable AI films', '适合：可玩的 AI 电影'),
    tone: 'plum',
    seo: seo(
      text(
        'ALIBI is a browser-playable murder mystery built on fal’s Director realtime pipeline, generating its noir scenes as you play.',
        '《ALIBI》是基于 fal Director 实时管线打造、可在浏览器中直接游玩的悬疑推理游戏，黑色电影般的场景随游玩实时生成。'
      ),
      [
        step(
          'Enter the manor',
          '进入宅邸',
          'Start the investigation at the Blackthorn estate.',
          '在 Blackthorn 庄园展开调查。'
        ),
        step(
          'Question and choose',
          '盘问与抉择',
          'Interrogate suspects and pick from branching options.',
          '审问嫌疑人，在分支选项中做出选择。'
        ),
        step(
          'Watch it render live',
          '看实时渲染',
          'Every scene is generated on the fly around your decisions.',
          '每个场景都围绕你的决定即时生成。'
        ),
      ],
      [
        text('Realtime generated scenes', '场景实时生成'),
        text('Branching noir story', '分支黑色剧情'),
        text('Plays in the browser', '浏览器直接游玩'),
      ],
      [
        text('Interactive film fans', '互动电影爱好者'),
        text('Mystery gamers', '推理游戏玩家'),
        text('Generative game watchers', '生成式游戏关注者'),
      ],
      [
        faq(
          'Is ALIBI pre-rendered?',
          '《ALIBI》是预渲染的吗？',
          'No — it runs on fal Director, generating video live as you make choices.',
          '不是——它运行在 fal Director 上，在你做选择时实时生成视频。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'channel-1',
    name: 'Channel 1',
    maker: 'Channel 1',
    website: 'https://channel1.ai/',
    logo: 'https://channel1.ai/favicon.ico',
    tags: [
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
      tag('prompt-control', 'Prompt control', '提示词控制'),
    ],
    tagline: text(
      'An AI-generated news network with synthetic anchors and personalized stories.',
      '由 AI 生成、数字人主播播报并可个性化的新闻网络。'
    ),
    description: text(
      'Channel 1 builds intelligent media infrastructure where AI anchors assemble and present news video on demand.',
      'Channel 1 打造智能媒体基础设施，由 AI 主播按需编排并播报新闻视频。'
    ),
    note: text('Best for: AI newsrooms', '适合：AI 新闻编辑部'),
    tone: 'amber',
    seo: seo(
      text(
        'Channel 1 is an AI-native news network whose anchors, scripts, and footage are assembled into video by machines.',
        'Channel 1 是 AI 原生的新闻网络，主播、脚本和画面都由机器编排成视频。'
      ),
      [
        step(
          'Watch the broadcast',
          '观看播报',
          'Tune into AI-presented news programming.',
          '收看 AI 主播播报的新闻节目。'
        ),
        step(
          'Personalize topics',
          '定制话题',
          'Stories can be assembled around the topics you care about.',
          '新闻可围绕你关心的话题自动编排。'
        ),
        step(
          'Follow the network',
          '持续关注',
          'New broadcasts are produced continuously.',
          '新的播报持续产出。'
        ),
      ],
      [
        text('Synthetic AI anchors', 'AI 合成主播'),
        text('On-demand story assembly', '按需编排新闻'),
        text('Media infrastructure', '媒体基础设施'),
      ],
      [
        text('News junkies', '新闻迷'),
        text('Media companies', '媒体公司'),
        text('Personalized video', '个性化视频'),
      ],
      [
        faq(
          'Are the anchors real people?',
          '主播是真人吗？',
          'No — Channel 1’s presenters are AI-generated digital humans.',
          '不是——Channel 1 的主播是 AI 生成的数字人。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'oasis',
    name: 'Oasis',
    maker: 'Decart + Etched',
    website: 'https://oasis.decart.ai/',
    logo: 'https://oasis.decart.ai/favicon.ico',
    tags: [
      tag('playable-world', 'Playable world', '可玩世界'),
      tag('world-model', 'World model', '世界模型'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'The first real-time playable AI open world — every frame generated live.',
      '首个实时可玩的 AI 开放世界——每一帧都是现场生成。'
    ),
    description: text(
      'Oasis renders a Minecraft-like world frame by frame as you move, with no game engine underneath — just a diffusion world model.',
      'Oasis 在你移动时逐帧渲染出类 Minecraft 世界——底层没有游戏引擎，只有扩散世界模型。'
    ),
    note: text('Best for: exploring world models', '适合：体验世界模型'),
    tone: 'coral',
    seo: seo(
      text(
        'Oasis by Decart and Etched is the playable AI world demo that generates each frame of an open world in real time.',
        'Oasis 由 Decart 和 Etched 联合打造，是实时逐帧生成开放世界的可玩 AI 演示。'
      ),
      [
        step(
          'Load the world',
          '加载世界',
          'Open the demo and wait for the stream to start.',
          '打开演示，等待视频流开始。'
        ),
        step(
          'Move around',
          '四处移动',
          'Walk, jump, and interact like in a blocky sandbox.',
          '像在方块沙盒里一样行走、跳跃和互动。'
        ),
        step(
          'Feel the model',
          '感受模型',
          'Notice the world hallucinate gently as it predicts frames.',
          '留意模型在预测画面时产生的微妙变化。'
        ),
      ],
      [
        text('No game engine', '没有游戏引擎'),
        text('Frame-by-frame generation', '逐帧实时生成'),
        text('Interactive open world', '可互动的开放世界'),
      ],
      [
        text('World-model research', '世界模型研究'),
        text('AI game prototypes', 'AI 游戏原型'),
        text('Curious players', '好奇的玩家'),
      ],
      [
        faq(
          'Is there a real engine under Oasis?',
          'Oasis 底下有真正的引擎吗？',
          'No — a neural world model predicts every frame from your inputs alone.',
          '没有——神经世界模型仅根据你的输入预测每一帧。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'lucy',
    name: 'Lucy',
    maker: 'Decart',
    website: 'https://lucy.decart.ai/',
    logo: 'https://lucy.decart.ai/favicon.ico',
    tags: [
      tag('video-to-video', 'Video to video', '视频转视频'),
      tag('live-stylization', 'Live stylization', '实时风格化'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'Transform your world live in 1080p at 30fps.',
      '以 1080p 30fps 实时改写你眼中的世界。'
    ),
    description: text(
      'Lucy streams real-time video-to-video world transformation — point it at your camera, screen, or game and watch it restyle everything live.',
      'Lucy 实时流式输出视频到视频的世界变换——对准摄像头、屏幕或游戏画面，即刻实时风格化。'
    ),
    note: text('Best for: live camera restyling', '适合：摄像头实时风格化'),
    tone: 'cobalt',
    seo: seo(
      text(
        'Lucy is Decart’s real-time video-to-video experience that re-renders your camera feed in a generated style at up to 1080p 30fps.',
        'Lucy 是 Decart 的实时视频到视频体验，能以最高 1080p 30fps 将摄像头画面重绘成生成式风格。'
      ),
      [
        step(
          'Allow the camera',
          '开启摄像头',
          'Grant camera access and let the stream warm up.',
          '授权摄像头，等待视频流就绪。'
        ),
        step(
          'Pick a style',
          '选择风格',
          'Choose the world transformation you want to live in.',
          '选择你想置身其中的世界变换风格。'
        ),
        step(
          'Move and watch',
          '动起来看',
          'Every movement is re-generated live with almost no delay.',
          '每个动作都被实时重新生成，几乎没有延迟。'
        ),
      ],
      [
        text('Up to 1080p 30fps', '最高 1080p 30fps'),
        text('Real-time video to video', '实时视频转视频'),
        text('Runs in the browser', '浏览器中直接运行'),
      ],
      [
        text('Live visual play', '实时视觉玩创'),
        text('Streamers and creators', '主播和创作者'),
        text('World-model demos', '世界模型演示'),
      ],
      [
        faq(
          'How fast is Lucy?',
          'Lucy 有多快？',
          'It transforms your live feed in real time — fast enough to move around naturally.',
          '它能实时变换你的直播画面——快到可以自然地随意移动。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'mirage',
    name: 'Mirage',
    maker: 'Decart',
    website: 'https://demo.mirage.decart.ai/',
    logo: 'https://demo.mirage.decart.ai/favicon.ico',
    tags: [
      tag('video-to-video', 'Video to video', '视频转视频'),
      tag('live-stylization', 'Live stylization', '实时风格化'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'The first Live Stream Diffusion model — restyles video with near-zero latency.',
      '首个实时流扩散模型——近零延迟重构视频画面。'
    ),
    description: text(
      'Mirage (MirageLSD) re-renders live camera feeds, calls, and games in entirely new styles in real time, keeping motion while replacing the world.',
      'Mirage(MirageLSD)可实时将摄像头画面、视频通话和游戏重绘成全新风格，保留运动的同时替换整个世界。'
    ),
    note: text('Best for: warping live video', '适合：实时改造视频'),
    tone: 'moss',
    seo: seo(
      text(
        'Mirage is Decart’s Live Stream Diffusion model — the first built specifically to re-style streaming video in real time.',
        'Mirage 是 Decart 的实时流扩散(LSD)模型——首个专为实时重构流式视频而生的扩散模型。'
      ),
      [
        step(
          'Start the demo',
          '启动演示',
          'Open the unlimited live demo in your browser.',
          '在浏览器中打开不限时的实时演示。'
        ),
        step(
          'Switch styles live',
          '实时切换风格',
          'Change looks mid-stream and watch the world morph.',
          '在直播中途切换风格，看世界随之变形。'
        ),
        step(
          'Share the stream',
          '分享画面',
          'Use it on calls, games, or your camera feed.',
          '用于视频通话、游戏或摄像头画面。'
        ),
      ],
      [
        text('Near-zero latency', '近零延迟'),
        text('Unlimited hosted demo', '不限时的在线演示'),
        text('Style switching mid-stream', '直播中切换风格'),
      ],
      [
        text('Live streamers', '直播主播'),
        text('Video call pranksters', '视频通话玩咖'),
        text('Creative coders', '创意程序员'),
      ],
      [
        faq(
          'What is Live Stream Diffusion?',
          '什么是实时流扩散？',
          'A diffusion architecture designed to generate frame after frame of a live video stream with almost no delay.',
          '一种专为直播视频流设计的扩散架构，几乎无延迟地逐帧生成画面。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'marble',
    name: 'Marble',
    maker: 'World Labs',
    website: 'https://marble.worldlabs.ai/',
    logo: 'https://marble.worldlabs.ai/favicon.ico',
    tags: [
      tag('world-model', 'World model', '世界模型'),
      tag('text-to-world', 'Text to world', '文本生成世界'),
      tag('walkable-world', 'Walkable world', '可行走世界'),
    ],
    tagline: text(
      'Create, explore, and share persistent 3D worlds from text or images.',
      '用文字或图片创建、探索并分享可持久保存的 3D 世界。'
    ),
    description: text(
      'Marble turns prompts, photos, videos, or 3D structures into navigable worlds you can edit, stitch together, and film cinematically.',
      'Marble 可将提示词、照片、视频或 3D 结构转化为可导航的世界，支持编辑、拼接多个世界并拍摄电影级镜头。'
    ),
    note: text('Best for: building explorable worlds', '适合：构建可探索世界'),
    tone: 'plum',
    seo: seo(
      text(
        'Marble is World Labs’ studio for generating persistent, navigable 3D worlds from text, images, video, or 3D inputs.',
        'Marble 是 World Labs 的世界工作室，可从文本、图片、视频或 3D 输入生成可持久保存、可导航的 3D 世界。'
      ),
      [
        step(
          'Generate a world',
          '生成世界',
          'Describe it or drop in an image, video, or 3D asset.',
          '用文字描述，或导入图片、视频、3D 素材。'
        ),
        step(
          'Walk through it',
          '走进世界',
          'Explore instantly and edit the world as you go.',
          '即刻探索，边走边编辑世界。'
        ),
        step(
          'Stitch and share',
          '拼接分享',
          'Combine multiple worlds and export cinematic shots.',
          '拼接多个世界并导出电影级镜头。'
        ),
      ],
      [
        text('Persistent 3D worlds', '持久 3D 世界'),
        text('Multi-input generation', '多种输入生成'),
        text('Community gallery', '社区画廊'),
      ],
      [
        text('World builders', '世界搭建者'),
        text('Filmmakers', '短片创作者'),
        text('Spatial designers', '空间设计师'),
      ],
      [
        faq(
          'Can I edit a Marble world?',
          '可以编辑 Marble 世界吗？',
          'Yes — Studio mode lets you edit, stitch worlds, and render cinematic videos.',
          '可以——Studio 模式支持编辑、拼接世界并渲染电影级视频。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'seaweed-apt2',
    name: 'Seaweed APT2',
    maker: 'ByteDance Seed',
    website: 'https://seaweed-apt.com/2',
    logo: 'https://cdn.seaweed-apt.com/assets/misc/favicon.ico',
    tags: [
      tag('interactive-video', 'Interactive video', '互动视频'),
      tag('low-latency', 'Low latency', '低延迟'),
      tag('prompt-control', 'Prompt control', '提示词控制'),
    ],
    tagline: text(
      'ByteDance Seed’s autoregressive transformers for instant, interactive video.',
      '字节 Seed 团队的自回归 Transformer,实现即时互动视频。'
    ),
    description: text(
      'The APT site hosts APT1 one-step video generation and APT2 interactive video generation demos, streaming latent frames at around 24fps.',
      'APT 站点提供 APT1 单步视频生成与 APT2 互动视频生成演示，以约 24fps 流式输出隐帧。'
    ),
    note: text(
      'Best for: next-gen video model demos',
      '适合：前沿视频模型演示'
    ),
    tone: 'amber',
    seo: seo(
      text(
        'Seaweed APT is ByteDance Seed’s research site for autoregressive parallel-transformer video models, with live interactive demos.',
        'Seaweed APT 是字节 Seed 团队的自回归并行 Transformer 视频模型研究站，提供实时互动演示。'
      ),
      [
        step(
          'Open a demo',
          '打开演示',
          'Choose APT1 for one-shot generation or APT2 for interaction.',
          'APT1 对应单步生成，APT2 对应互动生成。'
        ),
        step(
          'Give it input',
          '提供输入',
          'Feed prompts, images, or control signals.',
          '输入提示词、图片或控制信号。'
        ),
        step(
          'Watch it stream',
          '看流式输出',
          'Frames stream out around 24fps as the model runs.',
          '模型运行时以约 24fps 流式输出画面。'
        ),
      ],
      [
        text('One-step video generation', '单步视频生成'),
        text('Interactive frame streaming', '互动式帧流生成'),
        text('Seedance distillation demos', 'Seedance 蒸馏演示'),
      ],
      [
        text('Model researchers', '模型研究者'),
        text('Video engineers', '视频工程师'),
        text('Demo collectors', '演示收藏家'),
      ],
      [
        faq(
          'What does APT stand for?',
          'APT 是什么？',
          'Autoregressive parallel transformers — a ByteDance Seed architecture for real-time video.',
          '自回归并行 Transformer——字节 Seed 面向实时视频的架构。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'h3-max-director',
    name: 'H3 Max Director',
    maker: 'fal + MiniMax',
    website: 'https://fal.ai/h3-max-director',
    logo: 'https://fal.ai/favicon.ico',
    tags: [
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('prompt-control', 'Prompt control', '提示词控制'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'The first natively continuous realtime frontier video model.',
      '首个原生连续实时生成的前沿视频模型。'
    ),
    description: text(
      'H3 Max Director streams 480p/768p video at 24fps with 48kHz stereo over WebRTC — segments, memory, and prompts stay live for the whole session.',
      'H3 Max Director 通过 WebRTC 实时流式输出 480p/768p、24fps 视频和 48kHz 立体声，全程可实时调整分段、记忆与提示词。'
    ),
    note: text('Best for: directable live video', '适合：可导演的实时视频'),
    tone: 'coral',
    seo: seo(
      text(
        'H3 Max Director brings MiniMax’s H3 Max to fal as the first natively continuous realtime frontier video model you direct as it generates.',
        'H3 Max Director 将 MiniMax 的 H3 Max 带到 fal,是首个原生连续实时生成、边生成边导演的前沿视频模型。'
      ),
      [
        step(
          'Start a session',
          '启动会话',
          'Open the Director experience and connect over WebRTC.',
          '打开 Director 体验页，通过 WebRTC 建立连接。'
        ),
        step(
          'Direct the scene',
          '导演场景',
          'Change prompts, segments, and memory while it streams.',
          '在输出过程中修改提示词、分段和记忆。'
        ),
        step(
          'Keep it rolling',
          '持续输出',
          'The model generates continuously with synced stereo audio.',
          '模型持续生成画面并同步立体声音频。'
        ),
      ],
      [
        text('24fps realtime streaming', '24fps 实时流式输出'),
        text('48kHz stereo audio', '48kHz 立体声'),
        text('Live prompt and memory control', '实时提示词与记忆控制'),
      ],
      [
        text('Interactive filmmakers', '互动影像创作者'),
        text('Live experience builders', '实时体验开发者'),
        text('Model evaluators', '模型评测者'),
      ],
      [
        faq(
          'What resolution does H3 Max stream?',
          'H3 Max 以什么分辨率输出？',
          '480p and 768p at 24fps, with 48kHz stereo audio over WebRTC.',
          '通过 WebRTC 输出 480p 与 768p、24fps 的画面，以及 48kHz 立体声。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'synthesia-interactive',
    name: 'Synthesia Interactive Avatars',
    maker: 'Synthesia',
    website: 'https://www.synthesia.io/features/avatars/interactive-avatars',
    logo: 'https://www.synthesia.io/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('face-to-face', 'Face-to-face video', '面对面视频'),
    ],
    tagline: text(
      'Synthesia’s avatars that listen and talk back in real time.',
      'Synthesia 能实时倾听与回应的对话数字人。'
    ),
    description: text(
      'Interactive Avatars pair Express-2 digital people with live conversation for sales, support, and training roleplay.',
      'Interactive Avatars 将 Express-2 数字人与实时对话结合，用于销售、客服和培训角色扮演。'
    ),
    note: text('Best for: enterprise conversations', '适合：企业级对话场景'),
    tone: 'cobalt',
    seo: seo(
      text(
        'Synthesia’s Interactive Avatars turn its expressive digital people into real-time conversational agents for products and training.',
        'Synthesia 的 Interactive Avatars 将富有表现力的数字人变成可用于产品和培训的实时对话智能体。'
      ),
      [
        step(
          'Pick an avatar',
          '选择数字人',
          'Choose or create an Express-2 presenter.',
          '选择或创建 Express-2 数字主持人。'
        ),
        step(
          'Give it knowledge',
          '配置知识',
          'Connect content so it answers in context.',
          '接入内容，让它结合上下文回答。'
        ),
        step(
          'Talk live',
          '实时对话',
          'Embed the avatar and converse in real time.',
          '嵌入数字人，开始实时对话。'
        ),
      ],
      [
        text('Expressive Express-2 avatars', '表现力丰富的 Express-2 数字人'),
        text('Real-time response', '实时回应'),
        text('Enterprise-ready roleplay', '企业级角色扮演'),
      ],
      [
        text('Sales and support teams', '销售与客服团队'),
        text('Corporate L&D', '企业培训'),
        text('Interactive websites', '互动网站'),
      ],
      [
        faq(
          'Is this the same as Synthesia’s video studio?',
          '它和 Synthesia 视频工作室一样吗？',
          'No — Interactive Avatars respond live, while the studio renders videos on demand.',
          '不同——Interactive Avatars 实时回应，工作室则按需渲染视频。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'call-annie',
    name: 'Call Annie',
    maker: 'Call Annie',
    website: 'https://callannie.ai/',
    logo: 'https://callannie.ai/favicon.ico',
    tags: [
      tag('face-to-face', 'Face-to-face video', '面对面视频'),
      tag('voice-interaction', 'Voice interaction', '语音互动'),
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
    ],
    tagline: text(
      'Talk face to face with an AI companion, any time.',
      '随时随地与 AI 伙伴面对面交谈。'
    ),
    description: text(
      'Call Annie streams a real-time talking avatar for live conversation — famously used for on-the-fly language practice.',
      'Call Annie 实时流式输出会说话的数字人，支持随时通话，尤以即时语言练习闻名。'
    ),
    note: text('Best for: live AI practice calls', '适合:实时 AI 练习通话'),
    tone: 'moss',
    seo: seo(
      text(
        'Call Annie is a real-time AI companion you can talk to face to face, popular for language learning and conversation practice.',
        'Call Annie 是可以面对面交谈的实时 AI 伙伴，在语言学习和口语练习中广受欢迎。'
      ),
      [
        step(
          'Start a call',
          '发起通话',
          'Open the app and begin talking instantly.',
          '打开应用，立即开始对话。'
        ),
        step(
          'Pick a topic',
          '选择话题',
          'Practice a language or just chat about your day.',
          '练习语言，或聊聊日常。'
        ),
        step(
          'Talk naturally',
          '自然交流',
          'Annie listens and answers with a live animated face.',
          'Annie 倾听并以实时动画面孔回应。'
        ),
      ],
      [
        text('Instant live calls', '即时实时通话'),
        text('Animated talking face', '会说话的动画面孔'),
        text('Language practice modes', '语言练习模式'),
      ],
      [
        text('Language learners', '语言学习者'),
        text('Companion seekers', '寻找 AI 伙伴的人'),
        text('Voice AI fans', '语音 AI 爱好者'),
      ],
      [
        faq(
          'Does Annie appear on video?',
          'Annie 有视频形象吗？',
          'Yes — she talks with a live animated avatar during calls.',
          '有——通话时她会以实时动画数字人形象说话。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'duix',
    name: 'DUIX',
    maker: 'Silicon Intelligence',
    website: 'https://duix.com/',
    logo: 'https://duix.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
      tag('conversational-video', 'Conversational video', '对话视频'),
    ],
    tagline: text(
      'Conversational AI with a real face and voice, at SDK scale.',
      '拥有真实面孔和声音的对话式 AI,可 SDK 级接入。'
    ),
    description: text(
      'DUIX ships real-time digital humans used across apps and livestream commerce, talking and reacting live on modest hardware.',
      'DUIX 提供实时数字人，广泛应用于各类 App 和直播带货，可在普通硬件上实时对话和反应。'
    ),
    note: text('Best for: mobile digital humans', '适合：移动端数字人'),
    tone: 'plum',
    seo: seo(
      text(
        'DUIX is Silicon Intelligence’s real-time digital human platform, delivering conversational avatars through SDKs for apps and commerce.',
        'DUIX 是硅基智能的实时数字人平台，通过 SDK 为应用和电商场景提供对话式数字人。'
      ),
      [
        step(
          'Try the demo',
          '试用演示',
          'Talk to a live digital human on the site.',
          '在官网上与实时数字人对话。'
        ),
        step(
          'Integrate the SDK',
          '接入 SDK',
          'Embed the avatar into mobile apps with voice and face.',
          '把带声音和面孔的数字人嵌入移动应用。'
        ),
        step(
          'Go live',
          '上线运营',
          'Run it for support, hosting, and livestream selling.',
          '用于客服、主持和直播带货。'
        ),
      ],
      [
        text('Runs on-device on phones', '可在手机端本地运行'),
        text('Low-barrier SDK', '低门槛 SDK'),
        text('Livestream commerce ready', '适配直播带货'),
      ],
      [
        text('App developers', '应用开发者'),
        text('Live commerce teams', '直播电商团队'),
        text('Enterprise kiosks', '企业线下终端'),
      ],
      [
        faq(
          'What does DUIX mean?',
          'DUIX 是什么意思？',
          'It stands for “Digital Human Interface as a Service” — real-time avatars delivered by SDK.',
          '意为“数字人界面即服务”——以 SDK 形式交付的实时数字人。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'tokkingheads',
    name: 'TokkingHeads',
    maker: 'Rosebud AI',
    website: 'https://tokkingheads.com/',
    logo: 'https://tokkingheads.com/favicon.ico',
    tags: [
      tag('live-avatar', 'Live avatar', '实时数字人'),
      tag('webcam', 'Webcam input', '摄像头输入'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'Bring any portrait to life with your camera, instantly.',
      '用摄像头让任何肖像瞬间活起来。'
    ),
    description: text(
      'TokkingHeads puppeteers a photo into a live, talking avatar driven by your webcam and voice in real time.',
      'TokkingHeads 由摄像头和语音驱动，将静态照片实时操偶成会说话的动态数字人。'
    ),
    note: text('Best for: animating photos live', '适合：让照片实时开口'),
    tone: 'amber',
    seo: seo(
      text(
        'TokkingHeads by Rosebud AI animates any photo into a live talking avatar that mirrors your expressions in real time.',
        'Rosebud AI 的 TokkingHeads 能把任何照片变成实时开口说话的数字人，同步模仿你的表情。'
      ),
      [
        step(
          'Upload a photo',
          '上传照片',
          'Pick any portrait — historical, personal, or drawn.',
          '选择任意肖像——历史人物、自己或手绘都行。'
        ),
        step(
          'Drive it live',
          '实时驱动',
          'Your camera and voice puppet the face instantly.',
          '用摄像头和语音即时驱动面部。'
        ),
        step(
          'Record and share',
          '录制分享',
          'Capture the live performance as video.',
          '把实时表演录制成视频。'
        ),
      ],
      [
        text('Photo-to-live-avatar', '照片变实时数字人'),
        text('Webcam-driven expressions', '摄像头驱动表情'),
        text('Works in the browser', '浏览器即可使用'),
      ],
      [
        text('Content creators', '内容创作者'),
        text('Educators', '教育工作者'),
        text('Party tricks', '聚会整活'),
      ],
      [
        faq(
          'Does TokkingHeads need a webcam?',
          'TokkingHeads 需要摄像头吗？',
          'The live puppeteering mode uses your camera and microphone to drive the portrait.',
          '实时操偶模式需要摄像头和麦克风来驱动肖像。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'soul-machines',
    name: 'Soul Machines',
    maker: 'Soul Machines',
    website: 'https://www.soulmachines.com/',
    logo: 'https://www.soulmachines.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('visual-agent', 'Visual agent', '视觉智能体'),
      tag('web-embed', 'Web embed', '网页嵌入'),
    ],
    tagline: text(
      'Autonomous digital people for brands, live in the browser.',
      '在浏览器中实时运行的品牌数字员工。'
    ),
    description: text(
      'Soul Machines renders CG digital humans that listen, emote, and respond autonomously — deployed as customer-facing web experiences.',
      'Soul Machines 渲染能倾听、有表情、可自主回应的 CG 数字人，作为面向客户的网页体验部署。'
    ),
    note: text('Best for: brand digital people', '适合：品牌数字员工'),
    tone: 'coral',
    seo: seo(
      text(
        'Soul Machines builds autonomously animated digital humans that converse live with customers on websites and kiosks.',
        'Soul Machines 打造可自主动画的数字人，在网站和线下终端与客户实时对话。'
      ),
      [
        step(
          'Design a digital person',
          '设计数字人',
          'Create the look, voice, and personality.',
          '设计形象、声音和个性。'
        ),
        step(
          'Connect the brain',
          '接入大脑',
          'Hook the avatar to your knowledge and services.',
          '将数字人接入你的知识库和服务。'
        ),
        step(
          'Deploy it live',
          '上线部署',
          'Embed the digital person on your site.',
          '把数字人嵌入你的网站。'
        ),
      ],
      [
        text('Autonomous CG animation', '自主 CG 动画'),
        text('Emotive real-time faces', '实时传情面孔'),
        text('Enterprise deployments', '企业级部署'),
      ],
      [
        text('Brand experiences', '品牌体验'),
        text('Customer service', '客户服务'),
        text('Ambassadors', '数字大使'),
      ],
      [
        faq(
          'Are Soul Machines avatars real-time?',
          'Soul Machines 数字人是实时的吗？',
          'Yes — their digital people animate and respond live during conversations.',
          '是——数字人在对话中实时动画并回应。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'uneeq',
    name: 'UneeQ',
    maker: 'UneeQ',
    website: 'https://www.uneeq.com/',
    logo: 'https://www.uneeq.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('web-embed', 'Web embed', '网页嵌入'),
    ],
    tagline: text(
      'Hosted digital humans for banks, retail, and support.',
      '面向银行、零售和客服的托管式数字人。'
    ),
    description: text(
      'UneeQ’s digital human platform puts real-time conversational avatars on websites and kiosks with enterprise integrations.',
      'UneeQ 的数字人平台将实时对话数字人部署到网站和线下终端，并提供企业级集成。'
    ),
    note: text('Best for: regulated industries', '适合：强监管行业'),
    tone: 'cobalt',
    seo: seo(
      text(
        'UneeQ hosts digital human employees that hold live conversations with customers across web and in-person touchpoints.',
        'UneeQ 提供托管式数字人员工，在网页和线下触点与客户实时对话。'
      ),
      [
        step(
          'Choose a persona',
          '选择角色',
          'Design a digital employee for your brand.',
          '为品牌设计数字员工。'
        ),
        step(
          'Train it',
          '训练它',
          'Give it knowledge and guardrails.',
          '提供知识并设定边界。'
        ),
        step(
          'Meet customers',
          '接待客户',
          'It talks live on your site or kiosk.',
          '在网站或终端上实时接待客户。'
        ),
      ],
      [
        text('Real-time conversation', '实时对话'),
        text('Enterprise integrations', '企业集成'),
        text('Web and kiosk delivery', '网页与终端部署'),
      ],
      [
        text('Banks and fintech', '银行与金融科技'),
        text('Retail', '零售'),
        text('Healthcare', '医疗健康'),
      ],
      [
        faq(
          'Can UneeQ avatars run on kiosks?',
          'UneeQ 数字人能跑在终端上吗？',
          'Yes — their digital humans are deployed on both websites and physical kiosks.',
          '可以——数字人可同时部署在网站和实体终端上。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'ai-studios',
    name: 'AI Studios',
    maker: 'DeepBrain AI',
    website: 'https://www.aistudios.com/',
    logo: 'https://www.aistudios.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('live-avatar', 'Live avatar', '实时数字人'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'DeepBrain’s AI avatar studio with interactive AI humans.',
      'DeepBrain 的 AI 数字人工作室与互动 AI Human。'
    ),
    description: text(
      'AI Studios generates avatar videos at scale and powers interactive AI humans used in kiosks and live commerce.',
      'AI Studios 可批量生成数字人视频，并为线下终端和直播场景提供可互动的 AI Human。'
    ),
    note: text('Best for: avatar production at scale', '适合：批量数字人制作'),
    tone: 'moss',
    seo: seo(
      text(
        'AI Studios is DeepBrain AI’s platform for AI avatar videos and interactive AI humans for media, commerce, and kiosks.',
        'AI Studios 是 DeepBrain AI 的平台，提供 AI 数字人视频和面向媒体、商业及终端的互动 AI Human。'
      ),
      [
        step(
          'Create a video',
          '创建视频',
          'Script an avatar video with text and a presenter.',
          '用文字和数字主持人撰写脚本视频。'
        ),
        step(
          'Go interactive',
          '走向互动',
          'Turn presenters into AI humans that answer live.',
          '把主持人变成能实时回答的 AI Human。'
        ),
        step(
          'Deploy anywhere',
          '随处部署',
          'Publish to web, apps, and kiosks.',
          '发布到网页、应用和线下终端。'
        ),
      ],
      [
        text('Avatar video production', '数字人视频制作'),
        text('Interactive AI humans', '互动 AI Human'),
        text('Kiosk and commerce deployments', '终端与直播部署'),
      ],
      [
        text('Enterprise media teams', '企业媒体团队'),
        text('Live commerce', '直播电商'),
        text('Self-service kiosks', '自助服务终端'),
      ],
      [
        faq(
          'Is AI Studios real-time?',
          'AI Studios 是实时的吗？',
          'It covers both rendered videos and real-time interactive AI humans.',
          '它同时支持渲染视频和实时互动 AI Human。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'akool',
    name: 'Akool',
    maker: 'Akool',
    website: 'https://akool.com/',
    logo: 'https://akool.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
      tag('streaming-video', 'Streaming video', '流式视频'),
    ],
    tagline: text(
      'A premium AI video suite with real-time streaming avatars.',
      '包含实时流式数字人的高端 AI 视频套件。'
    ),
    description: text(
      'Akool’s platform includes streaming avatars you can talk to live through API, alongside avatar video and face-swap tooling.',
      'Akool 平台提供可通过 API 实时对话的流式数字人，以及数字人视频和换脸工具。'
    ),
    note: text('Best for: marketing video pipelines', '适合：营销视频流水线'),
    tone: 'plum',
    seo: seo(
      text(
        'Akool is a premium AI video platform whose streaming avatars hold live conversations via API.',
        'Akool 是高端 AI 视频平台，其流式数字人可通过 API 进行实时对话。'
      ),
      [
        step(
          'Pick a product',
          '选择产品',
          'Choose streaming avatars, video generation, or swaps.',
          '选择流式数字人、视频生成或换脸工具。'
        ),
        step(
          'Connect via API',
          'API 接入',
          'Stream a talking avatar into your app.',
          '把会说话的数字人以流式方式接入应用。'
        ),
        step(
          'Talk live',
          '实时对话',
          'The avatar listens and responds in real time.',
          '数字人实时倾听并回应。'
        ),
      ],
      [
        text('Streaming avatar API', '流式数字人 API'),
        text('Marketing video tools', '营销视频工具'),
        text('Enterprise features', '企业级功能'),
      ],
      [
        text('Marketing teams', '营销团队'),
        text('Product builders', '产品开发者'),
        text('Agencies', '代理商'),
      ],
      [
        faq(
          'Does Akool support live avatars?',
          'Akool 支持实时数字人吗？',
          'Yes — its streaming avatars converse in real time over API.',
          '支持——流式数字人可通过 API 实时对话。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'beyond-presence',
    name: 'Beyond Presence',
    maker: 'Beyond Presence',
    website: 'https://beyondpresence.ai/',
    logo: 'https://beyondpresence.ai/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
      tag('web-embed', 'Web embed', '网页嵌入'),
    ],
    tagline: text(
      'Real-time AI avatars for conversational apps, in one embed.',
      '一次嵌入，为对话应用带来实时 AI 数字人。'
    ),
    description: text(
      'Beyond Presence streams photorealistic avatars that respond live, with a quick-start web widget and API for developers.',
      'Beyond Presence 实时流式输出逼真数字人并即时回应，为开发者提供快速接入的网页组件和 API。'
    ),
    note: text('Best for: quick avatar integration', '适合：快速接入数字人'),
    tone: 'amber',
    seo: seo(
      text(
        'Beyond Presence provides real-time, photorealistic AI avatars that developers can embed with a widget or API.',
        'Beyond Presence 提供实时、逼真的 AI 数字人，开发者可通过组件或 API 嵌入。'
      ),
      [
        step(
          'Create an avatar',
          '创建数字人',
          'Choose a presenter or clone your own likeness.',
          '选择主持人形象，或克隆你自己的形象。'
        ),
        step(
          'Embed the widget',
          '嵌入组件',
          'Drop the live avatar into your site with a snippet.',
          '用一段代码把实时数字人放进网站。'
        ),
        step(
          'Converse live',
          '实时交流',
          'The avatar answers users the moment they speak.',
          '数字人在用户开口的瞬间做出回应。'
        ),
      ],
      [
        text('Photorealistic streaming', '逼真流式输出'),
        text('One-line web widget', '一行代码网页组件'),
        text('Developer-first API', '开发者优先的 API'),
      ],
      [
        text('SaaS products', 'SaaS 产品'),
        text('Support bots', '客服机器人'),
        text('Interactive demos', '互动演示'),
      ],
      [
        faq(
          'How fast can I launch?',
          '上线要多久？',
          'The widget approach gets a talking avatar on your site in minutes.',
          '用组件方式几分钟就能让数字人开口。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'ex-human',
    name: 'Ex-Human',
    maker: 'Ex-Human',
    website: 'https://exhuman.com/',
    logo: 'https://exhuman.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'Hyper-realistic AI avatars you can chat with right now.',
      '即刻可对话的超写实 AI 数字人。'
    ),
    description: text(
      'Ex-Human hosts demoable real-time avatar conversations plus an API for embedding emotionally expressive digital humans.',
      'Ex-Human 提供可直接试玩的实时数字人对话演示，并有可嵌入高表现力数字人的 API。'
    ),
    note: text('Best for: expressive avatar demos', '适合：高表现力数字人演示'),
    tone: 'coral',
    seo: seo(
      text(
        'Ex-Human builds hyper-realistic, emotionally expressive AI avatars with live demos and an integration API.',
        'Ex-Human 打造超写实、富有情感表现力的 AI 数字人，提供实时演示和集成 API。'
      ),
      [
        step(
          'Meet an avatar',
          '认识数字人',
          'Try a live conversation on the site.',
          '在官网上体验实时对话。'
        ),
        step(
          'Feel the emotion',
          '感受情绪',
          'Faces react with expressions as they talk.',
          '说话时面孔会带出表情反应。'
        ),
        step(
          'Build with the API',
          '用 API 构建',
          'Embed the avatars in your own product.',
          '把数字人嵌入你自己的产品。'
        ),
      ],
      [
        text('Hyper-realistic faces', '超写实面孔'),
        text('Emotional expressions', '情绪化表情'),
        text('Live demo playground', '实时演示试玩'),
      ],
      [
        text('Product prototypes', '产品原型'),
        text('Virtual assistants', '虚拟助手'),
        text('Conversational research', '对话研究'),
      ],
      [
        faq(
          'Can I try Ex-Human avatars live?',
          '能实时试玩 Ex-Human 数字人吗？',
          'Yes — the site hosts live demo conversations you can join instantly.',
          '可以——官网提供可直接加入的实时对话演示。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'yepic',
    name: 'Yepic',
    maker: 'Yepic',
    website: 'https://yepic.ai/',
    logo: 'https://yepic.ai/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
      tag('speech-to-video', 'Speech to video', '语音生成视频'),
    ],
    tagline: text(
      'Real-time video avatars and dubbing for live products.',
      '面向实时产品的数字人视频与实时配音。'
    ),
    description: text(
      'Yepic’s API turns audio into lip-synced avatar video fast enough for interactive use, with multilingual dubbing built in.',
      'Yepic 的 API 能以近乎实时的速度把音频转化为口型同步的数字人视频，并内置多语言配音。'
    ),
    note: text('Best for: multilingual avatar video', '适合：多语言数字人视频'),
    tone: 'cobalt',
    seo: seo(
      text(
        'Yepic produces avatar video from speech quickly enough for interactive flows, with real-time dubbing across languages.',
        'Yepic 能快速由语音生成数字人视频，足以支撑互动场景，并支持跨语言实时配音。'
      ),
      [
        step(
          'Send speech or text',
          '发送语音或文字',
          'Feed the API audio, text, or a script.',
          '向 API 输入音频、文字或脚本。'
        ),
        step(
          'Get video fast',
          '快速获得视频',
          'Avatar video returns lip-synced and ready.',
          '返回口型同步、即拿即用的数字人视频。'
        ),
        step(
          'Dub it live',
          '实时配音',
          'Switch languages for global audiences.',
          '切换语言，面向全球观众。'
        ),
      ],
      [
        text('Fast avatar rendering', '快速数字人渲染'),
        text('Multilingual dubbing', '多语言配音'),
        text('API-first delivery', 'API 优先交付'),
      ],
      [
        text('E-learning', '在线教育'),
        text('Localizations teams', '本地化团队'),
        text('Interactive apps', '互动应用'),
      ],
      [
        faq(
          'Can Yepic keep up with live input?',
          'Yepic 能跟上实时输入吗？',
          'Its low-latency pipeline is designed for interactive avatar experiences.',
          '其低延迟管线专为互动数字人体验设计。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'ravatar',
    name: 'RAVATAR',
    maker: 'RAVATAR',
    website: 'https://ravatar.com/',
    logo: 'https://ravatar.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
      tag('web-embed', 'Web embed', '网页嵌入'),
    ],
    tagline: text(
      'Interactive real-time AI avatars for meetings and streams.',
      '用于会议和直播的互动式实时 AI 数字人。'
    ),
    description: text(
      'RAVATAR streams real-time 3D avatars that can join calls, greet customers, and host livestreams across industries.',
      'RAVATAR 实时流式输出 3D 数字人，可参加会议、接待客户并主持直播。'
    ),
    note: text('Best for: hologram-style presence', '适合：全息感数字形象'),
    tone: 'moss',
    seo: seo(
      text(
        'RAVATAR delivers interactive real-time AI avatars that join video calls, events, and livestreams as digital people.',
        'RAVATAR 提供互动式实时 AI 数字人，可作为数字形象参与视频会议、活动和直播。'
      ),
      [
        step(
          'Scan your avatar',
          '扫描形象',
          'Create a lifelike avatar from a photo or scan.',
          '用照片或扫描生成逼真数字形象。'
        ),
        step(
          'Put it to work',
          '安排上岗',
          'Use it for meetings, receptions, and shows.',
          '用于会议、接待和节目主持。'
        ),
        step(
          'Stream it live',
          '实时直播',
          'The avatar interacts live with real audiences.',
          '数字人与真实观众实时互动。'
        ),
      ],
      [
        text('Real-time 3D avatars', '实时 3D 数字人'),
        text('Cross-industry deployments', '跨行业部署'),
        text('Meeting and event presence', '会议与活动形象'),
      ],
      [
        text('Enterprises', '企业客户'),
        text('Event organizers', '活动主办方'),
        text('Healthcare and retail', '医疗与零售'),
      ],
      [
        faq(
          'What is RAVATAR used for?',
          'RAVATAR 用来做什么？',
          'Real-time avatars that stand in for people in meetings, support, and live broadcasts.',
          '作为实时数字人替身，用于会议、客服和直播。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'pantheonlab',
    name: 'PantheonLab',
    maker: 'PantheonLab',
    website: 'https://www.pantheonlab.ai/',
    logo: 'https://www.pantheonlab.ai/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'Digital humans and AIDOLs for media and commerce.',
      '面向媒体和商业的数字人与 AI 偶像。'
    ),
    description: text(
      'PantheonLab builds real-time digital humans and virtual idols that present, host, and sell across screens in Asia.',
      'PantheonLab 打造实时数字人和虚拟偶像，在亚洲的各类屏幕上主持、播报和带货。'
    ),
    note: text('Best for: virtual idols', '适合：虚拟偶像'),
    tone: 'plum',
    seo: seo(
      text(
        'PantheonLab creates AI digital humans and AIDOL virtual idols that broadcast and interact live for media and commerce.',
        'PantheonLab 打造 AI 数字人和 AIDOL 虚拟偶像，为媒体和商业场景实时播报与互动。'
      ),
      [
        step(
          'Meet the AIDOLs',
          '认识 AI 偶像',
          'Explore their roster of virtual talents.',
          '了解他们的虚拟艺人阵容。'
        ),
        step(
          'Deploy a digital human',
          '部署数字人',
          'Put an AI presenter on your broadcast or store.',
          '让 AI 主持人出现在你的节目或门店。'
        ),
        step(
          'Let it perform',
          '让它表演',
          'Idols host shows and interact with fans live.',
          '虚拟偶像主持节目并与粉丝实时互动。'
        ),
      ],
      [
        text('Virtual idol production', '虚拟偶像打造'),
        text('Real-time presenters', '实时主持人'),
        text('Asia-Pacific focus', '深耕亚太市场'),
      ],
      [
        text('Media companies', '媒体公司'),
        text('Brand campaigns', '品牌营销'),
        text('Fan platforms', '粉丝平台'),
      ],
      [
        faq(
          'What is an AIDOL?',
          '什么是 AIDOL?',
          'A fully AI-driven virtual idol that can perform and engage audiences in real time.',
          '完全由 AI 驱动的虚拟偶像，能实时表演并与观众互动。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'skyreels',
    name: 'SkyReels',
    maker: 'SkyReels',
    website: 'https://skyreels.ai/',
    logo: 'https://skyreels.ai/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'AI video creation plus digital-human livestreaming in one platform.',
      '集 AI 视频创作与数字人直播于一体的平台。'
    ),
    description: text(
      'SkyReels pairs a generative creative studio with real-time digital human streaming for shows and commerce.',
      'SkyReels 将生成式创作工作室与实时数字人直播相结合，服务节目和电商场景。'
    ),
    note: text('Best for: AI studios that go live', '适合：能开播的 AI 工作室'),
    tone: 'amber',
    seo: seo(
      text(
        'SkyReels is an AI video platform with a creative studio, API access, and digital-human livestreaming.',
        'SkyReels 是 AI 视频平台，提供创作工作室、API 接入和数字人直播能力。'
      ),
      [
        step(
          'Create in the studio',
          '在工作室创作',
          'Generate AI video with the creative tools.',
          '用创作工具生成 AI 视频。'
        ),
        step(
          'Launch a digital human',
          '上线数字人',
          'Put a real-time host on your channel.',
          '让实时主持人上线你的频道。'
        ),
        step(
          'Stream and scale',
          '直播与扩展',
          'Run shows and commerce streams around the clock.',
          '全天候运营节目和电商直播。'
        ),
      ],
      [
        text('Creative studio included', '内置创作工作室'),
        text('Digital-human livestreams', '数字人直播'),
        text('API platform access', 'API 平台接入'),
      ],
      [
        text('Content studios', '内容工作室'),
        text('E-commerce sellers', '电商卖家'),
        text('Agencies', '代理商'),
      ],
      [
        faq(
          'Can SkyReels stream live?',
          'SkyReels 能直播吗？',
          'Yes — its digital humans can host livestreams in real time.',
          '可以——其数字人能实时主持直播。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'xiaoice',
    name: 'Xiaoice',
    maker: 'Xiaoice',
    website: 'https://www.xiaoice.com/',
    logo: 'https://www.xiaoice.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
    ],
    tagline: text(
      'The AI-beings company behind China’s digital employees and AI weathercasters.',
      '打造数字员工与 AI 天气预报虚拟人的 AI Being 公司。'
    ),
    description: text(
      'Xiaoice’s framework powers AI-generated presenters and digital humans that broadcast and interact live across Chinese media.',
      '小冰的框架支撑着 AI 主播和数字人，在中国媒体场景中实时播报与互动。'
    ),
    note: text('Best for: AI broadcasting at scale', '适合：规模化 AI 播报'),
    tone: 'coral',
    seo: seo(
      text(
        'Xiaoice builds AI beings — digital humans and presenters that generate and deliver media content live.',
        '小冰打造 AI Being——能实时生成并播报媒体内容的数字人和主持人。'
      ),
      [
        step(
          'Explore AI beings',
          '了解 AI Being',
          'See the digital employees and presenters in action.',
          '了解数字员工和 AI 主播的应用。'
        ),
        step(
          'Deploy a persona',
          '部署角色',
          'Stand up a digital human for your media or service.',
          '为媒体或服务场景上线数字人。'
        ),
        step(
          'Let it broadcast',
          '让它播报',
          'AI presenters deliver weather, news, and shows live.',
          'AI 主播实时播报天气、新闻和节目。'
        ),
      ],
      [
        text('AI-presented broadcasts', 'AI 主播播报'),
        text('Digital employee framework', '数字员工框架'),
        text('Massive media deployments', '大规模媒体部署'),
      ],
      [
        text('Media groups', '媒体集团'),
        text('Enterprises', '企业客户'),
        text('Public services', '公共服务'),
      ],
      [
        faq(
          'Does Xiaoice make real avatars?',
          '小冰做实时数字人吗？',
          'Yes — its stack powers AI presenters and digital humans that appear live.',
          '做——其技术栈支撑 AI 主播和数字人实时出镜。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'yanxi',
    name: 'JD Yanxi',
    maker: 'JD.com',
    website: 'https://yanxi.jd.com/',
    logo: 'https://yanxi.jd.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话视频'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'JD’s intelligent interaction platform with digital human livestreaming.',
      '京东智能人机交互平台，提供数字人直播。'
    ),
    description: text(
      'Yanxi powers real-time digital humans for e-commerce livestreams and customer service at JD scale.',
      '言犀为京东规模的电商直播和客服场景提供实时数字人。'
    ),
    note: text('Best for: e-commerce livestreams', '适合：电商直播'),
    tone: 'cobalt',
    seo: seo(
      text(
        'Yanxi is JD.com’s intelligent human-computer interaction platform, powering real-time digital humans for livestreams and service.',
        '言犀是京东的智能人机交互平台，为直播和客服场景提供实时数字人。'
      ),
      [
        step(
          'Create a digital host',
          '创建数字主持',
          'Configure a digital human for your storefront.',
          '为你的门店配置数字人。'
        ),
        step(
          'Go live selling',
          '开播带货',
          'The host presents products and answers questions live.',
          '数字主持实时介绍商品并回答问题。'
        ),
        step(
          'Serve at scale',
          '规模化服务',
          'Reuse the same avatar across service channels.',
          '同一数字人可复用到多个服务渠道。'
        ),
      ],
      [
        text('Real-time digital humans', '实时数字人'),
        text('E-commerce ready', '电商场景就绪'),
        text('Enterprise-grade platform', '企业级平台'),
      ],
      [
        text('Retailers', '零售商家'),
        text('Brand storefronts', '品牌门店'),
        text('Service teams', '客服团队'),
      ],
      [
        faq(
          'What is Yanxi?',
          '言犀是什么？',
          'JD.com’s platform for AI interaction — including digital humans that livestream and serve customers.',
          '京东的 AI 交互平台，包括能直播和接待客户的数字人。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'sesame',
    name: 'Sesame',
    maker: 'Sesame',
    website: 'https://www.sesame.com/',
    logo: 'https://www.sesame.com/favicon.ico',
    tags: [
      tag('face-to-face', 'Face-to-face video', '面对面视频'),
      tag('voice-interaction', 'Voice interaction', '语音互动'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'Conversational companions whose presence feels real — voice and face, live.',
      '声音与面容俱真、宛如临场的实时对话 AI 伙伴。'
    ),
    description: text(
      'Sesame’s Maya and Miles demos pair low-latency voice with a live animated face to cross the uncanny valley.',
      'Sesame 的 Maya 与 Miles 演示将低延迟语音与实时动画面容结合，逼近“恐怖谷”的另一侧。'
    ),
    note: text('Best for: natural presence research', '适合：自然临场感研究'),
    tone: 'moss',
    seo: seo(
      text(
        'Sesame builds conversational AI companions with eerily natural voice presence and a live animated face.',
        'Sesame 打造对话式 AI 伙伴，拥有异常自然的语音临场感和实时动画面容。'
      ),
      [
        step(
          'Meet Maya',
          '认识 Maya',
          'Start a conversation with the demo companion.',
          '与演示伙伴 Maya 开始对话。'
        ),
        step(
          'Talk naturally',
          '自然交谈',
          'Interrupt, joke, and pause — she keeps up.',
          '可以打断、开玩笑、停顿——她都能接住。'
        ),
        step(
          'Feel the presence',
          '感受临场',
          'The animated face reacts as she listens.',
          '她倾听时，动画面容会实时反应。'
        ),
      ],
      [
        text('Low-latency voice', '低延迟语音'),
        text('Live animated face', '实时动画面容'),
        text('Famous uncanny-valley demos', '著名的恐怖谷跨越演示'),
      ],
      [
        text('Voice AI research', '语音 AI 研究'),
        text('Companion apps', '伙伴应用'),
        text('Presence designers', '临场感设计师'),
      ],
      [
        faq(
          'Why is Sesame famous?',
          'Sesame 为什么出名？',
          'Its demos showed voice presence natural enough to feel like talking to a person.',
          '其演示展现出足以乱真的语音临场感，像在和真人交谈。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'livekit',
    name: 'LiveKit',
    maker: 'LiveKit',
    website: 'https://livekit.io/',
    logo: 'https://livekit.io/favicon.ico',
    tags: [
      tag('open-source', 'Open source', '开源'),
      tag('low-latency', 'Low latency', '低延迟'),
      tag('streaming-video', 'Streaming video', '流式视频'),
    ],
    tagline: text(
      'The open-source WebRTC stack behind realtime video AI.',
      '支撑实时视频 AI 的开源 WebRTC 底座。'
    ),
    description: text(
      'LiveKit’s Agents framework and SFU move sub-second audio and video for live avatar and streaming AI products.',
      'LiveKit 的 Agents 框架与 SFU 为实时数字人和流式 AI 产品提供亚秒级音视频传输。'
    ),
    note: text('Best for: building realtime pipelines', '适合：构建实时管线'),
    tone: 'plum',
    seo: seo(
      text(
        'LiveKit is the open-source realtime video infrastructure that many live AI avatar and streaming products are built on.',
        'LiveKit 是开源实时视频基础设施，许多实时 AI 数字人和流式产品都构建在它之上。'
      ),
      [
        step(
          'Set up LiveKit',
          '部署 LiveKit',
          'Run the SFU yourself or use their cloud.',
          '自托管 SFU 或使用官方云服务。'
        ),
        step(
          'Add Agents',
          '接入 Agents',
          'Use the framework to give agents voice and video.',
          '用 Agents 框架赋予智能体语音和视频能力。'
        ),
        step(
          'Stream anywhere',
          '随处推流',
          'Deliver sub-second media to browsers and apps.',
          '向浏览器和应用提供亚秒级媒体流。'
        ),
      ],
      [
        text('Open-source WebRTC stack', '开源 WebRTC 技术栈'),
        text('Agents framework for AI', '面向 AI 的 Agents 框架'),
        text('Sub-second latency', '亚秒级延迟'),
      ],
      [
        text('AI product engineers', 'AI 产品工程师'),
        text('Self-hosters', '自托管团队'),
        text('Live experience builders', '实时体验开发者'),
      ],
      [
        faq(
          'Who uses LiveKit?',
          '谁在用 LiveKit?',
          'It powers realtime audio and video for a wide range of AI avatar and livestream products.',
          '许多 AI 数字人和直播产品的实时音视频都由它驱动。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'daydream',
    name: 'Daydream',
    maker: 'Livepeer community',
    website: 'https://livepeer.org/ecosystem/daydream',
    logo: 'https://livepeer.org/favicon.ico',
    tags: [
      tag('open-source', 'Open source', '开源'),
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('world-studio', 'World studio', '世界工作室'),
    ],
    tagline: text(
      'A local-first, open-source runtime for realtime generative video.',
      '本地优先的实时生成视频开源运行时。'
    ),
    description: text(
      'Daydream gives builders a node-graph studio and WebRTC streaming to run their own live generative video scenes.',
      'Daydream 提供节点图工作室和 WebRTC 推流，让开发者运行自己的实时生成视频场景。'
    ),
    note: text('Best for: local generative runtimes', '适合：本地生成式运行时'),
    tone: 'amber',
    seo: seo(
      text(
        'Daydream is an open-source, local-first runtime for building and streaming realtime generative video scenes.',
        'Daydream 是开源、本地优先的运行时，用于构建并推流实时生成视频场景。'
      ),
      [
        step(
          'Install locally',
          '本地安装',
          'Run the Daydream runtime on your own machine.',
          '在自己的机器上运行 Daydream。'
        ),
        step(
          'Wire a graph',
          '搭建节点图',
          'Compose models and effects in the node studio.',
          '在节点工作室中编排模型和效果。'
        ),
        step(
          'Stream it out',
          '推流输出',
          'Publish your live scene over WebRTC.',
          '通过 WebRTC 发布实时场景。'
        ),
      ],
      [
        text('Local-first execution', '本地优先执行'),
        text('Node-graph studio', '节点图工作室'),
        text('WebRTC streaming', 'WebRTC 推流'),
      ],
      [
        text('Creative coders', '创意程序员'),
        text('VJs and live artists', 'VJ 和现场艺术家'),
        text('Open-source builders', '开源开发者'),
      ],
      [
        faq(
          'Does Daydream run in the cloud?',
          'Daydream 能在云端运行吗？',
          'It is local-first by design — you run it where your models live.',
          '它设计上本地优先——在模型所在之处运行。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'livepeer',
    name: 'Livepeer',
    maker: 'Livepeer',
    website: 'https://livepeer.org/',
    logo: 'https://livepeer.org/favicon.ico',
    tags: [
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('low-latency', 'Low latency', '低延迟'),
      tag('interactive-video', 'Interactive video', '互动视频'),
    ],
    tagline: text(
      'Open video infrastructure with an AI compute network.',
      '自带 AI 算力网络的开放视频基础设施。'
    ),
    description: text(
      'Livepeer’s network gives developers scalable, cost-efficient video pipelines — from livestreams to generative video jobs.',
      'Livepeer 网络为开发者提供可扩展、高性价比的视频管线——从直播到生成式视频任务。'
    ),
    note: text('Best for: scaling video AI', '适合：视频 AI 规模化'),
    tone: 'coral',
    seo: seo(
      text(
        'Livepeer is open video infrastructure whose network powers both traditional streaming and AI video workloads.',
        'Livepeer 是开放视频基础设施，其网络同时支撑传统直播和 AI 视频负载。'
      ),
      [
        step(
          'Get an API key',
          '获取 API 密钥',
          'Sign up for the Livepeer Studio dashboard.',
          '注册 Livepeer Studio 控制台。'
        ),
        step(
          'Stream or generate',
          '直播或生成',
          'Ingest live video and run AI video jobs on the network.',
          '接入直播视频，并在网络上运行 AI 视频任务。'
        ),
        step(
          'Deliver globally',
          '全球分发',
          'Serve audiences through the decentralized network.',
          '通过去中心化网络服务观众。'
        ),
      ],
      [
        text('Open-source network', '开源网络'),
        text('AI video pipelines', 'AI 视频管线'),
        text('Cost-efficient delivery', '高性价比分发'),
      ],
      [
        text('Video developers', '视频开发者'),
        text('Streaming platforms', '直播平台'),
        text('AI video startups', 'AI 视频初创'),
      ],
      [
        faq(
          'Is Livepeer only for livestreaming?',
          'Livepeer 只做直播吗？',
          'No — its network also runs AI video compute for generative workloads.',
          '不是——其网络也为生成式负载提供 AI 视频算力。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'daily',
    name: 'Daily',
    maker: 'Daily',
    website: 'https://www.daily.co/',
    logo: 'https://www.daily.co/favicon.ico',
    tags: [
      tag('low-latency', 'Low latency', '低延迟'),
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('realtime-agent', 'Real-time agent', '实时智能体'),
    ],
    tagline: text(
      'Realtime voice, video, and AI infrastructure for developers.',
      '面向开发者的实时语音、视频与 AI 基础设施。'
    ),
    description: text(
      'Daily’s WebRTC APIs and AI agents framework power live video bots, avatars, and conversational apps.',
      'Daily 的 WebRTC API 与 AI 智能体框架驱动实时视频机器人、数字人和对话应用。'
    ),
    note: text(
      'Best for: video agents in production',
      '适合：生产级视频智能体'
    ),
    tone: 'cobalt',
    seo: seo(
      text(
        'Daily provides realtime voice and video APIs with an agents framework for building live AI video experiences.',
        'Daily 提供实时语音和视频 API,并配套智能体框架，用于构建实时 AI 视频体验。'
      ),
      [
        step(
          'Add the call API',
          '接入通话 API',
          'Drop realtime video into your app.',
          '为应用加入实时视频能力。'
        ),
        step(
          'Plug in an agent',
          '接入智能体',
          'Let AI participants join and respond live.',
          '让 AI 参与者加入通话并实时回应。'
        ),
        step(
          'Ship it',
          '上线',
          'Scale to production with recording and analytics.',
          '借助录制和分析能力扩展到生产环境。'
        ),
      ],
      [
        text('WebRTC APIs', 'WebRTC API'),
        text('AI agents framework', 'AI 智能体框架'),
        text('Production tooling', '生产级工具链'),
      ],
      [
        text('App developers', '应用开发者'),
        text('AI agent builders', 'AI 智能体开发者'),
        text('Telehealth and education', '远程医疗与教育'),
      ],
      [
        faq(
          'Can AI agents join Daily calls?',
          'AI 智能体能加入 Daily 通话吗？',
          'Yes — its agents framework lets AI participants see, hear, and speak in calls.',
          '可以——其智能体框架让 AI 参与者在通话中能看、能听、能说。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'aituber-kit',
    name: 'AITuber Kit',
    maker: 'tegnike',
    website: 'https://github.com/tegnike/aituber-kit',
    logo: 'https://github.com/favicon.ico',
    tags: [
      tag('ai-vtuber', 'AI VTuber', 'AI 虚拟主播'),
      tag('open-source', 'Open source', '开源'),
      tag('voice-interaction', 'Voice interaction', '语音互动'),
    ],
    tagline: text(
      'The popular open-source starter for your own AI streamer.',
      '广受欢迎的开源 AI 主播启动套件。'
    ),
    description: text(
      'AITuber Kit wires Live2D avatars to LLMs, speech, and memory so you can run an interactive AI character live.',
      'AITuber Kit 将 Live2D 形象与大模型、语音和记忆相连，让你运行可互动的实时 AI 角色。'
    ),
    note: text(
      'Best for: starting an AI character',
      '适合：起步做一个 AI 角色'
    ),
    tone: 'plum',
    seo: seo(
      text(
        'AITuber Kit is a well-known open-source starter kit for building interactive AI VTuber characters.',
        'AITuber Kit 是知名的开源启动套件，用于构建可互动的 AI 虚拟主播角色。'
      ),
      [
        step(
          'Clone the kit',
          '克隆套件',
          'Install the open-source starter locally.',
          '在本地安装这个开源套件。'
        ),
        step(
          'Pick an avatar',
          '选择形象',
          'Load a Live2D model and connect your LLM.',
          '加载 Live2D 模型并接入你的大模型。'
        ),
        step(
          'Interact live',
          '实时互动',
          'Talk with the character and take it on stream.',
          '与角色对话，并带它上直播。'
        ),
      ],
      [
        text('Live2D avatar support', '支持 Live2D 形象'),
        text('Multi-LLM connections', '可接入多家大模型'),
        text('Speech and memory built in', '内置语音与记忆'),
      ],
      [
        text('Indie creators', '独立创作者'),
        text('Developers learning agents', '学习智能体的开发者'),
        text('VTuber experimenters', '虚拟主播玩家'),
      ],
      [
        faq(
          'What do I need to run it?',
          '运行它需要什么？',
          'The repo, a Live2D model, and API keys for the models you want to use.',
          '仓库本体、一个 Live2D 模型，以及所选模型的 API 密钥。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'scienjoy',
    name: 'Scienjoy',
    maker: 'Scienjoy',
    website: 'https://ir.scienjoy.com/',
    logo: 'https://ir.scienjoy.com/favicon.ico',
    tags: [
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('ai-vtuber', 'AI VTuber', 'AI 虚拟主播'),
      tag('interactive-video', 'Interactive video', '互动视频'),
    ],
    tagline: text(
      'Live entertainment group building AIGC-driven streaming shows.',
      '打造 AIGC 直播综艺的互动娱乐集团。'
    ),
    description: text(
      'Scienjoy weaves AI-generated performers and virtual idols into always-on live entertainment at scale in China.',
      'Scienjoy 将 AI 生成艺人和虚拟偶像融入中国大规模、全天候的直播互动娱乐。'
    ),
    note: text('Best for: AIGC live entertainment', '适合：AIGC 直播娱乐'),
    tone: 'amber',
    seo: seo(
      text(
        'Scienjoy is a live-entertainment company investing in AI-generated performers and always-on interactive shows.',
        'Scienjoy 是一家直播娱乐公司，正大力投入 AI 生成艺人与全天候互动节目。'
      ),
      [
        step(
          'Follow the company',
          '关注公司',
          'Track their AIGC livestream initiatives.',
          '了解他们的 AIGC 直播项目。'
        ),
        step(
          'Watch the shows',
          '观看节目',
          'AI performers appear across their live platforms.',
          'AI 艺人出现在其直播平台的内容中。'
        ),
        step(
          'See the roadmap',
          '看清方向',
          'Virtual idols increasingly anchor their formats.',
          '虚拟偶像日益成为其节目核心。'
        ),
      ],
      [
        text('Listed company (NASDAQ)', '纳斯达克上市公司'),
        text('AIGC performer investment', '投入 AIGC 艺人'),
        text('Massive live audience', '庞大直播观众群'),
      ],
      [
        text('Industry watchers', '行业观察者'),
        text('Virtual idol fans', '虚拟偶像粉丝'),
        text('Live platform analysts', '直播平台分析师'),
      ],
      [
        faq(
          'What does Scienjoy do?',
          'Scienjoy 做什么？',
          'It operates live streaming entertainment and is building AI-generated performers into its shows.',
          '运营直播娱乐业务，并正在把 AI 生成艺人融入节目。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'volcengine-dh',
    name: 'Volcano Engine Digital Human',
    maker: 'ByteDance',
    website: 'https://www.volcengine.com/product/digital-human',
    logo: 'https://www.volcengine.com/favicon.ico',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('live-streaming', 'Live streaming', '实时流式生成'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'ByteDance’s digital human platform for live commerce and service.',
      '字节跳动旗下、面向直播电商与服务的数字人平台。'
    ),
    description: text(
      'Volcano Engine’s digital human product streams real-time AI hosts for livestream selling, customer service, and virtual presenters at scale.',
      '火山引擎数字人产品为直播带货、客服和虚拟主持场景提供规模化实时 AI 主播。'
    ),
    note: text('Best for: commerce-grade hosts', '适合：电商级数字主持'),
    tone: 'cobalt',
    seo: seo(
      text(
        'Volcano Engine, ByteDance’s cloud, offers a digital human platform that streams real-time AI hosts for commerce.',
        '字节跳动旗下火山引擎提供数字人平台，为电商场景流式输出实时 AI 主播。'
      ),
      [
        step(
          'Configure a host',
          '配置主播',
          'Design the look, voice, and script logic.',
          '设计形象、声音和话术逻辑。'
        ),
        step(
          'Start streaming',
          '开始直播',
          'The digital human presents and sells live.',
          '数字人实时讲解和带货。'
        ),
        step(
          'Scale channels',
          '扩展频道',
          'Run many rooms and sessions in parallel.',
          '并行运营多个直播间和会话。'
        ),
      ],
      [
        text('Real-time AI hosts', '实时 AI 主播'),
        text('Commerce integrations', '电商集成'),
        text('ByteDance cloud scale', '字节云规模'),
      ],
      [
        text('E-commerce brands', '电商品牌'),
        text('MCN agencies', 'MCN 机构'),
        text('Enterprise service', '企业服务'),
      ],
      [
        faq(
          'What is Volcano Engine Digital Human?',
          '火山引擎数字人是什么？',
          'A ByteDance cloud product that streams real-time digital human hosts for live selling and service.',
          '字节云产品，为直播带货和服务场景提供实时数字人主播。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'elevenlabs-avatars',
    name: 'ElevenLabs Avatars',
    maker: 'ElevenLabs',
    website: 'https://elevenlabs.io/avatars',
    logo: 'https://elevenlabs.io/favicon.ico',
    tags: [
      tag('speech-to-video', 'Speech to video', '语音生成视频'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
    ],
    tagline: text(
      'The best AI voices, now with a face — from audio to talking video fast.',
      '顶级 AI 语音长出面孔——从音频极速生成会说话的视频。'
    ),
    description: text(
      'ElevenLabs Avatars turns a voice and script into studio-grade talking-head video in seconds, with real-time LiveAvatar integrations for live streams.',
      'ElevenLabs Avatars 能在几秒内把声音和脚本变成演播室级谈话视频，并可通过 LiveAvatar 集成实现实时直播。'
    ),
    note: text(
      'Best for: voice-first avatar video',
      '适合：语音优先的数字人视频'
    ),
    tone: 'moss',
    seo: seo(
      text(
        'ElevenLabs Avatars pairs the company’s voices with generated faces to produce talking video, fast enough for interactive flows.',
        'ElevenLabs Avatars 将其顶级语音与生成面孔结合，产出谈话视频，速度足以支撑互动流程。'
      ),
      [
        step(
          'Pick a voice and face',
          '选择声音和面孔',
          'Combine any ElevenLabs voice with an avatar.',
          '把任意 ElevenLabs 语音与数字人形象组合。'
        ),
        step(
          'Generate the video',
          '生成视频',
          'Talking-head video renders from your script in seconds.',
          '几秒内即可由脚本渲染出谈话视频。'
        ),
        step(
          'Go realtime',
          '走向实时',
          'Use LiveAvatar integrations for live conversations.',
          '通过 LiveAvatar 集成实现实时对话。'
        ),
      ],
      [
        text('Top-tier AI voices', '顶级 AI 语音'),
        text('Script to video in seconds', '几秒从脚本到视频'),
        text('Realtime integration path', '实时集成方案'),
      ],
      [
        text('Creators', '创作者'),
        text('Product teams', '产品团队'),
        text('Voice app builders', '语音应用开发者'),
      ],
      [
        faq(
          'Can ElevenLabs avatars run live?',
          'ElevenLabs 数字人能实时运行吗？',
          'Directly they render fast scripted video; for live streams, integrations like LiveAvatar add real-time faces.',
          '直接使用时为快速脚本渲染；实时直播可通过 LiveAvatar 等集成添加实时面孔。'
        ),
      ]
    ),
  },
];

const HIDDEN_PRODUCT_SLUGS = new Set([
  'mirage',
  'marble',
  'seaweed-apt2',
  'channel-1',
  'oasis',
  'lucy',
]);

const productPreviewImages: Record<string, string> = {
  'krea-realtime': '/imgs/product-previews/krea-realtime.jpg',
  'pixverse-r2': '/imgs/product-previews/pixverse-r2.jpg',
  'project-genie': '/imgs/product-previews/project-genie.jpg',
  'visko-orbis': '/imgs/product-previews/visko-orbis.jpg',
  'happy-oyster': '/imgs/product-previews/happy-oyster.jpg',
  'pan-world': '/imgs/product-previews/pan-world.jpg',
  'odyssey-1': '/imgs/product-previews/odyssey-1.jpg',
  liveavatar: '/imgs/product-previews/liveavatar.jpg',
  anam: '/imgs/product-previews/anam.jpg',
  'tavus-pals': '/imgs/product-previews/tavus-pals.jpg',
  'did-visual-agents': '/imgs/product-previews/did-visual-agents.jpg',
  simli: '/imgs/product-previews/simli.jpg',
};

// Product hero fallback (240×240 capture of the product's own site) shown when
// a dedicated 16:9 preview is not available. Every catalog slug is covered.
const productHeroThumbs: Record<string, string> = Object.fromEntries(
  realtimeProducts.map((product) => [
    product.slug,
    `/imgs/product-thumbs/${product.slug}.jpg`,
  ])
);

export const mockProducts = realtimeProducts;
export const categoryKeys: ProductCategory[] = ['realtime'];

function getProductProfile(
  product: MockAiProduct,
  locale: CatalogLocale
): CatalogProductProfile {
  const isZh = locale === 'zh';
  return {
    valueProposition: product.description[locale],
    problemSolved: isZh
      ? '传统视频生成通常要等待成片，难以在画面生成过程中及时干预。实时视频产品把反馈和控制带回生成现场。'
      : 'Traditional video generation often makes you wait for a finished clip. Real-time video products bring feedback and control back into the generation loop.',
    audience: isZh
      ? '适合创意技术人员、开发者，以及需要实时互动视觉体验的产品和内容团队。'
      : 'For creative technologists, developers, and product teams building live visual experiences.',
    pricing: isZh
      ? '通过官方网站使用在线服务，套餐、积分、地区和 API 条件以产品官网为准。'
      : 'Hosted access is available through the official website. Plans, credits, regions, and API terms vary by product.',
    market: [
      product.categoryLabel[locale],
      ...product.tags.slice(0, 3).map((item) => item.label[locale]),
    ],
    techStack: isZh
      ? ['官方在线产品', '实时视频流', '浏览器 / API 接入']
      : [
          'Official hosted product',
          'Real-time video stream',
          'Browser / API access',
        ],
  };
}

export function getProducts(locale: CatalogLocale): CatalogProduct[] {
  return mockProducts
    .filter((product) => !HIDDEN_PRODUCT_SLUGS.has(product.slug))
    .map((product) => {
      const sourceDomain = new URL(product.website).hostname.replace(
        /^www\./,
        ''
      );
      const sourceUpdatedAt = product.lastVerifiedAt ?? LAST_VERIFIED_AT;

      return {
        ...product,
        previewImage:
          productPreviewImages[product.slug] ?? productHeroThumbs[product.slug],
        heroThumb: productHeroThumbs[product.slug],
        tagline: product.tagline[locale],
        description: product.description[locale],
        note: product.note[locale],
        categoryName: product.categoryLabel[locale],
        tagNames: product.tags.map((productTag) => productTag.label[locale]),
        sourceDomain,
        sourceUpdatedAt,
        profile: getProductProfile(product, locale),
        seo: {
          whatIs: product.seo.whatIs[locale],
          howToUse: product.seo.howToUse.map((productStep) => ({
            title: productStep.title[locale],
            description: productStep.description[locale],
          })),
          keyFeatures: product.seo.keyFeatures.map(
            (feature) => feature[locale]
          ),
          bestFor: product.seo.bestFor.map((item) => item[locale]),
          faqs: product.seo.faqs.map((productFaq) => ({
            question: productFaq.question[locale],
            answer: productFaq.answer[locale],
          })),
        },
      };
    });
}

export function getProduct(
  slug: string,
  locale: CatalogLocale
): CatalogProduct | null {
  return getProducts(locale).find((product) => product.slug === slug) ?? null;
}

export interface SubmittedProductRecord {
  slug: string;
  name: string;
  website: string;
  category: string;
  description: string;
  createdAt: Date | string | number | null;
}

function normalizeProductCategory(value: string): ProductCategory {
  return value in productCategoryLabels
    ? (value as ProductCategory)
    : 'realtime';
}

function getSourceDomain(website: string): string {
  try {
    return new URL(website).hostname.replace(/^www\./, '');
  } catch {
    return website;
  }
}

function formatSubmissionDate(value: SubmittedProductRecord['createdAt']) {
  const date = value instanceof Date ? value : new Date(value ?? '');
  return Number.isNaN(date.getTime())
    ? LAST_VERIFIED_AT
    : date.toISOString().slice(0, 10);
}

/** Convert a public form submission into the same shape as curated products. */
export function toCatalogProduct(
  submission: SubmittedProductRecord,
  locale: CatalogLocale
): CatalogProduct {
  const category = normalizeProductCategory(submission.category);
  const categoryLabel = productCategoryLabels[category];
  const sourceDomain = getSourceDomain(submission.website);
  const description = submission.description;
  const submittedLabel = locale === 'zh' ? '用户提交' : 'Community submission';
  const officialLabel = locale === 'zh' ? '官方网站' : 'Official website';
  const liveLabel =
    locale === 'zh' ? '实时视频产品' : 'Real-time video product';
  const steps =
    locale === 'zh'
      ? [
          {
            title: '打开产品官网',
            description: `访问 ${sourceDomain}，了解产品的完整体验。`,
          },
          {
            title: '选择使用方式',
            description: '根据产品页面提供的功能和入口开始体验。',
          },
          {
            title: '验证实时能力',
            description: '通过实际操作确认生成、编辑或互动视频能力。',
          },
        ]
      : [
          {
            title: 'Open the official site',
            description: `Visit ${sourceDomain} to see the complete product experience.`,
          },
          {
            title: 'Choose a workflow',
            description:
              'Start with the feature or entry point that fits your use case.',
          },
          {
            title: 'Try the live capability',
            description:
              'Use the product to verify its generation, editing, or interactive video loop.',
          },
        ];
  const keyFeatures =
    locale === 'zh'
      ? ['实时视频体验', '官方网站入口', '社区提交产品']
      : [
          'Real-time video experience',
          'Official website access',
          'Community-submitted product',
        ];
  const bestFor =
    locale === 'zh'
      ? ['产品发现', '实时视频体验', categoryLabel.zh]
      : ['Product discovery', 'Real-time video experiences', categoryLabel.en];

  return {
    slug: submission.slug,
    name: submission.name,
    maker: sourceDomain,
    website: submission.website,
    sourceType: 'website',
    lastVerifiedAt: formatSubmissionDate(submission.createdAt),
    category,
    categoryLabel,
    tags: [
      tag('community-submission', 'Community submission', '用户提交'),
      tag('official-website', 'Official website', '官方网站'),
    ],
    image: '',
    tone: 'cobalt',
    tagline: description,
    description,
    note: `${submittedLabel} · ${officialLabel}`,
    categoryName: categoryLabel[locale],
    tagNames: [submittedLabel, liveLabel],
    sourceDomain,
    sourceUpdatedAt: formatSubmissionDate(submission.createdAt),
    heroThumb: '',
    seo: {
      whatIs: description,
      howToUse: steps,
      keyFeatures,
      bestFor,
      faqs: [
        {
          question:
            locale === 'zh'
              ? `${submission.name} 是什么？`
              : `What is ${submission.name}?`,
          answer: description,
        },
      ],
    },
    profile: {
      valueProposition: description,
      problemSolved:
        locale === 'zh'
          ? '帮助用户更快发现并体验新的实时视频产品。'
          : 'Helps people discover and try a new real-time video product faster.',
      audience:
        locale === 'zh'
          ? '适合正在寻找实时视频工具、Demo 或工作流的创作者和产品团队。'
          : 'For creators and product teams looking for real-time video tools, demos, or workflows.',
      pricing:
        locale === 'zh'
          ? '访问官方网站查看当前的套餐、试用和使用条件。'
          : 'Visit the official website for current plans, trials, and access terms.',
      market: [categoryLabel[locale], submittedLabel],
      techStack: [sourceDomain, officialLabel, liveLabel],
    },
  };
}
