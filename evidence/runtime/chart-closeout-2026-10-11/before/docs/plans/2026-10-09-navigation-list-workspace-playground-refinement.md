# NavigationList 与 Workspace 推荐场景改造计划

> **执行状态 · 2026-10-10：** 用户于 2026-10-09 回复“开始实施”，已授权本文范围。四组、八类推荐场景均已实施；自动检查与 AI 实页对照完成，运行视觉人工确认仍待用户审阅。以下为原实施方案，原“先不动代码”表述仅保留为方案定稿时的历史边界。当前结果见 [执行与验证记录](../../evidence/runtime/navigation-playground-refinement-2026-10-09/verification.md)。

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 本文是实施前方案，不是执行指令。用户确认讨论方向、查看静态稿后要求继续；当前仍遵守“先不动代码”。当前仅完善文档，不登记运行视觉验收。

**Goal:** 用教师课程导航与课程资料编辑两个小场景，展示清晰的目的地层级、可恢复区域和稳定主内容，并保留完整建设页入口。

**Architecture:** 直接组合现有 NavigationList、WorkspaceLayout、RecoverableRegion、RegionRestoreTrigger 与 PaneSplitter。业务身份和草稿归局部宿主；视觉调整限于明确启用的 Playground 配方，不增加公共导航 API 或 Workspace 状态机。

**Tech Stack:** 现有 React、TypeScript、Rain UI / Layouts / Foundations、Vitest、Playwright；不新增依赖。

---

## 1. 设计来源与确认边界

本组已讨论并确认：同一课程背景、两个展示层级；NavigationList 表达目的地，Workspace 表达空间分配。静态目标为：

1. [导航展开与收起对照](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-1553eac0-e73f-4e8a-ae29-ebcc0695560b.png)
2. [默认三栏课程资料编辑](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-f16c6fb2-8784-4ae7-9097-11300c526309.png)
3. [窄容器临时查看目录：修订稿](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-41c53f76-49b9-437a-af9f-c87f252e97f6.png)

三张是同一方向的场景／状态，不是三种待选皮肤。窄稿仅以上述修订稿为准：目录覆盖正文，不能把正文挤到右侧。保留前两组的浅冷色导航区、白色任务面、克制蓝色强调、稳定对齐与轻边界。

生成稿有两处不能照抄：收起导航漏画明确的“展开”入口，实施必须补回；“课程／资源”是图中视觉简写，现有组件应优先保留完整 `label`、可访问名称和 Tooltip，不因此新增 `compactLabel` 公共 API。宽度不够时沿用现有省略与完整提示。

图片不定义新 Token、精确尺寸、品牌图标或可运行合同。讲义公式图只作内容示意；后续采用校对过的示例内容，不把生成图当真实 PDF。图中属性的输入框外观也不意味着文件类型、页数等固有属性必须可编辑。

未验证：真实尺寸、深色、200%文字、动效、焦点、草稿／滚动保留、Safari / VoiceOver。用户“继续”不等于上述检查通过，不改变资产成熟度或发布状态。

## 2. 最小范围与复用位置

工作目录：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。下表路径均相对此目录。现有未提交修改保持原状；与前两组计划共用的文件按最终组合修改，不能用整文件替换覆盖其他切片。

