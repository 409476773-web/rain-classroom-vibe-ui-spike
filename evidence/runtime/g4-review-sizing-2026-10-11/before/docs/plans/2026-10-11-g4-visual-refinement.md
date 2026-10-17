# G4 展示页视觉精修实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修正示例段落排版覆盖，完成 Item 课程资料列表，并把有效的信息与空间关系用于 Typography、Progress。

**Architecture:** 在现有 card-v2 工作树、现有 ComponentDoc / DocExample 中实施。共享文档 CSS 修复默认行高的继承边界；业务样例使用现有 UI Parts 与字体、颜色、间距 Token。所有业务数据与演示状态留在 Playground，公共组件 API 和 Foundations 保持原合同。

**Tech Stack:** React、TypeScript、既有 Rain UI / Foundations、Vitest、现有浏览器检查。

---

## 授权、模式与依据

- 用户明确授权本计划所列三个页面精修，包含排版覆盖修复。
- System Mode：涉及共享文档宿主 CSS、候选文档与验证。样例为 local-experiment，基础资产仍为 registry-candidate / unpublished，Human Gate 独立等待用户。
- 调研依据：`evidence/research/g4-design-gap-2026-10-11/research.md` 及当前页面实际测量；使用已读 shadcn Item、Radix / Atlassian Typography、Carbon Progress、Linear 设计解析。
- V04：以字号、字重、颜色、位置表达名称、正文、元信息的关系；D02：单对象内容共享承载面，动作靠近作用对象；I01：名称、属性、状态、动作各有明确职责；D05：实际长标题、390px、密度及错误恢复保持可用。
- 本轮候选规则不自动回写为全库视觉默认。文档原有零段落外边距保留；默认 24px 行高从后代 P 移到预览容器，实际排版预设可覆盖或继承。

## Task 1：修正排版宿主覆盖

**Files:** `apps/playground/src/docs/components/component-doc.css`；`tests/e2e/g4-components.spec.ts`。

1. 对真实 UI default / supporting / caption P 与 Reading 内部 P 写测量断言，保存当前 24px 覆盖的 RED。
2. 保留段落 margin reset，把默认行高放到预览容器；header / 文档说明继续拥有自己的排版。
3. 构建并确认实际 P 回到 22 / 20 / 26px，抽查既有无预设反馈与图表说明。

## Task 2：Item 课程资料列表代表样例

**Files:** `apps/playground/src/docs/components/g4-component-pages.tsx`、`.css`、`.test.tsx`。

1. 先写资料列表、独立阅读与下载、未开放状态的行为检查。
2. 同一课程承载面中组织三条资料，使用 ItemGroup / Item / ItemSeparator，名称、阅读属性、开放状态和动作保持连续对齐。
3. 阅读复用 Dialog，展示有实际内容的本地材料；下载为对应内容的 Markdown 本地文件，不假装 PDF。未开放资料保留名称与开放时间，禁止阅读和下载。
4. 资料数据和是否已读留在宿主；提供真正可复制的组合代码并靠近示例。宽度仅属于本地容器，窄屏自然换行。

## Task 3：应用到 Typography 与 Progress

**Files:** 同一 G4 页面与样式文件。

1. Typography 用课程内容呈现标题、引言、正文、元信息的连续版面，同时提供直接可见的既有预设字阶；关键数据保留 value / unit 分离。
2. Progress 用有界任务摘要组织任务名、实际数量、轨道、状态、恢复动作；演示推进 / 失败 / 重置控件放在任务内容外。
3. 失败时主恢复动作清楚，保留真实完成量；未知任务采用 Spinner 与明确说明，基础 `value=null` 的数值语义保留且不展示似百分比的本地轨道。
4. 不增加计时器、接口请求、全局 Token、公共 Props 或新依赖。

## Task 4：验证与收口

**Files:** 现有 G4 单元与浏览器检查；`docs/ai/g4-components.md`；有限治理后继及新证据目录。

1. 运行相关单元测试、类型检查和构建；检查实际段落、列表阅读 / 关闭焦点 / 下载、未开放状态、进度推进 / 暂停 / 重试 / 完成。
2. 浏览器检查桌面、390px、浅色 / 深色、Default / Compact、键盘、Reduced Motion 与 Forced Colors；视觉检阅按当前实际截图进行。
3. 复核共享宿主的相邻旧文档与一项图表说明；保留旧证据与历史 Gate，仅登记本批后继。
4. 新证据：`evidence/runtime/g4-visual-refinement-2026-10-11/`。独立审阅和自动验证分开记录；不进行 Git、Figma、发布或业务迁移。

## 尚未验证的假设

- 有界容器与连续对齐能改善扫读体验，待当前截图与用户视觉判断。
- 现有排版预设及组件 Parts 足够完成本轮样例；若实际内容暴露缺口，再记录具体证据。
