# Attachment 功能补齐 Implementation Plan

**Goal:** 在现有 Attachment 外观和九个 Parts 上补齐用户确认的九组附件功能，形成可复用的文件选择、校验、上传接入、预览、下载、移除和替换流程。

**Architecture:** System Mode；保留 `ui-attachment` 展示合同，新增独立 `recipe-attachment-workflow` 候选。业务权限与文件服务由宿主提供，配套组件消费稳定文件记录；上传 Hook 管理本地待处理文件与请求取消，不内置生产服务。Playground 使用真实本地文件与明确标注的上传适配演示，不声称上传到服务器。

**Tech Stack:** 既有 React / TypeScript / Rain Attachment、Button、Progress、Dialog、Popover；原生 File、Blob、AbortController、XHR；不安装依赖。

## 授权、来源与保留范围

- 2026-10-15 用户先要求功能调研和补齐清单，讨论后改代码；在收到九组功能与分层建议后回复“确定”。本轮按该范围实施功能，样式与交互方案研究保留为下一步。
- 已读当前 AGENTS、Brief、G6 阶段、Attachment Manifest / README / 源码 / 测试，Visual Evidence 与 Benchmark 索引。关注 BM-B 文件选择与失败恢复参考，不复制整个业务表单。
- 参考：shadcn Attachment、Ant Design Upload、Ark File Upload、Mantine Dropzone、Notion 文件与媒体、Google Classroom 附件、Teams 批阅的官方文档，链接见本计划结尾。
- Rain Designer 本次使用 I1–I5 与 §6：文件、上传、操作反馈保持对象一致；错误可恢复；桌面/窄屏检查动作归属和内容可读性。沿用原外观，新增结构只为功能容纳，不做样式方向探索。
- 现有未提交工作完整保留。基线在 `evidence/runtime/attachment-functions-2026-10-15/before/`。不 commit、push、发布、写 Figma 或接入业务生产服务；人工视觉、对比度及设备验收不自动通过。

## 合同

- `AttachmentRecord`：稳定 id、名称、大小、MIME、可选本地 File / 资源地址 / 缩略图 / 上传人时间；分别记录上传状态、资源可用性、逐操作权限。
- `AttachmentList` 接收外部记录与动作；`AttachmentPicker` 接收选择/拖入回调；`AttachmentPreview` 只管理图片/PDF预览与回退；默认下载实际文件内容。
- `useAttachmentUpload` 持有记录并通知宿主；可从初始记录回填、显式 reset；选择和替换走同一校验。状态通过适配器返回，支持确定/未知进度、处理中、重试、取消和晚到结果隔离。
- 替换任务保留原记录与资源直到成功；失败可重试且原文件可用。移除可由异步宿主动作拒绝，失败保留记录。默认移除只影响集合。
- 校验：类型、单文件大小、总大小、数量、空文件、重复策略和自定义校验；合法/拒绝逐项处理。重复依据本地文件元数据，不声称内容哈希去重。
- 图片真实预览；PDF 采用浏览器能力，始终保留打开/下载回退；Office/压缩包只提供文件操作。元数据与资源URL由宿主负责，安全URL协议受限。
- 不实现后续增强：粘贴/资料库/文件夹/相机、批量操作、音视频播放器、断点续传、Office转换、权限服务、作业提交/批改。

## Task 1：数据、校验与信息处理

Files: `packages/ui/src/attachment-workflow/{types.ts,attachment-file-utils.ts,attachment-file-utils.test.ts}`。

1. 先写混合合法/非法、数量与容量边界、同名不同文件、重复、替换排除旧项、未知类型/大小的行为测试。
2. `pnpm exec vitest run packages/ui/src/attachment-workflow/attachment-file-utils.test.ts` 确认缺失行为失败。
3. 实现纯函数；再次运行至通过。无需新增文件引擎或依赖。

## Task 2：可取消上传与安全替换

Files: `packages/ui/src/attachment-workflow/{use-attachment-upload.ts,use-attachment-upload.test.tsx}`。

