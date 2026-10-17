# G6 文档页试改 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. 当前会话以独立文件分工实施并由主代理整合、核验。

**Goal:** 在 G6 五个现有文档页中试改视觉与主示例，将课程答疑、课堂讨论、课后反馈呈现为完整可操作的本地场景。

**Architecture:** 保留公共 UI、既有引擎、组件入口和 API 示例。新增页面私有示例文件及具名 Local Recipe；普遍性样式修改先在文档样板中比较，不在本轮迁入 packages/ui。请求、反应、草稿、重试和提交状态都是明确标注的本地演示。

**Tech Stack:** 当前 React、TypeScript、Vite、Rain UI/Foundations、Vitest 与现有 MessageScroller/Questionnaire 引擎；不新增依赖。

---

## 授权、模式与边界

- 用户当前指令：“开始文档试试改造”。解释为先实施 G6 文档页试改；最近方案为本轮设计依据。
- 模式：Prototype Mode，页面私有 local-experiment。修改 apps/playground 的五个会话文档页及必要示例和测试。
- 保留当前 card-v2 checkout 与用户已有修改；不新建 checkout、不提交、不推送、不修改公共包或验收状态。
- 沿用 Rain 标题16/24、长阅读15/26、普通气泡14/24、400/600字重和现有语义色。
- 依据：AGENTS、SPIKE_BRIEF、当前阶段、G6组件指南、Rain Designer、Typography合同与第三轮细化稿。

## Task 1：保存基线与行为回归

**Files:**
- 复制当前 g6-conversation-pages.tsx / css / test.tsx 到 evidence/runtime/g6-doc-refinement-2026-10-14/before。
- 记录五项公共 UI 源码哈希；实施后核对未改。
- 新增关键行为测试：停止保留片段、重试同轮、条件题缓存、提交失败保留答案、成功收束完成态。

先运行新增行为断言，确认因旧行为缺少而失败；按功能实施后再次运行。单纯视觉和排版改动用实际浏览器比较，不写镜像实现的断言。

## Task 2：Bubble、Message、Marker 主示例

**Create:** apps/playground/src/docs/components/g6-message-showcase.tsx / css。

- 导出 BubbleShowcase、MessageShowcase、MarkerShowcase，主页面负责 DocExample 壳。
- 长答用正文标题、段落和列表，问题用 secondary；来源、复制、反馈均靠近所属回答。
- 以 MessageRecipe 试验顶部头像对齐、身份/时间权重与 Footer 换行；不改公共 CSS。
- Bubble 保留七种表面；Marker 以日期、处理、结果、失败的上下文演示。
- 保留真实可访问名称、焦点、已有图标与现有部件；功能仅作本地演示。

## Task 3：课程答疑与课堂讨论

**Create:** apps/playground/src/docs/components/g6-course-conversation.tsx / css / test.tsx。

- 导出 CourseConversation、ClassroomDiscussion。独立文件与样式作用域，主代理接入页面。
- 答疑由标题、消息视口、输入构成；按钮发送、Enter换行；单一生成，允许编辑下一问。
- 每条回答有稳定ID与状态；停止不续写，重试原位更新同一轮，保留失败/停止片段；卸载清理计时器。
- 来源短详情按需展开。返回最新与上翻保位沿原引擎；开发模拟控件放场景外。
- 讨论统一左作者轨道、连续组与短引用；回复目标可取消，发送等待保留并锁定本次草稿，失败可恢复。
- 自动测试覆盖重复请求/停止/重试/卸载及回复输入；滚动几何用浏览器检查。

## Task 4：课后反馈

**Create:** apps/playground/src/docs/components/g6-feedback-scenario.tsx / css / test.tsx。

- 导出 FeedbackScenario。保留原生 form/fieldset/input、Questionnaire 引擎与 stable name。
- 单列题面、真实动态题次、题目级错误、条件短补充、最后120字可选补充。
- 空白最后题“跳过并提交”，有内容“提交反馈”；成功摘要替换表单。
- 条件编辑缓存与提交载荷分开；保存本页草稿保留缓存；恢复跳过元信息诚实提示重新确认。
- 演示控制（恢复示例、失败开关、重新开始）在场景外；真实主路径无开发术语。
- 回归覆盖分支回改/恢复、失效答案排除、失败保留、最终全路径校验、空白/有内容提交。

## Task 5：接入五页及验证

**Modify:** apps/playground/src/docs/components/g6-conversation-pages.tsx / css / test.tsx。

- 用新主示例替代原首屏小样；旧 API/变体示例保持可查。
- 删除被替代的私有实现与过时行为断言，保留能力覆盖并由新场景测试承接。
- 五页只局部改变预览外框、内容宽度与密度，不修改 component-doc 全局样式。
- 所有未来公共默认候选明确显示为文档页试改。

验证命令（当前仓库）：

1. pnpm exec vitest run apps/playground/src/docs/components/g6-conversation-pages.test.tsx apps/playground/src/docs/components/g6-course-conversation.test.tsx apps/playground/src/docs/components/g6-feedback-scenario.test.tsx
2. pnpm --filter @rain-next/playground typecheck
3. pnpm --filter @rain-next/playground build
4. 在当前 Vite 服务查看 #bubble / #marker / #message / #message-scroller / #questionnaire，检查宽页和窄页，执行停止/重试/来源/反馈主路径。
5. 记录源码范围、截图、有限验证与未测范围；核对公共源码哈希未变。

不把本轮自动检查或浏览器抽查升级为用户视觉验收、全库通过或发布资格。现有全库检查若有与本轮无关的失败，保留说明，不扩展修复。

## 本轮执行结果

五个文档页及三个本地场景已完成第一轮试改。最终相关测试 32/32 通过，24 份 G6 公共源文件哈希未变，宽屏/390px 窄屏与核心交互完成有限浏览器抽查。独立 Vite 打包通过；最终完整 build 被范围外 Carousel 的 `IconButton` 类型错误阻断。详见 [验证记录](../../evidence/runtime/g6-doc-refinement-2026-10-14/verification.md)。本轮未修改公共默认、验收 Gate、依赖或 Git 提交状态。