| 文件 | 后续动作 |
| --- | --- |
| `apps/playground/src/recipes/navigation-v042/navigation-workspace-recipes.tsx` | 新增两个小场景及必要模拟状态，直接消费现有公共组件 |
| `apps/playground/src/recipes/navigation-v042/navigation-workspace-recipes.css` | 新增具名局部样式；区分导航条目样式与课程编辑场景样式，明确根节点范围 |
| `apps/playground/src/docs/components/navigation-component-pages.tsx` | NavigationList / Workspace 首屏接入小场景；保留高级状态、文档语义、使用代码与完整建设页入口 |
| `apps/playground/src/docs/components/navigation-doc-pages.css` | 只调整两页容器约束，不影响其他六类导航 |
| `apps/playground/src/app.tsx`、`apps/playground/src/docs/components/component-asset-page.tsx` | 接入原生地址时，限定修正两个导航示例同页 query 变化的标题抢焦点；保留跨文档导航和其他页面行为 |
| `apps/playground/src/routes/component-assets.test.tsx` | 通过 App 验证同页地址变化、当前内容及焦点；保留跨文档标题聚焦 |
| `apps/playground/src/recipes/navigation-v042/w3-samples.tsx`、`w3-samples.css` | A2、Contents C2 的 NavigationList 可明确启用同一局部导航配方；只收敛冲突的导航规则，不替换 A2 的 ObjectNavigator 或业务内容 |
| `apps/playground/src/docs/components/g3-component-pages.test.tsx` | 补页面组合的导航身份、草稿和恢复检查，保留八类页面结构检查 |
| `tests/e2e/g123-playground.spec.ts`、`g123-playground.config.ts` | 补新页面的真实布局、键盘、主题及动效检查；证据写入本次新目录 |
| `tests/e2e/navigation-v042-w3.spec.ts`、`navigation-v042-w3.config.ts` | 核对 A2 / C2 消费同一配方后的目的地语义及邻近对象导航不回退 |
| `registry/navigation-v042-w3.json` | Gallery 实际导入新样式时补 `galleryFixtureSourceClosure` 与当前源记录；不往基础组件文件集合塞入演示场景 |
| `scripts/navigation-v042-export.mjs` | 读取既有校验覆盖范围；不为本局部 Gallery 样式扩建导出功能 |
| `docs/ai/navigation-v042.md` | 实施后记录推荐入口、复用范围与未验项 |
| `evidence/runtime/navigation-list-workspace-playground-2026-10-09/verification.md` | 实施后记录真实截图、检查结果及人工待验项 |

优先不修改 `packages/ui/src/navigation/navigation-families.tsx/.css`、`packages/layouts/src/workspace.tsx`、`workspace-state.ts`、公共导出或 Foundations。现有全局 `platform-navigation.css` 同时影响 R2 的 Sidebar 和 R/S 多个场景，本切片不直接全局重写它。

R2 使用既有 Sidebar，不能为了统一样例改成 NavigationList。实际 NavigationList 消费者还包括 R1 / R3、R4 / R6 及 S5；本轮仅将已确认的局部条目配方接到独立页和 A2 / C2，不批量迁移其他工作台。Workspace 小场景复用现有布局组件与规则，完整 R/S 工作台保留原业务内容和入口，不强求套进同一个场景包装器。

若未来确需让 R/S 源文件导入新配方，先列出收益与额外影响。它们在 `navigation-v042-w3.json` / `navigation-v042-recipes.json` 共用 14 文件 fixture，届时必须补全部受影响条目的 `files`、`consumerClosure`、当前源哈希与相应 Manifest 的 `consumptionSourceClosure`，不能只登记一个页面。

本轮为文档讨论；后续展示仍为 `local-experiment`。涉及 Gallery 复制闭包的实施部分按 System Mode 管理，仅同步实际依赖与当前记录，保留历史验收快照。本轮不修改 Registry、Manifest、阶段状态，不提交、推送、发布或写入 Figma。

## 3. NavigationList 小场景

- 只有工作台、我的课程、资源库三个主要目的地；默认当前“我的课程”。右侧为三门模拟课程：高等数学 A（3 个班、48 项资料）、线性代数（2 个班、32 项资料）、大学物理（4 个班、56 项资料）。展开与收起的数据、顺序和当前 ID 相同。
- 切换入口时展示对应少量内容，不能只替换标题或显示原始 ID。保留实际 `href` 与 `aria-current="page"`；普通主键点击由宿主接管，修饰键和新标签页行为保留。
- 当前推荐目的地以合法 `#navigation-list?view=...` 为事实源，普通点击可直接使用现有原生 hash 路径；点击、深链接、刷新、后退／前进保持当前内容一致。复用 `readDemoQuery` 的解析，不能只在 useState 初值读取后永不响应地址变化。高级示例的自由控制仍按实例持有，不让同一个 query 同时控制多个演示。
- 源码已确认 App 会响应 hashchange 并重渲染相同组件，但 App 的 RouteFocus 与 ComponentAssetPage 两处都会尝试聚焦文档标题。与 NavigationBar 切片共同限定处理同页 query 导航；不要全局降低 navigationCount 或删除所有标题聚焦。进入另一份文档仍聚焦文档标题，同页目的地的焦点归小场景处理。
- 文字侧栏为图标＋名称；图标轨道继续显示可读标签，名称及 Tooltip 完整。图标必须来自现有 Rain 图标库，每项有可辨识图标。分组仍是扁平导航的分组标题，不新增折叠树。
- 头部品牌和展开／收起入口、底部账户入口保持稳定，中间导航在长内容样例中独立滚动。只收起导航表现，不卸载当前页面。
- 展开按钮在 compact 状态仍可见、可 Tab 到达；使用现有 IconButton 及清楚名称、`aria-controls` / `aria-expanded`。收起和再次展开不依赖悬停。
- 当前态采用浅蓝底、蓝色文字／图标；hover、当前＋hover、focus 各有可识别反馈，焦点不等同选中。长名称、数量、禁用、空集合、加载和错误保留在高级示例，不塞进首屏。
- 浅色与深色共同验证。此前独立页深色下未选文字过暗，局部配方需消费语义色，不用降低整项透明度处理普通未选项。

