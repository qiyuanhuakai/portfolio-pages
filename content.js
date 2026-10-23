// 作品集文案、项目数据与界面标签集中在这里。
// 修改后先提交到私有 portfolio，再同步到公开 portfolio-pages。
// 项目 id 用于分享链接，修改前请考虑旧链接兼容性。

window.PORTFOLIO = {
  "meta": {
    "title": "qiyuanhuakai · Engineering Portfolio",
    "description": "qiyuanhuakai 的技术作品集。记录多 Agent 客户端、科研软件维护、品牌 Skill 工具、ARM64 移植与长周期 Agent 实验，并附提交与评测证据。",
    "brand": "qiyuanhuakai",
    "github": "https://github.com/qiyuanhuakai",
    "zip": "https://github.com/qiyuanhuakai/portfolio-pages/archive/refs/heads/main.zip"
  },
  "hero": {
    "eyebrow": "ENGINEERING NOTES / 技术作品集",
    "titleBefore": "让想法落地，",
    "titleAccent": "让结果可复核。",
    "titleAfter": "",
    "intro": "我在多 Agent 客户端、科研软件和生物信息学工具链中做开发，也尝试把开放任务交给 Agent 长期执行。这里记录具体做过的改动、遇到的问题，以及支持结论的证据。",
    "primaryAction": "浏览项目",
    "secondaryAction": "离线版 ZIP",
    "note": "AI Agents · Scientific Software · Bioinformatics",
    "mapLabel": "项目路径",
    "mapTitle": "沿着问题，找到项目。",
    "mapNote": "从界面状态到科研结果，点击下方路径直接阅读。",
    "ornamentLabel": "SAKURA / CIRCUIT",
    "ornamentNote": "Ideas take shape. Evidence stays."
  },
  "stats": [
    {
      "value": "06",
      "label": "工程案例"
    },
    {
      "value": "07",
      "label": "关联仓库"
    },
    {
      "value": "113",
      "label": "评测任务"
    },
    {
      "value": "x86 ↔ ARM64",
      "label": "跨架构实践"
    }
  ],
  "workIntro": {
    "eyebrow": "01 / SELECTED WORK",
    "title": "项目与实践",
    "body": "先看问题和改动，再沿提交记录核对细节。fork 项目注明个人工作，Agent 实验保留人机分工。"
  },
  "featured": [
    {
      "number": "01 / 06",
      "role": "长期维护 / 多 Agent GUI",
      "stack": [
        "Vue 3",
        "TypeScript",
        "Hono",
        "Electron",
        "SSE",
        "Workers",
        "Vitest"
      ],
      "title": "OpenCode Visualizer CN",
      "lead": "这是我投入时间最多的工程项目。它从第三方 OpenCode Web UI 的 fork 起步，逐步扩展为支持 OpenCode、Codex、ACP 和 Forge 的多 Agent 客户端。随着功能增多，我花了更多时间处理流式状态、后台任务和大型界面在异常情况下的一致性。",
      "columns": [
        {
          "title": "我推动的改动",
          "items": [
            "补充 i18n、模型与 Provider 管理、MCP/LSP/Plugin/Skills 状态监控和会话管理。",
            "扩展 Snippets、本地文件编辑、Git 文件树、Electron 桌面端和 vis_bridge daemon。",
            "接入 Codex、ACP 与 Forge，让界面从 OpenCode 专用前端向多 Agent 客户端扩展。"
          ]
        },
        {
          "title": "需要反复处理的问题",
          "items": [
            "大文件换行后，虚拟列表需要按实际行高定位，等高假设会造成错位。",
            "Render Worker 崩溃后，需要替换 Worker 并恢复后续渲染。",
            "SSE 重连、后台 hydration 和异步初始化中，旧任务可能晚到并覆盖新状态。"
          ]
        }
      ],
      "evidenceTitle": "提交记录",
      "evidence": [
        {
          "code": "977532b",
          "text": "大文件换行与可变行高虚拟滚动",
          "url": "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/977532b80d34e10a218709d8c2ba2e8a5f8da87b"
        },
        {
          "code": "0d2a61f",
          "text": "替换崩溃的 Render Worker",
          "url": "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/0d2a61f0c7acd74cad92450110a08ab22d8ce2f1"
        },
        {
          "code": "3981673",
          "text": "共享 SSE Worker 中的任务完成处理",
          "url": "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/3981673d95b043a9612cce5f17b540d48daaa975"
        },
        {
          "code": "20f1ea3",
          "text": "取消过期的 OpenCode 初始化",
          "url": "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/20f1ea396c5178a135ab48af7461770589b04024"
        }
      ],
      "linkLabel": "查看仓库 ↗",
      "link": "https://github.com/qiyuanhuakai/opencode-visualizer-cn",
      "id": "opencode",
      "category": "client",
      "categoryLabel": "Agent 客户端",
      "summary": "多后端接入、流式状态与大文件渲染"
    },
    {
      "number": "02 / 06",
      "role": "科研软件 / 工程维护",
      "stack": [
        "C++20",
        "Python",
        "Multithreading",
        "xmake",
        "GitHub Actions"
      ],
      "title": "MetaCSST",
      "lead": "MetaCSST 用于预测 DGR（多样性生成逆转录元件）。我的工作集中在维护旧代码、整理构建流程和验证结果，保留原有算法。",
      "columns": [
        {
          "title": "代码与交付流程",
          "items": [
            "将 C++03 代码迁移到 C++20，并将 Perl 脚本改写为 Python。",
            "拆分大型 C++ 源文件，整理配置解析与模块职责。",
            "将主要构建方式迁移到 xmake，补充测试基线。",
            "通过 GitHub Actions 分发 x86_64 / aarch64 二进制。"
          ]
        },
        {
          "title": "多线程结果需要一致",
          "body": "多线程路径曾因文件切分不一致而产生错误结果。我优先修复了这项问题：同一输入在合理的线程配置下应得到一致结果，之后再考虑代码风格和性能。"
        }
      ],
      "evidenceTitle": "提交记录",
      "evidence": [
        {
          "code": "8e1962c",
          "text": "修复多线程文件切分不一致",
          "url": "https://github.com/qiyuanhuakai/MetaCSST/commit/8e1962c4171d5e23fccc481b7726c8194c95ef7b"
        },
        {
          "code": "2ec2d10",
          "text": "拆分大型 C++ 源文件",
          "url": "https://github.com/qiyuanhuakai/MetaCSST/commit/2ec2d10e87231c54029e523fa13874e58c7dfb46"
        },
        {
          "code": "cb751c8",
          "text": "将主要构建迁移到 xmake",
          "url": "https://github.com/qiyuanhuakai/MetaCSST/commit/cb751c896cb7127ba697c1a2bfb9a36a9a540d92"
        },
        {
          "code": "26c72b7",
          "text": "二进制分发工作流",
          "url": "https://github.com/qiyuanhuakai/MetaCSST/commit/26c72b7bc88800b99d867c19eebe64bfc30f40e1"
        }
      ],
      "linkLabel": "查看仓库 ↗",
      "link": "https://github.com/qiyuanhuakai/MetaCSST",
      "id": "metacsst",
      "category": "science",
      "categoryLabel": "科研软件",
      "summary": "旧代码维护、构建迁移与多线程结果一致性"
    },
    {
      "number": "03 / 06",
      "role": "长周期任务 / 自主性实验",
      "stack": [
        "GPT-5.6 Sol",
        "OpenCode",
        "GeoJSON",
        "Evidence ledger"
      ],
      "title": "Rail OS · 三时共轨",
      "lead": "我把一个开放、跨学科且资料不完整的城市规划任务交给 Agent，观察它能否自行研究、提出方案并完成交付。具体规划概念、空间方案和技术路线由 Agent 决定，过程保留在 Git 历史中。",
      "boundary": {
        "human": {
          "label": "HUMAN / 我",
          "title": "提供任务，设定质量门槛",
          "items": [
            "提供开放任务和 Agent 运行环境。",
            "不指定具体规划概念、空间方案或技术路线。",
            "必要时增加额外的要求，例如要求再做一轮合理性审查。"
          ]
        },
        "agent": {
          "label": "AGENT / 执行",
          "title": "选择方向，完成执行与修订",
          "items": [
            "形成 Rail OS / “源—试—享”等具体概念。",
            "组织资料、空间数据、指标、图件和双语文本。",
            "收到质量要求后，自行选择审查对象、判断问题并修改方案。"
          ]
        },
        "note": "审查边界：后期对部分土地用途和主张的收缩，发生在我明确要求“额外做一次合理性审查”之后。具体检查什么、如何判断和修改，仍由 Agent 决定。"
      },
      "evidenceTitle": "过程与交付",
      "evidence": [
        {
          "code": "ae5c9f9",
          "text": "建立身份与证据基线",
          "url": "https://github.com/open-city-ai/haidian/commit/ae5c9f9cc4e20f215f9f90ba4230bb4a7799eaeb"
        },
        {
          "code": "ae2e34c",
          "text": "提交双语方案",
          "url": "https://github.com/open-city-ai/haidian/commit/ae2e34c7a392d42e62612e081b9e3c9f22aef56f"
        },
        {
          "code": "9244010",
          "text": "方案合入上游",
          "url": "https://github.com/open-city-ai/haidian/commit/924401071f0915121b2e9b2b1341e9dbc53516ec"
        }
      ],
      "linkLabel": "查看最终提交 ↗",
      "link": "https://github.com/open-city-ai/haidian/tree/main/submissions/qiyuanhuakai/rail-os",
      "id": "rail-os",
      "category": "agent",
      "categoryLabel": "Agent 实验",
      "summary": "开放城市规划任务与长周期自主执行"
    },
    {
      "id": "kimi-brand-skill",
      "category": "tooling",
      "categoryLabel": "设计工具",
      "title": "Kimi Brand Skill",
      "role": "品牌规范 / Agent Skill 工具",
      "summary": "品牌规范、设计 token 与可执行校验",
      "stack": [
        "JavaScript",
        "Design Tokens",
        "CSS",
        "Tailwind CSS",
        "WCAG"
      ],
      "lead": "我将 Kimi 公开品牌手册整理成一个非官方 Skill，把色彩、字体、图表和对外文案规则转成参考文档、设计 token 与初始化脚本，供 Agent 在项目中使用。官方资料与工程推导分开标注，仓库不附带 Logo 或字体文件。",
      "columns": [
        {
          "title": "把规则接到实际项目中",
          "items": [
            "整理官方 15 色与字体体系，以 JSON token 作为机器可读的数据源，提供 CSS 变量和可选组件。",
            "用初始化脚本导出 CSS、Tailwind 配置或 JSON；校验参数，默认保留已有文件。",
            "补充色值、语义配色、CSS 解析、命令行行为与品牌资产检查，减少文档和实现之间的偏差。"
          ]
        },
        {
          "title": "反复验证后修正的细节",
          "items": [
            "按实际前景与背景检查文字对比度，并修复浅色系统下手动切换深色主题不生效的问题。",
            "将 Tailwind 输出改为 kimi- 平铺前缀，既保留原有默认样式，也检查品牌工具类能否实际生成。",
            "区分图形对画布的对比度与数据系列的可辨识性，撤掉错误的数值保证，要求配合标注、形状或线型。"
          ]
        }
      ],
      "evidenceTitle": "修订与来源边界",
      "evidence": [
        {
          "code": "230b414",
          "text": "修正对比度阈值、CSS 注释与参数解析",
          "url": "https://github.com/qiyuanhuakai/kimi-brand-skill-custom/commit/230b414149094d91f5be03b72fb6bb45f2040c7b"
        },
        {
          "code": "67c7916",
          "text": "按背景校验文字色并修复显式深色主题",
          "url": "https://github.com/qiyuanhuakai/kimi-brand-skill-custom/commit/67c791659ec960566930d610d3668460b09b7da0"
        },
        {
          "code": "3e07d4f",
          "text": "验证 Tailwind 工具类生成并同步 CSS / JSON 系列色",
          "url": "https://github.com/qiyuanhuakai/kimi-brand-skill-custom/commit/3e07d4fa5b4fb26bb66877395d6f00f890686647"
        },
        {
          "code": "1c8108f",
          "text": "撤掉无效的系列可辨识性保证，补充非颜色编码要求",
          "url": "https://github.com/qiyuanhuakai/kimi-brand-skill-custom/commit/1c8108fa6a504590531a5923708f857ce393f7ae"
        },
        {
          "code": "NOTICE",
          "text": "非官方属性、数据来源与工程推导范围（固定版本）",
          "url": "https://github.com/qiyuanhuakai/kimi-brand-skill-custom/blob/2b8114b727992b5c55ec221f6764dce44ae07ff6/NOTICE.md"
        }
      ],
      "linkLabel": "查看仓库 ↗",
      "link": "https://github.com/qiyuanhuakai/kimi-brand-skill-custom",
      "number": "04 / 06"
    }
  ],
  "compact": [
    {
      "number": "05 / 06 · PORTABILITY",
      "title": "DeChat + Ratatosk on ARM64",
      "intro": "排查 ARM64 编译失败时，问题逐渐落在线程参数传递、x86 SIMD 假设和编译器兼容上。Ratatosk 的构建问题还涉及 Bifrost 子模块，需要沿依赖链继续修复。",
      "items": [
        "修复 DeChat 的 -t 参数在 correct_round1 阶段未生效的问题。",
        "引入 SIMDe 兼容层，让 DeChat 可以在 aarch64 上构建和运行。",
        "将 Ratatosk 的依赖修复追到 Bifrost，通过 fork 和子模块引用保留修复链。"
      ],
      "evidence": [
        {
          "code": "DeChat",
          "text": "修复线程数限制",
          "url": "https://github.com/qiyuanhuakai/DeChat/commit/1e464cfa9489295c3482ad47f04e398118267abd"
        },
        {
          "code": "DeChat",
          "text": "aarch64 / SIMDe 兼容",
          "url": "https://github.com/qiyuanhuakai/DeChat/commit/04f3ea2de7a04df2b07cca910f01ee1f403f5189"
        },
        {
          "code": "Ratatosk",
          "text": "Bifrost fork 与子模块修复链",
          "url": "https://github.com/qiyuanhuakai/Ratatosk-aarch64-buildfix/commit/1934d44566e8b2405b6245c325990d3c6be73b53"
        }
      ],
      "id": "arm64",
      "category": "science",
      "categoryLabel": "科研软件",
      "summary": "线程参数、SIMD 假设与子模块依赖",
      "stack": [
        "C++",
        "ARM64",
        "SIMDe",
        "Git submodules"
      ]
    },
    {
      "number": "06 / 06 · EVALUATION",
      "title": "DeepSWE × kat-coder-pro-v2.5",
      "intro": "这次评测的最终通过率为 8.93%（10 / 112）。我同时整理了异常归类、重跑取值和 verifier 超时的处理规则，便于检查这个分数是怎样得到的。",
      "metrics": [
        {
          "value": "113",
          "label": "实际运行任务"
        },
        {
          "value": "138",
          "label": "运行次数"
        },
        {
          "value": "32",
          "label": "批次"
        },
        {
          "value": "8.93%",
          "label": "10 / 112"
        }
      ],
      "body": "113 个任务均实际运行过，共产生 138 次运行、32 个批次。token 超限按失败计入；一个重复出现 verifier 1800 秒超时的任务被单独剔除，因此最终分母为 112。结果从 result.json、exception.txt 和 trajectory 恢复。",
      "linkLabel": "查看评测记录 ↗",
      "link": "https://github.com/qiyuanhuakai/deepswe-for-kat-coder-pro-v2.5",
      "id": "deepswe",
      "category": "evaluation",
      "categoryLabel": "模型评测",
      "summary": "任务覆盖、异常归类与结果恢复",
      "stack": [
        "DeepSWE",
        "kat-coder-pro-v2.5",
        "Benchmark"
      ],
      "evidence": [
        {
          "code": "README",
          "text": "任务覆盖、异常处理与最终结果（仓库记录）",
          "url": "https://github.com/qiyuanhuakai/deepswe-for-kat-coder-pro-v2.5"
        }
      ]
    }
  ],
  "approach": {
    "eyebrow": "02 / WORKING NOTES",
    "title": "改动完成前，\n我会检查什么",
    "principles": [
      {
        "number": "01",
        "title": "结论有对应记录",
        "body": "为改动保留 commit、PR、测试或评测记录。证据不足的部分，说明尚未确认的范围。"
      },
      {
        "number": "02",
        "title": "检查结果和边界条件",
        "body": "并发、流式生命周期和科研软件都可能在边界条件下出错。测试之外，还需要核对结果一致性与失败路径。"
      },
      {
        "number": "03",
        "title": "检查 Agent 的交付",
        "body": "我使用 coding agents 做调研、实现、迁移和审查，再检查它们的结果，并决定验证方式与最终取舍。"
      },
      {
        "number": "04",
        "title": "说明贡献与限制",
        "body": "区分上游已有能力、个人改动和 Agent 的工作；人类追加的提示、尚未充分验证的平台结果，也一并注明。"
      }
    ],
    "aiLabel": "AI-ASSISTED ENGINEERING",
    "aiTitle": "AI 参与开发，过程也应当可检查。",
    "aiBody": "我关注任务怎样拆解、上下文怎样管理、失败如何定位，以及测试是否覆盖了实际问题。这里保留 co-author、提交与评测记录，供读者核对实现过程。"
  },
  "footer": {
    "left": "qiyuanhuakai · engineering portfolio",
    "right": "Design & code by Codex"
  },
  "ui": {
    "skip": "跳到正文",
    "brandNote": "工程手记",
    "navWork": "项目",
    "navApproach": "方法",
    "navEvidence": "证据索引",
    "navGithub": "GitHub ↗",
    "preferences": "阅读偏好",
    "theme": "页面主题",
    "themes": {
      "system": "跟随系统",
      "light": "樱雾 · 浅色",
      "dark": "暮紫 · 深色"
    },
    "themeChoiceLabels": {
      "system": "系统",
      "light": "浅色",
      "dark": "深色"
    },
    "quiet": "静态阅读",
    "quietHint": "关闭动画与平滑滚动，专注阅读。",
    "preferenceNote": "偏好仅保存在当前浏览器。",
    "search": "搜索项目或技术栈",
    "searchPlaceholder": "搜索项目、问题或技术栈…",
    "clearSearch": "清除搜索",
    "filterLabel": "按方向筛选项目",
    "filters": [
      {
        "id": "all",
        "label": "全部"
      },
      {
        "id": "client",
        "label": "Agent 客户端"
      },
      {
        "id": "science",
        "label": "科研软件"
      },
      {
        "id": "agent",
        "label": "Agent 实验"
      },
      {
        "id": "evaluation",
        "label": "模型评测"
      },
      {
        "id": "tooling",
        "label": "设计工具"
      }
    ],
    "resultTemplate": "显示 {count} / {total} 个项目",
    "emptyTitle": "没有找到匹配的项目",
    "emptyBody": "试试其他关键词，或清除筛选后浏览全部项目。",
    "reset": "重置筛选",
    "jumpLabel": "快速跳转到项目",
    "detail": "项目详情",
    "evidence": "查看证据",
    "evidenceCount": "{count} 条记录",
    "copy": "复制项目链接",
    "copied": "项目链接已复制",
    "copyPage": "复制作品集链接",
    "pageCopied": "作品集链接已复制",
    "copyFallback": "当前浏览器无法自动复制，请手动复制下方链接。",
    "copyManual": "手动复制链接",
    "close": "关闭",
    "print": "打印 / 存为 PDF",
    "backTop": "回到顶部 ↑",
    "evidenceTitle": "证据索引",
    "evidenceIntro": "按项目查看提交与交付记录。提交链接对应固定版本，仓库链接的内容可能继续更新。",
    "evidenceSelect": "选择项目",
    "allEvidence": "全部项目",
    "evidenceOpen": "打开原始记录 ↗",
    "evidenceNote": "这些记录支持本页所述改动；具体实现与验证范围请以对应来源为准。",
    "noscript": "请启用 JavaScript 查看项目内容，也可以直接访问 GitHub 仓库。"
  }
};
