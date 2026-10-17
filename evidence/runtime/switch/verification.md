# Switch runtime visual verification

日期：2026-09-20（Asia/Shanghai）。范围：`#switch` 本地 Playground，视觉 Human Gate 仅覆盖 `switch-runtime-visual-only`。

- 用户在真实运行页面检查并确认 Switch 的三档尺寸、普通/选中、禁用、加载及禁用加载状态。
- Loading 状态显示现有 `ButtonLoadingIcon`，同时保留开关轨道与焦点可见性；禁用加载保留图标且由原生 disabled 主导焦点行为。
- 受控设置的说明文字已使用较浅的 Rain 语义色与 14px 字号，宿主行布局间距收紧为 4px。
- 页面路由：`http://127.0.0.1:5199/#switch`。

本次确认只接受运行时视觉范围，不接受对比度、辅助技术、发布、Figma、业务迁移或 Git 操作。
