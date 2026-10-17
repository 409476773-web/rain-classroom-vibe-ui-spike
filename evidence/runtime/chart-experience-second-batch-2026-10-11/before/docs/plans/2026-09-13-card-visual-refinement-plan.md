# Card 视觉修订实施计划

> 执行续记：2026-09-13 用户授权“开始按计划实施”。按本计划完成代码任务并准备视觉评审；不创建提交。最新状态与实际结果见本文件末尾及本批验证记录。

**Goal：**将现有 Card V2 的四个用法修订为信息主次清楚、间距与操作区协调、宽窄容器均成立的高保真原型候选。

**Architecture：**保留七个公共部件和现有 Recipe 机制，公共 Card 承担可靠的默认排版与 Header 布局，场景 Recipe 承担内容与动作组织。以已体验的 shadcn Card 完整组合为视觉参考，沿用 Rain 的品牌、字体和现有控件；提交类卡片使用极浅底部操作区，默认无分隔线。

**Tech Stack：**当前锁定的 React、TypeScript、Vite、Tailwind B2、Rain Token 与现有 Button / IconButton / Input / Select / DropdownMenu；不新增依赖。

**状态：**代码实施、自动验证和独立审阅已完成；具体视觉候选尚未获得最终视觉验收。

## 1. 工作区、来源与本次授权边界

