# ObjectNavigator 推荐场景与导航 Playground 改造计划

> **执行状态 · 2026-10-10：** 用户于 2026-10-09 回复“开始实施”，已授权本文范围。四组、八类推荐场景均已实施；自动检查与 AI 实页对照完成，运行视觉人工确认仍待用户审阅。以下为原实施方案，原“先不动代码”表述仅保留为方案定稿时的历史边界。当前结果见 [执行与验证记录](../../evidence/runtime/navigation-playground-refinement-2026-10-09/verification.md)。

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 本文是实施前方案，不是执行指令。当前用户边界仍为“先不动代码”；当前仅完善文档。方案确认不等于运行视觉、无障碍或发布验收。

**Goal:** 将已确认的方案 2 与两行活动卡片用于 ObjectNavigator 的三个真实内容小场景，并让独立组件页与建设页消费同一份局部配方。

**Architecture:** 复用现有 ObjectNavigator、被动内容槽、DataBar 和 Rain 主题／动效规则；应用层局部配方拥有内容排版与模拟业务状态。先完成对象导航这一切片，不修改其他七类导航的公共默认，不新增通用 MiniChart 或业务接口。

**Tech Stack:** 现有 React、TypeScript、Rain UI / Foundations、Motion、Vitest、Playwright；不新增依赖。

---

## 1. 已确认内容与尚未确认内容

2026-10-09，本轮用户依次确认：

1. 独立组件页展示“带少量真实内容的小场景”，保留完整建设页入口。
2. 保留 Rain 整体气质，允许局部视觉明显提升。
3. 选择三张静态稿中第二张：浅冷色导航区域、白色任务面、克制的选中边界。
4. 课堂活动卡片从标题／摘要／进度三行改为两行。
5. 使用已有的迷你**横向进度条**；明确排除完成环。
6. 最新两行修订图得到“确定。继续”。

静态目标：

- [方案 2：整体方向](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-5ee30f3b-4118-465e-8828-191631e2cd2c.png)
- [活动卡片：两行进度条修订](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-dfa18989-fdb1-445c-be1d-0c627d011f6e.png)
- [先前候选设计说明](/Users/wenchengkai/.codex/visualizations/2026/10/09/01a11f51-71c9-7033-8791-4bff1df48d5d/navigation-audit/对象导航候选设计说明-v1.md)
- [八类导航现场审查](/Users/wenchengkai/.codex/visualizations/2026/10/09/01a11f51-71c9-7033-8791-4bff1df48d5d/navigation-audit/导航组件只读审查与方案.md)

修订图优先于方案 2 中旧的三行活动卡片。图片提供布局与气质参考；实际颜色、字体、进度比例和尺寸来自已有组件与 Token，不取生成图片的像素作为真值。参考路径是当前机器上的原始文件，尚未制作便携交付包。

尚未确认：可运行效果、深色完整视觉、真实窄容器、200%文字、动效体验、Safari / VoiceOver。后续其他七类的静态方向已分别完成讨论，统一见[八类总表](2026-10-09-navigation-playground-refinement-index.md)；不得用静态确认关闭运行检查点。

## 2. 实施范围和最小文件边界

唯一工作目录：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。下表路径均相对此目录。现有大量未提交内容是开发基线，不回滚、不清理。

| 文件 | 后续动作与用途 |
| --- | --- |
| `apps/playground/src/recipes/navigation-v042/object-navigator-recipes.tsx` | 新增具名局部配方、模拟数据与三个小场景；只导出被两个宿主实际使用的内容 |
| `apps/playground/src/recipes/navigation-v042/object-navigator-recipes.css` | 新增限定在配方根节点内的两行、主题、状态与容器规则 |
| `apps/playground/src/docs/components/navigation-component-pages.tsx` | ObjectNavigator 首屏改为三个推荐场景；原自由组合和异常演示移至高级区；同步使用代码 |
| `apps/playground/src/docs/components/navigation-doc-pages.css` | 将当前统一 320px 限制限定到适用的高级示例；推荐活动区使用完整宽度 |
| `apps/playground/src/recipes/navigation-v042/w3-samples.tsx` | A2、A5、Contents 的对象选择部分复用相同配方；保留各建设页壳和业务内容 |
| `apps/playground/src/recipes/navigation-v042/w3-samples.css` | 仅删除或缩小与新配方冲突的对象导航选择器，不重写整份建设页样式 |
| `apps/playground/src/recipes/navigation-v042/object-navigator-recipes.test.tsx` | 新增必要的局部行为与数据组合测试 |
| `apps/playground/src/docs/components/g3-component-pages.test.tsx` | 保留现有对象草稿、标记和移除后的编辑器断言；必要时先展开高级区并限定查询范围 |
| `tests/e2e/g123-playground.spec.ts` | 在现有文件补对象导航真实场景与两行几何检查，不新增通用测试框架 |
| `tests/e2e/navigation-v042-w3.spec.ts` | 保留身份与可访问性断言；调整被明确替换的 A5 固定 300px 断言，核对 A2 / A5 / Contents |
| `registry/navigation-v042-w3.json` | 补既有 galleryFixtureSourceClosure 的实际新依赖及当前源记录；不修改历史接受快照或提升成熟度 |
| `scripts/navigation-v042-export.mjs` | 读取既有校验覆盖范围；不为本局部 Gallery 配方扩建导出功能 |
| `docs/ai/navigation-v042.md` | 实施后补推荐配方入口、来源与适用边界 |
| `evidence/runtime/object-navigator-playground-2026-10-09/verification.md` | 实施后记录当前源码、检查结果和人工待验项 |

