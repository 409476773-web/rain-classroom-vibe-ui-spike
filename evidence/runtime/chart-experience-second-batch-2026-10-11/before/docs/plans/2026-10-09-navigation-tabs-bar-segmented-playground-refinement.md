# NavigationTabs、NavigationBar 与 SegmentedControl 推荐场景改造计划

> **执行状态 · 2026-10-10：** 用户于 2026-10-09 回复“开始实施”，已授权本文范围。四组、八类推荐场景均已实施；自动检查与 AI 实页对照完成，运行视觉人工确认仍待用户审阅。以下为原实施方案，原“先不动代码”表述仅保留为方案定稿时的历史边界。当前结果见 [执行与验证记录](../../evidence/runtime/navigation-playground-refinement-2026-10-09/verification.md)。

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 本文是实施前方案，不是执行指令。用户确认本组静态方向并要求继续完成文档；当前仍遵守“先不动代码”。静态确认不登记为运行视觉、动效或无障碍验收。

**Goal:** 通过练习内容、课程目的地和批阅顺序三个小场景，让三类组件的视觉层级、实际内容与各自交互语义一致。

**Architecture:** 直接消费现有 NavigationTabs、NavigationBar、SegmentedControl 及 Rain 表单、列表组件。应用层持有模拟内容、当前对象和草稿；局部样式与必要动效仅作用于明确启用的推荐场景，不新增公共导航 API。

**Tech Stack:** 现有 React、TypeScript、Rain UI / Foundations、Vitest、Playwright；不增加依赖或路由框架。

---

## 1. 已确认方向与静态来源

1. [NavigationTabs：练习的提交情况](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-93359e00-a478-44a7-b09d-9dde1e10ca9f.png)
2. [NavigationBar：课程教学内容](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-93773d89-62c8-43f8-9875-30306505e3d0.png)
3. [SegmentedControl：按人／按题对照](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-679e79f6-908e-435c-bdcf-0f72b48abbda.png)

三张是三个组件的推荐场景，不是三种待选皮肤。继续采用白色任务面、浅冷色背景、深蓝灰正文、克制蓝色强调和稳定对齐；颜色、字体、圆角、焦点取自现有 Rain Token。生成图中的头像、图标、表单细节和像素尺寸只是示意，不能反向定义组件默认值。

| 组件 | 首屏场景 | 实际切换结果 |
| --- | --- | --- |
| NavigationTabs | 第一章随堂练习；题目内容、提交情况 3、批阅记录；默认提交情况 | 同一练习内显示不同内容面，每个面板有自己的内容 |
| NavigationBar | 高等数学 A；课程总览、教学内容、学习报告；默认教学内容 | 目的地、地址、当前导航和页面标题同步变化 |
| SegmentedControl | 批阅顺序：按人／按题；欧阳小明的第 3 题为共同当前对象 | 改变遍历轴，当前学生＋题目和对应成绩、备注保持 |

保留完整建设页入口。外观选择、表单诊断和异常集合放在后续高级示例；首屏先让用户理解用途。高级区调整位置后，原有测试要展开对应区域再操作，不能删掉这些行为来让测试通过。

## 2. 文件与影响范围

工作目录：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。下表路径相对此目录；当前已有修改需保留。

| 文件 | 后续实施动作 |
| --- | --- |
| `apps/playground/src/recipes/navigation-v042/navigation-switching-recipes.tsx` | 新增三个具名小场景、少量固定模拟数据与宿主状态；不创建通用场景引擎 |
| `apps/playground/src/recipes/navigation-v042/navigation-switching-recipes.css` | 三个场景的局部排版和状态反馈；明确区分页签线、目的地线和分段底块 |
| `apps/playground/src/recipes/navigation-v042/navigation-switching-recipes.test.tsx` | 只补遍历轴与草稿归属等新增组合逻辑；已有底层行为继续用原测试 |
| `apps/playground/src/docs/components/navigation-component-pages.tsx` | 接入三页首屏，保留高级区和建设页链接，修正默认键盘说明及代码示例 |
| `apps/playground/src/docs/components/navigation-doc-pages.css` | 仅调整三页容器；与前面切片的作用域合并，不能全局覆盖所有导航 |
| `apps/playground/src/app.tsx`、`apps/playground/src/docs/components/component-asset-page.tsx` | 复用前一切片的同页 query／文档标题焦点衔接；两处聚焦采用一致判断，不改变其他组件页的规则 |
| `apps/playground/src/routes/component-assets.test.tsx` | 从 App 入口检查两个导航示例的地址与焦点；保留跨文档标题聚焦 |
| `apps/playground/src/docs/components/g3-component-pages.test.tsx` | 保留八类入口、真实面板草稿、原生深链接检查，补新的首屏内容与按轴切换检查 |
| `tests/e2e/g123-playground.spec.ts`、`g123-playground.config.ts` | 补真实键盘、地址、窄宽和动效检查；使用本次独立证据目录 |
| `apps/playground/src/recipes/navigation-v042/samples.tsx` | A1 / A1Tabs 仅明确启用适用的局部视觉配方，保留其原业务内容与测试标识 |
| `apps/playground/src/recipes/navigation-v042/w3-samples.tsx`、`w3-samples.css` | A3 regular、Contents C1 可启用同一局部配方；inverse、compact、White 与 C3 保持各自语义和视觉合同 |
| `registry/navigation-v042-w3.json` | Gallery 新增真实样式／本地依赖时同步 `galleryFixtureSourceClosure`；当前源记录只按实际受影响文件更新 |
| `tests/e2e/navigation-v042.spec.ts`、`navigation-v042-w3.spec.ts` 及各自配置 | 对 A1、A4、A3、C1–C5、White 做定向回归；先隔离所有证据输出 |
| `docs/ai/navigation-v042.md` | 实施后更新推荐入口、三种语义及未验项 |
| `evidence/runtime/navigation-switching-playground-2026-10-09/verification.md` | 实施后记录源码、实测截图、动效与用户待验项 |