1. 先测上传状态、真实适配参数、未知进度、部分失败、取消/移除/重置/卸载后的迟到结果、快速连续添加、替换失败保留原文件、移除失败。
2. 运行专项测试确认失败；实现每个文件任务的 AbortController 与身份检查。
3. 暴露 items、rejections、summary、addFiles、start/retry/cancel/remove/replace/reset；事件由一个状态源通知宿主。
4. 可提供 `createAttachmentXhrUploader`，真实发送 FormData，响应由宿主解析；以本地测试服务器验证请求、进度和取消，禁止推导生产接入。

## Task 3：文件资源、预览和下载

Files: `packages/ui/src/attachment-workflow/{attachment-resources.ts,attachment-resources.test.tsx,attachment-preview.tsx,attachment-preview.test.tsx,attachment-preview.css,attachment-preview.css.d.ts}`。

1. 先测 Object URL 更换/卸载释放、正确文件下载、危险地址拒绝、预览格式与失败回退、独立权限、Dialog 关闭。
2. 实现资源辅助与可控预览组件，使用既有 Dialog/Button；不增加预览引擎。
3. 运行专项测试与类型检查；浏览器验证图片/PDF/未知格式和实际下载字节。

## Task 4：可复用列表、选择入口与真实示例

Files: `packages/ui/src/attachment-workflow/{attachment-list.tsx,attachment-list.test.tsx,attachment-picker.tsx,attachment-picker.test.tsx,attachment-workflow.css,attachment-workflow.css.d.ts,index.ts,README.md}`；更新公共 exports/styles 与 `apps/playground/src/docs/components/g6-media-pages.tsx`，新增独立示例模块与测试。

1. 测选择、多选、拖入、重复选同文件、只读/禁用、逐动作权限、异步失败保留、移除焦点与同卡操作隔离。
2. 组合既有 Attachment、Button、Progress、Popover，呈现文件元数据/未知值/图片失败回退、错误及替换信息。
3. 示例使用实际本地图片、PDF、文本/压缩文件；加入已有附件、选择添加、局部失败/重试/取消/替换、只读/权限/失效案例。
4. 原五态/三档/横竖展示保留；把真实上传与本地演示标清，避免给正式页面写入工程说明。

## Task 5：登记、核验与交付

Files: `manifests/recipes/attachment-workflow.yaml`、`registry/attachment-workflow.json`、Attachment README/Manifest、G6指南、阶段与本轮 evidence。

1. 登记新增候选、真实导出、依赖与来源；保持原 G6 十二项统计及原验收状态。
2. 专项单元/集成测试，UI/Playground 类型检查与构建；按新增文件检查来源引用/Token/禁用协议；复查现有 Attachment 消费者。
3. 单独浏览器配置与端口/输出目录验证三场景，不覆盖旧证据。桌面、390px、浅/深色基本容纳检查；真实文件上传到本地测试服务与下载内容验证独立记录。
4. 独立代码复核规格和关键行为，修复重要问题后复核。记录真实执行与未覆盖项，不把 AI 检查代替用户验收。

## 官方参考

- https://ui.shadcn.com/docs/components/base/attachment
- https://ant.design/components/upload/
- https://ark-ui.com/docs/components/file-upload
- https://mantine.dev/x/dropzone/
- https://www.notion.com/help/images-files-and-media
- https://support.google.com/edu/classroom/answer/6020260?hl=en
- https://support.microsoft.com/en-us/education/assignments/grade-return-and-reassign-assignments

## 进度

九组功能已完成本地实现与专项验证：180项单元/集成测试、14项Chromium桌面/390px浏览器测试、UI/Playground/测试类型检查与Playground构建通过。原Attachment九Parts和CSS保持本轮基线；真实XHR测试服务验证上传、失败重试、取消、替换和下载字节，Playground明确使用内存模拟上传。独立复核发现已修复并回归。结果见 `evidence/runtime/attachment-functions-2026-10-15/verification.md`。视觉方案研究、用户验收、真实业务服务、Safari/VoiceOver/物理触摸与发布未完成。
