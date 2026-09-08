// 作品集文字集中在这里。
// 日常修改措辞时，优先只改这个文件；不要改 index.html / style.css / motion.js。

window.PORTFOLIO = {
  meta: {
    title: "qiyuanhuakai · Engineering Portfolio",
    description: "qiyuanhuakai 的技术作品集：AI Agent / Harness、科研软件工程化、生物信息学工具链与可验证工程实践。",
    brand: "qiyuanhuakai / engineering portfolio",
    github: "https://github.com/qiyuanhuakai",
    zip: "https://github.com/qiyuanhuakai/portfolio-pages/archive/refs/heads/main.zip"
  },
  hero: {
    eyebrow: "AI Agents · Scientific Software · Bioinformatics",
    titleBefore: "我更关心系统在",
    titleAccent: "边界条件",
    titleAfter: "下，是否仍然成立。",
    intro: "这些项目来自 AI coding 客户端、科研软件和生物信息学工具链。共同点不是技术栈，而是需要在已有代码、真实约束和不完整信息里把问题定位清楚，再用测试、提交记录和可复现结果把结论坐实。",
    primaryAction: "看项目",
    secondaryAction: "下载 ZIP"
  },
  stats: [
    { value: "6", label: "selected repositories" },
    { value: "5", label: "engineering problems" },
    { value: "113", label: "benchmark tasks covered" },
    { value: "x86 ↔ ARM64", label: "portability work" }
  ],
  workIntro: {
    eyebrow: "Selected work",
    title: "五个案例，五种需要被验证的问题。",
    body: "我尽量不写“熟练”“高性能”这类无法核实的词。重要结论旁边放 commit、PR 或 benchmark；fork 项目则明确区分上游原有能力和我实际推动的部分。"
  },
  featured: [
    {
      number: "01 / 05",
      role: "Long-running software project\nAI coding client",
      stack: ["Vue 3", "TypeScript", "Hono", "Electron", "SSE", "Workers", "Vitest"],
      title: "OpenCode Visualizer CN",
      lead: "这是我投入时间最多的工程项目。它从一个 OpenCode 第三方 Web UI fork 起步，后来逐渐变成独立维护的多 Agent GUI。越往后，真正难处理的部分越少是“加一个功能”，越多是流式状态、后台任务和大规模 UI 在异常情况下还能不能保持一致。",
      columns: [
        { title: "我实际推动的内容", items: ["i18n、模型与 Provider 管理、MCP/LSP/Plugin/Skills 状态，以及更完整的会话管理。","Snippets、本地文件编辑、Git 文件树、Electron 桌面端和 vis_bridge。","接入 Codex、ACP 与 Forge，让界面从 OpenCode 专用前端向多 Agent 客户端扩展。"] },
        { title: "后来问题变成了什么", items: ["大文件换行后，虚拟列表需要处理真实的可变行高，而不是假设每行等高。","Render Worker 崩溃后不能让后续渲染一起失效，需要替换和恢复。","SSE 重连、后台 hydration 与异步初始化都要防止旧任务晚到后覆盖新状态。"] }
      ],
      evidenceTitle: "Evidence / representative commits",
      evidence: [
        { code: "977532b", text: "virtualize wrapped large files", url: "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/977532b80d34e10a218709d8c2ba2e8a5f8da87b" },
        { code: "0d2a61f", text: "replace crashed render workers", url: "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/0d2a61f0c7acd74cad92450110a08ab22d8ce2f1" },
        { code: "3981673", text: "task completion in shared SSE worker", url: "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/3981673d95b043a9612cce5f17b540d48daaa975" },
        { code: "20f1ea3", text: "cancel stale OpenCode initialization", url: "https://github.com/qiyuanhuakai/opencode-visualizer-cn/commit/20f1ea396c5178a135ab48af7461770589b04024" }
      ],
      linkLabel: "Repository ↗", link: "https://github.com/qiyuanhuakai/opencode-visualizer-cn"
    },
    {
      number: "02 / 05", role: "Scientific software\nmodernization", stack: ["C++20", "Python", "Multithreading", "xmake", "GitHub Actions"], title: "MetaCSST",
      lead: "我没有重写它的科研算法，而是把一套遗留 DGR 预测代码往更容易维护、构建和验证的位置推进。这里最值得展示的不是“用了 C++20”，而是一次会直接改变科学结果的并行错误。",
      columns: [
        { title: "现代化不是只改语法", items: ["拆分大型 C++ 源文件，整理配置解析和职责边界。","主要构建方式迁移到 xmake，并补充测试基线。","建立 GitHub Actions 二进制分发，让 x86_64 / aarch64 的交付过程更明确。"] },
        { title: "Correctness > “runs”", body: "多线程路径曾因为文件切分不一致得到错误结果。这个 bug 的优先级高于任何代码风格或性能优化：科研软件首先要保证同一输入在合理的线程配置下仍然给出可信结果。" }
      ],
      evidenceTitle: "Evidence / representative commits",
      evidence: [
        { code: "8e1962c", text: "fix multithread splitting inconsistency", url: "https://github.com/qiyuanhuakai/MetaCSST/commit/8e1962c4171d5e23fccc481b7726c8194c95ef7b" },
        { code: "2ec2d10", text: "split large C++ files", url: "https://github.com/qiyuanhuakai/MetaCSST/commit/2ec2d10e87231c54029e523fa13874e58c7dfb46" },
        { code: "cb751c8", text: "move primary build to xmake", url: "https://github.com/qiyuanhuakai/MetaCSST/commit/cb751c896cb7127ba697c1a2bfb9a36a9a540d92" },
        { code: "26c72b7", text: "binary distribution workflow", url: "https://github.com/qiyuanhuakai/MetaCSST/commit/26c72b7bc88800b99d867c19eebe64bfc30f40e1" }
      ],
      linkLabel: "Repository ↗", link: "https://github.com/qiyuanhuakai/MetaCSST"
    },
    {
      number: "03 / 05", role: "High-autonomy agent\nlong-horizon experiment", stack: ["GPT-5.6 Sol", "OpenCode", "GeoJSON", "Evidence ledger"], title: "Rail OS · 三时共轨",
      lead: "这个项目的价值不在于“我会做城市规划”。我想看的，是当具体方案方向交给 Agent 后，它能把一个开放、跨学科、资料不完整的任务推进到什么程度；Git 历史则把这个过程留下来。",
      boundary: {
        human: { label: "Human", title: "我控制的是目标和质量门槛", items: ["提供开放任务和 Agent 运行环境。","不指定具体规划概念、空间方案或技术路线。","必要时增加元层要求，例如要求再做一轮合理性审查。"] },
        agent: { label: "Agent", title: "Agent 控制方向、执行和具体修改", items: ["形成 Rail OS / “源—试—享”等具体概念。","组织资料、空间数据、指标、图件和双语文本。","收到质量要求后，自行判断要检查什么、哪里不合理，以及如何改。"] },
        note: "一个需要特别说明的边界：后期方案中对部分土地用途和主张的收缩，并不是 Agent 无提示地自发反思；它发生在我明确要求“额外做一次合理性审查”之后。具体审查对象和修改方式仍由 Agent 决定。"
      },
      evidenceTitle: "Evidence / trajectory",
      evidence: [
        { code: "ae5c9f9", text: "identity + evidence baseline", url: "https://github.com/open-city-ai/haidian/commit/ae5c9f9cc4e20f215f9f90ba4230bb4a7799eaeb" },
        { code: "ae2e34c", text: "bilingual proposal", url: "https://github.com/open-city-ai/haidian/commit/ae2e34c7a392d42e62612e081b9e3c9f22aef56f" },
        { code: "9244010", text: "submission merged upstream", url: "https://github.com/open-city-ai/haidian/commit/924401071f0915121b2e9b2b1341e9dbc53516ec" }
      ],
      linkLabel: "Final submission ↗", link: "https://github.com/open-city-ai/haidian/tree/main/submissions/qiyuanhuakai/rail-os"
    }
  ],
  compact: [
    {
      number: "04 / 05 · PORTABILITY", title: "DeChat + Ratatosk on ARM64", intro: "一开始看起来只是“ARM 上编不过”。继续往下追，问题分散在线程参数传递、x86 SIMD 假设、编译器兼容，以及 Ratatosk 的 Bifrost 子模块。",
      items: ["修复 DeChat `-t` 在 `correct_round1` 阶段实际失效的问题。","用 SIMDe compatibility layer 让 DeChat 在 aarch64 上构建/运行。","Ratatosk 的依赖问题继续追到 Bifrost，并通过 fork + submodule 固化修复链。"],
      evidence: [
        { code: "DeChat", text: "thread limit fix", url: "https://github.com/qiyuanhuakai/DeChat/commit/1e464cfa9489295c3482ad47f04e398118267abd" },
        { code: "DeChat", text: "aarch64 / SIMDe", url: "https://github.com/qiyuanhuakai/DeChat/commit/04f3ea2de7a04df2b07cca910f01ee1f403f5189" },
        { code: "Ratatosk", text: "Bifrost fork chain", url: "https://github.com/qiyuanhuakai/Ratatosk-aarch64-buildfix/commit/1934d44566e8b2405b6245c325990d3c6be73b53" }
      ]
    },
    {
      number: "05 / 05 · EVALUATION", title: "DeepSWE × kat-coder-pro-v2.5", intro: "最终分数只有 8.93%。这反而让“评测流程本身是否可信”更重要：哪些异常算模型失败，哪些是 verifier 问题，重跑后取哪一次结果，都必须有明确口径。",
      metrics: [{ value: "113", label: "tasks" },{ value: "138", label: "runs" },{ value: "32", label: "batches" },{ value: "8.93%", label: "10 / 112" }],
      body: "全部 113 个任务都实际运行过；token 超限计失败，重复出现的 verifier 1800 秒超时单独剔除。最终状态从 `result.json`、`exception.txt` 和 trajectory 恢复，而不是靠手工抄终端输出。",
      linkLabel: "Benchmark record ↗", link: "https://github.com/qiyuanhuakai/deepswe-for-kat-coder-pro-v2.5"
    }
  ],
  approach: {
    eyebrow: "Approach", title: "我怎么判断一个改动算完成。",
    principles: [
      { number: "01", title: "先找证据，再写结论", body: "作品集里的关键主张尽量能落到 commit、PR、测试或 benchmark；没有证据的部分就不包装成结果。" },
      { number: "02", title: "“能跑”不是正确性", body: "并发、流式生命周期和科研软件尤其容易在边界条件下出错。结果一致性优先于代码看起来是否现代。" },
      { number: "03", title: "AI 是开发流程的一部分", body: "我会使用 coding agents 完成实现、迁移和审查，但问题定义、质量门槛、验证方式和最终取舍仍需要明确。" },
      { number: "04", title: "把边界写出来", body: "fork 的上游能力、人类给 Agent 的提示、尚未充分验证的平台结果，都应该明确标注，而不是模糊归功。" }
    ],
    aiLabel: "AI-assisted engineering",
    aiTitle: "我不把“这些代码是不是逐行手写”当作作品集的核心问题。",
    aiBody: "更重要的是：任务怎么拆、上下文怎么给、Agent 的结果怎么检查、失败怎么定位、测试怎么设计，以及最后能否留下别人可以复核的结果。这也是为什么这里保留 co-author、commit 和评测记录，而不是隐藏 AI 的参与。"
  },
  footer: { left: "qiyuanhuakai · engineering portfolio", right: "static · offline-friendly · evidence-linked" }
};
