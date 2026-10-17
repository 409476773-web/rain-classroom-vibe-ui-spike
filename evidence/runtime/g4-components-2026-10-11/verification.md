# G4 组件建设记录 · 2026-10-11

本轮按用户「Typography 复用收口，建设 Item 和 Progress，并补齐 Playground 展示和使用说明」完成本地实现与专项验证。工作模式为 System Mode，身份为未发布 Registry Candidate；独立规格、代码和截图审阅通过，新视觉 Human Gate 保持 `awaiting_human`，对比度接受保持 `not-granted`。

工作区为 `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`，分支 `codex/card-v2`。工作区原有大量修改，本轮未提交、推送、创建 PR 或改变分支。实施前记录见 [baseline.json](baseline.json)、[baseline-extra.json](baseline-extra.json) 和 `before/`；实施计划见 [G4 计划](../../../docs/plans/2026-10-11-g4-components.md)。

## 交付与使用入口

| 能力 | 实际交付 | Playground |
| --- | --- | --- |
| Typography | 直接复用既有 UI／Reading／Data 三角色和十种排版预设，用原生 HTML 表达语义。新增使用登记，不增加包装组件、字体或 Token，也不重置原 Foundations Gate。 | [文字排版](http://127.0.0.1:5391/#typography) |
| Item | 十个公开 Parts、三种表面与三种尺寸；省略尺寸跟随父级 Density。支持独立操作、完整长内容、分组与原生链接；不创建业务选择模型。 | [内容条目](http://127.0.0.1:5391/#item) |
| Progress | 五个公开 Parts，沿用 Base UI 的实际数值、范围、读数和可访问性。默认组合自动提供轨道；未知比例不输出数值，暂停／失败／重试由宿主表达。 | [任务进度](http://127.0.0.1:5391/#progress) |

调用规则见 [G4 使用说明](../../../docs/ai/g4-components.md)；三项 Manifest、[本地 Registry](../../../registry/g4-assets.json)、根导出／样式、组件目录与生成的资产索引已同步。精确修改的 38 个源文件及其前后 SHA 见 [来源绑定](source-bindings.json)。预览服务为本轮构建产物，端口 5391；现有其他服务未停止。

## 官方来源与本地差异

Item／Progress 的真实 shadcn Base UI 源码、代表例、MIT 和使用的样式固定为 `shadcn-ui/ui@3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`，原始字节保存在 `upstream/`。[来源锁](source-lock.json) 与 [原始／安装来源校验](upstream-source-integrity.json) 记录 12 项 SHA 校验、Base UI 1.8.0／CVA 0.7.1 的实际安装版本和 lock integrity，均通过。

| 来源 | 保留 | 本地差异 |
| --- | --- | --- |
| Typography Foundations | 现有预设、工具类、字体角色和真实导出 | 增加独立示例、用途与检索登记；基础源码逐字节保持。关键数字和中文单位分开，普通数字使用 UI 字体。 |
| shadcn Item | 十个 Parts、CVA、useRender／mergeProps、开放内容和原生 render | 转为 Rain Token、父级密度与 trace；替换默认文字截断，内容宽度和动作自然换行；补充列表成员说明、焦点、reduced-motion 和 forced-colors。ItemSeparator 复用既有 Separator 身份。 |
| shadcn Progress | Base UI Root／Track／Indicator／Label／Value 与自动轨道组合 | 使用 Rain Token、8／6px 轨道和 trace；有限 min／max 且 min < max，非法范围明确抛错。未知形状为静态短段；保留 ref、render、事件和 className 回调。 |
| 既有资产索引 | 原有 Manifest／Registry 校验、路径边界和生成流程 | 识别已有 Foundations 的本地 `export *`，排除 type-only 并处理循环引用；不改公共导出，不新增依赖。 |

设计依据为 V02、V04、V05、D02、D05、I01，延续已有 G1–G3 的文档结构、文字层次和内容／动作关系。

## 实际验证

| 检查 | 结果与证据 |
| --- | --- |
| 两组件、三页、既有 Typography／目录路由与本批治理 | 6 个测试文件、57 项通过：[最终单测](scoped-unit-final.log)。覆盖数值边界、范围错误、未知状态、原生链接、ref／回调、密度、trace 与授权负例。 |
| 索引的 wildcard／循环／type-only 与用途检索 | 2 项通过：[索引专项检查](asset-index-scoped-final.log)。另外两个历史冻结状态断言没有算入通过项。 |
| 全 workspace 与测试类型检查 | 通过：[最终类型检查](typecheck-final.log)。 |
| 全 workspace 构建 | 通过：[最终构建](build-final.log)。既有大体积分包警告保留，未在本批重构图表或图标打包。 |
| 生成索引与实际导出／文件引用 | 通过：[索引检查](asset-index-check.log)；Typography、Item、Progress 均已收录。 |
| Chromium 桌面与 390px 窄屏 | 12 项通过：[最终浏览器日志](browser-final.log)、[报告](browser/report.json)。三页的浅深主题、密度、目录入口、h1 焦点、真实剪贴板内容、无页面横向溢出、Item 独立操作／禁用／完整长内容／键盘链接、Progress 数值／暂停／失败／完成／重启／未知／6÷24 均已实测。 |
| reduced-motion／forced-colors | 浏览器模拟检查通过：进度无过渡，指示与轨道保持区别，链接子 Parts 保留系统链接颜色和焦点。此结果不代表真实辅助技术或 Windows 硬件验收。 |
| 六处新颜色源码与已登记组合 | [颜色专项记录](color-verification.json)：342 项测量、174 项要求对比度、0 失败。仅涵盖声明的 Token／表面组合，不是全库、全页面或任意宿主覆盖的对比度接受。 |
| 来源与保留记录 | [来源完整性](source-integrity.json)：38 个本批源文件、10 个保留文件校验通过；删除本批阶段记录后，旧阶段和 Gates 与批前一致。 |
| 独立审阅 | 规格、API／数值／语义、来源与治理、最终四张截图均无剩余阻塞发现；最后三处治理衔接也再次只读复审通过。审阅不代替用户视觉 Gate。 |

截图已实际查看：桌面 Typography、深色紧凑 Item、窄屏 Item／Progress。Item 的窄屏正文保留宽度、操作换行；API 表和代码沿用现有容器内部横向滚动。相邻旧页面浏览器检查仅为 Accordion／Spinner／Sheet 三页 smoke，不能扩大为全库回归。

首轮证据保留在 `browser-first/` 和 `browser-initial.log`。键盘焦点用例先改为真实键盘模式再检查 focus-visible；窄屏 Item 的正文／动作挤压则修复在组件样式中。Progress 的先行测试确实在上游基线得到 15 失败／2 通过；Item 的初次失败是组件模块尚不存在，未将它表述为完整行为红测。索引 wildcard 测试也保存了实际失败与通过日志。

## 治理范围与已知失败

完整 workspace、boundaries、Tailwind B2、evidence 和 Token 检查仍未整体通过。旧 B2 冻结状态错误、既有命令集／反向依赖／来源清单及其他旧对比度发现继续报告；未降低门槛、修改旧接受记录或把旧问题算作本轮通过。旧函数与旧状态的直接对照见 [历史治理对照](legacy-governance-comparison.json)，完整原始日志为 `*-before-view.log` 与 `*-global-current.log`。

最终 [批前／当前全局对照](global-before-current-comparison.json) 保存了五项 before／current 的退出码（均为 1）与原始差异。workspace、boundaries、evidence、Token 的诊断逐字一致；Tailwind 仅旧 Task5 清单诊断增加了已授权的三个 Manifest／一个 Registry 文件名，按报告中这四个明确路径投影后诊断一致，原始差异没有删除。批前读取脚本 [global-before-view.mjs](global-before-view.mjs) 对 29 个 before SHA 做自检，并隐藏本轮新增的 22 个源码。

本轮实际引入的三处登记衔接问题已分别修复，不能归为旧债：

1. UI 公共样式新增两条 import。只允许精确两条导入；逆变换必须还原批前字节，且批前 SHA 必须等于旧 G2–G3 来源链的 after。旧链只在内存中合法衔接，新证据不回写旧文件。第三条 import 或修改原样式，即便重刷本批 SHA 仍被拒绝；见 `shared-style-successor-{red,green}.log`。
2. 边界检查在旧阶段失败后未收集新的 Registry。只有完整本批来源绑定成功才登记唯一 G4 Registry；旧阶段错误继续保留。真实脚本回归先失败后通过，见 [Registry 红测](registry-boundary-red.log) 和 [最终治理单测](governance-final.log)。
3. Tailwind 在旧阶段失败后丢弃了本批授权。独立读取仅用于经过精确授权和完整来源校验的 G4：两组件的 flex-wrap、有限合同、三个 Manifest／一个 Registry。其他组件与旧 phaseStatus 不借用这条路径；见 `tailwind-g4-successor-{red,green}.log`。

批前视图使用已保存文件及明确标注的逆变换还原字节，移除本批新增源码和证据目录，保留其他真实文件；它不是独立完整仓库快照。`asset-index.test.ts` 与 `token-foundation-outputs.mjs` 的批前字节为明确登记的 derived before，详见 baseline-extra 的 provenance。清单类诊断可能包含当前合法新增文件名，须区分原始诊断文字变化与新增违规，不能声称完整治理已通过。

## 保留状态与下一检查点

实施与专项自动验证完成；下一检查点是用户检阅三个页面的视觉与信息关系。新 Human Gate 未通过，完整对比度接受未授予。真实 Safari／VoiceOver／触屏、放大、实际字体栅格化、全库回归与独立外部消费仍未验证。

浏览器记录确认 CSS 的字体角色与 36／42px 数据、14／22px 中文单位、15／26px Reading；`document.fonts.check` 不是实际字形来自某字体的证明。本轮没有分发字体文件。

Figma 写入／映射、发布、业务迁移、Git commit／push／PR／merge 均未获得本轮授权，未执行。Typography 原 Foundation 状态、旧组件和图表的视觉接受、历史颜色例外均保持各自范围。
