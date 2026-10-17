# ScopeNavigation 与 ConnectedSurface 推荐场景改造计划

> **执行状态 · 2026-10-10：** 用户于 2026-10-09 回复“开始实施”，已授权本文范围。四组、八类推荐场景均已实施；自动检查与 AI 实页对照完成，运行视觉人工确认仍待用户审阅。以下为原实施方案，原“先不动代码”表述仅保留为方案定稿时的历史边界。当前结果见 [执行与验证记录](../../evidence/runtime/navigation-playground-refinement-2026-10-09/verification.md)。

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 本文是实施前方案，不是执行指令。用户确认三种静态状态并要求继续讨论；“先不动代码”的边界仍有效，当前仅完善文档。

**Goal:** 将已确认的课程范围栏与连续内容面用于两个独立组件页，让默认、更多班级和窄容器状态形成同一个可理解的小场景。

**Architecture:** 复用现有 ScopeNavigation 的受控选择、完整搜索和回焦，以及 ConnectedSurface 的单层联合轮廓。两个文档页共享少量课程内容和局部样式；R2 仅复用适用的范围栏样式，保留原工作区、201 项数据和资源编辑器。

**Tech Stack:** 现有 React、TypeScript、Rain UI / Layouts / Foundations、Vitest、Playwright；不新增依赖。

---

## 1. 已确认的静态目标

2026-10-09 用户确认本组讨论方案、要求静态打样，并在三种状态展示后回复“确定。继续”。三张图是同一方案的不同状态，不是三种待选皮肤。

- [默认：公共资源](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-cadf6cb2-b4f8-4dad-bd3c-c4c8a3ecd07c.png)
- [更多班级展开](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-5fe1e62e-b640-4d96-8649-69fabdc7955f.png)
- [窄容器：当前高等数学 5 班](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-fca489f1-fddc-4a17-a36a-5302406ff491.png)

保留浅冷色轨道、白色选中范围和与之相连的内容面；默认采用 `inset + tonal`。内容裁为“函数、极限与连续”一章、讲义／视频／练习三条模拟资料及少量操作。首屏不展示完整平台侧栏，保留完整 R2 建设页入口。

字体、颜色、圆角和间距使用现有 Token；图片只说明层次和布局，不能据其像素推导新的全库数值。第三张也不能证明真实 390px 已通过。资源标题和数学文案需人工可读、内部一致，不直接转录生成图的错误文字。

尚未完成：运行效果、真实窄宽、200%文字、深色、动效、键盘和 Safari / VoiceOver 验证。本次静态确认不覆盖这些项目，也不覆盖新的公共默认或发布状态。

## 2. 工作范围与文件边界

唯一工作目录：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。下表路径均相对此目录。保留既有未提交内容。