无需增加路由框架、账户服务或真实课程后台。局部演示不更改三个目的地的语义，不增加动态菜单配置系统。

## 4. Workspace 小场景

默认三栏：课程目录、资料预览与编辑、资料属性。当前资料始终为“函数的定义与表示”，左侧 1.1 项、中间标题和右侧资料名称一致。目录为课程层级，保持文字，不缩成平台图标轨道。

中间展示讲义的一段校对过的示例内容与教学备注；不新增 PDF 阅读器、文档编辑器或绘图工具。文件类型与页数以只读值呈现；只把真正允许修改的名称、使用范围和教学备注做成已有表单组件。草稿按资料 ID 持有，切换资源后返回仍保留。保存仅更新本地演示的保存状态；未保存使用普通中性色，不伪装错误或正式发布。

| 状态 | 必须保留的行为 |
| --- | --- |
| 默认常驻 | 三栏各自有清楚身份，主内容获得主要宽度；分隔条调宽仍受上下限约束 |
| 隐藏 | 区域让出空间，区域外的具名恢复入口始终可达；隐藏内容退出焦点序列 |
| 临时查看 | 同一面板在原侧覆盖显示，不改变主内容宽度、位置或滚动；无模态遮罩、无新增焦点锁 |
| 固定／取消固定 | 使用已有控制器；空间允许时恢复占位，空间不足时仍保持可见暂看，不标成已固定、不挤坏正文 |
| 专注 | 当前资料与草稿保持；退出后恢复此前布局，而不是强行展开所有区域 |
| 容器变窄再变宽 | 只派生当前可用布局，保留展开偏好与区域实例；辅助属性优先退出常驻显示，目录按剩余空间处理 |

窄状态顶部保留课程身份、目录入口、属性入口与专注操作；需要时工具栏自然换行。临时目录内有关闭和固定操作，外部入口显示关闭当前临时目录；属性恢复入口应可用且可见。正文被面板遮住一部分是正常覆盖结果，不将正文排到剩余窄列。

恢复、临时关闭、固定与取消固定使用现有事件，不另设布尔状态模拟同一布局。悬停暂看沿用现有默认关闭设置；高级区可保留该能力，不把静态稿误读成自动悬停展开。

## 5. 键盘、焦点、实例与动效

1. NavigationList 保持原生链接；尾部操作若存在则与主链接独立。课程目录按现有 Tree 或导航用途选择组件，不能为了外观换掉语义。
2. 分隔条保持可聚焦 separator、名称和范围值；方向键调宽、Shift 大步、Home / End 到边界、Enter 隐藏并回到恢复入口。临时面板不画占位分隔条，命中区不能细到只能用鼠标精确点中。
3. Escape 先关闭所属区域中的子弹层，再处理暂看／专注；关闭按钮回到稳定恢复入口，外点关闭不抢走被点击目标的焦点。继续保留首次外点可直接触发下一操作。
4. RecoverableRegion 保持同一实例及可恢复滚动；隐藏用既有 hidden / inert 机制。业务草稿归宿主，布局存储只保存布局偏好；多个实例用独立 workspaceKey 与 DOM ID。
5. 动效先复用已有 R2 的宽度、图标锚点与文字渐显经验，仅用于实际适用的局部配方；不自动把其时长升级为公共默认。正文不缩放，不因过渡卸载；快速反向与减少动效都要得到正确终态。
6. 临时面板可用轻淡入和短位移，但定位、关闭命中区、焦点和遮挡关系优先；静态稿不作为动效验收证据。

## 6. 实施步骤与最小充分检查

以下为后续步骤，本轮未执行。

### 任务 1：先补页面缺口

