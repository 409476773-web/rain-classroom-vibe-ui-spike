# Avatar 家族建设方案与实施计划

> 2026-09-16 用户明确授权“开始实施建设”，按 executing-plans 执行下列已确认范围。本文保留设计依据，实施结果见文末检查点。

**Goal:** 基于 Rain Classic 的人物资产、视觉与功能，建设 Rain Next 的单头像、两种头像组、状态装饰及头像图库。

**Architecture:** 人物资源、头像显示、成员集合和状态装饰分别承担各自职责。复用当前 Rain Token、Focus、正式图标与 Popover；调用页面拥有成员数据、人员状态、操作和长期素材分配。

**Tech Stack:** React、TypeScript、Tailwind CSS、Rain Foundations、现有 Base UI 1.8.0 与本地源码 Registry；本计划不引入新依赖。

日期：2026-09-16。工作区：`.worktrees/card-v2`。工作模式：System Mode；本家族的独立授权登记在 current-phase.yaml 的 avatarFamily。

## 1. 已确认范围与当前状态

下列确认均来自本任务连续讨论，按各次问题的实际范围记录：

| 决策 | 用户确认 | 本次锁定内容 |
| --- | --- | --- |
| 头像内容 | “新版继续只支持‘人物图片＋雨课堂默认图’” | 不提供姓名文字、首字母或图标头像；状态图标属于外部装饰 |
| 在线状态 | 对三种在线信息规则回复“确定。” | 未提供信息不表达在线；明确在线保留原图且不加绿点；明确离线灰度且不禁用操作 |
| 两种头像组 | 对横向组与九宫格基线回复“确定” | 三档横向组、More 槽位计数、固定 40px 九宫格、单独的整组/More 入口、组成员无状态装饰 |
| 状态装饰与图库 | 对最后一轮范围回复“确定。” | 最多两个边缘状态、Activity 优先、非交互装饰、克制动效；51 张素材的浏览与引用 |

这些是设计规则确认。后续实施已获得明确授权，组件实现、定向自动验证与独立实现审阅已完成；当前运行视觉 Human Gate 已于 2026-09-16 确认；对比度验收仍待确认。没有发布、业务迁移、Figma 写入或 Git 提交。

现有 [Roadmap](2026-09-12-rain-next-v2-roadmap.json) 将 Avatar 放在 RN-16 后续扩面候选。原路线图快照保持不变；本次只新增头像家族的精确范围和证据，不改写其他任务的状态。

## 2. 来源与采用方式

### Rain Classic 的直接参考

旧库根目录：`/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0`。

| 来源 | 用途 |
| --- | --- |
| [Avatar.design.md](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Avatar.design.md) | 头像定义、三档尺寸、两种组、图片回退与组合边界 |
| [Avatar 实现](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/Avatar.vue)、[Group](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/AvatarGroup.vue)、[Grid](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/AvatarGrid.vue) | 实际图片生命周期、交叠、人数截断与 1–9 排布 |
| [StatusIndicator.design.md](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/StatusIndicator.design.md) | 状态标记、边缘组、活动覆盖与优先级 |
| [头像资源索引](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar-assets.js)、[导出来源清单](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/artifacts/avatar-runtime-export-2026-07-30/export-report.json) | 默认/学生/教师资源、稳定编号、来源与哈希 |
| [现有复用审核](../../evidence/rain-classic/reuse-matrix.yaml) | Avatar / AvatarGroup / AvatarGrid 的 rewrite-from-rain 结论和历史缺口 |

本任务已读取上述本地材料并查看旧 Vue 实际演示。Figma 来源来自已有导出记录，本轮没有重新核验实时 Figma；旧库的 Gate 不构成新版运行验收。

### 成熟组件库参考

以下官方文档已在本任务调研阶段查阅；采用能力与组织方式，最终视觉由 Rain Token 决定。

