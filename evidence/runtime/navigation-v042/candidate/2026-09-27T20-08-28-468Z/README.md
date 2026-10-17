# Navigation v0.4.2 原稿对照证据（G1 待评审）

本材料记录实际浏览器运行与差异测量；`approved: false`，不表示 G1 已通过。冻结原稿未修改。

- 原稿：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/reference/2026-09-27T19-36-55-642Z`
- 完整候选：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/candidate/2026-09-27T20-04-03-601Z`
- A4 / Connections 最后补拍：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/candidate/2026-09-27T20-08-28-468Z`
- 两次候选运行均退出 0，11 个受控源文件在每次捕获前后 hash 一致，console error / page error 均为 0。两轮之间只有 samples.tsx / samples.css 因 A4 / Connections 最后修正变化；表中按案例选择最新证据。
- 原稿 SHA-256：`d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`；8 组初态分别截图两次，PNG hash 完全一致。
- 浏览器 Chromium 151.0.7922.34，macOS arm64，DPR 1，zh-CN，reduced-motion reduce。

| 同状态案例 | PNG 尺寸 | 平均通道差 (0–255) | 任意像素差 | 最大通道差 > 16 |
| --- | --- | ---: | ---: | ---: |
| A1-default | 1320×355 | 2.3414 | 8.6272% | 4.8489% |
| A1-selected-resource | 1320×355 | 2.0346 | 8.2183% | 4.4981% |
| A1-count-track | 610×41 | 0.1879 | 2.5270% | 0.1120% |
| A4-default | 1320×377 | 2.1877 | 5.1338% | 4.0604% |
| A4-selected-second | 1320×377 | 2.3023 | 5.2707% | 4.1761% |
| Connections-default | 1320×396 | 2.0020 | 4.7880% | 2.8466% |
| R2-default-1200 | 1200×800 | 3.8555 | 8.9409% | 4.8078% |
| R2-default-1440 | 1440×800 | 3.1310 | 7.5314% | 3.8951% |
| R2-default-1600 | 1600×800 | 2.6652 | 6.3352% | 3.2089% |

“最大通道差 > 16”指像素 RGB 任一通道绝对差超过 16，不是相似度评分，也不是通过阈值。每组保留原尺寸截图、DOM fragment、computed styles、geometry difference、side-by-side、overlay 和 difference。

## 几何核对

- A1 count：610×41；track、3 个 tab、3 个 label、3 个 count 的 10 个映射矩形均相同。Global 的 tab/label 起点整体向右 0.8906px，尺寸相同。
- A4：1320×376 逻辑画板、host、row、viewport、3 个 224×64 identity tab、panel 的矩形均相同。最终 p 上间距 9px，正文与列表原有 2px 偏移已修正。
- Connections：1320×395.390625 逻辑画板；host、row、viewport、controls、panel 矩形均相同。背景已恢复 #edf1f7；controls 214×72，padding 4px 10px 0 8px，已恢复垂直位置；正文及列表节奏已恢复。
- R2 1200 / 1440 / 1600：prototype、顶部栏、主轨、课程导航、context card、course cover、host、row、viewport、panel、page top、sheet content、table tools、bottom notice 的映射矩形均相同。1200 显示 3 个范围，1440 / 1600 显示 4 个范围。
- R2 tab：1200 比原稿宽 0.6563–0.6719px，末项 x 累积 +1.3281px；1440 各项宽 +0.25px、末项 x +0.75px；1600 四项矩形相同。
- `.cs-track` 的内在宽度与候选 flex track 测量语义不同（A4 / Connections 候选内容仅占自身宽度）；viewport、tab 和表面定位已分别比对，不把 track 本身的伸展差混作可见边界差。

## 剩余差异与范围边界

- 候选复用现有 Rain 图标；部分图标形状与冻结原稿内联 SVG 不同，截图中保留可见的 folder / course / resource 等差异，交 G1 判断。
- 保留上面的 A1 Global 和 R2 亚像素宽度差。文字抗锯齿及原稿/候选在文档中的分数坐标会进入像素差；截图未做缩放、滤镜或差异消除。
- R2 初始可见区之外，后续章节组（tree index 13 及以后）存在节奏差：候选 44px 行，相比原稿该章节头 47px 加 8px 上间距，后续 y 提前 8–11px。该部分未因初态截图不可见而宣称一致。
- A1 count 只对照导航轨道，工作面 panel 内容不在此次对照目标。
- W3 完整画板未纳入本次 parity。Connections outlined 只验证轮廓行为：选中顶线 2px / #1561f8 / top 1px / left-right 14px，不能冒充 W3 全图通过。
- Connections selected-second 有真实点击截图，未与同态原稿图做像素比较；A1 resource 和 A4 second 的真实切换有同态对照。

## 复现与证据完整性

- 原稿执行 `node scripts/navigation-v042-reference.mjs`，每次建立独立目录。原稿画板仅用 reference diagnostics 配置；A1 / A4 / R2 操作均由真实点击、键盘、输入完成。
- 候选完整执行 `node scripts/navigation-v042-compare.mjs`；本次末轮为 `node scripts/navigation-v042-compare.mjs --samples=A4,Connections`，路由和画板宽度由实际 UI 控件切换。
- R2 裁图保持 1:1 像素，以整数原点裁出1200/1440/1600×800；其余样本按元素截图。A1 count 的 reference crop 只写入候选证据目录，未覆盖基线。
- 所有运行保留历史结果；20:03 不完整运行因“诊断目录误选为参考目录”失败，失败报告仍保留。脚本已改为只接受具有完整 capture-report、8 组稳定截图且 source unchanged 的原稿目录。
- 本目录 `review-summary.json` 给出每案例的权威目录与绝对链接；完整报告和 scoped 报告各自保留 source hashes 与错误数组。
