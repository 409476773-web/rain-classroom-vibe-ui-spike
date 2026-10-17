# G5 六条浏览器反馈修正

来源：用户 2026-10-12 对本地预览的六条标注。System Mode；范围限定于 Calendar / DatePicker / Combobox 及日期文档样板，沿既有图标与按钮组件。

- Calendar 翻月改为图标库 `arrow-left` / `arrow-right` 线性资产；正式目录均为 available。
- DatePicker 移除「点击确定后生效」常驻提示，保留按需校验信息；无提示时不留下 aria-describedby 悬空引用。
- DatePicker 取消为三级按钮。
- Sheet 的完成时间设置为一级按钮。
- Dialog 的完成日期设置为一级按钮。
- Combobox 重试文字按钮添加 refresh 前置图标；继续保留输入焦点恢复。

方法：V03 用一致的语义图标；V04 通过提示与操作层级减少视觉竞争；V05 同步内容、外观和行为。复用现有组件和 Token，日期草稿及确认行为保持既有合同。没有新增可推广方法，反馈留在本轮合同和记录中。

## 实际验证

| 检查 | 结果 |
| --- | --- |
| 相关组件与页面 | [4 文件 51 项通过](components-unit.log)，含取消 / 确定 / 外点草稿、无效时间与重试焦点；新增提示断言修改前失败、修改后通过 |
| G5 / G4 治理及颜色回归 | [4 文件 26 项通过](governance-unit.log)，没有改旧接受或基线 |
| 类型检查与 Playground 构建 | [工作区及测试代码类型检查通过](typecheck.log)；[Playground 构建通过](build.log)，保留既有体积提示 |
| Registry / AI 索引 / Token | [G5 专项通过](scoped-governance.log)；[索引检查通过](asset-index.log)，CSS 与颜色 ledger 未修改 |
| 宽窄 Chromium | [综合 14 项](browser-main.log) + [日期 14 项](browser-dates.log)全部通过；1440×1000 和 390×844，新增六处断言与重试、完成按钮截图 |
| 标注窗口 | [908×797 六处检查通过](visual-browser.json)；[动画稳定后的截图记录](visual-stable.log)，主代理已查看截图 |
| 独立源码消费 | [140 份源码、87 份 UI 文件](consumer-validation.json)，1078 个类型文件、1791 个模块，零越界；两种宽度、四种日期模式再次通过：[浏览器记录](consumer-browser.json) |
| 交付一致性 | ZIP 对应当前 Calendar / DatePicker / Combobox / Registry 源码，三个正式图标源码及 SVG 均包含；66 个来源绑定匹配，71 份既有保护源无变化 |

额外截图脚本等待退场和入场动画完成后再观察，避免把过渡帧当作最终画面；正式 28 项浏览器检查首轮通过。取消丢弃草稿、校验禁用确定、重试成功后输入聚焦均保留。

## 可查看结果

[日期弹层](date-picker-popup-908.png) · [日期校验](date-picker-validation-908.png) · [Dialog 一级完成按钮](完成日期设置-908.png) · [Sheet 一级完成按钮](完成时间设置-908.png) · [带图标的重试](combobox-retry-908.png)。

[更新后的源码 ZIP](../g5-source-consumer.zip)已同步 Registry 图标依赖和源码闭包。现有预览已刷新到 `#date-picker`，截止日期弹层保持打开。

本轮小范围反馈由主代理逐项审阅；未重新派发独立代码审阅，初次 G5 的独立审阅保留在此前记录中。

77 项是本次反馈的专项回归；首次建设的 215 项结果属于前一源码快照，未在本轮重复跑无关组件。全库检查的既有失败没有重新处理或标为通过。实体中文输入法、Safari / VoiceOver、触屏、全新联网安装仍未验。

前态 source-bindings、最终报告、源码包与消费记录保存在本目录 before/。人眼、对比度、真实设备和发布仍分别处理。
