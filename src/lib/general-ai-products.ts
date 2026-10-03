import type {
  LocalizedProductProfile,
  MockAiProduct,
  ProductSeoContent,
} from '@/lib/mock-ai-products';

// General-purpose AI tools (assistants, research, image, coding, audio,
// writing). Category labels are attached in mock-ai-products.ts so this file
// only imports types and never creates a runtime import cycle.
export type GeneralAiProduct = Omit<MockAiProduct, 'categoryLabel'>;

type LocalizedText = { en: string; zh: string };

const VERIFIED_AT = '2026-10-01';

function text(en: string, zh: string): LocalizedText {
  return { en, zh };
}

function tag(key: string, en: string, zh: string) {
  return { key, label: text(en, zh) };
}

function step(titleEn: string, titleZh: string, en: string, zh: string) {
  return { title: text(titleEn, titleZh), description: text(en, zh) };
}

function faq(qEn: string, qZh: string, aEn: string, aZh: string) {
  return { question: text(qEn, qZh), answer: text(aEn, aZh) };
}

function profile(
  valueProposition: LocalizedText,
  problemSolved: LocalizedText,
  audience: LocalizedText,
  pricing: LocalizedText,
  market: LocalizedText[],
  techStack: LocalizedText[]
): LocalizedProductProfile {
  return {
    valueProposition,
    problemSolved,
    audience,
    pricing,
    market,
    techStack,
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

const shared = {
  sourceType: 'website' as const,
  lastVerifiedAt: VERIFIED_AT,
  image: '',
};

export const generalAiProducts: GeneralAiProduct[] = [
  {
    ...shared,
    slug: 'higgsfield',
    name: 'Higgsfield',
    maker: 'Higgsfield AI',
    website: 'https://higgsfield.ai',
    category: 'text-to-video',
    tone: 'coral',
    relatedSlugs: ['kling-ai', 'luma-ai'],
    tags: [
      tag('ai-video', 'AI video', 'AI 视频'),
      tag('image-generation', 'Image generation', '图像生成'),
      tag('multi-model', 'Multi-model studio', '多模型工作台'),
    ],
    tagline: text(
      'Leading video, image, and voice models in one creative workspace.',
      '主流视频、图像和语音模型集中在一个创作工作台。'
    ),
    description: text(
      'Higgsfield is an AI-native creative suite for generating videos, images, and voice from prompts or reference media. It bundles third-party models such as Seedance and Nano Banana alongside its own tools, including Cinema Studio for directed shots and Genjutsu for restyling existing footage.',
      'Higgsfield 是一个 AI 原生创作套件，可以根据提示词或参考素材生成视频、图像和语音。它集成了 Seedance、Nano Banana 等第三方模型，也有自己的工具，例如用于镜头调度的 Cinema Studio 和用于视频风格重绘的 Genjutsu。'
    ),
    note: text(
      'Best for: trying several top video models without switching apps',
      '适合：不切换应用就能对比多个顶级视频模型'
    ),
    profile: profile(
      text(
        'One account gives access to many image and video models plus camera-control and restyling tools.',
        '一个账号即可使用多种图像和视频模型，以及镜头控制和风格重绘工具。'
      ),
      text(
        'Creators otherwise juggle separate subscriptions and interfaces for each model.',
        '否则创作者需要为每个模型分别订阅、分别学习界面。'
      ),
      text(
        'Social video creators, marketers, and small creative teams.',
        '短视频创作者、营销人员和小型创意团队。'
      ),
      text(
        'Free sign-up with paid credit plans. Check the official pricing page for current credits and model access.',
        '可免费注册，生成按积分套餐计费。当前积分与可用模型以官网定价页为准。'
      ),
      [text('AI video', 'AI 视频'), text('Creator tools', '创作者工具')],
      [
        text('Hosted multi-model platform', '托管式多模型平台'),
        text('Web and mobile apps', '网页与移动端'),
      ]
    ),
    seo: seo(
      text(
        'Higgsfield AI is a hosted creative platform for AI video and image generation. Instead of training one model, it gives you a single interface to multiple leading models, then adds its own tools for camera moves, cinematic shots, and restyling footage. Searches for “higgsfield ai” usually come from creators chasing viral video formats.',
        'Higgsfield AI 是一个托管式 AI 视频和图像创作平台。它不只依赖单一模型，而是在一个界面里接入多个主流模型，并加上自己的运镜、电影镜头和视频重绘工具。搜索“higgsfield ai”的多是追热门视频玩法的创作者。'
      ),
      [
        step(
          'Pick a tool',
          '选择工具',
          'Choose video, image, or a specific studio such as Cinema Studio.',
          '选择视频、图像，或 Cinema Studio 等专用工作台。'
        ),
        step(
          'Add a prompt or reference',
          '输入提示词或参考素材',
          'Describe the shot or upload an image to animate.',
          '描述想要的镜头，或上传图片让它动起来。'
        ),
        step(
          'Generate and iterate',
          '生成并迭代',
          'Compare outputs from different models and re-run with adjusted settings.',
          '对比不同模型的结果，调整参数后重新生成。'
        ),
      ],
      [
        text(
          'Multiple video and image models in one place',
          '一个地方使用多个视频与图像模型'
        ),
        text(
          'Cinema Studio for directed camera shots',
          'Cinema Studio 镜头调度'
        ),
        text('Genjutsu video restyling', 'Genjutsu 视频风格重绘'),
        text('Web and mobile access', '网页和移动端均可使用'),
      ],
      [
        text('Viral short-form video trends', '短视频热门玩法'),
        text('Comparing video models side by side', '横向对比视频模型'),
        text('Ad and social creatives', '广告和社媒素材'),
      ],
      [
        faq(
          'Is Higgsfield free?',
          'Higgsfield 免费吗？',
          'You can sign up for free, but most generations use paid credits. Check the pricing page for current limits.',
          '可以免费注册，但大部分生成需要消耗付费积分，具体额度以官网定价页为准。'
        ),
        faq(
          'Does Higgsfield make its own models?',
          'Higgsfield 有自己的模型吗？',
          'It combines third-party models with its own tools and studios, so the model you use depends on the feature you pick.',
          '它把第三方模型和自研工具结合在一起，实际使用的模型取决于你选择的功能。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'kling-ai',
    name: 'Kling AI',
    maker: 'Kuaishou',
    website: 'https://klingai.com',
    category: 'text-to-video',
    tone: 'cobalt',
    relatedSlugs: ['higgsfield', 'luma-ai'],
    tags: [
      tag('text-to-video', 'Text to video', '文生视频'),
      tag('image-to-video', 'Image to video', '图生视频'),
      tag('ai-image', 'AI image', 'AI 图像'),
    ],
    tagline: text(
      'Kuaishou’s video and image generation platform, built around the Kling model family.',
      '快手推出的视频与图像生成平台，核心是可灵系列模型。'
    ),
    description: text(
      'Kling AI generates video and images from text or reference images. The current lineup includes Kling 4.0 for video and Kling Image 3.0 for stills, plus a Canvas workspace with an AI agent and MCP/CLI tools for batch production.',
      'Kling AI（可灵）可以根据文字或参考图生成视频和图像。当前产品线包括视频模型可灵 4.0、图像模型 Kling Image 3.0，还有带 AI Agent 的 Canvas 画布，以及用于批量生产的 MCP/CLI 工具。'
    ),
    note: text(
      'Best for: high-quality text-to-video and image-to-video clips',
      '适合：生成高质量的文生视频和图生视频片段'
    ),
    profile: profile(
      text(
        'A frontier video model with a full production workspace around it.',
        '一流的视频模型，加上一整套创作工作区。'
      ),
      text(
        'Turning a still image or idea into a convincing motion clip usually needs filming or animation skills.',
        '把一张图或一个想法变成真实可信的动态画面，通常需要拍摄或动画技能。'
      ),
      text(
        'Content creators, advertisers, film and music-video teams, and e-commerce sellers.',
        '内容创作者、广告、影视与 MV 团队，以及电商卖家。'
      ),
      text(
        'Credit-based plans on the web app; API pricing is listed on the developer platform.',
        '网页端按积分套餐计费；API 价格见开发者平台。'
      ),
      [text('AI video', 'AI 视频'), text('Advertising', '广告制作')],
      [
        text('Kling video models', '可灵视频模型'),
        text('Canvas with AI agent', '带 AI Agent 的画布'),
        text('MCP / CLI batch tools', 'MCP / CLI 批量工具'),
      ]
    ),
    seo: seo(
      text(
        'Kling AI is Kuaishou’s generative video and image platform. You write a prompt or upload a reference image and Kling renders a short video clip, with controls for motion, camera, and aspect ratio. Recent versions such as Kling 4.0 focus on realism and longer, more consistent shots.',
        'Kling AI（可灵）是快手的生成式视频和图像平台。输入提示词或上传参考图，可灵就会生成短视频片段，并可控制动作、镜头和画面比例。可灵 4.0 等新版本主打更真实、更长、更连贯的镜头。'
      ),
      [
        step(
          'Choose text or image to video',
          '选择文生或图生视频',
          'Start from a prompt, or upload a still image as the first frame.',
          '从提示词开始，或上传一张图片作为首帧。'
        ),
        step(
          'Set motion and camera',
          '设置动作与镜头',
          'Describe the action and camera move, and pick duration and ratio.',
          '描述动作和运镜，选择时长与画面比例。'
        ),
        step(
          'Refine in Canvas',
          '在 Canvas 中打磨',
          'Organize shots in Canvas or batch-generate variants with the CLI.',
          '在 Canvas 中整理镜头，或用 CLI 批量生成多个版本。'
        ),
      ],
      [
        text('Kling 4.0 video generation', '可灵 4.0 视频生成'),
        text(
          'Kling Image 3.0 with native 4K output',
          'Kling Image 3.0 原生 4K 输出'
        ),
        text(
          'Canvas workspace with an AI agent',
          '带 AI Agent 的 Canvas 工作区'
        ),
        text('MCP and CLI for batch jobs', '支持 MCP 与 CLI 批量任务'),
      ],
      [
        text('Product and ad videos', '产品与广告视频'),
        text('Animating still images', '让静态图片动起来'),
        text('Music videos and short films', 'MV 与短片'),
      ],
      [
        faq(
          'Who makes Kling AI?',
          'Kling AI 是谁做的？',
          'Kling is developed by Kuaishou, the Chinese short-video company.',
          '可灵由中国短视频公司快手开发。'
        ),
        faq(
          'Is Kling 4.0 available to everyone?',
          '可灵 4.0 所有人都能用吗？',
          'Availability and credit cost vary by plan and region. Check klingai.com for current access.',
          '可用性和积分消耗因套餐和地区而异，以 klingai.com 当前说明为准。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'luma-ai',
    name: 'Luma AI',
    maker: 'Luma AI',
    website: 'https://lumalabs.ai',
    category: 'text-to-video',
    tone: 'plum',
    relatedSlugs: ['kling-ai', 'higgsfield'],
    tags: [
      tag('ai-video', 'AI video', 'AI 视频'),
      tag('creative-agents', 'Creative agents', '创意 Agent'),
      tag('brand-assets', 'Brand assets', '品牌素材'),
    ],
    tagline: text(
      'Create video and images with Luma’s own Ray and Uni models.',
      '用 Luma 自研的 Ray 和 Uni 模型创作视频和图像。'
    ),
    description: text(
      'Luma AI builds its own generation models and ships them in a creative platform. Ray 3.2 handles directed video with continuity across cuts, Uni-1 generates brand-consistent images, and Luma Agents research, generate, and refine assets across video, image, audio, and text.',
      'Luma AI 自研生成模型，并把它们放进一个创作平台。Ray 3.2 负责可调度、跨镜头连贯的视频生成，Uni-1 负责保持品牌一致性的图像生成，Luma Agents 则可以跨视频、图像、音频和文字完成调研、生成和修改。'
    ),
    note: text(
      'Best for: brand-consistent video and image campaigns',
      '适合：需要保持品牌一致性的视频和图像项目'
    ),
    profile: profile(
      text(
        'Frontier video quality plus agents that produce many on-brand variants quickly.',
        '一流的视频质量，加上能快速产出大量品牌一致版本的 Agent。'
      ),
      text(
        'Creative teams need many variants of the same idea without losing brand style.',
        '创意团队需要同一个创意的大量变体，同时不能丢掉品牌风格。'
      ),
      text(
        'Agencies, brands, and creative teams.',
        '广告代理、品牌方和创意团队。'
      ),
      text(
        'Free to try with paid plans; an API is available for Ray and Uni.',
        '可免费试用，另有付费套餐；Ray 与 Uni 提供 API。'
      ),
      [text('AI video', 'AI 视频'), text('Brand marketing', '品牌营销')],
      [
        text('Ray video models', 'Ray 视频模型'),
        text('Uni image models', 'Uni 图像模型'),
        text('Luma Agents', 'Luma Agents'),
      ]
    ),
    seo: seo(
      text(
        'Luma AI is a creative AI company and platform. It trains its own video model, Ray, and image model, Uni, and wraps them in agents that handle end-to-end creative work such as hero shots, paid-social variants, and teaser cuts. It is also known for viral formats like the AI hug video.',
        'Luma AI 是一家创意 AI 公司，也是一个创作平台。它自研视频模型 Ray 和图像模型 Uni，并通过 Agent 完成主视觉、社媒广告变体、预告剪辑等完整创作流程。它也因为“AI 拥抱视频”等爆款玩法广为人知。'
      ),
      [
        step(
          'Describe the deliverable',
          '描述要交付的内容',
          'Tell Luma what you need, such as hero shots or social variants.',
          '告诉 Luma 你需要什么，比如主视觉或社媒广告变体。'
        ),
        step(
          'Add brand references',
          '加入品牌参考',
          'Upload style and character references so outputs stay on brand.',
          '上传风格和角色参考，让输出保持品牌一致。'
        ),
        step(
          'Direct and finish',
          '调度并完成',
          'Adjust frames and cuts with Ray, then export the finished assets.',
          '用 Ray 调整画面和剪辑，然后导出成品。'
        ),
      ],
      [
        text('Ray 3.2 directed video generation', 'Ray 3.2 可调度视频生成'),
        text('Uni-1 brand-aware image generation', 'Uni-1 品牌感知图像生成'),
        text(
          'Luma Agents for end-to-end workflows',
          'Luma Agents 端到端工作流'
        ),
        text('API access to models', '模型 API 接入'),
      ],
      [
        text('Ad campaigns with many variants', '需要大量变体的广告投放'),
        text('Cinematic short clips', '电影感短片'),
        text('Viral video effects', '爆款视频特效'),
      ],
      [
        faq(
          'Is Luma AI free?',
          'Luma AI 免费吗？',
          'Luma offers a free way to try it, with paid plans for heavier use.',
          'Luma 可以免费试用，高频使用需要付费套餐。'
        ),
        faq(
          'What is Ray?',
          'Ray 是什么？',
          'Ray is Luma’s video generation model family; Ray 3.2 is the current version shown on its site.',
          'Ray 是 Luma 的视频生成模型系列，官网当前展示的是 Ray 3.2。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'vozo-ai',
    name: 'Vozo AI',
    maker: 'Vozo',
    website: 'https://www.vozo.ai',
    category: 'video-editing',
    tone: 'moss',
    tags: [
      tag('video-translation', 'Video translation', '视频翻译'),
      tag('ai-dubbing', 'AI dubbing', 'AI 配音'),
      tag('lip-sync', 'Lip sync', '口型同步'),
    ],
    tagline: text(
      'Translate, dub, and lip-sync videos into 160+ languages.',
      '把视频翻译、配音并对口型到 160 多种语言。'
    ),
    description: text(
      'Vozo is an AI video translator. It dubs speech with voice modes that either keep the original tone (VoiceREAL) or sound native (VoiceNATIVE), syncs lips to the new audio, translates subtitles, and even translates on-screen text while keeping the layout.',
      'Vozo 是一款 AI 视频翻译工具。它可以用两种配音模式给视频配音：保留原声音色的 VoiceREAL，或更像母语者的 VoiceNATIVE；还能让口型匹配新音频、翻译字幕，甚至在保留版式的同时翻译画面里的文字。'
    ),
    note: text(
      'Best for: localizing existing videos for new markets',
      '适合：把已有视频本地化到新市场'
    ),
    profile: profile(
      text(
        'One upload produces dubbed, lip-synced versions in many languages.',
        '上传一次，就能得到多种语言的配音和对口型版本。'
      ),
      text(
        'Manual dubbing and subtitling for every market is slow and expensive.',
        '为每个市场人工配音、做字幕既慢又贵。'
      ),
      text(
        'Creators, marketers, educators, e-commerce and drama studios.',
        '创作者、营销人员、教育者、电商和短剧团队。'
      ),
      text(
        'Free to start; paid and enterprise plans on the official site.',
        '可免费开始，付费与企业套餐见官网。'
      ),
      [text('Localization', '本地化'), text('AI video', 'AI 视频')],
      [
        text('VoiceREAL / VoiceNATIVE dubbing', 'VoiceREAL / VoiceNATIVE 配音'),
        text('Lip-sync model', '口型同步模型'),
        text('Visual Translate', '画面文字翻译'),
      ]
    ),
    seo: seo(
      text(
        'Vozo AI translates whole videos rather than just subtitles. It transcribes speech, translates it, generates a dubbed voice, matches lip movement, and can replace on-screen text, so a single video can be published in 160+ languages.',
        'Vozo AI 翻译的是整条视频，而不只是字幕。它会转写语音、翻译、生成配音、匹配口型，还能替换画面中的文字，让一条视频可以发布成 160 多种语言版本。'
      ),
      [
        step(
          'Upload a video',
          '上传视频',
          'Upload the original video or paste a link.',
          '上传原视频或粘贴链接。'
        ),
        step(
          'Choose languages and voice',
          '选择语言和声音',
          'Pick target languages and VoiceREAL or VoiceNATIVE.',
          '选择目标语言，以及 VoiceREAL 或 VoiceNATIVE 模式。'
        ),
        step(
          'Review and export',
          '检查并导出',
          'Edit the transcript if needed, then export with lip sync and subtitles.',
          '必要时修改译文，然后导出带口型同步和字幕的视频。'
        ),
      ],
      [
        text('Dubbing in 160+ languages', '160 多种语言配音'),
        text('Lip-sync to translated audio', '按译文音频同步口型'),
        text('Subtitle translation', '字幕翻译'),
        text('On-screen text translation', '画面文字翻译'),
      ],
      [
        text('YouTube and social localization', 'YouTube 与社媒本地化'),
        text('Short-drama distribution', '短剧出海'),
        text('Training and course videos', '培训与课程视频'),
      ],
      [
        faq(
          'Does Vozo keep my voice?',
          'Vozo 能保留我的声音吗？',
          'Yes. VoiceREAL is designed to keep the original speaker’s tone in the new language.',
          '可以。VoiceREAL 模式会在新语言里保留原说话人的音色。'
        ),
        faq(
          'Is there a free plan?',
          '有免费版吗？',
          'You can start for free; longer videos and more languages need a paid plan.',
          '可以免费开始，较长视频和更多语言需要付费套餐。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'manus',
    name: 'Manus',
    maker: 'Manus',
    website: 'https://manus.im',
    category: 'assistant',
    tone: 'amber',
    relatedSlugs: ['perplexity', 'cue-by-manus'],
    tags: [
      tag('ai-agent', 'AI agent', 'AI Agent'),
      tag('slides', 'Slides', '幻灯片'),
      tag('websites', 'Websites', '网站'),
    ],
    tagline: text(
      'A general AI agent that delivers finished slides, sites, and research.',
      '通用 AI Agent，直接交付做好的幻灯片、网站和调研。'
    ),
    description: text(
      'Manus is a general-purpose AI agent. Instead of answering in chat, it plans and executes multi-step tasks: building slides and websites, researching in its own browser, and generating images, music, and video. Manus 2.0 is the current major version.',
      'Manus 是一个通用 AI Agent。它不只是在对话框里回答，而是规划并执行多步任务：做幻灯片和网站、用自带浏览器做调研，以及生成图片、音乐和视频。当前主要版本是 Manus 2.0。'
    ),
    note: text(
      'Best for: delegating whole tasks instead of single prompts',
      '适合：把一整件事交给 AI，而不是一问一答'
    ),
    profile: profile(
      text(
        'You describe the outcome; Manus does the steps and hands back a deliverable.',
        '你描述想要的结果，Manus 自己完成各个步骤并交付成品。'
      ),
      text(
        'Chatbots answer questions but leave the actual work, such as building and formatting, to you.',
        '聊天机器人能回答问题，但搭建、排版这些实际工作仍要你自己做。'
      ),
      text(
        'Knowledge workers, founders, and marketers.',
        '知识工作者、创业者和营销人员。'
      ),
      text(
        'Free tier with paid plans; see manus.im/pricing for current credits.',
        '有免费额度和付费套餐，当前积分以 manus.im/pricing 为准。'
      ),
      [text('AI agents', 'AI Agent'), text('Productivity', '效率工具')],
      [
        text('Autonomous task planning', '自主任务规划'),
        text('Built-in browser operator', '内置浏览器操作'),
      ]
    ),
    seo: seo(
      text(
        'Manus AI is an autonomous agent that completes tasks end to end. Ask for a pitch deck, a landing page, or a market report, and it breaks the job into steps, browses the web, writes, designs, and returns the finished file or site.',
        'Manus AI 是一个能端到端完成任务的自主 Agent。让它做一份融资 PPT、一个落地页或一份市场报告，它会拆分步骤、上网查资料、撰写、设计，最后交付成品文件或网站。'
      ),
      [
        step(
          'Describe the task',
          '描述任务',
          'Write what you want delivered, with any files or links.',
          '写下想要的成果，并附上相关文件或链接。'
        ),
        step(
          'Let it work',
          '让它执行',
          'Manus plans steps and shows progress as it browses and builds.',
          'Manus 会规划步骤，并在浏览和搭建时展示进度。'
        ),
        step(
          'Review the result',
          '检查结果',
          'Open the deck, site, or report and ask for revisions.',
          '打开 PPT、网站或报告，提出修改意见。'
        ),
      ],
      [
        text('Slides and website generation', '生成幻灯片和网站'),
        text('Browser operator for research', '用浏览器操作做调研'),
        text('Image, music, and video tools', '图像、音乐和视频工具'),
        text('Multi-step autonomous execution', '多步骤自主执行'),
      ],
      [
        text('Research reports', '调研报告'),
        text('Pitch decks and presentations', '融资 PPT 与演示文稿'),
        text('Quick landing pages', '快速搭建落地页'),
      ],
      [
        faq(
          'What is new in Manus 2.0?',
          'Manus 2.0 有什么新变化？',
          'Manus 2.0 is the current major release highlighted on the official site; check its announcement for the full change list.',
          'Manus 2.0 是官网主推的当前大版本，完整更新内容请看官方公告。'
        ),
        faq(
          'Is Manus free?',
          'Manus 免费吗？',
          'There is a free way to try it, with paid plans for more tasks.',
          '可以免费试用，更多任务需要付费套餐。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'perplexity',
    name: 'Perplexity',
    maker: 'Perplexity AI',
    website: 'https://www.perplexity.ai',
    category: 'assistant',
    tone: 'cobalt',
    relatedSlugs: ['gemini-notebook', 'consensus'],
    tags: [
      tag('ai-search', 'AI search', 'AI 搜索'),
      tag('citations', 'Cited answers', '带引用回答'),
      tag('research', 'Research', '调研'),
    ],
    tagline: text(
      'An AI answer engine that searches the web and cites its sources.',
      '会上网搜索并标注来源的 AI 答案引擎。'
    ),
    description: text(
      'Perplexity answers questions by searching the live web and writing a summary with numbered citations. Follow-up questions keep context, and deeper research modes compile longer reports. It is available on the web, mobile, and desktop.',
      'Perplexity 会实时搜索网络来回答问题，并给出带编号引用的总结。追问时会保留上下文，深度研究模式可以整理出更长的报告。支持网页、手机和桌面端。'
    ),
    note: text(
      'Best for: quick answers you can verify against sources',
      '适合：需要能对照来源核实的快速答案'
    ),
    profile: profile(
      text(
        'Search and summarization in one step, with sources attached.',
        '搜索和总结一步完成，并附上来源。'
      ),
      text(
        'Classic search returns links you still have to read; chatbots may answer without sources.',
        '传统搜索只给链接，还得自己读；普通聊天机器人的回答又常常没有来源。'
      ),
      text(
        'Students, researchers, analysts, and curious readers.',
        '学生、研究者、分析师和爱查资料的人。'
      ),
      text(
        'Free to use, with a paid Pro tier for heavier research. See the official site for current pricing.',
        '可免费使用，深度使用可订阅 Pro，价格以官网为准。'
      ),
      [text('AI search', 'AI 搜索'), text('Research', '调研')],
      [
        text('Live web retrieval', '实时网页检索'),
        text('Multiple LLMs', '多种大模型'),
      ]
    ),
    seo: seo(
      text(
        'Perplexity AI is an AI-powered search engine. Each answer is generated from pages it retrieves in real time and links back to them, which makes it easier to check facts than a plain chatbot.',
        'Perplexity AI 是一个 AI 搜索引擎。每个回答都基于实时检索到的网页生成，并链接回原文，比普通聊天机器人更方便核实。'
      ),
      [
        step(
          'Ask a question',
          '提问',
          'Type a question in natural language.',
          '用自然语言输入问题。'
        ),
        step(
          'Check the sources',
          '查看来源',
          'Open the numbered citations to verify key claims.',
          '打开编号引用，核实关键信息。'
        ),
        step(
          'Go deeper',
          '深入追问',
          'Ask follow-ups or switch to a research mode for a full report.',
          '继续追问，或切换到研究模式生成完整报告。'
        ),
      ],
      [
        text('Real-time web search', '实时网络搜索'),
        text('Inline citations', '行内引用'),
        text('Follow-up conversations', '连续追问'),
        text('Deep research reports', '深度研究报告'),
      ],
      [
        text('Fact-checking and quick research', '事实核查与快速调研'),
        text('Comparing products', '产品对比'),
        text('Learning a new topic', '学习新领域'),
      ],
      [
        faq(
          'Is Perplexity better than Google?',
          'Perplexity 比 Google 好用吗？',
          'It is faster for summarized answers with sources; Google is still better for navigating to a specific site.',
          '想要带来源的总结答案时更快；想直达某个网站时 Google 仍更合适。'
        ),
        faq(
          'Can I use Perplexity for free?',
          'Perplexity 可以免费用吗？',
          'Yes. The free tier covers everyday searches; Pro adds more advanced searches and models.',
          '可以。免费版足够日常搜索，Pro 提供更多高级搜索和模型。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'gemini-notebook',
    name: 'Gemini Notebook (NotebookLM)',
    maker: 'Google',
    website: 'https://notebook.google',
    category: 'research',
    tone: 'moss',
    relatedSlugs: ['consensus', 'perplexity'],
    tags: [
      tag('notebooklm', 'NotebookLM', 'NotebookLM'),
      tag('source-grounded', 'Source-grounded', '基于资料回答'),
      tag('study', 'Study', '学习'),
    ],
    tagline: text(
      'Google’s AI research notebook that answers from the sources you upload.',
      'Google 的 AI 研究笔记本，只根据你上传的资料回答。'
    ),
    description: text(
      'Gemini Notebook, formerly known as NotebookLM (notebooklm.google now redirects here), is Google’s AI research tool and thinking partner. You add your own sources and it analyzes them, answers questions grounded in them, and transforms the material into new formats.',
      'Gemini Notebook 就是原来的 NotebookLM（notebooklm.google 现在会跳转到这里），是 Google 的 AI 研究工具和思考伙伴。你添加自己的资料，它会分析内容、基于资料回答问题，并把资料转换成新的形式。'
    ),
    note: text(
      'Best for: studying and researching from your own documents',
      '适合：基于自己的文档学习和做研究'
    ),
    profile: profile(
      text(
        'Answers stay grounded in your sources instead of the open web.',
        '回答基于你提供的资料，而不是整个互联网。'
      ),
      text(
        'Reading and synthesizing many long documents takes hours.',
        '阅读并梳理大量长文档要花好几个小时。'
      ),
      text(
        'Students, researchers, writers, and teams.',
        '学生、研究者、写作者和团队。'
      ),
      text(
        'Available with a Google account; higher limits come with Google’s paid AI plans.',
        '用 Google 账号即可使用，更高额度包含在 Google 付费 AI 套餐中。'
      ),
      [text('Research', '研究'), text('Education', '教育')],
      [
        text('Gemini models', 'Gemini 模型'),
        text('Source-grounded RAG', '基于资料的检索增强'),
      ]
    ),
    seo: seo(
      text(
        'NotebookLM, now presented as Gemini Notebook, lets you build a notebook from your own sources and chat with them. Because answers are grounded in what you upload, it is popular for studying, literature reviews, and turning dense material into summaries and overviews.',
        'NotebookLM 现在以 Gemini Notebook 的名字出现。你可以用自己的资料建一个笔记本，然后和资料对话。因为回答基于你上传的内容，它很适合备考、做文献综述，以及把复杂材料整理成摘要和概览。'
      ),
      [
        step(
          'Create a notebook',
          '新建笔记本',
          'Sign in with Google and start a new notebook.',
          '用 Google 账号登录并新建笔记本。'
        ),
        step(
          'Add sources',
          '添加资料',
          'Upload documents or add links you want it to work from.',
          '上传文档或添加链接作为资料来源。'
        ),
        step(
          'Ask and transform',
          '提问并转换',
          'Ask questions, then turn the material into summaries or other formats.',
          '提出问题，再把资料转换成摘要等形式。'
        ),
      ],
      [
        text('Answers grounded in your sources', '基于你的资料回答'),
        text('Summaries of long documents', '长文档摘要'),
        text('Transforms content into new formats', '把内容转换成新形式'),
        text('Powered by Gemini', '由 Gemini 驱动'),
      ],
      [
        text('Exam and course prep', '备考与课程学习'),
        text('Literature reviews', '文献综述'),
        text('Briefing documents for teams', '团队简报'),
      ],
      [
        faq(
          'Is NotebookLM the same as Gemini Notebook?',
          'NotebookLM 和 Gemini Notebook 是同一个产品吗？',
          'notebooklm.google now redirects to notebook.google, which presents the product as Gemini Notebook.',
          'notebooklm.google 现在会跳转到 notebook.google，产品在那里以 Gemini Notebook 的名字出现。'
        ),
        faq(
          'Does it use the internet to answer?',
          '它会用网上的信息回答吗？',
          'Its core strength is answering from the sources you add, which keeps responses focused and traceable.',
          '它的核心优势是根据你添加的资料回答，让回答更聚焦、可追溯。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'consensus',
    name: 'Consensus',
    maker: 'Consensus',
    website: 'https://consensus.app',
    category: 'research',
    tone: 'cobalt',
    relatedSlugs: ['gemini-notebook', 'perplexity'],
    tags: [
      tag('academic-search', 'Academic search', '学术搜索'),
      tag('papers', 'Scientific papers', '科学论文'),
      tag('evidence', 'Evidence summaries', '证据总结'),
    ],
    tagline: text(
      'An AI search engine that answers from 220M+ peer-reviewed papers.',
      '基于 2.2 亿多篇同行评审论文回答问题的 AI 搜索引擎。'
    ),
    description: text(
      'Consensus searches scientific literature instead of the open web. Its Pro and Deep Search modes synthesize answers from papers, the Consensus Meter shows how much research agrees on yes/no questions, and Study Snapshots surface key findings.',
      'Consensus 搜索的是学术文献，而不是整个互联网。Pro Search 和 Deep Search 会综合论文给出答案，Consensus Meter 显示研究对“是/否”类问题的一致程度，Study Snapshots 则提炼每篇论文的关键发现。'
    ),
    note: text(
      'Best for: evidence-based answers backed by research papers',
      '适合：需要论文支撑的循证答案'
    ),
    profile: profile(
      text(
        'Find what the research says without reading dozens of abstracts.',
        '不用读几十篇摘要，也能知道研究结论是什么。'
      ),
      text(
        'General AI chat can cite weak or invented sources for scientific claims.',
        '通用 AI 聊天在科学问题上可能引用不可靠甚至编造的来源。'
      ),
      text(
        'Students, researchers, clinicians, and writers.',
        '学生、研究人员、医疗从业者和写作者。'
      ),
      text(
        'Free to use with paid tiers for advanced searches.',
        '可免费使用，高级搜索需要付费。'
      ),
      [text('Academic research', '学术研究'), text('Education', '教育')],
      [
        text('220M+ paper index', '2.2 亿+论文索引'),
        text('LLM synthesis', '大模型综合'),
      ]
    ),
    seo: seo(
      text(
        'Consensus AI is an academic search engine. Ask a research question and it retrieves relevant peer-reviewed studies, summarizes what they found, and indicates how strongly the evidence agrees.',
        'Consensus AI 是一个学术搜索引擎。提出研究问题后，它会检索相关的同行评审研究，总结研究发现，并标出证据的一致程度。'
      ),
      [
        step(
          'Ask a research question',
          '提出研究问题',
          'Phrase it clearly, e.g. “Does creatine improve memory?”',
          '清楚地提问，例如“肌酸能改善记忆吗？”'
        ),
        step(
          'Read the synthesis',
          '阅读综合结论',
          'Review the AI summary and the Consensus Meter.',
          '查看 AI 总结和 Consensus Meter。'
        ),
        step(
          'Open the papers',
          '打开论文',
          'Use Study Snapshots and chat with individual papers.',
          '用 Study Snapshots 快速浏览，并可与单篇论文对话。'
        ),
      ],
      [
        text('Search across 220M+ papers', '检索 2.2 亿多篇论文'),
        text(
          'Consensus Meter for yes/no questions',
          '针对是/否问题的 Consensus Meter'
        ),
        text('Chat with individual papers', '与单篇论文对话'),
        text('Collections to organize research', '用 Collections 整理研究'),
      ],
      [
        text('Literature searches', '文献检索'),
        text('Health and science questions', '健康与科学问题'),
        text('Citing evidence in essays', '论文写作中的证据引用'),
      ],
      [
        faq(
          'Is Consensus free?',
          'Consensus 免费吗？',
          'Yes, there is a free plan; paid tiers unlock more Pro and Deep searches.',
          '有免费版，付费套餐可以使用更多 Pro 和 Deep 搜索。'
        ),
        faq(
          'Where do the answers come from?',
          '答案来自哪里？',
          'From peer-reviewed scientific papers in its index, each linked so you can check them.',
          '来自其索引中的同行评审论文，每条都有链接可供核查。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'leonardo-ai',
    name: 'Leonardo.Ai',
    maker: 'Leonardo.Ai (Canva)',
    website: 'https://leonardo.ai',
    category: 'models',
    tone: 'plum',
    relatedSlugs: ['recraft', 'vectorizer-ai'],
    tags: [
      tag('ai-image', 'AI image', 'AI 图像'),
      tag('ai-video', 'AI video', 'AI 视频'),
      tag('design-assets', 'Design assets', '设计素材'),
    ],
    tagline: text(
      'An AI image and video generator with fine-grained creative controls.',
      '提供精细创作控制的 AI 图像与视频生成工具。'
    ),
    description: text(
      'Leonardo.Ai is a generative platform for images and short videos, popular with game artists, marketers, and designers. It offers multiple models and styles, image-to-image guidance, and an editing canvas, with a daily free token allowance.',
      'Leonardo.Ai 是一个图像和短视频生成平台，在游戏美术、营销和设计人群中很受欢迎。它提供多种模型和风格、图生图引导以及编辑画布，并有每日免费 token 额度。'
    ),
    note: text(
      'Best for: concept art and consistent visual assets',
      '适合：概念设计和风格统一的视觉素材'
    ),
    profile: profile(
      text(
        'Many models and controls in one place for production-ready visuals.',
        '一个地方集中多种模型和控制手段，产出可直接使用的视觉素材。'
      ),
      text(
        'Producing large sets of on-style art by hand is slow.',
        '手工绘制大量风格统一的素材很慢。'
      ),
      text(
        'Designers, game artists, and marketers.',
        '设计师、游戏美术和营销人员。'
      ),
      text(
        'Free daily tokens with paid plans for more usage.',
        '每日有免费 token，更多用量需付费。'
      ),
      [text('AI image', 'AI 图像'), text('Design', '设计')],
      [
        text('Multiple image models', '多种图像模型'),
        text('Canvas editor', '画布编辑器'),
      ]
    ),
    seo: seo(
      text(
        'Leonardo AI generates images and videos from prompts, with presets and guidance tools that keep a consistent style across a set of assets. It is commonly used for concept art, product visuals, and social content.',
        'Leonardo AI 可以根据提示词生成图像和视频，借助预设和引导工具让一组素材保持统一风格，常用于概念设计、产品图和社媒内容。'
      ),
      [
        step(
          'Pick a model or preset',
          '选择模型或预设',
          'Choose the style that fits your project.',
          '选择适合项目的风格。'
        ),
        step(
          'Prompt and guide',
          '提示词与引导',
          'Write a prompt and optionally add a reference image.',
          '编写提示词，可选加入参考图。'
        ),
        step(
          'Edit and upscale',
          '编辑并放大',
          'Refine on the canvas and upscale the final image.',
          '在画布上修整并放大最终图像。'
        ),
      ],
      [
        text('Multiple image models and styles', '多种图像模型和风格'),
        text('Image guidance from references', '参考图引导'),
        text('Canvas editing and upscaling', '画布编辑和放大'),
        text('Short video generation', '短视频生成'),
      ],
      [
        text('Game and concept art', '游戏与概念设计'),
        text('Marketing visuals', '营销视觉'),
        text('Consistent asset sets', '风格统一的素材组'),
      ],
      [
        faq(
          'Is Leonardo AI free?',
          'Leonardo AI 免费吗？',
          'There is a free tier with a daily token allowance; paid plans add more tokens and features.',
          '有免费版，每日提供一定 token；付费套餐提供更多 token 和功能。'
        ),
        faq(
          'Can I use Leonardo images commercially?',
          'Leonardo 生成的图可以商用吗？',
          'Commercial terms depend on your plan; check Leonardo’s current terms before publishing.',
          '商用条款取决于你的套餐，发布前请查看 Leonardo 的最新条款。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'recraft',
    name: 'Recraft',
    maker: 'Recraft',
    website: 'https://www.recraft.ai',
    category: 'models',
    tone: 'coral',
    relatedSlugs: ['vectorizer-ai', 'leonardo-ai'],
    tags: [
      tag('vector', 'Vector generation', '矢量生成'),
      tag('brand-style', 'Brand styles', '品牌风格'),
      tag('mockups', 'Mockups', '样机'),
    ],
    tagline: text(
      'A text-to-image model and design platform built for designers, including vectors.',
      '面向设计师的文生图模型与设计平台，支持矢量图生成。'
    ),
    description: text(
      'Recraft combines its own top-ranked text-to-image model with design tools. It generates photorealistic images and editable vector graphics, lets you save custom styles for brand consistency, and creates mockups for products and marketing.',
      'Recraft 把自研的高排名文生图模型和设计工具结合在一起。它能生成写实图片和可编辑的矢量图，可以保存自定义风格保持品牌一致，还能生成产品和营销样机。'
    ),
    note: text(
      'Best for: logos, icons, and brand-consistent graphics',
      '适合：Logo、图标和保持品牌一致的图形'
    ),
    profile: profile(
      text(
        'Design-grade output, including SVG, from prompts.',
        '用提示词直接得到设计级输出，包括 SVG。'
      ),
      text(
        'Most image generators output raster images that designers must redraw.',
        '多数生图工具只输出位图，设计师还得重画。'
      ),
      text(
        'Designers, creatives, sellers, and teams.',
        '设计师、创意人员、电商卖家和团队。'
      ),
      text(
        'Free to start with paid plans for commercial use and more credits.',
        '可免费开始，商用和更多额度需付费。'
      ),
      [text('Graphic design', '平面设计'), text('AI image', 'AI 图像')],
      [
        text('Recraft image model', 'Recraft 图像模型'),
        text('Vector output', '矢量输出'),
      ]
    ),
    seo: seo(
      text(
        'Recraft AI is an image generator focused on design work. Beyond photos and illustrations, it generates true vector graphics, keeps custom brand styles, and places designs onto mockups, which makes it useful for logos, icons, and marketing sets.',
        'Recraft AI 是一款专注设计工作的图像生成工具。除了照片和插画，它还能生成真正的矢量图形、保存自定义品牌风格、把设计放到样机上，适合做 Logo、图标和营销物料。'
      ),
      [
        step(
          'Choose image or vector',
          '选择位图或矢量',
          'Pick the output type and style.',
          '选择输出类型和风格。'
        ),
        step(
          'Generate',
          '生成',
          'Describe the asset you need.',
          '描述你需要的素材。'
        ),
        step(
          'Edit and export',
          '编辑并导出',
          'Adjust colors or details and export PNG or SVG.',
          '调整颜色和细节，导出 PNG 或 SVG。'
        ),
      ],
      [
        text('Vector (SVG) generation', '矢量（SVG）生成'),
        text('Custom brand styles', '自定义品牌风格'),
        text('Product and marketing mockups', '产品与营销样机'),
        text('Photorealistic images', '写实图像'),
      ],
      [
        text('Logos and icon sets', 'Logo 与图标集'),
        text('Brand illustrations', '品牌插画'),
        text('E-commerce visuals', '电商视觉'),
      ],
      [
        faq(
          'Can Recraft make SVG files?',
          'Recraft 能生成 SVG 吗？',
          'Yes. Vector generation is one of its main features.',
          '可以，矢量生成是它的主要功能之一。'
        ),
        faq(
          'Is Recraft free?',
          'Recraft 免费吗？',
          'You can start for free; paid plans add credits and commercial rights.',
          '可以免费开始，付费套餐提供更多额度和商用权。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'vectorizer-ai',
    name: 'Vectorizer.AI',
    maker: 'Vectorizer.AI',
    website: 'https://vectorizer.ai',
    category: 'models',
    tone: 'moss',
    relatedSlugs: ['recraft'],
    tags: [
      tag('image-to-svg', 'Image to SVG', '图片转 SVG'),
      tag('vectorize', 'Vectorize', '矢量化'),
      tag('api', 'API', 'API'),
    ],
    tagline: text(
      'Convert PNG and JPG images into clean SVG and other vectors.',
      '把 PNG、JPG 图片转成干净的 SVG 等矢量图。'
    ),
    description: text(
      'Vectorizer.AI traces raster images into scalable vectors using deep-learning models that detect shapes and fit curves. It accepts PNG, JPG, GIF, BMP, and WebP, supports full color and transparency, and lets you preview the result for free before downloading.',
      'Vectorizer.AI 用深度学习模型识别形状、拟合曲线，把位图描摹成可缩放的矢量图。支持 PNG、JPG、GIF、BMP、WebP 输入，支持全彩和透明背景，下载前可以免费预览效果。'
    ),
    note: text(
      'Best for: turning a logo or illustration into a usable vector',
      '适合：把 Logo 或插画转成可用的矢量文件'
    ),
    profile: profile(
      text(
        'Accurate automatic tracing that beats manual pen-tool work.',
        '自动描摹精准，省去手工钢笔工具描图。'
      ),
      text(
        'Low-resolution logos break when printed or scaled up.',
        '低分辨率 Logo 一放大或印刷就会糊。'
      ),
      text(
        'Designers, print shops, crafters, and developers via API.',
        '设计师、印刷店、手工爱好者，以及通过 API 接入的开发者。'
      ),
      text(
        'Free preview; downloads require a paid subscription or API credits.',
        '可免费预览，下载需付费订阅或 API 额度。'
      ),
      [text('Design utilities', '设计工具'), text('Print', '印刷')],
      [
        text('Deep-learning tracing', '深度学习描摹'),
        text('REST API', 'REST API'),
      ]
    ),
    seo: seo(
      text(
        'Vectorizer AI is an online tool that converts bitmap images to vector graphics. Upload a PNG or JPG and it outputs SVG, EPS, DXF, or PDF with smooth curves, ready for printing, cutting machines, or scaling.',
        'Vectorizer AI 是一款在线位图转矢量工具。上传 PNG 或 JPG，即可输出曲线平滑的 SVG、EPS、DXF 或 PDF，可直接用于印刷、刻字机或任意缩放。'
      ),
      [
        step(
          'Upload an image',
          '上传图片',
          'Drop in a PNG, JPG, GIF, BMP, or WebP (up to 30MB).',
          '上传 PNG、JPG、GIF、BMP 或 WebP（最大 30MB）。'
        ),
        step(
          'Preview the vector',
          '预览矢量结果',
          'Inspect the traced result for free.',
          '免费查看描摹结果。'
        ),
        step(
          'Download',
          '下载',
          'Export SVG, EPS, DXF, or PDF.',
          '导出 SVG、EPS、DXF 或 PDF。'
        ),
      ],
      [
        text('AI shape detection and curve fitting', 'AI 形状识别与曲线拟合'),
        text('Full color and transparency', '支持全彩与透明'),
        text('SVG, EPS, DXF, PDF output', '输出 SVG、EPS、DXF、PDF'),
        text('Developer API', '开发者 API'),
      ],
      [
        text('Logo recovery', 'Logo 还原'),
        text('Cricut and laser cutting', 'Cricut 与激光切割'),
        text('Print-ready artwork', '印刷级图稿'),
      ],
      [
        faq(
          'Is Vectorizer.AI free?',
          'Vectorizer.AI 免费吗？',
          'Previews are free; downloading results requires a paid plan.',
          '预览免费，下载结果需要付费套餐。'
        ),
        faq(
          'What is the maximum image size?',
          '图片最大支持多大？',
          'The site lists a 30MB file limit and processes images up to about 3 megapixels.',
          '官网标注文件上限为 30MB，处理分辨率约 300 万像素。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'emergent',
    name: 'Emergent',
    maker: 'Emergent',
    website: 'https://emergent.sh',
    category: 'coding',
    tone: 'amber',
    tags: [
      tag('app-builder', 'AI app builder', 'AI 应用生成'),
      tag('website-builder', 'Website builder', '建站工具'),
      tag('no-code', 'No code', '无需编程'),
    ],
    tagline: text(
      'Chat with AI agents to build and deploy full apps.',
      '和 AI Agent 对话，搭建并部署完整应用。'
    ),
    description: text(
      'Emergent is an AI app builder. You describe what you want in plain language and its agents design, code, and deploy it: websites, mobile apps, dashboards, e-commerce stores, SaaS tools, or internal apps. You own the generated code and can host it anywhere.',
      'Emergent 是一款 AI 应用生成工具。用自然语言描述需求，它的 Agent 会完成设计、编码和部署：网站、移动应用、数据看板、电商店铺、SaaS 工具或内部系统都可以。生成的代码归你所有，可以部署在任何地方。'
    ),
    note: text(
      'Best for: non-developers shipping a real app quickly',
      '适合：不会写代码也想快速上线真实应用的人'
    ),
    profile: profile(
      text(
        'From idea to deployed, production-ready app in one conversation.',
        '一次对话，从想法到可上线的应用。'
      ),
      text(
        'Hiring developers or learning to code is slow and expensive for a first version.',
        '为第一版产品雇开发或自学编程又慢又贵。'
      ),
      text(
        'Founders, operators, and small businesses.',
        '创业者、运营人员和小企业。'
      ),
      text(
        'Free tier with 10 monthly credits; Standard from $17/month and Pro from $167/month billed annually.',
        '免费版每月 10 积分；Standard 年付约 $17/月，Pro 年付约 $167/月。'
      ),
      [text('AI coding', 'AI 编程'), text('No-code', '无代码')],
      [
        text('Multi-agent code generation', '多 Agent 代码生成'),
        text('One-click deploy', '一键部署'),
      ]
    ),
    seo: seo(
      text(
        'Emergent AI is a website and app builder driven by AI agents. Unlike template builders, it writes real code for the full stack and deploys it, so you can launch a working product and still export the code later.',
        'Emergent AI 是一款由 AI Agent 驱动的网站和应用生成工具。和模板建站不同，它会为前后端写真实代码并完成部署，你可以先上线可用的产品，之后再导出代码。'
      ),
      [
        step(
          'Describe the app',
          '描述应用',
          'Explain the features, pages, and users you have in mind.',
          '说明功能、页面和目标用户。'
        ),
        step(
          'Let agents build',
          '让 Agent 搭建',
          'Agents design, code, and test the app while you review progress.',
          'Agent 负责设计、编码和测试，你可以随时查看进度。'
        ),
        step(
          'Deploy and iterate',
          '部署并迭代',
          'Publish the app, then keep chatting to add features.',
          '发布应用，继续对话来添加功能。'
        ),
      ],
      [
        text('Full-stack code generation', '全栈代码生成'),
        text('Web and mobile apps', '网页与移动应用'),
        text('Built-in deployment', '内置部署'),
        text('You own the code', '代码归你所有'),
      ],
      [
        text('MVPs and prototypes', 'MVP 与原型'),
        text('Internal business tools', '企业内部工具'),
        text('Small online stores', '小型网店'),
      ],
      [
        faq(
          'How much does Emergent cost?',
          'Emergent 多少钱？',
          'There is a free tier with 10 monthly credits; Standard is $17/month and Pro is $167/month when billed annually.',
          '免费版每月 10 积分；年付时 Standard 为 $17/月，Pro 为 $167/月。'
        ),
        faq(
          'Can I export the code?',
          '可以导出代码吗？',
          'Yes. Emergent generates real code that you own and can host anywhere.',
          '可以。Emergent 生成的是真实代码，归你所有，可部署在任何地方。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'suno',
    name: 'Suno',
    maker: 'Suno',
    website: 'https://suno.com',
    category: 'audio',
    tone: 'coral',
    relatedSlugs: ['cartesia'],
    tags: [
      tag('ai-music', 'AI music', 'AI 音乐'),
      tag('song-generator', 'Song generator', '歌曲生成'),
      tag('vocals', 'Vocals', '人声'),
    ],
    tagline: text(
      'Generate complete songs with vocals and lyrics from a text prompt.',
      '输入一段文字，就能生成带人声和歌词的完整歌曲。'
    ),
    description: text(
      'Suno creates full original songs, including vocals, lyrics, and production, in under a minute. The v6 model is the newest, and Suno Studio adds a browser-based DAW with stem separation, remixing, custom voices, and custom models.',
      'Suno 可以在一分钟内生成包含人声、歌词和编曲的完整原创歌曲。最新模型是 v6，Suno Studio 则提供浏览器里的数字音频工作站，支持分轨、混音、自定义声音和自定义模型。'
    ),
    note: text(
      'Best for: making full songs without instruments or a studio',
      '适合：没有乐器和录音棚也能做出完整歌曲'
    ),
    profile: profile(
      text(
        'Prompt to finished song with vocals in seconds.',
        '几秒钟从提示词到带人声的成品歌曲。'
      ),
      text(
        'Writing, performing, and producing a song normally needs musicians and gear.',
        '写歌、演唱、制作通常需要乐手和设备。'
      ),
      text(
        'Hobbyists, content creators, and musicians sketching ideas.',
        '音乐爱好者、内容创作者和打草稿的音乐人。'
      ),
      text(
        'Free: up to 10 songs a day. Pro: $10/month (500 songs, commercial rights). Premier: 2,000 songs plus Suno Studio.',
        '免费版每天最多 10 首；Pro 每月 $10（500 首，含商用权）；Premier 每月 2000 首并包含 Suno Studio。'
      ),
      [text('AI music', 'AI 音乐'), text('Creator tools', '创作者工具')],
      [text('Suno v6 model', 'Suno v6 模型'), text('Browser DAW', '浏览器 DAW')]
    ),
    seo: seo(
      text(
        'Suno AI is an AI music generator. Describe a genre, mood, or topic, or paste your own lyrics, and it produces a complete song with singing. Paid plans include commercial rights, so tracks can be used in videos and other projects.',
        'Suno AI 是一款 AI 音乐生成器。描述曲风、情绪或主题，或者贴上自己写的歌词，它就会生成一首带演唱的完整歌曲。付费套餐包含商用权，可用于视频等项目。'
      ),
      [
        step(
          'Write a prompt or lyrics',
          '写提示词或歌词',
          'Describe the style or paste lyrics.',
          '描述风格或贴上歌词。'
        ),
        step(
          'Generate versions',
          '生成多个版本',
          'Suno returns full songs you can compare.',
          'Suno 会生成多首完整歌曲供你对比。'
        ),
        step(
          'Edit in Studio',
          '在 Studio 中编辑',
          'Split stems, remix, or extend the track.',
          '分轨、混音或延长歌曲。'
        ),
      ],
      [
        text('Full songs with vocals', '带人声的完整歌曲'),
        text('v6 model', 'v6 模型'),
        text('Stem separation and remix', '分轨与混音'),
        text('Commercial rights on paid plans', '付费套餐含商用权'),
      ],
      [
        text('Background music for videos', '视频背景音乐'),
        text('Personal and gift songs', '个人歌曲和送礼歌曲'),
        text('Demo and idea sketches', 'Demo 与创作草稿'),
      ],
      [
        faq(
          'Is Suno free?',
          'Suno 免费吗？',
          'Yes. The free plan allows up to 10 songs a day, without commercial rights.',
          '免费。免费版每天最多 10 首，但不含商用权。'
        ),
        faq(
          'Can I use Suno songs commercially?',
          'Suno 的歌可以商用吗？',
          'Songs made on Pro or Premier plans come with commercial rights.',
          '用 Pro 或 Premier 套餐生成的歌曲含商用权。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'cartesia',
    name: 'Cartesia',
    maker: 'Cartesia',
    website: 'https://cartesia.ai',
    category: 'audio',
    tone: 'cobalt',
    relatedSlugs: ['suno'],
    tags: [
      tag('text-to-speech', 'Text to speech', '文字转语音'),
      tag('voice-agents', 'Voice agents', '语音 Agent'),
      tag('api', 'API', 'API'),
    ],
    tagline: text(
      'Real-time, expressive text-to-speech API built for voice agents.',
      '为语音 Agent 打造的实时、富有表现力的文字转语音 API。'
    ),
    description: text(
      'Cartesia provides Sonic, a streaming text-to-speech model now at Sonic-3.6. It generates natural, expressive voices, including laughter, in 44 languages with low latency, and is designed for AI agents and interactive apps.',
      'Cartesia 提供流式文字转语音模型 Sonic，当前版本为 Sonic-3.6。它能以低延迟生成 44 种语言的自然、有表现力的声音（甚至包括笑声），专为 AI Agent 和互动应用设计。'
    ),
    note: text(
      'Best for: developers building real-time voice agents',
      '适合：开发实时语音 Agent 的开发者'
    ),
    profile: profile(
      text(
        'Low-latency streaming voices that sound human in conversation.',
        '低延迟的流式语音，对话听起来像真人。'
      ),
      text(
        'Slow or robotic TTS breaks the feel of a live voice conversation.',
        '慢或机械的语音合成会破坏实时对话的体验。'
      ),
      text(
        'Developers and companies building voice products.',
        '开发语音产品的开发者和公司。'
      ),
      text(
        'Usage-based API pricing with a free tier; see the official pricing page.',
        '按用量计费的 API，有免费额度，详见官网定价页。'
      ),
      [text('Voice AI', '语音 AI'), text('Developer API', '开发者 API')],
      [
        text('Sonic TTS model', 'Sonic TTS 模型'),
        text('Streaming API', '流式 API'),
      ]
    ),
    seo: seo(
      text(
        'Cartesia AI voice generator is a text-to-speech API. Its Sonic model streams audio fast enough for live conversations, which is why it is used inside customer-support bots, AI companions, and other voice agents.',
        'Cartesia AI 语音生成器是一款文字转语音 API。它的 Sonic 模型流式输出速度足以支持实时对话，因此被用于客服机器人、AI 陪伴等语音 Agent 中。'
      ),
      [
        step(
          'Get an API key',
          '获取 API Key',
          'Sign up and create a key in the dashboard.',
          '注册并在控制台创建 Key。'
        ),
        step(
          'Pick a voice',
          '选择声音',
          'Choose a voice and language in the playground.',
          '在 Playground 中选择声音和语言。'
        ),
        step(
          'Stream in your app',
          '在应用中流式调用',
          'Call the streaming API from your agent.',
          '在 Agent 中调用流式 API。'
        ),
      ],
      [
        text('Sonic-3.6 streaming TTS', 'Sonic-3.6 流式 TTS'),
        text('44 languages', '44 种语言'),
        text('Expressive output including laughter', '可表现笑声等情绪'),
        text('Built for real-time agents', '面向实时 Agent'),
      ],
      [
        text('Voice customer support', '语音客服'),
        text('AI companions and NPCs', 'AI 陪伴与虚拟角色'),
        text('Narration with low latency', '低延迟旁白'),
      ],
      [
        faq(
          'What is Sonic?',
          'Sonic 是什么？',
          'Sonic is Cartesia’s text-to-speech model; Sonic-3.6 is the current version.',
          'Sonic 是 Cartesia 的文字转语音模型，当前版本为 Sonic-3.6。'
        ),
        faq(
          'How many languages does it support?',
          '支持多少种语言？',
          'Cartesia lists 44 languages for Sonic.',
          '官网标注 Sonic 支持 44 种语言。'
        ),
      ]
    ),
  },
  {
    ...shared,
    slug: 'winston-ai',
    name: 'Winston AI',
    maker: 'Winston AI',
    website: 'https://gowinston.ai',
    category: 'writing',
    tone: 'moss',
    tags: [
      tag('ai-detector', 'AI detector', 'AI 检测'),
      tag('plagiarism', 'Plagiarism checker', '查重'),
      tag('image-detection', 'AI image detection', 'AI 图像检测'),
    ],
    tagline: text(
      'Detect AI-written text, plagiarism, and AI-generated images.',
      '检测 AI 写作、抄袭以及 AI 生成的图片。'
    ),
    description: text(
      'Winston AI is a content detection suite. It flags text written by models such as ChatGPT, Claude, and Gemini, checks plagiarism, and detects AI-generated or deepfake images. It also includes a grammar checker, essay grader, and citation generator, and supports 14 languages.',
      'Winston AI 是一套内容检测工具。它可以识别 ChatGPT、Claude、Gemini 等模型写的文字，检查抄袭，并识别 AI 生成或深度伪造的图片。还附带语法检查、作文评分和引用生成，支持 14 种语言。'
    ),
    note: text(
      'Best for: teachers and editors checking originality',
      '适合：需要核查原创性的老师和编辑'
    ),
    profile: profile(
      text(
        'AI detection, plagiarism, and image checks in one report.',
        '在一份报告里完成 AI 检测、查重和图片检测。'
      ),
      text(
        'Schools and publishers need to know whether content is original and human-written.',
        '学校和出版方需要确认内容是否原创、是否由人写成。'
      ),
      text(
        'Educators, publishers, and SEO agencies.',
        '教育者、出版方和 SEO 机构。'
      ),
      text(
        'Free trial without a credit card; paid subscriptions on the pricing page.',
        '可免费试用、无需信用卡，付费订阅见定价页。'
      ),
      [text('AI detection', 'AI 检测'), text('Education', '教育')],
      [
        text('Text classifier', '文本分类模型'),
        text('Image detector', '图像检测模型'),
      ]
    ),
    seo: seo(
      text(
        'Winston AI is an AI content detector. Paste text or upload a file and it estimates how likely the content was AI-generated, highlights suspicious passages, and can run a plagiarism scan. The company claims 99.87% accuracy.',
        'Winston AI 是一款 AI 内容检测工具。粘贴文字或上传文件，它会评估内容由 AI 生成的可能性、标出可疑段落，还能做查重。官方宣称准确率为 99.87%。'
      ),
      [
        step(
          'Paste or upload',
          '粘贴或上传',
          'Add text, a document, or an image.',
          '添加文字、文档或图片。'
        ),
        step(
          'Run the scan',
          '开始检测',
          'Choose AI detection, plagiarism, or both.',
          '选择 AI 检测、查重或两者都做。'
        ),
        step(
          'Review the report',
          '查看报告',
          'Read the score and highlighted sentences, then share the report.',
          '查看评分和标出的句子，并可分享报告。'
        ),
      ],
      [
        text('AI text detection', 'AI 文本检测'),
        text('Plagiarism checker', '查重'),
        text('AI and deepfake image detection', 'AI 与深度伪造图片检测'),
        text('14 supported languages', '支持 14 种语言'),
      ],
      [
        text('Grading student work', '批改学生作业'),
        text('Editorial review', '编辑审稿'),
        text('Auditing outsourced content', '审核外包内容'),
      ],
      [
        faq(
          'How accurate is Winston AI?',
          'Winston AI 准不准？',
          'Winston claims 99.87% accuracy. No detector is perfect, so treat scores as evidence rather than proof.',
          '官方宣称 99.87%。但任何检测器都不完美，应把分数当作参考而非定论。'
        ),
        faq(
          'Is there a free version?',
          '有免费版吗？',
          'There is a free trial with no credit card required.',
          '有免费试用，无需信用卡。'
        ),
      ]
    ),
  },
];
