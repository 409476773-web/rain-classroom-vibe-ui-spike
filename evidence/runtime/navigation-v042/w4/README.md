# W4 · Workspace 与 S1–S6 证据

2026-10-01，实际实现目录 `.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。G1 的 A1/A4/R2 视觉验收保留；本批新增 controller 与组合仍待 G2 人工验收。

公共层为 `workspace-state.ts` 纯状态核心及 `WorkspaceLayout / RecoverableRegion / RegionRestoreTrigger / PaneSplitter / useWorkspaceLayout`。只管理 requested/effective/session、身份隔离、宽度预算、临时层、pin、focus、偏好存储；业务草稿/评分/播放/页面内容由 Recipe 拥有。S1/S2/S3/S4/S6 实际复用 R 正文；S5 使用冻结原稿的文档与 Ribbon。

原稿 [24 状态与样式补测](reference/2026-10-01T11-55-02-325Z/) 在真实 Chromium、DPR1、100% 原尺寸操作和双截图，未改原稿。候选最终对照索引见 [本批总报告](../../../../../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/reports/G2-composition-candidate.md)。较早 compare 目录为保留的诊断记录，不能当最终通过记录。

[R2 接入回归](r2-regression/2026-10-01T11-43-02-349Z/) 保留既有品牌节点、Logo/Avatar、scope/Tree 工作面，实测与 review-08 的主体位置一致；实际边界拥有者替代旧假边界，局部约5px边界绘制差异单列。R2 注册表原 G1 sourceSnapshot 保留，currentSourceSnapshot 记录当前 controller。

最后 7 项浏览器检查通过，输出 [test-artifacts-final-10](test-artifacts-final-10/)：全部隐藏后的外部恢复、第一次点击另一控制器、固定/取消固定、嵌套弹层 Esc、专注恢复与编辑草稿、Splitter 键盘/指针、原品牌反向切换与 reduced-motion。纯核心/adapter/S 单元检查计入 W3–W5 的 87 项，不重复计数。

```sh
pnpm exec playwright test --config tests/e2e/navigation-v042-w4.config.ts --output evidence/runtime/navigation-v042/w4/test-artifacts-final
```

独立 adapter/S 复核关闭四项 P2，见 [复核及关闭记录](../w5/independent-adapter-review.json)；该作者自己的纯核心与 R4–R6 业务实现不纳入这份独立范围。后续本页 toolbar parts 和 S4 面板头按原稿实际渲染校准，旧审阅源哈希保留。VoiceOver、全量对比度、多浏览器、硬件帧率、G2/G3 及发布均未通过本记录自动关闭。

2026-10-03候选05：[最终27S＋19R索引](compare/2026-10-03T03-18-20-786Z/review-evidence-index.json)只替换受影响的S4批改及4个R4批改场景，其余41例保留原始源锁并登记范围沿用。批改顺序144×34px、24×2px指示线实测几何差0，局部可见溢出关闭裁线，原有AI图标补齐；[绘制与稳定性记录](compare/2026-10-03T03-18-20-786Z/final-marker-paint-measurement.json)保留S4截图1行量化差和原始9像素/max1稳定性false，自然连续补测另存。原稿及旧索引未改，G2待人工。
