# 当前布局与三级间距试排：人工视觉接受

日期：2026-09-13。用户在外卡补接完成、两组控制入口和25项生产回归结果交付后，明确回复：**“确定。没问题”**。

本次决定登记为`layouts-spacing-runtime-visual-only`。接受范围是当前`#layouts`页面的组合排版、外层“课程设置/课程资料”Card及内部资料列表/详情Pane的三级间距应用，以及外卡/面板分别调整的可见结果。继续采用边缘留白≥分区间距≥信息间距，允许自由取现有Rain Space及相等值。

这是外卡补接之后的新确认；不同于此前先肯定、随后指出外卡未接入的那次反馈。不把当前确认写成用户逐项查看过全部数值、视口、主题、密度或自动测试矩阵，也不外推为全库组件视觉通过。

## 登记与版本

- `status/current-phase.yaml`中仅`layoutsV1.spacingHierarchy.humanGate`记为`accepted`，附完整日期、决定来源、用户原话、scope及本证据路径。
- 四份Layout Manifest和Registry同步具scope的`spacingHierarchy`接受记录；父RN-06及公共资产整体`humanGate`保持`awaiting_human`，候选身份和未发布状态保留。
- Card、Dialog、Foundation及其他既有接受范围不变。深色Focus对比度、真实辅助技术、完整业务Benchmark、发布、Figma和业务迁移继续独立记录。

确认所对应实现见[外卡续修验证](verification.md)，当时生产检查25/25、专项单元8/8通过。独立只读核对13份实际运行源、相关入口与包配置以及1925份受保护文件，均对应已测版本，见[范围与版本复核](visual-acceptance/independent-review.md)。本轮只改接受登记、校验和文档，没有调整运行UI，也没有重跑浏览器或扩大历史验证结论。

完整决定必须通过精确校验；缺少决定字段、扩大scope、自动/独立检查状态倒退或提前推进父Gate均不被接受。相关检查在[登记检查日志](visual-acceptance/logs/)单独记录，变更前元数据见[before](visual-acceptance/before/)，最终摘要见[metadata-sha256.json](visual-acceptance/metadata-sha256.json)。

登记后验证：3/3专项治理测试通过，完整治理检查通过，差异检查通过。原25项生产浏览器结果仍属于已交付版本的运行证据，本次未把它重记为新一轮浏览器执行。
