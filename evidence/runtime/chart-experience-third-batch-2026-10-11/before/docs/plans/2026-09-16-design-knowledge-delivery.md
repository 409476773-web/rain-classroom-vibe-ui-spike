# Design Knowledge Delivery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将已确认的设计经验接入每次原型生成和独立 Starter，并用一个无本轮聊天历史的新需求检验消费路径。

**Architecture:** 沿用现有 AGENTS、docs/ai 和 RN-14 导出器，增加可独立阅读的设计指南，以 BM-B 大表单为第一份具体组合。组件合同与源码保持原事实源；页面局部经验不自动晋升为公共规范。独立样例仅为一次消费试验，不能证明稳定首稿质量。

**Tech Stack:** Markdown、现有 Node.js 导出器、Vitest、React/Rain Next 与现有浏览器检查工具。

---

授权：用户在只读评估与三项建议后要求“继续”。System Mode，仅知识入口、导出、相应验证与本地试验；不修改共享组件或既有页面，不发布、不提交 Git、不写 Figma。当前工作树已有大量未提交成果，逐文件保留。

## Task 1：可消费的设计依据

- 新建 `docs/ai/prototype-design.md`：任务识别、组件选型、条件规则、整页自查、反馈回流。
- 新建 `docs/ai/form-composition.md`：适用/退出条件、分区/字段/操作/状态关系、局部数值范围、源码与视觉参照。
- 修改根 `AGENTS.md`、`docs/ai/README.md`，把短入口接到原型任务开始处；不创建第二套全库状态表。
- 依据现有 BM-B 最新分区与头部确认记录；截图作为当前参考，原视觉接受与对比度待审查分开。

## Task 2：独立导出保持设计知识

- 修改 `scripts/rn14-starter.test.ts`，先验证 M1/M2 导出均含可发现的 AI 入口、完整本地文档引用、来源锁与篡改检测；在实现前运行并保留缺失入口的失败。
- 修改 `scripts/rn14-starter.mjs`，随源码带走同一份指南、所引用的组件合同、图片及最小来源记录；生成短 `AGENTS.md` 指向指南。
- 保持既有导出拒绝覆盖、路径/符号链接检查、M1/M2 边界和历史归档不变。
- 导出至仓库外新目录，检查来源锁、相对链接、离线安装、类型与构建。

## Task 3：一次新需求消费试验

- 实施前固定需求：教师编辑一次课程研讨活动，包含短字段、长说明、报名限制、保存失败与取消保护；需求不指定组件、像素或页面结构。
- 使用 subagent-driven-development 的独立实现任务，不继承本轮聊天，只读取导出目录材料；主任务同时检查仓库入口与导出回归。
- 保存第一次可运行源码、设计选择依据、截图和测试结果；先做需求符合性复核，再做代码质量复核。
- 明确记录是否额外指导、自查修正和用户修改次数；没有真实测量的效率、token、主观质量分数记为 `not-measured`。

## 验证与交付

基线与变更文件指纹、红绿测试、导出安装/类型/构建、文档链接与既有边界检查、独立审阅记入 `evidence/runtime/design-knowledge/review.md`。新页面视觉等待用户审阅；技术检查不替代人工接受。若遇到范围外基线失败，保留结果和复现，不改写旧证据。先完成这一类消费闭环，再决定是否扩展更多组合。

实施结果（2026-09-16）：Task 1–3 已完成。[交付与证据](../../evidence/runtime/design-knowledge/review.md)保留首稿、两处自查调整、一次独立复核发现的历史导航缺项及修复。该经验已回流指南并随最新 Starter 交付；新页仅通过本地技术与独立审阅，视觉仍待用户判断。
