# Dialog and Task Details Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 桌面课前任务编辑使用居中 Dialog，任务列表使用右侧非模态 Drawer 连续查看详情，让两者的任务关系可实际体验。

**Architecture:** Prototype Mode 页面私有组合，复用现有 Dialog、AlertDialog、Drawer 和 Rain 视觉资产。编辑草稿及本地模拟保存留在原宿主；新增只读详情宿主管理当前任务。保留底层四方向能力示例，不改共享容器默认值、依赖或原有来源封存。

**Tech Stack:** React、TypeScript、Vite、Rain Next UI、Vitest / Testing Library。

---

## 用户已选择的方向

来源：当前用户明确要求“课前任务编辑在桌面端用弹窗，抽屉用任务列表→侧边详情→连续切换任务，并且在web端时从右侧抽出”。本轮新运行实例尚未获得人工验收。

设计依据：AGENTS、SPIKE_BRIEF、当前 Drawer 记录、Rain Designer v0.2.1 / 指南v0.5第1、2、4、5、6、7.1章、docs/ai/prototype-design.md 和实际组件 API。此前编辑流程已有草稿保护，当前底部模态容器未体现列表与详情的关系。

## Task 1: 编辑容器迁移

Files: `apps/playground/src/docs/components/g6-task-drawer.tsx/.css/.test.tsx`。

用 Dialog Parts 替换 Drawer Parts，导出 TaskDraftDialog；去掉吸附高度和展开/收起入口。保留同层预览、字段校验、失败重试、pending阻止退出、未保存AlertDialog及安全焦点恢复。通过现有八项行为检查及实际容器断言。

## Task 2: 列表与详情抽屉

Create: `apps/playground/src/docs/components/g6-task-details-drawer.tsx/.css/.test.tsx`。

三个固定示例任务有独立标题、要求、完成方式。非模态、禁止指针外部退出、right方向；列表入口与前后按钮更新同一个打开面板，按ID维护对象关联。正文独立滚动、右上角关闭；首尾按钮disabled；选中标记、计数、详情和关闭后的返回焦点保持一致。Web窄屏同样从右侧抽出，前后按钮保持可达。

## Task 3: 消费与文档

Modify: `apps/playground/src/docs/components/g6-interaction-pages.tsx` 的 Drawer 示例和选型说明；`packages/ui/src/drawer/README.md` 的任务样板说明；根目录 `outputs/drawer-visual-proposals-2026-10-14/interactive-src` 与 README。

同一真实源码进入 Playground 与8768独立演示。独立页面同时提供编辑弹窗与列表详情两个场景；旧视觉稿保持历史身份。

## Task 4: 检查与反馈记录

运行相关单元测试、Playground类型检查和独立演示构建。浏览器验证桌面居中编辑、右边缘详情、背景列表可操作、连续切换、首尾边界、关闭焦点、窄屏长正文与操作可达。对比列表各行与当前标记、详情标题与右上角关闭、正文与底部前后操作的实际排版。

本地记录位于 `evidence/runtime/drawer-refinement-2026-10-14/dialog-and-task-details`，保存有限修改前后来源和实际检查。原28项封存及并发文件来源差额保留，不重新绑定或声称完整G6检查通过。Git不提交、不发布，不把AI检查转为人工验收。