优先不修改 `packages/ui/src/navigation/navigation.tsx/.css`、`navigation-families.tsx/.css`、`packages/ui/src/tabs/tabs.tsx`、RadioGroup、公共导出和 Foundations。若实际失败证明根因在共享组件，先列出全部调用者和必要 System Mode 修复范围，不能用页面覆盖掩盖底层错误。

新增场景属于应用局部 `local-experiment`。后续涉及 Registry／测试基础设施的部分按 System Mode 管理，仅同步实际依赖与验证记录。没有公共资产晋升，不自动迁移 R/S/W6 完整工作台，不修改历史接受快照。本轮只写文档，不改运行代码、Registry、Manifest 或阶段状态。

## 3. 三个小场景的内容与状态

### 3.1 NavigationTabs：练习内部的内容面

- “题目内容”展示一道可读的极限与连续题目及分值；“提交情况”展示 3 名模拟学生、提交状态及批阅入口；“批阅记录”展示对应练习的少量记录。默认 3 份提交中 1 份已批、2 份待批，数量来自同一模拟集合。
- 每个面板都有实际内容；局部备注按练习 ID 和面板 ID 持有。切换、返回、改变外观时仍保留，不能以当前值作为整个场景的 React key。
- 默认 `activationMode="manual"`：方向键、Home / End 移动焦点，Enter / Space 激活；当前项与焦点项可不同。修正旧文案“使用左右方向键切换”，避免把焦点移动写成默认已切换内容。自动激活仅留在明确命名的高级示例。
- 保留底层 `lazy-retain` 面板生命周期、长标题提示、溢出滚动／更多、禁用说明及实例独立性。字符串、数字和 `null` 不相互强制转换；受控失效值不能静默选第一项。
- `navigation-browser` 的联合轮廓继续交给 ConnectedSurface。A4 的“全部班级”弹层属于其场景能力，不挪成全部 NavigationTabs 的默认按钮。

### 3.2 NavigationBar：课程目的地

- 课程总览显示课程简介及班级概况；教学内容显示本章讲义、视频、练习三项资源；学习报告显示这三项资源的少量模拟学习数据。目的地之间要有内容差异，不能只换标题。
- 继续使用原生 `href` 和 `aria-current="page"`。Tab 顺序逐项可达；不套用 tablist、tabpanel 或页签方向键。
- 当前演示只在普通点击时更新本地 `active`，地址不变；`readDemoQuery` 只解析调用时的地址。已核对 App 监听 hashchange 并重渲染同一组件，后续优先从当前合法 query 推导推荐场景的选中值，不必再建立路由监听器。避免仅在 useState 初值读地址，导致后退／前进仍显示旧内容。
- App 的 RouteFocus 和 ComponentAssetPage 都按 navigationCount 聚焦文档标题；原生地址接入后需复用前一切片的局部处理，避免同页 query 导航将焦点抢到整页 h1。跨文档仍按现有规则聚焦，不能全局修改 navigationCount 以影响图表等其他消费者。高级示例自由状态不跟随推荐首屏的 query。
- 点击、直接打开 `#navigation-bar?view=resources`、刷新、浏览器后退／前进均显示对应内容。非法 ID 使用宿主明确的默认目的地；修饰键、新标签页和中键保持原生行为。若宿主接管点击，只有接受目的地后才更新当前样式。
- 页面内的“添加资料”等操作消费已有 Button／表单能力；模拟数据和本地操作状态有明确说明，不建立课程后台、上传或分析服务。

