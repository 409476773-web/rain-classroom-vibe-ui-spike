# Dropdown 结束按钮修订 · 2026-09-14

用户指出“完成设置”是整组设置的结束动作，应以较小的一级或二级按钮与选项区分；随后明确：一个按钮铺满行宽，两个按钮各自保留较紧凑的宽度。

## 最终实现

视图设置示例通过已有 `DropdownMenu.Item.render` 渲染公共 `Button size="small" variant="secondary"`，底部用分隔线与选项区隔开。按钮高度沿用 small=32px；利用 `only:w-full` 原生 only-child 布局使单按钮铺满可用行宽，双按钮按内容定宽、右对齐并保持 Space/8 间距。正常 Popover 对照示例采用相同按钮布局。

菜单结束动作仍由 Base UI Menu 管理单个 menuitem；`nativeButton=true` 适配原生按钮的 Enter/Space，render 透传事件、ref、ARIA 与焦点属性，只替换原行类名以复用 Button 外观。没有嵌套第二个交互控件，没有新公共 API、全局样式或控制器。

本例设置即时生效，“完成设置”仅结束操作。双按钮仅验证布局；未来采用“取消”时，由宿主定义草稿与回滚语义，不为本例添加无意义的取消动作。

## 验证

新增两主题用例检查：单按钮占满可用宽度、双按钮保留自然宽度及 8px 间距、原生 Button 身份/尺寸/二级外观、无嵌套按钮、End 到达、Enter/Space 激活、Escape 与关闭后焦点恢复、320px 窄屏与 Popover 完成按钮。双按钮几何使用临时同级节点探针，检查后立即删除，不激活克隆节点；这不代表取消业务行为已实现或验证。

先保留旧普通行失败及旧小宽度失败，再实现对应样式。最终菜单 Chromium 19/19、相关单元 25/25、类型、生产构建与 Tailwind B2 通过。独立代码复核未发现可复现 P1/P2，并另行复跑 25/25 与 B2。原始输出见 footer-checks.log。截图 footer-light.png / footer-dark.png 已目视检查。

## 验收

implementation: completed
automatedVerification: passed
independentReview: passed
humanGate: awaiting_human

140px 宽度已由用户“确定没问题。”于 2026-09-14 验收，精确记录在阶段的 widthRefinement。本次结束按钮为后续独立视觉修订。既有颜色、发布、迁移、Git 与全库边界登记失败均不由本次闭合；没有重复扩大或重跑无关工作。
