# InputNumber Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 建设独立 InputNumber，复用 Rain Input 的三种外观与 FormItem，落实已确认的数字编辑、范围错误和左右步进规则。

**Architecture:** 原生 text input 持有一份编辑草稿，纯函数负责数字分类、约束与十进制步进；原生 constraint validation 阻止未完成和无效内容提交。复用 fieldFrameRecipe、Input 尺寸/附加文字、正式增减和清除图标；FormItem 只接收数字校验消息用于展示，不持有第二份数值。

**Tech Stack:** 现有 React、TypeScript、Rain Token、Vitest、Playwright；不增加依赖。

---

## 授权与范围

2026-09-16 用户明确“开始实施”。System Mode，继续 `.worktrees/card-v2`。本批建设组件、文档页、Manifest/Registry、精确治理登记和验证证据。设计确认不代表运行视觉验收。保留其他任务已有修改；不提交 Git，不发布、不迁移业务、不写 Figma。

## 已确认行为

- InputNumber 独立调用，共享 Input 字段外观与 FormItem；编号和手机号继续用 Input。
- 越界手输保留真实值与显示，提示错误；不自动修正到范围。
- `-`、`.`、`-.` 保留，结束编辑或提交时提示完整数字；不恢复/提交旧值。
- `1.` 结束编辑收敛为 `1`；空值为 null；合法 `001.50` 在本次编辑保留。
- 上限100、步长1、值120时：增加禁用，减少到119，仍提示越界。低于下限对称处理。
- 步进不能使用未完成草稿之前的旧值，也不替超精度草稿自动舍入。
- 结构为左减／中间数字与单位／右加；按钮稳定可见，可显式关闭。
- outlined/filled 共用字段底色与弱竖线；underlined 只保留连续底线。
- 错误/警告不统一隐藏按钮；单向不可用与整体禁用分开。只读保留复制和键盘定位。
- 清空默认关闭，可选开启；置于中央输入区，清空得到 null。

## 首版默认值与边界

- size 继承 Input：compact=24、default=32，可显式24/28/32/36；appearance=outlined；controls=true；step=1。
- min/max 可选，precision 表示最多小数位（0表示整数），不自动补零或舍入。步长不强迫输入倍数；接近边界时最后一步停在边界。step自身不可比precision更细。
- 空值按0执行±step，再进入允许范围。完整数字变化时回调实际数值，即使越界或超精度；未完成/不安全数值不回调伪造的数值。另报告 validity，原生表单也会阻止提交。
- 外部不同值更新覆盖草稿；同值回显保留有效原文。非受控支持原生form.reset；受控reset交给宿主修改值或重建实例。
- 百分比单位仅展示，20%对应数值20。首版无formatter/parser、货币转换、千分位、stringMode、滚轮改值、拖拽改值或长按连发。
- 十进制缩放用于步进；拒绝静默丢失的数字精度，明确不是金融高精度组件。

## Task 1: 数值模型与组件

Create `packages/ui/src/input-number/input-number.utils.ts`, `input-number.tsx`, `input-number.css`, `input-number.css.d.ts`, `input-number.test.tsx`。
Modify `packages/ui/src/input/form-item.tsx`, `packages/ui/src/index.ts`。

1. 先写并运行真实交互测试：越界修正、符号保留、Enter/按钮提交、精度、清空、外部同步、reset、表单关联和权限。
2. 实现单一草稿和纯函数；明确不复用 Base UI NumberField 的竞争编辑状态（见 ADR）。
3. 添加局部样式、状态提示和 FormItem 消息桥接；旧 Input 不变。
4. 运行定向单元及既有 Input/FormItem 回归。

## Task 2: 可审阅页面和资产登记

Create `apps/playground/src/docs/components/input-number-page.tsx`, `input-number-page.css`, `manifests/ui/input-number.yaml`, `registry/input-number.json`。
Modify App、组件总览入口、静态扫描路径，登记 `#input-number`；同页对照普通Input和数字Input，覆盖三外观、四尺寸、浅深主题、状态、表单提交及教学样例。
通过现有的精确文件登记接入治理；不开放全仓白名单。组件保持 registry-candidate、unpublished、awaiting_human。

## Task 3: 验证与收口

- `pnpm exec vitest run packages/ui/src/input-number/input-number.test.tsx packages/ui/src/input/input-field.test.tsx`。
- `pnpm typecheck`、`pnpm verify:governance`、`pnpm build`；失败按本批/既有分别记录。
- 新增 `tests/e2e/input-number.spec.ts`，使用独立端口运行当前真实页面，检查输入、原生校验、formdata、步进、主题、三外观和窄屏。
- 保存截图与几何/对比度事实至 `evidence/runtime/input-number/`，亲自查看实物。
- 独立技术审阅、自动验证、视觉Human Gate、颜色/辅助技术验收分别登记；未做的测试明确注明。

实施澄清：`1.` 已能解析为数值 1，编辑时即同步给受控宿主，显示尾点仍保留至失焦、Enter 或原生提交。提交阶段只整理显示，避免宿主状态与 FormData 不一致。`-`、`.`、`-.` 仍不产生数值。

用户运行反馈（2026-09-16）：数字字段默认不撑满。采用 160px 紧凑宽度、max-width 100%，fullWidth 显式撑满；保持四档高度、三种外观不变。参考 Ant Design 的 controlWidth 与 MUI Number Field，160px 是适合 Rain 左右按钮、单位和清空位的本地选择，不声称是这些库的统一标准。