### 3.3 SegmentedControl：改变遍历方式

- 小场景固定 3 名学生与 3 道题；按人时队列列出学生，按题时队列列出题目。队列另一维仍显示当前身份，避免看不出正在批阅谁的哪道题。
- 切换遍历轴仅改变 `traversal`；不重新选择学生或题目。草稿用学生 ID → 题目 ID 的两级记录，或复用等价的已有稳定键方式；绝不按列表下标、显示顺序或模式存储成绩。
- 初始共同对象为欧阳小明／第 3 题；分数 7.0 / 10，备注“请补充左右极限相等且等于函数值。”。按人→按题→按人后对象、编辑值和未保存状态一致；切换轴不隐含保存。分数与备注使用已有 InputNumber、Textarea 等组件。
- 保留 RadioGroup 的原生单选输入、必填 legend（视觉隐藏）、独立 name、disabled、required、form、FormData 与 reset 行为。方向键直接选择可用选项；不创建空 tabpanel。
- 控制值以宿主最终接受的值为准；取消或延迟接受不能提前显示新选中底块。非受控表单按最新 defaultValue 重置；受控表单由宿主在 reset 时恢复。多实例不能共用原生 radio name。
- `white-line`、`white-soft`、inverse、compact、icon-only 留在高级区；图标模式保持名称。外观像下划线不改变它作为互斥条件的语义。

## 4. 动效的实际实现边界

源码事实：当前 Tabs 的 `.rain-tabs__indicator` 属于各自条目，导航样式还将其隐藏，另用选中标签的 `::after` 画线。恢复该 span 或仅添加 transition 都不会产生跨条目的连续滑动。SegmentedControl 当前也是每个 checked 项各自绘制背景，没有公共移动底块。

| 场景 | 后续候选 | 最小实现与限制 |
| --- | --- | --- |
| 下划线 NavigationTabs | 短距离指示线滑动；内容可轻淡入 | 如保留此候选，在局部场景设置一条装饰性标记，根据已接受的选中项测量位置；不复制选择逻辑 |
| NavigationBar | 当前目的地的颜色／线条短反馈 | 地址与内容更新后显示当前项；首版不增加跨页面的移动引擎或整页侧滑 |
| 按人／按题 SegmentedControl | 两个等宽槽之间移动白色底块 | 仅此二选一局部场景可用 CSS 位移；实际 radio 与焦点仍由原组件持有，不扩为全部外观的公共滑块 |
| 浏览器形态 Tabs | 联合轮廓随当前项稳定更新 | 遵循 Scope／ConnectedSurface 计划，不把整个曲线横向拉伸成动画 |

局部装饰层必须 `aria-hidden`、不拦截 pointer、不增加焦点、不覆盖 focus ring。只跟随宿主提交后的选中状态，不能跟随 hover、尚未激活的键盘焦点或被拒绝的请求。若需要测量，限定当前实例，处理字体就绪、容器 resize、轨道 scroll、快速反向和卸载清理；首次布局与几何重算直接定位，不能把 resize 误当用户切换。

无法测量、当前项不可见或已失效时，保留正确的静态反馈；不能产生双指示线、错误位置或错误当前项。仅在新标记可用时隐藏局部旧线。使用既有 motion Token 和 reduced-motion；颜色反馈不要求所有组件、图表和区域共享一个时长。

动效属于待运行验证的候选。普通动效与减少动效均需实测；未实现连续移动时应明确记录，不能把静态标记的变化称为滑动。无需新增 GSAP、通用动画层或全局 Token。

## 5. 后续实施步骤

以下步骤本轮未执行。

### T1：记录基线并补有效检查

1. 重新确认实际工作目录、服务来源、未提交修改和已合入的前三组配方；不要从旧主目录覆盖本工作树。
2. 在 `g3-component-pages.test.tsx` 为新首屏、三个真实面板和草稿返回补断言；在新场景测试中验证“修改欧阳小明第 3 题→切轴→对象与草稿不变→选另一对象→返回”的状态归属。
3. 保留旧高级区的表单 reset、禁用、失效值和外观切换覆盖；调整访问方式，不删除旧合同。先观察新增断言失败于尚未实现的场景。

### T2：接入三页推荐场景

1. 新增局部场景与 CSS；实现真实内容变化、标准表单和稳定身份。静态目标服从正确组件语义和 Token。
2. 接入独立页首屏，保留完整建设页和高级示例。更新说明及复制代码，使示例调用与实际行为一致。
3. 利用已核实的文档壳重渲染完成 NavigationBar 地址同步，复用前一切片的焦点处理；新增真实浏览器后退／前进、同页焦点与修饰键检查，防止仅凭局部 state 通过验收。
4. 运行新组合测试；通过后再核对三张图的层级、信息量和当前态。