| 官方来源 | 借鉴部分 | 本版处理 |
| --- | --- | --- |
| [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) | Image / Fallback 与加载状态分层 | 作为图片生命周期参考，不新增 Radix 依赖 |
| [Ant Design Avatar](https://ant.design/components/avatar/) | 尺寸、头像组上限、剩余成员面板 | 保留 Rain 的 More 和计数规则，不引入文字/图标头像 |
| [MUI Avatar](https://mui.com/material-ui/react-avatar/) | 回退顺序、成员总数与溢出区分 | 首版只根据完整传入集合计算；没有服务端 total 时不虚构人数 |
| [Chakra Avatar](https://chakra-ui.com/docs/components/avatar) | 状态、菜单、身份信息的外部组合 | 采用职责边界，不接入其状态或样式系统 |
| [shadcn Avatar](https://ui.shadcn.com/docs/components/base/avatar) | Badge / Group / GroupCount 部件组织 | 参考组合方式，保留 Rain 人物资源、More 和九宫格 |

## 3. 单头像与图片规则

- 头像只显示人物图片或正式默认图。教师/学生角色与素材编号由调用方选择，不增加 Avatar 内部的随机分配逻辑。
- 先显示正式默认图，业务图成功加载并解码后替换。地址为空、请求失败、解码失败、最终显示图片报错都回退；不出现破图、空白或无限重试。
- 新地址替换旧地址时使旧请求失效；旧成功/失败结果都不能覆盖当前人员的图片。
- 图片等比铺满、居中裁切；上传、裁剪与主体位置调整不进入首版。
- `presence` 概念上分为“未声明 / 在线 / 离线”。未声明与在线可以外观相同，但不能对辅助技术谎报在线；离线不自动产生 disabled。
- 展示用途不增加 Tab 停靠点。动作使用 button，页面跳转使用 link；避免为每个头像强行套一个按钮。图片身份名称与动作名称分开，邻近已有姓名时避免重复朗读。

拟沿用的视觉基线：单头像 24 / 32 / 40，默认 32；默认圆形，允许圆角方形。旧版方形圆角 4 / 6 / 6、Hover 淡化等细节只是映射参考，最终配方仍须结合新 Token 和实际样例审阅，不扩大为已逐项确认的数值。

## 4. 两种头像组：已确认基线

| 项目 | AvatarGroup 横向组 | AvatarGrid 九宫格 |
| --- | --- | --- |
| 用途 | 展示参与成员并查看其余成员 | 紧凑表达一个群组 |
| 尺寸 | 24 / 32 / 40 | 固定 40×40 |
| 布局 | 圆形交叠；旧版交叠 10 / 12 / 16 作为对应比例参考 | 保留 Empty 和 1–9 人的专用排布 |
| 数量 | 上限包含 More；未超上限显示全部，超上限显示上限减一人＋More | 只显示前 9 人；没有 More |
| 入口 | 整组动作可选，More 是独立入口 | 整个方块最多一个入口 |
| 内部成员 | 不逐个点击，不叠加在线/设备/活动状态 | 不逐个点击，不叠加成员状态 |
| 空态 | 不伪造成员或 More，场景说明由宿主提供 | 短文案；沿用“暂无”并允许“未选择”等明确内容 |

横向组例：上限 9 时，0–9 人无 More，10 人显示 8 人＋More，剩余面板显示 2 人。More 使用正式 `more-horizontal` 图标，不用 `+N` 或文字省略号替代；可访问名称包含真实剩余人数。

More 面板复用公共 Popover，提供可读姓名；成员内容可组合头像、角色、说明与明确动作。整组动作与 More 是同级交互区域，禁止 button 嵌套。支持鼠标和键盘打开、Escape 关闭与焦点返回；Tab 顺序遵守所复用浮层的合同。

默认 size/max、显式响应式配置与 Hover/Focus 是否自动打开面板尚属实现方案项。优先沿用旧版 32 / max=9 和显式配置，不添加按容器自动猜测人数的第二套逻辑；触发细节先验证现有 Popover，不为兼容历史外观复制浮层控制器。

## 5. 状态装饰：已确认基线

| 部件 | 责任与规则 |
| --- | --- |
| StatusIndicator | 正式图标＋语义底色；必须有明确状态含义，不能使用泛化的“状态”充数 |
| StatusIndicatorGroup | 最多两个；下左/下中/下右，部分露出头像边缘，不撑高布局 |
| ActivityOverlay | 表达持续活动；覆盖层跟随宿主形状，居中图标与可选活动环 |

- Activity 出现时隐藏边缘状态组，结束后恢复；不要清空业务状态。正常人物图像仍是底层内容。
- 装饰不增加独立点击、焦点或设备控制；宿主提供操作与必要的状态公告。保证最终可访问内容可读且不重复。
- 首版状态组合用于单头像。组件责任保持通用，但不为未来视频、媒体或任意宿主扩大首版验证范围。
- 图标旋转与活动环脉冲最多选择一种；减少动态效果时静止。活动环表达业务活动，不能代替键盘 Focus。
- 状态值来自调用页面，装饰不请求在线信息、不管理麦克风/摄像头权限，也不自行推断优先显示哪个设备。
- 状态标记尺寸、露出量、蒙层强度与活动环色值须映射现有 Token 后看样例；这些视觉数值没有在本轮单独确认。

## 6. 图库：已确认基线

- 保留默认 1 张、学生 25 张、教师 25 张，共 51 张，分别提供分类、完整预览、稳定编号及可复制的引用方式。
- 图库是资源目录和文档展示，首版不包含用户选图、上传、裁剪或账号保存流程。未来选图可组合现有单选能力。
- 优先使用业务传入的真实图片；需要教师/学生预置素材时由调用方先选定再传入。组件加载失败统一回到正式默认图，不在失败时随机换角色素材。
- 按完整成员集合分配，再进行展示过滤或截断。相同集合重复渲染/改变顺序不换图；长期固定身份由业务保存分配结果。
- 旧工具在每个角色池 25 人内优先去重；成员增删导致碰撞时可能改变分配，不把它描述为跨任意集合永久稳定。
- 保留每张图的来源、编号、格式、尺寸和校验值。当前 PNG 文件为 240×240，但历史导出记录为 160×160 后重采样；不声称原生高清，不以此直接批准大尺寸头像。

## 7. 工程接入建议与取舍

推荐“完整承接已确认范围，分三批交付”；文字头像、选图器、上传裁剪和任意媒体系统没有首版需求，留在后续独立场景。

### 复用当前系统

1. 视觉使用 [Token 选择规则](../ai/token-selection.md)与现有受约束 Tailwind；不复制 Vue SCSS、shadcn 默认外观或手工改生成 CSS。
2. 键盘 Focus 使用 [当前全局合同](../../status/current-phase.yaml)及 [focus.css](../../packages/foundations/src/focus.css)：现行 1px 品牌描边、0 offset 与 3px 品牌透明光环。旧 Vue 的无外环规则和 reuse-matrix 的旧 Focus 数值不覆盖当前已确认规则。
3. 图标使用 [正式图标选择入口](../ai/icon-selection.md)。人物 PNG 是独立图片资产，不与 `live-avatar-*` 图标混淆。
4. [Popover](../../packages/ui/src/popover/popover.tsx)已承担 Portal、定位、关闭和主题桥接；不因为历史审核曾写“底座未选择”就再做一轮底座建设。确有挂载缺口时先证明场景需要，再补最小接口。
5. [现有 Badge](../../manifests/ui/badge.yaml)仍是 local-experiment，不能直接当作已验收的头像状态依赖，也不借本次升级整套 Badge。

### 图片行为只保留一套

本机已装 Base UI Avatar Root/Image/Fallback，但既有源码未显式执行 decode，最终图片错误处理也有分支条件。原生 img 的最小可靠实现与补齐 Base UI 合同是两个候选，实施时用同一组失败/竞态用例比较，选择总实现更小且完整满足合同的一种。不要为了使用某个库，同时保留两套预加载与状态机。

## 8. 分批交付计划

以下路径均为相对本工作树根目录的拟定写入范围，尚未创建。实现前复核现场，优先合并小文件与复用现有模式；不得先建空壳 Manifest 或无实现的公共导出。

### 第一批：正式素材、单头像与图库

拟新增：`packages/ui/src/avatar/avatar.tsx`、`avatar.css`、`avatar.test.tsx`、`avatar-assets.ts`、`assets/*.png`；`apps/playground/src/docs/components/avatar-page.tsx`；`evidence/runtime/avatar/source-assets.json`。

步骤：

1. 记录旧库 51 张资源与哈希，按已获实施范围接入新目录，旧库保持只读。
2. 用最小定向用例固定空图/请求失败/解码失败/快速切图、身份与动作命名行为，再实现单头像。
3. 复用已有 Token 配方；缺口按 B2 规则登记功能根节点内的 `--rain-local-avatar-*` 候选，不自动进入 Foundations。如确需公共 Foundation 变更，另列必要性、影响和明确授权范围，再调整单源合同及生成链路。
4. 建立单头像矩阵与全部 51 张素材预览，显示分类、编号和引用方式。
5. 验证图片、24/32/40、圆/方、在线三种语义和两种主题；提交第一批运行视觉供审阅。

### 第二批：横向组、More 与九宫格

拟新增：`packages/ui/src/avatar/avatar-group.tsx`、`avatar-grid.tsx`、`avatar-group.test.tsx`、`avatar-grid.test.tsx`；沿用第一批样式、图片行为和展示页，不复制图片容错。

步骤：

1. 用参数化用例固定横向上限的前/中/后边界，以及 Grid 的 0–10 人排布。
2. 实现圆形交叠与正式 More，组合已有 Popover；验证整组动作与 More 的事件隔离。
3. 实现固定 40px Grid，保持内部成员无独立焦点。
4. 查看三档交叠、剩余姓名面板、长姓名、窄容器和键盘路径；提交第二批视觉。

### 第三批：状态装饰与真实组合

拟新增：`packages/ui/src/status-indicator/status-indicator.tsx`、`status-indicator.css`、`status-indicator.test.tsx`；同一入口可包含三种状态部件，按实际复杂度再拆文件。

步骤：

1. 固定 0/1/2 个边缘状态、三位置、活动显示优先级和恢复规则。
2. 实现正式图标与状态文字、跟随形状的覆盖层和单一动效；复用现有 Motion/reduced-motion。
3. 在头像展示页组合“名单行”“课程成员摘要”“课堂成员状态”三个使用片段，使用明确标记的虚构数据。
4. 检查状态信息是否足够清楚、是否遮挡人物、与姓名/角色的层级是否协调；检查活动环和 Focus 同时出现时可辨认。
5. 运行相关回归、独立技术审阅，提交整组视觉及独立对比度结果。

### 每批随实现同步的集成

- 导出与入口：`packages/ui/src/index.ts`、`packages/ui/package.json`、`apps/playground/src/app.tsx`；沿用当前路由方式，拟使用 `#avatar`。
- 页面样式扫描：`apps/playground/src/styles.css` 使用 `source(none)` 且排除了组件文档目录；头像页使用 Tailwind 时精确增加 `@source "./docs/components/avatar-page.tsx";`，并同步 `scripts/verify-tailwind-b2.mjs` 的现有精确登记。
- 候选合同：`manifests/ui/avatar.yaml`、`avatar-group.yaml`、`avatar-grid.yaml`、`status-indicator.yaml`、`status-indicator-group.yaml`、`activity-overlay.yaml`，按当批实际组件创建。
- 本地源码交付：拟用 `registry/avatar.json` 与 `registry/status-indicator.json`，记录图片、样式、公共依赖及复制路径。两个条目不代表新增 npm 包。
- 当前范围与证据：`status/current-phase.yaml` 的独立头像子项、本文和 `evidence/runtime/avatar/verification.md`，只更新本家族对应内容。V2 Roadmap JSON 是原始规划快照，只作为来源链接，不回填实施状态。
- 资产索引遵守 [生成机制](../ai/README.md)：登记与导出实际存在后运行 `node scripts/asset-index.mjs --write`，不手工给 `docs/ai/asset-index.md` 添加虚假的可用项。只有符合候选/正式身份且实际自动验证通过的条目才进入默认索引，不能为可检索而提前填写 passed；51 张素材由静态目录与 Registry 文件清单追踪，不修改索引算法。
- 新样式消费者按现有 Token 及精确扫描规则登记；公共 Token 缺口先遵守上面的局部候选与独立范围规则。检查 `scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs`、`scripts/verify-tailwind-b2.mjs`、`scripts/verify-token-foundations.mjs` 中对应范围，不为通过门禁增加目录级宽泛豁免。

## 9. 验收场景与检查顺序

| 场景 | 必须证明 |
| --- | --- |
| 空图、慢图、请求/解码失败、切换地址 | 正式默认图始终可用，无破图、过期结果或重试循环 |
| 展示、动作、链接、邻接姓名 | 正确语义、可访问名称、自然 Tab 顺序，不重复朗读 |
| 未声明/在线/离线 | 无在线误报；离线灰度不禁用资料入口 |
| 横向组上限 3/9，与上限相邻人数 | 槽位和剩余人数准确，More 与整组动作互不触发 |
| More 面板键盘、关闭、长姓名、窄窗口 | 名单可读、焦点有序且可恢复，浮层不被祖先裁剪 |
| Grid 0–10 人 | 空文案、1–9 排布、10 人截断正确，不出现 More 或内部焦点 |
| 两个状态、活动出现/结束 | 活动期间隐藏状态组，结束后恢复；装饰不截获操作 |
| 减少动态效果与强制色彩 | 动效静止；焦点和必要信息仍可辨认 |
| 浅/深表面及 24px 最小尺寸 | 人物可辨认，状态/Focus 不被裁剪；按实际背景检查必要图形和文字对比度 |
| 素材编号与复制消费 | 51 张完整、可解码，引用与来源一致；过滤/截断不重新分配 |

实现时先运行当批定向 Vitest 用例，例如 `pnpm exec vitest run packages/ui/src/avatar/avatar.test.tsx --maxWorkers=2`，再执行 `pnpm typecheck`；完成登记后执行 `node scripts/asset-index.mjs --check` 与 `pnpm verify:governance`，随后 `pnpm build`。浏览器用例拟集中在 `tests/e2e/avatar.spec.ts`，执行 `pnpm exec playwright test tests/e2e/avatar.spec.ts --project=chromium`；配置与可用服务在执行前核对，其他任务服务不关闭，头像截图只写本家族证据目录。

最终按共享影响补相关回归。已有并行修改导致的失败单独记录，不删除测试、扩大白名单或覆盖其他家族证据来制造通过。以上为原计划检查顺序，2026-09-16 实际执行结果见文末实施检查点。

独立记录：实现、自动检查、独立技术审阅、人工运行视觉、颜色用途与对比度、发布、业务迁移、Git。自动通过不能代替视觉判断；真实屏幕阅读器、物理触屏和未执行浏览器均按实际结果报告。

## 10. 实施前需解决的少量方案项

这些由实施者用现有代码与样例收敛，只有发现会改变已确认设计的冲突才再次讨论：

- 单头像默认尺寸、圆角、Hover/Pressed 和状态装饰的具体 Token 配方；密度不自动改变显式指定的头像尺寸。
- 原生图片或 Base UI Avatar 的最小实现选择，以及一套统一的图片生命周期。
- More 的默认触发细节、显式响应式 API 和必要的挂载场景；保留鼠标与键盘均可达。
- 资源工具的最终导入入口与按需引用方式；避免普通头像消费被迫依赖完整图库页面。

以上保留实施前方案项；本次已按明确实施授权完成下述检查点。


## 11. 2026-09-16 实施检查点

- 第一至第三批已完成：六个公共组件、51 张沿用资源、稳定引用与分配工具、展示页及三个使用组合。路由为 `#avatar`。
- 单头像使用现有 Base UI `useRender` 组合原生按钮/链接，图片本身使用浏览器加载与解码生命周期；复用已有 Popover 与 Dialog，无新增依赖。Grid 的 AvatarMember 类型放在基础 Avatar 模块，避免多余的组组件依赖。
- 图库 64px 完整预览属于资源展示，公共 Avatar 仍只有 24/32/40。未增加上传、裁剪、人物选择或状态业务引擎。
- Manifest、Registry、phase 和生成资产索引已同步；既有包根导出已满足入口，不修改 package.json。无新增公共 Token，不回写原 Roadmap JSON 或历史冻结证据。
- 定向 5 文件 12 用例、共享回归 6 文件 22 用例、Chromium 4 用例、类型检查、构建及独立技术审阅通过。整库仍存在并行列表任务的治理失败；原始失败和头像源码扫描问题的修复后复核分别记录。
- 实现完成与人工视觉/对比度接受分开登记：Human Gate 为 awaiting_human，对比度接受为 not-granted。未执行发布、业务迁移、Figma 写入或 Git 提交/推送。

完整结果、来源差异、截图及复现命令见 [Avatar 验证记录](../../evidence/runtime/avatar/verification.md)。

## 12. 用户视觉修订：旧版高还原与气泡详情

2026-09-16 用户指出头像描边、图标及各种状态角标应高还原旧 Vue 视觉；所有纯关闭动作使用右上角 IconButton，学生详情使用弱打断气泡。本轮按 System Mode 执行，覆盖 Avatar/状态样式、成员资料与 More 面板，以及当前演示中残留的纯文字关闭入口。保存、取消、确认等任务动作继续承担其业务含义。

核对旧版 `Avatar/avatar.scss`、`Badge/badge.scss` 与 `styles/tokens.scss` 后固定：状态实色底配 OnColor 图标，无额外描边；16/20/24 圆点内的图标为 12/14/16；第一角标在上，交叠 4/6/8，底部露出 4；活动遮罩复用现有 overlay-focus 的主题中性色，局部固定 15% Alpha（浅色与旧版同值，深色沿用新主题底色），并 blur 2，外环距头像 4、线宽 2，中心复用状态角标。沿用正式 Rain 图标与当前 Token，保留实际对比度不足记录，不自动接受。

详情就近组合现有非模态 Popover，关闭使用已有 IconButton；Escape、外部点击、焦点恢复及页面可继续操作均需浏览器验证。普通气泡用 close，已有明确粗叉号规范的 Dialog 用 close-bold。此修订替代前一版浅底状态与内环方案，未授予 Human Gate、对比度接受或发布。


后续同轮补充：用户明确要求头像状态优先使用合适的 Fill 图标；电脑、手机、音量分别使用 computer-filled、mobile-filled、volume-filled。video-off 本身为实心图形，无另一个 filled 命名版本；Loading 保留原版专用 button-loading，loading-filled 是带回转箭头的实心圆，不是同一加载符号；Blocked 保留唯一正式 prohibited。关闭遵循对应组件的既有关闭规范。

用户指出九宫格人物贴合，经浏览器测量确认 `--rain-space-1` 不存在，原有 gap/padding 因而失效为 0。旧 Vue 实际坐标为每格间隔 1px、外侧 1px；改为由现有 Space/2 除以 2 表达，描边改用现有 Line/1。新增实际几何回归，避免仅测量容器 40×40 而漏过内部间距。

恢复旧版实色角标后，中性浅色与警告浅色白图标对比度分别约 2.89、2.55，低于 3。保留原版配色并登记为未接受的待审发现；不弱化必要图标的语义角色或改写阈值。


审阅补充修正：灰度和 Hover 透明度只作用于人物图片；单头像及可操作头像组的白色分隔层、Hover 与按下描边保持独立。白色分隔作为 Fill/Neutral/Solid/7 承载面，交互边使用 Border/Brand/2。Grid 单元格圆角按旧布局恢复为 4/2/1px，这是本家族的局部几何映射，不新增公共 Radius 档位。所有尺寸预览的纯完成关闭也改为右上角 IconButton。

### 16:18 圆角细节继续校准

用户要求对照旧 Vue 精查各种圆角等细节。源码核对补齐：九宫格外圆角 5px、内层 38×38/radius4/overflow hidden，单元圆角 4/2/1 与 1px 留白；普通填色对应 Fill/Neutral/Solid/5。横向组恢复首成员在上、More 在下；More 默认白色分隔及按下内白边，24px More 使用 14px 图标。单头像和组内图片保持原始尺寸，不再因边框从 40px 缩至 38/36px；白色分隔只裁切图片绘制区域，hover/active 描边独立覆盖。单头像 hover 使用 Fill/Neutral/Solid/3；方形活动外环圆角 8px，旋转 0.8s、脉冲 1.6s。

上述颜色继续映射当前 Rain Token（包括深色与焦点规则），不新增全局 Token、不变更旧 Vue 源码。当前验证与残留边界见 [修订验证](../../evidence/runtime/avatar/refinement-2026-09-16.md)。

最终复审补充：真人图就绪时隐藏底层 fallback，失败/换图自动恢复，避免 hover 将两张图叠加。独立审阅所有 P2 已关闭。移除纯关闭页脚后补回预览正文 20px 底部留白；对应 selection-patterns.css 的既有 transform 候选重新核对，仅更新本次 Avatar 修订来源清单，不修改 RN15 冻结来源。

## 13. 当前视觉确认

2026-09-16，用户在圆角、描边、Fill 图标、成员间距与资料气泡修订完成后回复“确定。”，登记 Human Gate accepted，范围仅为 avatar-current-runtime-visual-only。六份头像家族 Manifest、两份 Registry、当前阶段与展示页状态同步；候选身份与成熟度不升级。两处角标对比度接受仍为 not-granted；不扩大其他组件验收、无障碍验收、Figma、发布、业务迁移或 Git 授权。

## 14. 直接使用现有颜色 Token

2026-09-16 用户要求“最好都是用现有token”。移除 ActivityOverlay 的局部 15% Alpha 覆写，直接引用 `var(--rain-overlay-focus)` 的完整颜色，浅色为已有 15%、深色为已有 70%。此项按最新 Token 优先要求覆盖第 12 节的旧派生方案，未新增或修改 Token。头像照片的 hover 透明度和环形脉冲属于既有交互/动效，不额外生成颜色 Token；人物资产原色及系统强制色彩保留。

上述 Token 直接引用修订完成后，用户于 2026-09-16 明确回复“确定。完成视觉检验”。当前头像运行视觉确认覆盖此最终版本，Human Gate 为 accepted；对比度接受及其他授权继续独立记录。
