# RN-08 Pagination 轻量单行验证

## 运行视觉验收

2026-09-14 用户明确“没问题。视觉确认”。当前分页组件运行视觉 Human Gate=accepted，精确范围为 `pagination-current-runtime-visual-only`，包含最新 180px 浮层、主题色文字跳转、单行布局及数字/单位/图标层级。记录在 status/current-phase.yaml 的 humanGateDecision，并同步 Manifest、Registry 与消费者登记。

本次只更新验收记录和相应校验，不改运行代码。Contrast Acceptance 仍为 not-granted，组件仍为 registry-candidate，未提交、发布或迁移业务。以下保留视觉确认前的技术验证记录，历史 awaiting_human 状态已由本条限定视觉确认更新。

## 16:14–16:16 截图反馈后的当前版本

本轮进一步修改：浮层由 240px 缩至 180px；跳页动作使用既有 Button text/brand，移除箭头按钮及重复“共 N 页”；错误出现时才关联范围说明。上一轮输入法、受控接受和单行机制不变。

导航与更多图标常态 Icon/Neutral/3，比原 Icon/Neutral/2 浅一级；鼠标 Hover/Pressed 使用 Icon/Neutral/2，避免在反馈填充上过淡，Disabled 保留其原语义。改动仅由 Pagination 的 Local Recipe 与原生链接局部配方承载，未修改共享 IconButton。常驻数字使用主文字 Text/Neutral/1，单位为 Text/Neutral/3、13px Compact 字号，常规数字为 14px。

本轮亲自运行：33/33 专项、全库类型检查及测试类型、生产构建、Tailwind B2、Token 消费者约束通过；Chromium / Firefox / WebKit 完整分页矩阵 18/18，14.7 秒，retries=0。未重跑全库单元，历史五项边界失败保留在下方记录，未宣称全库通过。

新增浏览器断言覆盖浅/深 × 24/28/32 的 180px 浮层、四个容量选项同一行、Input 内完整的主题色文字按钮、无重复总页数/悬空描述、导航按钮/链接一致的浅色以及常驻数字/单位字号。导航常态声明对比度最低 3.383:1，交互态图标按实际背景计算均达到 3:1；仍不代表人工颜色验收。实际截图与 paint.json 已更新为本轮，完整输出 `/tmp/rain-pagination-visual-final`。

独立有限差异复核 passed，未发现新增 P1/P2；独立运行组件和颜色检查 29/29，并在 Chromium 验证文字 Button 的 Tab、加载禁用、成功返回焦点及图标状态颜色。当前 Implementation=completed、scoped Automated=passed、Independent Review=passed；Human Gate=awaiting_human、Contrast Acceptance=not-granted。

仅调整本组件及对应登记/证据，未新增依赖、修改全局 Token、提交或发布。下面保留上一轮实现及验证历史；其中截图引用指向当前版本。

## 上一轮记录

2026-09-14，用户明确“开始实施”后的本轮结果。新呈现替代初版常驻 Select、外置跳转按钮和辅助区换行。范围仅 Pagination，运行视觉仍 awaiting_human，contrastAcceptance=not-granted，未发布。

## 当前实现与实测

- 主栏总数、导航和竖向更多按钮保持单行；横向省略号仍用于跨段翻页。
- 正式 Popover 收纳页容量按钮组和跳页 Input。Enter 或输入尾部箭头提交；错误仅占浮层空间，不改变主栏高度。设置保留主题、避让与返回焦点。
- 按整条内容盒宽度计算：减少页码 → 当前/总页数 → 总数收进浮层。显式 24/28/32 控件尺寸保持。常驻条数为可选，同一浮层入口，无重复设置。
- “50 条/页”常驻入口宽约 79.8px，无常态边框；数字 Neutral2、单位 Neutral3，较初版整体 Neutral1 分出层次。使用既有 Rain Token，没有新增颜色值。
- 受控提议仍原子接受；旧容量/跳页请求完成不会打断新输入。组合输入期间禁用再启用后可继续提交。

## 验证结果

