# RN-06 Layouts V1 verification

日期：2026-09-13。候选实现：现有 `codex/card-v2` 工作区；HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，本批未提交或推送。

## 实施范围

`@rain-next/layouts` 提供 Stack、Inline、Grid 与 Split.Root/Main/Sidebar；依赖仅为已安装 React 与 Foundations。间距复用当前16项Space，默认0；列数有限1–4，按容器宽度适应。Split受控收起、保留DOM/草稿、退出Tab顺序、按需要恢复外部焦点；滚动及侧区Portal开关由宿主明确协作。

两应用均消费该包：Playground `http://127.0.0.1:5195/#layouts`，独立Prototype `http://127.0.0.1:5196/`。设置表单、查询/动作组、课程资料主从预览使用虚构数据，保存只在当前页面生效。既有Card/Dialog没有迁移到新布局。

依据见[计划](../../../docs/plans/2026-09-13-layouts-v1-implementation.md)、[ADR0009](../../../docs/adr/0009-minimal-layouts.md)、[组合规则](../../../docs/audits/2026-09-13-composition-layout-rules.md)和[用法](../../../docs/audits/2026-09-13-layouts-usage.md)。VE-009/012/014只提供工作流与空间关系参考，Classic Template外观不作为目标。

## 自动验证

| 检查 | 本批实测结果 |
| --- | --- |
| 全工作区类型检查及两应用生产构建 | 通过；保留既有大体积产物提示，未扩展为打包优化任务 |
| 治理 | 离线锁文件、工作区、证据、边界、Tailwind B2、Token检查通过；准确登记本包5项几何变量和示例配色，未开放默认Tailwind视觉或新增第三方依赖 |
| 组件单元与RN-06合同 | 4项组件测试、3项治理合同测试通过；参数边界、观察器清理、草稿保留、聚焦回退与不抢外部焦点均有覆盖 |
| 既有治理回归 | 首轮436项中430通过、6项失败；同步两个历史夹具的精确排除及新扫描源，补齐Registry并去除注释误扫描后，全部6项失败用例连同3项新合同共9项定向复测通过。没有把它写为新的全库测试通过 |
| 生产Chromium回归 | **22/22通过（18.8s）**：Layout7 + Dialog9 + Card6；使用当前生产构建，重试0 |
| 保护检查 | **1925/1925**既有UI、Foundations、Card/课程Dialog消费源码哈希不变，见[preservation.json](preservation.json)；此前阶段与Gate完整保留的断言通过 |

生产矩阵覆盖Light/Dark × default/compact，1280视口中的宽容器与360窄容器；实际网格列数/20px间距、字段标签及控件顶边对齐、侧区320px、堆叠24px间隔、两区独立滚动。另覆盖320视口、多行错误、成组动作、收起焦点、草稿DOM身份、打开Select后收起、查询与筛选、forced-colors/reduced-motion基本可操作性及独立Prototype。不同控件密度不会改变显式32px动作按钮。

日志位于[logs](logs/)，生产截图及几何数据位于[production](production/)。复跑配置随证据保留为 `production.config.mjs.txt`；独立检查脚本以 `.mjs.txt` 归档，避免被识别为运行源码。测试源码为 `tests/e2e/layouts.spec.ts`、`packages/layouts/src/layout.test.tsx` 与 `scripts/layouts-v1.test.ts`；最终源码摘要见[source-sha256.json](source-sha256.json)。

## 独立复核与修复

独立只读复核覆盖1280/375/320 × Light/Dark共6组页面；另有21项边界检查，包括Grid最大1–4列×三档实际容器宽度、Split含内边距/边框的临界宽度、滚动、收起草稿、焦点与Portal协作。报告和原始记录见[independent-review](independent-review/)。

发现并完成复测：

- 深色页面H1被旧全局颜色覆盖：宿主标题改为继承所在主题的文字色。
- 帮助文字高度不同的FormItem被网格默认stretch拉高：表单宿主明确 `items-start`，实际标签和控件顶部现已对齐。Grid保留原生stretch供等高容器使用。
- 设置保存动作明确使用现有primary变体；窄屏动作组保持完整，长资料名留在可访问名称中，按钮显示“查看资料”。

## 接受边界

源码候选、当前自动验证与独立技术复核分别记录。人工视觉接受仍为 `awaiting_human`，对比度接受仍为 `not-granted`，本地源码Registry未发布。

本轮两个滚动区复用已有Focus配方；Light外框为 `rgb(61,123,255)`，Dark为 `rgb(42,93,203)`，两区背景分别为 `rgb(247,249,255)` / `rgb(26,31,51)`。深色共享Focus既有对比度问题继续开放，不能因为键盘可操作或自动检查通过而视为接受。实际配色见独立复核证据；本轮未单独核对平台字体，既有本机字体记录不外推到其他设备。

完整业务Benchmark、真实输入法/辅助技术/触屏及跨浏览器检查仍独立。拖拽调宽、持久化、导航Sidebar、RN-07及后续任务、Figma、发布和业务迁移不在本批完成范围。
