# G2–G3 家族精修首批 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将用户确认的 Toggle Group、Command、Sidebar 视觉方向落实到真实共享候选和独立 Playground 页，并修复展示页的主题、字号与尺寸干扰。

**Architecture:** 复用现有 React / Base UI 状态与 Rain 图标，调整三组共享候选的 Parts 样式；面板宽度、图标工具组和演示内容留在页面组合。文档标题样式只作用于文档自己的标题，主题在文档生命周期内覆盖页面并恢复原值。

**Tech Stack:** React、TypeScript、Tailwind / Rain Tokens、Base UI 1.8.0、Vitest、现有 Playwright 回归与 Codex In-app Browser。

---

用户于 2026-10-08 选择「按家族精修」，确认五个家族的分批方案，并确认 `approved-visual-target.png` 的具体视觉方向。当前批次为 System Mode，范围是三个代表组件及其共用文档表面；其他家族保留下一批。图稿确认不等于实际组件的视觉验收。既有 Gate 和冻结交付继续保留。

设计来源：`evidence/runtime/g2-g3-family-refinement-2026-10-08/approved-visual-target.png`，原始生成结果为 `exec-9a3f919e-48dd-4c6f-92f1-c4efeefff51f.png`。图稿的完整画布是评审排版；落实目标是组件结构、状态和层级，尺寸与图标采用 Rain 现有合同，逐组件比较。

方法：V02 共用字号、间距与边界，保留不同状态含义；V04 区分分组、内容、快捷键；V05 修改外观时保留选择、命令执行与导航行为；D02 通过留白和对齐组织展示；D05 核对深色、紧凑密度、长内容与窄屏。

### Task 1: 先复现显示缺陷并保存基线

Files: `tests/e2e/g2-g3-family-refinement.spec.ts`、`apps/playground/src/docs/components/component-doc.test.tsx`、`scripts/g23-family-refinement-governance.test.ts`、`scripts/verification-helpers.mjs`、`evidence/runtime/g2-g3-family-refinement-2026-10-08/`。

- 保存修改前源码、SHA-256、分支和 HEAD；现有修改按原样保留。
- 添加有实际渲染断言的检查：多选无多余外框、Command 高度限制与紧凑密度、Sidebar 分组字号与收起居中、深色表面、窄屏和基础操作。
- 运行专项检查，记录正确的失败原因，后续使用同一检查验证修复。
- 范围登记只识别用户确认的三个样板和展示底座；通过正向 / 越界 / 人审状态测试保持原 B2 冻结状态不变。
- 共享文档有既有源码绑定时，在 `scripts/verification-helpers.mjs`、`scripts/verify-token-foundations.mjs` 中接入精确后继记录；保存本批 source bindings 与颜色角色，不改写旧证据字节或降低原阈值。

### Task 2: 落实三组样板和展示底座

Files: `packages/ui/src/{toggle/toggle.css,toggle-group/toggle-group.css,command/command.tsx,sidebar/sidebar.tsx,kbd/kbd.tsx,styles.css}`；`apps/playground/src/docs/components/{toggle-group-page.tsx,toggle-page.tsx,g3-component-pages.tsx,g3-component-pages.css,component-doc.tsx,component-doc.css}`。

- Toggle Group 保留既有 API：单选连体、多选分离、图标工具组；颜色、字重、描边、禁用与 Focus 同时检查。
- Command 沿用 Autocomplete：轻中性色键盘高亮、受限列表高度、随现有 Density 改变尺寸。页面组合承载搜索图标、命令图标、作用域内快捷键和底部说明。
- Sidebar 当前目的地采用轻品牌表面；分组标题恢复 12px，图标使用现有资产；收起保持可访问名称与居中。
- 文档去除网格干扰，标题和预览重新建立层级；页面样式不覆盖组件内部标题或 Command Input；主题随文档挂载/卸载清理。
- 不新增公共 Token、组件 Props、依赖或应用路由。

### Task 3: 校准、回归与证据

Files: 四份相关 Manifest、`status/current-phase.yaml`、本批验证与 `design-qa.md`。

- 运行专项渲染检查、既有组件 / 演示行为回归、受影响工作区类型检查和 Playground 构建。
- 在实际 In-app Browser 操作三页，并在相同状态下捕获轻色、深色、紧凑与窄屏；与批准图稿共同审阅。
- 复核受共享样式影响的旧 G2 / 导航局部组合；有发现时修复后再检查，保留前后证据。
- 更新来源与本批状态，实际组件的人审保持 awaiting-user-review；包、Registry 发布、Figma、业务迁移和 Git 写操作不在本批。

验证假设：图稿中的图标为示意，实际以 Rain catalog available 资产为准；Command 是 inline 检索列表，底部不显示不存在的 Escape 关闭行为。现有 compact Density 为 30px，Toggle 的显式尺寸沿用其自己的 32/36/40 轴。实际 Safari / VoiceOver 与完整对比度验收仍独立。
