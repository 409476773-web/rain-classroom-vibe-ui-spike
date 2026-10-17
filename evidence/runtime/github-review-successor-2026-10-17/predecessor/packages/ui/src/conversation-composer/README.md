# Conversation Composer

`ConversationComposer` 是 AI 对话与讨论消息共用的受控输入组合。它负责编辑、上下文呈现、资料临时选择、浏览器录音和可恢复转写；会话、上传、权限、提交、AI 回答和持久化由宿主拥有。

资产身份与成熟度均为 `registry-candidate`，发布状态为 `unpublished`。用户已于2026-10-16明确确认当前本地版本整体验收通过，`humanGate: accepted`；当前登记收口见 [run-10 确认记录](../../../../evidence/runtime/conversation-composer-2026-10-15/run-10/verification.md)，完整实现与检查见 [run-09 验收报告](../../../../evidence/runtime/conversation-composer-2026-10-15/run-09/verification.md)。真实业务接口由用户明确后置。以下为实现与历史验证依据：

- [设计方案](../../../../docs/plans/2026-10-15-conversation-composer-design.md)
- [实施方案](../../../../docs/plans/2026-10-15-conversation-composer-implementation.md)
- [本轮验证记录](../../../../evidence/runtime/conversation-composer-2026-10-15/run-01/verification.md)
- [逐项检查与恢复流程修复](../../../../evidence/runtime/conversation-composer-2026-10-15/run-02/verification.md)
- [交互与视觉优化](../../../../evidence/runtime/conversation-composer-2026-10-15/run-04/verification.md)
- [第二轮结构与状态优化](../../../../evidence/runtime/conversation-composer-2026-10-15/run-05/verification.md)
- [窄屏恢复与展开收起动效复查](../../../../evidence/runtime/conversation-composer-2026-10-15/run-06/verification.md)

## 导入与外观

```tsx
import { ConversationComposer, type ComposerDraft } from "@rain-next/ui";
import "@rain-next/ui/styles.css";
```

宿主同时加载既有 Foundations 的 tokens、typography、focus、motion、tailwind-theme 样式，并按当前项目方式生成 Rain 工具类。通过 `@rain-next/ui` 根入口消费；没有新增组件专用 package subpath。

| surface | layout | 表现 |
| --- | --- | --- |
| `gray` | `compact` | 默认组合；浅灰底，全宽正文与下方工具行 |
| `white` | `compact` | 白底与轻描边，底部阴影 |
| `gray` | `expanded` | 灰底，增加书写空间，工具位置不变 |
| `white` | `expanded` | 白底，增加书写空间，工具位置不变 |

两个属性相互独立。省略 `layout` 时组件内部管理展开状态；提供 `layout` 后，宿主应在 `onLayoutChange` 中更新它。切换布局保留同一个 textarea、草稿和上下文。正文始终占满可用宽度，自然增高后内部滚动；下方工具行左侧添加与范围、右侧语音与布局和主动作的位置保持一致。资料 Popover 使用 portal，列表内部滚动，打开浮层不会增加输入器高度。两种布局均直接显示当前搜索范围；白底使用降低透明度和可见范围的现有底部投影配方。

手动展开/收起只对编辑器外层的高度使用既有 `region` 220ms 与 `ease-out` 过渡，文字本身不缩放；快速反向沿当前高度继续。逐字输入、容器或窗口宽度变化、会话切换直接适配高度，不播放这一过渡；减少动效时关闭。长稿已在底部时，收起后仍显示末尾，并保留原编辑器与选区。

课程引用与上传附件共用资料项结构，显示来源类别、名称、状态与移除。长名称默认单行截断，在不超过 400px 的组件容器中最多显示两行，保留完整 title 和具名移除/查看动作；状态原因可换行。窄容器内带文字恢复动作的附件将按钮放到下一行，避免挤压名称；本地文件的来源类别保持中性色，错误原因单独着色。资料总数超过3项时先显示2个已就绪项，其余通过“查看全部N项资料”展开；失败、处理中、不可用、移除中及移除失败项不被收纳。需处理项优先排列且 DOM 顺序一致；区域最多 min(192px,30dvh)，可聚焦并用键盘滚动，正文与工具行在区域外。文件拒绝反馈带文件名，并可用宿主已有回调清除。

2026-10-16 按用户截图反馈收紧底部工具行：次级按钮使用现有 `28/16` 配方，发送与重试使用 `32/16`，结束录音与停止生成使用 `32/18`；范围控件高 28px、来源图标 14px，录音波形容器高 32px。组内间距 2px、正文与工具间距 6px、底部留白 8px。正文尺寸与展开动效保持原合同。该尺寸选择仅适用于此组合。见 [底部工具密度微调](../../../../evidence/runtime/conversation-composer-2026-10-15/run-07/verification.md)。