| 检查 | 结果 |
| --- | --- |
| Pagination 组件 / 文档 / 授权 / 颜色专项 | 33/33，通过；组件 27 项 |
| 全库类型检查、生产构建 | 通过；保留既有大 chunk 提示 |
| Chromium / Firefox / WebKit 完整分页矩阵 | 18/18，16.3 秒，retries=0 |
| 独立审阅两处修复后的三浏览器交互回归 | 3/3，4.7 秒 |
| lockfile / workspace / evidence / Tailwind B2 / Token 消费者约束 | 通过 |
| 独立技术审阅 | passed，详见 independent-review.md |
| 运行视觉 / 人工对比度 | awaiting_human / not-granted |

完整矩阵覆盖浅/深 × 24/28/32、实际 240px 容器、默认示例直接进入 320/390/768px 视口、长页码、输入合法/非法/超大整数、IME、浮层主题/尺寸/屏幕避让、Escape 返回焦点、Tab 到尾部箭头、异步成功/失败/重试/过时响应、空/单页/未知/禁用及真实链接。根高度在输入和错误时保持 32px，实际按钮边缘未越界。重载后身份、标题、控制台和遮罩检查正常。强制颜色仍为 2px 焦点线与 2px 间距。

Safari 原先 Tab 会跳过没有显式 tabindex 的尾部原生按钮，导致焦点离开浮层；为该动作添加 tabIndex=0 后，实测 Tab 到达“跳转”，未调整共享组件或模拟跳过此步骤。Tailwind 扫描曾将局部变量 collapse 识别成可见性工具类，改名 shouldCollapseSize 后消除，未放宽 allowlist。

## 截图与颜色

以下均为当前实际浏览器截图，已目视检查，没有修图；以上方当前版本说明为准。

![默认单行数据分页](light-data.png)

![深色窄容器](dark-narrow.png)

![浅色分页设置](settings-light.png)

![深色分页设置](settings-dark.png)

![可选的紧凑条数入口](inline-50.png)

三浏览器颜色和几何记录见 [paint.json](paint.json)。分页自有登记未新增低于阈值的文字组合。当前页静态对比度 Light 5.516、Dark 5.813；按钮/链接 Hover/Pressed 最低 Light 4.884、Dark 4.643。常驻入口数字/单位实测 Light rgb(58,72,101) / rgb(73,93,135)，以现有文字语义分级保留可读性。Input / Popover 等共享依赖的既有问题仍按各自记录保留；这些计算与截图不表示人工颜色已验收。

完整浏览器输出：`/tmp/rain-pagination-compact-final`；最终交互输出：`/tmp/rain-pagination-compact-review-regression`。

## 全库边界与范围

全库回归在两处最终局部修复前运行：92 文件，1300 通过、5 失败，102.52 秒。最终修复后对应组件/文档/治理/颜色专项 33/33、构建及三浏览器交互 3/3 通过。5 个全库失败仍来自已有四项边界问题：工作包两份历史 HTML 不在旧 allowlist，已有 HEAD 和 origin 与历史 Git 登记不一致。保留旧规则和文件，未改 Git 或削弱检查。本批 scoped automatedVerification=passed 不代表全库检查全部通过。

首轮并发全库回归还出现一次 FIFO 检查超时及上述变量误识别；改名并降低验证并发后，完整回归仅剩原五项历史失败。

旧 Vue 只读。本轮没有新依赖、Foundation Token 值变更、提交、推送、发布或迁移。未运行真实读屏器、物理触摸设备或操作系统中文输入法；IME 是组合事件回归。Table、Empty、完整 BM-A 与其他 Gate 均未关闭。

## 复现

```sh
pnpm exec vitest run packages/ui/src/pagination/pagination.test.tsx apps/playground/src/docs/components/pagination-page.test.tsx scripts/pagination-rn08.test.ts scripts/pagination-color-consumers.test.ts --maxWorkers=2
pnpm typecheck
pnpm build
pnpm exec playwright test --config tests/e2e/pagination.config.ts
pnpm verify:tailwind-b2
pnpm verify:tokens
pnpm exec vitest run --maxWorkers=2
```
