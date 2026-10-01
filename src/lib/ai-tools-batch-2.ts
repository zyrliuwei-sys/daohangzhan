import type { GeneralAiProduct } from '@/lib/general-ai-products';
import type { ProductCategory, ProductTone } from '@/lib/mock-ai-products';

// Second batch of general AI tools (2026-10-01 keyword report). Entries are
// written as compact tuples ([en, zh]) and expanded by `tool()` below.
type Pair = [en: string, zh: string];

interface CompactTool {
  slug: string;
  name: string;
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
    related: ['deepseek', 'qwen-chat'],
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
    maker: 'Turbo AI',
    website: 'https://www.turbo.ai',
    category: 'research',
    tone: 'amber',
    related: ['gemini-notebook'],
    tags: [
      ['study', 'Study', '学习'],
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
      'Turbo AI is an AI note taker and study assistant. Add a lecture, document, or video and it produces structured notes, flashcards, and practice quizzes.',
      'Turbo AI 是一款 AI 笔记和学习助手。添加课程录音、文档或视频，它就会生成结构化笔记、抽认卡和练习测验。',
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
    maker: 'OpenArt',
    website: 'https://openart.ai',
    category: 'models',
    tone: 'coral',
    related: ['leonardo-ai', 'raphael-ai'],
    tags: [
      ['ai-art', 'AI art', 'AI 艺术'],
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
      'OpenArt AI is an online AI art generator. Choose from more than 100 models to create images, turn them into videos, or generate music, all in the browser.',
      'OpenArt AI 是一款在线 AI 艺术生成器。可以从 100 多个模型中选择来生成图像、把图像做成视频或生成音乐，全部在浏览器中完成。',
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
];