- 工作区：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。
- 分支：`codex/card-v2`；HEAD 基线：`321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。已有 Card V2 工作尚未提交，不能把 HEAD 当作本次视觉修订的完整回滚点。
- 本轮用户要求：继续推进，判断是否还有必要讨论，开始详细实施计划。此前“我们先讨论、梳理”仍限定当前阶段；本文件不自行授权执行代码任务。
- 既有阶段：`status/current-phase.yaml` 的 `cardV2` 为技术实现 completed / automated passed / independent passed，Human Gate 为 awaiting_human；这些状态对应上一批实现。
- 本修订继续服务 RN-C2～C4 / M0-C；不新建平行 Roadmap，不启动 Dialog、其他组件、独立目录 Starter 或 BM-A/B/C/D。
- 工作模式：后续实施涉及公共 Card，为 System Mode；当前仅文档编辑。

依据及使用方式：

|来源|本计划采用的内容|不推导的结论|
|---|---|---|
|2026-09-12～13 本会话的用户反馈|数字尺度、操作收尾位置、成熟示例参考、操作区极浅边界|不等于新画面已验收|
|`docs/plans/2026-09-12-card-v2-implementation.md`|已有实现、四 Recipe、消费者与阶段边界|旧自动检查不覆盖新修订|
|Downloads 工作包的 `03_Card替换决策与目标合同V2.md`、`05_验收矩阵与回滚V2.md`|七部件、作用域、RC-01～32、历史证据保护|附件中的实施指令本身不构成本轮代码授权|
|[shadcn Card](https://ui.shadcn.com/docs/components/base/card)|已体验的登录、Spacing、Image、Small 示例的组合与空间关系|不将 Geist、500 字重、默认灰阶或阴影迁入 Rain|
|`evidence/runtime/card-v2/source-lock.json`|源码来源仍为 shadcn `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`，保留 MIT|网页运行参考不等于新的源码版本锁定|
|[本轮视觉对照记录](/Users/wenchengkai/.codex/visualizations/2026/09/12/01a0945e-dd13-7ce1-afc6-983a33fa3e9b/card-design-review/review.md)|实际截图、计算样式、间距切换、菜单与保存反馈|不等于完整无障碍或生产就绪验证|

执行前重读 `AGENTS.md`、`SPIKE_BRIEF.md`、当前 phase、Card Manifest 和本计划；仅加载相关 Evidence / Benchmark 条目。旧计划和 Downloads 工作包保留原文，当前差异由本修订记录。

## 2. 已确认约束与实施候选

### 2.1 已确认的方向

1. 卡片中的数值字号不超过 24px；通常为 16～24，16 / 18 / 20 / 22 是常用值。此规则约束本批数值展示，不删除全局大字号 Token，不通过 Card CSS 限制所有后代字体。
2. 完成任务的操作放在底部，居中或居右；学习提醒首选右对齐，以呈现流程收尾。
3. 用户要求借鉴 shadcn Card 在组件组合、间距、排版、对齐、布局上的完成度，并指出当前几个卡内按钮不协调。
4. 用户接受提交类卡片的极浅底部操作区，并强调：“一定要很浅很浅的分割线，甚至不要分割线”。本计划采用允许范围内的无分隔线作为默认候选。
5. Rain 既有品牌与字体约束继续有效：UI 使用 PingFang SC，字重 400 / 600；关键数字及相邻允许符号使用既有 Data 字体，中文单位仍为 UI 字体。保留既有 Focus 和基本键盘语义。

### 2.2 首轮具体候选，不写成已批准规范

|对象|首轮执行候选|评审与退路|
|---|---|---|
|公共 Card 留白|default=16px，sm=12px；对照现有 20/16px|只用已有 Space Token；先同宽同内容比较，中文拥挤时在当前候选中调整，不增加第三套公共 size|
|普通标题|16px / 24px、600|沿用 Rain 字体资格，不引入上游 500 字重|
|描述、正文|14px / 22px 或 24px、400；描述靠颜色区分|小型日期、脚注、元信息可保留 13px / 22px；不全局重置 p/h2|
|指标 83%|Value 22px / 28px；% 14px / 22px，基线对齐|22 是本例候选；24 是用户上限；不把整张卡设为 Data 字体|
|顶部更多菜单|现有 IconButton，横向更多图标，`aria-label="更多操作"`，32/16、highlight=none|若同屏效果不合适，再评估现有轻量文字入口；不新增 CardButton|
|学习提醒提交|现有 32px 主按钮，底部右对齐|不改变 Button 默认尺寸映射；居中、通栏不扩为本次公共 API|
|操作区表面|既有 `background-neutral-2` 作为极浅底色候选；无 top border、无新阴影|浅/深主题分别评审；底色过重时选择现有更合适语义色，不临时造裸颜色|
|课程入口|现有 text Button，`size="regular"`（26px高、14px文字），说明左、入口右|按钮表达演示事件；只有真实路由存在才采用 Link，不使用空 href 伪装导航；不覆盖高度伪造32px文字按钮|
|媒体布局|主要示例先用上图下文；保留同数据的左右布局|不把旧 VD-2 的 side/sm 当作永久设计要求|
|外轮廓|沿用 Radius/8 与现有轻边框|本轮先解决组合与层级；不直接迁入上游圆角/阴影|

上述候选允许执行者在既有约束内结合画面做常规调整，并记录最终取值；不要求每个间距单独向用户询问。只有需要改品牌、全局字体/控件、扩大任务或新增依赖时，才另行讨论对应范围。

## 3. 修改范围与保留项

优先在现有文件内完成：

|文件|拟修改内容|
|---|---|
|`packages/ui/src/card/card.styles.ts`、`card.css`|默认排版候选、Header 的自有部件布局；保持样式可覆盖|
|`apps/prototype/src/card-recipes.tsx`、`card-recipes.css`|四 Recipe、数值、辅助菜单、操作区与局部反馈|
|`apps/playground/src/docs/components/card-page.tsx`、`card-page.css`|推荐用法优先、预览设置整理、技术验证折叠|
|`apps/prototype/src/main.tsx`、`styles.css`|必要的消费者排布与示例说明；复用同一批 Recipe|
|`tests/e2e/card.spec.ts`|更新现有五组检查中的布局、可见性、角色定位与新视觉约束|
|`manifests/ui/card.yaml`|实际排版、Header、Recipe 说明、依赖与新证据引用|
|`scripts/token-foundation-outputs.mjs`|Card 操作区等新增或改变的颜色消费者；不改基础色值|
|`manifests/contracts/token-foundations-v1.json`|经既有生成流程同步消费者登记，不手改生成结果|
|`status/current-phase.yaml`、`scripts/verification-helpers.mjs` 及其测试|实施时记录精确修订状态，同时保留旧批次事实与严格授权校验|
|`README.md`、原实施计划末尾|实施完成后仅补最新候选入口和续接链接，不重写历史结果|

以下只在实际需要时修改：`packages/ui/src/card/card.tsx`（现有 API 足够则不动）、Card 单元测试（语义/作用域变化时）、`registry/card.json` 与其校验器（公共源清单实际变化时）、Tailwind 扫描文件（新增消费文件时）。

公共七导出、article、Title.as、原生 aria/ref/事件、单值 slot、panel/raised、size 与 Density 独立、根 Recipe 与嵌套隔离全部保留。普通 Footer 继续容纳脚注；极浅操作区属于提交 Recipe。根 overflow 保持 visible，媒体仅局部裁切。

不改 Rain Classic，不重新设计全局 Button/Input/Select/Tag/IconButton、字体、Focus 或 Token 色板。不建新样式引擎、统一 Card 业务状态、自动测宽引擎、永久对照平台或额外依赖。不创建 commit/push/PR、发布或迁移。

## 4. 实施任务与顺序

任务 1→2→3→4→5→6→7 顺序集成。独立审阅可并行阅读；公共样式、Recipe 与登记文件由同一执行者集成，避免共享文件冲突。

### 任务 1：保留实际起点，建立修订记录

**文件：**读取本计划第 1 节来源；新建 `evidence/runtime/card-visual-2026-09-13/`；进入代码阶段后才修改 phase 及精确校验。

1. 核对 HEAD、分支、工作区 diff、现有服务与依赖；不重新安装或升级依赖。
2. 为即将修改的文件保存当前源码及 SHA-256，包含未跟踪的 Card/Recipe 文件；仅保存 `git diff` 不足以覆盖它们。
3. 将旧版画面、实际 computed style、控件/字体/表面配对记录为新批次 before。旧 `card-v2/production`、`vibe`、结果 JSON 和报告保持不变。
4. 在既有 Card 状态下加入精确的视觉修订记录：本计划、实际执行指令来源、范围、当前实施/自动/独立审阅状态、新证据入口。Human Gate 仍 awaiting_human，contrastAcceptance 仍 not-granted。计划编写请求不能充当该执行指令。
5. `hasCardV2Authorization()` 当前依赖精确记录：支持新修订时继续逐项验证原 Card 记录；只允许已定义的修订字段和状态，不放宽为“有字段即可”。保留缺失授权、额外依赖、提前验收等负例。

基线检查命令（从工作区根运行）：

```sh
pnpm exec vitest run packages/ui/src/card/card.test.tsx packages/ui/src/surface/surface-card.test.tsx
pnpm typecheck
pnpm test:e2e tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts --workers=1
```

预期：如实取得本轮起点；已有失败单独登记。端口被占用时识别服务归属并选择隔离入口，不终止无关进程，不把环境阻塞当成组件失败。

### 任务 2：先校准公共默认排版与 Header

**文件：**`packages/ui/src/card/card.styles.ts`、`card.css`，必要的现有浏览器检查。

1. 用同宽、同内容对照现有 20/16 与候选 16/12；首轮按第 2.2 节候选实现，记录最终选择。
2. 标题/描述保持 4px 细间距，主区块使用根 spacing；表单字段组再明确自身组内关系。去掉仅为“紧凑”而产生的不协调角色覆盖。
3. 移除“卡宽 ≤360px 就无条件把所有 Header Action 移到下一行”的规则；短标题与单个轻量菜单在 300px 卡宽仍保持标题旁的操作入口。
4. 长中文及连续英文自然换行，不遮挡操作。对于宽文字动作或多按钮工具条，使用明确的局部 Recipe 安排独立操作行，不用字符串长度、ResizeObserver 或所有 Card 通用的新布尔 API猜测。
5. 自有 Header 条件只检查直接所属部件；内层 Action/Description 不能影响外层。保留普通 Header 无 Action、无 Description、仅 Content 的用法。

候选默认值只需改现有别名，不另建间距系统：

```css
.rain-card { --rain-card-spacing: var(--rain-space-16); }
.rain-card[data-size="sm"] { --rain-card-spacing: var(--rain-space-12); }
```

仍放在既有 components layer。Header 的关键验收是标题与操作的几何关系、无重叠及可达性；退役“窄卡必须 grid-column-start=1”的断言，不改成另一组只复述 CSS 的列号断言。

### 任务 3：修订四种完整用法

**文件：**`apps/prototype/src/card-recipes.tsx`、`card-recipes.css`。

**CR-01 公告：**保留标题、时间/来源、正文。用一条有真实阅读顺序的虚构公告；正文自然排布，不补空 Footer。日期是元信息，字号可与描述角色区别。

**CR-02 课程：**减少封面中重复的大号课程标题、口号和无作用英文，正文中保留唯一主要课程标题。优先使用已有且可分发的课程素材；没有合适素材时用明确的缺省封面，不把占位包装成完成的美术资产，也不为本批新增图像生成任务。保留上下/左右同数据重排，媒体裁切范围不包含按钮和正文。课程统计与标签分组，说明与入口不再一起挤向右侧。

**CR-03 指标：**按以下候选替换 40px 数值，口径靠近指标，去掉示例内不必要的“演示数据”文字，统一在示例说明中声明虚构数据：

```tsx
<span data-slot="value" className="font-rain-data text-rain-size-22 leading-rain-28 font-rain-bold">83</span>
<span data-slot="unit" className="font-rain-data text-rain-size-14 leading-rain-22">%</span>
```

Content 保持 baseline 对齐。验收上限是 ≤24；等于22只用于描述当前候选。中文单位/统计口径继续使用 UI 字体；不扩大数字字体资格。

**CR-04 提醒：**顶部为标题、说明和轻量更多菜单；中间为字段；底部为极浅完成区，保存右对齐。“仅当前页面”移到卡外示例说明；保存反馈放回当前卡片的就近位置，避免横跨四卡的共享状态行。

顶部操作复用已有静态图标，先核对 `docs/ai/icon-selection.md` 与图库 availability；在现有 `@rain-next/ui` 命名导入中加入 `IconButton`：

```tsx
import { MoreHorizontalIcon } from "@rain-next/ui/icons/more-horizontal";

