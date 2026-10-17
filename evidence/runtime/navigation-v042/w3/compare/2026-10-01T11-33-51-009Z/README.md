# C5 最新实际操作对照

本次在冻结原稿与候选页实际点击第二个预览对象「等效电路的求解方法」，双方选中状态断言成功；默认和选中截图均在 DPR1、100%原尺寸捕获两次且 SHA稳定。零页面/控制台错误，捕获过程中候选源码与冻结源 SHA未变化。不是 Human Gate。

原稿外框612 × 298，候选613 × 298；因此严格图片指标记录 `incomparable-size`。`*-native-size-review-comparison/` 只在右侧补白以对齐共同画布，未缩放图像。原稿与候选三行 y/height 分别10/89、99/100、199/89，完全一致；预览缩略图均102宽、高65/76/65、坐标22/22、22/111、22/211。

已打开默认 side-by-side 图片：数字 variant 属性产生的源蓝白几何已恢复，三张预览内容与换行位置一致。剩余差额为外框1px宽、Rain箭头图标形状/线宽和少量文本颜色。`geometry-difference.json` 的 preview wrapper与源完整 thumbnail DOM 层级不同，padding/border差异不能单独解释为可见像素差异，应结合fragment与截图。

关键图片：

- `C5-preview-1440-native-size-review-comparison/side-by-side.png`
- `C5-preview-selected-1440-native-size-review-comparison/side-by-side.png`

重现使用 `RAIN_COMPARE_CASES=C5-preview RAIN_COMPARE_OPERATIONS=1` 与既有 `scripts/navigation-v042-w3-compare.mjs`，总报告 `comparison-report.json`，不覆盖早期证据。
