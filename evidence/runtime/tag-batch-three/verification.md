# Tag 第三批验证

授权日期：2026-09-09；验证日期：2026-09-09 至 09-10；System Mode。

用户指令为“继续建设tag的下一步”。范围及接口见[实施计划](../../../docs/plans/2026-09-09-tag-batch-three-implementation.md)；本批交付独立 TagSelect Registry Candidate 与页面自定义标签 local-experiment。真实业务接口、Figma、发布、迁移及 Git 写入不在本批范围。

当前状态：实现完成；自动验证通过；独立审阅通过；本批视觉 Human Gate 为 `accepted`。2026-09-10 用户明确确认“好的，这一版视觉已经完成人工验收，没有问题。”；精确范围为 `tag-batch-three-runtime-visual-only`，覆盖当前 TagSelect 与本地创建管理组合的实际视觉，本版同时确认[关闭按钮末端留白减少 2px](../tag-batch-one/verification.md)的修订。状态同步于[阶段文件](../../../status/current-phase.yaml)、独立 Manifest 与 Registry。交互沿用已有自动验证证据，本次确认不构成真实 IME、读屏或业务接口验证；对比度接受仍为 `not-granted`。

验收同步检查（2026-09-10）：阶段守卫仅允许有本次明确视觉决定且实现 / 自动验证 / 独立审阅均已完成的 accepted 状态；无决定、范围扩张或未完成状态仍被拒绝。第三批治理与 Tag 页面共 8 项检查通过，`pnpm verify:governance` 通过。本次只同步验收、文档站说明与精确守卫，未重跑组件构建和浏览器全套；以下实施测试仍为此前已运行的记录。

## 实际结果

- TagSelect 保留有效当前值，数字与字符串身份独立；重选只关闭，新选择通知一次。三种尺寸与三种外观直接复用现有完整 Tag Recipe。
- 管理面板支持立即勾选、名称 / 颜色搜索、20 色创建、改名改色、返回和解除关联。宿主持有稳定 ID 的标签定义；示例两份资料共享同一 ID，编辑后同步更新，× 只移除当前关联。
- 提交中锁定输入；空名与同名在面板内反馈，失败保留草稿并可重试。关闭不会被异步结果重新打开；卸载会取消请求。示例使用本地 450ms 模拟保存，刷新恢复初始数据。
- Base UI 1.8.0 只在本批精确文件中用于 Select 与 Popover。Portal 同步局部主题；禁用项跳过；动态禁用 / 移除焦点项时恢复可用焦点，已经离开面板的焦点不被抢回。

## 修改范围

| 内容 | 主要文件 |
|---|---|
| 公共候选与完整配方 | [TagSelect](../../../packages/ui/src/tag/tag-select.tsx)、[样式](../../../packages/ui/src/tag/tag-select.styles.ts)、[Manifest](../../../manifests/ui/tag-select.yaml)、[独立 Registry](../../../registry/tag-select.json) |
| 页面组合与演示 | [管理组合](../../../apps/playground/src/docs/components/tag-management-recipe.tsx)、[场景](../../../apps/playground/src/docs/components/tag-flow-examples.tsx)、[Tag 页面](../../../apps/playground/src/docs/components/tag-page.tsx)、[页面 CSS](../../../apps/playground/src/docs/components/tag-page.css) |
| 共享接入 | UI 导出、UI package 与锁文件；[TagContent](../../../packages/ui/src/tag/tag.tsx)仅放宽内部 Recipe Parts 类型；[UI CSS](../../../packages/ui/src/styles.css)追加精确 TagSelect 机械规则；Typography 增加 `ui-tag-select` 的既有 Solid 700 适用身份 |
| 颜色与治理 | [消费者生成源](../../../scripts/token-foundation-outputs.mjs)、[颜色检查](../../../scripts/verify-token-foundations.mjs)、[阶段检查](../../../scripts/verification-helpers.mjs)、[依赖边界](../../../scripts/verify-boundaries.mjs)、[B2 检查](../../../scripts/verify-tailwind-b2.mjs)与对应测试；生成 Manifest 通过 `pnpm generate:tokens` 更新 |

## 已执行检查

