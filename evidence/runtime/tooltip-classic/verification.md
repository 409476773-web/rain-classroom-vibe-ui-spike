# Tooltip Classic 共享候选

2026-09-20。`.worktrees/card-v2` / `codex/card-v2`，基础 HEAD `321e1a0`。用户授权参考旧 Vue Tooltip 完成共享建设、替换当前页面，并补入固定 #2F3545 Token；随后要求默认下方、空间不足再换位，以维持从上到下、从左到右的阅读顺序。

[实际预览](http://127.0.0.1:5372/#token-first-g1-next) · [组件说明](../../../packages/ui/src/tooltip/README.md) · [Manifest](../../../manifests/ui/tooltip.yaml) · [Registry](../../../registry/tooltip.json) · [计划与设计依据](../../../docs/plans/2026-09-20-tooltip-classic.md)

## 交付范围

共享 `@rain-next/ui` Tooltip 已建设并替换 G1 续批全部提示实例，原本地 Tooltip Parts 适配移除。使用既有 Base UI 1.8.0 与 Popup 主题/密度桥，无新增运行依赖。Manifest/Registry、AI 资产索引及使用说明已登记。Resizable 源码和 2px 样式保持。

固定深底 #2F3545 / 白字在 Light/Dark 一致，PingFang SC Regular 14/20，上下7、左右16、圆角6、最大250px，14×6箭头，无边框/阴影。start/end 箭头沿旧版保持水平16px、垂直7px边距。新 `tooltip-token-contract.ts` 经现有生成器输出6个语义/几何变量；唯一新增颜色值是用户授权的 #2F3545，前景复用现有白字，全部原生成变量和值保持。

默认 bottom；引擎处理碰撞翻转/位移。支持显式12方位、默认100ms悬停开关、焦点立即打开、可悬停内容、Escape/Tab/Blur关闭、单真实触发元素及原事件/ref/已有描述保留、受控或默认打开、禁用/空文本抑制、可选箭头、本地挂载和 Portal 目标；空目标回退 body。纯文本，不承载富内容/交互。默认本地挂载的外层与引擎 Portal 包装层均不参与宿主布局。

## 来源与设计

只读核对旧库 `雨课堂_ai设计系统_v3.0/src/components/Tooltip`、Popup 控制与定位、Token 以及 2026-08-05 确认记录，[固定源码哈希](classic-source-lock.json)。本会话已读 Figma `olqwu95QD6n4Y3IAwUdgF4 / 1749:85201` 与原稿 `MbWg1ft5zk1JRQiQ6dS30e / 1:5214`。视觉和能力来自 Classic，交互和定位复用当前已安装引擎；旧 Vue 代码、Figma 均未修改。用户补充的下方优先规则覆盖旧默认 top。

V04：说明跟随触发点向下出现，保持阅读连续；必要规则仍在正文。V05：视觉继承与最小适配，复用引擎及现有 Token，不另建状态/定位系统。本次组件案例已获用户确认，阅读顺序经验记入方法库 D01/V05 的 Tooltip 案例；不新增全局方法。

## 验证

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 全工作区与测试类型 | 通过 | [typecheck](typecheck.log) |
| 原型生产构建 | 通过；已有大分块提示保留 | [build](build.log) |
| Tooltip / Token / Popover / Tabs | 22项通过；最新默认下方之后 Tooltip/Token 5项复测通过 | [初轮](unit-and-contract.log)、[最新](final-unit.log) |
| 授权、旧Token值与旧依赖保留 | 4项限定检查通过，243项未运行 | [scoped governance](scoped-governance.log) |
| Manifest/Registry、发现索引与Starter | 6项通过 | [discovery and starter](discovery-and-starter.log) |
| Tailwind B2 | 通过 | [tailwind](tailwind.log) |
| 最新构建浏览器 | 5项通过 | [browser](browser.log) |
| 全库 Tokens / Boundaries | 未通过，原有发现保持；没有本批新增发现 | [Token](tokens.log)、[Boundaries](boundaries.log)、[前后对比](global-baseline-comparison.json) |

浏览器覆盖：固定双主题视觉/描述/hover/Escape/文字换行，12方位与箭头几何和精确边距，本地打开前后兄弟布局不变，受控开关，无箭头/禁用/空内容，Dialog 内层叠与焦点，1440/900/390宽度和 forced-colors，以及原2px分隔线指针/键盘/端部悬停/实例隔离。新增下方优先检查实际压缩视口下方空间，验证 bottom → top → bottom；并保留变更前失败 [bottom-default-red](bottom-default-red.log)。双主题白字/深底实测约12.24:1，[读数](browser/contrast.json)，数值达标不替代用户对比度接受。

独立只读复核发现并修复本地Portal挤动布局、空Portal目标不显示、start/end箭头边距遗漏；复核实测后无剩余P1/P2。空目标回归保留[修复前失败](review-regression-red.log)。后续默认下方是用户明确补充，已由最新浏览器检查验证。实际查看过深浅主题、390窄屏、默认下方截图和当前浏览器预览；没有用构建通过替代视觉检查。

## 状态

`registry-candidate` / `accepted`（仅当前Tooltip视觉与默认下方交互）/ `contrastAcceptance=not-granted` / `unpublished`。本轮自动验证限定上述组件与替换范围；全库146条Token发现、56条标准化边界发现与本批前相同，未豁免或改动相关旧问题。没有 Git 提交/合并/发布、业务迁移、Figma写入或旧Vue修改。冻结64项计划与其他已接受组件保持。

## 用户确认

2026-09-20 用户在查看替换后的预览、补充默认下方与阅读顺序规则后回复“确定。”。确认范围为当前 Tooltip 的旧版视觉继承、固定 #2F3545 深底和下方优先/空间不足换位交互（`tooltip-current-runtime-visual-and-bottom-first-interaction`）。源码对应 [固定快照](source-sha256.json)，本次登记不修改运行实现。

同步 current-phase、Manifest、Registry、组件说明和发现索引；记录已有 D01/V05 方法下的阅读连续性案例。此确认不扩展到其他组件、全库对比度/无障碍接受、发布、Figma 或 Git；原范围与既有问题保持。登记后的合同和索引5项检查通过，Tailwind B2通过，固定运行源码哈希未变：[human-gate-checks](human-gate-checks.log)、[Tailwind B2](human-gate-tailwind.log)。