| 文件 | 后续用途 |
| --- | --- |
| `apps/playground/src/recipes/navigation-v042/scope-connected-recipes.tsx` | 新增两个独立页共用的课程小场景、11 项模拟范围和按 ID 保留的本地草稿；不封装一套新的通用导航 API |
| `apps/playground/src/recipes/navigation-v042/scope-connected-recipes.css` | 新增限定范围的轨道、内容、资料行和容器排版；供 R2 复用适用的范围栏规则 |
| `apps/playground/src/docs/components/navigation-component-pages.tsx` | 两页首屏接入推荐场景；保留各自高级状态／几何演示与完整建设页入口 |
| `apps/playground/src/docs/components/navigation-doc-pages.css` | 仅调整本组场景外层约束，不改变其他六类独立页 |
| `apps/playground/src/recipes/navigation-v042/r2.tsx` | 范围根节点消费局部样式；保留受控范围、201 项数据、editor 插槽及 Workspace 行为 |
| `apps/playground/src/recipes/navigation-v042/r2.css` | 只收敛与新范围样式重复或冲突的规则，保留 R2 全高布局和工作区样式 |
| `apps/playground/src/docs/components/g3-component-pages.test.tsx` | 补两页草稿、实例及高级区可达检查，保持八类页面冒烟检查 |
| `tests/e2e/g123-playground.spec.ts` | 补本组默认／搜索／窄容器、焦点、主题与单轮廓的页面级检查 |
| `packages/ui/src/navigation/navigation.test.tsx` | 沿用范围 ID、公共首位、当前溢出项和搜索合同；只补确有缺口的共享行为测试 |
| `packages/layouts/src/connected-surface.test.tsx` | 复用几何和多实例检查；公共实现未改时不复制同义测试 |
| `tests/e2e/navigation-v042.spec.ts` | 保留 A4 / R2 宽度、搜索、回焦、肩部和编辑器回归 |
| `tests/e2e/navigation-v042-w4.spec.ts`、`tests/e2e/navigation-v042-w6.spec.ts` | 核对 R2 控制器及 W6 E1 既有行为，不顺带迁移其视觉 |
| `tests/e2e/g123-playground.config.ts`、`tests/e2e/navigation-v042.config.ts`、`tests/e2e/navigation-v042-w4.config.ts`、`tests/e2e/navigation-v042-w6.config.ts` | 保留各组视口、端口及动效设置，提供本轮证据输出位置；不以根配置混跑 |
| `registry/navigation-v042.json`、`manifests/recipes/navigation-r2.yaml` | 同步 R2 实际新增样式依赖与当前源记录，保留历史验收快照 |
| `scripts/navigation-v042-export.mjs` | 使用已有复制及哈希校验；只有机制缺少实际依赖时才最小修订 |
| `docs/ai/navigation-v042.md` | 实施后补推荐入口与适用边界 |
| `evidence/runtime/scope-connected-playground-2026-10-09/verification.md` | 实施后记录源码、结果和仍待人工检查的项目 |

本轮为文档讨论。后续小场景仍为 `local-experiment`；因 R2 的复制依赖与当前源码记录需要同步，完整实施按 System Mode 管理该部分，不扩大公共组件范围、不改变成熟度。当前不修改 Registry、Manifest 或阶段状态，不提交、推送、发布或写入 Figma。

优先不改 `packages/ui/src/navigation/navigation.tsx/.css`、`packages/layouts/src/connected-surface*` 及公共导出。若真实验证证明共享缺陷，另列失败证据和受影响消费者；不能把局部视觉选择直接变成所有消费者的默认。公共导航共用同一源文件，若最终改动，需同步 NavigationTabs、NavigationBar、ScopeNavigation 的当前源记录与对应 Manifest，而不是只更新一个名称。

## 3. 同一场景在两页的呈现

**ScopeNavigation 页：** 首屏展示课程内容范围与三条资料；用真实内容解释切换结果。重点展示公共范围、选中溢出班级、更多搜索和窄容器。集合加载／错误／空态／当前项失效保留在高级区。

**ConnectedSurface 页：** 复用同一小场景，强调选中范围与内容面之间的连续关系；几何高级区保留 `inset / merged` 与 `tonal / plain / outlined`。另保留小型纯几何示例，避免误解为 ConnectedSurface 只能服务课程范围导航。

小场景使用公共范围＋10 个教学班，共 11 项。桌面推荐上限为 3：公共项、2 个班级、更多 8；窄宽为公共项、1 个班级、更多 9。数量必须从当前可见集合计算。切到高等数学 5 班后，该班进入最后一个可见槽；从窄容器恢复宽度时当前选择不变。

R2 仍使用公共范围＋200 个教学班，`visibleLimit` 默认 4 以及已有 3 / 4 / 5 能力不变；W6 E1 的 240 班数据也不替换为小场景数据。新图的“更多 8 / 9”只属于 11 项示例。

资料行优先标题，其次资料类型、时长／数量与状态。窄容器可将这些信息换到第二行，工具按钮可自然换行，不压缩为难以点击的小控件。公共与教学班的标题、面包屑和说明始终对应所选 ID。保存仅反馈当前本地草稿，添加资料仅做明确标识的本地演示。

