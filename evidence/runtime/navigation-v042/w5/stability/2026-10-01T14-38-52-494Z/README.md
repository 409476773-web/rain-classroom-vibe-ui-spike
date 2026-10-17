# S4 原始连续帧稳定性诊断（保留）

在同一原尺寸浏览器状态下连续采集五帧，不改源码、无 mask、无阈值放宽。采集源码前/后锁一致：`True`；page/console error：0/0；computed/geometry/focus/hover 指纹稳定：`True`。

首帧与后续帧可能在九个圆角栅格像素发生 ±1 差，原始帧与首对 false 判定全部保留。后续自然稳定对见 `finalStablePair`，未把首对改为 stable。详见 [stability-report.json](stability-report.json)。

此目录不是 Human Gate 通过证据；14:47 属于颜色校准前的几何闭合状态，后续 S feature 颜色校准会另建新目录。
