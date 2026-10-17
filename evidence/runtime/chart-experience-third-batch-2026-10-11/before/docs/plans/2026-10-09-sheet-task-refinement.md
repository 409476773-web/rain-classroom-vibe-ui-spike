# Sheet 标准任务型改造 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将用户确认的连续白底、局部 PDF 标识和紧凑属性设计落到现有 Sheet，并区分详情阅读与资料编辑。

**Architecture:** System Mode，现有 unpublished registry-candidate 增量。共享 Sheet 添加 Header / Body / Footer 三个组合 Part，不携带业务数据；现有 standalone Title / Description 和 420px 默认保持兼容。Playground 用具名 480px 局部 Recipe，实现只读详情与同一壳的表单，保留四方向。

**Tech Stack:** React / TypeScript / Base UI Drawer 1.8.0 / Rain Tokens / Vitest / Codex in-app Browser。

---

## 设计依据与范围

- 用户于 2026-10-09 明确授权“确定，开始改造”。精确图稿：`evidence/runtime/sheet-task-refinement-2026-10-09/approved-visual-target.png`，为最新局部对象标识方案的 PDF 缩小与淡底修订，非先前横向灰底方案。
- V03：使用正式 `FileFormatPdfIcon`，32px 资产画布（文件图形约 23×27px）置于 48px 局部圆角底；`Fill/Red/Alpha/2` 底层以 .6 opacity 呈现，等效约 6% 染色，图标自身不透明。
- V04 / D01 / D02：标题、对象名、三列 dl 属性、编号目录、只读备注构成连续阅读顺序；对象名18/28、目录15/24、备注Reading15/26；用对齐、短竖线和48px章节间距分区。
- D03 / D05：编辑示例使用字段、就近字数和帮助、固定取消/保存；校验名称，保存更新详情，取消/遮罩/Escape 不提交草稿。数据只保留在当前文档实例。
- 共享默认宽度不从单个 480px 设计稿晋升；顶部/底部示例局部增加可用高度，窄屏保持屏内滚动。Root 显式 swipeDirection 与 side 相同，不改全局默认。
- 范围：Sheet 源码/导出/样式、G3 文档中 Sheet 示例与调用代码、相关测试、Sheet Manifest、精确后继状态/颜色/源码记录。正式 PDF 资产与其他组件内容不改。
- 无新依赖、公共 Token、业务接口、Figma、发布、迁移或 Git 操作。图稿确认只确认方向，改造后的运行视觉待用户审核。

## Task 1: 组合壳与业务状态回归

Files: `packages/ui/src/sheet/sheet.test.tsx`、`apps/playground/src/docs/components/g3-component-pages.test.tsx`。

1. 先添加有意义的测试：Header/Body/Footer 可组合并保留 modal 语义/关闭焦点；编辑保存、取消、草稿保留、空名称校验。
2. 执行专项 Vitest，记录缺少 Parts 与编辑入口的预期失败。
3. 实现最小共享 Parts、导出类型和结构 CSS；保持旧 Title / Description 独立用法。
4. 重排示例、加入编辑状态与就近校验，更新可复制结构与 API。
5. 再运行专项测试与 app/package TypeScript。

## Task 2: 来源与候选合同

Files: `manifests/ui/sheet.yaml`、`status/current-phase.yaml`、`scripts/verification-helpers.mjs`、`scripts/verify-token-foundations.mjs`、`scripts/g23-family-refinement-governance.test.ts`。

1. 新增 exact scoped authorization 和不可变后继 binding，保留三次既有 G2/G3/Toast binding 的所有字节。
2. 为新增/改变 CSS paint 登记实际角色、表面与阈值；不放宽已有校验。
3. 同步 Anatomy、布局责任、文档与验证路径，保留候选身份与 pending runtime Human Gate。
4. 运行对应 governance、颜色消费者和 AssetIndex 检查；已知其他专题失败独立记录。

## Task 3: 实页验证与视觉比较

1. 使用现有端口 5173 的正确 worktree；真实浏览器验证四方向、详情/编辑、保存/取消、Escape/遮罩、Tab/焦点恢复、长内容滚动、窄屏、深色和密度。
2. 截图和图稿进行同状态、同内容区域的组合比较；实际字体与尺寸来自 Rain Token。记录图稿像素到 CSS 的归一化与允许差异。
3. 修复 P0/P1/P2 后复看；保存 root `design-qa.md`、专项 evidence `verification.md` 与截图。
4. 构建 Playground 并交付可操作预览。Safari、VoiceOver、触摸手势与完整对比度未验证；不从自动检查关闭 Human Gate。