## 4. 窄容器的具体约束

现有数量计算使用 `floor((width - 188) / 186)`，至少保留两项；现有范围身份项又有 170px 最小宽度，更多区域不可收缩，连接轮廓还需要安全内衬。因此仅减少可见数量或隐藏图标，不能证明公共、当前班和更多会同时完整可见。

实施顺序：

1. 分别检查 390px 浏览器视口内的实际嵌入宽度和明确设为 390px 的独立组件容器，记录真实字体下的失败状态。当前文档窄屏内衬会使前者在场景自身内衬之前最多约剩 324px（源码尺寸推算），两者不能当作同一个用例。记录外框、轨道和可用宽度，不把图片宽度当实测。
2. 先在局部配方以容器查询覆盖身份项最小宽度和内边距；给更多区保留空间，其余宽度分给两个范围项。窄宽省略可选图标，不删数据或可访问名称。
3. 保留完整主名称和身份说明的数据；长文本允许视觉省略，但通过现有标签提示、可访问描述及更多完整结果读取。文字放大时允许布局增高，不用缩小字体强保一行。
4. 保留 ConnectedSurface 的安全内衬约束；不能直接清零。现有规则要求内衬至少为面板圆角＋肩部＋2，且选中项完整进入视口才画肩部。仅使用现有受限几何档位。
5. 若最小目标宽度仍无法容纳，先给出真实测量和可复现边界，再讨论降级排版；不在本计划中承诺任意长名称和任意小宽度都能一排完整显示。

检查不能仅断言页面没有横向滚动：两个范围项需位于视口内、当前项连缝连续、更多按钮可达；焦点轮廓不能被裁切，弹层不能越出可用屏幕。

## 5. 交互、状态和动效保持规则

- **完整搜索：** 更多检索全部范围，包括公共项和已经直接可见的班级；空结果不改变当前范围。打开先聚焦搜索，输入与结果保留清楚名称。
- **回焦：** 宿主接受选择后聚焦新的当前页签；拒绝该受控变更、Escape 或关闭按钮取消时回到更多触发器。外点关闭不应抢走用户点击目标的焦点。以现有 Popover 行为为基线验证，不自行重写回焦层。
- **选择与编辑：** 范围切换不保存、不发布、不同步。共用内容节点保持挂载，宿主草稿按范围 ID 保存。当前 ID 失效时提示重选并停止对旧范围的可操作编辑，不自动跳到第一项。
- **异常状态：** 集合加载与内容加载分别表达；空集合、搜索无结果、加载失败和当前项移除不是同一种空态。沿用已有高级示例，避免为三条静态资料新增异步框架。
- **键盘：** 保持底层 Tabs 与 Popover 的既有语义和按键合同。焦点状态与选中状态各自清晰，多实例互不影响。
- **连续表面：** 使用现有装饰 SVG 联合轮廓；外层不再画第二条边框。`merged` 只在选中项实际贴边时合并，不能按第一项／最后一项的序号硬判。
- **主题：** 使用 Rain 语义色，蓝色锚点不变。更多弹层通过 Portal 渲染，根节点局部选择器不能覆盖它；先复用其现有主题能力，并独立检查弹层的文字、搜索、结果和焦点。需要修复时走现有主题归属，不用全局裸选择器为一个示例染色。
- **动效：** 状态色和边界采用既有短反馈档位；轮廓随真实测量稳定更新，暂不做整条连接形状拉伸滑动。更多弹层复用现有动效，内容切换保持尺寸和草稿，减少动效下仍呈现正确终态。

## 6. 后续实施顺序与验证

以下均是后续步骤，本轮没有执行。

### 任务 1：建立可比较的页面检查