### T3：补局部动效并复用到指定建设样例

1. 先实现颜色、边界反馈，再实现局部指示线／二选一底块候选；用普通动效的实际操作验证当前位置、焦点、快速反向和减少动效终态。
2. A1 / A1Tabs、A3 regular、Contents C1 明确启用适用配方；只引入它们实际需要的样式或机制，不导入独立页模拟业务内容。保持已有标签宽度预留、24×3 指示线等未获重新确认的建设页几何合同。
3. A4、White、inverse、compact 及嵌套普通 Tabs 不应被样式波及；存在冲突时缩小选择器，不能删除旧状态来适应新样式。
4. 核对 `w3-samples.tsx/.css` 的真实依赖并更新 Gallery 闭包。`samples.tsx` 不在当前 W3 Gallery fixture 中，不为统一登记把它塞进独立消费包。`currentGalleryHostSourceSnapshot` 只记录建设页宿主；宿主没改就不改其哈希，更不能用它代替 fixture 文件检查。
5. 现有导出 `--plan` 校验 Registry 条目与 R/S/W6 消费入口，不校验 `galleryFixtureSourceClosure` 或全部 Gallery 源记录。单独检查 Gallery 本地导入和样式闭包；只更新当前事实，不改历史接受快照。

### T4：最小充分验证与证据

运行前将 G123、G1、W3 测试源中的截图路径、配置 outputDir、reporter 和附件全部隔离到 `evidence/runtime/navigation-switching-playground-2026-10-09/`。不能只改 outputDir 而仍覆盖旧日期截图。保留专用配置的端口、视口、locale 和 reduced-motion 条件，并核实服务来自当前工作目录。

```sh
pnpm exec vitest run apps/playground/src/recipes/navigation-v042/navigation-switching-recipes.test.tsx apps/playground/src/docs/components/g3-component-pages.test.tsx apps/playground/src/routes/component-assets.test.tsx packages/ui/src/navigation/navigation.test.tsx packages/ui/src/navigation/navigation-families.test.tsx packages/ui/src/tabs/tabs.test.tsx packages/ui/src/radio/radio.test.tsx
pnpm exec playwright test --config tests/e2e/g123-playground.config.ts
pnpm exec playwright test --config tests/e2e/navigation-v042.config.ts --grep "A1 uses native|A4 keeps manual"
pnpm exec playwright test --config tests/e2e/navigation-v042-w3.config.ts --grep "A3 native|C1-C5"
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
node scripts/navigation-v042-export.mjs --plan
```

新测试文件先建立再运行。预期：新场景、底层已有合同与构建通过；导出检查只证明其覆盖范围。若未修改共享 Radio / Tabs / 导航实现，不无差别重跑所有历史工作台；新增失败或根因扩大到共享层时才扩大检查。

| 必测组 | 必须观察的结果 |
| --- | --- |
| 三种语义 | Tabs 手动激活；Bar 为可原生打开的目的地；Segmented 为原生单选且方向键改变值 |
| 宿主状态 | 等待受控提交；取消请求无提前高亮；切轴与面板返回不串草稿；禁用／失效不代选 |
| 地址 | 点击、刷新、深链接、后退／前进与当前目的地一致；非法 ID 使用已说明的默认值 |
| 表单 | name、required、disabled、提交与 reset 正确；两个实例不互斥；切轴不隐含保存 |
| 布局与状态 | 桌面、390px 容器、长标签、200%文字、浅／深色、selected＋focus；计数和字重变化不推挤 |
| 动效 | 普通与减少动效；快速反向、字体／宽度变化、滚动后标记位置正确；仅有一个当前标记 |
| 邻近样例 | A1/A4/A3/C1–C5/White 合同保持，普通 Tabs 与 Radio 的默认外观未被污染 |

专用 G1 / W3 配置默认 reduce，不能用它们替代普通动效验证。视觉、对比度、Safari / VoiceOver 与人工体验分别记录实际结果；未测保持待验。只把当前实测结果交给用户审阅，不据静态图提升成熟度、发布或迁移。

## 6. 方法与本轮结果

沿用 V05（内容、外观与行为一起调整）、D02（按关系组织空间）、D03（按任务组合）、D05（随容器与状态调整）。候选经验：相似线条可以属于页签、链接或单选，语义由任务及行为决定；“按人／按题”是遍历轴，不是草稿身份。先记在本任务，运行验证前不升级为全局规范。

本轮完成最后三类的实施前说明；未执行运行代码、测试、真实浏览器检查、Git 操作或发布。八类的整体顺序与共同验收见 [导航 Playground 改造总表](2026-10-09-navigation-playground-refinement-index.md)。