本轮实际图标选择：正常发送按用户2026-10-16明确指定使用 `publish-filled`（`PublishFilledIcon`，节点 `182:695`），内部图标16px，圆形按钮保持32px，失败重试使用现有 `refresh`，语音入口使用线性麦克风 `microphone-on`（`MicrophoneOnIcon`，Figma 节点 `99:44`），展开/收起使用 `maximize` / `minimize`，结束录音与停止生成使用 `stop-playback`。这些图形均来自现有 available 单图标资产，按最终确认图和实际动作选择；该选择只记录本组合，不扩展为全库默认。

**Enter 换行。** 当前没有快捷键发送入口；点击发送按钮提交。输入法组合期间不触发提交。`ref` 指向内部 `HTMLTextAreaElement`，可用于宿主恢复焦点。

## 公开 API

| 属性 | 合同 |
| --- | --- |
| `conversationId` | 必填稳定会话 ID；用于语音异步结果归属与临时 UI 清理 |
| `draft` / `onDraftChange` | 必填受控草稿；`text`、`references`，可选 `reply`、`sourceScope` |
| `draftRevision` | 必填修订号；宿主每次正文或上下文变化时递增，布局切换不递增 |
| `aria-label` | 必填编辑器名称；可选 `formLabel` 命名表单 |
| `surface` / `layout` / `onLayoutChange` | `gray\|white`、`compact\|expanded`，默认 `gray` 与内部 `compact` |
| `placeholder` / `sendLabel` | 可选输入提示及正常发送动作名称 |
| `attachments` | 可选文件能力组；见下节，实际文件和上传草稿由宿主 Hook 管理 |
| `references` | 可选课程资料服务；`query(query,{signal})` 与 `resolve(ids,{signal})` 返回 `ComposerReference[]` |
| `sources` | 可选范围单选项；`value`、`label`，可选 `description`、`disabledReason` |
| `onLocateReply` | 可选回复定位；共享组件不读取 MessageScroller 的消息数据 |
| `voice` | 可选 `{transcribe,onPermissionHelp?}`；未提供时不显示语音入口 |
| `submission` | `idle`、`pending` 或带 `message` 的 `failed`；默认 `idle` |
| `submitBlockedReason` | 宿主独立业务阻塞原因，显示于输入器并阻止发送；已有附件/语音局部反馈的原因不重复传入 |
| `onSubmit` | 必填发送意图回调；组件不请求业务接口，也不自行清稿 |
| `generation` | 可选 `{running,onStop}`；回答中主操作变为停止，允许准备下一稿 |
| `disabled` / `readOnly` / `className` | 禁用、只读与布局类；视觉规则仍使用现有语义 Token |

根入口同时导出 `ComposerReference`、`ComposerReply`、`ComposerDraft`、`ComposerSourceOption`、`ComposerSubmission`、`ComposerReferenceService`、`ComposerTranscribe`、`ComposerAttachments`、`ConversationComposerProps`。资料选择器与语音 Hook 是该组合的内部实现，不从公共根入口导出。

`ComposerReference` 是 `{id,name,availability:"available"|"unavailable",unavailableReason?}`；它与本地上传附件分别维护。`ComposerReply` 是 `{messageId,author,excerpt}`，仅表示讨论回复对象。引用、回复和范围都不单独构成可发送正文；基础组件允许有可用附件的附件消息，宿主可通过 `submitBlockedReason` 要求必须输入文字。

## 上传适配

输入器不创建第二个上传引擎。宿主复用 `useAttachmentUpload`，在该组合中显式设置 **`autoUpload: true`**：工具行没有“开始上传”动作。选文件、拖放、粘贴图片最终进入同一个 `onFiles` 和校验流程。

```tsx
import {
  ConversationComposer, useAttachmentUpload,
  type AttachmentRemoveHandler, type AttachmentUploadHandler,
  type ConversationComposerProps,
} from "@rain-next/ui";

type Props = Omit<ConversationComposerProps, "attachments"> & {
  upload: AttachmentUploadHandler;
  removeAttachment?: AttachmentRemoveHandler;
};

function AttachmentComposer({ upload, removeAttachment, ...props }: Props) {
  const flow = useAttachmentUpload({
    upload, onRemove: removeAttachment, autoUpload: true,
    disabled: props.disabled || props.submission?.status === "pending",
    readOnly: props.readOnly,
  });
  return <ConversationComposer {...props} attachments={{
    items: flow.items,
    rejections: flow.rejections,
    removingIds: flow.removingIds,
    onClearRejections: flow.clearRejections,
    onFiles: files => { flow.addFiles(files); },
    onRetry: id => { void flow.retry(id); },
    onCancel: flow.cancel,
    onRemove: flow.remove,
  }} />;
}
```