先不修改 `packages/ui/src/navigation/navigation-families.tsx/.css`、`packages/ui/src/charts/data-bar.tsx`、公共组件导出或 Foundations。局部文件中的配方登记需遵循 B2 合同。Registry 只同步已有建设页复制所需的真实依赖和当前源记录；公共 Manifest 合同未变时不作无关修改。若执行时发现公共缺陷确实无法通过组合解决，先列出实际影响的调用方和所需同步文件，不偷扩大本切片。

工作模式：本轮文档讨论；后续推荐场景仍为 `local-experiment`，复用既有 `registry-candidate`。由于现有建设页源码复制依赖登记在 Registry 中，后续完整实施按 System Mode 管理这项依赖同步，但不据此扩大共享组件范围或改变资产成熟度。没有 Git、Figma、发布或业务接入操作。

## 3. 三个场景的具体目标

### 3.1 学生队列：先辨识对象，再处理答案

- 左侧 5 名模拟学生，右侧当前学生、题目、答案摘要、评分及备注。
- 保留姓名、学号、状态／分数、32px 既有 Avatar 与独立尾部操作。选中使用浅底、姓名字重和靠详情一侧细定位线。
- 队列沿用建设页已验证的 76px 行高作为默认起点，不因生成图比例另定全局尺寸。
- 评分用已有 InputNumber，长备注用 Textarea；示例保存只在本地反馈，不伪装真实提交。
- 草稿按学生 ID＋题目 ID 持有；标记未选学生不会改变当前对象。
- “未提交”仍可选择查看，详情解释原因并禁用评分。真正不可选择的对象另设状态样例。
- 校正模拟内容：答案应确实缺少备注要求补充的条件，避免当前图稿“答案已写完整但仍要求补充”的文案矛盾。

### 3.2 活动卡片：常规宽度下只有两行

| 信息层 | 内容与关系 |
| --- | --- |
| 第一行 | 活动标题，优先单行；使用已有标题字级，不放额外装饰图标 |
| 第二行左侧 | `6 / 8 组完成 · 21 分钟`，普通文字沿用迷你图表当前 13px / 20px |
| 第二行右侧 | 同长度的短横向进度条＋紧邻百分比，作为一组对齐 |

三个示例使用相同分母 8：6/8＝75%，8/8＝100%，3/8＝37.5%。卡片选择只影响边界与标题，不改变进度含义或整条颜色身份。

复用图表的 compact 条形规格：120px 轨道、6px 厚度、8px 图文间距。该值是当前迷你配方规格，不是新全局 Token；优先消费已有 `MINI_LAYOUT.compact.bar`。三张卡片的轨道宽度必须一致，百分比占位需容纳 100% 和 37.5%。

常规卡片约 16px 内衬、标题与摘要约 8px 间距，是既有空间档位组合。最终高度由内容决定，不把生成图估计的 92–100px 硬编码为必须达到的高度。

缩窄时先调整列数为两列／一列，保持信息可读和全部活动可达；不把三张卡硬塞回 320px 窄栏。标题过长、文字放大时允许合理增高。两行是常规内容的排版目标，不以裁切关键数据、缩小字体或点击区换取绝对高度。