1. 在现有 G3 页面测试补公共与班级草稿切回、双实例互不串扰，以及高级状态仍可访问的断言。
2. 在现有 G123 浏览器测试补 11 项示例桌面／窄容器的可见数量、更多计数与实际元素边界检查。
3. 运行新增检查，确认失败来自新场景尚未接入；已有共享合同应继续通过。布局判断只放在真实浏览器，不用 JSDOM 假装宽度验证。

### 任务 2：接入两页推荐场景

1. 新增最小课程小场景，直接组合 ScopeNavigation、ConnectedSurface 和已有 Button / Input / Textarea / Tag 等所需组件；只使用真正出现在场景中的控件。
2. 两个独立页复用场景；把原控制项移至高级区并更新使用代码与建设页入口。
3. 加入局部容器排版和主题规则，检查三种确认状态；不新增导航状态机、公共参数或业务数据接口。

### 任务 3：复用到 R2 并核对复制依赖

1. R2 只引入适用样式及范围根类；保留数据、Workspace、editor 插槽、全高内容和现有默认参数。
2. 在 `registry/navigation-v042.json` 的 `navigation-r2` 文件集合和 `currentSourceSnapshot` 中登记实际新增依赖；相应补当前 Manifest 记录。保存历史 `sourceSnapshot`、`acceptedVisualSourceSnapshot*` 和旧验收记录。
3. 用已有导出计划检查所有本地导入均可解析、当前哈希匹配。R2 未导入小场景 TSX 时，不为复制包登记无关的模拟数据文件。不要修改历史导出包。

### 任务 4：运行最小充分检查并记录证据

1. 先检查测试源和专用配置中的所有文件写入。当前 `navigation-v042.spec.ts` 硬编码写入历史 `review-07` / `review-08`，G123 也固定写旧日期；只改变 Playwright `outputDir` 不够。将本次截图、JSON、报告及测试产物统一定向到 `evidence/runtime/scope-connected-playground-2026-10-09/` 下分组子目录，保留旧文件。
2. 用各组现有配置分别运行，保持原视口、locale、端口及 reduced-motion 设置；启动并核对对应服务来自本工作目录。证据路径可在所需测试和配置中增加一个本次输出覆盖入口，不另造测试框架。默认动效与减少动效均需在新增页面检查中明确覆盖。

完成上述输出隔离后，在工作目录运行：

```sh
pnpm exec vitest run packages/ui/src/navigation/navigation.test.tsx packages/layouts/src/connected-surface.test.tsx apps/playground/src/docs/components/g3-component-pages.test.tsx
pnpm exec playwright test --config tests/e2e/g123-playground.config.ts
pnpm exec playwright test --config tests/e2e/navigation-v042.config.ts
pnpm exec playwright test --config tests/e2e/navigation-v042-w4.config.ts
pnpm exec playwright test --config tests/e2e/navigation-v042-w6.config.ts
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
node scripts/navigation-v042-export.mjs --plan
```

期望：新增场景和既有合同通过；R2 / W6 大数据及恢复行为不回退；导出计划无漏依赖或当前哈希错误。若其他切片的既有修改导致导出校验失败，准确记录来源，只修本组造成的问题，不借本任务重写其他切片快照。

人工看真实页面的正常、悬停、选中＋焦点、长名称、窄宽、200%文字、深色、减少动效和更多弹层。重点检查单轮廓、所有范围可达、完整搜索及草稿保留。保存截图和检查结果，再交用户审阅；自动化不能替代运行视觉或 Safari / VoiceOver 验收。

设计方法沿用本轮已读的 V05、D02、D03、D05：用少量真实任务内容检验密度和层次，以状态组合检验连续关系。候选经验是“范围身份＋连续工作面”应一起展示；当前仅写入任务记录，不凭静态稿追加全局规范。

## 7. 与其他切片的关系

四组静态方向与实施前计划已完成，统一顺序见[八类总表](2026-10-09-navigation-playground-refinement-index.md)。本组仅拥有范围选择、连续表面和相关局部排版；平台目的地与区域恢复由 NavigationList／Workspace 切片处理，不因两个场景都引用 R2 而重复改其完整工作台。
