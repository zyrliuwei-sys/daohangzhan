import { aiToolsBatch2 } from '@/lib/ai-tools-batch-2';
import { generalAiProducts } from '@/lib/general-ai-products';
import { getWebsiteScreenshotUrl } from '@/lib/website-preview';

export type CatalogLocale = 'en' | 'zh';

// This directory contains hosted products, creative templates, playable demos,
// and a small number of open-source models/workflows useful to builders.
export type ProductCategory =
  | 'realtime'
  | 'text-to-video'
  | 'image-to-video'
  | 'avatar-live'
  | 'video-editing'
  | 'workflow'
  | 'models'
  | 'assistant'
  | 'research'
  | 'coding'
  | 'audio'
  | 'writing';
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

export interface LocalizedProductProfile {
  valueProposition: LocalizedText;
  problemSolved: LocalizedText;
  audience: LocalizedText;
  pricing: LocalizedText;
  market: LocalizedText[];
  techStack: LocalizedText[];
}

export interface LocalizedProductSpec {
  label: LocalizedText;
  value: LocalizedText;
}

export interface MockAiProduct {
  slug: string;
  name: string;
  /** Other names people search for (misspellings, brand variants). */
  aliases?: string[];
  /**
   * Primary search keyword when it differs from the brand name. Shown next
   * to the name in the detail page <title> and H1 (e.g. "Vikas Edit - Vikas
   * Editor").
   */
  seoKeyword?: string;
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
  relatedSlugs?: string[];
  profile?: LocalizedProductProfile;
  specs?: LocalizedProductSpec[];
  seo: ProductSeoContent;
}

export interface CatalogProduct extends Omit<
  MockAiProduct,
  'tagline' | 'description' | 'note' | 'seo' | 'profile' | 'specs'