这里仅展示连接方式。生产宿主还须设置文件约束，保存并冻结提交时的附件快照，结合 `flow.summary.canSubmit`、远端 ID、`availability`、权限和业务规则再次校验。上传传输达到 100% 不等于处理完成；`done` 也不能替代业务可用性和服务鉴权。发送确认后的清理、会话切换、`flow.reset` 和资源关系事务仍由宿主执行。`initialItems` 只用于首次挂载，不应把每次 `onChange` 立即传回 `reset`。预览沿 Attachment Workflow 的栅格图片及有限 PDF 合同。

打开的预览按当前附件 ID 读取最新可用性与权限，移除后关闭；未解决的替换仍阻止发送。组件自身跟踪发起的异步移除，即使省略可选 `removingIds` 也会显示“正在移除…”，阻止发送和重复移除；宿主传入的移除状态与本地请求合并。`onRemove` 返回 `false` 或抛错时保留原项并显示局部原因，可再次移除；切会话后旧操作不影响新会话的反馈或移除状态。附件标题放在 `AttachmentContent` 正常文档流中，空 `AttachmentTrigger` 作为整项预览命中区；不要把标题放入绝对定位的 Trigger 内。

触发附件重试或取消上传/替换后，焦点立即回到正文；异步完成时恢复按钮可能消失或资料项重新排列，不让键盘焦点随之落到页面根部。

## AI 与讨论的宿主边界

AI 场景可以传资料服务、来源范围、语音和生成状态。下面的适配器只声明真实支持的两个范围，删除最后一个引用后保留当前范围并阻止发送；不会自动扩大到整个课程。

```tsx
import { ConversationComposer, type ConversationComposerProps } from "@rain-next/ui";

function CourseAIComposer(props: ConversationComposerProps) {
  const emptyReferences = props.draft.references.length === 0;
  const invalidScope = props.draft.sourceScope === "references" && emptyReferences;
  return <ConversationComposer {...props}
    sources={[
      { value: "references", label: "本次引用资料",
        disabledReason: emptyReferences ? "请先添加引用资料" : undefined },
      { value: "course", label: "本课程资料" },
    ]}
    submitBlockedReason={props.submitBlockedReason ||
      (invalidScope ? "请添加引用资料或更改范围。" : undefined)}
  />;
}
```

宿主创建初始草稿时可设 `sourceScope: "course"`。`sources` 中的 value 是宿主合同，共享组件不解释其检索含义。服务必须按提交快照中的范围和引用 ID 检索；仅显示单选项不证明后端实施了课程或权限边界。

讨论场景通过 `draft.reply` 呈现回复对象，用 `onLocateReply` 定位原消息；取消回复仅移除 `reply`。例如：

```tsx
function DiscussionComposer(props: ConversationComposerProps) {
  return <ConversationComposer {...props}
    references={undefined} sources={undefined} generation={undefined}
    placeholder="写下你的观点…" sendLabel="发送"
  />;
}
```

宿主将稳定的消息 ID、作者及摘要写入 `draft.reply`，并更新 `draftRevision`。消息列表、历史加载、滚动锚点、引用位置与回复对象失效判断均保留在宿主；布局切换不应重建消息列表。

资料选择器使用真实布局容器分隔标题、36px搜索、列表和底部动作。整行显示选中状态，初始无引用且未选时禁用确认，原稿已有引用时可以清空后确认。打开时复制已选项；搜索不丢已选项，不匹配当前查询的已选项单列为“已选资料”。点击“添加引用”会对全部临时选中 ID 调用 `resolve`；缺失或不可用项保留名称并允许取消勾选，全部有效才写回草稿。取消、Escape 或外部关闭放弃临时变化；取消和 Escape 返回添加按钮，点击外部可聚焦控件时遵循现有 Popover 的焦点行为。确认后回到编辑器。`query`、`resolve` 的 AbortSignal 与请求序号隔离迟到结果；宿主仍需提供真实的权限和资料有效性。

## 发送、失败和语音恢复

`onSubmit` 只表示发送意图。宿主同步锁定同一草稿版本，冻结正文、引用、回复、范围和附件，创建稳定 `clientMessageId`，再发请求。明确收到业务接收确认后才能清理对应快照；如果 A 的响应到达时用户正在编辑 B，保留 B。失败重试保留同一个提交身份，避免重复消息。原按钮切换为刷新/重试图标并保留焦点。用户修改正文、附件、引用或回复后应清除旧失败提示并更新修订号；仅切换布局或表面保留失败。组件只提供一个主动作，`failed` 时为“重新发送”。

