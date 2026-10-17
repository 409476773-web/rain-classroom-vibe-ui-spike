# Conversation Composer 实际页面、动效与恢复复查

2026-10-15 开始，2026-10-16 完成 · card-v2 · System Mode 未发布候选增量。
用户授权继续检查实际页面的视觉、交互、动效，重点窄屏、多附件、语音和发送失败恢复，并要求展开/收起更丝滑。

## 本轮修复

1. 手动展开/收起使用既有 220ms region / ease-out 高度过渡。动画在 textarea 外壳上进行，不缩放文字、不重建编辑节点；快速反向衔接当前高度。逐字输入、宽度和会话变化即时更新，减少动效禁用过渡。
2. 长草稿末尾及中段的光标在收起后保持可见。手动布局请求在实际高度更新后原生回焦，同步还原祖先滚动位置；保持页面阅读位置。受控布局延迟响应时，若用户已转移焦点，不抢回焦点；会话变化取消旧请求。
3. 不超过 400px 的组件容器中，附件和引用名称最多两行；有文字恢复动作的附件将操作排到文件信息下方。错误状态下“本地文件”来源类别仍使用中性色，错误原因单独表达。
4. 附件重试、取消上传和取消替换立即回到正文，避免按钮在成功或重排后消失，把键盘焦点丢到 BODY。保持原替换、失败保稿、发送校验和确认后清稿合同。

没有新增公开 API、依赖、Foundation Token 或修改公共 MessageScroller、上传/Popover 行为引擎。

## 实际检查与证据

- 原预览为 5481，已确认服务属于 card-v2；自动化使用独立 5482。主代理是本轮唯一浏览器视觉审查者。
- 实际页面在 390×844 下添加 5 个本地测试文件，检查长文件名、失败项限高和键盘重试。复现并修复重试成功后的 BODY 失焦。
- 实际页面检查 5 个就绪附件与正文发送失败：内容保留；关闭演示失败并重新发送后，本地接收成功，正文与资料清空。证据 narrow-many-files.jpg、narrow-send-failure.jpg；恢复后的 DOM 由浏览器工具返回。
- 已目视检查最终窄屏附件恢复卡和语音保留状态截图。录音/转写与停止主动作、保留录音重试/丢弃、录音取消、发送失败同身份重试、切会话保稿、资料选择和完整对话阅读继续通过浏览器检查。
- 306 项原定向单元加 1 项延迟受控布局焦点保护，共 307/307，15 个文件；见 unit-report.json、unit.log。
- 17 项浏览器场景分别在桌面 1440×1000 与窄屏 390×844 执行，共 34/34，0 skipped / 0 flaky；最终完整运行见 browser-confirmed/report.json、browser-confirmed.log。最后的延迟回焦保护补丁又验证受影响的动效与附件恢复场景，6/6，见 focus-guard-confirmed。
- 动效检查实际采样逐帧高度，验证展开/收起都有多个中间帧且方向连续；快速反向、打字立即跟上、减少动效、光标与正文保留、长稿中段/末尾可见、外层文档不跳动均有断言。
- 320px 最小组件容器下，失败附件信息宽度超过 220px，恢复动作在信息下方，无横向溢出；重试过程中和完成后正文保持焦点。
- UI、Playground、测试三项类型检查与 Playground 构建通过，见 *typecheck.log 和 build.log。构建保留原有分包体积提示。
- 当前来源绑定 45 个文件；Field 样式、MessageScroller 实现、原 G6 十二项登记 3 项保护哈希保持。
- Registry、Manifest、计划、README 与当前状态同步。专项登记和依赖闭包检查、资产索引检查结果见 scoped-governance.json、asset-index.log。
- 预览已恢复正常尺寸并保留原“【模拟转写】”草稿，没有替用户发送。现有页继续可体验，见 preview.jpg。

## 缺陷与验证过程

- motion-baseline：原实现展开/收起没有中间高度帧；新过渡通过。
- recovery-baseline：附件替换重试/取消后未回正文；修复后通过。
- refinement-check：动画中继续打字时移除 transition 属性仍会延续浏览器过渡；明确 transition:none 后即时响应。
- caret-baseline 与 middle-caret-check：长稿收起后末尾或中段光标被裁出；调整末尾滚动和布局完成后的原生回焦后通过。
- delayed-focus-baseline：外部受控布局迟到会抢回已离开的焦点；加入原触发节点/编辑器焦点校验后通过。
- browser-release-check：一次截图出现 CDP “Cannot find context with specified id”，当时有文档写入与构建；不将该次记为通过。保持源码不变后完整重跑 browser-confirmed 34/34 通过。
- 早期检查日志与截图保留用于定位过程；最终完整浏览器证据为 browser-confirmed，最后补丁证据为 focus-guard-confirmed。

## 验证边界

上传、课程资料、ASR 和消息接收仍为本地演示适配。录音自动检查使用原生 MediaRecorder 与合成麦克风，不代表物理麦克风或真实识别验收。本轮未验收真实服务、Safari、VoiceOver、物理触摸与软键盘。录音恢复只在实例内存中。人工视觉 awaiting_human、contrast not-granted、publication unpublished；不声明发布、生产、Figma、全库或业务迁移接受。