列数按场景内部可用宽度决定，不按浏览器宽度直接判断。当前文档壳最大 1080px，扣除两侧 32px 及预览两侧 24px、边框后约剩 966px，尚未扣场景自身内衬；这只是源码尺寸推算。设实测单卡最小可读宽度为 W、卡间距为 G，三列需要至少 `3W + 2G`。W 要同时容纳元信息、120px 条、8px 图文间距、最长百分比及卡内衬，不能用旧 300px 或生成图比例代替测量。

一列仍不足或放大文字时，允许摘要与进度分行，保留相同的条形规格和完整读数；常规宽度仍按已确认两行呈现。76px 队列行高同样是常规字号基线，放大文字时内容可增高，不能裁切姓名或焦点。

卡片下方保留当前活动结果与“查看小组结果”，随所选 ID 同步。活动标题在详情中可完整阅读。

### 3.3 讲稿缩略导航：画面、标题和当前位置相互对应

- 4 页模拟讲稿，左侧缩略列表、右侧当前页；页码和名称独立于图片存在。
- 优先复用现有可用讲稿素材；如需补示例资源，保留明确来源及模拟标记，不以生成稿中的公式图充当已校对教学内容。
- 图片保持原始比例，不压扁、不仅用空框和文字代替缩略内容。
- 缺图时仍可凭页码／标题选择；当前页不存在时提示重选，不静默改到第一项。

## 4. 两行进度的复用方式

现有 `NavigationContentItem.meta` 接受被动 ReactNode，且纳入主体按钮的描述。活动项只用 `label` 和 `meta` 组织这两行；省略 `description` 与旧 `progress` 字段，避免额外生成第三行。旧字段继续服务其他调用方，不能为本页面删掉。

DataBar 是数量比较图形，本身不声明任务进度语义。局部宿主用已完成数／总组数解释它，并保留可读文本。若沿用旧例的 `progressbar` 语义，放在被动包装中；不增加焦点、不加入可操作后代。图形用 `decorative` 避免重复朗读。`meta` 最终嵌在 `span` 与按钮中，内部使用 `span`，不要放嵌套按钮或块级表单控件。

以下仅是计划中的正常态组合示意，不是本轮新增运行代码：

```tsx
import { DataBar } from "@rain-next/ui/charts";
import "@rain-next/ui/charts/styles.css";

// completed / total 已由场景数据边界检查；此段仅处理正常态。
const fraction = completed / total;
const percent = new Intl.NumberFormat("zh-CN", {
  style: "percent", maximumFractionDigits: 1,
}).format(fraction);

const item = {
  id, label,
  meta: <span className="object-recipe__activity-meta">
    <span>{completed} / {total} 组完成 · {minutes} 分钟</span>
    <span className="rain-chart object-recipe__activity-progress"
      data-recipe="monochrome-blue" role="progressbar"
      aria-label={`${label}完成进度`} aria-valuemin={0}
      aria-valuemax={100} aria-valuenow={fraction * 100}
      aria-valuetext={`${completed} / ${total} 组完成，${percent}`}>
      <DataBar decorative label="完成组数" value={completed}
        maxValue={total} style={{ width: 120, height: 6 }} />
      <span>{percent}</span>
    </span>
  </span>,
};
```

正式组合从已有迷你尺寸事实源读取数值；上例写出数值仅用于说明。`.rain-chart` 必须局限在被动进度组内，不能包整个 ObjectNavigator：图表样式包含对子按钮的规则，扩大根节点会污染导航按钮。显式加载图表样式，避免依赖用户先访问过图表页。

异常口径沿用已存在的数据判断：0/正数显示空轨道和 0%；缺测显示缺测；0/0 显示不适用；非有限数、负数和超出总数显示原因，不绘制伪造的正常进度。可复用 `chart-business/mini-data.ts` 中的状态判断；它当前将百分比取整，本场景使用标准 `Intl.NumberFormat` 保留至多一位小数，不修改所有图表的读数规则。

不要新建通用进度服务、格式化框架或主题系统；只为此组合留下必要的一项小测试。

## 5. 状态与动效候选

| 行为 | 本切片处理 | 检查重点 |
| --- | --- | --- |
| Hover / Press | 局部颜色和边界反馈，引用现有 feedback duration / easing | 不改变大小；选中＋悬停仍可辨 |
| 选择对象 | 选中即时生效，详情按 ID 同步 | 不把长队列做跨行追逐滑块 |
| 键盘焦点 | 原生 Tab、Enter、Space；独立 focus-visible | 焦点与当前对象允许不同；轮廓不被裁切 |
| 进度数据变化 | 复用 DataBar 既有宽度动画和圆头 | 快速更新、0%、100% 不变形 |
| 仅改变选中 | 不重新挂载卡片和 DataBar | 不重复从 0 播放、不重置数据 |
| 详情切换 | 首版即时切换，保留稳定区域 | 不做大范围滑动、缩放或内容晃动 |
| 减少动效 | 消费既有 reduced-motion 规则 | 静态选中和焦点不丢失 |