在现有 G3 页面测试和 G123 浏览器测试中加入小场景的有效断言：展开／收起当前 ID 不变、compact 展开按钮可达、资料草稿切回、区域隐藏／恢复仍是同一资料，以及宽→窄→宽保留草稿。新增测试先明确失败于尚未接入场景；不要复制已有状态机单测。

浏览器几何检查比较暂看前后的主区边界和滚动位置，确认一致；只判断“页面无横向溢出”不足以证明没有推挤。同时检查空间不足时固定请求仍保留暂看。

### 任务 2：完成最小局部组合

新增两个具名场景与局部样式，接入独立页；高级调试信息移出业务工作面，旧高级演示仍可访问。沿用现有组件、图标及主题，不新增全局 API。先核对三种静态目标，再补长内容、主题和键盘状态。

### 任务 3：让选定建设页消费相同局部条目配方

A2 / C2 的 NavigationList 明确启用局部类，保留各自内容、路由和对象选择。依赖登记按实际导入处理：只引入 CSS 就只登记 CSS，不把独立页模拟数据强塞进 Gallery 导出。同步当前源哈希，保留旧视觉接受记录；已有 ObjectNavigator 与 Scope 计划触及同文件时逐项合并。

单独从 `w3-samples.tsx/.css` 核对真实本地依赖，确认 `galleryFixtureSourceClosure` 完整、`currentGalleryHostSourceSnapshot` 的相关当前哈希匹配。现有导出 `--plan` 遍历的是 Registry 条目与 R/S/W6 独立消费入口，不遍历或校验这两处 Gallery 记录；它通过只能证明既有独立消费包未受损，不能代替 Gallery 闭包检查，也不能为通过检查而把 Gallery 场景塞进该包。

### 任务 4：验证并保留本次证据

复用 `packages/ui/src/navigation/navigation-families.test.tsx` 的 Tooltip／原生链接检查，以及 `packages/layouts/src/workspace.test.tsx`、`workspace-state.test.ts` 的恢复、暂看、草稿、滚动、焦点与实例检查。只补新组合的缺口。

运行浏览器检查前，检查测试源、配置和 reporter 的所有写入路径：G123 硬编码旧日期截图目录，其他专用配置也可能写旧验收目录。统一将本次截图、附件、报告和测试产物定向到 `evidence/runtime/navigation-list-workspace-playground-2026-10-09/` 的分组子目录；仅换 `outputDir` 不够。保留各组原有视口、locale、服务端口与 reduced-motion 条件，并确认服务来自本工作目录。

完成输出隔离后运行：

```sh
pnpm exec vitest run packages/ui/src/navigation/navigation-families.test.tsx packages/layouts/src/workspace.test.tsx packages/layouts/src/workspace-state.test.ts apps/playground/src/docs/components/g3-component-pages.test.tsx apps/playground/src/routes/component-assets.test.tsx
pnpm exec playwright test --config tests/e2e/g123-playground.config.ts
pnpm exec playwright test --config tests/e2e/navigation-v042-w3.config.ts
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
node scripts/navigation-v042-export.mjs --plan
```

按未覆盖的实际风险定向复用以下现有回归，不无差别重跑所有历史任务：W4 的嵌套弹层／Escape；W6 review02 的 `R02 E4 600 pointer pin keeps an unfit pane temporary and visible with its state`；W7 的 `N11` 真实滚轮、`N18` 深色暂看、`N32 N28` 宽窄往返。使用各自专用配置、精确用例筛选与新的证据输出，避免 W7 配置自动纳入整组历史测试。

新页面同时验证普通动效和减少动效；专用回归默认 reduce 不能替代普通动效检查。人工审阅默认、hover、selected＋focus、长名称、200%文字、窄宽、深色、快速反向、暂看和专注恢复。记录通过与未验项，再交用户检查；自动化不替代运行视觉及 Safari / VoiceOver 验收。

## 7. 方法与下一组

沿用 V05（内容、外观与行为共同调整）、D02（按关系组织空间）、D03（工作台组合）、D05（容器与状态适配）。本组候选经验：平台目的地适合紧凑轨道，课程目录保持文字；临时覆盖必须用真实遮挡和稳定外部入口表达。当前只记任务经验，未凭静态稿追加全局规范。

NavigationTabs、NavigationBar、SegmentedControl 的讨论已完成，见[八类总表](2026-10-09-navigation-playground-refinement-index.md)。NavigationList 与 NavigationBar 共用目的地地址／焦点要求；本切片先处理的宿主衔接由后续切片直接复用，不重复建立路由或文档焦点机制。
