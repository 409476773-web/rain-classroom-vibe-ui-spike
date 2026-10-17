# 四组演示数据 · 2026-10-11

本轮为用户明确授权的本地演示数据修改。工作区为 `.worktrees/card-v2`，实时服务为 `http://127.0.0.1:5173/`，服务目录已核对为当前 worktree 的 `apps/playground`。

## 已实施

- `#chart-line` → 交互与状态 → Line Chart – Trio with Brush：30天三线数据改为3组固定走势，保留曲线、点阵、日期、Brush与全部渲染参数。
- `#chart-bar` 默认分组柱，以及 Bar Chart – Multiple Series：3组高低、近值和差距不同的数据。完成不超过参与；官方样例完成与进行中互斥且和为参与人数。旧makeBars、其他20个官方柱变体、默认mini柱与互斥等级堆叠保持原样。
- `#chart-business` 构成和进度：3组比例与完成值，首行默认15/6/4、68%，随后82%、61%。count/trend沿用原4步循环，完整行12步重复。同源分段、饼、环、横向堆叠、卡片、表格、列表同步。
- zero/missing/invalid保持原边界含义；mini的48组异常状态与修改前整行相等。normal/long/single的36组身份、数量、趋势、目标值保持原值。

## 当前验证

- 相关单元130项通过：三线9、分组柱41、mini80；新合同均先在旧代码验证失败，再实施。`trend-unit.log`、`bar-unit-green.log`、`mini-data-unit.log`。
- playground类型检查与构建通过：`playground-typecheck.log`、`playground-build.log`。构建仍报告大文件提示。初次检查发现新增测试快照数组缺少类型声明，已修正并重跑通过。
- before/after均按蓝灰单色、正常态、revision0、减少动画，保存1440/390五个目标区域；10组宽高全部相等，零页面异常。before另保留未修改bar-default作为对照。
- `scope-verification.json`：325个基线文件仅本轮授权源码、测试及phase发生变化；216个公共charts源码、冻结样式、Tokens与依赖保持。
- 独立源码与默认截图复核无阻塞；三线3组实际导出闭包、默认/官方分组柱两个导出闭包通过。root在实时IAB逐一查看三线三态；新构成和进度已显示。
- 最终交互验证16/16通过（4个目标×1440/390×普通/减少动画），4处真实UI下载、9个源码payload逐字一致；0页面异常、12个源哈希最终匹配。普通动画有中间几何，减少动画直接终态；Brush键盘/指针/重置、Tooltip与精确表、mini卡片/表格/详情、12步循环及零分母/缺测均通过。详见 `interaction-browser/facts.json` 与 `independent-browser-review.md`。

## 状态与限制

本地演示；视觉Human Gate等待用户查看。自动检查与截图复核不代表视觉接受、对比度合规、Safari/VoiceOver或真实触屏验证。
本轮不重跑全库T22、不作发布、Figma、业务迁移或Git提交/推送。既有工作区修改保留。
