# RN-06 独立只读复核

日期：2026-09-13。工作树：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。依据：RN-06 implementation plan、ADR0009、当前 Layout 源码与宿主示例。未修改仓库。

## 结论

当前审阅范围未发现尚未修复的新增 P1/P2，可继续准备人工视觉评审。发现的深色 H1 颜色问题已修复并实测验证。技术复核不关闭既有共享深色 Focus finding、Human Gate、对比度接受、完整 Benchmark、发布或迁移。

## 发现与修复验证

- P2：初版 `#layouts` 深色 H1 继承了旧全局 H1 颜色，实测 `rgb(20,35,60)` / 背景 `rgb(21,25,43)`，标题几乎不可读。主线在本页 `.layouts-review h1` 补 `color: inherit`。最终 Light/Dark × default/compact 四组实测均与父文字相同；深色 H1 为 `rgb(239,241,245)`。
- 主线调整设置表单 Grid 的 `items-start` 后，四组主题/密度下两个标签顶部与两个原生控件顶部均相等；保存设置使用 `primary`。该宿主调整未污染公共 Grid 默认。

## 独立实测范围

- 1280、375、320px × Light/Dark 共六组：Grid 从两列退化为一列，Split 根据实际容器堆叠；页面及 Main/Sidebar 均无横向溢出。截图与原始数据见 `results.json` 和对应 width 截图；其中初版深色标题截图作为失败记录保留。
- 十二组 Grid 边界：最大列数 1/2/3/4 × 容器 1000/400/149px，minColumnWidth=150、gap=20。均未超过最大列数，149px 下缩为一列且无横向溢出。
- Split 真实内容盒阈值：主区320+侧区320+gap24，额外 padding24 与 border4；总宽719.5时堆叠，720与720.5时并排。证实判断使用扣除 padding/border 的容器宽度。
- Split Main/Sidebar 各自存在滚动范围。滚动 Main 到170不改变 Sidebar，滚动 Sidebar 不改变 Main。
- 从侧区收起后焦点回到外部展开按钮；草稿值与原 input DOM 节点保留。非侧区输入聚焦时通过宿主状态收起，不抢该外部焦点。原生输入聚焦后隐藏侧区的焦点回退也通过。
- 实际宿主打开侧区 Select 后收起：Portal 关闭、侧区隐藏；重新展开不会复开旧 Portal，草稿仍保留。
- 上述边界结果见 `boundaries.json`，共21条记录（含最终H1修复检查）。最终配色、字段对齐、primary及两pane焦点实色见 `final-paints.json`，Light/Dark × default/compact共四组，配有最终截图。
- 亲自运行 `pnpm exec vitest run packages/layouts/src/layout.test.tsx`，4/4通过。
- 亲自按 `evidence/runtime/layouts-v1/baseline.json` 对1925个 protectedSha256文件计算SHA256，全部相同。既有 UI/Foundation 保护范围无改动。

## 实际颜色与焦点边界

| 对象 | Light | Dark |
| --- | --- | --- |
| 页面背景 | rgb(242,244,255) | rgb(21,25,43) |
| H1 / 页面文字 | rgb(20,35,70) | rgb(239,241,245) |
| 示例正文 | rgb(58,72,101) | rgb(211,218,240) |
| 辅助文字 | rgb(73,93,135) | rgb(183,193,224) |
| Pane 背景 | rgb(247,249,255) | rgb(26,31,51) |
| Pane Focus outline | rgb(61,123,255) solid 1px | rgb(42,93,203) solid 1px |
| Pane Focus halo | rgba(61,123,255,0.2) 0 0 0 3px | rgba(56,96,255,0.3) 0 0 0 3px |

两个pane在两种主题/密度下均确实进入 `:focus-visible`。以上是浏览器实色记录，不能据此宣称已获Focus对比度接受；既有深色共享Focus不足保持open。

## 未覆盖的边界

本次独立浏览器使用开发预览5193，不将主线生产22项报告计入亲自运行结果。未单独通过CDP核对实际平台字体，未运行真实读屏或其他浏览器；未评审完整业务Benchmark、拖动调宽、持久化、多Pane策略。运行时模块fixture与截图只位于临时目录，不进入source扫描范围。
