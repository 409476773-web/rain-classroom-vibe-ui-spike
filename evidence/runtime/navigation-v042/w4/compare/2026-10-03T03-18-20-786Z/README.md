# G2 追加原尺寸视觉证据 · 2026-10-03

只追加 5 个受影响批改场景，保留旧索引和原始失败标记。人工视觉 Gate 仍待评审。

- [完整 27S + 19R 索引](review-evidence-index.json)
- [46 个场景路径、尺寸、来源锁检查](final-evidence-validation.json)
- [标记实际像素与原始双截图诊断](final-marker-paint-measurement.json)
- [代表 S4 并排对照](S4-grading-1440-comparison/side-by-side.png)

5 个批改方式组均为 144 × 34px；两端的组、左右按钮范围与 24 × 2px 标记几何差额为 0。source 父 button 标记隐藏、子 label 标记可见；candidate 使用 option 标记。右侧按钮组恢复 220px，图标宿主 18px；items overflow:visible，不再裁掉标记下沿。

新原稿两次独立采集均 byte 相同，冻结 SHA 不变。候选 4 个默认批改场景的初始双 PNG 仍有 9 个角落像素 / 最大通道 1 的自然绘制差；原始 false 保留，另提供自然帧 2–5 相同的末尾 4/5 帧。selected 场景原始双截图 byte 相同。全部采集 0 page / console errors，9 文件前后来源锁不变。

完整索引沿用其余 26S / 15R 共 41 个不受 grading 子树变更影响的历史截图，并逐项登记作用域原因。旧截图的来源 SHA 不改写为当前源码。

几何一致不等于像素相同；字体、官方图标及原生 / 共享控件的形状仍由人工评审。原生画板的文档坐标有不同分数部分，标记 raster y 仍有 ±1 行差额；这些原始差额保留，不修复裁图。本文不替代 G2 人工视觉验收。
