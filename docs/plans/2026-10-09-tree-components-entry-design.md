# Tree 与 ManageTree 的 Components 入口归并

依据：2026-10-09 用户指出 Tree 等展示应放在 Components 内部。
System Mode，仅整理现有 Playground 文档入口，使用当前 card-v2 工作区。

沿用 D01 按用途提供入口，将 Tree 与 ManageTree 收入 Components 的「导航与工作区布局」目录；首页删除这两个独立链接，两页均返回 Components。现有 `#tree`、`#manage-tree` 路由和 Tree 页到 ManageTree 的关联链接继续使用。目录描述标明 ManageTree 的草稿编辑与保存组合用途，其 Pattern 身份、共享实现、外观及原有验收状态不变。没有新增设计方法、Token、资产或依赖。

验证范围：现有组件路由及首页测试、Playground 类型检查；浏览器检查首页 → Components → 两页 → Components 的路径和窄屏目录。未验证假设：项目其余目录入口是否存在类似遗漏，本次不扩大为全库审计。

本次结果：`pnpm test apps/playground/src/routes/component-assets.test.tsx apps/playground/src/routes/playground-shell.test.tsx` 的 12 项测试通过；`pnpm --filter @rain-next/playground typecheck` 通过。使用当前源码运行 `http://127.0.0.1:5369/`，浏览器实际点击首页 Components、Tree 卡片及返回链接、ManageTree 卡片及返回链接，均进入对应页面并恢复目录。390px 窄屏中两张卡片自然堆叠，键盘可聚焦 ManageTree；文档宽度与窗口宽度均为 390px。仅验证此次入口归并，未重跑 Tree 完整交互、辅助技术或全仓检查，未执行 Git、发布或 Figma 操作。
