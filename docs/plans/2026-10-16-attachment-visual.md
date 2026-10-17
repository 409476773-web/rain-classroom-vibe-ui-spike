# Attachment 视觉与交互整合

用户在完成成熟组件调研和白底／灰底整合稿后确认方向；本轮执行该有限实现。目标图：`/Users/wenchengkai/.codex/generated_images/01a13e06-4fb9-7010-88fd-3442ae41cd7a/exec-27639e97-f8c9-472a-94ad-724620b33f3d.png`。

## 实施边界

- 保持原 Attachment 九个 Parts 与样式源文件不变，在现有附件工作流 Recipe 中更新文件列表。
- 使用 Rain 既有彩色文件图标、IconButton、DropdownMenu、Dialog、Progress 和 Token。标题保留扩展名；副文案仅大小和必要状态；状态独立小位，正常态安静；下载主操作，信息／打开／替换／移除进入更多菜单。
- Recipe 新增 `surface="outlined" | "filled"`，默认 outlined。权限、异步操作、替换保留旧资源、取消／重试、焦点恢复继续有效。
- 七种业务状态的白底／灰底对照留在页面私有示例。报告、字幕、审核不进入共享文件数据合同。演示数据与模拟操作明确标示。
- 不改 Tokens、依赖、上传引擎、公共 Attachment 默认值、其他 G6 资产，不发布、不写入 Figma、不创建 Git 提交。

## 依据与取舍

已读 Rain Designer v0.5、原型设计入口、图标选择规范与实际静态导出。视觉目标结合 Ant Design X FileCard 的文件身份、TDesign 上传状态位置、assistant-ui 的轻量进度表达；参考仅用于结构与交互，外观仍由 Rain 资产决定。

40px 文件区域、14px 标题、12px 元信息、32px 图标操作目标；必要说明可换行。360px 容器保留文件扩展名和操作区，业务示例由两列变单列。图标优先正式资产，字幕使用正式“字幕”图标，原稿 CC 不作为新资产授权。

## 检查

1. 保存本轮基线，保留旧功能证据。
2. 更新 Recipe 操作测试，再实施菜单、信息弹层与紧凑布局。
3. 接入独立七状态示例；核对每个操作只影响所属对象。
4. 跑附件相关测试、类型检查及 Playground 构建；按受影响交互重跑浏览器测试，输出到新证据目录。
5. 对照确认稿检查亮／暗、桌面／360px、长标题、键盘、菜单到弹层及删除焦点，保存截图和 `design-qa.md`。
6. 更新本轮有限来源绑定与验证记录。自动验证、视觉自查、用户运行验收各自登记；Human Gate 仍待用户。

本轮证据：`evidence/runtime/attachment-visual-2026-10-16/`。旧功能轮 baseline、source-bindings 和报告保持历史含义。