<DropdownMenu.Trigger render={
  <IconButton aria-label="更多操作" icon={<MoreHorizontalIcon />} size="32/16" highlight="none" />
} />
```

极浅操作区的候选 Recipe：

```tsx
const reminderActionsRecipe: CardLocalRecipe = defineRainLocalRecipe({
  id: "card-reminder-actions", scope: "feature", origin: "ui-card",
  classes: {
    root: "pb-rain-0",
    footer: "justify-end py-(--rain-card-spacing) rounded-b-rain-8 bg-rain-category-background-neutral-2",
  },
  modifiedParts: ["root", "footer"], candidateTokens: [], promotionStatus: "not-proposed",
});
```

仅在该卡实际显示 Footer 时应用这个 Recipe；隐藏 Footer 时恢复正常底部留白。Footer 保留一致的左右 inset，底色铺满内部宽度，不增加 inset 边框或顶部分隔线；根不裁切焦点。

状态处理保持页面本地且简单：课程入口与提醒分别拥有自己的反馈，保存信息包含当前标题与所选对象；输入为空或未选对象时就近提示并保持输入，不能输出“已保存”。复用现有字段状态与 aria 关联，不引入表单框架、网络持久化或新 Dialog。一次有效操作只更新对应卡片；未实际复制/跳转的演示文案须准确说明事件性质。

只有需要在两个宿主中独立排布时，才在现有文件中拆出四个应用内部 Recipe 函数；不加入 `@rain-next/ui` 公共导出，不创建业务状态抽象。

### 任务 4：整理推荐用法与开发验证的展示路径

**文件：**`apps/playground/src/docs/components/card-page.tsx`、`card-page.css`；必要时 `apps/prototype/src/main.tsx`、`styles.css`。

1. 页面先呈现四种有明确任务的推荐用法和简短说明；每个样本给适合自身任务的展示宽度，不强行拉高短卡片填满网格。
2. 保留少量常用预览设置；长内容、部件开关、窄容器等放入可展开的检查区域。设置继续可达、可检验。
3. 使用原生 `details/summary` 承载“开发验证”，默认折叠；其中保留隔离、反向主题与既有组件对照。隔离解释改为“修改一张卡片，不影响其他卡片”，写清目标、内层与邻卡预期。
4. 不新增折叠组件、调参平台或持久化设置。“内层操作”等占位样本仅用于开发验证，不作为推荐业务按钮。
5. Prototype 使用同一批 Recipe 和自身样式；消除明显的内部编号/验证文案。只整理当前消费示例，不扩建完整课程管理产品或新路由。

展开/折叠不会丢失表单状态或改变业务卡默认值。隐藏的验证区必须通过正常操作展开后再测量，不强制显示、不删除原隔离检查。

### 任务 5：同步登记并完成有针对性的验证

**文件：**现有 `card.spec.ts`、Card Manifest、颜色消费者生成入口；需要时现有治理测试。

1. Manifest 的 20/16、13/22、课程12、360px换行等描述仅按实际最终候选更新；公共 Footer 仍是中性容器，提交区样式归 Recipe。
2. 新 Footer 表面、状态文字及示例结构发生变化时，更新 `getCardColorConsumers()` 的选择器、语义色和父表面，运行 `pnpm generate:tokens` 经现有流程更新消费清单。检查生成 diff：只保留本批真实消费者的必要变化，基础色值、字体和Focus等输出应保持不变。
3. IconButton/More 图标属于应用 Recipe 的依赖；公共 Card 本身未导入它们时，不把它们错误加入 `registry/card.json` 的公共 shared 清单。
4. 更新现有测试的 role/name 与 scoped status 定位。普通说明变为14、间距改为16/12时才更新对应实际断言；不能保留旧值后将失败称为非本批问题。
5. 为新增的空字段判断补最小交互检查：无效保存不成功且提示与字段相关，有效保存反映当前标题/对象。纯色值/样式调整复用现有浏览器检查和截图，不另建镜像单元测试。

最小矩阵如下，不做全部维度的笛卡尔积：

|检查组|覆盖|通过条件|
|---|---|---|
|四完整用法|CR-01～04 × Light/Dark；真实内容与局部反馈|每张卡有明确阅读主次和下一步；技术检查与人工看图分别记录|
|Header|短标题、长中文、连续英文；有/无说明、单个轻量 Action；300、360/361、384、宽卡|不重叠、不无理由掉行；控件可见可达；自有部件条件不串入嵌套|
|宽操作例外|长文字动作或多个动作的明确 Recipe|操作行有意安排，无裁切和横向溢出，不承诺任意动作数量都能挤入标题旁|
|媒体|上下/左右、窄宽；保留480px阈值时检查479/480/481|同数据重排、无媒体外裁切、正文与入口可用；若改阈值则更新边界值及理由|
|数值|CR-03 实际字号与字体；单位、口径；长数值窄容器|数值≤24px，当前22候选正确；中文使用UI字体，字号不因截图缩放误判|
|操作区|浅/深色，有/无Footer，键盘焦点|默认无顶部分隔线、极浅表面、保存末端对齐；隐藏Footer后留白正常；焦点不裁切|
|作用域|开发区展开后检查目标/内层/邻卡、反向主题；default/sm与Density组合|局部修改不传播；Card size不会偷偷改变控件Density|
|交互|输入、对象选择、有效/无效保存、菜单Enter/Esc/选择、课程入口|事件独立、反馈就近、菜单退出焦点恢复、状态与实际动作一致|
|偏好与可达性|既有forced colors/reduced motion、360px视口、真实浏览器放大检查|内容及操作可达；模拟/真实检查注明范围，不用CSS zoom冒充浏览器缩放|
|原消费者与保护|Core UI两处Card、独立Prototype、Button/Input/Tag/Surface独立对照|正常消费，无Playground私有CSS依赖，非目标控件源码与独立对照未被意外改变|

稳定后按下列顺序完成一次收尾检查；后续仅因新变更或失败重跑相关范围：

```sh
pnpm exec vitest run packages/ui/src/card/card.test.tsx packages/ui/src/surface/surface-card.test.tsx
pnpm test:e2e tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts --workers=1
pnpm verify:governance
pnpm typecheck
pnpm test
pnpm build
```

预期：各命令 exit 0；具体数量以本次日志为准，不能抄旧 1273/1273、9/9。未修改图标源则不扩大图标库测试；新增静态导入的可用性由类型、构建及运行截图确认。

### 任务 6：验证实际构建并形成一次集中视觉评审

**文件：**新批次证据目录、必要的临时浏览器配置；不修改旧生产证据。

1. 构建后为 Playground 与 Prototype 启动独立 preview，优先使用空闲的 5298/5299，避免把旧5198页面误当成新版本。

```sh
pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1 --port 5298 --strictPort
pnpm --filter @rain-next/prototype exec vite preview --host 127.0.0.1 --port 5299 --strictPort
```

2. 如需自动检查生产入口，在工作区外的 `/private/tmp/rain-card-visual-20260913/playwright.config.mjs` 保存以下临时配置。它不导入外部依赖，测试文件从工作区解析自身依赖；保留Chromium桌面条件且不启动dev webServer。所有命令仍从本工作区根执行，不为临时文件扩大源码允许清单：

```js
export default {
  testDir: `${process.cwd()}/tests/e2e`,
  outputDir: `${process.cwd()}/evidence/runtime/card-visual-2026-09-13/production-tests`,
  fullyParallel: false, forbidOnly: true, retries: 0, reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:5298",
    viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1,
    isMobile: false, hasTouch: false,
    screenshot: "only-on-failure", trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
};
```

```sh
RAIN_CARD_PROTOTYPE_URL=http://127.0.0.1:5299 pnpm exec playwright test tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts --config /private/tmp/rain-card-visual-20260913/playwright.config.mjs --workers=1
```

3. UI 体验和截图使用当前可用的浏览器工具；先确认已加载新构建。记录 commit、未提交源码摘要、构建时间、URL、视口、卡宽、主题、控件密度、浏览器和字体环境。
4. 保存四用法的 Light/Dark 画面、关键窄宽与长内容、操作反馈、技术区展开状态。对比必须同内容、同卡宽、同密度，不把不同缩放的截图直接当比例证据。
5. 测量新 Footer 上的文字/控件/焦点实际合成背景。装饰性极浅分隔线无需承担交互边界对比度要求。旧深色 Focus 2.573:1是旧配对事实，新组合需重测；单个组合改善不能关闭全局问题。
6. 独立审阅者检查代码、候选/确认边界及新画面；执行者修复发现，再把最终构建一次性交给用户评审四用法。例行参数取舍在既有约束内处理，不把每个像素变成新问题。

人工看图的判断问题：一眼能否识别对象和主要内容；辅助操作是否抢戏；留白是否表达正确分组；窄卡片的主次是否稳定；提交区是否足够轻且有收尾感；保存后能否在当前位置理解结果。

### 任务 7：回填最新候选状态与交接

**文件：**新批次 `verification.md`、结果/截图索引，Card Manifest、phase，以及现有入口的续接链接。

1. 把新修订实现、自动检查、独立审阅、人工视觉、对比度、真实设备/辅助技术分别登记。本计划全部任务在执行前均 not-started/not-run。
2. 视觉仅在用户实际看过最终画面并明确接受后，按具体 Recipe / 主题 / 宽度范围记录。当前“适合极浅底部操作区”是设计方向，不是最终运行画面通过。
3. 旧 `evidence/runtime/card-v2/vibe/baseline`、`vd-1`、`vd-2` 及摘要不可重写。此次改变公共Header与多张Recipe，不称作旧受控试验的VD-3；也不借旧“其他三卡不变”结论证明此次改动。
4. 本修订报告分别列出 RC-01～28、31～32 受影响的复验结果；RC-29/30保留旧实验身份，当前版本不冒充已复测。需要对新版本重新主张连续编辑能力时，在新目录另做明确隔离的实验。
5. 本批视觉接受不自动关闭 M0-C 的其他未决项，不启动后续组件、不升级 publication/migration，不创建本地或远端 Git 操作。

## 5. 失败处理与回滚

- 只撤回本修订相对任务1起点的改动。现有Card V2有大量未提交及未跟踪文件，禁止用整仓 reset/clean 或 checkout HEAD 回滚。
- 以保存的修订前文件和修改清单逐文件/逐块恢复；保留用户在此后新增的修改，遇到交叠先比较再处理。
- 本批失败日志、截图、实际未运行项保留。修订前后证据分开，旧历史不因新方案被推翻而改写。
- 如果现有语义色无法得到足够轻的操作区，先选择既有更合适表面或保持无分隔线并记录；需要新增Token或修改全局控件时另列具体范围，不顺带扩成全库重设计。

## 6. 当前完成情况

|工作|状态|
|---|---|
|已有讨论、当前源码、V2合同和测试入口核对|已完成，只读|
|详细实施计划|已形成；候选值与已确认方向已分开|
|计划独立审阅|已完成；文字按钮尺寸、临时生产配置两项问题已修正并复核闭合；未执行配置|
|代码任务1～7|已完成实施、验证、独立审阅与交接记录；人工评审及明确未测项保留|
|新修订自动验证、独立实现审阅|已完成；全量1273/1273、最终生产9/9、独立审阅passed|
|最终运行画面视觉验收、对比度接受|未完成|
|Git提交、远端写入、发布、迁移|未执行|

下一步集中评审实际画面；常规字号与间距已按候选实现。

## 7. 2026-09-13 实施续记

用户执行指令为“开始按计划实施”，取代本计划编写阶段的仅讨论边界。七部件/API不变，实际选择 default/sm=16/12、Title16/24、Description14/22（公告日期13/22）、Value22/28和%14/22，数值与相邻%均显式Data Bold。

极浅Footer使用既有 Background/Neutral/2，无顶线；底部圆角通过已有Recipe类的两条逻辑方向CSS映射到Radius/8。原因是当前受控工具类不接受候选示例中的 rounded-b-rain-8；未扩大全局工具类权限。四个宽操作结构类仅在精确视觉修订授权下补充真实构建测试清单。

预览样本最大384px；左右媒体样本640px，窄卡300px。原生details折叠技术验证，summary复用既有data-focus。完整执行证据、失败修复和未覆盖范围见 [本批验证](../../evidence/runtime/card-visual-2026-09-13/verification.md)。原方案正文保留候选设计依据，实际实现以本续记与验证为准。

## 8. 同日用户反馈：默认连续背景

用户说明希望多数卡片保持整体同色，避免卡片密集时显得花哨；此前极浅底色做法保留为样式参考。此反馈取代前文“提交示例默认浅底色”的选择。操作区默认透明、呈现Card本身背景；留白、右对齐、无分割线不变。浅底样式通过文档页“更多预览条件 → 浅底操作区（样式参考）”按需开启，独立原型默认关闭。仅增加应用内部预览参数，不新增公共Card变体或Token。

模式：应用局部展示修订，同步系统Manifest与阶段记录。验证：类型、构建、现有Card浏览器检查，覆盖浅/深主题的默认与可选底色、几何和草稿保留；旧全量/独立审阅仅保留原批次事实。本次续验见 [记录](../../evidence/runtime/card-visual-2026-09-13/footer-default-feedback/verification.md)。

## 9. 同日用户授权：间距层级与五档预览

授权原文：“开始实施落地。” 本轮目标为消除实际间距叠加、协调内部层级、补齐留白预览。System Mode；仍在 RN-C2～C4 / M0-C 范围。修改公共 Card 局部间距别名、四个应用 Recipe、预览控件、现有浏览器检查与对应登记。公共 size=default/sm 的 16/12px 保留；预览以 20px 为候选，最终默认值待用户看图确定。

已确认规则：组内间距 ≤ 组间距 ≤ 对应方向的内容区内边距，按最终布局盒距离验收。贴边媒体、嵌套容器、独立控件内部布局、弹性对齐空白与文字行高按各自语义判断。

执行步骤：

1. 保存当前未提交源码基线；公共根派生区块间距 min(内边距, Space/16)，每个 Card 自身重置，仍允许局部 utility/Recipe 覆盖。
2. CR-04 字段组间距 min(内边距, Space/12)，字段内 8、标题说明 4。Footer 独占正文到操作的区块间距，抵消根在该边界的重复 gap；底部 inset 保持所选档位。默认同色与浅底参考共用几何。
3. 在应用内通过现有根 className 覆盖 spacing，提供 12/16/20/24/32 五档；课程正文与其他三卡同步。只调整当前四个实例，不影响嵌套隔离对照。原型复用相同规则，控件 Density、字号不随留白改变。
4. 扩展现有 Card 浏览器检查，测量五档 × 四用法，长内容、反馈、隐藏部件、窄容器、浅/深色和可选浅底；保存单卡与多卡画面，确认切换保留草稿。
5. 运行相关单元、类型、治理、构建、Card/Core UI 生产浏览器检查；按结果登记，人工视觉仍 awaiting_human。独立审阅和未测范围单独记录。

本轮基线及结果目录：`evidence/runtime/card-visual-2026-09-13/spacing-feedback/`。未验证假设：20px 是否最适合实际多卡页面；本轮只形成可比较的候选，不新增全局 Token、公共 size 档位、依赖或其他组件。

实施结果：公共根新增自身重置的 section-gap，四 Recipe 完成协调；五档使用静态根 className，课程同步。单元11/11、类型、治理、构建、生产浏览器10/10通过，复核补充的五档矩阵1/1通过；矩阵含20场景、80卡片实例，浅底前后位置和隐藏部件首尾留白均实测。独立代码/证据复审通过；新视觉与最终默认边距未验收。详情与本轮未测项见 [续验](../../evidence/runtime/card-visual-2026-09-13/spacing-feedback/verification.md)。

## 10. 20px 默认值及本轮间距确认

- 日期：2026-09-13；来源：explicit-user-confirmation；用户原文：“确认”。
- 对应上下文：上一轮交付将20px列为待确认的默认候选；本轮读取到当前页面仍为浅色、20px、上图下文、普通宽度、同色操作区。
- 确认范围：`card-spacing-current-preview-and-default-20`。记录为本轮间距方案的局部视觉确认，并将公共 default 从16改为20；sm仍12，主要区块最多16、字段组12、字段内8、标题说明4。
- 更新公共默认、预览文案、隔离说明、Manifest和相关默认值断言。工作模式System Mode；验证实际公共默认消费者、嵌套隔离、控件密度和构建。
- 本决定不将整体Card、全部主题/状态、对比度/辅助技术或发布等独立状态一并标记通过；整体候选身份与Registry状态保持。旧第9节保留当时的候选和验证事实。
- 本次默认值同步的实际检查见 [确认记录](../../evidence/runtime/card-visual-2026-09-13/spacing-feedback/default-confirmation.md)。
