# Attachment 功能补齐验证 · 2026-10-15

本地实现完成；范围为用户在调研后确认的九组功能。新增独立 `recipe-attachment-workflow`，原 `ui-attachment` 九个 Parts 与 CSS 保持本轮基线，原 G6 十二项和既有人审状态不变。当前 unpublished、awaiting_human、contrastAcceptance not-granted。

## 实现与复核

- 文件类型图标、缩略图失败回退、完整名称与元信息；预览、下载、打开、移除、替换权限分别判断。
- 真实栅格图片、受大小限制且固定 PDF MIME 的原生 PDF 预览；不支持格式、无原生阅读器、无权限、失效、资源失败都有回退。
- 真实 File 选择/多选/拖放，类型、空文件、单项/总量/数量/重复/自定义校验；逐项拒绝，不丢弃整批。
- 上传 Hook 与可选真实 XHR 适配器；确定/未知进度、处理中、取消、重试、请求身份与晚到结果隔离；异步移除；替换成功前保留原件。
- 多附件草稿、显式 reset 回填、变更通知和提交门槛。门槛仅检查未完成上传/替换/移除，业务必传、资源可用性和服务端权限仍由宿主检查。
- Playground 使用真实 PNG/PDF/TXT；本地模拟上传与保存有明确说明。独立消费夹具使用仅监听 127.0.0.1 的临时内存 HTTP 服务，没有生产服务调用。

独立代码审查发现并修复：生成 ID 避让回填 ID、开始/重试重新校验最新约束、原始本地 HTML/SVG Blob 导航、关闭后迟到响应取消、下载权限撤销取消请求、失败/等待替换取消入口、不可预览邻项焦点回退、移除后同 ID 回填不自动重开预览、并发移除互不清除焦点任务，以及仅资源ID的宿主下载适配器入口。相关回归先复现失败，再修复通过；最终只读复核 List/XHR/Demo 38项通过，无新增阻断问题。

## 实际执行

| 检查 | 结果与证据 |
| --- | --- |
| Attachment、Workflow、G6媒体页与Demo单元/集成 | **180/180**，10文件；`unit-results.json` |
| 完整Chromium，1440×1000与390×844 | **14/14**；`browser/report.json` |
| UI TypeScript | 通过：`pnpm --filter @rain-next/ui typecheck` |
| Playground TypeScript | 通过：`pnpm --filter @rain-next/playground typecheck` |
| 测试 TypeScript | 通过：`pnpm exec tsc --noEmit --project tsconfig.tests.json` |
| Playground生产构建 | 通过：`pnpm --filter @rain-next/playground build`；仍有已有大chunk提示 |
| README独立示例 | 两段TSX编译通过；Manifest/Registry引用路径检查通过 |
| 本轮源文件、Token与阶段范围 | `node scripts/verify-attachment-workflow.mjs`，结果见 `scoped-governance.json` |

浏览器专项实际检查了 multipart 原文件传输、HTTP失败重试、取消和替换、下载文件名及完整字节、拖入拒绝、数量约束、只读、键盘关闭、移除后焦点、长文件名、浅深色容纳、真实图片加载、PDF Blob内容/MIME、损坏PDF与不支持阅读器回退、权限和失效状态。

默认 headless shell 不支持原生 PDF，测试因此使用完整 Chromium channel，没有伪造支持能力。补充人工式截图观察确认桌面和390px均显示一页 PDF 的真实文字和原生工具栏，关闭/下载操作可见：`browser/native-pdf-desktop.png`、`browser/native-pdf-narrow.png`。图片观察见 `browser/native-image-desktop.png`；窄屏深色见 `browser/playground-dark-narrow.png`。这些是本地检查证据，不代替用户视觉接受或对比度接受。

重复执行：`pnpm exec vitest run packages/ui/src/attachment-workflow packages/ui/src/attachment apps/playground/src/docs/components/g6-media-pages.test.tsx apps/playground/src/docs/components/attachment-workflow-demo.test.tsx`；`pnpm exec playwright test --config tests/e2e/attachment-workflow.config.ts`。浏览器配置会启动并关闭临时服务，使用独立端口和本轮输出目录。

## 全仓检查与保留边界

`node scripts/verify-boundaries.mjs` 未通过。在本轮新增阶段记录前即报告 Drawer历史阶段/Gate与Carousel后续记录冲突、Token Foundations历史封存、旧证据越界和当前phase缺少显式策略。本轮没有修改这些既有封存规则或其他组件来消除告警；不能宣称全仓治理通过。本轮专门校验原Attachment来源和阶段旧记录保持不变。

未完成/未声明：样式和交互方案研究、用户视觉接受、真实业务上传/鉴权/配额/持久化/恶意文件扫描、Safari、VoiceOver、物理触摸/系统文件选择器、生产规模大文件内存、对比度验收、发布/Figma/业务迁移。未提交或推送Git。前端权限不是服务端鉴权；PDF只校验文件头并固定MIME，不能证明任意PDF完整或可信。默认远程下载全量读入内存，生产大文件可提供宿主下载适配器。
