# E12 · 实验室设备预约管理

- 日期：2026-09-23；身份 `local-experiment`；组合 ID `e12-lab-s05-s08`。
- 模式：Prototype Mode。范围只有 `rebuild/lab.tsx`、`lab.css`、`lab.test.tsx` 和本记录。
- 目标：让使用者在明确实验室范围内查找设备、查看使用要求、确认或取消一个模拟时段的预约；全局入口与当前范围分开。
- 工作树：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`；分支 `codex/card-v2`；基线 HEAD `321e1a0`，存在大量先前未提交修改，本任务未覆盖或清理。
- 实现：`LabWorkbench({ instance?: string })`，默认实例 A；主任务负责挂接 `scene=lab` 和 A/B 外层控制。设计状态 `pending-review`；不晋升公共资产。

## 检索与选型

先核对根 AGENTS、SPIKE_BRIEF、当前 G3 授权、Evidence/Benchmark 索引、原型设计入口和信息设计方法索引。工作包采用 v0.3 执行层；v0.2 的 proposed/unverified 保留，不解释为禁止本地候选建设。

只读取两张命中的样式卡及其研究图：

| 选型 | 读取依据 | 保持关系 | 本页变化 |
| --- | --- | --- | --- |
| S05 | `references/v0.2/recipes/S05.md`、`S05.json`、`assets/S05-annotated.png` | 全局窄轨与当前范围栏分工；主内容保留有效宽度 | 全局为设备预约、我的预约、使用指南；范围是实验室；主区由设备清单和预订详情组成 |
| S08 | `references/v0.2/recipes/S08.md`、`assets/S08-annotated.png` | 明确范围身份、辅助信息与切换入口，抬头弱于主标题 | 抬头替换为实验室名称、位置和切换；底部放开放时间与管理员 |

没有读取或复制完整课程页面源码，没有课程/班级字段。选择 S05 的原因是设备比较与详情判断需要同时保留列表；S08 提供范围身份。未把每层业务关系塞入递归侧栏。原图只提供组成关系，没有提取颜色、尺寸、Logo 或复制图谱 CSS。

采用 D01「查找与管理资料」：范围 → 搜索/扫描 → 查看 → 预约；D02「关系组织空间」：列表和详情共享主任务表面，只用分隔线区分，使用要求靠近预约按钮。检查方式为角色/交互单测、Token 引用校验，以及主任务的真实浏览器整页复核。

## 真实依赖和扩展点

| 依赖 | 当前版本/源码 | 使用方式 |
| --- | --- | --- |
| React | 工程声明 `^19.2.8` | `useState` 持有每实例范围、筛选、选中设备、预约和浮层状态；`useId` 隔离字段 ID |
| `NavRow`, `NavEntry` | 同目录 `parts.tsx`；本地候选，非公共发布 | `entry/current/mode/surface`；沿用共享导航行，未复制核心导航 |
| `@rain-next/ui` | 工作区 `0.0.0` | `Sidebar`、`SidebarHeader/Content/Footer`、`Input`、`Button`、`Popover` |
| `@rain-next/layouts` | 工作区 `0.0.0`；`packages/layouts/src/layout.tsx` | `Inline gap`、`Stack gap` 承担布局关系 |
| Popover 行为底座 | 已有 `@base-ui/react@1.8.0`；`packages/ui/src/popover/popover.tsx` | 受控 open、Trigger、Title、Content width；Base UI 拥有定位、Escape 与焦点恢复 |
| Popup 视觉桥 | 已有 `packages/ui/src/_internal/popup.tsx` | 最近 `data-rain-theme` 与 `data-density` 穿过 Portal，子控件沿用其既有 compact 合同 |
| 图标 | 已核对 catalog `availability: available` | 单入口导入 home、instruction-task、help、chevron-down，宿主供色 |

`NavigationRail` 默认文案有“教学空间”，因此选用它已有的 Sidebar Parts 与 `NavRow` 重新组合身份，而不是修改公共 API 或制造教学业务兼容参数。Button / Input 使用现有 36px 配方。Popover 浮层只追加 `.nr-lab-popup` 作用域，不覆盖公共样式。

## Token、局改与隔离

- 颜色沿用 Category Background/Neutral/1/2、Text/Neutral/1/3、Text/Brand/1、Fill/Brand/Alpha/4、Border/Neutral/3；文字和空间沿用已存在 Rain Token。
- 所有 `.nr-lab` / `.nr-lab-popup` 中引用的 `--rain-*` 变量均在现有 Foundation CSS 中找到定义；缺失引用为 0。
- 仅页面结构几何为局部：80px 窄轨、224px 范围栏、288px 详情，1100px/700px 容器断点。不是新增 Foundation 或全局默认。
- 外层宿主可分别切换 A/B 的 theme 和 density；页面不覆写宿主主题。全局窄轨自身使用既有 dark 面层；范围切换浮层从自己触发器继承 theme/density。
- 全局与范围链接用实例命名的 hash 参数：A 的 `labAView/labAScope/labAFilter` 与 B 的对应参数。初始化读取、`hashchange` 同步，刷新与历史恢复页面、范围和筛选；所有未知值回退至有效默认。链接写入保留外层 `rebuild/view` 和另一个实例的参数，也保留修饰键行为。
- 模拟两个实验室、六台设备，包含维护中设备。固定演示时段为 9 月 24 日 14:00–16:00；预约只保存在本实例内。没有服务端、权限、冲突排程或保存引擎。

## 可运行检查

命令：`pnpm exec vitest run apps/prototype/src/scenarios/token-first-g3/rebuild/lab.test.tsx`

1. 红：先导出空组件并运行测试，2026-09-23 14:09:48，3 条断言均因缺少命名工作台 region 失败（exit 1），不是编译/导入错误。
2. 绿：完成最小组合；首次运行暴露 Popover.Title 优先于 aria-label 的实际命名，修正真实标题后于 14:13:16 通过 3/3（exit 0）。
3. 路由增补红→绿：14:16:47 新增带 A/B hash 的初始化/重挂载测试，原实现不能读取 `我的预约`，预期失败；实现命名参数读取、真实 hash 导航和同步后 14:17:45 全部 4/4 通过。
4. 检查范围：搜索结果、选择设备、预约/取消；A 切换实验室与导航不改变 B；A dark/compact 与 B light/default 的 Popup 分别继承；Escape 关闭与焦点返回；无课程/班级字段；带命名参数初始化、修改后重挂载、外层和 B 参数保留、hash 历史模拟及未知值回退。
5. `pnpm exec tsc --noEmit --project apps/prototype/tsconfig.json`：exit 0。
6. 静态 Token 引用检查：缺失变量 `[]`。
7. 真实浏览器几何修复：主任务首张 1440×900 截图发现 Sidebar 默认宽度 256px 侵入本地 224px 网格。复现得到 `context.right=336/main.left=304/overlap=32`。仅在 `.nr-lab .nr-lab-context` 加 `width:100%` 使容器服从网格；1200×800、1440×900、1920×1080、1200×650 均实测 `context.width=224/context.right=304/main.left=304/overlap=0`，运行 `assert(main.left >= context.right)` 通过。使用既有 4174 服务，没有停止或另启服务。

浏览器截图与 A/B 真实视觉由主任务保存；本记录中的几何测量仅证明上述四个视口无范围栏侵入，不把单测或几何断言推断为视觉接受。无完整对比度或辅助技术审核；Human Gate 仍 `pending-review`。

源码 SHA-256（本次验证时）：

- `lab.tsx`: `5e7175ae4ff7310d41c20d2ad3bd78b185abacd9dbc623b78021d46336c2c6ce`
- `lab.css`: `1e1e9a32ecb332900dd91a37314abf5177dc9209eeb06afbad9305fc533ee2a9`
- `lab.test.tsx`: `4fe4fe4e889d9ee069af615a8483e60ade9c254055f1c6423d546160bb673bb9`
- 消费的 `parts.tsx`: `7475e6f2b9f928739821070a8be1ed19d977abfa3738533a58a972d8dd6c824d`
- `pnpm-lock.yaml`: `e905860d944717713398d0090c3f5f76d7fe93ef58c623b9b36f22486ffa3b2d`

公共 API、公共 Token、依赖、Registry、发布、业务迁移、Figma、Git 提交均未修改/执行。
