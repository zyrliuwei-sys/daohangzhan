import type { GeneralAiProduct } from '@/lib/general-ai-products';
import type { ProductCategory, ProductTone } from '@/lib/mock-ai-products';

// Second batch of general AI tools (2026-10-01 keyword report). Entries are
// written as compact tuples ([en, zh]) and expanded by `tool()` below.
type Pair = [en: string, zh: string];

interface CompactTool {
  slug: string;
  name: string;
  aliases?: string[];
  seoKeyword?: string;
  maker: string;
  website: string;
  category: ProductCategory;
  tone: ProductTone;
  related?: string[];
  tags: Array<[key: string, en: string, zh: string]>;
  tagline: Pair;
  description: Pair;
  note: Pair;
  value: Pair;
  problem: Pair;
  audience: Pair;
  pricing: Pair;
  market: Pair[];
  tech: Pair[];
  whatIs: Pair;
  steps: Array<[titleEn: string, titleZh: string, en: string, zh: string]>;
  features: Pair[];
  bestFor: Pair[];
  faqs: Array<[qEn: string, qZh: string, aEn: string, aZh: string]>;
}

const t = ([en, zh]: Pair) => ({ en, zh });

function tool(c: CompactTool): GeneralAiProduct {
  return {
    slug: c.slug,
    name: c.name,
    aliases: c.aliases,
    seoKeyword: c.seoKeyword,
    maker: c.maker,
    website: c.website,
    sourceType: 'website',
    lastVerifiedAt: '2026-10-01',
    category: c.category,
    tone: c.tone,
    image: '',
    relatedSlugs: c.related,
    tags: c.tags.map(([key, en, zh]) => ({ key, label: { en, zh } })),
    tagline: t(c.tagline),
    description: t(c.description),
    note: t(c.note),
    profile: {
      valueProposition: t(c.value),
      problemSolved: t(c.problem),
      audience: t(c.audience),
      pricing: t(c.pricing),
      market: c.market.map(t),
      techStack: c.tech.map(t),
    },
    seo: {
      whatIs: t(c.whatIs),
      howToUse: c.steps.map(([te, tz, de, dz]) => ({
        title: { en: te, zh: tz },
        description: { en: de, zh: dz },
      })),
      keyFeatures: c.features.map(t),
      bestFor: c.bestFor.map(t),
      faqs: c.faqs.map(([qe, qz, ae, az]) => ({
        question: { en: qe, zh: qz },
        answer: { en: ae, zh: az },
      })),
    },
  };
}

const PRICING_CHECK: Pair = [
  'Free to try with paid plans. Check the official site for current pricing.',
  '可免费试用，另有付费套餐，当前价格以官网为准。',
];

