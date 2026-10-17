# 中国地图整体体验优化 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让用户实际体验地图主导、就近读数、连续下钻与返回、稳定状态及克制动效的中国地图样本。

**Architecture:** Prototype Mode，仅页面私有配方 `china-map-experience-2026-10-10`。复用 Bklit Choropleth 的投影、缩放、上下文及提示框，局部绘制层和控件负责中国地图体验；共享图表、其他图型、399项真实源数据均冻结。视角留在样本宿主，同层量程有序稳定，最新导航覆盖旧请求。

**Tech Stack:** 已安装 React、Motion、Rain UI/IconButton/Popover/Tooltip、Choropleth、Vitest、Playwright；不新增依赖。

---

用户在 2026-10-10 明确批准上一轮七部分方案，要求完成后实际体验，再决定推广。候选动效时间通过运行校准；实现完成不等于视觉验收。保留统计 Mock、混合边界快照及可见许可署名。

方法：V01 稳定蓝灰数据色；V04 读数/说明层级；V05 控件与行为一起调整；D02 动作与结果就近；D05 窄屏保留地图及可达地区；I02 图例、读数、精确数据对应。未确认的新经验仅保留此任务记录，不写全库规则。

## Task 1: 布局与等价操作

Files: `apps/playground/src/docs/components/chart-business/china-region-examples.tsx`, `china-region-page.tsx`, `china-region-page.css`, `china-region-examples.test.tsx`。

先添加失败用例：读数位于地区列表之前、列表按需展开、全国导航可点、稳定画布存在于加载/错误状态；运行聚焦 Vitest。实现标题/导航/画布/图例/固定读数栏/来源/按需明细顺序，复用 Popover 提供地区按钮及键盘入口；验证原零、缺测、真实地区身份与重试。

## Task 2: 地图私有反馈与视角

Create: `apps/playground/src/docs/components/chart-business/china-region-map.tsx`。复杂行为复用现有宿主单测及真实浏览器地图专测验证，避免重复同一实现的单测。

复用现有共享上下文，不改公共 Props。先测试缩放视角归一化、同层量程与快速请求防漂移。局部 SVG 层保持固定 hit path，hover 只增加惰性边界，填充原色且按 CSS 渐变；复用 TooltipBox 就近读数。图标组使用正式 add/minus/refresh/close。视角按层保存并在返回/窄屏按尺寸恢复；滚轮继续页面，触屏默认单指页面、双指缩放，拖动不激活地区。恢复仅当前层。

## Task 3: 连续进入、更新与稳定状态

数据加载期间保留旧地图；最新请求生效，失败保留原层并重试。靠近选中省份及交叉淡入接续子层，返回恢复旧视角与选中强调。进入/退出约 350ms、缩放约 240ms、数据填充约 280ms，减少动效直接终值；快速操作不排队。同层图例范围按初始分档保持，只在超出时显式扩展。固定读数更新数值与状态同步，零和缺测独立。

## Task 4: 下载与验收

Modify: `apps/playground/src/docs/components/chart-china-source.tsx`, 中国地图下载检查分支及原地图专测的定位；新私有文件包含在实际下载中。仅中国地图 CSS 消费登记更新；不调整其他图表登记。

Update: `tests/e2e/chart-business-map.spec.ts` 和 `chart-business-map-scope.spec.ts`，沿用原地图专测，更新新布局定位与新增连续体验场景。先记录现有失败，随后真实鼠标/键盘/触控仿真验证进入、返回恢复、更新、鼠标滚轮、拖动/捏合误激活、Popover小地区、布局稳定、390px/1440px和减少动效。运行聚焦单测、Playground类型与构建、独立实际下载消费；共享源码保护哈希相同即可保持原生地图默认。

证据：`evidence/runtime/chart-china-experience-2026-10-10/`。更新该任务阶段记录与私有使用说明，打开 5173 `#chart-china` 给用户体验。未做实机触控/完整对比度/全图型推广/发布/Figma/Git提交；视觉 Human Gate 待用户实际审阅。

## 当前交付

2026-10-10 四项实施任务已完成，局部技术检查通过。按钮大小反馈落实为28px按钮/14px图标，组间距与留白各2px。安装版Motion hook不随系统设置重新渲染，本地图复用已有媒体查询监听方式补齐实时减少动效；浏览器回归通过。结果与4处全库测试类型问题见[验证记录](../../evidence/runtime/chart-china-experience-2026-10-10/verification.md)。用户实际体验与推广决定仍待确认。