当前 Foundation 的反馈档为 140ms，来自 `packages/foundations/src/motion.css`；使用 Token，不复制成新常量。DataBar 当前自身动画为 550ms，由图表组件负责；本方案不为“统一时间”改写图表。动效仍待真实体验，不因现有数值可用就登记为已确认。

集合加载和详情加载分别归属；列表 `loading` 不能代替详情状态。当前对象被删除、被筛出和暂时获取不到分别处理，不自动代选。第一版使用同步模拟详情，不为了示例创建网络请求层。

## 6. 执行任务与针对性验证

### T0：保存当前基线

1. 核对工作树和本计划涉及文件的当前内容，不以 Git HEAD 代替包含已有工作的基线。
2. 保存 ObjectNavigator 独立页与 A2 / A5 / Contents 的同视口截图；记录现有失败，不重写旧验收记录。
3. 确认本地两个服务端口与现有测试配置一致；不停止其他任务的服务。

### T1：建立局部内容组合

1. 在新配方文件中集中学生、活动、讲稿模拟数据，使用稳定 ID；两个宿主可传不同内容，不复制整个业务页。
2. 先补活动 meta 测试：6/8、8/8、3/8 的图形比例与文本一致；无第三个进度槽；仅主体与独立操作可聚焦。
3. 复用 DataBar、compact 尺寸与状态判断，增加正常与必要异常样例；完成环不进入此配方。
4. 测试先观察失败，再完成组合并通过；不重复重写已有 DataBar 内部测试。

### T2：完成三个推荐场景

1. 学生队列接答案摘要及按学生／题目 ID 的备注；未提交详情可看、评分不可用。
2. 活动使用两行信息和结果摘要；选择与尾部动作独立。
3. 讲稿提供有差异的缩略内容与对应阅读区，补缺图示例。
4. 用现有控件完成最小操作，不增加真实保存、上传、权限、接口或路由服务。

### T3：合并文档入口与建设页消费

1. 独立页按学生队列、活动卡片、讲稿缩略导航展示；每段有用途与可直接到达的完整建设场景入口。
2. 将原 appearance/content 自由组合与异常控件放到高级区，保留原能力和草稿归属。
3. A2 / A5 / Contents 调用相同局部配方；A5 与 C4 共用活动数据，不能漏改其中一个调用方。
4. 保留 A2 现有 76px 队列约束和各建设页壳；仅针对活动最小宽度修改旧 300px 假设，不能删除全部几何断言。
5. 同步复制示例代码及使用说明。现有 `registry/navigation-v042-w3.json` 的 `galleryFixtureSourceClosure` 已包含 `w3-samples`，必须从真实导入核对并补入新配方、DataBar／图表样式及实际使用的迷你尺寸／状态模块依赖。现有 `scripts/navigation-v042-export.mjs --plan` 检查 Registry 条目与 R/S/W6 独立消费入口，不遍历 Gallery 闭包，不能代替此检查；建设页宿主未变时不改 `currentGalleryHostSourceSnapshot`。保留历史源码及接受快照，不以改旧快照让检查变绿，不新建下载功能。

### T4：主题、容器与动效

1. 配方根节点映射现有语义颜色；主题不能只改变文档背景。
2. 在桌面与窄容器检查两行、长标题、200%文字、进度读数、尾部操作和缩略比例。
3. 添加限定范围的颜色／边界过渡；保留即时选中与现有 DataBar 数据动画。
4. 检查键盘、快速反复选择和 reduced-motion。具体焦点／深色缺陷若来自公共组件，记录根因及所需独立范围。

### T5：最小充分回归与交付

新增组合测试的建议运行命令（实施后运行，本轮未运行）：

先将 G123、W3 测试源内硬编码截图、附件、reporter 和配置 outputDir 全部隔离到 `evidence/runtime/object-navigator-playground-2026-10-09/`；仅改变 outputDir 不足以保护历史证据。保留原视口、locale、端口和动效条件。

