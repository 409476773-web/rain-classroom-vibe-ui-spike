# Attachment 整合视觉与交互验证

日期：2026-10-16（Asia/Shanghai）。工作区：`.worktrees/card-v2`，分支：`codex/card-v2`。预览：`http://127.0.0.1:5473/#attachment`。

## 范围与结果

按已选整合稿完成 `AttachmentList` 的 outlined/filled 两种外观、正式彩色文件图标、扩展名保护、大小与必要状态、小状态位、下载主操作和更多菜单；七种内容/任务状态留在页面私有 `AttachmentStatesDemo`。原 Attachment 两个展示源文件、上传 Hook、资源工具、预览模块与 XHR 适配器保留；本轮由 List 传入实际页面主题。

实施完成、范围内自动检查通过、AI 实页视觉检查通过。Human Gate 为 `awaiting_human`，发布为 `unpublished`，对比度接受为 `not-granted`。不代表其他 G6 组件、全库回归、生产接入或 Figma 接受。

## 自动检查

| 检查 | 最终结果 | 证据 |
|---|---|---|
| 附件与宿主单元测试 | 11 文件，192/192 通过 | `unit-tests.log` |
| Chromium 桌面/窄栏 | 14/14 通过，无跳过、失败或 flaky | `browser-tests.log`、`browser/report.json` |
| UI 类型检查 | exit 0 | `final-ui-typecheck.log` |
| Playground 类型检查 | exit 0 | `final-playground-typecheck.log` |
| 测试源码类型检查 | exit 0 | `final-test-typecheck.log`（成功时无输出） |
| 工作区构建 | exit 0 | `final-build.log` |
| 本轮来源与文档检查 | 结果见生成报告 | `scoped-governance.json` |

单元范围为原 Attachment、附件工作流各模块、工作流示例、状态示例和 G6 媒体宿主。最后一轮浏览器与构建在更多按钮固定列修正后完成。构建保留已有的大包体提示，本轮未声称完成包体优化。

浏览器命令：`pnpm exec playwright test --config tests/e2e/attachment-visual.config.ts`。该配置沿原功能夹具，输出到本轮新目录。覆盖真实 multipart 上传、HTTP 失败重试、取消防迟到成功、真实下载字节、替换原件保留、拖放及数量校验、只读/独立权限、预览回退、焦点恢复、长文件名、亮暗主题、图像与有限 PDF。新增断言比较有/无主操作的三行更多按钮实际 x 坐标。

## 复核与修正

独立技术审查发现更多按钮原 `[data-slot=trigger]` 选择器会被 IconButton 的实际 slot 覆盖，导致无主操作时错列；已改为 `[aria-haspopup=menu]`。对应真实布局断言先失败（`alignment-red.log`），修正后完整 14 项通过。此前深色预览主题的回归先失败（`theme-test-red.log`），List 传入页面主题后 192 项通过。字幕错误图标白色遮罩与状态槽宽度问题亦已修正。当前无遗留的本切片 P0/P1/P2。

## 视觉与交互证据

已在同次视觉输入中直接查看确认稿与最终 `screenshots/desktop-context.png`，逐项检查字体、空间、颜色、图标及文案；详见根目录 `design-qa.md` 本轮追加节。它完整显示两外观七行与字幕附属区，保留页面上下文。深色证据为 `screenshots/desktop-dark.png`；360px 的状态、菜单及真实工作流为 `screenshots/narrow-top.png`、`screenshots/narrow-menu.png`、`screenshots/narrow-workflow-filled.png`。早期截取不完整的 `desktop-states.png` 不用于验收。

360px 页面无横向溢出，文件卡片约 294px；文件名主体省略，扩展名保留，必要状态说明换行。实际菜单在视口内；字幕下方操作可换行。已检查报告打开后未读提示清除、字幕重试后独立更新、恢复示例、菜单/弹层关闭和焦点返回。两列共享示例状态。

有意差异：正式 Rain 视频图标为紫色；字幕使用已有中文图标；主题映射使用既有语义 Token；课程导读实际大小为 965 B。尺寸随真实文档宽度响应，未声明与生成稿像素相等。

## 真实功能与模拟边界

课程工作流的选择、图像/PDF 预览及下载使用真实文件；真实 XHR 上传行为由独立测试服务验证。Playground 上传与保存明确为本页模拟。七状态示例除课程导读真实 PDF 外，其余媒体、报告、字幕、审核和相应业务操作为页面演示，不能据此声称具备生产服务。

真实后端鉴权、配额、安全扫描、资源关系事务、持久化、媒体播放、报告/字幕服务和审核系统未由本轮实现。Safari、VoiceOver、真实触屏、大文件内存及完整对比度未验证。原功能轮与其他阶段的历史来源绑定和 Gate 继续保留。

本轮基线：`baseline.json`；当前绑定：`source-bindings.json`；重检入口：`node scripts/verify-attachment-visual.mjs`。重检只写本轮 `scoped-governance.json`，不改旧功能证据。

共享工作区收尾时观察到 `status/current-phase.yaml` 的 `conversationComposer20261015` 节已有独立更新。本轮保留该节，前后摘要记录在 `concurrent-status.json`，不改写或授予其验收。范围检查精确绑定该节当前摘要，排除此已记录变化后，其余阶段字段与本轮基线一致。