export const aiToolsBatch2: GeneralAiProduct[] = [
  // ─── AI assistants & agents ──────────────────────────────────────────────
  tool({
    slug: 'grok',
    name: 'Grok',
    maker: 'SpaceXAI',
    website: 'https://grok.com',
    category: 'assistant',
    tone: 'cobalt',
    related: ['deepseek', 'kimi', 'mistral-vibe'],
    tags: [
      ['ai-chat', 'AI chat', 'AI 对话'],
      ['real-time-search', 'Real-time answers', '实时信息'],
      ['image-generation', 'Image generation', '图像生成'],
    ],
    tagline: [
      'An AI assistant with real-time answers from the web and X.',
      '能从网络和 X 获取实时信息的 AI 助手。',
    ],
    description: [
      'Grok is an AI assistant built by SpaceXAI. You can chat with it, create images, write code, and get real-time answers drawn from the web and posts on X.',
      'Grok 是 SpaceXAI 打造的 AI 助手。可以和它聊天、生成图片、写代码，并获取来自网络和 X 平台的实时信息。',
    ],
    note: [
      'Best for: questions about what is happening right now',
      '适合：询问正在发生的新闻和热点',
    ],
    value: [
      'A general assistant with live access to news and X conversations.',
      '一个能实时读取新闻和 X 讨论的通用助手。',
    ],
    problem: [
      'Many chatbots cannot answer questions about events from the last few hours.',
      '很多聊天机器人回答不了最近几个小时发生的事。',
    ],
    audience: [
      'Everyday users, X users, and people tracking news.',
      '日常用户、X 用户和关注时事的人。',
    ],
    pricing: PRICING_CHECK,
    market: [
      ['AI assistants', 'AI 助手'],
      ['Real-time search', '实时搜索'],
    ],
    tech: [
      ['Grok models', 'Grok 模型'],
      ['Web and X retrieval', '网络与 X 检索'],
    ],
    whatIs: [
      'Grok AI is a chatbot and assistant from SpaceXAI. It combines a large language model with live retrieval from the web and X, so it can discuss breaking topics, generate images, and help with code.',
      'Grok AI 是 SpaceXAI 推出的聊天助手。它把大语言模型和网络、X 平台的实时检索结合在一起，可以聊突发话题、生成图片，也能帮忙写代码。',
    ],
    steps: [
      [
        'Open Grok',
        '打开 Grok',
        'Use grok.com, the mobile app, or Grok inside X.',
        '使用 grok.com、手机 App 或 X 内置的 Grok。',
      ],
      [
        'Ask or create',
        '提问或创作',
        'Ask a question, request an image, or paste code.',
        '提出问题、生成图片或贴上代码。',
      ],
      [
        'Follow up',
        '继续追问',
        'Ask follow-ups and open the cited posts or pages.',
        '继续追问，并打开引用的帖子或网页。',
      ],
    ],
    features: [
      ['Real-time answers from the web and X', '来自网络和 X 的实时答案'],
      ['Image creation', '图像生成'],
      ['Coding help', '编程辅助'],
      ['Web and mobile apps', '网页和手机端'],
    ],
    bestFor: [
      ['Breaking news and trends', '突发新闻与热点'],
      ['Casual chat and brainstorming', '日常聊天与头脑风暴'],
      ['Quick image generation', '快速生成图片'],
    ],
    faqs: [
      [
        'Who makes Grok?',
        'Grok 是谁做的？',
        'Grok is built by SpaceXAI, according to grok.com.',
        '根据 grok.com 的说明，Grok 由 SpaceXAI 打造。',
      ],
      [
        'Is Grok free?',
        'Grok 免费吗？',
        'There is free access with limits; paid plans raise limits and unlock more features.',
        '可免费使用但有限额，付费套餐提高额度并解锁更多功能。',
      ],
    ],
  }),
  tool({
    slug: 'mistral-vibe',
    name: 'Mistral Vibe (Le Chat)',
    maker: 'Mistral AI',
    website: 'https://mistral.ai/products/vibe/',
    category: 'assistant',
    tone: 'amber',
    related: ['grok', 'qwen-chat'],
    tags: [
      ['ai-chat', 'AI chat', 'AI 对话'],
      ['coding-agent', 'Coding agent', '编程 Agent'],
      ['european-ai', 'European AI', '欧洲 AI'],
    ],
    tagline: [
      'Mistral’s AI chat and agent, formerly Le Chat.',
      'Mistral 的 AI 对话与 Agent，前身是 Le Chat。',
    ],
    description: [
      'Mistral Vibe, formerly Le Chat, is Mistral AI’s assistant for work and code. It can chat, reason, search the web, write, code, and automate tasks, using Mistral’s own models.',
      'Mistral Vibe 前身是 Le Chat，是 Mistral AI 面向工作和编程的助手。它基于 Mistral 自研模型，可以对话、推理、联网搜索、写作、编程和自动化任务。',
    ],
    note: [
      'Best for: a European alternative to US chatbots',
      '适合：想用欧洲出品的 AI 助手',
    ],
    value: [
      'Chat, search, writing, and a coding agent from one European AI lab.',
      '对话、搜索、写作和编程 Agent，全部来自一家欧洲 AI 公司。',
    ],
    problem: [
      'Teams want a capable assistant that is not tied to US providers.',
      '有些团队希望使用不依赖美国厂商的强力助手。',
    ],
    audience: [
      'Professionals, developers, and European teams.',
      '职场人士、开发者和欧洲团队。',
    ],
    pricing: [
      'Free tier available; paid plans add higher limits and team features.',
      '有免费版，付费套餐提供更高额度和团队功能。',
    ],
    market: [
      ['AI assistants', 'AI 助手'],
      ['Coding agents', '编程 Agent'],
    ],
    tech: [
      ['Mistral models', 'Mistral 模型'],
      ['Web search', '联网搜索'],
    ],
    whatIs: [
      'Le Chat by Mistral AI has been renamed Mistral Vibe. It is a chat assistant and agent that searches, writes, codes, and automates work on top of Mistral’s models.',
      'Mistral AI 的 Le Chat 已更名为 Mistral Vibe。它是基于 Mistral 模型的对话助手和 Agent，能搜索、写作、编程并自动化工作。',
    ],
    steps: [
      [
        'Sign in',
        '登录',
        'Open Mistral Vibe on the web or mobile app.',
        '在网页或手机 App 打开 Mistral Vibe。',
      ],
      [
        'Chat or delegate',
        '对话或委派任务',
        'Ask a question or give it a task to complete.',
        '提问，或交给它一项任务。',
      ],
      [
        'Use the coding agent',
        '使用编程 Agent',
        'Switch to code tasks for help building software.',
        '切换到编程任务，让它协助开发。',
      ],
    ],
    features: [
      ['Chat and reasoning', '对话与推理'],
      ['Web search', '联网搜索'],
      ['Coding agent', '编程 Agent'],
      ['Task automation', '任务自动化'],
    ],
    bestFor: [
      ['Writing and research at work', '工作中的写作和调研'],
      ['Code assistance', '编程辅助'],
      ['European data preferences', '偏好欧洲数据服务'],
    ],
    faqs: [
      [
        'Is Le Chat the same as Mistral Vibe?',
        'Le Chat 和 Mistral Vibe 是同一个产品吗？',
        'Yes. Mistral’s site describes Vibe as “formerly Le Chat.”',
        '是的，Mistral 官网称 Vibe 为“前身是 Le Chat”。',
      ],
      [
        'Is it free?',
        '免费吗？',
        'There is a free tier; paid plans add more usage.',
        '有免费版，付费套餐提供更多用量。',
      ],
    ],
  }),
  tool({
    slug: 'qwen-chat',
    name: 'Qwen Chat',
    maker: 'Alibaba',
    website: 'https://chat.qwen.ai',
    category: 'assistant',
    tone: 'plum',
    related: ['deepseek', 'kimi'],
    tags: [
      ['ai-chat', 'AI chat', 'AI 对话'],
      ['multimodal', 'Multimodal', '多模态'],
      ['open-models', 'Open models', '开放模型'],
    ],
    tagline: [
      'Alibaba’s free chatbot for the Qwen model family.',
      '阿里巴巴推出的免费通义千问对话助手。',
    ],
    description: [
      'Qwen Chat is Alibaba’s web chat interface for its Qwen models. It handles conversation, reasoning, coding, and multimodal tasks such as understanding and generating images.',
      'Qwen Chat 是阿里巴巴通义千问模型的网页对话入口，支持对话、推理、编程，以及看图、生图等多模态任务。',
    ],
    note: [
      'Best for: trying the latest Qwen models for free',
      '适合：免费体验最新的千问模型',
    ],
    value: [
      'Direct, free access to Alibaba’s newest Qwen models.',
      '直接免费使用阿里最新的千问模型。',
    ],
    problem: [
      'Running new open models yourself needs hardware and setup.',
      '自己部署新的开源模型需要硬件和配置。',
    ],
    audience: [
      'General users and developers evaluating Qwen.',
      '普通用户和正在评估千问的开发者。',
    ],
    pricing: [
      'Free to use in the browser; API access is billed through Alibaba Cloud.',
      '网页端免费使用，API 通过阿里云计费。',
    ],
    market: [
      ['AI assistants', 'AI 助手'],
      ['Open models', '开放模型'],
    ],
    tech: [
      ['Qwen models', '通义千问模型'],
      ['Multimodal input', '多模态输入'],
    ],
    whatIs: [
      'Qwen AI is Alibaba’s family of large language models, and Qwen Chat is the easiest way to use it. Pick a Qwen model, then chat, upload files or images, and generate content in the browser.',
      'Qwen AI 是阿里巴巴的大模型系列，Qwen Chat 是使用它最简单的方式。选择一个千问模型后，就能在浏览器里对话、上传文件或图片，并生成内容。',
    ],
    steps: [
      [
        'Open Qwen Chat',
        '打开 Qwen Chat',
        'Go to chat.qwen.ai and sign in.',
        '访问 chat.qwen.ai 并登录。',
      ],
      [
        'Choose a model',
        '选择模型',
        'Pick the Qwen model that fits the task.',
        '根据任务选择合适的千问模型。',
      ],
      [
        'Chat or upload',
        '对话或上传',
        'Ask questions, upload images or files, or generate images.',
        '提问、上传图片或文件，或生成图片。',
      ],
    ],
    features: [
      ['Multiple Qwen models', '多个千问模型'],
      ['Image understanding and generation', '看图与生图'],
      ['Coding and reasoning', '编程与推理'],
      ['Free web access', '网页端免费使用'],
    ],
    bestFor: [
      ['Free everyday AI chat', '免费的日常 AI 对话'],
      ['Testing Qwen before using the API', '使用 API 前先测试千问'],
      ['Chinese and English tasks', '中英文任务'],
    ],
    faqs: [
      [
        'Is Qwen Chat free?',
        'Qwen Chat 免费吗？',
        'The web chat is free to use; API usage is paid via Alibaba Cloud.',
        '网页对话免费，API 通过阿里云付费使用。',
      ],
      [
        'Are Qwen models open source?',
        '千问模型开源吗？',
        'Many Qwen models are released with open weights; check each model’s license.',
        '很多千问模型开放权重，具体以各模型许可证为准。',
      ],
    ],
  }),
  tool({
    slug: 'deepseek',
    name: 'DeepSeek',
    maker: 'DeepSeek',
    website: 'https://www.deepseek.com',
    category: 'assistant',
    tone: 'cobalt',
    related: ['qwen-chat', 'kimi'],
    tags: [
      ['ai-chat', 'AI chat', 'AI 对话'],
      ['reasoning', 'Reasoning', '推理'],
      ['open-models', 'Open models', '开源模型'],
    ],
    tagline: [
      'Chat with DeepSeek’s open models, or use them via API.',
      '和 DeepSeek 开源大模型对话，或通过 API 接入。',
    ],
    description: [
      'DeepSeek is a Chinese AI lab that open-sources frontier models such as DeepSeek-V4 and DeepSeek-R1. You can chat with them for free on the web and app, or call them through a low-cost API.',
      '深度求索（DeepSeek）是一家开源前沿大模型的中国 AI 公司，代表模型有 DeepSeek-V4 和 DeepSeek-R1。可以在网页和 App 上免费对话，也可以通过低价 API 接入。',
    ],
    note: [
      'Best for: strong reasoning at low cost',
      '适合：低成本获得强推理能力',
    ],
    value: [
      'Frontier-level models with open weights and an affordable API.',
      '前沿水平的模型，开放权重，API 价格亲民。',
    ],
    problem: [
      'Top closed models can be expensive to run at scale.',
      '顶级闭源模型大规模使用成本很高。',
    ],
    audience: [
      'Users, developers, and companies building on open models.',
      '普通用户、开发者和基于开源模型构建产品的公司。',
    ],
    pricing: [
      'Web and app chat are free; the API is pay-as-you-go.',
      '网页和 App 对话免费，API 按量付费。',
    ],
    market: [
      ['AI assistants', 'AI 助手'],
      ['Open-weight models', '开源模型'],
    ],
    tech: [
      ['DeepSeek-V4', 'DeepSeek-V4'],
      ['DeepSeek-R1 reasoning', 'DeepSeek-R1 推理'],
    ],
    whatIs: [
      'DeepSeek AI offers a free chatbot and an API for its open models. DeepSeek-V4 handles general tasks and DeepSeek-R1 focuses on step-by-step reasoning for math and code.',
      'DeepSeek AI 提供免费聊天助手和开源模型 API。DeepSeek-V4 负责通用任务，DeepSeek-R1 专注数学和代码等逐步推理。',
    ],
    steps: [
      [
        'Start a chat',
        '开始对话',
        'Use the web chat or the DeepSeek app.',
        '使用网页版或 DeepSeek App。',
      ],
      [
        'Turn on deep thinking',
        '开启深度思考',
        'Enable reasoning mode for hard problems.',
        '遇到难题时开启推理模式。',
      ],
      [
        'Use the API',
        '接入 API',
        'Create an API key on the developer platform.',
        '在开放平台创建 API Key。',
      ],
    ],
    features: [
      ['Free web and app chat', '网页和 App 免费对话'],
      ['Reasoning mode', '深度思考模式'],
      ['Open-weight models', '开源权重模型'],
      ['Low-cost API', '低价 API'],
    ],
    bestFor: [
      ['Math and coding problems', '数学和编程问题'],
      ['Cost-sensitive AI apps', '对成本敏感的 AI 应用'],
      ['Self-hosting open models', '自行部署开源模型'],
    ],
    faqs: [
      [
        'Is DeepSeek free?',
        'DeepSeek 免费吗？',
        'Chat on the web and app is free; the API is paid by usage.',
        '网页和 App 对话免费，API 按用量付费。',
      ],
      [
        'Is DeepSeek open source?',
        'DeepSeek 开源吗？',
        'DeepSeek releases open models such as DeepSeek-V4 and R1; check each license.',
        'DeepSeek 开源了 V4、R1 等模型，具体以许可证为准。',
      ],
    ],
  }),
  tool({
    slug: 'kimi',
    name: 'Kimi',
    maker: 'Moonshot AI',
    website: 'https://www.kimi.com',
    category: 'assistant',
    tone: 'moss',
    related: ['deepseek', 'manus'],
    tags: [
      ['ai-agent', 'AI agent', 'AI Agent'],
      ['slides', 'Slides', 'PPT'],
      ['coding', 'Agentic coding', '智能体编程'],
    ],
    tagline: [
      'Moonshot’s AI assistant for agentic coding and knowledge work.',
      '月之暗面出品，专注智能体编程与知识工作的 AI 助手。',
    ],
    description: [
      'Kimi is Moonshot AI’s assistant, now running Kimi K3. It is built for agentic coding and knowledge work: it can build playable games, produce consulting-grade slides, and run parallel tasks with Swarm agents and Goal mode.',
      'Kimi 是月之暗面（Moonshot AI）的 AI 助手，现已升级到 Kimi K3。它专为智能体编程和知识工作打造：能做可玩的游戏、生成咨询级 PPT，并用 Swarm 智能体集群和 Goal 模式并行执行任务。',
    ],
    note: [
      'Best for: long tasks like decks, reports, and code',
      '适合：做 PPT、报告和代码等长任务',
    ],
    value: [
      'One assistant that plans and runs multi-step work in parallel.',
      '一个能规划并并行执行多步骤工作的助手。',
    ],
    problem: [
      'Big deliverables like decks and apps take many manual steps.',
      'PPT、应用这类大型交付物需要大量手工步骤。',
    ],
    audience: [
      'Knowledge workers, students, and developers.',
      '知识工作者、学生和开发者。',
    ],
    pricing: PRICING_CHECK,
    market: [
      ['AI agents', 'AI Agent'],
      ['Productivity', '效率工具'],
    ],
    tech: [
      ['Kimi K3 model', 'Kimi K3 模型'],
      ['Swarm multi-agent', 'Swarm 智能体集群'],
    ],
    whatIs: [
      'Kimi AI is a chatbot and agent from Moonshot AI. With Kimi K3, it moves beyond chat into delivering work: slide decks, research, 3D and multiplayer games, and code, using multiple agents in parallel.',
      'Kimi AI 是月之暗面推出的对话助手和 Agent。升级 K3 后，它从聊天走向交付成果：PPT、调研、3D 和多人游戏以及代码，并能让多个 Agent 并行工作。',
    ],
    steps: [
      [
        'Open Kimi',
        '打开 Kimi',
        'Use kimi.com or the Kimi app.',
        '使用 kimi.com 或 Kimi App。',
      ],
      [
        'Set a goal',
        '设定目标',
        'Describe the deliverable or switch on Goal mode.',
        '描述想要的成果，或开启 Goal 模式。',
      ],
      [
        'Review the output',
        '检查成果',
        'Open the deck, report, or project and refine it.',
        '打开 PPT、报告或项目并继续修改。',
      ],
    ],
    features: [
      ['Kimi K3 model', 'Kimi K3 模型'],
      ['Consulting-grade slides', '咨询级 PPT'],
      ['Swarm parallel agents', 'Swarm 并行智能体'],
      ['Goal mode for long tasks', '面向长任务的 Goal 模式'],
    ],
    bestFor: [
      ['Presentation decks', '演示 PPT'],
      ['Research reports', '调研报告'],
      ['Agentic coding', '智能体编程'],
    ],
    faqs: [
      [
        'What is Kimi K3?',
        'Kimi K3 是什么？',
        'K3 is the latest Kimi model, focused on agentic coding and knowledge work.',
        'K3 是 Kimi 的最新模型，主打智能体编程和知识工作。',
      ],
      [
        'Who makes Kimi?',
        'Kimi 是谁做的？',
        'Kimi is developed by Moonshot AI in China.',
        'Kimi 由中国公司月之暗面开发。',
      ],
    ],
  }),
  tool({
    slug: 'chatgpt-atlas',
    name: 'ChatGPT Atlas',
    maker: 'OpenAI',
    website: 'https://chatgpt.com/atlas',
    category: 'assistant',
    tone: 'coral',
    related: ['perplexity', 'grok'],
    tags: [
      ['ai-browser', 'AI browser', 'AI 浏览器'],
      ['agent-mode', 'Agent mode', 'Agent 模式'],
      ['chatgpt', 'ChatGPT', 'ChatGPT'],
    ],
    tagline: [
      'OpenAI’s web browser with ChatGPT built into every page.',
      'OpenAI 推出的浏览器，每个网页都内置 ChatGPT。',
    ],
    description: [
      'ChatGPT Atlas is OpenAI’s web browser. A ChatGPT side panel can read the page you are on to answer questions, summarize, or compare, and agent mode can carry out tasks in the browser. It launched on macOS, with Windows announced.',
      'ChatGPT Atlas 是 OpenAI 的网页浏览器。侧边的 ChatGPT 面板可以读取当前网页来回答问题、总结或对比，Agent 模式还能直接在浏览器里完成任务。目前已在 macOS 推出，Windows 版已宣布。',
    ],
    note: [
      'Best for: ChatGPT users who browse and research a lot',
      '适合：经常上网查资料的 ChatGPT 用户',
    ],
    value: [
      'ChatGPT sees the page you are on, so no copy-pasting.',
      'ChatGPT 能直接看到当前网页，不用来回复制粘贴。',
    ],
    problem: [
      'Moving content between tabs and a chatbot breaks your flow.',
      '在网页和聊天机器人之间来回切换很打断思路。',
    ],
    audience: [
      'ChatGPT users on Mac, and Windows users once available.',
      'Mac 上的 ChatGPT 用户，以及之后的 Windows 用户。',
    ],
    pricing: [
      'Free to download; agent mode requires a paid ChatGPT plan.',
      '可免费下载，Agent 模式需要 ChatGPT 付费套餐。',
    ],
    market: [
      ['AI browsers', 'AI 浏览器'],
      ['AI assistants', 'AI 助手'],
    ],
    tech: [
      ['ChatGPT side panel', 'ChatGPT 侧边栏'],
      ['Browser memories', '浏览器记忆'],
    ],
    whatIs: [
      'ChatGPT Atlas is an AI browser from OpenAI. It pairs a full browser with a persistent ChatGPT panel, browser memories, and an agent mode that can click through sites to complete tasks.',
      'ChatGPT Atlas 是 OpenAI 的 AI 浏览器。它把完整的浏览器和常驻 ChatGPT 面板结合，并提供浏览器记忆和能自动点击网页完成任务的 Agent 模式。',
    ],
    steps: [
      [
        'Download Atlas',
        '下载 Atlas',
        'Install it from chatgpt.com/atlas and sign in.',
        '从 chatgpt.com/atlas 下载安装并登录。',
      ],
      [
        'Ask about a page',
        '就网页提问',
        'Open the ChatGPT panel to summarize or question the page.',
        '打开 ChatGPT 面板总结或询问当前网页。',
      ],
      [
        'Try agent mode',
        '试用 Agent 模式',
        'On a paid plan, let the agent complete a task for you.',
        '付费用户可让 Agent 替你完成任务。',
      ],
    ],
    features: [
      ['ChatGPT side panel on any page', '任意网页可用的 ChatGPT 侧栏'],
      ['Agent mode', 'Agent 模式'],
      ['Browser memories', '浏览器记忆'],
      ['Import from other browsers', '从其他浏览器导入'],
    ],
    bestFor: [
      ['Summarizing articles', '总结文章'],
      ['Comparing products while shopping', '购物时比较商品'],
      ['Automating repetitive web tasks', '自动化重复的网页操作'],
    ],
    faqs: [
      [
        'Is ChatGPT Atlas on Windows?',
        'ChatGPT Atlas 有 Windows 版吗？',
        'Atlas launched on macOS and OpenAI has announced a Windows version; check the official page for availability.',
        'Atlas 先在 macOS 推出，OpenAI 已宣布 Windows 版，以官网发布为准。',
      ],
      [
        'Is Atlas free?',
        'Atlas 免费吗？',
        'The browser is free; agent mode needs a paid ChatGPT plan.',
        '浏览器本身免费，Agent 模式需要 ChatGPT 付费套餐。',
      ],
    ],
  }),
  tool({
    slug: 'lm-studio',
    name: 'LM Studio',
    maker: 'LM Studio',
    website: 'https://lmstudio.ai',
    category: 'assistant',
    tone: 'moss',
    related: ['deepseek', 'qwen-chat', 'strata-llm'],
    tags: [
      ['local-ai', 'Local AI', '本地 AI'],
      ['open-models', 'Open models', '开源模型'],
      ['desktop-app', 'Desktop app', '桌面应用'],
    ],
    tagline: [
      'Run open AI models locally, with an agent for work and code.',
      '在本地运行开源大模型，并提供工作与编程 Agent。',
    ],
    description: [
      'LM Studio is a desktop app for running open models on your own computer. Its Bionic agent creates documents, slides, PDFs, and software using either local models or frontier open models.',
      'LM Studio 是一款在自己电脑上运行开源模型的桌面应用。它的 Bionic Agent 可以用本地模型或前沿开源模型来生成文档、PPT、PDF 和软件。',
    ],
    note: [
      'Best for: private AI that runs on your own machine',
      '适合：在自己电脑上私密运行 AI',
    ],
    value: [
      'Download and run open models with no cloud or command line.',
      '无需云端和命令行，就能下载并运行开源模型。',
    ],
    problem: [
      'Sending sensitive data to cloud AI is not always acceptable.',
      '把敏感数据发到云端 AI 并不总是可行。',
    ],
    audience: [
      'Developers, privacy-minded users, and teams.',
      '开发者、注重隐私的用户和团队。',
    ],
    pricing: [
      'Free desktop app; check the site for work and team terms.',
      '桌面应用免费，工作和团队使用条款见官网。',
    ],
    market: [
      ['Local AI', '本地 AI'],
      ['Developer tools', '开发者工具'],
    ],
    tech: [
      ['Local model runtime', '本地模型运行时'],
      ['Bionic agent', 'Bionic Agent'],
    ],
    whatIs: [
      'LM Studio lets you discover, download, and chat with open-weight models offline. It also exposes a local server for apps, and its Bionic agent turns local models into a work and coding assistant.',
      'LM Studio 可以发现、下载并离线使用开源模型对话，还能提供本地服务器供其他应用调用。它的 Bionic Agent 把本地模型变成工作和编程助手。',
    ],
    steps: [
      [
        'Install LM Studio',
        '安装 LM Studio',
        'Download the app for Mac, Windows, or Linux.',
        '下载 Mac、Windows 或 Linux 版应用。',
      ],
      [
        'Download a model',
        '下载模型',
        'Pick an open model that fits your hardware.',
        '选择适合你硬件的开源模型。',
      ],
      [
        'Chat or run Bionic',
        '对话或运行 Bionic',
        'Chat offline or ask Bionic to build a document or app.',
        '离线对话，或让 Bionic 生成文档或应用。',
      ],
    ],
    features: [
      ['Run open models offline', '离线运行开源模型'],
      ['Bionic agent for work and code', '面向工作和编程的 Bionic Agent'],
      ['Local API server', '本地 API 服务'],
      ['Mac, Windows, and Linux', '支持 Mac、Windows、Linux'],
    ],
    bestFor: [
      ['Private document work', '处理私密文档'],
      ['Testing open models', '测试开源模型'],
      ['Offline AI', '离线 AI'],
    ],
    faqs: [
      [
        'Is LM Studio free?',
        'LM Studio 免费吗？',
        'The desktop app is free to download and use.',
        '桌面应用可免费下载使用。',
      ],
      [
        'Does my data leave my computer?',
        '数据会离开我的电脑吗？',
        'With local models, inference runs on your machine.',
        '使用本地模型时，推理完全在你的电脑上进行。',
      ],
    ],
  }),
  tool({
    slug: 'strata-llm',
    name: 'Strata',
    aliases: [
      'Strata LLM',
      'Strata AI',
      'Strata local LLM',
      'Strata 本地大模型',
    ],
    seoKeyword: 'Local LLM',
    maker: 'Niko1221 (open source)',
    website: 'https://github.com/Niko1221/Strata',
    category: 'assistant',
    tone: 'cobalt',
    related: ['lm-studio', 'qwen-chat'],
    tags: [
      ['local-ai', 'Local LLM', '本地大模型'],
      ['open-source', 'Open source', '开源'],
      ['gaming-pc', 'Runs on a gaming PC', '游戏电脑可跑'],
    ],
    tagline: [
      'Run a 125B-parameter LLM on your own gaming PC, free and offline.',
      '在自己的游戏电脑上免费离线运行 1250 亿参数大模型。',
    ],
    description: [
      'Strata (often searched as “Strata LLM”) is a free, open-source app that runs Qwen3.8-Flash-Next, a 125-billion-parameter model, on a normal gaming PC with a 12 GB NVIDIA or AMD card. It spreads the model across GPU, RAM, and SSD, then gives you a browser chat and an OpenAI-compatible local API.',
      'Strata（常被搜索为“Strata LLM”）是一款免费开源应用，能在配有 12 GB NVIDIA 或 AMD 显卡的普通游戏电脑上运行 1250 亿参数的 Qwen3.8-Flash-Next。它把模型分摊到显卡、内存和固态硬盘上，并提供浏览器聊天界面和兼容 OpenAI 的本地 API。',
    ],
    note: [
      'Best for: running a large model at home with nothing leaving your PC',
      '适合：在家用电脑上运行大模型，数据不出本机',
    ],
    value: [
      'Server-class model quality on consumer hardware, with no per-token cost.',
      '在消费级硬件上获得接近服务器级的大模型能力，不按 token 付费。',
    ],
    problem: [
      'Models this large normally need a data-center GPU or a paid cloud API.',
      '这种规模的模型通常需要数据中心级显卡或付费云端 API。',
    ],
    audience: [
      'Gamers and developers with a 12 GB+ graphics card and 32 GB+ RAM who want a private local LLM.',
      '拥有 12 GB 以上显卡和 32 GB 以上内存、想要私有本地大模型的玩家和开发者。',
    ],
    pricing: [
      'Free and open source (MIT). You only need your own hardware and about 80 GB of disk space.',
      '免费开源（MIT 协议）。只需自备硬件和约 80 GB 磁盘空间。',
    ],
    market: [
      ['Local AI', '本地 AI'],
      ['Open-source LLM tools', '开源大模型工具'],
    ],
    tech: [
      [
        'Qwen3.8-Flash-Next (125B MoE)',
        'Qwen3.8-Flash-Next（1250 亿参数 MoE）',
      ],
      ['GPU + RAM + SSD offloading', '显卡 + 内存 + SSD 分层加载'],
      [
        'OpenAI- and Anthropic-compatible API',
        '兼容 OpenAI 与 Anthropic 的 API',
      ],
    ],
    whatIs: [
      'Strata is the project people usually mean by “Strata LLM”: a local LLM engine and app that runs the 125-billion-parameter Qwen3.8-Flash-Next on a Windows or Linux gaming PC. The most-used experts stay on the graphics card, the rest sit in RAM, and a lookup table lives on the SSD. On an RTX 5070 it writes around 50 to 95 tokens per second depending on the model size. It chats, writes code, reads pictures, and connects to coding agents, all offline.',
      'Strata 就是大家搜索“Strata LLM”时通常指的项目：一个本地大模型引擎和应用，可在 Windows 或 Linux 游戏电脑上运行 1250 亿参数的 Qwen3.8-Flash-Next。最常用的专家留在显卡上，其余放在内存里，查找表存放在固态硬盘。在 RTX 5070 上，根据模型大小每秒可生成约 50 到 95 个 token。它能聊天、写代码、看图，还能接入编程 Agent，全程离线。',
    ],
    steps: [
      [
        'Download and run the installer',
        '下载并运行安装程序',
        'Get Strata from GitHub, then double-click START-HERE.bat on Windows or run ./setup.sh on Linux.',
        '从 GitHub 下载 Strata，Windows 双击 START-HERE.bat，Linux 运行 ./setup.sh。',
      ],
      [
        'Pick a model size',
        '选择模型大小',
        'The installer checks your card and RAM and recommends a size, then downloads about 70 GB once.',
        '安装程序会检测显卡和内存并推荐合适的大小，然后一次性下载约 70 GB。',
      ],
      [
        'Chat or connect your apps',
        '聊天或接入应用',
        'Open http://127.0.0.1:8080 to chat, or point any OpenAI-compatible app at http://127.0.0.1:8080/v1.',
        '打开 http://127.0.0.1:8080 聊天，或把兼容 OpenAI 的应用指向 http://127.0.0.1:8080/v1。',
      ],
    ],
    features: [
      ['125B model on a 12 GB graphics card', '12 GB 显卡运行 1250 亿参数模型'],
      ['Browser chat with a live hardware monitor', '浏览器聊天和实时硬件监控'],
      [
        'OpenAI- and Anthropic-compatible local API',
        '兼容 OpenAI 与 Anthropic 的本地 API',
      ],
      [
        'NVIDIA and AMD, Windows and Linux',
        '支持 NVIDIA 与 AMD、Windows 与 Linux',
      ],
    ],
    bestFor: [
      ['Private chat and document work', '私密聊天和文档处理'],
      ['A free backend for coding agents', '给编程 Agent 当免费后端'],
      ['Testing a frontier-size open model at home', '在家体验前沿级开源模型'],
    ],
    faqs: [
      [
        'What is Strata LLM?',
        'Strata LLM 是什么？',
        'It usually refers to Strata, an open-source app on GitHub that runs the 125B Qwen3.8-Flash-Next model on a consumer gaming PC. The name is also used by unrelated research projects, such as a context-caching paper.',
        '通常指 Strata，一个 GitHub 上的开源应用，能在消费级游戏电脑上运行 1250 亿参数的 Qwen3.8-Flash-Next。这个名字也被一些无关的研究项目使用，比如一篇上下文缓存论文。',
      ],
      [
        'What hardware do I need?',
        '需要什么硬件？',
        'An NVIDIA RTX 20–50 series or a recent AMD Radeon card with 12 GB of VRAM or more, at least 32 GB of RAM (64 GB runs every size), and about 80 GB of free SSD space.',
        '需要 12 GB 以上显存的 NVIDIA RTX 20–50 系列或较新的 AMD Radeon 显卡，至少 32 GB 内存（64 GB 可运行所有尺寸），以及约 80 GB 固态硬盘空间。',
      ],
      [
        'Is Strata free?',
        'Strata 免费吗？',
        'Yes. It is MIT-licensed open source and runs entirely on your PC, so there are no per-token fees.',
        '免费。它采用 MIT 开源协议，完全在你的电脑上运行，没有按 token 收费。',
      ],
      [
        'How is Strata different from LM Studio?',
        'Strata 和 LM Studio 有什么不同？',
        'LM Studio runs many open models that fit your machine. Strata is built around one very large model and squeezes it onto a gaming PC by splitting it across GPU, RAM, and SSD.',
        'LM Studio 可运行多种适合你电脑的开源模型；Strata 专注于一个超大模型，通过把它拆分到显卡、内存和固态硬盘上，让游戏电脑也能跑起来。',
      ],
    ],
  }),
  tool({
    slug: 'gojiberry',
    name: 'Gojiberry AI',
    maker: 'Gojiberry',
    website: 'https://gojiberry.ai',
    category: 'workflow',
    tone: 'coral',
    tags: [
      ['sales', 'Sales', '销售'],
      ['lead-generation', 'Lead generation', '获客'],
      ['outreach', 'Outreach', '外联'],
    ],
    tagline: [
      'Finds warm sales leads and runs personalized outreach for you.',
      '自动发现高意向线索并进行个性化外联的销售 AI。',
    ],
    description: [
      'Gojiberry AI detects warm leads from 15+ buying and social signals, filters them by your ideal customer profile, and runs personalized outreach to book qualified demos automatically.',
      'Gojiberry AI 从 15 种以上的购买和社交信号中识别高意向线索，按你的理想客户画像筛选，并自动发起个性化外联来预约有效演示。',
    ],
    note: [
      'Best for: B2B teams that need more qualified demos',
      '适合：需要更多有效演示的 B2B 团队',
    ],
    value: [
      'Outreach goes to people already showing buying intent.',
      '外联对象是已经表现出购买意向的人。',
    ],
    problem: [
      'Cold outreach to static lists has low reply rates.',
      '对固定名单做冷外联，回复率很低。',
    ],
    audience: ['B2B founders and sales teams.', 'B2B 创始人和销售团队。'],
    pricing: PRICING_CHECK,
    market: [
      ['Sales AI', '销售 AI'],
      ['B2B', 'B2B'],
    ],
    tech: [
      ['Intent signal detection', '意向信号识别'],
      ['Automated outreach', '自动外联'],
    ],
    whatIs: [
      'Gojiberry is an AI sales tool. It watches for buying and social signals, scores leads against your ICP, and sends personalized messages so your team spends time on demos rather than prospecting.',
      'Gojiberry 是一款 AI 销售工具。它监测购买和社交信号，按理想客户画像给线索打分，并发送个性化消息，让团队把时间花在演示而不是找客户上。',
    ],
    steps: [
      [
        'Define your ICP',
        '定义理想客户',
        'Describe the companies and roles you sell to.',
        '描述你的目标公司和职位。',
      ],
      [
        'Pick signals',
        '选择信号',
        'Choose which buying and social signals to track.',
        '选择要追踪的购买和社交信号。',
      ],
      [
        'Launch outreach',
        '启动外联',
        'Approve messaging and let it book demos.',
        '确认话术，让它自动预约演示。',
      ],
    ],
    features: [
      ['15+ buying and social signals', '15 种以上购买与社交信号'],
      ['ICP filtering', '按理想客户画像筛选'],
      ['Personalized outreach', '个性化外联'],
      ['Automatic demo booking', '自动预约演示'],
    ],
    bestFor: [
      ['Outbound B2B sales', 'B2B 主动销售'],
      ['Small sales teams', '小型销售团队'],
      ['Founder-led sales', '创始人主导销售'],
    ],
    faqs: [
      [
        'What does Gojiberry do?',
        'Gojiberry 是做什么的？',
        'It finds leads showing buying intent and contacts them with personalized messages.',
        '它寻找有购买意向的线索，并用个性化消息联系他们。',
      ],
      [
        'Who is it for?',
        '适合谁？',
        'B2B teams that want more qualified demos without manual prospecting.',
        '想减少手工找客户、获得更多有效演示的 B2B 团队。',
      ],
    ],
  }),
  // ─── Research & study ────────────────────────────────────────────────────
  tool({
    slug: 'turbo-ai',
    name: 'Turbo AI',
    aliases: ['Study AI', 'AI Study Tool', 'Study AI App', '学习 AI'],
    seoKeyword: 'Study AI',
    maker: 'Turbo AI',
    website: 'https://www.turbo.ai',
    category: 'research',
    tone: 'amber',
    related: ['gauth', 'gemini-notebook'],
    tags: [
      ['study', 'Study AI', '学习 AI'],
      ['notes', 'AI notes', 'AI 笔记'],
      ['flashcards', 'Flashcards', '抽认卡'],
    ],
    tagline: [
      'Turn lectures and material into notes, flashcards, and quizzes.',
      '把课程和资料变成笔记、抽认卡和测验。',
    ],
    description: [
      'Turbo AI is a study tool used by 10 million students. It turns your learning material into lessons, notes, flashcards, and quizzes so you can review faster.',
      'Turbo AI 是一款有 1000 万学生使用的学习工具。它把学习资料变成课程、笔记、抽认卡和测验，帮你更快复习。',
    ],
    note: ['Best for: students preparing for exams', '适合：备考的学生'],
    value: [
      'Study materials generated in minutes from your own content.',
      '几分钟内用你自己的资料生成学习材料。',
    ],
    problem: [
      'Making notes and flashcards by hand takes hours.',
      '手工整理笔记和抽认卡要花好几个小时。',
    ],
    audience: ['High school and university students.', '高中生和大学生。'],
    pricing: [
      'Free to start, with paid plans for more usage.',
      '可免费开始，更多用量需付费。',
    ],
    market: [
      ['Education', '教育'],
      ['Study tools', '学习工具'],
    ],
    tech: [
      ['Note generation', '笔记生成'],
      ['Quiz generation', '测验生成'],
    ],
    whatIs: [
      'Turbo AI is a study AI: an AI note taker and study assistant used by more than 10 million learners. Add a lecture, PDF, or video and it produces structured notes, flashcards, practice quizzes, and podcasts, on web and mobile.',
      'Turbo AI 是一款学习 AI（study AI），也就是 AI 笔记和学习助手，有 1000 多万学习者在用。添加课程录音、PDF 或视频，它就会生成结构化笔记、抽认卡、练习测验和播客，网页和手机都能用。',
    ],
    steps: [
      [
        'Add material',
        '添加资料',
        'Upload a lecture, document, or link.',
        '上传课程、文档或链接。',
      ],
      [
        'Generate study aids',
        '生成学习材料',
        'Create notes, flashcards, or a quiz.',
        '生成笔记、抽认卡或测验。',
      ],
      [
        'Review',
        '复习',
        'Practice with flashcards and quizzes before exams.',
        '考前用抽认卡和测验练习。',
      ],
    ],
    features: [
      ['AI notes', 'AI 笔记'],
      ['Flashcards', '抽认卡'],
      ['Quizzes', '测验'],
      ['Lesson summaries', '课程总结'],
    ],
    bestFor: [
      ['Exam revision', '考试复习'],
      ['Lecture notes', '课堂笔记'],
      ['Self-study', '自学'],
    ],
    faqs: [
      [
        'Is Turbo AI free?',
        'Turbo AI 免费吗？',
        'It is free to start; paid plans add more usage.',
        '可以免费开始，付费套餐提供更多用量。',
      ],
      [
        'How many people use it?',
        '有多少人在用？',
        'The site says 10 million students use Turbo AI.',
        '官网称有 1000 万学生在用。',
      ],
      [
        'Is Turbo AI a good study AI?',
        'Turbo AI 适合当学习 AI 用吗？',
        'Yes, if you study from your own material. It turns lectures, PDFs, and videos into notes, flashcards, and quizzes. For solving individual math problems, a dedicated maths solver such as Gauth is a better fit.',
        '适合，尤其是用自己的资料学习时。它能把课程、PDF 和视频变成笔记、抽认卡和测验。如果是解单道数学题，Gauth 这类专门的数学解题工具更合适。',
      ],
    ],
  }),
  tool({
    slug: 'gauth',
    name: 'Gauth',
    aliases: [
      'Maths Solver',
      'Math Solver',
      'AI Math Solver',
      'Gauthmath',
      'Gauth AI',
      '数学解题',
    ],
    seoKeyword: 'Maths Solver',
    maker: 'ByteDance',
    website: 'https://www.gauth.com',
    category: 'research',
    tone: 'moss',
    related: ['turbo-ai', 'deepseek'],
    tags: [
      ['math-solver', 'Maths solver', '数学解题'],
      ['homework-help', 'Homework help', '作业辅导'],
      ['photo-solve', 'Snap to solve', '拍照解题'],
    ],
    tagline: [
      'AI maths solver that explains problems step by step from a photo.',
      '拍照就能分步讲解题目的 AI 数学解题工具。',
    ],
    description: [
      'Gauth, formerly Gauthmath, is an AI homework helper from ByteDance. Snap or type a maths problem and it returns a step-by-step solution, with support for science and writing questions too, on web, iOS, and Android.',
      'Gauth（原名 Gauthmath）是字节跳动推出的 AI 作业辅导工具。拍照或输入一道数学题，它会给出分步解答，也支持理科和写作类问题，网页、iOS 和安卓都能用。',
    ],
    note: [
      'Best for: checking maths homework step by step',
      '适合：分步核对数学作业',
    ],
    value: [
      'Shows how to reach the answer, not just the answer.',
      '不只给答案，还讲清楚每一步怎么来的。',
    ],
    problem: [
      'Getting stuck on a maths problem with no one to explain it.',
      '做数学题卡住时，身边没人能讲解。',
    ],
    audience: [
      'Middle school, high school, and college students.',
      '初中生、高中生和大学生。',
    ],
    pricing: [
      'Free with a daily question limit. Gauth Plus starts at $11.99/month, with cheaper quarterly and annual plans. Check the official site for current pricing.',
      '免费版每天有题目数量限制。Gauth Plus 每月 11.99 美元起，按季或按年付更便宜。当前价格以官网为准。',
    ],
    market: [
      ['Education', '教育'],
      ['Homework help', '作业辅导'],
    ],
    tech: [
      ['Photo recognition of problems', '拍照识题'],
      ['Web, iOS, and Android', '网页、iOS 和安卓'],
    ],
    whatIs: [
      'Gauth is an AI maths solver and homework helper. Take a photo of a problem or type it in, and it identifies the question and walks through the solution step by step, covering algebra, geometry, calculus, statistics, and word problems.',
      'Gauth 是一款 AI 数学解题和作业辅导工具。拍下题目或手动输入，它会识别题目并一步步讲解解法，覆盖代数、几何、微积分、统计和应用题。',
    ],
    steps: [
      [
        'Add the problem',
        '添加题目',
        'Snap a photo of the question or type it in.',
        '拍下题目或手动输入。',
      ],
      [
        'Get the solution',
        '获取解答',
        'Gauth shows the answer with each step explained.',
        'Gauth 给出答案，并讲解每一步。',
      ],
      [
        'Ask follow-ups',
        '继续追问',
        'Ask the AI tutor about any step you do not understand.',
        '对看不懂的步骤，可以继续问 AI 辅导老师。',
      ],
    ],
    features: [
      ['Snap-to-solve maths problems', '拍照解数学题'],
      ['Step-by-step explanations', '分步讲解'],
      ['AI tutor for follow-up questions', 'AI 辅导老师可追问'],
      ['Science and writing help', '理科和写作辅导'],
    ],
    bestFor: [
      ['Checking maths homework', '核对数学作业'],
      ['Learning how to solve a problem type', '学会某类题的解法'],
      ['Exam practice', '考试练习'],
    ],
    faqs: [
      [
        'Is Gauth a free maths solver?',
        'Gauth 是免费的数学解题工具吗？',
        'It has a free plan with a daily limit on questions. Gauth Plus removes most limits and adds more AI tutor help.',
        '有免费版，但每天的题目数量有限。Gauth Plus 基本不限次数，AI 辅导也更多。',
      ],
      [
        'What maths can Gauth solve?',
        'Gauth 能解哪些数学题？',
        'Algebra, geometry, trigonometry, calculus, statistics, and word problems, from printed or handwritten questions.',
        '代数、几何、三角、微积分、统计和应用题，印刷体和手写题目都能识别。',
      ],
      [
        'Who makes Gauth?',
        'Gauth 是谁做的？',
        'Gauth is made by ByteDance, the company behind TikTok. It was previously called Gauthmath.',
        'Gauth 由 TikTok 的母公司字节跳动推出，以前叫 Gauthmath。',
      ],
    ],
  }),
  // ─── AI video ────────────────────────────────────────────────────────────
  tool({
    slug: 'google-flow',
    name: 'Google Flow',
    maker: 'Google',
    website: 'https://flow.google.com',
    category: 'text-to-video',
    tone: 'cobalt',
    related: ['kling-ai', 'luma-ai'],
    tags: [
      ['veo', 'Veo', 'Veo'],
      ['ai-video', 'AI video', 'AI 视频'],
      ['filmmaking', 'Filmmaking', '影视创作'],
    ],
    tagline: [
      'Google’s AI studio for cinematic video and images with Veo.',
      'Google 的 AI 创作工作室，用 Veo 生成电影感视频和图像。',
    ],
    description: [
      'Google Flow is Google’s AI creative studio for video, images, and custom tools. It uses Google’s generative models, including Veo for video, to turn ideas into cinematic clips and scenes.',
      'Google Flow 是 Google 的 AI 创作工作室，可以生成视频、图像和自定义工具。它使用 Google 的生成模型（视频方面是 Veo），把创意变成电影感的片段和场景。',
    ],
    note: [
      'Best for: the easiest way to use Google Veo',
      '适合：最方便地使用 Google Veo',
    ],
    value: [
      'Veo video generation inside a studio built for storytelling.',
      '在为叙事打造的工作室里使用 Veo 生成视频。',
    ],
    problem: [
      'Raw model access lacks tools to build consistent scenes.',
      '只用模型本身，缺少搭建连贯场景的工具。',
    ],
    audience: [
      'Filmmakers, creators, and marketers.',
      '电影人、创作者和营销人员。',
    ],
    pricing: [
      'Available through Google AI plans; usage limits vary by plan.',
      '通过 Google AI 套餐使用，额度因套餐而异。',
    ],
    market: [
      ['AI video', 'AI 视频'],
      ['Filmmaking', '影视创作'],
    ],
    tech: [
      ['Veo video models', 'Veo 视频模型'],
      ['Google image models', 'Google 图像模型'],
    ],
    whatIs: [
      'Google Flow is where Google’s Veo video model meets a creative workspace. You generate clips from text or images, build scenes, and keep characters and style consistent across shots.',
      'Google Flow 把 Veo 视频模型和创作工作区结合在一起。你可以用文字或图片生成片段、搭建场景，并在多个镜头间保持角色和风格一致。',
    ],
    steps: [
      [
        'Open Flow',
        '打开 Flow',
        'Sign in at flow.google.com with a Google account.',
        '用 Google 账号登录 flow.google.com。',
      ],
      [
        'Generate clips',
        '生成片段',
        'Describe a shot or start from an image.',
        '描述镜头，或从一张图片开始。',
      ],
      [
        'Build the scene',
        '搭建场景',
        'Arrange clips into a scene and extend shots.',
        '把片段排成场景，并延长镜头。',
      ],
    ],
    features: [
      ['Veo video generation', 'Veo 视频生成'],
      ['Image generation', '图像生成'],
      ['Scene building', '场景搭建'],
      ['Custom tools', '自定义工具'],
    ],
    bestFor: [
      ['Short films and trailers', '短片和预告片'],
      ['Ad concepts', '广告创意'],
      ['Storyboarding', '分镜'],
    ],
    faqs: [
      [
        'Is Google Flow the same as Veo?',
        'Google Flow 就是 Veo 吗？',
        'Veo is the video model; Flow is the studio app that uses it.',
        'Veo 是视频模型，Flow 是使用 Veo 的创作应用。',
      ],
      [
        'Do I need a paid plan?',
        '需要付费吗？',
        'Access and limits depend on your Google AI plan.',
        '使用权限和额度取决于你的 Google AI 套餐。',
      ],
    ],
  }),
  tool({
    slug: 'a2e',
    name: 'A2E',
    maker: 'A2E',
    website: 'https://a2e.ai',
    category: 'text-to-video',
    tone: 'plum',
    related: ['vozo-ai'],
    tags: [
      ['ai-avatar', 'AI avatar', 'AI 数字人'],
      ['face-swap', 'Face swap', '换脸'],
      ['lip-sync', 'Lip sync', '口型同步'],
    ],
    tagline: [
      'Free AI videos with avatars, lip sync, and voice cloning.',
      '免费制作 AI 数字人、口型同步和声音克隆视频。',
    ],
    description: [
      'A2E creates personal AI videos. It offers image-to-video, face and head swap, lip sync, voice cloning, and AI avatars, with a free way to get started.',
      'A2E 用来制作个人 AI 视频，提供图生视频、换脸换头、口型同步、声音克隆和 AI 数字人，可以免费开始使用。',
    ],
    note: [
      'Best for: quick avatar and talking-head videos',
      '适合：快速制作数字人和口播视频',
    ],
    value: [
      'Many avatar video tools in one free-to-start app.',
      '一个可免费开始的应用里集合多种数字人视频工具。',
    ],
    problem: [
      'Talking-head videos normally need filming and voiceover.',
      '口播视频通常需要拍摄和配音。',
    ],
    audience: [
      'Creators and marketers making short videos.',
      '制作短视频的创作者和营销人员。',
    ],
    pricing: [
      'Free to start; paid credits for more generations.',
      '可免费开始，更多生成需购买积分。',
    ],
    market: [
      ['AI avatars', 'AI 数字人'],
      ['AI video', 'AI 视频'],
    ],
    tech: [
      ['Lip-sync model', '口型同步模型'],
      ['Voice cloning', '声音克隆'],
    ],
    whatIs: [
      'A2E AI is a video tool for avatars and personal videos. Upload a photo or clip, add a script or voice, and it can animate the face, sync lips, or swap faces.',
      'A2E AI 是一款数字人和个人视频工具。上传照片或视频，加入脚本或声音，它就能让人脸动起来、同步口型或换脸。',
    ],
    steps: [
      [
        'Upload media',
        '上传素材',
        'Add a photo or video of the subject.',
        '添加人物照片或视频。',
      ],
      [
        'Add voice or script',
        '加入声音或脚本',
        'Type a script or clone a voice.',
        '输入脚本或克隆声音。',
      ],
      [
        'Generate',
        '生成',
        'Render the lip-synced or swapped video.',
        '生成口型同步或换脸视频。',
      ],
    ],
    features: [
      ['Image to video', '图生视频'],
      ['Face and head swap', '换脸与换头'],
      ['Lip sync', '口型同步'],
      ['Voice cloning', '声音克隆'],
    ],
    bestFor: [
      ['Talking-head content', '口播内容'],
      ['Product explainers', '产品讲解'],
      ['Fun personal videos', '趣味个人视频'],
    ],
    faqs: [
      [
        'Is A2E free?',
        'A2E 免费吗？',
        'You can start for free; heavier use needs paid credits.',
        '可以免费开始，大量使用需要付费积分。',
      ],
      [
        'Can I use someone else’s face?',
        '可以用别人的脸吗？',
        'Only with their permission; follow A2E’s terms and local laws.',
        '必须获得本人许可，并遵守 A2E 条款和当地法律。',
      ],
    ],
  }),
  tool({
    slug: 'mitte',
    name: 'Mitte',
    maker: 'Mitte',
    website: 'https://mitte.ai',
    category: 'text-to-video',
    tone: 'amber',
    related: ['higgsfield', 'openart'],
    tags: [
      ['multi-model', 'Multi-model', '多模型'],
      ['ai-video', 'AI video', 'AI 视频'],
      ['ai-audio', 'AI audio', 'AI 音频'],
    ],
    tagline: [
      'One creative suite for AI images, video, and audio.',
      '一站式 AI 图像、视频和音频创作套件。',
    ],
    description: [
      'Mitte is an AI creative suite for generating and editing images, video, and audio with the latest models, including Veo and Flux, all in one place.',
      'Mitte 是一个 AI 创作套件，可以用 Veo、Flux 等最新模型生成和编辑图像、视频和音频，全部在一个地方完成。',
    ],
    note: [
      'Best for: trying many models from one account',
      '适合：一个账号试用多种模型',
    ],
    value: [
      'Latest image, video, and audio models in one subscription.',
      '一个订阅即可使用最新的图像、视频和音频模型。',
    ],
    problem: [
      'Separate subscriptions for every model add up fast.',
      '每个模型单独订阅，费用很快累积。',
    ],
    audience: ['Creators and small creative teams.', '创作者和小型创意团队。'],
    pricing: [
      'Free to try; paid plans for more generations.',
      '可免费试用，更多生成需付费。',
    ],
    market: [
      ['AI creative suites', 'AI 创作套件'],
      ['AI video', 'AI 视频'],
    ],
    tech: [
      ['Third-party models (Veo, Flux)', '第三方模型（Veo、Flux）'],
      ['Editing tools', '编辑工具'],
    ],
    whatIs: [
      'Mitte AI brings popular generative models into one editor, so you can create an image, animate it into video, and add audio without switching tools.',
      'Mitte AI 把热门生成模型集中到一个编辑器里，你可以生成图片、把它做成视频再配上音频，而不用切换工具。',
    ],
    steps: [
      [
        'Pick a model',
        '选择模型',
        'Choose an image, video, or audio model.',
        '选择图像、视频或音频模型。',
      ],
      [
        'Generate',
        '生成',
        'Enter a prompt or upload a reference.',
        '输入提示词或上传参考素材。',
      ],
      [
        'Edit and combine',
        '编辑组合',
        'Edit results and combine media in the suite.',
        '在套件中编辑结果并组合素材。',
      ],
    ],
    features: [
      ['Image, video, and audio generation', '图像、视频和音频生成'],
      ['Models such as Veo and Flux', 'Veo、Flux 等模型'],
      ['Built-in editing', '内置编辑'],
      ['Free trial', '免费试用'],
    ],
    bestFor: [
      ['Social content', '社媒内容'],
      ['Comparing models', '对比模型'],
      ['Quick mixed-media projects', '快速制作多媒体项目'],
    ],
    faqs: [
      [
        'Which models does Mitte include?',
        'Mitte 包含哪些模型？',
        'The site lists the latest models such as Veo and Flux; the lineup changes over time.',
        '官网列出了 Veo、Flux 等最新模型，模型阵容会持续变化。',
      ],
      [
        'Is Mitte free?',
        'Mitte 免费吗？',
        'You can try it free; paid plans add more usage.',
        '可以免费试用，付费套餐提供更多用量。',
      ],
    ],
  }),
  // ─── Image & design ──────────────────────────────────────────────────────
  tool({
    slug: 'openart',
    name: 'OpenArt',
    aliases: ['Image to Image', 'Image to Image AI', 'img2img', '图生图'],
    seoKeyword: 'Image to Image',
    maker: 'OpenArt',
    website: 'https://openart.ai',
    category: 'models',
    tone: 'coral',
    related: ['leonardo-ai', 'raphael-ai'],
    tags: [
      ['ai-art', 'AI art', 'AI 艺术'],
      ['image-to-image', 'Image to image', '图生图'],
      ['multi-model', '100+ models', '100+ 模型'],
      ['ai-video', 'AI video', 'AI 视频'],
    ],
    tagline: [
      'Create AI images, video, and music with 100+ models.',
      '用 100 多个模型创作 AI 图像、视频和音乐。',
    ],
    description: [
      'OpenArt is an AI art platform for images, videos, and music. It offers 100+ models from Google, OpenAI, Seedance, and others in one place, and says it is trusted by 8M+ creators.',
      'OpenArt 是一个 AI 艺术平台，可以生成图像、视频和音乐。它在一个地方提供来自 Google、OpenAI、Seedance 等的 100 多个模型，官网称有 800 多万创作者在用。',
    ],
    note: [
      'Best for: AI art with lots of model choice',
      '适合：需要丰富模型选择的 AI 创作',
    ],
    value: [
      'A huge model library with a free way to start.',
      '庞大的模型库，可免费开始。',
    ],
    problem: [
      'Each new model usually lives on a different site.',
      '新模型往往分散在不同的网站。',
    ],
    audience: [
      'Artists, hobbyists, and content creators.',
      '艺术家、爱好者和内容创作者。',
    ],
    pricing: [
      'Free to start; paid plans add credits.',
      '可免费开始，付费套餐提供更多积分。',
    ],
    market: [
      ['AI art', 'AI 艺术'],
      ['Creator tools', '创作者工具'],
    ],
    tech: [
      ['100+ hosted models', '100+ 托管模型'],
      ['Image, video, audio', '图像、视频、音频'],
    ],
    whatIs: [
      'OpenArt AI is an online AI art generator with image to image built in: upload a photo or sketch, describe the change, and pick from more than 100 models to restyle it. It also creates images from text, turns them into videos, and generates music, all in the browser.',
      'OpenArt AI 是一款在线 AI 艺术生成器，内置图生图（image to image）：上传照片或草图、描述想要的改动，再从 100 多个模型中选一个来重绘。它也能文生图、把图像做成视频或生成音乐，全部在浏览器中完成。',
    ],
    steps: [
      [
        'Choose a model',
        '选择模型',
        'Pick an image, video, or audio model.',
        '选择图像、视频或音频模型。',
      ],
      [
        'Prompt',
        '输入提示词',
        'Describe what you want or upload a reference.',
        '描述想要的内容或上传参考图。',
      ],
      [
        'Refine',
        '调整',
        'Edit, upscale, or animate the result.',
        '编辑、放大或把结果做成动画。',
      ],
    ],
    features: [
      ['100+ AI models', '100 多个 AI 模型'],
      ['Image to image from a reference photo', '上传参考图做图生图'],
      ['Image, video, and music', '图像、视频和音乐'],
      ['Editing and upscaling', '编辑与放大'],
      ['Free to start', '可免费开始'],
    ],
    bestFor: [
      ['AI art and illustration', 'AI 艺术与插画'],
      ['Social posts', '社媒内容'],
      ['Experimenting with new models', '尝试新模型'],
    ],
    faqs: [
      [
        'Is OpenArt free?',
        'OpenArt 免费吗？',
        'You can start for free; paid plans add more credits.',
        '可以免费开始，付费套餐提供更多积分。',
      ],
      [
        'Which models are available?',
        '有哪些模型？',
        'More than 100, including models from Google, OpenAI, and Seedance.',
        '100 多个，包括 Google、OpenAI、Seedance 等的模型。',
      ],
      [
        'How do I do image to image on OpenArt?',
        '怎么用 OpenArt 做图生图？',
        'Open an image tool, upload your photo as the reference, describe the style or change you want, and generate. You can then edit or upscale the result.',
        '打开图像工具，上传照片作为参考图，描述想要的风格或改动后生成。生成后还可以继续编辑或放大。',
      ],
    ],
  }),
  tool({
    slug: 'raphael-ai',
    name: 'Raphael AI',
    maker: 'Raphael',
    website: 'https://raphael.app',
    category: 'models',
    tone: 'plum',
    related: ['openart', 'zsky-ai'],
    tags: [
      ['free', 'Free', '免费'],
      ['ai-image', 'AI image', 'AI 图像'],
      ['no-signup', 'Unlimited', '不限次数'],
    ],
    tagline: [
      'A free, unlimited AI image generator with top models.',
      '免费不限次数、内置顶级模型的 AI 生图工具。',
    ],
    description: [
      'Raphael AI is a free, unlimited AI image generator. It features top models including Nano Banana 2 / Pro, Qwen-Image, and Seedream 5.0 for high-fidelity images.',
      'Raphael AI 是一款免费、不限次数的 AI 图像生成器，内置 Nano Banana 2 / Pro、Qwen-Image、Seedream 5.0 等顶级模型，可生成高清图像。',
    ],
    note: [
      'Best for: free image generation without limits',
      '适合：免费不限量地生成图片',
    ],
    value: [
      'Strong image models with no paywall for basic use.',
      '基础使用无付费墙，也能用到强大的图像模型。',
    ],
    problem: [
      'Most image generators cap free use quickly.',
      '大多数生图工具的免费额度很快用完。',
    ],
    audience: [
      'Casual users, students, and bloggers.',
      '普通用户、学生和博主。',
    ],
    pricing: [
      'Free and unlimited for standard use; check the site for premium options.',
      '标准使用免费不限次，高级选项见官网。',
    ],
    market: [
      ['AI image', 'AI 图像'],
      ['Free tools', '免费工具'],
    ],
    tech: [
      [
        'Nano Banana, Qwen-Image, Seedream',
        'Nano Banana、Qwen-Image、Seedream',
      ],
      ['Web app', '网页应用'],
    ],
    whatIs: [
      'Raphael is a free AI image generator that runs in the browser. Type a prompt, pick a model such as Seedream or Qwen-Image, and generate as many images as you need.',
      'Raphael 是一款在浏览器中运行的免费 AI 生图工具。输入提示词，选择 Seedream 或 Qwen-Image 等模型，就能生成你需要的图片。',
    ],
    steps: [
      [
        'Enter a prompt',
        '输入提示词',
        'Describe the image you want.',
        '描述你想要的图片。',
      ],
      [
        'Pick a model and size',
        '选择模型和尺寸',
        'Choose a model and aspect ratio.',
        '选择模型和画面比例。',
      ],
      [
        'Generate and download',
        '生成并下载',
        'Create images and download your favorites.',
        '生成图片并下载满意的结果。',
      ],
    ],
    features: [
      ['Free and unlimited generation', '免费不限次生成'],
      ['Nano Banana 2 / Pro', 'Nano Banana 2 / Pro'],
      ['Qwen-Image and Seedream 5.0', 'Qwen-Image 与 Seedream 5.0'],
      ['High-fidelity output', '高清输出'],
    ],
    bestFor: [
      ['Blog and social images', '博客和社媒配图'],
      ['Quick concept images', '快速概念图'],
      ['Learning prompting', '练习写提示词'],
    ],
    faqs: [
      [
        'Is Raphael AI really free?',
        'Raphael AI 真的免费吗？',
        'The site describes it as free and unlimited for image generation.',
        '官网称图像生成免费且不限次数。',
      ],
      [
        'Which models does it use?',
        '用的是哪些模型？',
        'Models listed include Nano Banana 2 / Pro, Qwen-Image, and Seedream 5.0.',
        '官网列出的有 Nano Banana 2 / Pro、Qwen-Image 和 Seedream 5.0。',
      ],
    ],
  }),
  tool({
    slug: 'zsky-ai',
    name: 'ZSky AI',
    maker: 'ZSky AI',
    website: 'https://zsky.ai',
    category: 'models',
    tone: 'cobalt',
    related: ['raphael-ai', 'openart'],
    tags: [
      ['ai-image', 'AI image', 'AI 图像'],
      ['image-editor', 'Image editor', '图像编辑'],
      ['ai-video', '1080p video', '1080p 视频'],
    ],
    tagline: [
      'Free AI image generation and editing, plus 1080p video.',
      '免费 AI 生图与修图，还能生成 1080p 视频。',
    ],
    description: [
      'ZSky AI generates, edits, and transforms images with AI, and also creates 1080p video with audio. It covers text-to-image, image editing, text-to-video, and image-to-video for free.',
      'ZSky AI 可以用 AI 生成、编辑和转换图片，还能生成带音频的 1080p 视频。文生图、图像编辑、文生视频和图生视频都可免费使用。',
    ],
    note: [
      'Best for: free image edits and short videos',
      '适合：免费修图和制作短视频',
    ],
    value: [
      'Image and video generation in one free tool.',
      '一个免费工具同时搞定图像和视频生成。',
    ],
    problem: [
      'Switching between image and video tools slows you down.',
      '在生图和视频工具之间切换很耗时间。',
    ],
    audience: [
      'Casual creators and social media users.',
      '轻度创作者和社交媒体用户。',
    ],
    pricing: [
      'Free features available; see the site for paid options.',
      '提供免费功能，付费选项见官网。',
    ],
    market: [
      ['AI image', 'AI 图像'],
      ['AI video', 'AI 视频'],
    ],
    tech: [
      ['Text-to-image', '文生图'],
      ['Video with audio', '带音频的视频'],
    ],
    whatIs: [
      'ZSky AI is a free AI image generator and editor that also makes video. You can create images from text, edit photos with prompts, and turn text or images into 1080p clips with sound.',
      'ZSky AI 是一款免费的 AI 生图和修图工具，也能做视频。可以用文字生成图片、用提示词修图，并把文字或图片变成带声音的 1080p 片段。',
    ],
    steps: [
      [
        'Choose a mode',
        '选择模式',
        'Pick text-to-image, edit, or video.',
        '选择文生图、修图或视频。',
      ],
      [
        'Describe or upload',
        '描述或上传',
        'Enter a prompt or upload an image.',
        '输入提示词或上传图片。',
      ],
      ['Download', '下载', 'Generate and save the result.', '生成并保存结果。'],
    ],
    features: [
      ['Text-to-image', '文生图'],
      ['AI image editing', 'AI 图像编辑'],
      ['1080p video with audio', '带音频的 1080p 视频'],
      ['Image-to-video', '图生视频'],
    ],
    bestFor: [
      ['Quick photo edits', '快速修图'],
      ['Short social videos', '社媒短视频'],
      ['Free experiments', '免费尝试'],
    ],
    faqs: [
      [
        'Is ZSky AI free?',
        'ZSky AI 免费吗？',
        'Core image and video features are offered for free.',
        '核心的图像和视频功能可免费使用。',
      ],
      [
        'What video quality does it support?',
        '支持什么视频画质？',
        'It advertises 1080p video with audio.',
        '官网标注支持带音频的 1080p 视频。',
      ],
    ],
  }),
  tool({
    slug: 'imgupscaler',
    name: 'ImgUpscaler',
    maker: 'ImgUpscaler',
    website: 'https://imgupscaler.com',
    category: 'models',
    tone: 'moss',
    related: ['vectorizer-ai'],
    tags: [
      ['upscaler', 'Image upscaler', '图片放大'],
      ['enhancer', 'Image enhancer', '画质增强'],
      ['online', 'Online', '在线工具'],
    ],
    tagline: [
      'Upscale photos 2x or 4x online with AI.',
      '在线用 AI 把图片放大 2 倍或 4 倍。',
    ],
    description: [
      'ImgUpscaler is an online AI image upscaler and enhancer. It enlarges photos by 2x or 4x and improves clarity, producing sharper images for web, print, and creative work.',
      'ImgUpscaler 是一款在线 AI 图片放大和画质增强工具，可以把照片放大 2 倍或 4 倍并提升清晰度，适合网页、印刷和创作使用。',
    ],
    note: [
      'Best for: making small or blurry images sharper',
      '适合：让小图或模糊图片变清晰',
    ],
    value: [
      'Sharper, larger images in a few clicks, no software needed.',
      '点几下就能得到更大更清晰的图片，无需安装软件。',
    ],
    problem: [
      'Low-resolution images look blurry when enlarged.',
      '低分辨率图片放大后会模糊。',
    ],
    audience: [
      'Designers, sellers, and anyone fixing old photos.',
      '设计师、电商卖家和修复老照片的人。',
    ],
    pricing: [
      'Free to start; paid plans for more or larger images.',
      '可免费开始，更多或更大的图片需付费。',
    ],
    market: [
      ['Image enhancement', '画质增强'],
      ['Design utilities', '设计工具'],
    ],
    tech: [
      ['AI super-resolution', 'AI 超分辨率'],
      ['Web app', '网页应用'],
    ],
    whatIs: [
      'ImgUpscaler is an AI image enhancer that increases resolution without the blur of normal resizing. Upload a photo, choose 2x or 4x, and download a sharper version.',
      'ImgUpscaler 是一款 AI 画质增强工具，提升分辨率时不会像普通放大那样变糊。上传照片，选择 2 倍或 4 倍，就能下载更清晰的版本。',
    ],
    steps: [
      [
        'Upload a photo',
        '上传图片',
        'Drop in the image you want to enlarge.',
        '上传要放大的图片。',
      ],
      [
        'Choose 2x or 4x',
        '选择 2 倍或 4 倍',
        'Pick the upscale factor.',
        '选择放大倍数。',
      ],
      ['Download', '下载', 'Save the enhanced image.', '保存增强后的图片。'],
    ],
    features: [
      ['2x and 4x upscaling', '2 倍和 4 倍放大'],
      ['Clarity enhancement', '清晰度增强'],
      ['Browser-based', '浏览器中使用'],
      ['Free to start', '可免费开始'],
    ],
    bestFor: [
      ['Product photos', '商品图'],
      ['Print preparation', '印刷准备'],
      ['Old or small photos', '老照片或小图'],
    ],
    faqs: [
      [
        'Is ImgUpscaler free?',
        'ImgUpscaler 免费吗？',
        'You can start for free; paid plans raise limits.',
        '可以免费开始，付费套餐提高额度。',
      ],
      [
        'How much can it enlarge?',
        '最多能放大多少？',
        'It offers 2x and 4x upscaling.',
        '提供 2 倍和 4 倍放大。',
      ],
    ],
  }),
  tool({
    slug: 'vikas-edit',
    name: 'Vikas Edit',
    aliases: ['Vikas Editor', 'Vikas Editing', 'Vikas Edit AI'],
    seoKeyword: 'Vikas Editor',
    maker: 'Vikas Edit',
    website: 'https://vikasedit.co.in',
    category: 'models',
    tone: 'coral',
    related: ['raphael-ai', 'openart', 'imgupscaler'],
    tags: [
      ['ai-prompts', 'AI photo prompts', 'AI 修图提示词'],
      ['mobile-editing', 'Mobile editing', '手机修图'],
      ['free', 'Free, no signup', '免费免注册'],
    ],
    tagline: [
      'Free copy-paste AI photo editing prompts for Gemini and ChatGPT.',
      '免费的 AI 修图提示词库，复制到 Gemini 或 ChatGPT 即可使用。',
    ],
    description: [
      'Vikas Edit is a free prompt library for the "Vikas editor" mobile editing style. Copy a prompt, attach your photo in Google Gemini or ChatGPT, and get a styled edit. It also offers video-to-prompt and image-to-prompt tools.',
      'Vikas Edit 是围绕 “Vikas editor” 手机修图风格的免费提示词库。复制提示词，在 Google Gemini 或 ChatGPT 里附上照片，就能得到对应风格的修图结果，另有视频转提示词、图片转提示词工具。',
    ],
    note: [
      'Best for: trendy Reels-style photo edits on a phone',
      '适合：在手机上做流行的 Reels 风格修图',
    ],
    value: [
      'Ready-made prompts that turn a phone photo into a trending edit, with no editing skills needed.',
      '现成的提示词，不会修图也能把手机照片变成流行风格。',
    ],
    problem: [
      'Writing a good AI editing prompt that keeps the face intact takes many tries.',
      '要写出既能出效果又不改脸的 AI 修图提示词，往往要试很多次。',
    ],
    audience: [
      'Mobile creators, Instagram and Reels users, and people new to AI photo editing.',
      '手机创作者、Instagram 和 Reels 用户，以及刚接触 AI 修图的人。',
    ],
    pricing: [
      'Free; no signup, app download, or credits required.',
      '免费，无需注册、下载 App 或消耗积分。',
    ],
    market: [
      ['AI photo editing', 'AI 修图'],
      ['Prompt libraries', '提示词库'],
    ],
    tech: [
      ['Prompts for Gemini and ChatGPT', '适配 Gemini 和 ChatGPT 的提示词'],
      ['Web app', '网页应用'],
    ],
    whatIs: [
      'Vikas Edit (often searched as "Vikas editor") is a free hub of AI photo editing prompts made for phones. Collections cover retro portraits, couple shots, gaming avatars, festival cards, and video prompts in English and Hindi. Each prompt is copied into Gemini or ChatGPT together with your own photo.',
      'Vikas Edit（常被搜索为 “Vikas editor”）是一个面向手机用户的免费 AI 修图提示词库，涵盖复古人像、情侣照、游戏头像、节日贺卡和视频提示词，提供英语和印地语版本。使用时把提示词和自己的照片一起发给 Gemini 或 ChatGPT 即可。',
    ],
    steps: [
      [
        'Pick a prompt',
        '挑选提示词',
        'Browse the collections and copy a prompt you like.',
        '浏览合集，复制喜欢的提示词。',
      ],
      [
        'Attach your photo',
        '附上照片',
        'Open Gemini or ChatGPT, upload your photo, and paste the prompt.',
        '打开 Gemini 或 ChatGPT，上传照片并粘贴提示词。',
      ],
      [
        'Save and share',
        '保存分享',
        'Download the edited image and post it to Reels or Stories.',
        '下载修好的图片，发到 Reels 或快拍。',
      ],
    ],
    features: [
      ['Copy-paste photo prompts', '一键复制的修图提示词'],
      ['English and Hindi prompts', '英语和印地语提示词'],
      ['Video-to-prompt generator', '视频转提示词'],
      ['Image-to-prompt analyzer', '图片转提示词'],
    ],
    bestFor: [
      ['Trending Reels photo edits', '流行的 Reels 修图'],
      ['Festival and couple photos', '节日照和情侣照'],
      ['Beginners using Gemini or ChatGPT', '用 Gemini 或 ChatGPT 的新手'],
    ],
    faqs: [
      [
        'Is Vikas Edit free?',
        'Vikas Edit 免费吗？',
        'Yes. Prompts can be copied without signing up or paying.',
        '免费，无需注册或付费即可复制提示词。',
      ],
      [
        'Is Vikas Edit an editing app?',
        'Vikas Edit 是修图 App 吗？',
        'No. It provides prompts; the actual edit is done in Gemini or ChatGPT.',
        '不是。它提供提示词，真正的修图在 Gemini 或 ChatGPT 里完成。',
      ],
      [
        'Is it the same as "Editing by Vikas"?',
        '它和 “Editing by Vikas” 是同一个吗？',
        'No. Several independent sites use the Vikas name; this listing covers vikasedit.co.in.',
        '不是。有多个独立网站使用 Vikas 这个名字，本页收录的是 vikasedit.co.in。',
      ],
    ],
  }),
  tool({
    slug: 'dreamwave',
    name: 'Dreamwave',
    maker: 'Dreamwave',
    website: 'https://www.dreamwave.ai',
    category: 'models',
    tone: 'amber',
    tags: [
      ['headshots', 'AI headshots', 'AI 证件照'],
      ['professional', 'Professional photos', '职业照'],
      ['teams', 'Teams', '团队'],
    ],
    tagline: [
      'Professional AI headshots in minutes, without the AI look.',
      '几分钟生成自然不假的 AI 职业头像照。',
    ],
    description: [
      'Dreamwave is an AI headshot generator built by AI experts from MIT and Google. Upload selfies and get professional headshots for yourself or your team; the company says 25M+ headshots have been made.',
      'Dreamwave 是由来自 MIT 和 Google 的 AI 专家打造的 AI 头像照生成工具。上传自拍，就能为自己或团队生成职业头像照，官方称已生成超过 2500 万张。',
    ],
    note: [
      'Best for: LinkedIn and team photos without a shoot',
      '适合：不用拍摄就能拿到领英和团队照',
    ],
    value: [
      'Studio-style headshots without booking a photographer.',
      '不用约摄影师也能拿到影棚级头像照。',
    ],
    problem: [
      'Professional photo shoots are costly and hard to schedule for teams.',
      '专业拍摄成本高，团队还难以统一时间。',
    ],
    audience: [
      'Job seekers, professionals, and company teams.',
      '求职者、职场人士和企业团队。',
    ],
    pricing: [
      'Paid packages; check the site for current prices.',
      '按套餐付费，当前价格以官网为准。',
    ],
    market: [
      ['AI photography', 'AI 摄影'],
      ['HR and teams', '人力与团队'],
    ],
    tech: [
      ['Personalized image model', '个性化图像模型'],
      ['Team ordering', '团队批量订购'],
    ],
    whatIs: [
      'Dreamwave AI headshots turn a set of casual selfies into professional portraits. It trains on your photos and generates headshots in different outfits and backgrounds that avoid the typical AI look.',
      'Dreamwave AI 头像照能把一组随手自拍变成职业肖像。它基于你的照片训练，生成不同服装和背景的头像照，并避免常见的“AI 感”。',
    ],
    steps: [
      [
        'Upload selfies',
        '上传自拍',
        'Add a set of clear photos of yourself.',
        '上传一组清晰的个人照片。',
      ],
      [
        'Pick styles',
        '选择风格',
        'Choose outfits and backgrounds.',
        '选择服装和背景。',
      ],
      [
        'Download headshots',
        '下载头像照',
        'Receive your headshots and pick favorites.',
        '收到头像照后挑选满意的。',
      ],
    ],
    features: [
      ['Professional headshots', '职业头像照'],
      ['Natural, non-AI look', '自然不假'],
      ['Team ordering', '团队批量订购'],
      ['Multiple styles', '多种风格'],
    ],
    bestFor: [
      ['LinkedIn profiles', '领英头像'],
      ['Company team pages', '公司团队页'],
      ['Resumes', '简历照片'],
    ],
    faqs: [
      [
        'How many headshots has Dreamwave made?',
        'Dreamwave 生成过多少张头像照？',
        'The site says over 25 million.',
        '官网称已超过 2500 万张。',
      ],
      [
        'Can I order for my whole team?',
        '可以给整个团队订购吗？',
        'Yes, it offers headshots for teams.',
        '可以，它提供团队头像照服务。',
      ],
    ],
  }),
  tool({
    slug: 'tripo',
    name: 'Tripo AI',
    maker: 'Tripo AI',
    website: 'https://www.tripo3d.ai',
    category: 'models',
    tone: 'cobalt',
    tags: [
      ['3d', '3D models', '3D 模型'],
      ['image-to-3d', 'Image to 3D', '图生 3D'],
      ['game-assets', 'Game assets', '游戏素材'],
    ],
    tagline: [
      'Turn text or a single image into a textured 3D model.',
      '用文字或一张图片生成带贴图的 3D 模型。',
    ],
    description: [
      'Tripo AI is a 3D generation platform that turns a text prompt, a photo, multi-view images, or a sketch into a usable 3D model with textures. A basic mesh takes seconds; high-detail refinement takes a few minutes.',
      'Tripo AI 是一个 3D 生成平台，可以把文字、照片、多视角图片或草图变成可用的带贴图 3D 模型。基础网格只需几秒，高精度细化需要几分钟。',
    ],
    note: [
      'Best for: fast 3D assets for games and prototypes',
      '适合：为游戏和原型快速产出 3D 素材',
    ],
    value: [
      '3D models in seconds instead of hours of modeling.',
      '几秒钟得到 3D 模型，而不是建模几个小时。',
    ],
    problem: [
      'Manual 3D modeling is slow and needs specialist skills.',
      '手工 3D 建模又慢又需要专业技能。',
    ],
    audience: [
      'Game developers, 3D artists, and product designers.',
      '游戏开发者、3D 美术和产品设计师。',
    ],
    pricing: PRICING_CHECK,
    market: [
      ['3D generation', '3D 生成'],
      ['Game development', '游戏开发'],
    ],
    tech: [
      ['Native 3D diffusion', '原生 3D 扩散模型'],
      ['Textured mesh export', '带贴图网格导出'],
    ],
    whatIs: [
      'Tripo AI is an AI 3D model generator. Describe an object or upload an image and it reconstructs the full shape, including unseen sides, then exports a textured mesh for games, 3D printing, or rendering.',
      'Tripo AI 是一款 AI 3D 模型生成器。描述一个物体或上传图片，它会重建完整形状（包括看不见的背面），并导出带贴图的网格，用于游戏、3D 打印或渲染。',
    ],
    steps: [
      [
        'Add input',
        '添加输入',
        'Type a prompt or upload an image.',
        '输入提示词或上传图片。',
      ],
      [
        'Generate the mesh',
        '生成网格',
        'Get a textured draft in seconds.',
        '几秒内得到带贴图的初稿。',
      ],
      [
        'Refine and export',
        '细化并导出',
        'Refine detail and export to your 3D tool.',
        '细化细节并导出到 3D 软件。',
      ],
    ],
    features: [
      ['Text to 3D', '文生 3D'],
      ['Image to 3D', '图生 3D'],
      ['Textured meshes', '带贴图网格'],
      ['High-detail refinement', '高精度细化'],
    ],
    bestFor: [
      ['Game props and characters', '游戏道具与角色'],
      ['Product prototypes', '产品原型'],
      ['3D printing', '3D 打印'],
    ],
    faqs: [
      [
        'How fast is Tripo?',
        'Tripo 有多快？',
        'A basic textured mesh takes seconds; high-detail refinement takes a few minutes.',
        '基础带贴图网格只需几秒，高精度细化需要几分钟。',
      ],
      [
        'Can I use Tripo models in game engines?',
        'Tripo 模型能用在游戏引擎里吗？',
        'Yes, it exports standard 3D meshes for engines and 3D tools.',
        '可以，它导出标准 3D 网格，可用于游戏引擎和 3D 软件。',
      ],
    ],
  }),
  tool({
    slug: 'napkin-ai',
    name: 'Napkin AI',
    maker: 'Napkin',
    website: 'https://www.napkin.ai',
    category: 'models',
    tone: 'coral',
    tags: [
      ['diagrams', 'Diagrams', '图表'],
      ['visuals', 'Business visuals', '商务视觉'],
      ['text-to-visual', 'Text to visual', '文字转图'],
    ],
    tagline: [
      'Turn text into diagrams and visuals for slides and docs.',
      '把文字变成可用于 PPT 和文档的图表与视觉图。',
    ],
    description: [
      'Napkin AI turns text into diagrams and visuals. Paste a paragraph and it suggests flowcharts, frameworks, and infographics you can edit and export to slides, docs, or social posts.',
      'Napkin AI 可以把文字变成图表和视觉图。贴入一段文字，它会推荐流程图、框架图和信息图，可编辑后导出到 PPT、文档或社媒。',
    ],
    note: [
      'Best for: making text-heavy content visual',
      '适合：把大段文字变得可视化',
    ],
    value: [
      'Editable diagrams generated straight from your writing.',
      '直接从文字生成可编辑的图表。',
    ],
    problem: [
      'Designing a diagram for every idea takes time.',
      '为每个想法设计一张图很花时间。',
    ],
    audience: [
      'Marketers, consultants, teachers, and writers.',
      '营销人员、顾问、老师和写作者。',
    ],
    pricing: [
      'Free to start; paid plans add more credits and features.',
      '可免费开始，付费套餐提供更多额度和功能。',
    ],
    market: [
      ['Business visuals', '商务视觉'],
      ['Presentations', '演示文稿'],
    ],
    tech: [
      ['Text-to-diagram generation', '文字转图表生成'],
      ['Editable vector visuals', '可编辑矢量视觉'],
    ],
    whatIs: [
      'Napkin AI reads your text and generates matching visuals such as flowcharts, mind maps, and comparison graphics. Every visual stays editable, so you can change colors, icons, and wording.',
      'Napkin AI 会读取你的文字并生成匹配的视觉图，比如流程图、思维导图和对比图。所有图都可以编辑，颜色、图标和文字都能改。',
    ],
    steps: [
      [
        'Paste text',
        '贴入文字',
        'Add a paragraph or outline.',
        '添加一段文字或提纲。',
      ],
      [
        'Pick a visual',
        '选择视觉图',
        'Choose from suggested diagrams.',
        '从推荐的图表中选择。',
      ],
      [
        'Edit and export',
        '编辑并导出',
        'Adjust style and export as PNG, SVG, or PDF.',
        '调整样式并导出为 PNG、SVG 或 PDF。',
      ],
    ],
    features: [
      ['Text-to-diagram', '文字转图表'],
      ['Editable visuals', '可编辑视觉图'],
      ['Many diagram types', '多种图表类型'],
      ['Export for slides and docs', '导出到 PPT 和文档'],
    ],
    bestFor: [
      ['Presentation slides', '演示 PPT'],
      ['Blog and LinkedIn posts', '博客和领英帖子'],
      ['Teaching materials', '教学材料'],
    ],
    faqs: [
      [
        'Is Napkin AI free?',
        'Napkin AI 免费吗？',
        'There is a free way to start; paid plans add more usage.',
        '可以免费开始，付费套餐提供更多用量。',
      ],
      [
        'Can I edit the diagrams?',
        '图表可以编辑吗？',
        'Yes, generated visuals are fully editable.',
        '可以，生成的视觉图完全可编辑。',
      ],
    ],
  }),
  // ─── Coding & app builders ──────────────────────────────────────────────
  tool({
    slug: 'lovable',
    name: 'Lovable',
    maker: 'Lovable',
    website: 'https://lovable.dev',
    category: 'coding',
    tone: 'coral',
    related: ['replit', 'emergent'],
    tags: [
      ['app-builder', 'AI app builder', 'AI 应用生成'],
      ['vibe-coding', 'Vibe coding', '氛围编程'],
      ['no-code', 'No code', '无需编程'],
    ],
    tagline: [
      'Build web apps and sites by chatting with AI.',
      '和 AI 聊天就能搭建网页应用和网站。',
    ],
    description: [
      'Lovable is an AI app builder. Describe what you want and it generates a working web app, then keeps editing it as you chat. Each prompt uses credits; the free plan includes 5 daily credits.',
      'Lovable 是一款 AI 应用生成工具。描述你想要什么，它就生成一个可用的网页应用，并随着对话持续修改。每次提示消耗积分，免费版每天有 5 个积分。',
    ],
    note: [
      'Best for: founders prototyping a product fast',
      '适合：快速做产品原型的创业者',
    ],
    value: [
      'A working web app from a conversation, no code required.',
      '通过对话得到可用的网页应用，无需写代码。',
    ],
    problem: [
      'Building a first version usually needs a developer.',
      '做第一版产品通常需要开发人员。',
    ],
    audience: [
      'Founders, designers, and product managers.',
      '创业者、设计师和产品经理。',
    ],
    pricing: [
      'Free: 5 daily credits. Pro from $25/month; Business from $50/month.',
      '免费版每天 5 积分；Pro 每月 $25 起；Business 每月 $50 起。',
    ],
    market: [
      ['AI coding', 'AI 编程'],
      ['No-code', '无代码'],
    ],
    tech: [
      ['Full-stack web generation', '全栈网页生成'],
      ['Credit-based prompts', '按积分计费的提示'],
    ],
    whatIs: [
      'Lovable AI is a chat-based app and website builder. It writes the code, shows a live preview, and lets you refine the app through conversation, then publish it.',
      'Lovable AI 是一款基于对话的应用和网站生成工具。它会写代码、展示实时预览，让你通过对话不断完善应用，然后发布上线。',
    ],
    steps: [
      [
        'Describe the app',
        '描述应用',
        'Tell Lovable what to build.',
        '告诉 Lovable 要做什么。',
      ],
      [
        'Iterate in chat',
        '对话迭代',
        'Request changes and watch the preview update.',
        '提出修改，实时预览会随之更新。',
      ],
      [
        'Publish',
        '发布',
        'Deploy the app and share the link.',
        '部署应用并分享链接。',
      ],
    ],
    features: [
      ['Chat-to-app generation', '对话生成应用'],
      ['Live preview', '实时预览'],
      ['One-click publishing', '一键发布'],
      ['Team plans', '团队套餐'],
    ],
    bestFor: [
      ['MVPs and prototypes', 'MVP 与原型'],
      ['Landing pages', '落地页'],
      ['Internal tools', '内部工具'],
    ],
    faqs: [
      [
        'How much does Lovable cost?',
        'Lovable 多少钱？',
        'Free includes 5 daily credits; Pro is $25/month and Business $50/month (less when billed annually).',
        '免费版每天 5 积分；Pro 每月 $25，Business 每月 $50（年付更便宜）。',
      ],
      [
        'How many credits does an app take?',
        '做一个应用要多少积分？',
        'Each prompt uses a credit; a basic app often takes 5–15.',
        '每次提示消耗 1 积分，一个基础应用通常需要 5 到 15 个。',
      ],
    ],
  }),
  tool({
    slug: 'replit',
    name: 'Replit',
    maker: 'Replit',
    website: 'https://replit.com',
    category: 'coding',
    tone: 'amber',
    related: ['lovable', 'emergent'],
    tags: [
      ['app-builder', 'AI app builder', 'AI 应用生成'],
      ['coding-agent', 'Coding agent', '编程 Agent'],
      ['hosting', 'Hosting', '托管部署'],
    ],
    tagline: [
      'Describe an app and Replit builds and hosts it.',
      '描述你的应用，Replit 帮你开发并托管上线。',
    ],
    description: [
      'Replit is an AI app and website builder. You describe what you want and its agent builds a working app or website in minutes, with no coding required, then hosts it for you.',
      'Replit 是一款 AI 应用和网站生成工具。描述需求后，它的 Agent 会在几分钟内做出可用的应用或网站，无需编程，并直接帮你托管上线。',
    ],
    note: [
      'Best for: building and hosting apps in one place',
      '适合：在一个地方开发并托管应用',
    ],
    value: [
      'From idea to hosted app without leaving the browser.',
      '不离开浏览器，从想法到上线应用。',
    ],
    problem: [
      'Setting up code, databases, and hosting is complex.',
      '配置代码、数据库和托管很复杂。',
    ],
    audience: [
      'Non-developers, students, and developers.',
      '非技术人员、学生和开发者。',
    ],
    pricing: PRICING_CHECK,
    market: [
      ['AI coding', 'AI 编程'],
      ['Cloud development', '云端开发'],
    ],
    tech: [
      ['Replit Agent', 'Replit Agent'],
      ['Built-in hosting and database', '内置托管和数据库'],
    ],
    whatIs: [
      'Replit is a cloud development platform with an AI agent. Describe an app in plain language and the agent writes the code, sets up the database, and deploys it, all in the browser.',
      'Replit 是一个带 AI Agent 的云端开发平台。用自然语言描述应用，Agent 会写代码、配置数据库并部署上线，全部在浏览器中完成。',
    ],
    steps: [
      [
        'Describe the app',
        '描述应用',
        'Type what you want to build.',
        '输入你想做的东西。',
      ],
      [
        'Let the agent build',
        '让 Agent 构建',
        'Review the plan and watch it build.',
        '查看计划，看它完成构建。',
      ],
      [
        'Deploy',
        '部署',
        'Publish the app with built-in hosting.',
        '用内置托管发布应用。',
      ],
    ],
    features: [
      ['AI agent that builds apps', '会构建应用的 AI Agent'],
      ['Browser-based editor', '浏览器编辑器'],
      ['Built-in hosting', '内置托管'],
      ['Databases and integrations', '数据库与集成'],
    ],
    bestFor: [
      ['Personal tools', '个人小工具'],
      ['Startup prototypes', '创业原型'],
      ['Learning to code', '学习编程'],
    ],
    faqs: [
      [
        'Do I need to know how to code?',
        '需要会编程吗？',
        'No. Replit says you can get a working app or website with no coding required.',
        '不需要。Replit 称无需编程就能得到可用的应用或网站。',
      ],
      [
        'Is Replit free?',
        'Replit 免费吗？',
        'There is a free way to start; paid plans add agent usage and hosting.',
        '可以免费开始，付费套餐提供更多 Agent 用量和托管。',
      ],
    ],
  }),
  tool({
    slug: 'hostinger-ai-website-builder',
    name: 'Hostinger AI Website Builder',
    maker: 'Hostinger',
    website: 'https://www.hostinger.com/ai-website-builder',
    category: 'coding',
    tone: 'plum',
    related: ['lovable', 'replit'],
    tags: [
      ['website-builder', 'Website builder', '建站工具'],
      ['hosting', 'Hosting included', '含主机托管'],
      ['no-code', 'No code', '无需编程'],
    ],
    tagline: [
      'Describe your business and get a ready website in minutes.',
      '描述你的业务，几分钟得到一个成品网站。',
    ],
    description: [
      'Hostinger AI Website Builder generates a professional website from a short description of your idea. No coding is needed, and the site comes with Hostinger’s hosting so it can go live right away.',
      'Hostinger AI 建站工具根据你对想法的简短描述生成专业网站。无需编程，网站自带 Hostinger 主机托管，可以马上上线。',
    ],
    note: [
      'Best for: small businesses needing a simple site fast',
      '适合：需要快速上线简单网站的小企业',
    ],
    value: [
      'Website, hosting, and domain options from one provider.',
      '网站、主机和域名选项都来自同一家服务商。',
    ],
    problem: [
      'Small businesses lack time to design and host a site.',
      '小企业没时间设计网站和配置主机。',
    ],
    audience: [
      'Small businesses, freelancers, and creators.',
      '小企业、自由职业者和创作者。',
    ],
    pricing: [
      'Included with Hostinger website plans; see the site for current pricing.',
      '包含在 Hostinger 建站套餐中，价格以官网为准。',
    ],
    market: [
      ['Website builders', '建站工具'],
      ['Small business', '小企业'],
    ],
    tech: [
      ['AI site generation', 'AI 网站生成'],
      ['Managed hosting', '托管主机'],
    ],
    whatIs: [
      'Hostinger’s AI website builder asks what your site is for, then generates pages, layout, text, and images. You edit with a drag-and-drop editor and publish on Hostinger hosting.',
      'Hostinger AI 建站工具会先询问网站用途，然后生成页面、布局、文字和图片。你可以用拖拽编辑器修改，并发布在 Hostinger 主机上。',
    ],
    steps: [
      [
        'Describe your site',
        '描述网站',
        'Enter your business type and goals.',
        '输入业务类型和目标。',
      ],
      [
        'Generate',
        '生成',
        'Let the AI create pages and content.',
        '让 AI 生成页面和内容。',
      ],
      [
        'Edit and publish',
        '编辑并发布',
        'Customize in the editor and go live.',
        '在编辑器中调整后上线。',
      ],
    ],
    features: [
      ['AI-generated website', 'AI 生成网站'],
      ['Drag-and-drop editor', '拖拽编辑器'],
      ['Hosting included', '包含主机'],
      ['No coding needed', '无需编程'],
    ],
    bestFor: [
      ['Local business sites', '本地商家网站'],
      ['Portfolios', '作品集'],
      ['Simple online stores', '简单网店'],
    ],
    faqs: [
      [
        'Do I need coding skills?',
        '需要会编程吗？',
        'No, you describe your idea and the AI builds the site.',
        '不需要，描述想法后 AI 会搭建网站。',
      ],
      [
        'Is hosting included?',
        '包含主机吗？',
        'Yes, the builder runs on Hostinger’s website plans with hosting.',
        '包含，建站工具属于含主机的 Hostinger 建站套餐。',
      ],
    ],
  }),
  // ─── Voice & music ──────────────────────────────────────────────────────
  tool({
    slug: 'lalal-ai',
    name: 'LALAL.AI',
    maker: 'LALAL.AI',
    website: 'https://www.lalal.ai',
    category: 'audio',
    tone: 'moss',
    related: ['suno', 'topmediai'],
    tags: [
      ['vocal-remover', 'Vocal remover', '人声分离'],
      ['stem-splitter', 'Stem splitter', '音轨分离'],
      ['voice-changer', 'Voice changer', '变声'],
    ],
    tagline: [
      'Remove vocals and split songs into clean stems with AI.',
      '用 AI 去除人声，把歌曲分离成干净的音轨。',
    ],
    description: [
      'LALAL.AI is an AI vocal remover and instrumental isolator. It splits songs into vocals, drums, bass, and other stems, and also offers voice cleaning and a voice changer.',
      'LALAL.AI 是一款 AI 人声去除和伴奏提取工具，可以把歌曲分离成人声、鼓、贝斯等音轨，还提供人声降噪和变声功能。',
    ],
    note: [
      'Best for: karaoke tracks, remixes, and samples',
      '适合：制作伴奏、混音和采样',
    ],
    value: [
      'Clean stems from any song in seconds.',
      '几秒钟从任意歌曲中提取干净音轨。',
    ],
    problem: [
      'Isolating vocals or instruments by hand is nearly impossible.',
      '手工分离人声或乐器几乎做不到。',
    ],
    audience: [
      'Musicians, DJs, producers, and video creators.',
      '音乐人、DJ、制作人和视频创作者。',
    ],
    pricing: [
      'Free preview; paid packs by processing minutes.',
      '可免费预览，按处理时长购买套餐。',
    ],
    market: [
      ['Audio tools', '音频工具'],
      ['Music production', '音乐制作'],
    ],
    tech: [
      ['Neural stem separation', '神经网络音轨分离'],
      ['Voice processing', '人声处理'],
    ],
    whatIs: [
      'LALAL.AI separates mixed audio into individual stems. Upload a song or video and download the vocals, instrumental, or specific instruments, or clean up and change a voice.',
      'LALAL.AI 能把混合音频分离成单独音轨。上传歌曲或视频，就能下载人声、伴奏或特定乐器，也能降噪或变声。',
    ],
    steps: [
      [
        'Upload audio',
        '上传音频',
        'Add a song or video file.',
        '添加歌曲或视频文件。',
      ],
      [
        'Choose stems',
        '选择音轨',
        'Pick vocals, instrumental, or specific instruments.',
        '选择人声、伴奏或特定乐器。',
      ],
      [
        'Download',
        '下载',
        'Preview and download the separated tracks.',
        '预览并下载分离后的音轨。',
      ],
    ],
    features: [
      ['Vocal and instrumental separation', '人声与伴奏分离'],
      ['Multi-stem splitting', '多音轨拆分'],
      ['Voice cleaner', '人声降噪'],
      ['Voice changer', '变声器'],
    ],
    bestFor: [
      ['Karaoke and covers', '卡拉 OK 与翻唱'],
      ['DJ remixes', 'DJ 混音'],
      ['Cleaning podcast audio', '清理播客音频'],
    ],
    faqs: [
      [
        'Is LALAL.AI free?',
        'LALAL.AI 免费吗？',
        'You can preview results for free; full downloads use paid minutes.',
        '可以免费预览，完整下载需要付费时长。',
      ],
      [
        'Does it have a voice changer?',
        '它有变声功能吗？',
        'Yes, alongside stem separation it offers a voice changer.',
        '有，除音轨分离外还提供变声器。',
      ],
    ],
  }),
  tool({
    slug: 'topmediai',
    name: 'TopMediai',
    maker: 'TopMediai',
    website: 'https://www.topmediai.com',
    category: 'audio',
    tone: 'amber',
    related: ['suno', 'lalal-ai'],
    tags: [
      ['ai-music', 'AI music', 'AI 音乐'],
      ['voiceover', 'Voiceover', '配音'],
      ['ai-video', 'AI video', 'AI 视频'],
    ],
    tagline: [
      'All-in-one AI music, voiceover, and video creation.',
      '一站式 AI 音乐、配音和视频创作平台。',
    ],
    description: [
      'TopMediai is an all-in-one platform for AI video, music, and voiceover creation. It includes an AI music generator, text-to-speech voiceovers, and video tools for content creators.',
      'TopMediai 是一站式 AI 视频、音乐和配音创作平台，提供 AI 音乐生成、文字转语音配音和视频工具，面向内容创作者。',
    ],
    note: [
      'Best for: creators who need music and voiceover together',
      '适合：同时需要配乐和配音的创作者',
    ],
    value: [
      'Music, voice, and video tools under one account.',
      '一个账号即可使用音乐、配音和视频工具。',
    ],
    problem: [
      'Separate tools for music, voice, and video slow production.',
      '音乐、配音、视频分别用不同工具，制作很慢。',
    ],
    audience: [
      'YouTubers, marketers, and short-video creators.',
      'YouTuber、营销人员和短视频创作者。',
    ],
    pricing: PRICING_CHECK,
    market: [
      ['AI audio', 'AI 音频'],
      ['Creator tools', '创作者工具'],
    ],
    tech: [
      ['AI music generation', 'AI 音乐生成'],
      ['Text-to-speech', '文字转语音'],
    ],
    whatIs: [
      'TopMediai AI music generator creates songs from prompts or lyrics, and the same platform produces text-to-speech voiceovers and AI videos, so a creator can finish a whole clip in one place.',
      'TopMediai AI 音乐生成器可以根据提示词或歌词生成歌曲，同一平台还能制作文字转语音配音和 AI 视频，创作者可以在一个地方做完整条视频。',
    ],
    steps: [
      [
        'Pick a tool',
        '选择工具',
        'Choose music, voiceover, or video.',
        '选择音乐、配音或视频。',
      ],
      [
        'Enter text or lyrics',
        '输入文字或歌词',
        'Describe the track or paste your script.',
        '描述曲风或贴入脚本。',
      ],
      [
        'Generate and export',
        '生成并导出',
        'Create the audio or video and download it.',
        '生成音频或视频并下载。',
      ],
    ],
    features: [
      ['AI music generator', 'AI 音乐生成'],
      ['Text-to-speech voiceovers', '文字转语音配音'],
      ['AI video tools', 'AI 视频工具'],
      ['Many voices and styles', '多种声音和风格'],
    ],
    bestFor: [
      ['Background music', '背景音乐'],
      ['Video narration', '视频旁白'],
      ['Short-form content', '短视频内容'],
    ],
    faqs: [
      [
        'What can TopMediai make?',
        'TopMediai 能做什么？',
        'AI music, voiceovers, and videos.',
        'AI 音乐、配音和视频。',
      ],
      [
        'Is it free?',
        '免费吗？',
        'You can try it free; paid plans unlock more usage.',
        '可以免费试用，付费套餐解锁更多用量。',
      ],
    ],
  }),
  tool({
    slug: 'elevenlabs-v4',
    name: 'Eleven v4',
    aliases: [
      'ElevenLabs v4',
      'ElevenLabs Eleven v4',
      'Eleven v4 Turbo',
      'ElevenLabs v4 Turbo',
      'ElevenLabs',
      'ElevenLabs TTS',
      'ElevenLabs 语音模型',
    ],
    seoKeyword: 'ElevenLabs v4',
    maker: 'ElevenLabs',
    website: 'https://elevenlabs.io/v4',
    category: 'audio',
    tone: 'moss',
    related: ['elevenlabs-avatars', 'cartesia'],
    tags: [
      ['text-to-speech', 'Text to speech', '文本转语音'],
      ['voice-api', 'Voice API', '语音 API'],
      ['realtime-voice', 'Real-time voice agents', '实时语音智能体'],
    ],
    tagline: [
      'ElevenLabs’ most expressive voice model, plus a Turbo version for live agents.',
      'ElevenLabs 表现力最强的语音模型，另有面向实时智能体的 Turbo 版本。',
    ],
    description: [
      'Eleven v4 (searched as “ElevenLabs v4”) is the text-to-speech model ElevenLabs released on September 28, 2026. It reads a script the way a voice actor would, in 90+ languages, with audio tags like [laughs] and [whispers]. Eleven v4 Turbo brings the same voices to live AI agents at about 150 ms to first speech.',
      'Eleven v4（常被搜索为“ElevenLabs v4”）是 ElevenLabs 于 2026 年 9 月 28 日发布的文本转语音模型。它像配音演员一样理解脚本，支持 90 多种语言，可用 [laughs]、[whispers] 等音频标签控制表达。Eleven v4 Turbo 把同样的声音带给实时 AI 智能体，首句语音延迟约 150 毫秒。',
    ],
    note: [
      'Best for: expressive voiceovers and low-latency voice agents',
      '适合：富有表现力的配音和低延迟语音智能体',
    ],
    value: [
      'Natural, acted-sounding speech from one model, with a real-time variant for conversations.',
      '一个模型就能生成自然、有表演感的语音，并有面向对话的实时版本。',
    ],
    problem: [
      'Most TTS voices sound flat on long scripts or are too slow for live conversations.',
      '大多数 TTS 声音在长脚本里显得平淡，或者速度太慢，无法用于实时对话。',
    ],
    audience: [
      'Creators, audiobook and ad producers, and developers building voice agents.',
      '创作者、有声书与广告制作者，以及开发语音智能体的开发者。',
    ],
    pricing: [
      'Free plan with 10,000 credits a month; paid plans start at $6/month. v4 and v4 Turbo share the same credit pricing.',
      '免费版每月 10,000 积分；付费套餐每月 6 美元起。v4 与 v4 Turbo 积分价格相同。',
    ],
    market: [
      ['Text to speech', '文本转语音'],
      ['Voice AI agents', '语音 AI 智能体'],
    ],
    tech: [
      [
        'Models eleven_v4 and eleven_v4_turbo',
        '模型 eleven_v4 与 eleven_v4_turbo',
      ],
      ['Bidirectional streaming (Turbo)', '双向流式传输（Turbo）'],
      ['Python and TypeScript SDKs', 'Python 与 TypeScript SDK'],
    ],
    whatIs: [
      'Eleven v4 is the fourth generation of ElevenLabs’ speech model, the one people mean by “ElevenLabs v4”. It comes in two versions. Eleven v4 is tuned for produced audio such as voiceovers, audiobooks, and ads, with context stitching that keeps pacing and tone steady across long scripts of up to 10,000 characters. Eleven v4 Turbo is tuned for live calls and AI agents, streaming speech in about 150 ms. Both work with all 17,500+ library voices and, unlike v3, with Professional Voice Clones.',
      'Eleven v4 是 ElevenLabs 第四代语音模型，也就是大家搜索的“ElevenLabs v4”。它有两个版本：Eleven v4 面向配音、有声书、广告等制作类音频，通过上下文衔接让长达 10,000 字符的长脚本保持节奏和语气一致；Eleven v4 Turbo 面向实时通话和 AI 智能体，约 150 毫秒即可开始输出语音。两者都支持全部 17,500 多个音色库声音，并且与 v3 不同，支持专业声音克隆。',
    ],
    steps: [
      [
        'Pick a voice',
        '选择声音',
        'Choose from 17,500+ library voices, design a new one, or clone your own.',
        '从 17,500 多个音色中挑选，或设计新声音、克隆自己的声音。',
      ],
      [
        'Write and tag the script',
        '编写并标注脚本',
        'Add audio tags like [laughs], [whispers], or [door slams] where you want them.',
        '在需要的位置加入 [laughs]、[whispers]、[door slams] 等音频标签。',
      ],
      [
        'Generate or stream',
        '生成或流式输出',
        'Render audio in the web app, or call eleven_v4 / eleven_v4_turbo through the API.',
        '在网页应用中生成音频，或通过 API 调用 eleven_v4 / eleven_v4_turbo。',
      ],
    ],
    features: [
      ['90+ languages with native accents', '90 多种语言，口音地道'],
      ['Audio tags for emotion and sound effects', '用音频标签控制情绪和音效'],
      [
        'About 150 ms to first speech with v4 Turbo',
        'v4 Turbo 首句语音约 150 毫秒',
      ],
      ['Professional Voice Clones supported', '支持专业声音克隆'],
    ],
    bestFor: [
      ['Voiceovers, ads, and audiobooks', '配音、广告和有声书'],
      ['Real-time voice agents and phone bots', '实时语音智能体与电话机器人'],
      ['Multilingual content', '多语言内容'],
    ],
    faqs: [
      [
        'What is ElevenLabs v4?',
        'ElevenLabs v4 是什么？',
        'It is Eleven v4, ElevenLabs’ text-to-speech model released on September 28, 2026, together with Eleven v4 Turbo for real-time use.',
        '指 Eleven v4，ElevenLabs 于 2026 年 9 月 28 日发布的文本转语音模型，同时发布了面向实时场景的 Eleven v4 Turbo。',
      ],
      [
        'What is the difference between Eleven v4 and v4 Turbo?',
        'Eleven v4 和 v4 Turbo 有什么区别？',
        'Eleven v4 aims for the best quality in produced audio. v4 Turbo keeps the same expressive range but streams in about 150 ms, so it suits live calls and AI agents.',
        'Eleven v4 追求制作类音频的最佳质量；v4 Turbo 保留同样的表现力，但约 150 毫秒即可流式输出，适合实时通话和 AI 智能体。',
      ],
      [
        'How is v4 different from Eleven v3?',
        'v4 和 Eleven v3 有什么不同？',
        'v4 is more consistent on long scripts, sequences audio tags better, adds a real-time Turbo version, and brings back Professional Voice Clones, which v3 did not support.',
        'v4 在长脚本上更稳定，音频标签衔接更好，新增实时 Turbo 版本，并重新支持 v3 不支持的专业声音克隆。',
      ],
      [
        'Is Eleven v4 free?',
        'Eleven v4 免费吗？',
        'You can try it on the free plan with 10,000 credits a month. Paid plans start at $6/month.',
        '可以用免费版试用，每月 10,000 积分；付费套餐每月 6 美元起。',
      ],
    ],
  }),
  // ─── Writing & detection ────────────────────────────────────────────────
  tool({
    slug: 'undetectable-ai',
    name: 'Undetectable AI',
    maker: 'Undetectable AI',
    website: 'https://undetectable.ai',
    category: 'writing',
    tone: 'plum',
    related: ['winston-ai', 'zerogpt'],
    tags: [
      ['ai-detector', 'AI detector', 'AI 检测'],
      ['humanizer', 'AI humanizer', 'AI 文本润色'],
      ['writing', 'Writing tools', '写作工具'],
    ],
    tagline: [
      'Detect AI content and rewrite text to read more naturally.',
      '检测 AI 内容，并把文字改写得更自然。',
    ],
    description: [
      'Undetectable AI offers tools to detect AI-generated content, humanize writing, and improve text for work and school. It checks text against several AI detectors and rewrites it to sound more natural.',
      'Undetectable AI 提供 AI 内容检测、文本“人性化”改写和写作优化工具，可用于工作和学习。它会用多个检测器检查文本，并把文字改写得更自然。',
    ],
    note: [
      'Best for: checking and polishing AI-assisted drafts',
      '适合：检查并润色 AI 辅助写的稿子',
    ],
    value: [
      'Detection and rewriting in one place.',
      '检测和改写在一个地方完成。',
    ],
    problem: [
      'AI drafts often read stiff and repetitive.',
      'AI 草稿读起来常常生硬重复。',
    ],
    audience: ['Writers, marketers, and students.', '写作者、营销人员和学生。'],
    pricing: [
      'Free detector; paid plans for humanizing more words.',
      '检测免费，改写更多字数需付费。',
    ],
    market: [
      ['AI detection', 'AI 检测'],
      ['Writing tools', '写作工具'],
    ],
    tech: [
      ['Multi-detector check', '多检测器核查'],
      ['Rewriting model', '改写模型'],
    ],
    whatIs: [
      'Undetectable AI is a writing toolkit with an AI detector and a humanizer. Paste text to see how likely it is to be flagged as AI, then rewrite it into more natural, readable prose.',
      'Undetectable AI 是一套写作工具，包含 AI 检测器和“人性化”改写器。贴入文字可查看被判为 AI 的可能性，再把它改写成更自然易读的文字。',
    ],
    steps: [
      [
        'Paste text',
        '贴入文字',
        'Add the draft you want to check.',
        '添加要检查的稿子。',
      ],
      [
        'Run detection',
        '运行检测',
        'See scores from multiple detectors.',
        '查看多个检测器的评分。',
      ],
      [
        'Rewrite',
        '改写',
        'Humanize and edit the result before using it.',
        '改写并编辑后再使用。',
      ],
    ],
    features: [
      ['AI content detector', 'AI 内容检测'],
      ['AI humanizer', 'AI 文本改写'],
      ['Multiple detector scores', '多个检测器评分'],
      ['Writing improvement tools', '写作优化工具'],
    ],
    bestFor: [
      ['Editing AI-assisted drafts', '编辑 AI 辅助草稿'],
      ['Marketing copy', '营销文案'],
      ['Readability checks', '可读性检查'],
    ],
    faqs: [
      [
        'Is the AI detector free?',
        'AI 检测免费吗？',
        'The site promotes a free detector; humanizing at volume is paid.',
        '官网提供免费检测，大量改写需付费。',
      ],
      [
        'Should I use it to submit AI work as my own?',
        '能用它把 AI 写的东西当作自己的交吗？',
        'Follow your school’s or employer’s rules on AI use; rewriting does not change those rules.',
        '请遵守学校或公司关于使用 AI 的规定，改写不会改变这些规定。',
      ],
    ],
  }),
  tool({
    slug: 'zerogpt',
    name: 'ZeroGPT',
    maker: 'ZeroGPT',
    website: 'https://www.zerogpt.com',
    category: 'writing',
    tone: 'cobalt',
    related: ['winston-ai', 'grammarly-ai-detector'],
    tags: [
      ['ai-detector', 'AI detector', 'AI 检测'],
      ['free', 'Free', '免费'],
      ['chatgpt-detector', 'ChatGPT detector', 'ChatGPT 检测'],
    ],
    tagline: [
      'A free AI detector for ChatGPT, GPT-6, and Gemini text.',
      '免费检测 ChatGPT、GPT-6 和 Gemini 生成文本的工具。',
    ],
    description: [
      'ZeroGPT is a free AI content and ChatGPT detector. Paste text and it estimates how much was written by AI models such as ChatGPT, GPT-6, and Gemini, highlighting suspicious sentences.',
      'ZeroGPT 是一款免费的 AI 内容和 ChatGPT 检测工具。贴入文字，它会估算其中有多少由 ChatGPT、GPT-6、Gemini 等模型生成，并标出可疑句子。',
    ],
    note: [
      'Best for: a quick free AI-writing check',
      '适合：快速免费地检查 AI 写作',
    ],
    value: [
      'Free, instant AI detection with no sign-up for basic checks.',
      '免费即时检测，基础检查无需注册。',
    ],
    problem: [
      'Teachers and editors need a quick first check for AI text.',
      '老师和编辑需要快速初筛 AI 文本。',
    ],
    audience: ['Teachers, students, and editors.', '老师、学生和编辑。'],
    pricing: [
      'Free basic detection; paid plans for longer texts and extra tools.',
      '基础检测免费，长文本和更多工具需付费。',
    ],
    market: [
      ['AI detection', 'AI 检测'],
      ['Education', '教育'],
    ],
    tech: [
      ['AI text classifier', 'AI 文本分类器'],
      ['Sentence highlighting', '句子高亮'],
    ],
    whatIs: [
      'ZeroGPT is an AI checker. It analyzes text and reports the share likely generated by AI, so you can decide what needs a closer look.',
      'ZeroGPT 是一款 AI 检测工具。它分析文本并报告可能由 AI 生成的比例，帮你判断哪些内容需要仔细核查。',
    ],
    steps: [
      [
        'Paste text',
        '贴入文字',
        'Paste the text or upload a file.',
        '贴入文字或上传文件。',
      ],
      ['Detect', '检测', 'Run the check.', '开始检测。'],
      [
        'Review',
        '查看结果',
        'Read the AI percentage and highlighted lines.',
        '查看 AI 比例和高亮句子。',
      ],
    ],
    features: [
      ['Free AI detection', '免费 AI 检测'],
      ['Detects ChatGPT, GPT-6, Gemini', '可检测 ChatGPT、GPT-6、Gemini'],
      ['Highlighted sentences', '高亮可疑句子'],
      ['File upload', '支持上传文件'],
    ],
    bestFor: [
      ['Grading essays', '批改作文'],
      ['Checking freelance content', '检查外包内容'],
      ['Self-checking drafts', '自查草稿'],
    ],
    faqs: [
      [
        'Is ZeroGPT free?',
        'ZeroGPT 免费吗？',
        'Basic detection is free.',
        '基础检测免费。',
      ],
      [
        'Is it always accurate?',
        '一定准确吗？',
        'No detector is perfect; use results as a signal, not proof.',
        '没有检测器是完美的，结果只能作为参考而非证据。',
      ],
    ],
  }),
  tool({
    slug: 'grammarly-ai-detector',
    name: 'Grammarly AI Detector',
    maker: 'Grammarly',
    website: 'https://www.grammarly.com/ai-detector',
    category: 'writing',
    tone: 'moss',
    related: ['zerogpt', 'winston-ai'],
    tags: [
      ['ai-detector', 'AI detector', 'AI 检测'],
      ['free', 'Free', '免费'],
      ['grammarly', 'Grammarly', 'Grammarly'],
    ],
    tagline: [
      'Grammarly’s free AI checker for ChatGPT, Claude, and more.',
      'Grammarly 推出的免费 AI 检测，支持 ChatGPT、Claude 等。',
    ],
    description: [
      'Grammarly’s free AI Detector checks whether text was generated by models such as ChatGPT, GPT-6, and Claude. Grammarly says it reaches 99% detection accuracy on RAID’s independent benchmark.',
      'Grammarly 的免费 AI 检测器可以判断文本是否由 ChatGPT、GPT-6、Claude 等模型生成。Grammarly 称它在 RAID 独立基准测试中检测准确率达到 99%。',
    ],
    note: [
      'Best for: a trusted free AI check from Grammarly',
      '适合：用 Grammarly 做可信的免费 AI 检测',
    ],
    value: [
      'Free detection from a writing brand many people already use.',
      '来自大家熟悉的写作品牌的免费检测。',
    ],
    problem: [
      'It is hard to know whether a piece of text was written by AI.',
      '很难判断一段文字是不是 AI 写的。',
    ],
    audience: [
      'Students, teachers, and professionals.',
      '学生、老师和职场人士。',
    ],
    pricing: [
      'The AI Detector is free; Grammarly’s other features have paid plans.',
      'AI 检测免费，Grammarly 其他功能有付费套餐。',
    ],
    market: [
      ['AI detection', 'AI 检测'],
      ['Writing tools', '写作工具'],
    ],
    tech: [
      ['AI text classifier', 'AI 文本分类器'],
      ['RAID benchmark', 'RAID 基准测试'],
    ],
    whatIs: [
      'Grammarly AI Detector is a free online checker. Paste text and it estimates how much was likely written by AI, benchmarked on the independent RAID dataset.',
      'Grammarly AI 检测器是一款免费在线检测工具。贴入文字，它会估算其中可能由 AI 写的部分，并以独立的 RAID 数据集作为基准。',
    ],
    steps: [
      [
        'Open the detector',
        '打开检测器',
        'Go to grammarly.com/ai-detector.',
        '访问 grammarly.com/ai-detector。',
      ],
      [
        'Paste text',
        '贴入文字',
        'Add the text you want to check.',
        '添加要检查的文字。',
      ],
      [
        'Read the score',
        '查看评分',
        'Review the estimated share of AI text.',
        '查看估算的 AI 文本比例。',
      ],
    ],
    features: [
      ['Free AI detection', '免费 AI 检测'],
      ['Detects ChatGPT, GPT-6, Claude', '可检测 ChatGPT、GPT-6、Claude'],
      ['99% accuracy on RAID (claimed)', 'RAID 基准 99% 准确率（官方）'],
      ['Works with Grammarly tools', '可配合 Grammarly 其他工具'],
    ],
    bestFor: [
      ['Checking essays', '检查论文'],
      ['Reviewing team content', '审核团队内容'],
      ['Personal writing checks', '自查写作'],
    ],
    faqs: [
      [
        'Is Grammarly’s AI Detector free?',
        'Grammarly AI 检测免费吗？',
        'Yes, the AI Detector is free to use.',
        '是的，AI 检测器免费使用。',
      ],
      [
        'How accurate is it?',
        '准确率如何？',
        'Grammarly reports 99% accuracy on RAID’s independent benchmark; treat results as guidance.',
        'Grammarly 称在 RAID 独立基准上达到 99%，结果仅作参考。',
      ],
    ],
  }),
  tool({
    slug: 'openai-dots',
    name: 'OpenAI Dots',
    aliases: ['Dots Codex', 'Dots', 'ChatGPT Dots', 'OpenAI Dot'],
    seoKeyword: 'Dots Codex',
    maker: 'OpenAI',
    website: 'https://chatgpt.com',
    category: 'assistant',
    tone: 'cobalt',
    related: ['manus', 'chatgpt-atlas', 'replit'],
    tags: [
      ['ai-agent', 'Always-on agent', '常驻智能体'],
      ['codex', 'Hands off to Codex', '可调用 Codex'],
      ['cloud-computer', 'Own cloud computer', '自带云电脑'],
    ],
    tagline: [
      'Always-on ChatGPT agents with their own cloud computer that hand coding work to Codex.',
      '自带云电脑的常驻 ChatGPT 智能体，写代码时会交给 Codex。',
    ],
    description: [
      'OpenAI Dots are persistent agents that live in ChatGPT and keep working in the background on goals you assign. Each dot has its own cloud computer, can watch connected apps such as Gmail, Slack, and GitHub, and creates Codex tasks when code needs to be written. OpenAI launched Dots on September 29, 2026.',
      'OpenAI Dots 是运行在 ChatGPT 里的常驻智能体，会在后台持续推进你交给它的目标。每个 dot 都有自己的云电脑，可以盯着 Gmail、Slack、GitHub 等已连接的应用，需要写代码时会创建 Codex 任务。OpenAI 于 2026 年 9 月 29 日发布 Dots。',
    ],
    note: [
      'Best for: ongoing work you want handled in the background',
      '适合：希望在后台持续处理的长期事务',
    ],
    value: [
      'Assign a responsibility once and the dot keeps checking, acting, and reporting back.',
      '交代一次职责，dot 就会持续检查、处理并向你汇报。',
    ],
    problem: [
      'Regular chats and Codex tasks stop when the conversation ends.',
      '普通对话和 Codex 任务在会话结束后就停下了。',
    ],
    audience: [
      'ChatGPT Pro and Business Premium users, developers, and teams.',
      'ChatGPT Pro 与 Business Premium 用户、开发者和团队。',
    ],
    pricing: [
      'Included with ChatGPT Pro and Business Premium; the first dot has no extra charge. Codex tasks a dot starts count toward your plan usage.',
      '包含在 ChatGPT Pro 和 Business Premium 中，第一个 dot 不额外收费。dot 发起的 Codex 任务会计入你的套餐用量。',
    ],
    market: [
      ['AI agents', 'AI 智能体'],
      ['Productivity', '效率工具'],
    ],
    tech: [
      ['Runs in ChatGPT', '运行在 ChatGPT 中'],
      ['Cloud computer per dot', '每个 dot 一台云电脑'],
    ],
    whatIs: [
      'OpenAI Dots are always-on ChatGPT agents. People searching “dots codex” usually want to know how the two fit together: a dot does not replace Codex. It coordinates the work, and when code needs to be written it creates a Codex task, checks the result, and reports back.',
      'OpenAI Dots 是常驻在 ChatGPT 里的智能体。搜索“dots codex”的人通常想弄清两者的关系：dot 并不取代 Codex，它负责统筹，需要写代码时会创建 Codex 任务，检查结果后再向你汇报。',
    ],
    steps: [
      [
        'Create a dot',
        '创建 dot',
        'Start a dot in ChatGPT on an eligible Pro or Business Premium plan.',
        '在符合条件的 ChatGPT Pro 或 Business Premium 套餐中创建 dot。',
      ],
      [
        'Connect apps',
        '连接应用',
        'Link Gmail, Slack, GitHub, Google Drive, or other apps it should watch.',
        '连接 Gmail、Slack、GitHub、Google Drive 等需要它关注的应用。',
      ],
      [
        'Assign a responsibility',
        '交代职责',
        'Give it an ongoing goal, such as “keep me updated on support tickets”. It hands coding work to Codex.',
        '给它一个长期目标，例如“随时告诉我工单进展”。涉及写代码的部分会交给 Codex。',
      ],
    ],
    features: [
      ['Runs in the background', '后台持续运行'],
      ['Creates Codex tasks for code', '写代码时创建 Codex 任务'],
      ['Persistent cloud browser and files', '持久的云端浏览器和文件'],
      ['Scheduled and event-based tasks', '定时与事件触发任务'],
    ],
    bestFor: [
      ['Monitoring inboxes and tickets', '盯邮箱和工单'],
      ['Recurring reports', '定期汇报'],
      ['Delegating coding tasks to Codex', '把编码任务交给 Codex'],
    ],
    faqs: [
      [
        'What is the difference between Dots and Codex?',
        'Dots 和 Codex 有什么区别？',
        'Codex writes code. A dot is a coordinator that keeps working on your goals and starts Codex tasks when code is needed.',
        'Codex 负责写代码；dot 是统筹者，持续推进你的目标，需要写代码时再发起 Codex 任务。',
      ],
      [
        'Do Dots use my Codex limits?',
        'Dots 会占用 Codex 额度吗？',
        'Running a dot does not count toward usage limits for now, but any Codex or ChatGPT Work task it hands off draws from your plan.',
        '目前 dot 本身运行不计入用量，但它交给 Codex 或 ChatGPT Work 的任务会消耗你的套餐额度。',
      ],
      [
        'Who can use Dots?',
        '谁能用 Dots？',
        'ChatGPT Pro users outside the EEA, Switzerland, and the UK, plus Business Premium users in all supported regions.',
        '欧洲经济区、瑞士和英国以外的 ChatGPT Pro 用户，以及所有支持地区的 Business Premium 用户。',
      ],
    ],
  }),
  tool({
    slug: 'viblo-ai',
    name: 'Viblo AI',
    aliases: ['Viblo', 'viblo.ai', 'Viblo AI Video Editor'],
    maker: 'Viblo AI LLC',
    website: 'https://viblo.ai',
    category: 'video-editing',
    tone: 'plum',
    related: ['vozo-ai', 'higgsfield', 'kling-ai'],
    tags: [
      ['short-form-video', 'Short-form video', '短视频'],
      ['auto-clipping', 'Auto clipping', '自动剪辑'],
      ['ai-voiceover', 'AI voiceover', 'AI 配音'],
    ],
    tagline: [
      'AI video editor that turns ideas and long videos into Shorts, TikToks, and Reels.',
      '把创意和长视频做成 Shorts、TikTok 和 Reels 的 AI 视频剪辑工具。',
    ],
    description: [
      'Viblo AI is an AI video editor for short-form content. It auto-clips highlights, writes scripts, adds AI voiceovers and captions, and exports for YouTube Shorts, TikTok, and Instagram Reels, with a timeline editor for manual tweaks.',
      'Viblo AI 是一款面向短视频的 AI 剪辑工具。它能自动剪出高光片段、生成脚本、添加 AI 配音和字幕，并导出为 YouTube Shorts、TikTok 和 Instagram Reels 格式，还提供时间线编辑器供手动微调。',
    ],
    note: [
      'Best for: faceless short-form channels',
      '适合：不露脸的短视频账号',
    ],
    value: [
      'Goes from idea or source video to a captioned, voiced short in minutes.',
      '几分钟内从创意或原视频做出带字幕和配音的短视频。',
    ],
    problem: [
      'Cutting, voicing, and captioning shorts by hand takes hours per video.',
      '手动剪辑、配音、加字幕，每条短视频都要花上几个小时。',
    ],
    audience: [
      'Content creators, YouTubers, and small business teams.',
      '内容创作者、YouTuber 和小型企业团队。',
    ],
    pricing: [
      'No free plan. Paid plans start at $25/month for 30 videos; annual billing is discounted. Check the official site for current pricing.',
      '没有免费套餐，付费版每月 25 美元起（30 条视频），按年付有折扣。当前价格以官网为准。',
    ],
    market: [
      ['Short-form video', '短视频'],
      ['Creator tools', '创作者工具'],
    ],
    tech: [
      ['Web app', '网页应用'],
      ['35+ AI voices', '35+ 种 AI 配音'],
    ],
    whatIs: [
      'Viblo AI is a web-based AI video editor for short-form content. Drop in a script, idea, or video link and it handles the script, voiceover, visuals, captions, and vertical formatting, so you can publish to Shorts, TikTok, and Reels quickly.',
      'Viblo AI 是一款网页版 AI 短视频剪辑工具。输入脚本、创意或视频链接，它会处理脚本、配音、画面、字幕和竖屏排版，方便快速发布到 Shorts、TikTok 和 Reels。',
    ],
    steps: [
      [
        'Add your source',
        '添加素材',
        'Paste a video link, upload footage, or start from a script or idea.',
        '粘贴视频链接、上传素材，或从脚本、创意开始。',
      ],
      [
        'Let AI build the short',
        'AI 生成短视频',
        'Viblo clips highlights and adds voiceover, captions, and layout.',
        'Viblo 自动剪出高光，加上配音、字幕和版式。',
      ],
      [
        'Edit and export',
        '编辑并导出',
        'Adjust on the timeline, then export for Shorts, TikTok, or Reels.',
        '在时间线上调整后，导出为 Shorts、TikTok 或 Reels 格式。',
      ],
    ],
    features: [
      ['Auto clipping of highlights', '自动剪辑高光'],
      ['AI voiceovers with 35+ voices', '35+ 种 AI 配音'],
      ['Automatic captions', '自动字幕'],
      ['Split-screen layouts', '分屏版式'],
    ],
    bestFor: [
      ['Faceless YouTube Shorts', '不露脸的 YouTube Shorts'],
      ['Repurposing long videos', '长视频二次剪辑'],
      ['Posting shorts in volume', '批量发布短视频'],
    ],
    faqs: [
      [
        'Is Viblo AI free?',
        'Viblo AI 免费吗？',
        'No. It has paid plans only, starting at $25/month.',
        '不免费，只有付费套餐，每月 25 美元起。',
      ],
      [
        'Which platforms does it export for?',
        '支持导出到哪些平台？',
        'YouTube Shorts, TikTok, and Instagram Reels.',
        'YouTube Shorts、TikTok 和 Instagram Reels。',
      ],
    ],
  }),
  tool({
    slug: 'venice-ai',
    name: 'Venice AI',
    aliases: [
      'Venice',
      'Venice.ai',
      'Uncensored AI chat',
      'Private uncensored AI',
      '无审查 AI',
    ],
    seoKeyword: 'Uncensored AI',
    maker: 'Venice.ai',
    website: 'https://venice.ai',
    category: 'assistant',
    tone: 'plum',
    related: ['lm-studio', 'strata-llm', 'deepseek'],
    tags: [
      ['uncensored-ai', 'Uncensored AI', '无审查 AI'],
      ['private-chat', 'Private chat', '私密对话'],
      ['open-models', 'Open models', '开源模型'],
    ],
    tagline: [
      'Private, uncensored AI chat that does not log your prompts.',
      '不记录提示词的私密、无审查 AI 对话。',
    ],
    description: [
      'Venice is a private AI platform often found when people search for “uncensored AI”. It runs open-weight models with fewer refusals than mainstream chatbots, keeps chats in your browser instead of on its servers, and also offers image, video, audio, and code tools plus an OpenAI-compatible API.',
      'Venice 是一个私密 AI 平台，搜索“uncensored AI（无审查 AI）”时常会找到它。它运行开源模型，拒答比主流聊天机器人少，对话记录保存在你的浏览器而不是它的服务器上，同时提供图片、视频、音频和编程工具，以及兼容 OpenAI 的 API。',
    ],
    note: [
      'Best for: frank answers and private chats without data logging',
      '适合：想要直白回答、又不希望对话被记录的用户',
    ],
    value: [
      'Ask anything and get direct answers, with prompts kept off company servers.',
      '可以直接提问并得到直白的回答，提示词不留存在公司服务器上。',
    ],
    problem: [
      'Mainstream chatbots refuse many legitimate questions and store conversations for review or training.',
      '主流聊天机器人会拒绝不少正当问题，还会保存对话用于审核或训练。',
    ],
    audience: [
      'Writers, researchers, developers, and privacy-minded users.',
      '写作者、研究人员、开发者和注重隐私的用户。',
    ],
    pricing: [
      'Free tier available. Pro is $18/month; higher Pro+ and Max plans include monthly credits. Check venice.ai for current pricing.',
      '提供免费额度。Pro 每月 18 美元；更高的 Pro+ 和 Max 方案包含每月积分。具体以 venice.ai 为准。',
    ],
    market: [
      ['Private AI chat', '私密 AI 对话'],
      ['Uncensored AI', '无审查 AI'],
      ['AI API', 'AI API'],
    ],
    tech: [
      ['Open-weight and frontier models', '开源模型与前沿模型'],
      [
        'Anonymized, zero-retention, TEE, and end-to-end encrypted modes',
        '匿名、零留存、TEE 可信执行和端到端加密模式',
      ],
      ['OpenAI-compatible API', '兼容 OpenAI 的 API'],
    ],
    whatIs: [
      '“Uncensored AI” usually means a chatbot that answers sensitive or controversial questions directly instead of refusing. Venice is one of the best-known options: it serves open-weight models with lighter filtering, offers privacy modes from anonymized proxying to zero-retention, hardware-secured (TEE), and end-to-end encrypted inference, and stores chat history locally in your browser. Fewer filters does not mean no rules: illegal content is still off limits, and answers should be checked like any AI output.',
      '“Uncensored AI（无审查 AI）”通常指会直接回答敏感或有争议问题、而不是拒答的聊天机器人。Venice 是其中最知名的选择之一：它提供过滤更少的开源模型，隐私模式从匿名代理、零留存，到硬件隔离（TEE）和端到端加密推理，并把聊天记录保存在你的本地浏览器中。过滤更少不等于没有规则：违法内容依然禁止，回答也应像其他 AI 输出一样自行核实。',
    ],
    steps: [
      [
        'Open Venice',
        '打开 Venice',
        'Go to venice.ai and start chatting; an account unlocks more usage.',
        '访问 venice.ai 即可开始对话，注册账号可获得更多用量。',
      ],
      [
        'Pick a model and privacy mode',
        '选择模型和隐私模式',
        'Choose an uncensored open model or another model, and the privacy level you need.',
        '选择无审查开源模型或其他模型，以及所需的隐私级别。',
      ],
      [
        'Chat, create, or call the API',
        '对话、创作或调用 API',
        'Ask questions, generate images or code, or connect apps through the API.',
        '提问、生成图片或代码，或通过 API 接入你的应用。',
      ],
    ],
    features: [
      ['Uncensored open-weight chat models', '无审查开源对话模型'],
      ['Chats stored locally in your browser', '对话记录保存在本地浏览器'],
      ['Zero-retention, TEE, and E2EE modes', '零留存、TEE 和端到端加密模式'],
      ['Image, video, audio, and code tools', '图片、视频、音频和编程工具'],
      ['OpenAI-compatible API', '兼容 OpenAI 的 API'],
    ],
    bestFor: [
      ['Questions mainstream chatbots refuse', '主流聊天机器人拒答的问题'],
      ['Fiction and creative writing', '小说与创意写作'],
      ['Private research and brainstorming', '私密研究与头脑风暴'],
    ],
    faqs: [
      [
        'What is uncensored AI?',
        '什么是无审查 AI？',
        'An AI model or chatbot with fewer refusal filters, so it answers controversial or sensitive topics directly. Venice is a hosted option; running open models locally with LM Studio is another.',
        '指拒答过滤更少、会直接回答争议或敏感话题的 AI 模型或聊天机器人。Venice 是托管型选择；用 LM Studio 在本地运行开源模型是另一种方式。',
      ],
      [
        'Is Venice AI free?',
        'Venice AI 免费吗？',
        'Yes, there is a free tier. Pro is $18/month for more usage and models.',
        '有免费额度。Pro 每月 18 美元，可获得更多用量和模型。',
      ],
      [
        'Does Venice store my chats?',
        'Venice 会保存我的对话吗？',
        'Venice says chat history stays in your browser and that its private models keep zero data on its servers.',
        'Venice 表示聊天记录保存在你的浏览器中，其私密模型不会在服务器上留存数据。',
      ],
      [
        'Is uncensored AI legal to use?',
        '使用无审查 AI 合法吗？',
        'Using a less-filtered chatbot is generally legal, but you are still responsible for what you create, and illegal content stays prohibited under Venice’s terms.',
        '使用过滤较少的聊天机器人通常是合法的，但你仍需对生成内容负责，Venice 的条款同样禁止违法内容。',
      ],
    ],
  }),
  tool({
    slug: 'nano-banana-2-1',
    name: 'Nano Banana 2.1',
    aliases: ['Nano Banana 2.1', 'Gemini Nano Banana 2.1'],
    seoKeyword: 'Nano Banana 2.1',
    maker: 'Google',
    website: 'https://aistudio.google.com/',
    category: 'models',
    tone: 'amber',
    related: ['google-flow', 'openart', 'raphael-ai'],
    tags: [
      ['image-model', 'Image model', '图像模型'],
      ['image-editing', 'Image editing', '图像编辑'],
      ['4k-images', '4K images', '4K 图像'],
    ],
    tagline: [
      'Google’s faster, cheaper image model with sharper editing.',
      'Google 新一代图像模型，编辑更精准、价格更低。',
    ],
    description: [
      'Nano Banana 2.1 is Google’s image generation and editing model, released on October 6, 2026. It improves mask-based editing and subject consistency over Nano Banana 2, outputs up to 4K, and costs about half as much per image through the Gemini API.',
      'Nano Banana 2.1 是 Google 于 2026 年 10 月 6 日发布的图像生成与编辑模型。相比 Nano Banana 2，它在蒙版编辑和主体一致性上更强，最高支持 4K 输出，通过 Gemini API 调用的单张价格约降低一半。',
    ],
    note: [
      'Best for: consistent characters and precise image edits',
      '适合：需要角色一致和精准修图的创作',
    ],
    value: [
      'Better edits and character consistency than Nano Banana 2 at roughly half the API price.',
      '编辑效果和角色一致性优于 Nano Banana 2，API 价格约为一半。',
    ],
    problem: [
      'Multi-step image edits often drift, changing faces, products, or layouts you wanted to keep.',
      '多轮修图时人物、产品或版式容易跑偏，想保留的部分被改掉。',
    ],
    audience: [
      'Designers, marketers, content creators, and developers building image features.',
      '设计师、营销人员、内容创作者，以及开发图像功能的开发者。',
    ],
    pricing: [
      'Free to try in the Gemini app. API pricing is about $0.034 per 1K image and $0.076 per 4K image, with a further 50% off in batch mode.',
      '可在 Gemini App 免费试用。API 价格约为 1K 图每张 0.034 美元、4K 图每张 0.076 美元，批量模式再打五折。',
    ],
    market: [
      ['AI image generation', 'AI 图像生成'],
      ['AI image editing', 'AI 图像编辑'],
    ],
    tech: [
      ['Gemini image model', 'Gemini 图像模型'],
      ['Google Search grounding', 'Google 搜索事实依据'],
    ],
    whatIs: [
      'Nano Banana 2.1 is the latest version of Google’s Nano Banana image model. It generates and edits images from text and up to 14 reference images, keeps up to four characters and ten objects consistent, supports aspect ratios as wide as 8:1, and can ground results in Google Search. It is available in the Gemini app, Google AI Studio, Flow, Stitch, and the Gemini API.',
      'Nano Banana 2.1 是 Google Nano Banana 图像模型的最新版本。它可以根据文字和最多 14 张参考图生成、编辑图片，最多保持 4 个角色和 10 个物体的一致性，支持最宽 8:1 的画幅，还能借助 Google 搜索让结果更贴近事实。可在 Gemini App、Google AI Studio、Flow、Stitch 和 Gemini API 中使用。',
    ],
    steps: [
      [
        'Open a Google tool',
        '打开 Google 工具',
        'Use the Gemini app for quick edits, or Google AI Studio to test prompts and settings.',
        '想快速修图就用 Gemini App，想调试提示词和参数就用 Google AI Studio。',
      ],
      [
        'Add a prompt and references',
        '输入提示词和参考图',
        'Describe the image and upload up to 14 reference images for characters, products, or style.',
        '描述想要的画面，并上传最多 14 张角色、产品或风格参考图。',
      ],
      [
        'Edit and export',
        '编辑并导出',
        'Refine areas with follow-up edits, then export up to 4K or call the model from the API.',
        '通过追加指令局部修改，再导出最高 4K 图片，或用 API 调用模型。',
      ],
    ],
    features: [
      ['Mask-based editing', '蒙版局部编辑'],
      ['Up to 14 reference images', '最多 14 张参考图'],
      ['Consistent characters and objects', '角色与物体一致性'],
      ['Up to 4K output and 8:1 aspect ratios', '最高 4K 输出、最宽 8:1 画幅'],
      ['Google Search grounding', 'Google 搜索事实依据'],
    ],
    bestFor: [
      ['Product shots and ad creatives', '产品图和广告素材'],
      [
        'Comics and storyboards with recurring characters',
        '角色反复出现的漫画和分镜',
      ],
      [
        'Developers adding image generation to apps',
        '为应用加入图像生成的开发者',
      ],
    ],
    faqs: [
      [
        'What is new in Nano Banana 2.1?',
        'Nano Banana 2.1 有什么新变化？',
        'Sharper mask-based editing, better subject consistency across edits, adjustable thinking time, and roughly 50% lower API prices than Nano Banana 2.',
        '蒙版编辑更精准，多轮编辑中的主体一致性更好，可调节思考时长，API 价格比 Nano Banana 2 低约 50%。',
      ],
      [
        'Where can I use Nano Banana 2.1?',
        '在哪里可以使用 Nano Banana 2.1？',
        'In the Gemini app, Google Search AI Mode, Google AI Studio, Flow, Stitch, and through the Gemini API.',
        '在 Gemini App、Google 搜索 AI 模式、Google AI Studio、Flow、Stitch 中都能使用，也可以通过 Gemini API 调用。',
      ],
      [
        'Is Nano Banana 2.1 free?',
        'Nano Banana 2.1 免费吗？',
        'You can try it free in the Gemini app with daily limits. API use is paid per image.',
        '在 Gemini App 中可以免费试用，有每日限额；API 按张计费。',
      ],
    ],
  }),
  tool({
    slug: 'miora',
    name: 'Miora',
    aliases: ['Miora AI', 'Tencent Miora'],
    seoKeyword: 'Miora AI',
    maker: 'Tencent',
    website: 'https://miora.design/',
    category: 'workflow',
    tone: 'plum',
    related: ['openart', 'google-flow', 'higgsfield'],
    tags: [
      ['design-agent', 'Design agent', '设计 Agent'],
      ['ai-canvas', 'AI canvas', 'AI 画布'],
      ['brand-assets', 'Brand assets', '品牌素材'],
    ],
    tagline: [
      'Tencent’s AI creative agent for images, video, UI, and 3D on one canvas.',
      '腾讯推出的 AI 创意 Agent，在一张画布上生成图片、视频、UI 和 3D。',
    ],
    description: [
      'Miora is an agentic creative studio from Tencent. You give it one brief, and its agents plan the work, pick models, and produce on-brand images, video, UI/UX screens, and 3D assets on a shared canvas. It remembers your style and brand rules across projects.',
      'Miora 是腾讯推出的 Agent 式创意工作室。你只需给出一份需求，它的 Agent 就会拆解任务、选择模型，在同一张画布上产出符合品牌调性的图片、视频、UI/UX 界面和 3D 素材，并在不同项目间记住你的风格和品牌规范。',
    ],
    note: [
      'Best for: full campaign or brand kits from one brief',
      '适合：用一份需求产出整套活动或品牌素材',
    ],
    value: [
      'One canvas and one agent for every visual asset in a project, with memory of your brand.',
      '一个项目的所有视觉素材都在一张画布、一个 Agent 中完成，并记住你的品牌。',
    ],
    problem: [
      'Creative projects usually jump between separate image, video, UI, and 3D tools and lose context each time.',
      '创意项目通常要在图片、视频、UI、3D 等多个工具间来回切换，每次都会丢失上下文。',
    ],
    audience: [
      'Designers, brand and marketing teams, product teams, and indie creators.',
      '设计师、品牌和营销团队、产品团队，以及独立创作者。',
    ],
    pricing: PRICING_CHECK,
    market: [
      ['AI design agents', 'AI 设计 Agent'],
      ['Creative production', '创意内容生产'],
    ],
    tech: [
      ['Multi-agent planning', '多 Agent 任务规划'],
      ['Persistent creative memory', '持久创作记忆'],
    ],
    whatIs: [
      'Miora is Tencent’s first self-developed AI creative agent. It was introduced internationally at Tencent Cloud Day Hong Kong in May 2026 and opened to everyone in July 2026. Its agent breaks a brief into tasks, chooses models, checks intermediate results, and keeps everything on one canvas. A skills marketplace offers reusable workflows for jobs like branding or film production.',
      'Miora 是腾讯首款自研 AI 创意 Agent，2026 年 5 月在腾讯云香港峰会上面向海外发布，7 月全面开放。它的 Agent 会把需求拆成任务、选择模型、检查中间结果，并把所有产出放在一张画布上。技能市场提供品牌设计、影视制作等可复用的工作流。',
    ],
    steps: [
      [
        'Start a project',
        '新建项目',
        'Sign in at miora.design and describe what you need in one brief.',
        '登录 miora.design，用一段话描述你的需求。',
      ],
      [
        'Let the agent plan',
        '让 Agent 规划',
        'Pick a scenario mode or a skill, and the agent splits the brief into image, video, UI, or 3D tasks.',
        '选择场景模式或技能，Agent 会把需求拆分为图片、视频、UI 或 3D 任务。',
      ],
      [
        'Review on the canvas',
        '在画布上审阅',
        'Refine any asset on the shared canvas and export the finished set.',
        '在共享画布上调整任意素材，然后导出整套成品。',
      ],
    ],
    features: [
      [
        'Images, video, UI/UX, and 3D on one canvas',
        '图片、视频、UI/UX、3D 同一画布',
      ],
      ['Agent that plans and checks its own work', '能规划并自检的 Agent'],
      ['Memory of style and brand rules', '记住风格与品牌规范'],
      ['Skills marketplace for reusable workflows', '可复用工作流的技能市场'],
      ['Choice of models and reasoning depth', '可选模型和推理深度'],
    ],
    bestFor: [
      ['Brand identity and launch kits', '品牌形象和发布物料'],
      ['Marketing campaigns across formats', '多形式营销活动'],
      ['App and web UI mockups', 'App 和网页 UI 原型'],
    ],
    faqs: [
      [
        'Who makes Miora?',
        'Miora 是谁开发的？',
        'Miora is developed by Tencent and is its first self-developed AI creative agent.',
        'Miora 由腾讯开发，是腾讯首款自研 AI 创意 Agent。',
      ],
      [
        'What can Miora create?',
        'Miora 能做什么？',
        'Images, videos, UI/UX designs, and 3D assets, all from one brief on a shared canvas.',
        '可以根据一份需求，在同一画布上生成图片、视频、UI/UX 设计和 3D 素材。',
      ],
      [
        'Is Miora available outside China?',
        '中国以外可以使用 Miora 吗？',
        'Yes. The international version at miora.design opened to everyone in July 2026.',
        '可以。国际版 miora.design 已于 2026 年 7 月全面开放。',
      ],
    ],
  }),
  tool({
    slug: 'mistral-large-4',
    name: 'Mistral Large 4 (Le Chonk)',
    aliases: ['Le Chonk', 'Le Chonk AI', 'Mistral Le Chonk'],
    seoKeyword: 'Le Chonk AI',
    maker: 'Mistral AI',
    website: 'https://mistral.ai/',
    category: 'models',
    tone: 'coral',
    related: ['mistral-vibe', 'deepseek', 'qwen-chat'],
    tags: [
      ['llm', 'LLM', '大语言模型'],
      ['open-weight', 'Open weight', '开放权重'],
      ['european-ai', 'European AI', '欧洲 AI'],
    ],
    tagline: [
      'Mistral’s 1-trillion-parameter flagship model, nicknamed Le Chonk.',
      'Mistral 的万亿参数旗舰模型，昵称 Le Chonk。',
    ],
    description: [
      'Mistral Large 4, nicknamed “Le Chonk”, is Mistral AI’s flagship model released on October 6, 2026. It is a 1.05-trillion-parameter mixture-of-experts model with 49B active parameters, a 1M-token context window, and native image input. It is available through the Mistral API now, with open weights promised for self-hosting.',
      'Mistral Large 4 昵称“Le Chonk”，是 Mistral AI 于 2026 年 10 月 6 日发布的旗舰模型。它采用混合专家架构，总参数 1.05 万亿、每个 token 激活 490 亿，支持 100 万 token 上下文和原生图像输入。现已可通过 Mistral API 使用，官方承诺开放权重供自行部署。',
    ],
    note: [
      'Best for: coding agents, security work, and long documents',
      '适合：编程 Agent、安全分析和超长文档',
    ],
    value: [
      'A frontier-scale European model with open weights, a 1M context, and low API prices.',
      '欧洲出品的前沿级模型，开放权重、100 万上下文，API 价格低。',
    ],
    problem: [
      'Teams want a top-tier model they can eventually host themselves instead of relying only on closed US APIs.',
      '团队希望用上顶级模型，并能最终自行部署，而不只依赖美国的闭源 API。',
    ],
    audience: [
      'Developers, AI engineers, security teams, and enterprises that need data control.',
      '开发者、AI 工程师、安全团队，以及需要掌控数据的企业。',
    ],
    pricing: [
      'API: $1.36 per 1M input tokens and $4.18 per 1M output tokens; cached input $0.14 per 1M.',
      'API 价格：输入每百万 token 1.36 美元，输出每百万 token 4.18 美元；缓存输入每百万 token 0.14 美元。',
    ],
    market: [
      ['Frontier LLMs', '前沿大模型'],
      ['Open-weight models', '开放权重模型'],
    ],
    tech: [
      [
        'Mixture of experts (1.05T total, 49B active)',
        '混合专家（总 1.05 万亿、激活 490 亿）',
      ],
      [
        '1M-token context and vision encoder',
        '100 万 token 上下文与视觉编码器',
      ],
    ],
    whatIs: [
      '“Le Chonk” is the nickname for Mistral Large 4, Mistral AI’s largest model so far. It reads text and images, handles up to 1 million tokens of context, and scores especially well on cybersecurity benchmarks such as Cybench (93%) and on coding-agent tasks. You can call it through the Mistral API or OpenRouter today; Mistral says weights will follow for self-hosting.',
      '“Le Chonk”是 Mistral AI 迄今最大模型 Mistral Large 4 的昵称。它能读取文本和图片，支持最长 100 万 token 上下文，在 Cybench（93%）等网络安全基准和编程 Agent 任务上表现突出。目前可通过 Mistral API 或 OpenRouter 调用，Mistral 表示之后会开放权重供自行部署。',
    ],
    steps: [
      [
        'Get an API key',
        '获取 API Key',
        'Create an account on Mistral’s developer platform, or use OpenRouter.',
        '在 Mistral 开发者平台注册账号，或使用 OpenRouter。',
      ],
      [
        'Call Mistral Large 4',
        '调用 Mistral Large 4',
        'Select Mistral Large 4 as the model and send text or images with your prompt.',
        '选择 Mistral Large 4 作为模型，随提示词发送文本或图片。',
      ],
      [
        'Self-host later',
        '之后自行部署',
        'When the open weights are published, run it on your own GPUs for full data control.',
        '开放权重发布后，可在自有 GPU 上运行，完全掌控数据。',
      ],
    ],
    features: [
      ['1.05T-parameter mixture of experts', '1.05 万亿参数混合专家'],
      ['1M-token context window', '100 万 token 上下文'],
      ['Native image understanding', '原生图像理解'],
      ['Strong cybersecurity and coding scores', '网络安全与编程表现突出'],
      ['Open weights promised', '承诺开放权重'],
    ],
    bestFor: [
      ['Coding agents and large codebases', '编程 Agent 与大型代码库'],
      ['Security research and defense', '安全研究与防御'],
      ['Long reports, contracts, and research', '长报告、合同和研究资料'],
    ],
    faqs: [
      [
        'What is Le Chonk AI?',
        'Le Chonk AI 是什么？',
        'Le Chonk is the nickname of Mistral Large 4, Mistral AI’s 1.05-trillion-parameter flagship model released in October 2026.',
        'Le Chonk 是 Mistral Large 4 的昵称，即 Mistral AI 在 2026 年 10 月发布的 1.05 万亿参数旗舰模型。',
      ],
      [
        'Is Mistral Large 4 open source?',
        'Mistral Large 4 开源吗？',
        'Mistral has promised open weights for self-hosting by the end of October 2026; the license had not been announced at launch.',
        'Mistral 承诺在 2026 年 10 月底前开放权重供自行部署，发布时尚未公布许可证。',
      ],
      [
        'How much does Mistral Large 4 cost?',
        'Mistral Large 4 多少钱？',
        'API pricing is $1.36 per million input tokens and $4.18 per million output tokens.',
        'API 价格为每百万输入 token 1.36 美元、每百万输出 token 4.18 美元。',
      ],
      [
        'Can I chat with Le Chonk without the API?',
        '不用 API 能和 Le Chonk 对话吗？',
        'Mistral’s own assistant, Mistral Vibe (formerly Le Chat), runs on Mistral models; check its model picker for Large 4.',
        'Mistral 自家助手 Mistral Vibe（前身 Le Chat）基于 Mistral 模型，可在模型选择中查看是否提供 Large 4。',
      ],
    ],
  }),
  tool({
    slug: 'everygen-ai',
    name: 'Everygen AI',
    aliases: ['Evergen AI', 'EveryGen', 'Viewmax'],
    seoKeyword: 'Evergen AI',
    maker: 'Viewmax LLC',
    website: 'https://everygen.ai/',
    category: 'text-to-video',
    tone: 'cobalt',
    related: ['higgsfield', 'ausar-ai', 'kling-ai'],
    tags: [
      ['ai-video', 'AI video', 'AI 视频'],
      ['short-form', 'Short-form video', '短视频'],
      ['ugc-ads', 'UGC ads', 'UGC 广告'],
    ],
    tagline: [
      'An AI studio for short videos, ads, and images using top video models.',
      '集合主流视频模型的 AI 短视频、广告和图片创作工作室。',
    ],
    description: [
      'Everygen AI (often searched as Evergen AI, formerly Viewmax) is a browser-based studio for short-form video. It puts Seedance 2.5, Kling 3.0, Veo 3.1, MiniMax, and other models behind one account, and adds templates, AI avatars, voiceover, auto-captions, and a scriptwriter for social posts and ads.',
      'Everygen AI（常被搜索为 Evergen AI，前身是 Viewmax）是一个网页版短视频创作工作室。一个账号即可使用 Seedance 2.5、Kling 3.0、Veo 3.1、MiniMax 等模型，并提供模板、AI 数字人、配音、自动字幕和脚本生成，适合做社媒内容和广告。',
    ],
    note: [
      'Best for: creators making Shorts, Reels, and UGC-style ads',
      '适合：制作 Shorts、Reels 和 UGC 风格广告的创作者',
    ],
    value: [
      'Many leading video models plus the editing tools for finished shorts, in one place.',
      '多款主流视频模型和成片所需的编辑工具都在一个地方。',
    ],
    problem: [
      'Making a social video often means paying for several model sites and separate caption, voice, and editing tools.',
      '做一条社媒视频往往要订阅多个模型网站，再另外用字幕、配音和剪辑工具。',
    ],
    audience: [
      'Short-form creators, marketers, and small brands running video ads.',
      '短视频创作者、营销人员和投放视频广告的小品牌。',
    ],
    pricing: [
      'Credit-based plans: Starter, Pro, and Creator, from about $9/month billed yearly or $24 monthly. Check the official site for current prices.',
      '积分制套餐：Starter、Pro、Creator，按年付约每月 9 美元起，按月付 24 美元起，当前价格以官网为准。',
    ],
    market: [
      ['AI video generation', 'AI 视频生成'],
      ['Short-form content tools', '短视频创作工具'],
    ],
    tech: [
      [
        'Seedance, Kling, Veo, MiniMax models',
        'Seedance、Kling、Veo、MiniMax 等模型',
      ],
      [
        'MCP integration for Claude and ChatGPT',
        '支持 Claude、ChatGPT 的 MCP 集成',
      ],
    ],
    whatIs: [
      'Everygen AI is an all-in-one AI video studio, renamed from Viewmax in 2026. Instead of a single model, it lets you pick from Seedance 2.5, Kling 3.0 Turbo, Veo 3.1, MiniMax, and image models, then finish the clip with templates, AI avatars, voiceover, captions, and an editor. Exports have no watermark and can be monetized, and an MCP server lets you generate videos from Claude, ChatGPT, or Cursor.',
      'Everygen AI 是一站式 AI 视频工作室，2026 年由 Viewmax 更名而来。它不依赖单一模型，你可以选用 Seedance 2.5、Kling 3.0 Turbo、Veo 3.1、MiniMax 以及图像模型，再用模板、AI 数字人、配音、字幕和编辑器完成成片。导出无水印、可用于变现，还提供 MCP 服务器，可在 Claude、ChatGPT 或 Cursor 中直接生成视频。',
    ],
    steps: [
      [
        'Pick a studio or template',
        '选择工作室或模板',
        'Open Everygen and choose video, image, Shorts, or Marketing studio.',
        '打开 Everygen，选择视频、图片、Shorts 或营销工作室。',
      ],
      [
        'Choose a model and prompt',
        '选择模型并输入提示词',
        'Select a model such as Seedance, Kling, or Veo and describe the scene or upload an image.',
        '选择 Seedance、Kling 或 Veo 等模型，描述画面或上传图片。',
      ],
      [
        'Finish and export',
        '完善并导出',
        'Add voiceover, captions, or an avatar, then export without a watermark.',
        '添加配音、字幕或数字人，然后无水印导出。',
      ],
    ],
    features: [
      ['Multiple top video and image models', '多款主流视频和图像模型'],
      ['Shorts and marketing templates', 'Shorts 和营销模板'],
      ['AI avatars and voiceover', 'AI 数字人与配音'],
      ['Auto-captions and scriptwriter', '自动字幕与脚本生成'],
      ['Watermark-free, monetizable exports', '无水印、可变现导出'],
    ],
    bestFor: [
      ['YouTube Shorts, TikTok, and Reels', 'YouTube Shorts、TikTok 和 Reels'],
      ['UGC-style product ads', 'UGC 风格产品广告'],
      ['Faceless content channels', '不露脸内容频道'],
    ],
    faqs: [
      [
        'Is Evergen AI the same as Everygen?',
        'Evergen AI 和 Everygen 是同一个吗？',
        'Most searches for “Evergen AI” mean Everygen (everygen.ai), the AI video studio formerly called Viewmax. Evergen is also the name of unrelated energy and biotech companies.',
        '大多数“Evergen AI”搜索指的是 Everygen（everygen.ai），即前身为 Viewmax 的 AI 视频工作室。Evergen 也是一些无关的能源和生物科技公司的名称。',
      ],
      [
        'Which models does Everygen use?',
        'Everygen 用的是哪些模型？',
        'It offers Seedance 2.5, Kling 3.0 Turbo, Veo 3.1, MiniMax, and others for video, plus several image models.',
        '视频方面提供 Seedance 2.5、Kling 3.0 Turbo、Veo 3.1、MiniMax 等，另有多款图像模型。',
      ],
      [
        'Can I monetize Everygen videos?',
        'Everygen 生成的视频可以变现吗？',
        'Yes. Everygen says exports are watermark-free and can be monetized without restrictions.',
        '可以。Everygen 表示导出视频无水印，可不受限制地用于变现。',
      ],
    ],
  }),
  tool({
    slug: 'prompt-seen',
    name: 'Prompt Seen',
    aliases: ['Prompt Seen AI', 'PromptSeen', 'Prompt Seen AI Photo Prompts'],
    seoKeyword: 'Prompt Seen',
    maker: 'Promptseen Tech',
    website: 'https://play.google.com/store/apps/details?id=com.promptseen.ai',
    category: 'workflow',
    tone: 'amber',
    related: ['nano-banana-2-1', 'openart', 'raphael-ai'],
    tags: [
      ['prompt-library', 'Prompt library', '提示词库'],
      ['ai-photo-prompts', 'AI photo prompts', 'AI 照片提示词'],
      ['image-editing', 'Image editing', '图像编辑'],
    ],
    tagline: [
      'A free library of trending AI photo prompts for Gemini, ChatGPT, and Midjourney.',
      '免费的热门 AI 照片提示词库，可用于 Gemini、ChatGPT 和 Midjourney。',
    ],
    description: [
      'Prompt Seen is a prompt library app with 1,000+ ready-to-use AI photo prompts. Each prompt comes with a preview image, so you can pick a look, copy the prompt in one tap, and paste it into Gemini (Nano Banana), ChatGPT, or Midjourney with your own photo.',
      'Prompt Seen 是一个 AI 照片提示词库 App，收录 1000 多条可直接使用的提示词。每条提示词都附有效果预览图，选好风格后一键复制，再连同自己的照片粘贴到 Gemini（Nano Banana）、ChatGPT 或 Midjourney 中即可生成。',
    ],
    note: [
      'Best for: recreating viral AI photo trends',
      '适合：复刻爆款 AI 照片风格',
    ],
    value: [
      'Skip prompt writing: see the result first, then copy the exact prompt that made it.',
      '不用自己写提示词：先看效果，再复制生成该效果的原始提示词。',
    ],
    problem: [
      'Viral AI photo styles are hard to reproduce without knowing the exact prompt behind them.',
      '爆款 AI 照片风格很难复刻，因为不知道背后用的具体提示词。',
    ],
    audience: [
      'Social media users, content creators, and anyone editing photos with Gemini or ChatGPT.',
      '社交媒体用户、内容创作者，以及用 Gemini 或 ChatGPT 修图的普通用户。',
    ],
    pricing: [
      'Free with ads. The prompts are free to copy; image generation happens in the AI tool you paste them into.',
      '免费使用，含广告。提示词可免费复制，图片生成在你粘贴提示词的 AI 工具中完成。',
    ],
    market: [
      ['AI prompt libraries', 'AI 提示词库'],
      ['AI photo editing', 'AI 照片编辑'],
    ],
    tech: [
      ['Curated prompt catalog', '精选提示词目录'],
      [
        'Works with Gemini, ChatGPT, Midjourney',
        '适配 Gemini、ChatGPT、Midjourney',
      ],
    ],
    whatIs: [
      '“Prompt Seen” is both an Android app (Prompt Seen: AI Photo Prompts, 500K+ downloads) and a popular search term for the copy-and-paste prompts behind trending AI photo edits. The app does not generate images itself. It groups prompts into categories such as couple photos, profile pictures, 3D figurines, saree and traditional looks, realistic portraits, anime, vintage, wedding, and festival themes, and adds new trending prompts daily.',
      '“Prompt Seen”既是一款 Android App（Prompt Seen: AI Photo Prompts，下载量 50 万以上），也是大家搜索热门 AI 修图提示词时常用的关键词。这款 App 本身不生成图片，而是把提示词按情侣照、头像、3D 手办、纱丽与传统服饰、写实人像、动漫、复古、婚礼、节日等分类整理，并每天更新热门提示词。',
    ],
    steps: [
      [
        'Pick a style',
        '挑选风格',
        'Browse categories or search, and preview the result each prompt produces.',
        '浏览分类或搜索，查看每条提示词的效果预览。',
      ],
      [
        'Copy the prompt',
        '复制提示词',
        'Tap once to copy the full prompt, or save it to favorites for later.',
        '一键复制完整提示词，也可以收藏以后再用。',
      ],
      [
        'Generate in your AI tool',
        '在 AI 工具中生成',
        'Open Gemini, ChatGPT, or Midjourney, upload your photo, paste the prompt, and generate.',
        '打开 Gemini、ChatGPT 或 Midjourney，上传照片、粘贴提示词并生成。',
      ],
    ],
    features: [
      ['1,000+ AI photo prompts', '1000+ 条 AI 照片提示词'],
      ['HD preview for every prompt', '每条提示词都有高清预览'],
      ['One-tap copy', '一键复制'],
      ['Search and favorites', '搜索与收藏'],
      ['Daily trending updates, no login', '每日更新热门，无需登录'],
    ],
    bestFor: [
      ['Profile pictures and Instagram posts', '头像和 Instagram 帖子'],
      ['Couple, wedding, and festival photos', '情侣、婚礼和节日照片'],
      ['3D figurine and vintage photo trends', '3D 手办和复古照片潮流'],
    ],
    faqs: [
      [
        'What is Prompt Seen?',
        'Prompt Seen 是什么？',
        'A free prompt library app with ready-made AI photo prompts you copy into Gemini, ChatGPT, or Midjourney.',
        '一个免费的 AI 照片提示词库 App，复制里面的提示词到 Gemini、ChatGPT 或 Midjourney 即可使用。',
      ],
      [
        'Does Prompt Seen generate images?',
        'Prompt Seen 能直接生成图片吗？',
        'No. It only provides prompts and previews. You generate the image in an AI tool such as Gemini (Nano Banana).',
        '不能。它只提供提示词和效果预览，图片需要在 Gemini（Nano Banana）等 AI 工具中生成。',
      ],
      [
        'Is Prompt Seen free?',
        'Prompt Seen 免费吗？',
        'Yes. The Android app is free with ads and needs no login.',
        '免费。Android App 免费使用（含广告），无需登录。',
      ],
    ],
  }),
  tool({
    slug: 'cloudflare-clef',
    name: 'Cloudflare Clef',
    aliases: [
      'Clef',
      'Clef-flash',
      'Cloudflare Clef AI',
      'Clef decision model',
      'Cloudflare 决策模型',
    ],
    seoKeyword: 'Cloudflare Clef',
    maker: 'Cloudflare',
    website: 'https://developers.cloudflare.com/workers-ai/models/clef/',
    category: 'models',
    tone: 'amber',
    related: ['qwen-chat', 'mistral-large-4'],
    tags: [
      ['decision-model', 'Decision model', '决策模型'],
      ['open-source', 'Open source', '开源'],
      ['ai-agents', 'For AI agents', '面向 AI Agent'],
    ],
    tagline: [
      'Cloudflare’s open-source decision models: ask questions, get probability-scored answers your code can act on.',
      'Cloudflare 开源决策模型：提出问题，返回带概率的结构化答案，代码可直接据此行动。',
    ],
    description: [
      'Clef and Clef-flash are open-source (Apache 2.0) decision models from Cloudflare, launched on Workers AI on October 1, 2026. Instead of writing a paragraph, they return typed answers with probabilities: yes/no, pick one option, or a score. Agents and apps use them to route tickets, escalate risky cases, or decide the next step.',
      'Clef 和 Clef-flash 是 Cloudflare 于 2026 年 10 月 1 日在 Workers AI 上推出的开源决策模型（Apache 2.0 协议）。它们不输出大段文字，而是返回带概率的结构化答案：是/否、多选一或打分。Agent 和应用可以用它来分派工单、升级高风险情况或决定下一步操作。',
    ],
    note: [
      'Best for: fast classification and routing steps inside AI agent workflows',
      '适合：在 AI Agent 工作流中做快速分类和路由判断',
    ],
    value: [
      'Reliable, machine-readable decisions with confidence scores, faster and cheaper than asking a chat LLM.',
      '获得可直接被程序读取、带置信度的判断结果，比调用聊天大模型更快更便宜。',
    ],
    problem: [
      'Chat LLMs answer in free text, so turning them into dependable yes/no or routing decisions takes fragile parsing and prompt tricks.',
      '聊天大模型输出的是自由文本，想把它变成可靠的是/否或路由判断，需要脆弱的解析和提示词技巧。',
    ],
    audience: [
      'Developers building AI agents, support automation, moderation, or security triage on Cloudflare or any stack.',
      '构建 AI Agent、客服自动化、内容审核或安全分诊的开发者，无论是否使用 Cloudflare。',
    ],
    pricing: [
      'Pay as you go on Workers AI (about $0.24 per million input tokens). The weights are free on Hugging Face under Apache 2.0.',
      '在 Workers AI 上按量付费（输入约每百万 token 0.24 美元）。模型权重以 Apache 2.0 协议在 Hugging Face 免费开放。',
    ],
    market: [
      ['AI decision and classification models', 'AI 决策与分类模型'],
      ['AI agent infrastructure', 'AI Agent 基础设施'],
    ],
    tech: [
      [
        'Clef on Qwen3.8-27B, Clef-flash on Qwen3.5-9B',
        'Clef 基于 Qwen3.8-27B，Clef-flash 基于 Qwen3.5-9B',
      ],
      ['64K context window with image input', '64K 上下文，支持图片输入'],
      ['Workers AI: @cf/cloudflare/clef', 'Workers AI：@cf/cloudflare/clef'],
    ],
    whatIs: [
      'Cloudflare Clef is a family of two “decision models”. You send a state (text or JSON, plus up to four images) and up to 64 questions. Each question is a yes/no check, a choice between named options, or a score on an ordered scale, and Clef returns a probability for every answer. Clef is the higher-accuracy model (about 209 ms median latency), while Clef-flash targets latency-critical calls (about 39 ms). Cloudflare reports leading results on intent benchmarks such as BANKING77 and CLINC150, and Clef-flash scores 98.76 on the BFCL tool-calling benchmark.',
      'Cloudflare Clef 是由两个“决策模型”组成的模型系列。你传入一段状态（文本或 JSON，最多再加 4 张图片）和最多 64 个问题，每个问题可以是是/否判断、在几个命名选项中选择，或按有序等级打分，Clef 会为每个答案返回概率。Clef 是精度更高的版本（中位延迟约 209 毫秒），Clef-flash 则面向对延迟敏感的场景（约 39 毫秒）。Cloudflare 公布的数据显示，它在 BANKING77、CLINC150 等意图识别基准上领先，Clef-flash 在 BFCL 工具调用基准上得分 98.76。',
    ],
    steps: [
      [
        'Open Workers AI',
        '打开 Workers AI',
        'Use a Cloudflare account and call @cf/cloudflare/clef or @cf/cloudflare/clef-flash from a Worker or the REST API.',
        '使用 Cloudflare 账号，在 Worker 或 REST API 中调用 @cf/cloudflare/clef 或 @cf/cloudflare/clef-flash。',
      ],
      [
        'Describe the state and questions',
        '写好状态和问题',
        'Pass the ticket, order, or page as state, then define questions as noul (yes/no), choice, or score.',
        '把工单、订单或网页内容作为 state 传入，再把问题定义为 noul（是/否）、choice（选择）或 score（打分）。',
      ],
      [
        'Act on the probabilities',
        '根据概率执行',
        'Read the answers and their probabilities, then route, escalate, or defer to a human when confidence is low.',
        '读取答案和对应概率，据此分派、升级，或在置信度低时交给人工处理。',
      ],
    ],
    features: [
      ['Yes/no, choice, and score questions', '支持是/否、选择、打分三种问题'],
      ['Probability for every answer', '每个答案都带概率'],
      ['Up to 64 questions per call', '单次调用最多 64 个问题'],
      ['Image input (up to 4 images)', '支持图片输入（最多 4 张）'],
      ['Open weights under Apache 2.0', 'Apache 2.0 开放权重'],
    ],
    bestFor: [
      ['Support ticket triage and routing', '客服工单分诊与分派'],
      ['Agent next-step and escalation decisions', 'Agent 下一步与升级决策'],
      ['Moderation and security classification', '内容审核与安全分类'],
    ],
    faqs: [
      [
        'What is Cloudflare Clef?',
        'Cloudflare Clef 是什么？',
        'Clef is Cloudflare’s first open-source decision model family. It answers structured questions with probabilities instead of free text.',
        'Clef 是 Cloudflare 首个开源决策模型系列，用带概率的结构化答案而不是自由文本来回答问题。',
      ],
      [
        'What is the difference between Clef and Clef-flash?',
        'Clef 和 Clef-flash 有什么区别？',
        'Clef is the more accurate model with vision. Clef-flash is smaller and much faster for latency-critical decisions.',
        'Clef 精度更高、支持视觉；Clef-flash 更小，速度快得多，适合对延迟敏感的判断。',
      ],
      [
        'Is Cloudflare Clef free?',
        'Cloudflare Clef 免费吗？',
        'The weights are free on Hugging Face. Running it on Workers AI is billed per token, at about $0.24 per million input tokens.',
        '模型权重在 Hugging Face 上免费开放；在 Workers AI 上运行按 token 计费，输入约每百万 token 0.24 美元。',
      ],
    ],
  }),
  tool({
    slug: 'krea-2',
    name: 'Krea 2',
    aliases: ['Krea 2 AI', 'Krea2', 'K2', 'Krea 2 Turbo', 'Krea 2 Raw'],
    seoKeyword: 'Krea 2',
    maker: 'Krea',
    website: 'https://www.krea.ai/krea-2',
    category: 'models',
    tone: 'plum',
    related: ['krea-realtime', 'nano-banana-2-1', 'openart'],
    tags: [
      ['image-model', 'Image model', '图像模型'],
      ['style-reference', 'Style reference', '风格参考'],
      ['open-weights', 'Open weights', '开放权重'],
    ],
    tagline: [
      'Krea’s own aesthetic-first image model, with style references, moodboards, and open weights.',
      'Krea 自研的审美优先图像模型，支持风格参考图、情绪板，并开放权重。',
    ],
    description: [
      'Krea 2 (K2) is the first foundation image model Krea trained completely from scratch. It is built for aesthetics and creative control: you can guide a generation with one or more style reference images or a whole moodboard, set how strongly each reference applies, and choose how varied a batch should be. It runs in the Krea app in about 15 seconds per generation, and the weights are open on Hugging Face as Krea 2 RAW and Krea 2 Turbo.',
      'Krea 2（K2）是 Krea 首个完全从零训练的基础图像模型，主打审美和创作控制：可以用一张或多张风格参考图、甚至整个情绪板来引导生成，调节每张参考图的影响强度，并设置同一批结果之间的差异程度。在 Krea 应用中每次生成约 15 秒，模型权重也以 Krea 2 RAW 和 Krea 2 Turbo 两个版本在 Hugging Face 上开放。',
    ],
    note: ['Best for: style-driven image generation', '适合：按风格生成图像'],
    value: [
      'Transfer the look of your references, from grainy film to clean studio shots, instead of fighting prompts for a style.',
      '直接迁移参考图的风格，从颗粒感胶片到干净的棚拍都能还原，不用反复调提示词去凑风格。',
    ],
    problem: [
      'Many image models drift toward the same polished look and repeat one concept across a batch, which makes distinct styles hard to hit.',
      '很多图像模型生成的画面趋同，一批结果往往是同一构图的重复，很难做出鲜明的风格。',
    ],
    audience: [
      'Designers, art directors, illustrators, and creators building visual moodboards, plus developers who want an open image model to fine-tune.',
      '设计师、美术指导、插画师和做视觉情绪板的创作者，以及想要可微调开放图像模型的开发者。',
    ],
    pricing: [
      'Free to try in the Krea app, with paid Krea plans for more generations. The open weights are free to download under Krea’s community license; commercial licenses are available from Krea.',
      '可在 Krea 应用中免费试用，生成更多需订阅 Krea 付费套餐。开放权重可按 Krea 社区许可免费下载，商用授权可向 Krea 申请。',
    ],
    market: [
      ['Launched by Krea on May 12, 2026', 'Krea 于 2026 年 5 月 12 日发布'],
      [
        'Released with open weights and inference code',
        '同步开放权重与推理代码',
      ],
    ],
    tech: [
      ['Foundation image model trained from scratch', '从零训练的基础图像模型'],
      [
        'RAW base checkpoint (up to 1K) and 8-step Turbo (1K to 2K)',
        'RAW 基础版（最高 1K）与 8 步 Turbo 版（1K 到 2K）',
      ],
      [
        'Weights on Hugging Face: krea/krea-2-raw, krea/krea-2-turbo',
        'Hugging Face 权重：krea/krea-2-raw、krea/krea-2-turbo',
      ],
    ],
    whatIs: [
      'Krea 2 is an image generation model from Krea, the AI creative suite known for real-time generation. Unlike earlier Krea models, K2 was trained from scratch, with a focus on style transfer and variety. You can feed it reference images (Krea’s example uses 13) or a curated moodboard, tune how closely the output follows each reference, and widen or narrow the spread of palettes and styles across a batch. Krea also published two open checkpoints: RAW, the undistilled base model recommended for fine-tuning and LoRA training, and Turbo, an 8-step distilled model for fast generation at 1K to 2K resolution.',
      'Krea 2 是 Krea 推出的图像生成模型。Krea 是一个以实时生成著称的 AI 创作平台。和之前的 Krea 模型不同，K2 完全从零训练，重点在风格迁移和结果多样性。你可以上传参考图（官方示例用了 13 张）或整理好的情绪板，调节输出贴近每张参考图的程度，并控制一批结果在配色和风格上的差异大小。Krea 还开放了两个版本：RAW 是未蒸馏的基础模型，推荐用于微调和 LoRA 训练；Turbo 是 8 步蒸馏模型，可快速生成 1K 到 2K 分辨率的图片。',
    ],
    steps: [
      [
        'Open Krea 2 in Krea',
        '在 Krea 中打开 Krea 2',
        'Sign up at krea.ai and pick Krea 2 (or Krea 2 Turbo for faster iteration) in the image tool.',
        '在 krea.ai 注册后，在图像工具中选择 Krea 2（想更快迭代可选 Krea 2 Turbo）。',
      ],
      [
        'Add style references or a moodboard',
        '添加风格参考图或情绪板',
        'Upload reference images or choose a moodboard, then set how strongly each one should shape the result.',
        '上传参考图或选择情绪板，再设置每张参考图对结果的影响强度。',
      ],
      [
        'Prompt and tune variation',
        '输入提示词并调节差异度',
        'Write a prompt, generate a batch, and raise or lower variation to get a cohesive set or a wider range of looks.',
        '输入提示词生成一批图片，调高或调低差异度，得到风格统一的一组图或更多样的效果。',
      ],
    ],
    features: [
      ['Multiple style reference images', '支持多张风格参考图'],
      ['Moodboard-guided generation', '情绪板引导生成'],
      ['Per-reference strength control', '可单独调节每张参考图强度'],
      ['Batch variation control', '可控制批量结果的差异度'],
      ['Open weights (RAW and Turbo)', '开放权重（RAW 与 Turbo）'],
    ],
    bestFor: [
      ['Brand and campaign visuals in a set style', '统一风格的品牌与营销视觉'],
      ['Exploring art directions from a moodboard', '基于情绪板探索美术方向'],
      ['Fine-tuning a custom style with LoRA', '用 LoRA 微调自定义风格'],
    ],
    faqs: [
      [
        'What is Krea 2?',
        'Krea 2 是什么？',
        'Krea 2 (K2) is Krea’s first image model trained from scratch, focused on aesthetics, style references, and creative control.',
        'Krea 2（K2）是 Krea 首个从零训练的图像模型，主打审美、风格参考和创作控制。',
      ],
      [
        'Is Krea 2 open source?',
        'Krea 2 开源吗？',
        'Yes. The inference code is Apache 2.0 on GitHub, and the RAW and Turbo weights are on Hugging Face under Krea’s community license. Commercial licenses are available from Krea.',
        '是的。推理代码以 Apache 2.0 协议发布在 GitHub，RAW 和 Turbo 权重按 Krea 社区许可发布在 Hugging Face，商用授权可向 Krea 申请。',
      ],
      [
        'What is the difference between Krea 2 RAW and Turbo?',
        'Krea 2 RAW 和 Turbo 有什么区别？',
        'RAW is the undistilled base model for fine-tuning and LoRA training. Turbo is an 8-step distilled version for fast text-to-image generation, and LoRAs trained on RAW can be applied to it.',
        'RAW 是未蒸馏的基础模型，适合微调和 LoRA 训练；Turbo 是 8 步蒸馏版，用于快速文生图，在 RAW 上训练的 LoRA 可以直接用在 Turbo 上。',
      ],
      [
        'How is Krea 2 different from Krea Realtime?',
        'Krea 2 和 Krea Realtime 有什么不同？',
        'Krea Realtime renders frames live as you draw or prompt. Krea 2 is a still-image model built for higher-quality, style-controlled results in about 15 seconds.',
        'Krea Realtime 在你绘制或输入提示词时实时出图；Krea 2 是静态图像模型，约 15 秒生成一次，追求更高画质和风格可控的结果。',
      ],
    ],
  }),
];