```sh
pnpm exec vitest run apps/playground/src/recipes/navigation-v042/object-navigator-recipes.test.tsx packages/ui/src/navigation/navigation-families.test.tsx apps/playground/src/docs/components/g3-component-pages.test.tsx
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
pnpm exec playwright test --config tests/e2e/g123-playground.config.ts --grep "object navigator recommended scenes"
pnpm exec playwright test --config tests/e2e/navigation-v042-w3.config.ts --grep "A2 native|A5 current|C1-C5"
```

新对象导航浏览器用例使用 `object navigator recommended scenes` 作为标题前缀。现有 g123 配置指向 5376，W3 配置指向 5198；执行前用当前源码启动对应服务或提供当前配置，不把端口上任何现成页面都当作新实现。

| 验收组 | 必要证据 |
| --- | --- |
| 结构与空间 | 正常桌面标题／摘要两行；三条轨道等宽、进度准确；390px 页面无整体横向溢出；长标题与200%文字完整可达 |
| 对象与操作 | A→B→A 草稿归属正确；操作 B 不改选 A；删除当前项不代选；未提交可查看 |
| 图文一致 | 0%、75%、100%、37.5%、缺测、不适用和异常；名称、分母、比例与结果一致 |
| 状态可辨 | 默认、hover、pressed、selected、focus、selected＋hover、selected＋focus；浅色／深色实看并量测必要对比度 |
| 动效 | 连续改选不重播条形；数据更新圆头保持；reduced-motion 无非必要运动 |
| 两个宿主 | 独立页与 A2 / A5 / Contents 的共同配方一致；旧路由／选择／原生键盘行为无回归 |
| 源码复制 | 核对建设页实际复制路径及 Gallery 依赖闭包，确认新配方与图表样式可随示例使用；缺少现成 Gallery 导出能力时明确记录，不把 R/S/W6 导出称为可打开 A5 的包；历史快照未被改写 |

预期结果：针对性测试与构建通过，新增截图与问题记录可复核；真实效果仍提交用户视觉审阅。Safari / VoiceOver 未完成时明确保持待验。没有共享修改就不重跑全部 170 类图表下载、全库端到端或新增基础引擎测试；新增失败或扩大影响面时再追加对应检查。

交付记录仅标记本切片实际完成的实现和验证。旧导航建设页的接受记录保留；新配方的运行验收另记，不因截图确认把全库提升成熟度。

## 7. 其他七类导航如何继承

| 下一组 | 可继承的规则 | 仍需单独设计的内容 |
| --- | --- | --- |
| ScopeNavigation＋ConnectedSurface | 真实内容小场景、浅底与白任务面、完整建设页入口 | 当前范围稳定可见、更多搜索、连接肩部与触边几何、窄容器预算 |
| NavigationList＋Workspace | 身份与当前项层级、独立焦点、少套容器 | 原生页面链接、纵向分组、恢复／暂看／固定／专注；导航列表不能被当作树 |
| NavigationTabs | 推荐内容面、稳定草稿、状态清楚 | 手动／自动激活说明、移动指示器、溢出；不复用对象队列的选中竖线 |
| NavigationBar | 清楚目的地与当前内容 | 原生链接及修饰键行为、页头组合 |
| SegmentedControl | 紧凑密度、稳定文字与焦点 | 原生互斥条件、滑块反馈、按人／按题的真实视图变化 |

建议下一轮视觉讨论先处理 ScopeNavigation＋ConnectedSurface，它们共同决定范围和任务面关系。此表只安排顺序，不表示这些组件已采用方案 2、已获视觉验收或已授权实现。

## 8. 本次方法与候选经验

- V04：标题、业务摘要、百分比按角色分层；不把每个数字都加粗放大。
- V05：外观与内容一起确定；预览形态必须带真正缩略内容。
- D02：把元信息和短进度图就近同排，减少独立行；保留同对象信息关系。
- D05：两行以正常宽度为目标，长内容和文字放大优先可读性。
- I02：完成度有真实分母，使用横条与精确读数；不以走势或完成环替代用户已确定的表达。

候选经验：少量对象摘要卡可以把短定量图形嵌入元信息行，减少纵向高度；前提是保留统一量程、稳定轨道、就近读数和可用宽度。当前只有静态方向确认，尚未运行验证；先留在本任务记录，不回写为全库强制设计规则。

## 9. 本轮完成与未执行

本轮完成：确认记录、源码复用核对、最小文件范围、实施顺序与验收清单。

本轮未执行：产品代码、测试运行、新浏览器截图、治理状态变更、Git、Figma、发布和生产集成。主要待验证点是短条所需的卡片宽度、真实主题／焦点，以及旧建设页消费同一配方后的效果。
