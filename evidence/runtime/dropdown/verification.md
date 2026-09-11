# Dropdown 公共入口验证

2026-09-12 人工验收：用户明确回复“视觉已完成人工和检验。”，接受本轮 DropdownMenu / Popover（含菜单选择图形与紧凑模板） 的实际运行视觉。颜色用途与对比度、独立人工键盘/输入法/读屏/物理触屏、发布和 Git 均不由此通过。正式范围见[验收登记](../../../docs/plans/2026-09-12-existing-assets-closure.md#当前运行视觉人工验收)。

2026-09-12 最新续批：非危险且可用菜单项的普通说明已按用户决定改为 `Text/Neutral/3`。危险红字继续保留；disabled、critical、selected/checked 的既有颜色与优先级保留。当前公共菜单声明为 9 项对比度、22 项用途资格发现，仍未接受例外；下方 9/26 和普通说明 `/4` 属 09-10 历史。最新验证与范围见[本轮收口记录](../../../docs/plans/2026-09-12-existing-assets-closure.md#第一轮用户决定与限定续批)及[颜色清单](../../../docs/audits/2026-09-12-color-closure-review.md)。

2026-09-12 最新页面反馈另将公共 Popover 内容默认设为 compact、内边距 12px；模板分类复用完整 Tabs 28px contained，输入 24px、底栏 Button small 32px、收藏 24/14，触屏收藏保留 44px 点击区。仅模板本地 Radio 文字/留白收紧，公共 Tabs / 选择控件配方保持。搜索、分类、选择、收藏和失败重试已按新组合回归；实测图与范围见[页面反馈修订](../../../docs/plans/2026-09-12-existing-assets-closure.md#0203-页面反馈修订)。

日期：2026-09-10。System Mode；用户在读取 HANDOFF 后授权继续建设，执行建设计划 Task 3–5。

**公共初版、三份完整业务 Recipe 及一次真实组合改造已落地。自动检查通过本批范围，独立技术复核未发现剩余可复现 P1/P2；视觉与颜色仍待评审，未发布。**

2026-09-10 追加：用户随后要求统一复用选择控件视觉，已完成；当前证据见 [Checkbox / Radio 视觉复用](selection-visual-reuse.md)。下方命令历史保留公共初版的独立时间点。

## 当前状态和实际交付

| 项目 | 本次事实 |
| --- | --- |
| 公共入口 | `DropdownMenu` 和 `Popover` 已进入 UI 出口；均为 registry-candidate / unpublished |
| 完整 Recipe | 课程更多操作；表格视图设置（菜单与原生控件面板）；新建学习单元的类型菜单→模板面板 |
| 实际改造 | 从简单 RadioGroup 面板加入搜索、分类、缩略图、独立收藏；原有底部确认与失败重试保留。见 [前后源码与修改边界](composition.md) |
| 正式控件复用 | 菜单现复用同一 Checkbox/Radio 被动视觉与状态 CSS；新面板复用 Checkbox、Radio/RadioGroup、Input、Button、IconButton；旧实验“操作后关闭”也已换成公共 Checkbox |
| 自动验证 | 当前 1214/1214 单元、39/39 相关 Chromium（含公共 11/11）；见本次视觉复用记录 |
| 独立技术复核 | 原发现已修复，最终只读复核通过；没有剩余可复现 P1/P2 |
| 阶段/颜色 | 阶段整体仍 `in-progress / findings / awaiting_human / not-granted`；当前 9 项对比度、26 项用途资格 finding 未接受例外 |
| 发布及采用 | 未发布、未迁移、未写入 Figma、未进行 Git 操作 |

阶段仍是 `token-foundations-v1`，本批由 `componentRefinements.dropdownFamily` 精确授权。旧 `dropdownBatchOne` 是独立实验，不用本批结果回写其历史 Gate；其他选择控件的验收不覆盖 Dropdown。

## 公共合同与视觉候选

使用已经安装的 Base UI 1.8.0，没有新依赖。Root 保留受控/默认状态、打开原因和取消；Base UI 负责定位、关闭、键盘与焦点。共享私有桥接仅同步真实活动入口的主题与密度。动态追加入口不能覆盖当前主题，替换 Trigger DOM 时外部 ref 随实际元素更新。

Root `closeOnAction` 默认 true，操作、链接、复选、单选都可用 `closeOnClick` 覆盖；Escape、Tab、外部点击与跨浮层交接独立处理。菜单行保持一个交互目标，CheckboxItem/RadioItem 复用菜单原语及原生 Checkbox/Radio 的被动视觉，不嵌入带 input/label 的公共 Checkbox/Radio。开放 Popover 才使用原生表单控件及并列的独立收藏按钮。

| 视觉部分 | 本批实现 | 验收边界 |
| --- | --- | --- |
| 标签/说明 | 15/22、13/18；有说明或已选时 600/400 | 沿用已确认层次 |
| 已选文字/图标 | Text/Brand/1、Text/Brand/2、Icon/Brand/1；取消后恢复 | 颜色对比度与用途仍有 finding |
| 普通说明/关键原因 | 普通 Text/Neutral/4；关键 Text/Neutral/3，选中关键 Text/Brand/1，完整显示 | 不将关键原因当装饰，不截断危险范围 |
| 行内确认与选择标记 | 已选 action/link 确认标记 16/10；菜单复选 16/10、单选 18/6、画布 24，来自原生控件 | 本次追加授权只共享被动视觉 |
| 留白和行高 | 使用已有 6/8px 留白，普通单行 34px、选择行最小 36px、有说明典型 58px；内容可增长 | 属公共 Token 映射候选，未把原稿 7/9、36/60 宣布为接受 |
| 表面与反馈 | Border/Neutral/3、现有 overlay 阴影，Neutral Alpha/6→5、Red Alpha/2→1 | pressed 优先于 hover；边框/阴影/背景仍待视觉确认 |
| 宽度 | Menu 软默认 280px，Popover 320px；课程示例 240px、模板 360px | 可按业务调整，Base UI 可用宽高约束；不是新全局尺寸 Token |

样式通过组件引用的独立 CSS 随公共入口加载；没有扩大全局扫描、复制 Token 类名清单或增加另一套 overlay 状态管理。Manifest、Registry、扫描、CSS 例外和颜色消费者均精确登记。生成器只刷新消费者登记，Foundation Token 值未改变。

## 本次验证与失败归属

原始日志：[最终检查](checks.log)、[首轮失败与定位记录](initial-checks.log)、[浏览器逐项结果](browser.json)、[颜色测量](color-review.json)。

| 检查 | 结果 |
| --- | --- |
| 公共组件与专项治理小集 | 15 项组件 + 7 项治理，22/22，通过 |
| `pnpm verify` 首轮 | 治理、图标、全工作区类型检查通过；单元 1208 通过、4 失败，原日志保留；此命令没有执行到构建/浏览器，不声称整条命令通过 |
| 全库单元最终复跑 | `pnpm exec vitest run --maxWorkers=2`：79 个文件、1212 项全部通过；没有放宽断言/超时 |
| 全量 Chromium 首轮 | 176 项：172 正常通过、2 个已声明 Radix 预期失败、2 个意外失败；下面的定向复跑解决意外失败 |
| 受影响浏览器复跑 | 公共 Dropdown、旧比较页和 Core UI 共 41 项：39 正常通过、2 个已声明 Radix 预期失败；0 意外失败、0 跳过、0 重试；其中公共 Dropdown 9/9 正常通过 |
| 最终治理检查 | Lockfile、Workspace、Evidence、Boundaries、Tailwind、Tokens 通过；Token 颜色 finding 仍保留 |
| 类型与构建 | 全工作区类型检查、生产构建通过；已有完整图标目录大分块提示保留 |

首轮问题及处理：

1. Dropdown 详情链接误放在 Select 家族的一入口示例内；移至已有公共详情导航区域，没有改变 Select 或其一入口检查。
2. 冻结 B2 测试 fixture 未剔除本批和已登记的 Selection Playground SC04 新文件；按现有专项文件清单补齐两行隔离，保留冻结归档 SHA 和完整旧合同。没有修改 SC04 运行代码或验收。
3. FIFO 防阻塞用例的 1 秒子进程上限在默认高并发全库运行中触发。最终以两 worker 运行原测试全部通过，未提高超时或跳过负例。
4. 旧实验换成正式 Checkbox 后，测试的 `.check()` 点击屏幕阅读器 input 被可见画布挡住；改为点击真实可见标签，再断言原生 checkbox 已选。业务关闭策略的鼠标/键盘断言全部保留。两底座复测均通过。

浏览器仍使用原 Chromium 项目、原始测试和 `retries:0`，仅临时配置把地址指向本任务 5190 服务，工作目录改为临时输出目录，避免覆盖其他家族及旧实验截图。4173 的其他任务服务未结束。没有把定向复测表述为第二次全量 176 项运行。

## 交互、视觉与独立复核覆盖

- 操作/链接/复选/单选关闭策略、条目覆盖、受控状态与禁用原因；替换内容后保留可访问描述与 label typeahead；移除原 Trigger 后返回指定剩余目标。
- Arrow/Home/End、子菜单 hover/ArrowRight/Escape、Tab、外部点击、Dialog/模板面板交接及返回；真实浏览器 pressed 比 hover 更强。
- Light/Dark、打开时主题变化、选中禁用的层次、compact 的 30/10/6px 密度变量；独立复核在真实 Chrome 验证深色面板和 compact 值。
- 320×480 视口、列表末端收藏、底部动作、无结果、首次失败保留查询与选择、重试成功；forced-colors 的选择标记与全局 Focus。
- 独立复核闭合描述关联、自定义内容、类型收紧、动态入口、真实 ref 转发、取消打开以及 CSS 解析错误漏报。`@layer` / `@import` 后出现未登记样式现在明确失败。

本次亲自查看的浏览器截图：[浅色选择菜单](menu-light.png)、[深色选择菜单](menu-dark.png)、[模板面板](template.png)、[窄屏滚动末端](narrow.png)。这些是本批可评审材料，不是 Human Gate 通过证明。

## 仍待用户/设备验证的事项

公共表面、候选行距和整体视觉尚待用户确认。当前颜色 35 项消费登记无错误，但仍有 9 项对比度 finding、26 项用途资格 finding；全部 `acceptedException:false`。Text 保留 4.5:1，meaningful icon / essential boundary 保留 3:1，不将已选、原稿来源或其他组件验收作为豁免。

普通说明的 Text/Neutral/4 在交互区域违反弱中性色用途条件；Brand 文字/图标叠加 Red Alpha 背景也存在跨色族用途条件。即使个别实测比值达到门槛，仍不能把它们记录为资格通过。真实系统屏幕阅读器、操作系统 IME、物理触屏和 Firefox/WebKit 未在本批完成；正式发布、迁移和 Figma 写入均未执行。

### 公共初版历史对比度 finding 清单

下列为统一视觉前的 19 项历史值；其中旧 Border/Neutral/2 菜单指示器已退役。当前 9 项及共享图形的新测量见 selection-color-review.json。底层均为 Background/Neutral/1；Alpha 背景按实际主题合成。原始精度和全部用途资格记录保存在 color-review.json。

| 前景 | 主题 | 当前背景 | 实测比值 | 原门槛 |
| --- | --- | --- | ---: | ---: |
| Text/Neutral/4 | light | Fill/Red/Alpha/1 | 4.420 | 4.5 |
| Text/Red/1 | light | Fill/Red/Alpha/1 | 4.340 | 4.5 |
| Text/Red/1 | dark | Fill/Red/Alpha/2 | 4.260 | 4.5 |
| Text/Red/1 | dark | Fill/Red/Alpha/1 | 3.880 | 4.5 |
| Text/Brand/2 | light | Fill/Red/Alpha/1 | 4.071 | 4.5 |
| Text/Brand/2 | dark | Fill/Neutral/Alpha/6 | 4.350 | 4.5 |
| Text/Brand/2 | dark | Fill/Neutral/Alpha/5 | 4.180 | 4.5 |
| Text/Brand/2 | dark | Fill/Red/Alpha/2 | 4.193 | 4.5 |
| Text/Brand/2 | dark | Fill/Red/Alpha/1 | 3.817 | 4.5 |
| Border/Neutral/2 | light | Background/Neutral/1 | 1.560 | 3.0 |
| Border/Neutral/2 | light | Fill/Neutral/Alpha/6 | 1.540 | 3.0 |
| Border/Neutral/2 | light | Fill/Neutral/Alpha/5 | 1.530 | 3.0 |
| Border/Neutral/2 | light | Fill/Red/Alpha/2 | 1.540 | 3.0 |
| Border/Neutral/2 | light | Fill/Red/Alpha/1 | 1.520 | 3.0 |
| Border/Neutral/2 | dark | Background/Neutral/1 | 1.670 | 3.0 |
| Border/Neutral/2 | dark | Fill/Neutral/Alpha/6 | 1.670 | 3.0 |
| Border/Neutral/2 | dark | Fill/Neutral/Alpha/5 | 1.660 | 3.0 |
| Border/Neutral/2 | dark | Fill/Red/Alpha/2 | 1.660 | 3.0 |
| Border/Neutral/2 | dark | Fill/Red/Alpha/1 | 1.630 | 3.0 |