执行结果：Task 1–3 本批实现、资产登记、独立审阅和专项验证已完成；运行视觉 Human Gate 仍为 awaiting_human。完整结果及全库其他任务遗留失败见 `evidence/runtime/input-number/verification.md`。

## 增补：保留 Classic 紧凑形态

用户明确要求“除了 + - 的这一版以外，我还是希望保留原组件库的数组输入框。（方便嵌入到各个场景）”。按本任务上下文与旧 Vue 实现，此处指原数字输入框：左对齐输入、右侧上下箭头、Hover/Focus显现、基础80px。

System Mode，仅增加同一 InputNumber 的 `controlsLayout="stacked"`；既有默认 `split`、160px与已验证编辑模型保持。新增 `controls` part，正式 chevron-up/down 图标复用旧版箭头视觉血缘，是本组件的特定结构选择，不改变全局增加/减少图标默认。基础80px，有单位、前缀或清空时120px；清空与附加文案同时出现，或带框内标题时160px（实测120px会截断“最低分”等短标题）。fullWidth仍显式撑满。箭头占位固定，避免悬停时数字跳动；键盘聚焦会显示操作，无hover设备始终显示。右侧半高按钮是高密度鼠标形态，不声称满足24px触屏目标；触屏优先使用左右加减版。

两种结构适配outlined/filled/underlined，警告和范围错误保留可修正操作；禁用/只读不可改值。数值解析、错误、commit、表单同步共用现有实现。先新增结构切换、无效草稿和边界回归；再实施局部结构/CSS，补表格单元格和筛选栏示例，运行专项、类型、构建、颜色登记与Chromium/WebKit浏览器验证；运行视觉仍待用户复核。

## 增补：重要数字字体

用户明确补充：关键、重要数字使用字体 Token 中的特殊数字字体，始终粗字重，字号不变。增加可选 `keyData`，默认false；与 Foundations 关键 Data Value 语义一致。仅数值输入使用 `--rain-font-data`（LINE Seed）、`--rain-font-weight-bold`（700）、`--rain-font-numeric-data`（等宽齐线）；保持当前尺寸的字号/行高，单位、标签与placeholder沿用UI字体。支持两种布局、三外观及所有权限/错误状态；不新增字体文件、Token或另一套输入状态。

两项增补已实施并通过专项验证与独立复核。传统箭头、嵌入示例、重要数字与模拟触摸的最终证据见 `evidence/runtime/input-number/verification.md`；视觉仍待用户复核。

## 增补：评分满分后缀

用户要求评分时显示“/10分”等满分信息。本轮为既有组件的评分组合示例与使用合同补充：复用 `suffixText`、`max` 和 `keyData`，宿主的同一满分值同时生成上限与后缀，不增加公共API或数值状态。得分可编辑、使用强调数字字体；“/满分分”固定显示、沿用辅助文案样式，清空得分仍保留。三外观矩阵和独立两布局评分示例实测宽度、字形、键盘步进、越界保留及窄屏，再更新验证证据；普通“满分设置”字段继续使用单位“分”。

## 增补：五位数宽度与32px嵌入（覆盖此前固定宽度）

用户认为默认宽度仍偏大，并明确多数输入在五位以内；曾指定表格和筛选栏28px，随后明确修正“修正一下，默认为32”。最终采用32px嵌入与同排32px按钮，也不再使用80/120/160px固定宽度档位。

System Mode：同一个InputNumber以5ch数值位加实际附加文字和按钮确定默认宽度，不随输入长度变化；fullWidth仍显式撑满，字号和高度合同保持。独立错误文案不参与字段固有宽度。表格、筛选栏示例显式size32，并以已有32px按钮展示同排顶边/中心线对齐，错误提示放在控件下方。验证五位数完整可见、短值/清空/越界不跳宽、内置标签不截断、三外观/两布局与375px布局；复用既有Token，不增加测量状态或新宽度API。

同排对齐补充：表格示例将标题与输入框首行对齐，错误提示位于下方；避免提示出现后，标题被整个增高的单元格带到更低处。仅局部示例样式，不更改Table默认对齐。

## 增补：清空按钮显隐

用户明确要求清空iconbutton仅在hover或激活时出现，normal隐藏。采用字段hover/focus-within揭示清空按钮，保留原占位与数字宽度；无鼠标设备先点击字段进入编辑即可揭示，键盘可直接进入并激活。无需额外交互状态，保持现有原生按钮与鼠标/触摸事件链。只影响InputNumber，不顺带改写其他Input或Select。

本轮评分组合、五位宽度、最终32px嵌入与清空显隐均已实施并通过两引擎12项浏览器回归及独立复核，详细证据见验证记录；运行视觉仍待用户复核。

## 用户视觉确认（2026-09-16）

用户在当前 `http://127.0.0.1:5196/#input-number` 页面明确回复“视觉确认”，当前运行版本的视觉验收记为 accepted。范围包含左右加减与旧版上下箭头两种结构、三种外观、重要数字字体、评分“/10分”、5ch数值区、表格/筛选栏32px及同排对齐，以及清空按钮仅在hover或focus时显示。

本次仅登记视觉验收，不修改组件实现。此前“待用户复核”属于历史状态，以本条为准；contrastAcceptance仍为not-granted，仍未发布，其他组件验收、Figma、业务迁移和Git状态不变。