发送中沿用同一个主按钮，以 loading/aria-disabled 阻止重复激活并保留键盘焦点；失败后可直接重新发送。外部禁用或只读仍使用原生 disabled。转写回填后的光标恢复帧也校验当前会话与文本，避免在用户已切换或继续编辑后抢走焦点。

若实际接口返回“结果未知”，宿主需按 `clientMessageId` 查询接收状态；不能仅因网络超时就生成新 ID 重发或宣称失败。共享 API 没有内置接收状态核对协议。AI 回答与消息接收分开，`generation.onStop` 应真正取消当前生成；停止不得提交或清空正在准备的下一稿。

浏览器录音使用真实 `getUserMedia` 和 `MediaRecorder`，需要浏览器能力、麦克风权限及支持的安全上下文。结束录音后将 Blob 交给 `voice.transcribe(blob,{signal,mimeType})`；服务须支持实际采集的 MIME、时长及大小。组件取消时停止 tracks、解除 recorder 回调并取消转写；会话和草稿修订校验阻止旧结果写入新草稿。转写失败或转写中取消会保留内存 Blob，用户可以重试或丢弃；录音中取消则丢弃录音。恢复转写使用当前修订与插入位置，避免覆盖新文字。保留态使用一处状态与明确的“重试转写 / 丢弃录音”文字动作；独立宿主业务阻塞仍显示。

录音与转写使用固定工具行，结束录音位于发送的主动作位置；原正文可见且暂时只读。时长从 MediaRecorder 开始录音后计算完整秒，不计权限等待；结束录音立即冻结。转写失败、重试和取消转写保留时长；丢弃、新录音、切会话清零。计时器随录制、取消、禁用与卸载清理。

Blob 只保存在当前实例内存；刷新、卸载或切会话后不保证可恢复。麦克风拒绝或无设备时没有录音 Blob，仍可输入文字。波形是录音状态动画，不是音量测量或识别置信度。弹层打开、资料出现与局部反馈使用既有 180/220/140ms 动效 Token；弹层关闭即时交还焦点，避免确认改变锚点尺寸时继续保留关闭中的浮层；正文逐字增高不动画，减少动效时关闭这些局部效果。

Playground 的上传、资料查询、消息接收和 ASR 均为明确标注的本地演示适配。`mockG6Transcribe` 返回固定的“【模拟转写】”文本，不识别音频；真实麦克风采集和模拟 ASR 必须分别记验证结果。真实上传、资料权限/检索、ASR、消息状态核对及 AI 服务合同尚待业务接入。`useG6Composer` 是页面私有演示状态，不属于本 Recipe 的公共导出。其完整 submitBlockedReason 用于校验，submitFeedbackReason 供页面避免重复呈现已经由附件/引用状态表达的原因；业务限制、缺远端标识和正文要求仍显示。仅引用范围成功发送后保持范围偏好，空稿安静；下一稿有有效内容且无引用时才显示补选原因，提交守卫始终执行。

## 来源与验证范围

Registry：`registry/conversation-composer.json`；Manifest：`manifests/recipes/conversation-composer.yaml`；当前源码哈希由本轮 `source-bindings.json` 记录。专项核对命令：

```sh
node scripts/verify-conversation-composer.mjs
pnpm exec vitest run packages/ui/src/conversation-composer
```

自动检查与截图各记录实际执行范围。既有 G6 十二项清单与旧 source-lock 保留其历史含义；本资产不继承旧 G6 的验收。当前本地验收覆盖 C01–C13，并已获用户整体确认。真实 Safari、VoiceOver、物理触摸/软键盘与物理麦克风设备仍分别验证。真实业务服务依用户指令后续接入；当前登记不代表全库对比度、发布、生产或业务迁移接受。

本轮补查：长草稿中段与末尾收起后均保持光标可见。手动切换在实际布局更新后原生回焦，同步还原祖先滚动位置；受控布局采用同一路径；用户已转移焦点时不抢回，会话变化取消旧回焦请求。

发送图标反馈与尺寸验证见 [run-08](../../../../evidence/runtime/conversation-composer-2026-10-15/run-08/verification.md)。

用户2026-10-16补充要求空稿提示极浅：本组合 textarea 的 placeholder 使用现有 text-neutral-6、55%不透明度，正式输入颜色不变。强制颜色模式遵循系统GrayText。本配方不扩展到全局Input/Textarea。
