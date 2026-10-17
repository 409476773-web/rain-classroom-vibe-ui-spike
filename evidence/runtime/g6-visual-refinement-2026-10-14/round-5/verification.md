# G6 第五轮 · 短窗口与完整资料名称

用户要求“继续下一轮”，延续五页页面私有试改授权。本轮视觉与交互增量仅在课程/讨论 Material；11 个页面文件基线中仅课程场景的 tsx、css、test 三个变化。公共默认、Token、依赖、Gate 和 Git 状态没有本轮增量操作。

## 比较与判断

沿用 Rain Designer v0.5 的信息作用、可操作暗示、退出恢复与长内容条件检查。复查现有五页源码的换行、代码/表格局部滚动与长阅读保护，实际新增问题集中在资料名称。

[Base UI Tooltip 官方指南](https://base-ui.com/react/components/tooltip) 建议空间受限时将重要说明内联或放入 Popover；[Popover 官方文档](https://base-ui.com/react/components/popover) 提供按钮锚定的可访问浮层。这里据此选择查看层，视觉仍使用本库实际 Rain 字体、表面和焦点 Token。没有用参照库的默认视觉替换 Rain。

## 实际问题与处理

- **短窗口完整名称裁切**：320×256 下，244 字节合法 ASCII 文件名的原 Tooltip 高 334px，top 148 / bottom 482，后半名称落在视口外。失败状态见 `screenshots/filename-short-before.jpg` 和 `filename-short-before.json`。
- **名称查看**：复用已有 Popover，标题保留单行省略，按钮明确 type=button。点击、Enter 或 Space 打开完整原名称；引擎负责 Portal、碰撞定位、聚焦和关闭。公共现有 available-height 与 overflow-y:auto 直接限制查看层，不增加私有定位引擎或覆盖公共高度计算。
- **文字与焦点**：私有完整名称为 13/20、anywhere 换行，标题为相同字号的半粗字重。CSS 后代选择器穿过现有 DensityProvider；不把 display:contents 当成不存在的 DOM 包装。名称按钮承担省略，外层 AttachmentTitle 允许焦点框露出；原 124px 标题宽度保持，避免新按钮的 1px outline / 3px halo 被裁切。
- **退出后继续输入**：Escape 返回名称按钮；在查看层打开时移除资料，清理 Portal 并把焦点还给保留的草稿，preventScroll 避免页面跳动。等待发送期间名称入口沿用 disabled 边界。

## 浏览器证据

1. 320×568 的长无空格草稿、回复组合未见新的表单横向超宽。320×256 的修正后浮层宽 304、高 207px，边界 left 8 / right 312、top 41 / bottom 248，位于视口内。内容 scrollHeight 272 / clientHeight 205；真实 End 键将 scrollTop 移到 67，`.pdf` 后缀和末行位于浮层内。见 `filename-short-after.json`、`filename-short-scroll.json` 及对应截图。
2. 320×568 深色、紧凑密度：浮层继承 dark/compact，边界 left 8 / right 312、top 300 / bottom 560，表单宽和 scrollWidth 均 286px，文档宽 320px。见 `filename-dark-narrow.json`。
3. 真实 Tab 焦点：名称入口前后宽均 124px，修正后父标题 overflow:visible，完整 outline/halo 可见，省略仍由按钮承担。见 `screenshots/filename-focus-before.jpg`、`filename-focus-after.jpg` 和 `filename-focus-after.json`。
4. 查看层仍打开时点击移除：浮层数 0、资料入口移除、原草稿保留，activeElement 回到“输入讨论内容”。见 `filename-remove-final.json`。
5. 原中文文件名实际发送：pending 时名称 disabled、文本框 readonly；完成后新增自己的消息仅一条，原文件名完整保留，草稿/回复/待发资料清空，文档没有横向增宽。见 `filename-pending.json`、`filename-sent.json`。390×844 下，从已发送资料打开名称查看层，高 114px、宽 320px，left 17 / right 337、top 438 / bottom 552；见 `filename-posted-narrow.json`、`screenshots/filename-posted-narrow.jpg`。

窗口尺寸复查不等同真实浏览器 200% 缩放；未执行实体触屏、VoiceOver 或完整对比度验收。样本文件仅用于本地名称和布局，不验证 PDF 内容或真实上传服务。临时 viewport override 已调用 reset，保留可交互预览标签。

## 自动与独立复核

- 两种表单新增键盘打开、不会误提交、Escape 焦点恢复与移除清理回归，先红后绿；移除回到草稿另外先红后绿。最终三个相关页面文件 **41/41** 通过，见 `page-tests.json`。
- 最终构建一度被另一份 `g6-task-details-drawer.test.tsx` 的匿名 mock 函数遗漏 this 类型阻断。本轮只追加 `this: HTMLElement`，测试逻辑不变，7/7 辅助回归通过；见 `build-unrelated-type-error.log`、`auxiliary-test.json`、辅助文件前后哈希。这是构建修复，未扩展抽屉视觉范围。
- 最终 Playground 构建包含类型检查，退出码 0；原有大资源块警告仍存在，见 `build.log`。
- 冻结的 **36 个公共源文件哈希一致**；11 个页面源文件仅上述三个变化。辅助测试单独记录，不混入视觉改动数。
- 独立有限源码复核指出标题父级可能裁切焦点框；已通过实际前后截图确认并修正。默认 Popup 聚焦、文字后代样式、可用高度滚动、pending 禁用与卸载未见其他源码阻塞。

本轮完成局部实现和验证，保持页面私有试改，不代表人工视觉接受或公共资产晋升。