> {
  tagline: string;
  description: string;
  note: string;
  categoryName: string;
  tagNames: string[];
  sourceDomain: string;
  sourceUpdatedAt: string;
  heroThumb?: string;
  seo: CatalogSeoContent;
  profile: CatalogProductProfile;
  relatedSlugs: string[];
  specs: Array<{ label: string; value: string }>;
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
  models: { en: 'Image creation', zh: '图像创作' },
  assistant: { en: 'AI assistants & agents', zh: 'AI 助手与 Agent' },
  research: { en: 'Research', zh: '研究与学习' },
  coding: { en: 'Coding & app builders', zh: '编程与应用生成' },
  audio: { en: 'Voice & music', zh: '语音与音乐' },
  writing: { en: 'Writing & detection', zh: '写作与检测' },
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

function spec(
  labelEn: string,
  labelZh: string,
  valueEn: string,
  valueZh: string
): LocalizedProductSpec {
  return { label: text(labelEn, labelZh), value: text(valueEn, valueZh) };
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
    slug: 'jev',
    name: 'Jev',
    maker: 'TypeSafe AI',
    website: 'https://console.typesafe.ai/',
    logo: 'https://typesafe.ai/favicon.ico',
    category: 'workflow',
    categoryLabel: productCategoryLabels.workflow,
    lastVerifiedAt: '2026-09-28',
    tags: [
      tag('typed-decisions', 'Typed decisions', '类型化决策'),
      tag('confidence-aware', 'Confidence-aware', '置信度感知'),
      tag('agent-workflows', 'Agent workflows', 'Agent 工作流'),
    ],
    tagline: text(
      'Typed answers with probabilities and confidence, not generated prose.',
      '输出类型化答案、概率和置信度，而非生成文本。'
    ),
    description: text(
      'Jev is TypeSafe AI’s first System One model. Send it application state and focused typed questions; it returns structured decisions that code can route, rank, filter, or escalate without parsing free-form text.',
      'Jev 是 TypeSafe AI 首个 System One 模型。把应用状态和聚焦的类型化问题交给它，它会返回代码可以直接用于路由、排序、筛选或升级人工处理的结构化决策，无需解析自由文本。'
    ),
    note: text(
      'Best for: bounded decisions inside AI workflows',
      '适合：AI 工作流中的边界明确决策'
    ),
    tone: 'cobalt',
    featured: true,
    seo: seo(
      text(
        'Jev is TypeSafe AI’s first System One decision model. It is built for software that needs fast, repeatable judgments rather than another chat response: classify a request, choose a tool, score a document, or decide whether a case needs review. Its answers are constrained to types you define and include probabilities and confidence so ordinary code stays in control.',
        'Jev 是 TypeSafe AI 首个 System One 决策模型，面向需要快速、可重复判断的软件，而不是再生成一段聊天回复：它可以分类请求、选择工具、给文档评分，或判断某个案例是否需要人工复核。它的输出被限制在你定义的类型内，并附带概率和置信度，让普通代码继续掌控工作流。'
      ),
      [
        step(
          'Open the TypeSafe console',
          '打开 TypeSafe 控制台',
          'Sign in at console.typesafe.ai and use the playground to shape a focused decision question.',
          '在 console.typesafe.ai 登录，通过 Playground 设计一个边界清晰的决策问题。'
        ),
        step(
          'Describe state and question types',
          '描述状态与问题类型',
          'Provide the state your software already has, then define a Choice, Score, or Noul question with the output shape you need.',
          '传入软件已有的状态，再定义 Choice、Score 或 Noul 问题，明确需要的输出形状。'
        ),
        step(
          'Gate actions in code',
          '在代码中控制后续动作',
          'Use the returned value, probability, and confidence to route, rank, automate, or send uncertain cases to review.',
          '用返回值、概率和置信度进行路由、排序、自动化，或把不确定案例交给人工复核。'
        ),
      ],
      [
        text(
          'Choice, Score, and Noul primitives',
          'Choice、Score 与 Noul 三种原语'
        ),
        text('Typed outputs with probabilities', '带概率分布的类型化输出'),
        text('Confidence-gated automation', '基于置信度的自动化门控'),
        text('No free-form text parsing', '无需解析自由文本'),
      ],
      [
        text('Intent and tool routing', '意图识别与工具路由'),
        text('Content moderation and guardrails', '内容审核与安全护栏'),
        text('RAG ranking and verification', 'RAG 排序与结果校验'),
        text('High-volume agent workflows', '高吞吐 Agent 工作流'),
      ],
      [
        faq(
          'Is Jev a chat model?',
          'Jev 是聊天模型吗？',
          'No. Jev is designed to return typed decisions for software. Use a generative model when you need drafting, summarization, long-form explanation, or open-ended conversation.',
          '不是。Jev 的目标是为软件返回类型化决策；如果需要写作、总结、长篇解释或开放式对话，应使用生成式模型。'
        ),
        faq(
          'What does Jev return?',
          'Jev 会返回什么？',
          'Choice selects from a defined set, Score rates against ordered levels, and Noul returns the probability of a yes/no proposition. Choice and Score also include probability distributions and confidence.',
          'Choice 从预先定义的选项中选择，Score 按有序等级评分，Noul 返回一个是/否命题为真的概率。Choice 和 Score 还会提供概率分布与置信度。'
        ),
        faq(
          'Can Jev still be wrong?',
          'Jev 也会出错吗？',
          'Yes. Type-safe means the result cannot violate the output shape you defined; it does not mean every judgment is correct. Use confidence and probabilities to decide when to automate and when to review.',
          '会。类型安全意味着结果不会违反你定义的输出形状，但不代表每次判断都正确。应结合置信度和概率决定何时自动执行、何时人工复核。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'pikastream-1',
    name: 'PikaStream1.0',
    maker: 'Pika',
    website:
      'https://experiment.pika.art/blog/introducing-real-time-video-chat',
    logo: 'https://pika.art/favicon.ico',
    previewImage: '',
    lastVerifiedAt: '2026-09-20',
    tags: [
      tag('streaming-video', 'Streaming video', '流式视频'),
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('voice-interaction', 'Voice interaction', '语音交互'),
    ],
    tagline: text(
      'Talk face-to-face with an AI agent at live video speed.',
      '以实时视频速度与 AI 智能体面对面交谈。'
    ),
    description: text(
      'Pika’s real-time visual engine generates personalized 480p video at 24 FPS with about 1.5 seconds of end-to-end speech-to-video latency.',
      'Pika 的实时视觉引擎以 24 FPS 生成个性化 480p 视频，端到端语音转视频延迟约为 1.5 秒。'
    ),
    note: text('Best for: face-to-face AI agents', '适合：面对面 AI 智能体'),
    tone: 'plum',
    featured: true,
    seo: seo(
      text(
        'PikaStream1.0 is a real-time speech-to-video engine for live AI-agent conversations. It streams personalized video at 24 FPS instead of waiting for a completed clip.',
        'PikaStream1.0 是面向实时 AI 智能体对话的语音转视频引擎。它以 24 FPS 持续流式生成个性化画面，无需等待完整视频片段。'
      ),
      [
        step(
          'Open the official Pika research page',
          '打开 Pika 官方研究页',
          'Review the live-agent workflow and the official performance details.',
          '查看实时智能体工作流和官方性能数据。'
        ),
        step(
          'Start a live conversation',
          '开始实时对话',
          'Use a Pika AI Self or the published Pika skill in a supported call.',
          '在支持的通话中使用 Pika AI Self 或官方发布的 Pika Skill。'
        ),
        step(
          'Interact while video streams',
          '在视频流中交互',
          'Speak naturally while the engine generates the agent’s next frames chunk by chunk.',
          '自然说话，观看引擎逐块生成智能体的后续画面。'
        ),
      ],
      [
        text('24 FPS personalized video', '24 FPS 个性化视频'),
        text('About 1.5-second end-to-end latency', '约 1.5 秒端到端延迟'),
        text('Chunk-by-chunk streaming generation', '逐块流式生成'),
      ],
      [
        text('Conversational AI products', '对话式 AI 产品'),
        text('Live AI assistants', '实时 AI 助手'),
        text('Identity-consistent video agents', '身份一致的视频智能体'),
      ],
      [
        faq(
          'Why does PikaStream1.0 count as real-time video?',
          'PikaStream1.0 为什么属于实时视频？',
          'Pika reports 24 FPS streaming video and about 1.5 seconds from speech input to video output, with the model generating each sequence chunk by chunk.',
          'Pika 公布的数据是 24 FPS 流式视频，从语音输入到视频输出约 1.5 秒，模型会逐块生成后续画面。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'mira',
    name: 'MIRA',
    maker: 'General Intuition + Kyutai',
    website: 'https://mira-wm.com/',
    logo: 'https://mira-wm.com/favicon.ico',
    previewImage: '',
    lastVerifiedAt: '2026-09-20',
    tags: [
      tag('playable-world', 'Playable world', '可玩世界'),
      tag('multiplayer', 'Multiplayer', '多人互动'),
      tag('low-latency', 'Low latency', '低延迟'),
    ],
    tagline: text(
      'Play a four-player world model generated live at 20 FPS.',
      '体验以 20 FPS 实时生成的四人世界模型。'
    ),
    description: text(
      'A playable official demo from General Intuition and Kyutai that simulates a four-player Rocket League-like world in real time from player inputs.',
      '由 General Intuition 与 Kyutai 推出的可玩官方 demo，会根据玩家输入实时生成四人类《火箭联盟》世界。'
    ),
    note: text(
      'Best for: multiplayer world-model research',
      '适合：多人世界模型研究'
    ),
    tone: 'cobalt',
    featured: true,
    seo: seo(
      text(
        'MIRA is a multiplayer interactive world model with an official live demo. The generated game world runs at 20 FPS and reacts to the keys pressed by every player.',
        'MIRA 是带官方实时 demo 的多人交互世界模型。生成的游戏世界以 20 FPS 运行，并根据每位玩家的按键即时响应。'
      ),
      [
        step(
          'Open the live demo',
          '打开实时 demo',
          'Visit the official MIRA page and choose one of the available games.',
          '访问 MIRA 官方页并选择可用游戏。'
        ),
        step(
          'Join the generated match',
          '加入生成对局',
          'Enter the shared four-player simulation.',
          '进入共享的四人实时模拟。'
        ),
        step(
          'Steer with player input',
          '用玩家输入操控',
          'Use the game controls and watch the model generate the next frames at 20 FPS.',
          '使用游戏控件，观看模型以 20 FPS 生成后续画面。'
        ),
      ],
      [
        text('Official playable demo', '官方可玩 demo'),
        text('Four-player interaction', '四人互动'),
        text('Real-time 20 FPS simulation', '实时 20 FPS 模拟'),
      ],
      [
        text('Interactive world-model research', '交互世界模型研究'),
        text('Multiplayer simulation', '多人模拟'),
        text('Playable generative video', '可玩生成式视频'),
      ],
      [
        faq(
          'Is MIRA generating the game while I play?',
          'MIRA 会在我游玩时生成画面吗？',
          'Yes. Its official page says the model runs in real time at 20 FPS based on the keys pressed by you and the other players.',
          '会。官方页明确说明，模型会根据你和其他玩家的按键以 20 FPS 实时运行。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'gwm-worlds-2',
    name: 'GWM Worlds 2',
    maker: 'Runway',
    website: 'https://runway.com/research/introducing-gwm-worlds-2',
    logo: 'https://runway.com/favicon.ico',
    previewImage:
      'https://d3phaj0sisr2ct.cloudfront.net/site/research/gwm-worlds-2/images/gwm-worlds-2-card.webp',
    lastVerifiedAt: '2026-09-20',
    tags: [
      tag('realtime-world', 'Real-time world', '实时世界'),
      tag('action-conditioned', 'Action-conditioned', '动作条件控制'),
      tag('generated-audio', 'Generated audio', '生成音频'),
    ],
    tagline: text(
      'Generate and steer an audiovisual world continuously at 24 FPS.',
      '以 24 FPS 持续生成并操控视听世界。'
    ),
    description: text(
      'Runway’s research preview generates continuous 720p video at 24 FPS with 48 kHz audio, responding to text actions and camera movement as the world runs.',
      'Runway 的研究预览会以 24 FPS 持续生成 720p 视频和 48 kHz 音频，并在世界运行时响应文本动作与镜头移动。'
    ),
    note: text(
      'Best for: real-time interactive world research',
      '适合：实时互动世界研究'
    ),
    tone: 'amber',
    featured: true,
    seo: seo(
      text(
        'GWM Worlds 2 is Runway’s real-time autoregressive video-and-audio world model. It keeps generating without a preset duration while text actions and continuous camera motion change the world.',
        'GWM Worlds 2 是 Runway 的实时自回归视音频世界模型。它没有预设时长，会持续生成，并根据文本动作和连续镜头运动改变世界。'
      ),
      [
        step(
          'Define the world',
          '定义世界',
          'Set the environment, subjects, visual style, physical rules, ambience, and first frame.',
          '设置环境、主体、视觉风格、物理规则、氛围和首帧。'
        ),
        step(
          'Steer subjects and camera',
          '操控主体与镜头',
          'Send text actions while continuous camera input moves through the world.',
          '在连续镜头输入探索世界时发送文本动作。'
        ),
        step(
          'Continue without a fixed clip',
          '跳出固定片段持续生成',
          'Each new input continues the generated world rather than restarting a fixed video.',
          '每次新输入都会继续当前生成世界，而不是重新开始固定视频。'
        ),
      ],
      [
        text('Continuous 720p video at 24 FPS', '24 FPS 连续 720p 视频'),
        text('Generated 48 kHz audio', '生成 48 kHz 音频'),
        text('Immediate action and camera control', '即时动作与镜头控制'),
      ],
      [
        text('Interactive entertainment', '互动娱乐'),
        text('Virtual characters', '虚拟角色'),
        text('Embodied-agent simulation', '具身智能体模拟'),
      ],
      [
        faq(
          'What makes GWM Worlds 2 real time?',
          'GWM Worlds 2 的实时性体现在哪里？',
          'The official preview says it generates 720p video at 24 FPS while user actions take effect immediately and generation keeps running.',
          '官方预览明确说明，它以 24 FPS 生成 720p 视频，用户动作会立即生效，同时生成过程不会停止。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'vidu-s2',
    name: 'Vidu S2',
    maker: 'ShengShu Technology',
    website: 'https://www.vidu.com/vidu-stream',
    logo: 'https://www.vidu.com/favicon.ico',
    previewImage: '',
    lastVerifiedAt: '2026-09-20',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('live-editing', 'Live editing', '实时编辑'),
      tag('video-stream', 'Video stream', '视频流'),
    ],
    tagline: text(
      'Converse with avatars and transform incoming video streams live.',
      '与数字人实时对话，并即时转换输入视频流。'
    ),
    description: text(
      'Vidu S2 combines a real-time interactive avatar model with a real-time editing model for live style, subject, outfit, and background changes.',
      'Vidu S2 将实时交互数字人模型与实时编辑模型结合，支持即时改变风格、主体、服装和背景。'
    ),
    note: text(
      'Best for: live avatars and stream transformation',
      '适合：实时数字人与视频流转换'
    ),
    tone: 'coral',
    featured: true,
    seo: seo(
      text(
        'Vidu S2 includes Vidu S2-Avatar for live voice-driven characters and Vidu S2-Editing for transforming camera or video streams while they are running.',
        'Vidu S2 包含用于实时语音驱动角色的 Vidu S2-Avatar，以及在摄像头或视频流运行时实时转换画面的 Vidu S2-Editing。'
      ),
      [
        step(
          'Choose Avatar or Editing',
          '选择 Avatar 或 Editing',
          'Pick a live conversational avatar or a real-time stream-editing workflow.',
          '选择实时对话数字人或视频流实时编辑工作流。'
        ),
        step(
          'Provide live input',
          '提供实时输入',
          'Use voice, a camera, a video stream, or supported reference images.',
          '使用语音、摄像头、视频流或支持的参考图像。'
        ),
        step(
          'Watch the output change live',
          '观看输出实时变化',
          'Interrupt the conversation or change references while the output stream continues.',
          '在输出流持续运行时打断对话或更换参考内容。'
        ),
      ],
      [
        text('Real-time voice-driven avatars', '实时语音驱动数字人'),
        text('Live style and subject replacement', '实时风格与主体替换'),
        text('Camera and video-stream input', '摄像头与视频流输入'),
      ],
      [
        text('Interactive livestreams', '互动直播'),
        text('Virtual try-on', '虚拟试穿'),
        text('Real-time video transformation', '实时视频转换'),
      ],
      [
        faq(
          'Can Vidu S2 respond during a live session?',
          'Vidu S2 能在实时会话中响应吗？',
          'Yes. The official product page says online avatars support real-time conversation and interruption, while the editing model transforms active input streams in real time.',
          '可以。官方产品页说明，在线数字人支持实时对话与打断，编辑模型会实时转换正在运行的输入流。'
        ),
      ]
    ),
  },
  {
    ...sharedProductFields,
    slug: 'runway-characters',
    name: 'Runway Characters',
    maker: 'Runway',
    website: 'https://runway.com/product/characters',
    logo: 'https://runway.com/favicon.ico',
    previewImage:
      'https://runway.com/_next/static/immutable/media/og.0gj8xfgz6riuj.png',
    lastVerifiedAt: '2026-09-20',
    tags: [
      tag('realtime-avatar', 'Real-time avatar', '实时数字人'),
      tag('conversational-video', 'Conversational video', '对话式视频'),
      tag('avatar-api', 'Avatar API', '数字人 API'),
    ],
    tagline: text(
      'Turn one image into a live conversational video character.',
      '用一张图像创建可实时对话的视频角色。'
    ),
    description: text(
      'Runway Characters streams expressive conversational video at 24 FPS, with 37 ms effective model time per frame and about 1.75 seconds of server-side response time.',
      'Runway Characters 以 24 FPS 流式生成富有表现力的对话视频，每帧有效模型时间为 37 毫秒，服务端响应时间约为 1.75 秒。'
    ),
    note: text(
      'Best for: production conversational avatars',
      '适合：生产级对话数字人'
    ),
    tone: 'moss',
    featured: true,
    seo: seo(
      text(
        'Runway Characters creates real-time conversational video agents from a single reference image. Characters listen, respond, gesture, and stream video at 24 FPS during a live session.',
        'Runway Characters 能从一张参考图像创建实时对话视频智能体。角色会在实时会话中倾听、回应、做出手势，并以 24 FPS 流式生成视频。'
      ),
      [
        step(
          'Upload a character image',
          '上传角色图像',
          'Start with one reference image in any supported visual style.',
          '从任意支持的视觉风格参考图像开始。'
        ),
        step(
          'Choose a voice and knowledge',
          '选择声音与知识',
          'Assign a voice, knowledge source, and optional tools to the character.',
          '为角色设置声音、知识来源和可选工具。'
        ),
        step(
          'Start the live chat',
          '开始实时对话',
          'Talk to the character directly or embed it through the SDK, widget, or LiveKit integration.',
          '直接与角色交谈，或通过 SDK、小部件或 LiveKit 集成到产品中。'
        ),
      ],
      [
        text('24 FPS live video', '24 FPS 实时视频'),
        text('Single-image character creation', '单图角色创建'),
        text('SDK, widget, and meeting integrations', 'SDK、小部件与会议集成'),
      ],
      [
        text('Education and tutoring', '教育与辅导'),
        text('Customer support', '客户支持'),
        text('Games and interactive hosts', '游戏与互动主持人'),
      ],
      [
        faq(
          'How fast is Runway Characters?',
          'Runway Characters 有多快？',
          'Runway reports 24 FPS streaming, 37 ms effective model time per frame, and about 1.75 seconds from the end of user speech to the start of the character’s response.',
          'Runway 公布的性能为 24 FPS 流式视频、每帧 37 毫秒有效模型时间，以及从用户停止说话到角色开始回应约 1.75 秒。'
        ),
      ]
    ),
  },
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
      'Give an AI agent a face, voice, and live video.',
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
      'AI television directed live by its whole audience.',
      '由全体观众实时共同导演的 AI 电视。'
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
    aliases: ['MiniMax H3', 'MiniMax H3 Max', 'H3 Max', 'H3 Max on fal'],
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
    website: 'https://daydream.live/',
    logo: 'https://daydream.live/apple-touch-icon.png',
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
      'Turn top AI voices into talking video, fast.',
      '把顶级 AI 语音快速变成会说话的视频。'
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

const localModelProducts: MockAiProduct[] = [
  {
    slug: 'migos-ai-song',
    name: 'Migos AI Song',
    maker: 'Kapwing',
    website: 'https://www.kapwing.com/explore/hotel-lobby-ai-trend',
    logo: 'https://www.kapwing.com/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-09-29',
    category: 'video-editing',
    categoryLabel: productCategoryLabels['video-editing'],
    relatedSlugs: ['dreamina-migos-ai-video'],
    tags: [
      tag('hotel-lobby', 'Hotel Lobby trend', 'Hotel Lobby 热门玩法'),
      tag('ai-video', 'AI video', 'AI 视频'),
      tag('song-template', 'Song template', '歌曲模板'),
      tag('duo-performance', 'Duo performance', '双人表演'),
    ],
    tagline: text(
      'The Hotel Lobby AI trend, with a ready-to-edit video template.',
      'Hotel Lobby AI 热梗，附现成的视频剪辑模板。'
    ),
    description: text(
      '“Migos AI Song” usually refers to short AI videos built around Quavo and Takeoff’s Hotel Lobby performance: two people, an orange backdrop, one suspended microphone, and the song timed to a new generated duo. Kapwing offers a template with the source clip and audio on an editable timeline; you supply the replacement visuals and check rights before publishing.',
      '“Migos AI Song”通常指围绕 Quavo 与 Takeoff《Hotel Lobby》表演制作的 AI 短视频：两位表演者、橙色背景、一支悬挂麦克风，再把歌曲片段与新生成的双人画面对齐。Kapwing 提供带原片和音轨的可编辑模板；替换画面需自行制作，发布前还要确认素材使用权。'
    ),
    note: text(
      'Best for: finding the trend audio and assembling a timed duo video',
      '适合：寻找热梗音频并剪出对齐节奏的双人表演短片'
    ),
    image: '',
    tone: 'coral',
    featured: true,
    profile: {
      valueProposition: text(
        'A direct entry to the Hotel Lobby trend: the reference clip and audio are already arranged in Kapwing, so you can focus on creating and replacing the duo performance.',
        '直接进入 Hotel Lobby 热梗：Kapwing 已把参考片段和音频排在时间线上，你可以专注制作并替换双人表演画面。'
      ),
      problemSolved: text(
        'Searching for “Migos AI Song” often mixes up the song, the meme, and the video-making tools. This template gives the edit a concrete starting point and clarifies where generated visuals fit.',
        '搜索“Migos AI Song”时，歌曲、热门视频玩法和生成工具常混在一起。这个模板给出明确的剪辑起点，也说明 AI 画面应该替换到哪里。'
      ),
      audience: text(
        'Short-form video creators making an authorized two-person performance or remix.',
        '制作双人表演短视频或混剪、并已取得所用素材授权的创作者。'
      ),
      pricing: text(
        'The template opens in Kapwing. Editing, AI generation, export limits, and any paid features depend on Kapwing’s current plan; access to a template does not grant music or likeness rights.',
        '模板在 Kapwing 中打开。编辑、AI 生成、导出限制和付费功能以 Kapwing 当前套餐为准；能使用模板不代表已获得音乐或肖像授权。'
      ),
      market: [
        text('AI video trends', 'AI 视频热梗'),
        text('Music-led editing', '音乐节奏剪辑'),
        text('Short-form video', '短视频'),
      ],
      techStack: [
        text('Kapwing video template', 'Kapwing 视频模板'),
        text('Editable audio/video timeline', '可编辑音视频时间线'),
        text('Separately generated duo clip', '单独生成的双人表演片段'),
      ],
    },
    specs: [
      spec(
        'Source',
        '来源',
        'Quavo & Takeoff — Hotel Lobby performance',
        'Quavo 与 Takeoff 的《Hotel Lobby》表演'
      ),
      spec(
        'Visual cue',
        '画面特征',
        'Orange booth · two performers · one hanging mic',
        '橙色录音棚 · 两位表演者 · 一支悬挂麦克风'
      ),
      spec(
        'Template',
        '模板',
        'Kapwing video and audio timeline',
        'Kapwing 音视频时间线'
      ),
      spec(
        'You provide',
        '需要自备',
        'Two authorized subjects and a generated replacement clip',
        '两位授权出镜主体与生成后的替换片段'
      ),
    ],
    seo: seo(
      text(
        'Migos AI Song is a search phrase for the viral Hotel Lobby AI video format, not the name of a standalone song generator. Creators replace the two performers in the orange-booth scene with their own subjects, then edit the generated clip against the recognizable song segment. Kapwing hosts a timeline template with the reference video and audio. For original generated footage, a related option is Dreamina’s two-photo video workflow.',
        'Migos AI Song 是对 Hotel Lobby AI 视频玩法的常见搜索词，并非某个独立的 AI 作曲工具。创作者把橙色录音棚画面中的两位表演者换成自己的主体，再将生成片段与熟悉的歌曲片段剪辑对齐。Kapwing 提供带参考视频和音频的时间线模板；想生成原创替换画面，可以搭配 Dreamina 的双照片视频工作流。'
      ),
      [
        step(
          'Prepare two subjects',
          '准备两位主体',
          'Use clear photos of people or characters you have permission to use. Keep left and right identities distinct.',
          '使用已获得授权的清晰人物或角色照片，并明确左右两位主体。'
        ),
        step(
          'Generate the replacement clip',
          '生成替换画面',
          'Create a short orange-booth duo performance with a fixed camera and alternating gestures. Dreamina is one option for this step.',
          '生成一段橙色录音棚内的双人表演，尽量固定镜头并让两位主体交替动作；Dreamina 可用于这一步。'
        ),
        step(
          'Edit against the template',
          '按模板剪辑',
          'Open the Kapwing template, replace the visual clip, adjust timing to the audio, and review faces and lip sync before export.',
          '打开 Kapwing 模板，替换画面片段，对齐音频节奏，并在导出前检查面部一致性与口型。'
        ),
      ],
      [
        text(
          'Original Hotel Lobby reference video and audio in the template',
          '模板内有 Hotel Lobby 参考视频与音频'
        ),
        text(
          'Editable timeline for replacing the visual clip',
          '可替换画面的编辑时间线'
        ),
        text(
          'Recognizable orange-booth duo format',
          '辨识度高的橙色录音棚双人形式'
        ),
        text(
          'Works with a separately generated AI clip',
          '可搭配单独生成的 AI 视频片段'
        ),
      ],
      [
        text('Explaining the Migos AI Song trend', '了解 Migos AI Song 热梗'),
        text(
          'Timing a two-person performance to audio',
          '把双人表演与音频对齐'
        ),
        text(
          'Short-form remixes with cleared materials',
          '使用已获授权素材制作短视频混剪'
        ),
      ],
      [
        faq(
          'Is “Migos AI Song” a new Migos release?',
          '“Migos AI Song”是 Migos 的新歌吗？',
          'The term commonly points to AI-made Hotel Lobby trend videos. A generated video should not be presented as an authentic new performance by the artists.',
          '这个词通常指使用《Hotel Lobby》片段制作的 AI 热梗视频；生成视频不应被描述成艺人真实发布的新表演。'
        ),
        faq(
          'Does the Kapwing template generate the two performers?',
          'Kapwing 模板会自动生成两位表演者吗？',
          'The template supplies an editable reference video and audio timeline. Create the replacement duo footage separately, then place it in the timeline.',
          '模板提供可编辑的参考视频和音频时间线；双人替换画面需要先单独生成，再放入时间线。'
        ),
        faq(
          'Can I publish the original song or celebrity likenesses?',
          '可以直接发布原曲或名人的形象吗？',
          'Check the rights to every photo, face, voice, video clip, and music recording before publication. Template access alone does not supply those permissions.',
          '发布前应确认每张照片、肖像、声音、视频片段和录音的使用权。仅能访问模板并不代表拥有这些授权。'
        ),
      ]
    ),
  },
  {
    slug: 'dreamina-migos-ai-video',
    name: 'Dreamina Migos AI Video',
    maker: 'Dreamina by CapCut',
    website: 'https://dreamina.capcut.com/ai-video/migos-ai-video-generator',
    logo: 'https://dreamina.capcut.com/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-09-29',
    category: 'image-to-video',
    categoryLabel: productCategoryLabels['image-to-video'],
    relatedSlugs: ['migos-ai-song', 'seedance-2-5'],
    tags: [
      tag('two-photos', 'Two-photo workflow', '双照片工作流'),
      tag('seedance', 'Seedance 2.5', 'Seedance 2.5'),
      tag('duo-video', 'Duo video', '双人视频'),
      tag('ai-video', 'AI video', 'AI 视频'),
    ],
    tagline: text(
      'Generate an original orange-booth duo scene from two authorized photos.',
      '用两张已获授权的照片生成原创橙色录音棚双人表演画面。'
    ),
    description: text(
      'Dreamina’s Migos AI video guide turns two reference photos and a scene prompt into an orange-booth performance clip with Seedance 2.5. It focuses on generating the visuals; pair the result with audio in an editor only when you have the necessary rights.',
      'Dreamina 的 Migos AI 视频指南使用两张参考照片和场景提示词，通过 Seedance 2.5 生成橙色录音棚双人表演片段。它侧重生成画面；若要在剪辑软件中配乐，应先确认有相应授权。'
    ),
    note: text(
      'Best for: creating the duo footage used in a Hotel Lobby-style edit',
      '适合：制作 Hotel Lobby 风格短片所需的双人表演画面'
    ),
    image: '',
    tone: 'plum',
    featured: true,
    profile: {
      valueProposition: text(
        'Generate the two-person booth scene from your own references and direct the movement through a prompt.',
        '使用自己的参考照片生成双人录音棚画面，并通过提示词控制动作。'
      ),
      problemSolved: text(
        'The audio template needs a matching visual clip. Dreamina provides a dedicated two-photo generation workflow for that clip.',
        '音频模板需要与之匹配的画面片段。Dreamina 提供专门的双照片视频生成流程。'
      ),
      audience: text(
        'Creators who want an original duo video using consenting subjects or their own characters.',
        '希望使用同意出镜的人物或自有角色制作原创双人视频的创作者。'
      ),
      pricing: text(
        'Dreamina uses account-based access and credits; available models, limits, and prices can change by plan and region.',
        'Dreamina 采用账号和积分机制；可用模型、额度与价格可能随套餐和地区变化。'
      ),
      market: [
        text('Image to video', '图生视频'),
        text('AI video trends', 'AI 视频热梗'),
        text('Short-form creation', '短视频创作'),
      ],
      techStack: [
        text('Dreamina Seedance 2.5', 'Dreamina Seedance 2.5'),
        text('Two reference photos', '两张参考照片'),
        text('Scene and motion prompt', '场景与动作提示词'),
      ],
    },
    specs: [
      spec(
        'Input',
        '输入',
        'Two authorized reference photos + prompt',
        '两张已获授权的参考照片 + 提示词'
      ),
      spec(
        'Model shown',
        '页面推荐模型',
        'Dreamina Seedance 2.5',
        'Dreamina Seedance 2.5'
      ),
      spec(
        'Scene',
        '场景',
        'Orange booth · fixed camera · alternating performers',
        '橙色录音棚 · 固定镜头 · 交替表演'
      ),
      spec(
        'Output',
        '输出',
        'Generated video clip for later editing',
        '用于后续剪辑的生成视频片段'
      ),
    ],
    seo: seo(
      text(
        'Dreamina Migos AI Video is Dreamina’s guided workflow for an original duo clip inspired by the orange-booth Hotel Lobby trend. Upload two authorized reference photos, describe the scene and alternating performance, generate with Seedance 2.5, and review the result. It creates visuals; the related Kapwing template is a separate editing route for aligning a clip with the trend audio.',
        'Dreamina Migos AI Video 是 Dreamina 针对 Hotel Lobby 橙色录音棚玩法提供的双人视频制作指南。上传两张已获授权的参考照片，描述场景和交替表演动作，用 Seedance 2.5 生成并检查结果。这里制作的是画面；相关的 Kapwing 模板可用于后续把片段与热梗音频对齐。'
      ),
      [
        step(
          'Choose two reference photos',
          '选择两张参考照片',
          'Use one clear authorized image per subject and decide who stays on each side of the microphone.',
          '每位主体各选一张清晰且获授权的照片，并确定其在麦克风左右的位置。'
        ),
        step(
          'Describe the performance',
          '描述表演',
          'Prompt for an orange booth, a single hanging microphone, a fixed camera, and alternating gestures.',
          '在提示词中写明橙色录音棚、一支悬挂麦克风、固定镜头和交替动作。'
        ),
        step(
          'Generate and inspect',
          '生成并检查',
          'Run a short test in Dreamina and inspect identity, hand movement, camera drift, and timing before using the clip in an edit.',
          '先在 Dreamina 中生成短片，检查人物一致性、手部动作、镜头漂移和节奏，再用于剪辑。'
        ),
      ],
      [
        text('Two-subject reference workflow', '双主体参考图工作流'),
        text('Prompt-led scene and gesture control', '用提示词控制场景与动作'),
        text('Seedance 2.5 video generation', 'Seedance 2.5 视频生成'),
        text('Original visuals for a music-led edit', '为音乐短片制作原创画面'),
      ],
      [
        text('Two-person AI performance', 'AI 双人表演'),
        text('Short-form trend videos', '热门短视频'),
        text('Original character or pet duos', '原创角色或宠物搭档'),
      ],
      [
        faq(
          'Does Dreamina supply the Hotel Lobby song?',
          'Dreamina 会提供《Hotel Lobby》歌曲吗？',
          'This workflow focuses on generating a video scene. Add music later only if you have permission to use the recording.',
          '这个工作流侧重生成视频画面。只有在取得录音使用许可后，才应在后期加入歌曲。'
        ),
        faq(
          'Why do the two faces sometimes blend?',
          '为什么两张脸有时会混在一起？',
          'Use separate, clear reference photos and assign fixed left and right positions in the prompt. Regenerate if the identities drift.',
          '使用两张独立且清晰的参考照片，在提示词中固定左右位置；若人物身份漂移，就重新生成。'
        ),
      ]
    ),
  },
  {
    slug: 'zombie-ai-trend',
    name: 'Zombie AI Trend',
    aliases: [
      'Zombie Trend',
      'AI Zombie Trend',
      'Zombie AI Video',
      'Zombie Couple Trend',
      'Zombie Love Story Trend',
    ],
    seoKeyword: 'Zombie Trend',
    maker: 'Dreamina by CapCut',
    website: 'https://dreamina.capcut.com/',
    logo: 'https://dreamina.capcut.com/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-10-05',
    category: 'image-to-video',
    categoryLabel: productCategoryLabels['image-to-video'],
    relatedSlugs: ['seedance-2-5', 'dreamina-migos-ai-video'],
    tags: [
      tag('zombie-trend', 'Zombie trend', '僵尸热梗'),
      tag('ai-video', 'AI video', 'AI 视频'),
      tag('two-photos', 'Two-photo workflow', '双照片工作流'),
      tag('cinematic-story', 'Cinematic story', '电影感短剧'),
    ],
    tagline: text(
      'The viral couple zombie video: one turns, the other can’t pull the trigger.',
      '爆火的情侣僵尸视频：一人变成僵尸，另一人始终下不了手。'
    ),
    description: text(
      'The Zombie Trend is an October 2026 short-video format made from two photos. In a dark apocalypse scene one person turns into a zombie, the other raises a prop gun but cannot shoot, a warm flashback of the two plays, and the gun is lowered. Most creators generate the 12–15 second vertical clip in Dreamina with Seedance, or join two generated scenes in CapCut. It also works with a pet as the one who turns.',
      'Zombie Trend（僵尸热梗）是 2026 年 10 月走红的双照片短视频玩法：末日暗调场景里，一人变成僵尸，另一人举起道具枪却开不了枪，画面闪回两人温馨的回忆，最后放下枪。多数创作者在 Dreamina 中用 Seedance 生成 12–15 秒竖屏短片，或分别生成两段画面后在剪映/CapCut 中拼接；也可以把宠物设为变成僵尸的一方。'
    ),
    note: text(
      'Best for: making the emotional couple or pet zombie clip from your own photos',
      '适合：用自己的照片制作情侣或宠物版僵尸情感短片'
    ),
    image: '',
    tone: 'plum',
    featured: true,
    profile: {
      valueProposition: text(
        'One generation covers the whole story: the turn, the hesitation, the memory, and the lowered gun, with both faces kept from your reference photos.',
        '一次生成就能讲完整个故事：变身、犹豫、回忆、放下枪，并尽量保留两张参考照片中的面孔。'
      ),
      problemSolved: text(
        'Searches for “zombie trend” mix filters, templates, and prompts. This page explains the four-beat format and the shortest route to a clip that matches it.',
        '搜索“zombie trend”时，滤镜、模板和提示词常混在一起。本页说明这个玩法的四段结构，以及做出同款短片的最短路径。'
      ),
      audience: text(
        'Couples, friends, and pet owners making a short cinematic horror-romance clip with photos they have permission to use.',
        '使用已获同意的照片，制作电影感恐怖爱情短片的情侣、朋友和宠物主人。'
      ),
      pricing: text(
        'Dreamina uses account-based access and credits; available models, free daily credits, limits, and prices depend on plan and region.',
        'Dreamina 采用账号和积分机制；可用模型、每日免费积分、额度与价格随套餐和地区变化。'
      ),
      market: [
        text('AI video trends', 'AI 视频热梗'),
        text('Image to video', '图生视频'),
        text('Short-form video', '短视频'),
      ],
      techStack: [
        text('Dreamina Seedance video models', 'Dreamina Seedance 视频模型'),
        text('Two reference photos', '两张参考照片'),
        text('Story prompt with four beats', '四段式剧情提示词'),
      ],
    },
    specs: [
      spec(
        'Story beats',
        '剧情结构',
        'The turn · the gun · the memory · the gun lowered',
        '变身 · 举枪 · 回忆 · 放下枪'
      ),
      spec(
        'Input',
        '输入',
        'Two clear front-facing photos (person or pet) + prompt',
        '两张清晰正脸照片（人或宠物）+ 提示词'
      ),
      spec(
        'Format',
        '格式',
        '9:16 vertical · about 12–15 s',
        '9:16 竖屏 · 约 12–15 秒'
      ),
      spec(
        'Look',
        '画面特征',
        'Dark apocalypse grade · grey skin · clouded eyes',
        '末日暗调 · 灰白皮肤 · 浑浊双眼'
      ),
    ],
    seo: seo(
      text(
        'The Zombie Trend, also searched as the zombie AI trend or zombie couple trend, is a viral short video built from two photos. One person becomes a zombie, the partner aims a prop gun but cannot fire, a happy memory of the two flashes on screen, and the gun comes down. Dreamina by CapCut is the tool most tutorials use: upload both photos, describe the four beats, and generate a vertical clip with Seedance. Pet versions, where a cat or dog turns, are popular too.',
        'Zombie Trend（也被搜索为 zombie AI trend、僵尸情侣热梗）是用两张照片制作的爆款短视频：一人变成僵尸，伴侣举起道具枪却无法开枪，屏幕闪回两人的幸福回忆，最后放下枪。多数教程使用 Dreamina（CapCut 旗下）：上传两张照片，描述四段剧情，用 Seedance 生成竖屏短片。把猫狗设为变成僵尸一方的宠物版也很流行。'
      ),
      [
        step(
          'Pick two photos',
          '选择两张照片',
          'Use clear, front-facing photos of people or pets who agreed to appear. Decide who holds the gun and who turns.',
          '使用同意出镜的人或宠物的清晰正脸照片，确定谁举枪、谁变成僵尸。'
        ),
        step(
          'Write the four beats',
          '写好四段剧情',
          'Prompt the turn (grey skin, clouded eyes, torn clothes), the raised gun, a warm memory of both as themselves, and the gun lowered. Ask to keep each face and hairstyle as photographed.',
          '提示词依次写变身（灰白皮肤、浑浊双眼、破旧衣服）、举枪、两人原貌的温馨回忆、放下枪，并要求保持照片中的面孔和发型。'
        ),
        step(
          'Generate, check, and add music',
          '生成、检查并配乐',
          'Generate a 9:16 clip in Dreamina, check that both identities stay consistent, then add licensed music in CapCut before posting.',
          '在 Dreamina 中生成 9:16 短片，检查两人面孔是否一致，再在剪映/CapCut 中加入有授权的音乐后发布。'
        ),
      ],
      [
        text('Two-subject reference workflow', '双主体参考图工作流'),
        text('Single-generation story clip', '一次生成完整剧情短片'),
        text('Works for couples, friends, and pets', '情侣、朋友、宠物都适用'),
        text(
          'Vertical output for TikTok, Reels, Shorts',
          '竖屏输出，适合抖音、Reels、Shorts'
        ),
      ],
      [
        text('Couple zombie love story', '情侣僵尸爱情故事'),
        text('Pet zombie reunion clip', '宠物变僵尸重逢短片'),
        text('Halloween horror shorts', '万圣节恐怖短片'),
      ],
      [
        faq(
          'What is the zombie trend?',
          'zombie trend 是什么？',
          'A two-person AI video: one turns into a zombie, the other can’t bring themselves to shoot, a flashback plays, and the gun is lowered. It spread on TikTok in early October 2026.',
          '一种双人 AI 视频：一人变成僵尸，另一人狠不下心开枪，画面闪回后放下枪。2026 年 10 月初在 TikTok 上走红。'
        ),
        faq(
          'Is it a filter or a template?',
          '它是滤镜还是模板？',
          'It is a story format. Older zombie face filters only add makeup; this trend needs an image-to-video generator such as Dreamina, or two generated scenes joined in CapCut.',
          '它是一种剧情玩法。以前的僵尸滤镜只加妆效；这个热梗需要 Dreamina 这类图生视频工具，或把两段生成画面在剪映/CapCut 中拼接。'
        ),
        faq(
          'Can I use someone else’s photo?',
          '可以用别人的照片吗？',
          'Only with their permission. Don’t use photos of strangers or public figures, and label the clip as AI-generated where the platform asks.',
          '需获得本人同意。不要使用陌生人或公众人物的照片，并按平台要求标注 AI 生成。'
        ),
      ]
    ),
  },
  {
    slug: 'game-merging-ai',
    name: 'Game Merging AI',
    aliases: [
      'AI Game Merging',
      'Merging Games with AI',
      'AI Game Mashup',
      'Game Mashup Mods',
      'Minecraft in Elden Ring',
      'Universal Modder',
    ],
    seoKeyword: 'Game Merging AI',
    maker: 'Anthropic Claude Code',
    website: 'https://claude.com/product/claude-code',
    logo: 'https://claude.ai/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-10-05',
    category: 'coding',
    categoryLabel: productCategoryLabels.coding,
    relatedSlugs: ['replit', 'oasis', 'mira'],
    tags: [
      tag('game-mashup', 'Game mashups', '游戏融合'),
      tag('ai-modding', 'AI modding', 'AI 改游戏'),
      tag('vibe-coding', 'Vibe coding', '氛围编程'),
      tag('coding-agent', 'Coding agent', '编程智能体'),
    ],
    tagline: text(
      'The viral trend of using AI coding agents to put one game inside another.',
      '用 AI 编程智能体把一款游戏“塞进”另一款游戏的爆火玩法。'
    ),
    description: text(
      'Game merging AI is the late-September 2026 trend of modders using AI coding agents, mainly Claude Code, to graft one game into another: Minecraft inside Elden Ring, Skate 3 moves in Modern Warfare 2, Mario Kart in Call of Duty Zombies. The agent reads the game files, helps reverse-engineer how the engine works, writes the mod code, and fixes errors as you test. Many clips on X are tech demos rather than finished, playable mods.',
      'Game merging AI（AI 游戏融合）是 2026 年 9 月底走红的玩法：模组作者借助 AI 编程智能体（主要是 Claude Code）把一款游戏嫁接进另一款，例如把 Minecraft 放进 Elden Ring、在《使命召唤：现代战争 2》里加入 Skate 3 的滑板动作、在 COD 僵尸模式里跑马里奥赛车。智能体会读取游戏文件、协助逆向分析引擎机制、编写模组代码，并在你测试时修复报错。X 上流传的很多片段只是技术演示，并非完整可玩的模组。'
    ),
    note: text(
      'Best for: personal mod experiments on PC games you own',
      '适合：在自己拥有的 PC 游戏上做个人模组实验'
    ),
    image: '',
    tone: 'cobalt',
    featured: true,
    profile: {
      valueProposition: text(
        'A coding agent does the slow parts of modding (reading unfamiliar code, writing glue code, debugging crashes), so one person can try a mashup idea in hours instead of months.',
        '编程智能体承担了做模组最耗时的部分（读懂陌生代码、写衔接代码、排查崩溃），一个人几小时内就能尝试一个融合创意，而不是花上几个月。'
      ),
      problemSolved: text(
        'Searches for “game merging AI” bring up viral clips with no explanation. This page explains what the trend is, which tool is behind it, how the workflow goes, and its limits.',
        '搜索“game merging AI”时大多只能看到爆款片段却没有解释。本页说明这个热梗是什么、背后用的是什么工具、工作流程如何，以及它的局限。'
      ),
      audience: text(
        'PC gamers and hobby modders who are comfortable with a terminal and want to experiment with games they own.',
        '会用命令行、想在自己拥有的游戏上做实验的 PC 玩家和业余模组作者。'
      ),
      pricing: text(
        'Claude Code is included with paid Claude plans (Pro, Max, Team, Enterprise) or billed by API usage; large mod projects consume a lot of usage.',
        'Claude Code 包含在 Claude 付费套餐（Pro、Max、Team、Enterprise）中，也可按 API 用量计费；大型模组项目会消耗较多额度。'
      ),
      market: [
        text('Game modding', '游戏模组'),
        text('AI coding agents', 'AI 编程智能体'),
        text('Gaming trends', '游戏热梗'),
      ],
      techStack: [
        text('Claude Code agent', 'Claude Code 智能体'),
        text(
          'Game modding frameworks and decompilers',
          '游戏模组框架与反编译工具'
        ),
        text('Your own PC game installs', '你本机已安装的 PC 游戏'),
      ],
    },
    specs: [
      spec(
        'Main tool',
        '主要工具',
        'Claude Code (terminal, IDE, or desktop app)',
        'Claude Code（终端、IDE 或桌面应用）'
      ),
      spec(
        'Viral examples',
        '爆款案例',
        'Minecraft in Elden Ring · Skate 3 in MW2 · Mario Kart in COD Zombies',
        'Elden Ring 里的 Minecraft · MW2 里的 Skate 3 · COD 僵尸模式里的马里奥赛车'
      ),
      spec(
        'Platform',
        '平台',
        'PC games with mod support work best',
        '支持模组的 PC 游戏效果最好'
      ),
      spec(
        'Skill level',
        '上手门槛',
        'Basic terminal use; modding experience helps',
        '会基本的命令行操作；有模组经验更好'
      ),
    ],
    seo: seo(
      text(
        'Game merging AI, also searched as AI game merging or merging games with AI, describes mods that put one video game inside another, built with help from an AI coding agent. The trend took off on X in late September 2026 with clips such as Minecraft running inside Elden Ring. Most creators use Claude Code: they point it at a game folder, ask it to work out how the engine loads content, and have it write and debug the mod. Forbes and Kotaku note that results vary, many clips are demos, and the practice raises copyright questions, so keep it to personal experiments on games you own.',
        'Game merging AI（也被搜索为 AI game merging、merging games with AI）指借助 AI 编程智能体，把一款电子游戏放进另一款游戏里的模组。这个热梗于 2026 年 9 月底在 X 上走红，代表片段是在 Elden Ring 里运行 Minecraft。多数创作者使用 Claude Code：让它读取游戏目录、分析引擎如何加载内容，再由它编写并调试模组。Forbes 和 Kotaku 都提到效果参差不齐，很多片段只是演示，而且涉及版权问题，因此建议只在自己拥有的游戏上做个人实验。'
      ),
      [
        step(
          'Pick two games you own',
          '选两款自己拥有的游戏',
          'Choose a host game with an active modding scene (mod loaders, documented file formats) and decide what to bring in from the second game: a mechanic, a world, or a mode.',
          '选一款模组生态活跃（有模组加载器、文件格式有文档）的宿主游戏，并确定要从第二款游戏引入什么：一种玩法、一个世界或一个模式。'
        ),
        step(
          'Set up Claude Code in a mod workspace',
          '在模组工作区里配置 Claude Code',
          'Install Claude Code, open a separate folder with the mod loader and your notes, and back up your saves. Ask the agent to explain how the host game loads assets and scripts before writing anything.',
          '安装 Claude Code，新建一个放置模组加载器和笔记的独立文件夹，并备份存档。在动手写代码前，先让智能体讲清宿主游戏如何加载资源和脚本。'
        ),
        step(
          'Build, test, and iterate',
          '构建、测试、迭代',
          'Have the agent write the mod in small steps, launch the game after each one, and paste crash logs back to it. Keep the mod for personal use and don’t share another game’s code or assets.',
          '让智能体分小步编写模组，每一步后启动游戏测试，把崩溃日志贴回给它修复。模组仅供个人使用，不要分发其他游戏的代码或素材。'
        ),
      ],
      [
        text(
          'Reads and explains unfamiliar game code',
          '读懂并讲解陌生的游戏代码'
        ),
        text(
          'Writes and debugs mod code from plain-language requests',
          '根据自然语言需求编写并调试模组代码'
        ),
        text(
          'Runs in the terminal, IDE, or desktop app',
          '可在终端、IDE 或桌面应用中运行'
        ),
        text(
          'Works with existing mod loaders and tools',
          '可配合现有的模组加载器和工具'
        ),
      ],
      [
        text('Game mashup experiments', '游戏融合实验'),
        text('Porting a mechanic between games', '在游戏之间移植玩法'),
        text('Learning how game engines work', '学习游戏引擎的工作原理'),
      ],
      [
        faq(
          'What is game merging AI?',
          'game merging AI 是什么？',
          'It is a trend, not a single app: modders use AI coding agents such as Claude Code to combine two games, for example Minecraft inside Elden Ring. It spread on X in late September 2026.',
          '它是一种玩法，而不是某个单独的应用：模组作者用 Claude Code 等 AI 编程智能体把两款游戏融合在一起，例如把 Minecraft 放进 Elden Ring。2026 年 9 月底在 X 上走红。'
        ),
        faq(
          'Are the viral merged games actually playable?',
          '那些爆火的融合游戏真的能玩吗？',
          'Some are, but many clips are short tech demos. AI-written mod code can be buggy, and a full merge usually needs a lot of testing and manual fixes.',
          '有些可以，但很多片段只是简短的技术演示。AI 写的模组代码可能有 bug，完整的融合通常需要大量测试和手动修复。'
        ),
        faq(
          'Is merging games legal?',
          '融合游戏合法吗？',
          'It is a legal grey area. Modding a game you own for personal use is common, but distributing another studio’s code or assets, or breaking a game’s terms or anti-cheat, can infringe copyright or get you banned. Never use mods in online multiplayer.',
          '这属于法律灰色地带。为个人使用修改自己拥有的游戏很常见，但分发其他厂商的代码或素材、违反游戏条款或绕过反作弊，可能侵犯版权或导致封号。不要在在线多人模式中使用模组。'
        ),
      ]
    ),
  },
  {
    slug: 'cue-by-manus',
    name: 'Cue by Manus',
    maker: 'Manus',
    website: 'https://cue.im',
    logo: 'https://cue.im/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-10-03',
    category: 'assistant',
    categoryLabel: productCategoryLabels.assistant,
    relatedSlugs: ['manus'],
    tags: [
      tag('personal-agent', 'Personal agent', '个人智能体'),
      tag('agent-email-phone', 'Own email & phone', '专属邮箱与电话'),
      tag('agent-wallet', 'Agent wallet', '智能体钱包'),
      tag('multi-agent', 'Multi-agent', '多智能体协作'),
    ],
    tagline: text(
      'Personal AI agents with their own email, phone number, wallet, and computer.',
      '拥有专属邮箱、电话号码、钱包和电脑的个人 AI 智能体。'
    ),
    description: text(
      'Cue is a standalone app from Manus, launched with Manus 2.0 in September 2026. Each agent you create gets its own email address, phone number, wallet with a spending limit you set, and a computer to work on, so it can send messages, take calls, pay within budget, and finish tasks on its own. It runs on web, desktop, and mobile and is in invite-only early access.',
      'Cue 是 Manus 推出的独立应用，于 2026 年 9 月随 Manus 2.0 一同发布。你创建的每个智能体都有自己的邮箱地址、电话号码、可设定消费上限的钱包和一台工作电脑，因此能独立收发消息、接听电话、在预算内付款并完成任务。支持网页、桌面和移动端，目前处于邀请制抢先体验阶段。'
    ),
    note: text(
      'Best for: delegating everyday errands to agents that can act on their own',
      '适合：把日常事务交给能独立行动的智能体'
    ),
    image: '',
    tone: 'amber',
    featured: true,
    profile: {
      valueProposition: text(
        'Agents get a real identity to act with: they can email, call, and pay instead of only drafting text for you to send.',
        '智能体拥有可以行动的真实身份：能直接发邮件、打电话和付款，而不只是起草文字让你转发。'
      ),
      problemSolved: text(
        'Chat assistants stop at suggestions. Cue gives each agent its own channels and a budgeted wallet, so tasks like answering calls or placing an order can be completed end to end.',
        '聊天助手通常止步于建议。Cue 为每个智能体配备独立通道和有预算的钱包，接电话、下单这类任务可以从头到尾完成。'
      ),
      audience: text(
        'People who want to hand off recurring personal or work errands to AI agents.',
        '希望把重复的个人或工作事务交给 AI 智能体处理的人。'
      ),
      pricing: text(
        'Free during early access with an invite code. Pricing after early access has not been announced; check cue.im for current terms.',
        '抢先体验期间凭邀请码免费使用；正式定价尚未公布，请以 cue.im 当前信息为准。'
      ),
      market: [
        text('Personal AI agents', '个人 AI 智能体'),
        text('Task automation', '任务自动化'),
        text('Multi-agent collaboration', '多智能体协作'),
      ],
      techStack: [
        text('Manus 2.0 infrastructure', 'Manus 2.0 基础设施'),
        text(
          'Per-agent email, phone, and wallet',
          '每个智能体独立邮箱、电话与钱包'
        ),
        text('Web, desktop, and mobile apps', '网页、桌面与移动端应用'),
      ],
    },
    specs: [
      spec('Maker', '开发方', 'Manus', 'Manus'),
      spec(
        'Launched',
        '发布时间',
        'September 2026, with Manus 2.0',
        '2026 年 9 月，随 Manus 2.0 发布'
      ),
      spec(
        'Each agent gets',
        '每个智能体拥有',
        'Email · phone number · wallet · computer',
        '邮箱 · 电话号码 · 钱包 · 电脑'
      ),
      spec('Access', '获取方式', 'Invite-only early access', '邀请制抢先体验'),
    ],
    seo: seo(
      text(
        'Cue by Manus is a personal AI agent app built on the same infrastructure as Manus. Unlike a chat assistant, every Cue agent has its own email address, phone number, wallet, and computer. Agents can answer calls and summarize them, send messages, pay within a budget you set, and work together in a group chat on a shared goal. Cue is available on web, desktop, and mobile during an invite-only early access.',
        'Cue by Manus 是基于 Manus 同一套基础设施打造的个人 AI 智能体应用。与聊天助手不同，每个 Cue 智能体都有自己的邮箱地址、电话号码、钱包和电脑。智能体可以接听电话并生成摘要、发送消息、在你设定的预算内付款，还能在群聊中协作完成同一目标。抢先体验期间支持网页、桌面和移动端，需邀请码。'
      ),
      [
        step(
          'Get early access',
          '获取体验资格',
          'Sign up at cue.im with an invite code. New users receive extra codes to share.',
          '在 cue.im 使用邀请码注册；获得资格后会收到可分享的邀请码。'
        ),
        step(
          'Create an agent',
          '创建智能体',
          'Describe what the agent should handle. It is assigned its own email, phone number, and wallet.',
          '描述智能体要负责的事务，系统会为它分配专属邮箱、电话号码和钱包。'
        ),
        step(
          'Set limits and connect services',
          '设置额度并连接服务',
          'Set a spending limit, connect email, calendar, Slack, or Notion as triggers, and review the summaries it sends back.',
          '设定消费上限，连接邮箱、日历、Slack 或 Notion 作为触发来源，并查看它回传的任务摘要。'
        ),
      ],
      [
        text(
          'Dedicated email and phone number per agent',
          '每个智能体专属邮箱和电话号码'
        ),
        text('Wallet with user-set spending limits', '可自定义消费上限的钱包'),
        text('Answers calls and summarizes them', '代接电话并生成摘要'),
        text('Agent group chats with task delegation', '智能体群聊与任务分派'),
      ],
      [
        text('Delegating personal errands', '委托处理个人事务'),
        text('Screening and handling calls', '筛选和处理来电'),
        text(
          'Coordinating several agents on one goal',
          '让多个智能体协作完成同一目标'
        ),
      ],
      [
        faq(
          'Is Cue the same as Manus?',
          'Cue 和 Manus 是同一个产品吗？',
          'No. Cue is a separate app from the Manus team, built on the same infrastructure. Manus focuses on producing deliverables; Cue gives personal agents their own identity to act with.',
          '不是。Cue 是 Manus 团队推出的独立应用，与 Manus 共用基础设施。Manus 侧重交付成品，Cue 则为个人智能体提供可以行动的独立身份。'
        ),
        faq(
          'Can a Cue agent spend my money?',
          'Cue 智能体会动用我的钱吗？',
          'Only through its wallet and within the spending limit you set. Review limits before connecting payment methods.',
          '只能通过它的钱包、在你设定的消费上限内付款。连接支付方式前请先确认额度设置。'
        ),
        faq(
          'Is Cue free?',
          'Cue 免费吗？',
          'It is free during invite-only early access. Later pricing has not been announced.',
          '邀请制抢先体验期间免费，之后的定价尚未公布。'
        ),
      ]
    ),
  },
  {
    slug: 'ausar-ai',
    name: 'Ausar AI',
    maker: 'Ausar',
    website: 'https://ausar.ai',
    logo: 'https://ausar.ai/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-10-04',
    category: 'text-to-video',
    categoryLabel: productCategoryLabels['text-to-video'],
    relatedSlugs: ['higgsfield', 'kling-ai', 'seedance-2-5'],
    tags: [
      tag('multi-model-studio', 'Multi-model studio', '多模型创作台'),
      tag('text-to-video', 'Text to video', '文生视频'),
      tag('motion-control', 'Motion control', '动作控制'),
      tag('ai-audio', 'AI audio', 'AI 音频'),
    ],
    tagline: text(
      'One studio for AI video, image, and audio with Kling, Veo, Sora, and Seedance.',
      '一个工作台集成 Kling、Veo、Sora、Seedance 等模型，生成 AI 视频、图片和音频。'
    ),
    description: text(
      'Ausar is a web-based AI content studio that puts several leading generation models behind one account. You can turn text or images into video with Kling 3.0, Veo 3.1, Sora 2, or Seedance, create images with Nano Banana Pro or GPT Image, transfer movement with Motion Control, and generate speech or split vocals in the audio tools. Templates help build multi-shot social clips, and a credit-based subscription covers every model.',
      'Ausar 是一个网页版 AI 内容创作台，用一个账号接入多款主流生成模型。你可以用 Kling 3.0、Veo 3.1、Sora 2 或 Seedance 把文字或图片变成视频，用 Nano Banana Pro、GPT Image 生成图片，用 Motion Control 迁移动作，还能在音频工具里合成语音或分离人声。模板可快速搭建多镜头短视频，所有模型共用一套积分订阅。'
    ),
    note: text(
      'Best for: creators who want to compare top video models without separate subscriptions',
      '适合：想在一个地方对比多款视频模型、又不想分别订阅的创作者'
    ),
    image: '',
    tone: 'plum',
    featured: true,
    profile: {
      valueProposition: text(
        'Switch between Kling, Veo, Sora, Seedance, and image models in one workspace and pay from a single credit balance.',
        '在同一工作区切换 Kling、Veo、Sora、Seedance 和图像模型，统一用一份积分付费。'
      ),
      problemSolved: text(
        'Each video model lives on its own site with its own plan. Ausar gathers them, plus image editing and audio tools, so a whole short video can be made in one place.',
        '各家视频模型分散在不同网站、各有订阅。Ausar 把它们连同图像编辑和音频工具集中在一起，一条短视频可以在一个地方做完。'
      ),
      audience: text(
        'Social media creators, marketers, and small studios producing short AI videos and visuals.',
        '制作 AI 短视频和视觉素材的社媒创作者、营销人员和小型工作室。'
      ),
      pricing: text(
        'Free sign-up with no card required. Paid plans are monthly credit subscriptions, and subscribers get 10–25% off credit top-ups. Check ausar.ai/pricing for current plans.',
        '免费注册，无需绑卡。付费方案为按月发放积分的订阅，订阅用户购买加量积分可享 10–25% 折扣。具体方案以 ausar.ai/pricing 为准。'
      ),
      market: [
        text('AI video generation', 'AI 视频生成'),
        text('AI image generation', 'AI 图像生成'),
        text('Short-form social content', '社媒短视频内容'),
      ],
      techStack: [
        text(
          'Kling 3.0 · Veo 3.1 · Sora 2 · Seedance 2.5',
          'Kling 3.0 · Veo 3.1 · Sora 2 · Seedance 2.5'
        ),
        text(
          'Nano Banana Pro · GPT Image 2.5 · Seedream',
          'Nano Banana Pro · GPT Image 2.5 · Seedream'
        ),
        text('Web app with shared credit balance', '网页应用，积分通用'),
      ],
    },
    specs: [
      spec('Maker', '开发方', 'Ausar', 'Ausar'),
      spec(
        'Video models',
        '视频模型',
        'Kling 3.0, Veo 3.1, Sora 2, Seedance 2.5',
        'Kling 3.0、Veo 3.1、Sora 2、Seedance 2.5'
      ),
      spec(
        'Other tools',
        '其他工具',
        'Image generation · Motion Control · audio · templates',
        '图像生成 · 动作控制 · 音频 · 模板'
      ),
      spec(
        'Access',
        '获取方式',
        'Web; free sign-up, credit subscriptions',
        '网页版；免费注册，积分订阅'
      ),
    ],
    seo: seo(
      text(
        'Ausar AI (ausar.ai) is an all-in-one AI creation studio for video, images, and audio. Instead of running a single in-house model, it gives you access to Kling 3.0, Veo 3.1, Sora 2, Seedance, Nano Banana Pro, GPT Image, and more from one dashboard. Beyond text-to-video and image-to-video, it offers Motion Control for transferring movement onto a character, AI influencer creation, image upscaling and background removal, speech generation, and vocal splitting. Its terms prohibit deepfakes or deceptive content meant to mislead or harm others.',
        'Ausar AI（ausar.ai）是一站式 AI 视频、图片和音频创作平台。它不只依赖单一自研模型，而是在一个控制台里接入 Kling 3.0、Veo 3.1、Sora 2、Seedance、Nano Banana Pro、GPT Image 等模型。除了文生视频和图生视频，还提供把动作迁移到角色上的 Motion Control、AI 网红形象创建、图像放大与抠图、语音生成和人声分离。其服务条款禁止制作用于误导或伤害他人的深度伪造或欺骗性内容。'
      ),
      [
        step(
          'Sign up free',
          '免费注册',
          'Create an account at ausar.ai; no card is needed to start.',
          '在 ausar.ai 注册账号，开始使用无需绑卡。'
        ),
        step(
          'Pick a tool and model',
          '选择工具和模型',
          'Open Video, Image, Motion Control, or Audio and choose a model such as Kling 3.0, Veo 3.1, or Nano Banana Pro.',
          '打开视频、图片、动作控制或音频工具，选择 Kling 3.0、Veo 3.1、Nano Banana Pro 等模型。'
        ),
        step(
          'Generate and refine',
          '生成并调整',
          'Write a prompt or upload a reference image, generate, then upscale, extend, or combine clips with templates.',
          '输入提示词或上传参考图生成内容，再放大、扩图，或用模板拼接成多镜头视频。'
        ),
      ],
      [
        text(
          'Kling, Veo, Sora, and Seedance in one place',
          'Kling、Veo、Sora、Seedance 集于一处'
        ),
        text(
          'Motion Control for character movement',
          '用 Motion Control 迁移角色动作'
        ),
        text(
          'Image tools: generate, enhance, expand, remove background',
          '图像工具：生成、增强、扩图、抠图'
        ),
        text('Speech generation and vocal splitting', '语音生成与人声分离'),
      ],
      [
        text('Short social videos and ads', '社媒短视频与广告'),
        text(
          'Comparing video models on one prompt',
          '用同一提示词对比视频模型'
        ),
        text('Product and portrait animations', '产品与人像动画'),
      ],
      [
        faq(
          'Does Ausar make its own video model?',
          'Ausar 有自己的视频模型吗？',
          'Ausar mainly provides access to third-party models such as Kling, Veo, Sora, and Seedance, together with its own templates and editing tools.',
          'Ausar 主要接入 Kling、Veo、Sora、Seedance 等第三方模型，并配合自家的模板和编辑工具。'
        ),
        faq(
          'Is Ausar AI free?',
          'Ausar AI 免费吗？',
          'Sign-up is free with no card required. Generating beyond what a free account allows uses credits from a paid plan or top-up.',
          '注册免费且无需绑卡；超出免费额度的生成需要使用付费方案或加购的积分。'
        ),
        faq(
          'Can I use Ausar outputs commercially?',
          'Ausar 生成的内容可以商用吗？',
          'Ausar says outputs can be used in ads, social posts, and client work. Check its terms and the rights of any people or brands shown.',
          'Ausar 表示生成内容可用于广告、社媒和客户项目。使用前请查看其条款，并确认画面中人物或品牌的使用权。'
        ),
      ]
    ),
  },
  {
    slug: 'seedance-2-5',
    name: 'Seedance 2.5',
    aliases: [
      'Seedance 2.5 AI',
      'Dreamina Seedance 2.5',
      'ByteDance Seedance 2.5',
      'Seedance',
      '即梦 Seedance 2.5',
    ],
    maker: 'ByteDance Seed',
    website: 'https://dreamina.capcut.com/seedance/seedance-2-5',
    logo: 'https://dreamina.capcut.com/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-10-04',
    category: 'text-to-video',
    categoryLabel: productCategoryLabels['text-to-video'],
    relatedSlugs: ['dreamina-migos-ai-video', 'kling-ai', 'higgsfield'],
    tags: [
      tag('text-to-video', 'Text to video', '文生视频'),
      tag('seedance', 'Seedance 2.5', 'Seedance 2.5'),
      tag('native-audio', 'Native audio', '原生音频'),
      tag('multi-reference', 'Multi-reference', '多参考输入'),
    ],
    tagline: text(
      'ByteDance’s video model for 30-second 4K clips with audio, guided by up to 50 references.',
      '字节跳动视频模型，一次生成 30 秒 4K 带音频视频，最多可用 50 个参考素材引导。'
    ),
    description: text(
      'Seedance 2.5 is ByteDance Seed’s video generation model, released on July 31, 2026. It generates up to 30 seconds of continuous video in one run, with a beta long-video mode that extends to 3 minutes, and produces sound together with the picture. You can guide it with up to 50 references (30 images, 10 videos, and 10 audio clips), edit a specific part of a result, or use green-screen and 3D white-model inputs for tighter control. It is available on Dreamina and CapCut worldwide and on Jimeng and Doubao in China.',
      'Seedance 2.5 是字节跳动 Seed 团队的视频生成模型，于 2026 年 7 月 31 日发布。它单次可连续生成最长 30 秒的视频，测试中的长视频模式可延长到 3 分钟，并且画面和声音同步生成。你可以用最多 50 个参考素材（30 张图片、10 段视频、10 段音频）引导生成，对结果做局部修改，或用绿幕和 3D 白模输入做更精确的控制。海外可在 Dreamina 和 CapCut 使用，国内可在即梦和豆包使用。'
    ),
    note: text(
      'Best for: longer single-take AI clips that need consistent characters and matching sound',
      '适合：需要角色一致、声画同步的较长单镜头 AI 视频'
    ),
    image: '',
    tone: 'plum',
    featured: true,
    profile: {
      valueProposition: text(
        'Get a 30-second clip with audio in one generation instead of stitching several short shots together.',
        '一次生成 30 秒带声音的片段，不必再把多段短镜头拼接起来。'
      ),
      problemSolved: text(
        'Earlier video models capped clips at a few seconds, so longer scenes needed stitching and drifted between shots. Seedance 2.5 keeps one continuous take for longer and lets you fix parts of it without regenerating the whole clip.',
        '早期视频模型单段只有几秒，较长的场景需要拼接，镜头之间容易跑偏。Seedance 2.5 可以保持更长的连续镜头，还能局部修改而不必整段重做。'
      ),
      audience: text(
        'Filmmakers, marketing and ecommerce teams, social media creators, and agencies.',
        '影视创作者、营销和电商团队、社媒创作者以及创意代理公司。'
      ),
      pricing: text(
        'Dreamina gives free daily credits to try it. Paid Dreamina plans use credits, with launch pricing from about $0.097 per second of Seedance 2.5 video. Prices vary by region and plan.',
        'Dreamina 每天赠送免费积分可试用。付费方案按积分计费，上线优惠价约每秒视频 0.097 美元起。价格因地区和方案而异。'
      ),
      market: [
        text('AI video generation', 'AI 视频生成'),
        text('Short-form ads and social content', '短视频广告与社媒内容'),
        text('Previs and filmmaking', '影视预演与制作'),
      ],
      techStack: [
        text('ByteDance Seed video model', '字节跳动 Seed 视频模型'),
        text('Joint audio and video generation', '音视频联合生成'),
        text(
          'Dreamina · CapCut · Jimeng · Doubao',
          'Dreamina · CapCut · 即梦 · 豆包'
        ),
      ],
    },
    specs: [
      spec('Maker', '开发方', 'ByteDance Seed', '字节跳动 Seed'),
      spec('Released', '发布时间', 'July 31, 2026', '2026 年 7 月 31 日'),
      spec(
        'Clip length',
        '视频时长',
        'Up to 30 s per run; 3 min in long-video mode (beta)',
        '单次最长 30 秒；长视频模式（测试）最长 3 分钟'
      ),
      spec(
        'References',
        '参考素材',
        'Up to 50: 30 images, 10 videos, 10 audio',
        '最多 50 个：30 张图、10 段视频、10 段音频'
      ),
      spec(
        'Where to use',
        '使用平台',
        'Dreamina, CapCut, Jimeng, Doubao',
        'Dreamina、CapCut、即梦、豆包'
      ),
    ],
    seo: seo(
      text(
        'Seedance 2.5 is the July 2026 update to ByteDance’s Seedance video models. Compared with Seedance 2.0, it raises the single-run length to 30 seconds, adds a 3-minute long-video mode in beta, and accepts up to 50 multimodal references, including images, video clips, and audio. Sound is generated together with the picture. An Intelligent Edit mode lets you change part of a clip, and green-screen and 3D white-model inputs (including Blender and Maya assets) help with precise motion and compositing. Dreamina and CapCut offer it worldwide; Jimeng and Doubao carry it in China. Use reference photos only of people who have agreed to it.',
        'Seedance 2.5 是字节跳动 Seedance 视频模型在 2026 年 7 月的更新。相比 Seedance 2.0，它把单次生成时长提高到 30 秒，新增测试中的 3 分钟长视频模式，并支持最多 50 个多模态参考素材，包括图片、视频片段和音频。声音与画面一起生成。智能编辑模式可以修改片段中的局部内容，绿幕和 3D 白模输入（支持 Blender、Maya 资产）便于精确控制动作和合成。海外通过 Dreamina 和 CapCut 提供，国内在即梦和豆包上线。参考照片中的人物请确保已获得本人同意。'
      ),
      [
        step(
          'Open Seedance 2.5',
          '打开 Seedance 2.5',
          'Sign in to Dreamina (or Jimeng in China) and choose Seedance 2.5 as the video model.',
          '登录 Dreamina（国内用即梦），在视频生成中选择 Seedance 2.5 模型。'
        ),
        step(
          'Add a prompt and references',
          '输入提示词和参考素材',
          'Describe the scene, then add reference images, video, or audio for characters, motion, and style.',
          '描述画面，再添加参考图片、视频或音频来确定角色、动作和风格。'
        ),
        step(
          'Generate and edit',
          '生成并修改',
          'Generate up to 30 seconds, then use edit mode to fix parts or extend the clip.',
          '生成最长 30 秒的视频，再用编辑模式修改局部或延长片段。'
        ),
      ],
      [
        text('30-second single-run clips', '单次生成 30 秒视频'),
        text('Up to 50 multimodal references', '最多 50 个多模态参考'),
        text('Audio generated with the video', '声音与画面同步生成'),
        text(
          'Intelligent Edit, green screen, and 3D white-model control',
          '智能编辑、绿幕与 3D 白模控制'
        ),
      ],
      [
        text('Product ads and ecommerce videos', '产品广告与电商视频'),
        text('Short film scenes and previs', '短片场景与预演'),
        text('Social clips with consistent characters', '角色一致的社媒短视频'),
      ],
      [
        faq(
          'What is new in Seedance 2.5?',
          'Seedance 2.5 有什么新变化？',
          'Longer clips (30 seconds per run, 3 minutes in beta long-video mode), up to 50 references instead of 12, partial editing, and green-screen and 3D white-model control.',
          '视频更长（单次 30 秒，测试中的长视频模式可达 3 分钟），参考素材从 12 个增加到 50 个，支持局部编辑以及绿幕和 3D 白模控制。'
        ),
        faq(
          'Where can I use Seedance 2.5?',
          '在哪里可以使用 Seedance 2.5？',
          'On Dreamina and CapCut worldwide, and on Jimeng and Doubao in China. Third-party studios such as Ausar also offer it.',
          '海外可在 Dreamina 和 CapCut 使用，国内可在即梦和豆包使用，Ausar 等第三方平台也已接入。'
        ),
        faq(
          'Is Seedance 2.5 free?',
          'Seedance 2.5 免费吗？',
          'Dreamina gives free daily credits to try it. Regular use needs a credit plan; launch pricing starts at about $0.097 per second of video.',
          'Dreamina 每天赠送免费积分可以试用。经常使用需要积分方案，上线优惠价约每秒 0.097 美元起。'
        ),
      ]
    ),
  },
  {
    slug: 'reapi-qwen-image-2-1',
    name: 'Qwen Image 2.1 on reAPI',
    maker: 'reAPI',
    website: 'https://reapi.ai/models/qwen-image-2-1',
    logo: 'https://reapi.ai/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-09-29',
    category: 'models',
    categoryLabel: productCategoryLabels.models,
    relatedSlugs: ['comfyui'],
    tags: [
      tag('web-playground', 'Web playground', '网页创作台'),
      tag('qwen-image', 'Qwen Image 2.1', 'Qwen Image 2.1'),
      tag('text-to-image', 'Text to image', '文生图'),
      tag('image-editing', 'Image editing', '图像编辑'),
    ],
    tagline: text(
      'Generate and edit Qwen Image 2.1 pictures in a browser playground.',
      '在网页创作台中使用 Qwen Image 2.1 生成和编辑图片。'
    ),
    description: text(
      'reAPI provides a hosted Qwen Image 2.1 playground with prompt-based generation, reference-image editing, optional masks, transparent backgrounds, and 1K or 2K output. The web form can be tried without installing model files. reAPI is a third-party service, separate from Qwen’s local GGUF downloads.',
      'reAPI 提供在线 Qwen Image 2.1 创作台，可输入提示词生成图片、上传参考图进行编辑，也提供局部蒙版、透明背景以及 1K／2K 输出选项。网页表单无需先安装模型文件。reAPI 是第三方在线服务，与 Qwen 的本地 GGUF 下载文件不同。'
    ),
    note: text(
      'Best for: trying Qwen Image 2.1 in a browser',
      '适合：直接在浏览器中体验 Qwen Image 2.1'
    ),
    image: '',
    tone: 'amber',
    featured: true,
    profile: {
      valueProposition: text(
        'Use Qwen Image 2.1 through a visible browser form: type a prompt, choose image settings, and preview the result without assembling a local model stack.',
        '通过可操作的网页表单使用 Qwen Image 2.1：输入提示词、调整图片设置、预览结果，无需自行搭建本地模型环境。'
      ),
      problemSolved: text(
        'A model repository only offers files and setup notes. This hosted playground lets visitors actually test generation and editing from the page.',
        '模型仓库主要提供文件和安装说明；这个在线创作台让访客能直接从页面测试生图和图像编辑。'
      ),
      audience: text(
        'Designers, creators, and product teams testing Qwen Image 2.1 outputs before choosing a longer-term workflow.',
        '希望先体验 Qwen Image 2.1 效果，再决定长期使用方式的设计师、创作者和产品团队。'
      ),
      pricing: text(
        'reAPI lists credit-based, per-image pricing. Check the live page for current rates, account requirements, and usage terms.',
        'reAPI 页面展示按图片与积分计费；当前价格、账号要求和使用条款请以实时页面为准。'
      ),
      market: [
        text('Web image creation', '网页图像创作'),
        text('Qwen Image 2.1', 'Qwen Image 2.1'),
        text('Text to image', '文生图'),
        text('Image editing', '图像编辑'),
      ],
      techStack: [
        text('Hosted Qwen Image 2.1', '在线 Qwen Image 2.1'),
        text('Browser playground', '浏览器创作台'),
        text('Prompt and reference-image controls', '提示词与参考图控制'),
      ],
    },
    specs: [
      spec('Access', '使用方式', 'Browser playground', '浏览器创作台'),
      spec(
        'Creation modes',
        '创作模式',
        'Text to image · image to image',
        '文生图 · 图生图'
      ),
      spec(
        'Reference inputs',
        '参考输入',
        'Images and optional mask',
        '参考图片与可选蒙版'
      ),
      spec(
        'Output options',
        '输出选项',
        '1K / 2K · opaque / transparent',
        '1K／2K · 不透明／透明背景'
      ),
      spec(
        'Service',
        '服务提供方',
        'Third-party hosted by reAPI',
        '由第三方 reAPI 托管'
      ),
    ],
    seo: seo(
      text(
        'Qwen Image 2.1 on reAPI is a browser-based image generation and editing playground. It exposes Qwen Image 2.1 through a hosted form for prompts, reference images, optional masks, transparent outputs, and 1K or 2K resolution. It is a third-party web service, not the local GGUF model package. The related ComfyUI product offers another visual workflow for Qwen Image 2.1.',
        'reAPI 上的 Qwen Image 2.1 是浏览器中的图像生成和编辑创作台。网页表单提供提示词、参考图、可选蒙版、透明输出以及 1K／2K 分辨率设置。它是第三方在线服务，不是本地 GGUF 模型文件包。相关的 ComfyUI 产品则提供另一种可视化 Qwen Image 2.1 工作流。'
      ),
      [
        step(
          'Open the playground',
          '打开网页创作台',
          'Visit the reAPI model page and select text-to-image or image-to-image in the Playground form.',
          '访问 reAPI 模型页面，在创作台表单中选择文生图或图生图。'
        ),
        step(
          'Set your inputs',
          '设置创作输入',
          'Write a prompt, add reference images or a mask if editing, and choose resolution and background options.',
          '填写提示词；如需编辑，添加参考图或蒙版，再选择分辨率和背景选项。'
        ),
        step(
          'Generate and inspect',
          '生成并检查',
          'Review the estimated credit cost, generate the image, and inspect the result before using it in your project.',
          '确认预计积分消耗，生成图片，并在投入项目使用前检查结果。'
        ),
      ],
      [
        text('Browser-based text-to-image generation', '浏览器文生图'),
        text('Reference-image editing', '参考图编辑'),
        text('Optional mask for local changes', '可选蒙版局部修改'),
        text('Transparent PNG or WebP output', '透明 PNG 或 WebP 输出'),
        text('1K and 2K choices', '1K 与 2K 选项'),
      ],
      [
        text('Trying Qwen Image 2.1 quickly', '快速体验 Qwen Image 2.1'),
        text('Product cutouts and stickers', '商品抠图与贴纸'),
        text('Image editing with references', '基于参考图的编辑'),
        text('Creators comparing web image tools', '比较在线生图工具的创作者'),
      ],
      [
        faq(
          'Is this the local GGUF download?',
          '这里提供本地 GGUF 下载吗？',
          'No. This is a hosted browser playground for Qwen Image 2.1. Local GGUF files are a separate setup path.',
          '不是。这里是托管的 Qwen Image 2.1 网页创作台；本地 GGUF 文件是另一种使用方式。'
        ),
        faq(
          'Is reAPI the official Qwen website?',
          'reAPI 是 Qwen 官方网站吗？',
          'No. reAPI is a third-party service hosting access to the model. Check its own pricing and terms before generating.',
          '不是。reAPI 是提供模型在线使用入口的第三方服务，生成前请查看其价格和使用条款。'
        ),
        faq(
          'Can I edit an existing image?',
          '可以编辑已有图片吗？',
          'Yes. Choose image-to-image, add reference images, and optionally provide a mask to target a region.',
          '可以。选择图生图，添加参考图；也可以用可选蒙版指定需要修改的区域。'
        ),
      ]
    ),
  },
  {
    slug: 'comfyui',
    name: 'ComfyUI',
    maker: 'Comfy Org',
    website: 'https://comfy.org/',
    logo: 'https://comfy.org/favicon.ico',
    sourceType: 'website',
    lastVerifiedAt: '2026-09-29',
    category: 'workflow',
    categoryLabel: productCategoryLabels.workflow,
    relatedSlugs: ['reapi-qwen-image-2-1'],
    tags: [
      tag('visual-workflows', 'Visual workflows', '可视化工作流'),
      tag('image-generation', 'Image generation', '图像生成'),
      tag('desktop-cloud', 'Desktop and cloud', '桌面与云端'),
      tag('qwen-image', 'Qwen-Image 2.1', 'Qwen-Image 2.1'),
    ],
    tagline: text(
      'A visual workspace for creating images with models such as Qwen-Image 2.1.',
      '可用 Qwen-Image 2.1 等模型创作图像的可视化工作台。'
    ),
    description: text(
      'ComfyUI is a visual image-generation app with Desktop and Cloud options. Start from a Qwen-Image 2.1 template, write a prompt or add reference images, and run the workflow in its canvas. Its reusable templates and App Mode help turn complex workflows into practical creative tools.',
      'ComfyUI 是提供桌面版与云端版的可视化图像创作应用。你可以从 Qwen-Image 2.1 模板开始，输入提示词或参考图，再在画布上运行工作流。可复用模板和 App Mode 能把复杂流程变成更易使用的创作工具。'
    ),
    note: text(
      'Best for: visual image creation with reusable Qwen workflows',
      '适合：使用 Qwen 工作流进行可视化图像创作'
    ),
    image: '',
    tone: 'cobalt',
    profile: {
      valueProposition: text(
        'Create and edit images through a visible workflow canvas, with a simpler App Mode and ready-made templates to help you start.',
        '在可视化工作流画布中生成和编辑图像，也可以用简化的 App Mode 与现成模板快速开始。'
      ),
      problemSolved: text(
        'Image models often need several preparation and generation steps. ComfyUI makes those steps visible and reusable in a single canvas.',
        '图像模型通常涉及多步准备与生成流程。ComfyUI 把这些步骤放在同一块画布上，便于查看、调整和复用。'
      ),
      audience: text(
        'Visual creators who want to try Qwen-Image 2.1, customize image workflows, or move between desktop and cloud.',
        '希望体验 Qwen-Image 2.1、调整生图流程，或在桌面与云端间选择使用方式的创作者。'
      ),
      pricing: text(
        'ComfyUI offers a local Desktop app and a hosted Cloud service. Check the official site for current access, credits, and plan terms.',
        'ComfyUI 提供本地桌面应用和托管云服务；当前使用条件、积分与套餐以官网为准。'
      ),
      market: [
        text('Image creation', '图像创作'),
        text('Visual workflows', '可视化工作流'),
        text('Desktop and cloud', '桌面与云端'),
      ],
      techStack: [
        text('Node canvas and App Mode', '节点画布与 App Mode'),
        text('Qwen-Image 2.1 template', 'Qwen-Image 2.1 模板'),
        text('Comfy Desktop or Comfy Cloud', 'Comfy Desktop 或 Comfy Cloud'),
      ],
    },
    specs: [
      spec(
        'Interface',
        '使用界面',
        'Visual canvas and App Mode',
        '可视化画布与 App Mode'
      ),
      spec('Access', '使用方式', 'Desktop app or Cloud', '桌面应用或云端服务'),
      spec(
        'Qwen workflow',
        'Qwen 工作流',
        'Official Qwen-Image 2.1 template',
        '官方 Qwen-Image 2.1 模板'
      ),
      spec(
        'Starting point',
        '入门方式',
        'Ready-made visual templates',
        '现成的可视化模板'
      ),
    ],
    seo: seo(
      text(
        'ComfyUI is a visual application for building and running image-generation workflows. Its official Qwen-Image 2.1 template lets you generate or edit images through a canvas with prompts and reference images. You can use Comfy Desktop locally or try Comfy Cloud in a browser, starting from a ready-made template rather than a blank workflow.',
        'ComfyUI 是构建和运行图像生成工作流的可视化应用。官方 Qwen-Image 2.1 模板让你通过画布、提示词和参考图生成或编辑图像。你可以在本地使用 Comfy Desktop，或在浏览器中体验 Comfy Cloud，并从现成模板开始创作。'
      ),
      [
        step(
          'Open Desktop or Cloud',
          '打开桌面版或云端版',
          'Choose the local Desktop app if you have a suitable GPU, or start in Comfy Cloud through the browser.',
          '如果有合适的 GPU，可以选择本地桌面应用；也可以直接在浏览器中打开 Comfy Cloud。'
        ),
        step(
          'Load a Qwen template',
          '加载 Qwen 模板',
          'Open the Templates panel and select the Qwen-Image 2.1 workflow. Local Desktop use also needs the matching model weights.',
          '在模板面板中选择 Qwen-Image 2.1 工作流。使用本地桌面版时，还需要准备对应的模型权重。'
        ),
        step(
          'Create and refine',
          '生成并调整',
          'Enter a prompt, attach optional reference images, run the workflow, then adjust the result from the canvas or App Mode.',
          '输入提示词，按需添加参考图，运行工作流，再从画布或 App Mode 中调整结果。'
        ),
      ],
      [
        text('Visual workflow canvas', '可视化工作流画布'),
        text('Simplified App Mode', '简化的 App Mode'),
        text('Official Qwen-Image 2.1 template', '官方 Qwen-Image 2.1 模板'),
        text('Desktop and browser-based Cloud options', '桌面版与浏览器云端版'),
      ],
      [
        text('Qwen image creation and editing', 'Qwen 图像生成与编辑'),
        text('Reusable visual workflows', '可复用的可视化工作流'),
        text(
          'Creators comparing local and cloud use',
          '比较本地与云端使用方式的创作者'
        ),
      ],
      [
        faq(
          'Can I try Qwen-Image 2.1 without installing ComfyUI?',
          '不安装 ComfyUI 也能体验 Qwen-Image 2.1 吗？',
          'Yes. The official ComfyUI guide links to a Comfy Cloud workflow. Availability and credit use depend on the current Cloud plan.',
          '可以。ComfyUI 官方指南提供 Comfy Cloud 工作流入口；是否可用及积分消耗以当前云端套餐为准。'
        ),
        faq(
          'How is ComfyUI different from the reAPI playground?',
          'ComfyUI 和 reAPI 网页创作台有什么不同？',
          'The reAPI page offers a single hosted form for Qwen Image 2.1. ComfyUI provides an editable visual workflow with Desktop and Cloud options.',
          'reAPI 提供单页式的 Qwen Image 2.1 在线表单；ComfyUI 则提供可编辑的可视化工作流，并有桌面版和云端版。'
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
// a dedicated 16:9 preview is not available. Keep only files that are checked
// into public so SSR never emits a broken image URL.
const unavailableLocalThumbs = new Set([
  'gwm-worlds-2',
  'runway-characters',
  'jev',
]);

const productHeroThumbs: Record<string, string> = Object.fromEntries(
  realtimeProducts
    .filter((product) => !unavailableLocalThumbs.has(product.slug))
    .map((product) => [
      product.slug,
      `/imgs/product-thumbs/${product.slug}.jpg`,
    ])
);

export const mockProducts: MockAiProduct[] = [
  ...[...generalAiProducts, ...aiToolsBatch2].map((product) => ({
    ...product,
    categoryLabel: productCategoryLabels[product.category],
  })),
  ...localModelProducts,
  ...realtimeProducts,
];
export const categoryKeys: ProductCategory[] = [
  'realtime',
  'text-to-video',
  'image-to-video',
  'avatar-live',
  'video-editing',
  'workflow',
  'models',
  'assistant',
  'research',
  'coding',
  'audio',
  'writing',
];

function getProductProfile(
  product: MockAiProduct,
  locale: CatalogLocale
): CatalogProductProfile {
  if (product.profile) {
    return {
      valueProposition: product.profile.valueProposition[locale],
      problemSolved: product.profile.problemSolved[locale],
      audience: product.profile.audience[locale],
      pricing: product.profile.pricing[locale],
      market: product.profile.market.map((item) => item[locale]),
      techStack: product.profile.techStack.map((item) => item[locale]),
    };
  }

  const isZh = locale === 'zh';
  const isWorkflow = product.category === 'workflow';
  return {
    valueProposition: product.description[locale],
    problemSolved: isWorkflow
      ? isZh
        ? '很多软件需要 AI 做判断，却不得不解析自由文本，再用额外规则兜底。Jev 把答案限制在预先定义的类型内，并返回概率与置信度，让代码可以直接处理不确定性。'
        : 'Software often needs AI judgment but has to parse free-form text and add brittle fallbacks. Jev constrains answers to defined types and returns probabilities plus confidence so code can handle uncertainty directly.'
      : isZh
        ? '传统视频生成通常要等待成片，难以在画面生成过程中及时干预。实时视频产品把反馈和控制带回生成现场。'
        : 'Traditional video generation often makes you wait for a finished clip. Real-time video products bring feedback and control back into the generation loop.',
    audience: isWorkflow
      ? isZh
        ? '适合构建 Agent、RAG、审核系统和自动化产品的开发者与 AI 产品团队。'
        : 'For developers and AI product teams building agents, RAG systems, moderation, and automation workflows.'
      : isZh
        ? '适合创意技术人员、开发者，以及需要实时互动视觉体验的产品和内容团队。'
        : 'For creative technologists, developers, and product teams building live visual experiences.',
    pricing: isWorkflow
      ? isZh
        ? '通过 TypeSafe 官方控制台申请和使用，当前套餐、候补资格、模型版本和 API 条件以官网为准。'
        : 'Access Jev through the TypeSafe console. Current plans, availability, model versions, and API terms are defined by the official site.'
      : isZh
        ? '通过官方网站使用在线服务，套餐、积分、地区和 API 条件以产品官网为准。'
        : 'Hosted access is available through the official website. Plans, credits, regions, and API terms vary by product.',
    market: [
      product.categoryLabel[locale],
      ...product.tags.slice(0, 3).map((item) => item.label[locale]),
    ],
    techStack: isWorkflow
      ? isZh
        ? ['System One 决策模型', '类型化 API 输出', '概率与置信度门控']
        : [
            'System One decision model',
            'Typed API outputs',
            'Probability and confidence gates',
          ]
      : isZh
        ? ['官方在线产品', '实时视频流', '浏览器 / API 接入']
        : [
            'Official hosted product',
            'Real-time video stream',
            'Browser / API access',
          ],
  };
}

/**
 * Detail-page H1/title text: "Name - Keyword" when the product has a primary
 * keyword that its name doesn't already contain, otherwise just the name.
 */
export function getProductHeading(
  product: Pick<MockAiProduct, 'name' | 'seoKeyword'>
) {
  const keyword = product.seoKeyword?.trim();
  if (!keyword || product.name.toLowerCase().includes(keyword.toLowerCase())) {
    return product.name;
  }
  return `${product.name} - ${keyword}`;
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
      const localPreviewImage =
        productPreviewImages[product.slug] ?? productHeroThumbs[product.slug];

      return {
        ...product,
        previewImage:
          localPreviewImage ??
          (product.previewImage?.startsWith('/')
            ? product.previewImage
            : getWebsiteScreenshotUrl(product.website)),
        heroThumb: productHeroThumbs[product.slug],
        tagline: product.tagline[locale],
        description: product.description[locale],
        note: product.note[locale],
        categoryName: product.categoryLabel[locale],
        tagNames: product.tags.map((productTag) => productTag.label[locale]),
        sourceDomain,
        sourceUpdatedAt,
        relatedSlugs: product.relatedSlugs ?? [],
        profile: getProductProfile(product, locale),
        specs: (product.specs ?? []).map((item) => ({
          label: item.label[locale],
          value: item.value[locale],
        })),
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
// Card copy for community submissions. Submissions only store a long
// description, so known entries get a hand-written line and new ones fall back
// to the first sentence, trimmed to keep every card about the same length.
const SUBMISSION_TAGLINES: Record<string, LocalizedText> = {
  'h3price-72b35a8e': text(
    'MiniMax H3 Max video with synced audio, priced per second.',
    'MiniMax H3 Max 视频生成，带同步音频，按秒计费。'
  ),
  'h3price-8ffb70b8': text(
    'MiniMax H3 Max video with synced audio, priced per second.',
    'MiniMax H3 Max 视频生成，带同步音频，按秒计费。'
  ),
  'matrix-game-3-0-6cc486ec': text(
    'Interactive 720p world model at up to 40 FPS.',
    '最高 40 FPS 的 720p 可交互世界模型。'
  ),
  'longlive-56e3f731': text(
    'Long real-time video that follows your changing prompts.',
    '随提示词变化实时生成的长视频。'
  ),
  'streamdit-fdfc579d': text(
    'Streaming text-to-video at 16 FPS on a single GPU.',
    '单卡 16 FPS 的流式文生视频。'
  ),
  'reactor-cac58df2': text(
    'Developer platform for real-time video with sub-50 ms streaming.',
    '面向开发者的实时视频平台，流式延迟低于 50 毫秒。'
  ),
  'streamdiffusionv2-89570fbc': text(
    'Low-latency diffusion video for live online streaming.',
    '面向在线直播的低延迟扩散视频生成。'
  ),
  'rtfm-00868092': text(
    'World Labs preview that renders worlds as you explore.',
    'World Labs 预览版，边探索边实时生成世界。'
  ),
  'realvideo-beb1d305': text(
    'Z.ai real-time video streams for audiovisual conversations.',
    'Z.ai 为音视频对话实时生成视频流。'
  ),
  'waypoint-1-5-dbdb2220': text(
    'Playable AI worlds at 720p and 60 FPS on consumer GPUs.',
    '消费级显卡上 720p、60 FPS 的可玩 AI 世界。'
  ),
  'lingbot-world-caba0166': text(
    'Action-controlled world model with a live demo gallery.',
    '可用动作控制的世界模型，附实时演示。'
  ),
};

const TAGLINE_MAX_WORDS = 12;
const TAGLINE_MAX_CHARS_ZH = 28;

function shortTagline(description: string, locale: CatalogLocale): string {
  const firstSentence =
    description
      .replace(/\\/g, '')
      .split(/(?<=[.!?])\s+|(?<=[。！？])/)[0]
      ?.trim() ?? '';
  if (locale === 'zh' && /[\u4e00-\u9fff]/.test(firstSentence)) {
    return firstSentence.length > TAGLINE_MAX_CHARS_ZH
      ? `${firstSentence.slice(0, TAGLINE_MAX_CHARS_ZH)}…`
      : firstSentence;
  }
  const words = firstSentence.split(/\s+/);
  return words.length > TAGLINE_MAX_WORDS
    ? `${words
        .slice(0, TAGLINE_MAX_WORDS)
        .join(' ')
        .replace(/[,;:]$/, '')}…`
    : firstSentence;
}

export function toCatalogProduct(
  submission: SubmittedProductRecord,
  locale: CatalogLocale
): CatalogProduct {
  const category = normalizeProductCategory(submission.category);
  const categoryLabel = productCategoryLabels[category];
  const sourceDomain = getSourceDomain(submission.website);
  const description = submission.description.trim();
  const submittedLabel = locale === 'zh' ? '用户提交' : 'Community submission';
  const officialLabel = locale === 'zh' ? '官方网站' : 'Official website';
  const liveLabel =
    locale === 'zh' ? '实时视频产品' : 'Real-time video product';
  const categoryName = categoryLabel[locale];
  const whatIs =
    locale === 'zh'
      ? `${submission.name} 是一款面向${categoryName}场景的产品，提供方通过官方网站提供完整体验。${description}`
      : `${submission.name} is a ${categoryName.toLowerCase()} product with its full experience available on the official website. ${description}`;
  const steps =
    locale === 'zh'
      ? [
          {
            title: '打开产品官网',
            description: `访问 ${sourceDomain}，了解产品的完整体验。`,
          },
          {
            title: '选择使用方式',
            description: `根据 ${submission.name} 提供的功能和入口，选择适合你的${categoryName}工作流。`,
          },
          {
            title: '完成一次体验',
            description: `用一个真实任务测试 ${submission.name} 的效果、速度和使用门槛。`,
          },
        ]
      : [
          {
            title: 'Open the official site',
            description: `Visit ${sourceDomain} to see the complete product experience.`,
          },
          {
            title: 'Choose a workflow',
            description: `Choose the ${categoryName.toLowerCase()} workflow that fits your use case.`,
          },
          {
            title: 'Run a real test',
            description: `Use ${submission.name} on a real task to evaluate its output, speed, and access requirements.`,
          },
        ];
  const keyFeatures =
    locale === 'zh'
      ? [
          `${categoryName}产品入口`,
          '官方网站体验链接',
          '社区提交的产品资料',
          '适合先试用再评估',
        ]
      : [
          `${categoryName} product entry point`,
          'Official website access',
          'Community-submitted product profile',
          'Easy to test before adopting',
        ];
  const bestFor =
    locale === 'zh'
      ? ['产品发现', `${categoryName}体验`, '创作者与产品团队']
      : [
          'Product discovery',
          `${categoryName} workflows`,
          'Creators and product teams',
        ];
  const faqItems =
    locale === 'zh'
      ? [
          {
            question: `${submission.name} 是什么？`,
            answer: whatIs,
          },
          {
            question: `如何开始使用 ${submission.name}？`,
            answer: `打开 ${sourceDomain}，按照官网提供的注册、试用或产品入口开始体验。具体功能和可用地区以官网信息为准。`,
          },
          {
            question: `${submission.name} 适合谁？`,
            answer: `它适合正在寻找${categoryName}工具、产品灵感或工作流的创作者、开发者和产品团队。`,
          },
        ]
      : [
          {
            question: `What is ${submission.name}?`,
            answer: whatIs,
          },
          {
            question: `How do you use ${submission.name}?`,
            answer: `Visit ${sourceDomain} and follow its sign-up, trial, or product entry points. Features and regional availability are defined by the official site.`,
          },
          {
            question: `Who is ${submission.name} for?`,
            answer: `It is a useful starting point for creators, developers, and product teams exploring ${categoryName.toLowerCase()} tools and workflows.`,
          },
        ];

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
    previewImage: getWebsiteScreenshotUrl(submission.website),
    image: '',
    tone: 'cobalt',
    tagline:
      SUBMISSION_TAGLINES[submission.slug]?.[locale] ??
      shortTagline(description, locale),
    description,
    note: `${submittedLabel} · ${officialLabel}`,
    categoryName: categoryLabel[locale],
    tagNames: [submittedLabel, liveLabel],
    sourceDomain,
    sourceUpdatedAt: formatSubmissionDate(submission.createdAt),
    heroThumb: '',
    relatedSlugs: [],
    specs: [],
    seo: {
      whatIs,
      howToUse: steps,
      keyFeatures,
      bestFor,
      faqs: faqItems,
    },
    profile: {
      valueProposition: whatIs,
      problemSolved:
        locale === 'zh'
          ? `帮助用户更快发现并体验新的${categoryName}产品，减少寻找合适工具的时间。`
          : `Helps people discover and try a ${categoryName.toLowerCase()} product faster, with less time spent comparing tools.`,
      audience:
        locale === 'zh'
          ? `适合正在寻找${categoryName}工具、Demo 或工作流的创作者、开发者和产品团队。`
          : `For creators, developers, and product teams looking for ${categoryName.toLowerCase()} tools, demos, or workflows.`,
      pricing:
        locale === 'zh'
          ? '访问官方网站查看当前的套餐、试用和使用条件。'
          : 'Visit the official website for current plans, trials, and access terms.',
      market: [categoryName, submittedLabel],
      techStack: [sourceDomain, officialLabel, liveLabel],
    },
  };
}
