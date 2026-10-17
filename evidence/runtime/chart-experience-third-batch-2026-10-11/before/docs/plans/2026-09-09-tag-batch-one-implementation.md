# Tag 第一批接口与实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将已确认的 Tag 视觉落实为完整配色、三档尺寸、独立关闭、链接、单选与多选的第一批公共组件。

**Architecture:** Foundations 保存颜色与几何事实，现有生成链输出 Token 和受控 Tailwind 类；Tag 家族共用完整 Recipe。导航复用 Link，选择沿用 OptionButton / OptionGroup 的原生表单方式，值与移除后的集合焦点由相应使用方管理。

**Tech Stack:** 当前工作区的 React、TypeScript、Tailwind CSS、CVA、Vitest / Testing Library、Playwright；不新增依赖。

---

日期：2026-09-09。模式：System Mode。接口清单交付后，用户回复“进入下一步”，第一批公共 Token / 组件实施已获授权并开始；范围限于本计划。

## 1. 决定来源与完成范围

视觉依据为 [Tag 设计稿第 9 节](2026-09-08-tag-design.md#9-第一批结构与交互预览2026-09-09)，用户在三项修订后回复“确认，没问题。”。本轮“继续推进下一步”承接第一批 API 与 Token 清单收口。下面的接口、默认值和实现方式是本轮整理后的方案，不把未展示组合记为已经验收。

第一批交付 `Tag`、`LinkTag`、`CheckableTag`、`CheckableTagGroup`；可关闭是 Tag / LinkTag 的能力。第一批登记全部已确认色值，第二批专用形状与 Domain 映射、第三批 TagSelect 与标签创建流程仍按原路线推进。

当前视觉基准：20 组原配色全部保留；Filled 默认无可见边框；Solid 为 UI 字体 700；三档 20 / 24 / 28；未选中完全不留勾选占位，选中勾位于文字后；文字与关闭点击区之间不另加间距。2026-09-09 用户在真实页面反馈所有可操作区域应适应不同尺寸，替换先前固定 24 × 24 关闭区的决定：关闭按钮取标签内高并保持正方形，Line/1 下为 18/22/26，图标盒为 12/14/14；Link 主操作也随内高，选择操作随整个标签。

实施授权已依照 [AGENTS](../../AGENTS.md) 在 [当前阶段](../../status/current-phase.yaml) 记录为 Tag 专项细化。四个组件的 Manifest 与本地未发布 Registry 已建立；历史复用矩阵中的 `humanGate: accepted` 和预览视觉确认均不代替真实组件验收。

## 2. 公共接口

### 2.1 共有视觉参数与兼容

```ts
type TagColorProfile =
  | "classroom" | "olive" | "paper" | "exam" | "courseware"
  | "gold" | "purple" | "assignment" | "live" | "audio"
  | "magenta" | "brown" | "vote" | "self-test" | "slate"
  | "difficulty1" | "difficulty2" | "difficulty3" | "difficulty4" | "difficulty5";
type TagColor = "neutral" | "brand" | TagColorProfile;
type TagSize = 20 | 24 | 28;
type TagAppearance = "filled" | "outlined" | "solid";
```

此处列明公开身份；实现时 `TagColorProfile` 从 Foundations 的固定事实表导出，UI 不再维护第二份颜色枚举。名称是稳定配色身份，普通标签可显示任意文字；固定“课堂”“试卷”等业务文案由第二批 Domain 包装决定。

| 参数 | 行为 |
| --- | --- |
| `color` | 默认 `neutral`；只接受上述已登记身份，不接受十六进制或任意 CSS 色值 |
| `tone` | 保留现有 `neutral / brand` 兼容入口；解析顺序为 `color ?? tone ?? "neutral"`，新示例用 `color` |
| `appearance` | 默认 `filled`；不从外观推导禁用、导航、选中或移除能力 |
| `size` | 显式值优先；静态 Tag 在 compact 为 20、其他密度为 24；可关闭、LinkTag、CheckableTag 默认 24，28 显式选择 |
| `leadingIcon` | 装饰性前图标；使用现有可用图标，Small 盒 12，其他盒 14；不是独立按钮 |
| `className / localRecipe` | `className` 只控制外层布局；视觉局部调整复用现有 Rain Local Recipe Parts，不新增一套样式覆盖系统 |

现有 Next Tag 无尺寸参数，默认 28 / compact 24。新默认值属于本次已展示尺寸方案的迁移，不能称为像素兼容；保留现有 `appearance / tone / onRemove / removeLabel / layout` 用法及原生可访问属性。

`layout="vertical"` 保留入口与不显示关闭按钮的既有行为，第一批维持其原几何兼容路径；新的三档横向 Recipe 不自动套给竖向。竖向完整尺寸与业务形状在第二批收口。

### 2.2 Tag 与 LinkTag

| 对象 | 接口与语义 |
| --- | --- |
| `Tag` | `children`、共有视觉参数、`disabled`、`onRemove(event)`、`removeLabel`；ref 指向静态 span。根不支持点击、选择或导航 |
| `LinkTag` | `children`、共有视觉参数、必填 `href`、原生链接属性、`disabled`、`onRemove(event)`、`removeLabel`；ref 指向主链接，禁用时为 null |
| 移除 | 有 `onRemove` 才渲染原生 button；默认可访问名称为“移除标签 {文字}”。复杂 children 需明确 `removeLabel`；组件只发出意图，不自行卸载、请求或撤销 |
| 禁用链接 | 显示静态内容，移除按钮禁用；不保留可导航 href，不只靠 `aria-disabled` 阻止导航 |

```tsx
<Tag color="paper" size={24} leadingIcon={<TagIcon />} onRemove={removeAssociation}>
  期末复习
</Tag>

<LinkTag color="courseware" href="/resources/42" onRemove={removeAssociation}>
  第三章课件
</LinkTag>
```

LinkTag 的主链接与关闭按钮是兄弟节点。主链接使用当前 [Link](../../packages/ui/src/link/link.tsx)，保留原生导航、修饰键、新窗口安全关系和提示。局部 Tag Recipe 覆盖 Link 的排版、颜色及间距；不改变全局 Link。原生链接属性与 `onClick` 传给主链接，`className` 用于外层布局。

复用 Tag 文件内的内容与关闭小部件；共有颜色 / 尺寸只保留一套 Recipe。无需公开多态 `as`、`asChild` 或万能 TagRoot API。

### 2.3 CheckableTag 与 CheckableTagGroup

```ts
// 下列为选择合同；实际类型同时保留合适的原生 input / fieldset 属性。
type CheckableTagSelection = {
  type?: "checkbox" | "radio"; // 默认 checkbox；radio 需要非空 name
  value: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
};
type TagOption = {
  value: string;
  label: string;
  color?: TagColor;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
};
type CheckableTagGroupSelection = {
  options: readonly TagOption[];
  legend: string;
  legendHidden?: boolean;
  name?: string;
  disabled?: boolean;
  clearable?: boolean; // 默认 false；独立清空动作
} & (
  | { mode?: "single"; value: string | null; onValueChange: (value: string | null) => void }
  | { mode: "multiple"; value: readonly string[]; onValueChange: (value: string[]) => void }
);
```

两者还接受 `size / appearance` 与对应 Local Recipe。单项接受 `color / leadingIcon`；组中每项的颜色来自 `options`，未指定为 neutral。选择接口只支持受控值，沿用 [OptionGroup](../../packages/ui/src/option-button/option-button.tsx) 的 `mode / options / value / onValueChange` 习惯；本批不再增加等价的 `defaultValue`、`selectedKeys` 或独立选择存储。

| 行为 | 实现合同 |
| --- | --- |
| 原生语义 | 单项以 label 包住原生 radio / checkbox；ref 指向 input。组用 fieldset / legend，单选提供 radiogroup 语义 |
| 校验 | value 与 option value 为非空稳定字符串；option value 唯一；受控值类型匹配 mode 且属于 options。空 options 合法，对应值为 null / [] |
| 单选 | 同一原生 name，方向键移动并选择且跳过禁用；再次操作已选项不清空；“全部”作为真实 option |
| 多选 | 各可用 input 保留 Tab 停靠；Space 切换；新增值追加，取消值从当前数组移除，不重排其他值 |
| Enter | 原生 checkbox / radio 不保证 Enter 切换；只补一个阻止默认提交并触发当前 input.click() 的 Enter 分支，忽略重复按键、禁用和输入法组合，不重写 Space / Arrow 行为 |
| 清空 | 独立 TextButton 通过同一 `onValueChange` 发出 null / []；值已空则禁用。操作后焦点移到组内首个可用 input；不扫描页面 |
| 配色 | neutral / brand 选中采用明确品牌选择色；20 组分类颜色保持身份，选中添加尾部勾。Filled 选中增加同 profile 边框，Outlined 不叠加边框 |
| 职责 | 选择控件不接受 `href / onRemove`，不在 label 内嵌另一按钮；只读展示由无动作 Tag 表达 |

这沿用现有原生 OptionGroup 模式及已验证预览路径，替代旧复用审计中“独立 aria-pressed button”的实现建议；保留其选中、禁用、焦点与组职责分离的实质。历史审计作为来源保留，在新 Manifest 记录本次差异，不把两种语义混在一个单项中。

## 3. Token 接入清单

### 3.1 单一事实源与公开身份

新增 `packages/foundations/src/tag-token-contract.ts`，集中保存完整尺寸记录、Tag 配色角色、来源及状态配对；既有 [Color Registry](../../packages/foundations/src/color-registry.ts) 登记对应 Category 身份，由原生成链输出。这个文件不导入 UI、生成 CSS 或旧 Vue 运行代码；应用安装后不依赖旧仓库路径。

20 组原始文字 / 浅底 / 边框 / 实底为 80 个基础角色、160 个主题值，原值引用 [设计稿附录](2026-09-08-tag-design.md#附录已确认分类色值)。加入同源 Icon 用途后形成 100 个核心 Category 身份；增加用途身份不代表复制或改动 RGB 来源。

| 源角色 | Category 身份规则 | 消费用途 |
| --- | --- | --- |
| 文字 | `Text/Tag{Profile}/1` | Filled / Outlined 文字 |
| 同色图标 | `Icon/Tag{Profile}/1` | 前图标、尾部勾、关闭图标；数值引用同 profile 文字事实，身份单独声明 |
| 原始边框 | `Border/Tag{Profile}/1` | Outlined、Filled 选中边界 |
| 原始浅底 | `Fill/Tag{Profile}/Alpha/1` | Filled 表面 |
| 原始实底 | `Fill/Tag{Profile}/Solid/1` | Solid 表面 |
| 分类 Solid 文字 / 图标 | 复用 `OnColor/1` | 已确认两主题纯白，显式声明表面 Recipe |

`{Profile}` 是固定映射，例如 classroom→TagClassroom、self-test→TagSelfTest、difficulty1→TagDifficulty1；不得依赖数组顺序编号或从中文标签名称生成身份。UI 示例类为 `text-rain-category-text-tagclassroom-1`；类名通过现有输出规则产生，组件保存静态 Recipe 引用，不运行时拼接。

旧 105 个 Category 的身份、Light / Dark 值和来源保持完整；原 42 个 Semantic 不被改名。现有精确配色审计显示，160 项基础值均不能由原公共颜色的近似值替代。已有白色等额外同值角色仍按用途复用。

| 额外来源 | 登记与边界 |
| --- | --- |
| 5 组系统状态 | 用 profile 映射 success→classroom、processing→live、warning→courseware、error→difficulty5、neutral→slate；不复制 RGB |
| 进行中 | 保留原 bg / text / dot / solid / solid-text 五角色；使用 `Fill/TagOngoing/Alpha/1`、`Text/TagOngoing/1`、`Icon/TagOngoing/1`、`Fill/TagOngoing/Solid/1`、`OnColor/TagOngoing/1`。90% 白字不能偷换为 Light 85% 的 `OnColor/2` |
| 未提交 | 原 bg / text 用 `Fill/TagUnsubmitted/Alpha/1`、`Text/TagUnsubmitted/1`；新增 `Fill/TagUnsubmitted/Solid/1` 为用户确认的两主题 #f78600，白字复用 `OnColor/1` |
| 已结束 | bg / solid 用 `Fill/TagEnded/1,2`，text / solid-text 用 `Text/TagEnded/1,2`，保留 Light / Dark 各自原值；Dark 的“Solid 外观”本身是 24% Alpha，不把外观名当成不透明事实 |
| 批量 / 提醒 | `Fill/TagBatch/Solid/1` 保留 #728ccb；`Icon/TagReminder/1` 保留 #f34848；白环需要 Border 用途身份 `Border/TagReminder/1`，不能拿 OnColor 充当 border |
| 关闭反馈 | 从相应前景事实派生具名 Fill Recipe：12% Hover / 18% Pressed；Solid 使用白色来源。明确 Fill 用途，不将 Text / Icon Token 直接标成 background-color，不重复录入 RGB |

这些额外值第一批完成登记与来源检查；尚无第二批组件消费者的记录标注为等待该批接入，不伪造已经使用或通过场景验收。

### 3.2 可复用的完整几何与新增范围

| 内容 | 接入方式 |
| --- | --- |
| 20 / 24 / 28 高度 | 新增 Tag 专用高度事实和 `h-rain-tag-20 / 24 / 28`，按现有 Input 输出模式进入生成链 |
| 字号 / 行高 | 复用 12/14、13/18；同时切换 UI 字体、字号、行高、字距和字重 |
| 内距 / 间距 / 圆角 / 线 | 复用 Space 6/8/12、间距 4、Radius 4/6、Line 1；关闭区前无额外 gap，未选勾不存在 |
| 图标与关闭区 | 图标复用本档 Icon Size 12/14/14；关闭区用原生 stretch + aspect-square 取根内高，Line/1 下为 18/22/26。删除固定 Tag action Token，不把 Icon Size 当点击区或引用 Input Clear 的组件语义 |
| Solid 700 | 复用既有数值；在 Typography 校验增加精确 `tag-solid` 的 label / UI 用途上下文，只允许 Tag 三档已登记组合。普通 UI / Reading 仍为 400/600，Data 仍单独校验 |
| Focus | 沿用当前全局 1px 重色边界 + 3px 浅色环；必要桥接只将原生隐藏 input 的焦点绘到当前标签外壳，不修改 Focus 本体 |

来源预设可保存 24 / 60 / 64 / 66 / 68% 等原始 Alpha，但不扩充 `colorAlphaValues` 的任意组合白名单。Registry 为这组具备明确来源的事实提供限定登记入口；未知颜色、无效 RGB / Alpha、缺少主题仍报错。

分类新 Fill 家族保留 Solid 的 OnColor 规则、浅底的同 family / Neutral 规则。TagEnded 的两种表面没有通用 Solid 1/2 强填充编号，用明确 Recipe 配对自身文字；不为这一特例放松其他颜色族。

### 3.3 中性色、选择色与组合测量

| 对象 | 明确配对与状态 |
| --- | --- |
| Neutral Filled | `Text/Neutral/3` + `Fill/Neutral/Alpha/6`；已在预览显示 |
| Neutral Outlined / Solid | 对照候选分别使用 `Border/Neutral/3` + 透明底，以及 `Text/Neutral/1` + `Fill/Neutral/Solid/2`；保留待真实页面补审状态，不称为已确认旧配色 |
| 普通选中 Filled | `Text/Brand/1` + `Fill/Brand/Alpha/4` + `Border/Brand/3`；Brand intent 明确为 selected |
| Brand 兼容入口 / 其他选中外观 | Outlined 使用同套品牌文字与边界；Solid 使用 `Fill/Brand/Solid/1` + `OnColor/1`。标记为未展示组合；不得用 brand 代替分类蓝色 live / assignment |
| Hover / Pressed | 分类实底来源以 12% / 18% multiply 叠加，复现当前已展示 Filled 状态。其他外观在同页补审；静态 Tag 不加伪交互反馈 |
| Disabled | 复现预览 0.3 整体透明度，原生动作禁用。按真实 group opacity 合成记录，不冒充 leaf opacity |

现有 `resolveColorSurface` 只覆盖一层 Alpha 表面，不能直接证明 multiply 或整体透明度后的绘制。实施时增加局限于上述 Tag 状态的测量与浏览器证据，明确父表面及层序；不把原有函数扩建成通用绘制引擎。

文字仍按实际 12/13px 文本检查，700 不属于 large-text。关闭和选中勾按 meaningful-icon 检查；纯装饰前图标可按 decorative，但不能因此降级真实文字、关闭图标或必需边界。不足项记录精确主题、表面、profile、外观、状态及数值，保持 `acceptedException: false`，不自动改色或转为通过。

## 4. 长名称与集合边界

保留完整原始文本，不在组件中截断字符串；宽度约束由外层布局提供，文本部分单行省略，图标和操作区不被压缩。第一批真实样例同时提供可用键盘和触屏打开的“查看完整名称”详情入口；普通静态 Tag 不因省略获得按钮语义，也不引入专用 Tooltip 依赖。链接的新窗口提示保留在其完整可访问名称 / 描述中。

移除后的相邻焦点、空集合返回添加入口、异步回滚和撤销由集合使用方负责。第一批演示页覆盖这些路径，单个 Tag 不寻找全页兄弟元素，不新建公共 Tag 集合控制器。

桌面操作区随所选尺寸：关闭反馈为标签内高的正方形，Link 主操作可视部分填满同一内高，选择操作取整个标签。关闭 Hover/Pressed 背景保持在 1px 边框内；共享 Focus 可以在目标外绘制。Space/6 的一半（3px）作为透明点击余量与对应留白，使桌面关闭点击区为 24/28/32，关闭左侧真实点击边界仍直接衔接文字或主链接且不重叠。触屏纵向扩大为 Space/14 及相同行距，所有三档动作至少 24px 宽、44px 高且互不覆盖。需要真实浏览器验证，不能只读 CSS 声明下结论。

## 5. 按顺序执行

以下为获得实施范围后执行的任务。任务内先加能捕捉真实回归的最小检查，再实现并跑该项；共用现有测试工具，不为每个色值、每个一行样式建立独立测试文件。Git 操作继续服从当前授权，不随本计划自动执行。

### Task 1：登记来源与完成 Token 链路

**新增：** `packages/foundations/src/tag-token-contract.ts`、`packages/foundations/src/tag-token-contract.test.ts`、`evidence/runtime/tag-batch-one/source-colors.json`。

**修改：** `packages/foundations/src/color-registry.ts`、`packages/foundations/src/color-registry.test.ts`、`packages/foundations/src/typography-contract.ts`、`packages/foundations/src/typography-contract.test.ts`、`packages/foundations/src/index.ts`；`scripts/token-foundation-outputs.mjs`、`scripts/generate-token-foundations.mjs`。

1. 从旧 Vue 只读来源冻结颜色证据，记录源文件、摘要、两主题角色、别名和新增未提交 Solid 的不同决定来源；以后测试读取工作区证据，不依赖用户机器上的旧仓库。
2. 写一个参数化一致性检查，核对 20 × 4 × 2 原值、全部 profile 身份和生成结果；加缺主题、跨角色、未声明 Alpha、普通 UI700 被拒绝的检查。
3. 登记第 3 节事实与 Tag 组合；复用原有 Registry / 生成工具。保留原 105 色快照断言，只把比较对象限定到其原 ID 集合，不改旧 Dark 输入或删除冻结断言。
4. 将 Tag 高度、操作区、颜色与来源路径纳入生成合同；静态来源指令包含新增类，独立应用消费不依赖 Playground 扫描。
5. 运行 `pnpm exec vitest run packages/foundations/src/tag-token-contract.test.ts packages/foundations/src/color-registry.test.ts packages/foundations/src/typography-contract.test.ts`，再运行 `pnpm generate:tokens` 和 `node scripts/generate-token-foundations.mjs --check`；要求专项测试通过、生成后再次检查无漂移。

生成输出仍是原链的六个文件：`packages/foundations/src/tokens.css`、`packages/foundations/src/typography.css`、`packages/foundations/src/tailwind-theme.css`，`apps/playground/src/docs/token-foundations/token-foundations.css`、`apps/playground/src/docs/token-foundations/token-classes.generated.ts`，`manifests/contracts/token-foundations-v1.json`。手工只改来源，不编辑生成区。

### Task 2：Tag 外壳、完整尺寸与关闭

**新增：** `packages/ui/src/tag/tag.styles.ts`。

**修改：** `packages/ui/src/tag/tag.tsx`、`packages/ui/src/tag/tag-badge.test.tsx`、`packages/ui/src/styles.css`、`packages/ui/src/index.ts`。

1. 在既有 Tag 测试中增加新默认尺寸、显式尺寸优先、三外观、图标、关闭与禁用回归；保留 Badge 全部断言。
2. 建立静态 Recipe 与可复用内容 / 关闭部件，改为正式 CloseIcon，默认可访问名称和 `onRemove` 事件路径保持有效。替换旧“移除”文字的视觉断言，保留语义断言。
3. 同步根 / label / leading-icon / remove-action Parts 与 tracking 属性；`data-tone` 在旧 tone 用法中保持有效，新增 `data-color` 表达完整配色。
4. 删除被新横向 Recipe 接管的旧 Tag 数值和样式，保留明确的竖向兼容规则；不留下两份同时生效的横向主样式。
5. 运行 `pnpm exec vitest run packages/ui/src/tag/tag-badge.test.tsx`，要求 Tag 与 Badge 同时通过。

关键行为检查应类似：

```tsx
const remove = vi.fn();
const user = userEvent.setup();
render(<Tag color="paper" onRemove={remove}>期末复习</Tag>);
await user.click(screen.getByText("期末复习"));
expect(remove).not.toHaveBeenCalled();
await user.click(screen.getByRole("button", { name: "移除标签 期末复习" }));
expect(remove).toHaveBeenCalledTimes(1);
```

### Task 3：LinkTag 与原生选择组

**新增：** `packages/ui/src/tag/link-tag.tsx`、`packages/ui/src/tag/checkable-tag.tsx`、`packages/ui/src/tag/tag-interactions.test.tsx`。CheckableTag 与 Group 放在同一文件。

**修改：** `packages/ui/src/tag/tag.styles.ts`、`packages/ui/src/styles.css`、`packages/ui/src/index.ts`。

1. 测试链接 / 关闭动作分离、禁用链接、新窗口 rel 与提示，再用现有 Link 组合实现。
2. 测试单选互斥、再次选择不清空、多选变更、清空回焦、无效与空 options、原生 form 提交值，随后实现第 2.3 节原生控件。
3. 复用 OptionGroup 的受控值和 fieldset / name 约定；不直接套用其试题视觉，也不为两组组件提前抽取选择引擎。
4. 选中勾条件渲染于 label 后，未选没有占位节点；input 保持可聚焦，focus-visible 只映射到当前可视目标。
5. 运行 `pnpm exec vitest run packages/ui/src/tag/tag-interactions.test.tsx packages/ui/src/tag/tag-badge.test.tsx`；原生方向键行为另外在真实浏览器检验。

### Task 4：真实展示页与未展示组合

**新增：** `apps/playground/src/docs/components/tag-page.tsx`、`apps/playground/src/docs/components/tag-page.test.tsx`、`tests/e2e/tag.spec.ts`、`evidence/runtime/tag-batch-one/verification.md`。

**修改：** `apps/playground/src/app.tsx`、`apps/playground/src/docs/components/core-ui-page.tsx`、`apps/playground/src/docs/components/core-ui-page.test.tsx`、`apps/playground/src/docs/token-foundations/color-panel.tsx`。

1. 增加 `#tag` 路由，复用现有演示页布局；展示全 20 色、三档三外观、Link + Close、单 / 多选和完整名称入口。原 Core UI 保留有效 Tag 示例并链接新页。
2. 在颜色总览中加入新 Text / Icon 成对入口和来源说明；旧 105 色继续可查，新增分类不能被误写为原 Excel 输入。
3. 运行 `pnpm exec vitest run apps/playground/src/docs/components/tag-page.test.tsx apps/playground/src/docs/components/core-ui-page.test.tsx` 与 `pnpm exec playwright test tests/e2e/tag.spec.ts tests/e2e/core-ui.spec.ts`，检查下表，不能用 JSDOM 代替尺寸与绘制证据。
4. 在 `evidence/runtime/tag-batch-one/verification.md` 记录实测、截图和待复审差异；真实页面补审 Neutral / Brand 其他外观、长名称、原生外链和组合状态。

| 实测维度 | 必须保持的结果 |
| --- | --- |
| Light / Dark / 嵌套 Light | profile 原值、字体与组合层主题正确；在 Background/Neutral/1、/2、/3 分别测量 Alpha |
| 三档与长文本 | 20/24/28 外观、12/14 与 13/18 排版；文字省略不挤掉勾和关闭；Solid700，其他400 |
| 用户修订 | 未选占位为零；选中勾在文本后；文字到关闭区额外间距零；关闭、链接、选择热区跟随三档尺寸，关闭反馈不溢出根边框 |
| 导航与移除 | 修饰键 / 新窗口保持原生；× 不导航；删除下一项 / 前一项 / 空集合焦点路径有效 |
| 原生选择 | 单选方向键跳过禁用；多选 Tab / Space / Enter；clear 回焦；事件无重复，输入值可提交 |
| Focus / Forced Colors | Focus 不被容器裁掉、不被0.3禁用样式错误淡化；系统强制色中边界、勾与操作仍可识别 |
| 360px / 桌面 / 触屏 | 页面无水平溢出；控件之间的目标不覆盖；文本与详情在键盘和触屏均可访问 |

### Task 5：登记消费、质量门与独立状态

**新增：** `manifests/ui/tag.yaml`、`manifests/ui/link-tag.yaml`、`manifests/ui/checkable-tag.yaml`、`manifests/ui/checkable-tag-group.yaml`、`registry/tag.json`、`scripts/tag-governance.test.ts`。

**修改：** `status/current-phase.yaml`、`manifests/contracts/tailwind-b2.yaml`、`scripts/verification-helpers.mjs`、`scripts/verify-token-foundations.mjs`、`scripts/verify-tailwind-b2.mjs`、`scripts/verify-boundaries.mjs`、`scripts/token-foundation-outputs.mjs`、`docs/ai/token-selection.md`；按受影响断言更新 `scripts/verification-helpers.test.ts`、`scripts/verify-token-foundations.test.ts`、`scripts/verify-tailwind-b2.test.ts`。

此项的授权与消费登记随 Task 1–4 对应实现同步，最终在本项集中收口；不能先写完代码再用全文件豁免放过检查。

1. 只登记 Tag 的实际文件、Recipe 符号、Parts、主题与状态。现有校验对静态颜色 Recipe 有精确授权检查，需要 Tag 自己的分支，不能借用 Input / OptionButton 授权。
2. 新增 Registry 采用现有本地格式，四项共用实际依赖，publication 保持未发布；分别记录实施、自动验证、独立审阅、Human Gate。
3. 对比度不足只在已登记的 Tag 具体消费中进入待审查表；跨角色、错误主题、未登记绘制和伪造用途继续失败。专项测试包含越界失败例；现有其他组件例外保持原边界。
4. 仅为确有需要的 focus 映射、状态混合绘制、整体 disabled、forced-colors 和目标布局登记精确 CSS 例外；能用现有受控类表达的内容不加例外。
5. 运行 `pnpm verify` 一次完成项目要求的质量门；若失败，按真实失败修正后重跑受影响检查，修正跨共享链路时再运行完整检查。
6. 完成独立技术审阅后，再提交真实组件视觉验收。视觉预览确认、真实组件 Human Gate、对比度例外接受、发布 / 迁移分别记录，不相互推导。

## 6. 本轮交付状态

已实现：公共 Token 事实与生成、四个 React 组件、三档三外观、完整旧配色、独立关闭、原生链接和选择组、演示页、颜色消费登记及精确授权检查。专项和完整检查的最新结果见[验证记录](../../evidence/runtime/tag-batch-one/verification.md)，技术审阅见[独立审阅](../../evidence/runtime/tag-batch-one/independent-review.md)。

`#tag` 可检查真实实现；LinkTag 的主动作字体、颜色继承根 Recipe，根与主动作内距由 size 管理。禁用链接保留可访问名称与说明且移除导航入口。集合移除回焦只在焦点仍属于该流程时执行，不抢回等待期间移到外部的焦点。

2026-09-09 用户细调：选中勾为 10/12/12px，独立 apply 已有 Alpha/90；关闭和前图标仍为 12/14/14。依据及作用范围见[设计决定第 11 节](2026-09-08-tag-design.md#11-选中勾尺寸与-alpha-修正2026-09-09)。

2026-09-09 用户回复“没问题。完成本轮视觉校验。推进下一步”，第一批真实组件视觉Human Gate已记录accepted。原配色对比度不足仍单独保留，contrastAcceptance为not-granted，因此阶段的in-progress / findings继续追踪这项未处理状态；视觉验收与对比度例外没有合并。

下一步进入第二批完整形状与业务语义的方案审阅，见[家族设计第13节](2026-09-08-tag-design.md#13-第二批完整形状与业务语义方案2026-09-09)。第二批公共组件、第三批TagSelect / 创建、发布、迁移和Git操作尚未执行。