| 检查 | 结果与范围 |
|---|---|
| 相关单元、交互与治理测试 | 14 个文件、合计 532 项通过，分批运行。第一轮定位并修复 4 个旧测试假设；随后 13 个文件的 355 项通过，B2 文件在并行 Checkbox 修改稳定后单独重跑 177 项通过。未改写 Checkbox 实现或放宽其校验。 |
| TagSelect 与管理流程 | 当前 30 项交互测试；包含 3 个动态禁用 / 移除焦点用例的先失败后通过记录。 |
| 真实浏览器 | 第三批 6 项与前两批 9 项，共 15 项 Chromium 检查通过；新批截图独立保存，未覆盖旧批次截图。 |
| 类型与构建 | `pnpm typecheck`、`pnpm build` 通过。构建报告超过 500kB 的资源块提醒，具体体积与测量边界见下文。 |
| 完整治理 | `pnpm verify:governance` 通过；第三批精确文件、依赖、Parts、父底与阶段状态由独立守卫验证。 |
| 独立审阅 | 15 个交互边界、4 项第三批治理检查、20 个颜色状态计算通过；两项禁用 / 焦点问题已修复。另独立查看 6 张截图，复算 18 个浏览器样本中的 54 个对比度值，与记录误差为 0。见[独立审阅](independent-review.md)。 |

浏览器覆盖键盘 / 鼠标、同值重选、禁用项、Tab / Escape / 外点、受控展开、20/24/28 × Filled/Outlined/Solid × Light/Dark、嵌套浅色与打开期间主题变化、滚动容器、长候选、边缘翻转、360px、200% 文字、强制颜色及完整创建 / 失败重试 / 共享编辑 / 解除关联流程。第三批每项检查均检查页面脚本异常。

Base UI 的鼠标打开按动画帧调度。浏览器用例现在等待 Popup 可见且已选项自然获得焦点后，才发送 Escape / Tab；该完整路径额外重复运行 3 次通过，未靠固定延时或跳过焦点断言消除失败。

200% 文字检查发现新触发器的固定高度不能容纳放大后的行框，已增加基于 `1lh` 与既有边框厚度的最小高度；正常三档完整尺寸仍实测不变。管理面板依靠浏览器原生强制颜色转换，实测文字与边界符合 4.5:1 / 3.0:1 下限，无额外系统色白名单。

## 颜色边界与视觉证据

当前 269 个颜色记录、所有 Light/Dark 值、类别角色及完整 Tailwind 输出与[颜色基线](../tag-color-discovery/color-baseline.json)逐项一致。TagSelect Trigger 继承既有 Tag 颜色记录；原有 2,535 项低于阈值的 Tag 组合继续保留为未接受的问题，视觉确认不转化为可读性通过。

新 Popup 限定 `Background/Neutral/1`，文字 / 选中态 / 图标分别使用已登记 Neutral 与 Brand 角色；其普通及高亮状态单独验证。边框是装饰性面板边界，不将浅边框登记为关键控件轮廓通过。实测来源与主题、几何和背景合成事实保存在 [browser-facts.json](browser-facts.json)。

18 个实际三尺寸 / 三外观 / 双主题样本，按各选项真实背景合成后的普通文字最低 13.548:1、选中文字及勾选图标最低 5.773:1，分别满足本批 4.5:1 / 3.0:1 要求；这些结论仅覆盖新 Popup 中的已登记用途。

截图已由主代理查看：[Light](light.png)、[Dark](dark.png)、[360px 创建](narrow.png)、[创建](create.png)、[编辑](edit.png)、[强制颜色](forced-colors.png)。另在运行中的 4173 页面亲自打开创建表单，确认文字、20 色、返回和保存入口可见。

## 尚未验证与下一检查点

实际操作系统中文 IME、真实读屏和真实业务服务尚未验证；当前 IME 证据只覆盖组合输入事件守卫。未执行 Figma 写入、包或 Registry 发布、业务迁移、提交或远程 Git 操作。

当前公共组件资源块为 515.04kB（gzip 162.70kB），图标目录为 2,043.88kB（gzip 419.93kB）。颜色目录批次记录的对应公共块为 387.49kB（gzip 118.24kB）；期间存在并行组件工作，未隔离各改动的体积贡献，也未测量真实网络加载性能。本批不执行额外全站拆包。

原定三批功能建设与实际视觉验收已齐备，没有默认第四批。后续按使用目标安排实际 IME / 读屏验证、真实业务接入及独立发布准备；长列表搜索、合并 / 归档 / 排序或公共管理 Pattern 需要明确场景后单独建设。前两批与颜色目录的既有验收范围保持独立。
