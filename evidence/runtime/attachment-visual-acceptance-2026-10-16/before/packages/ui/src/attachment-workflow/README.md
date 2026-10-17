# Attachment Workflow

本地公共组合候选，尚未发布。`recipe-attachment-workflow` 组合现有 Attachment、Button、IconButton、DropdownMenu、Dialog 与 Progress，补充文件选择、校验、上传草稿、列表操作和预览；原 `ui-attachment` 的九个 Parts 与外观合同保持独立。组合和 Hook 从 `@rain-next/ui` 导入，沿用 Foundations 样式与 `@rain-next/ui/styles.css`。2026-10-16 的附件整合视觉方案已完成本地有限实现，附件范围内的自动化回归通过，实际运行视觉与交互仍等待用户审阅。

## 公开入口与所有权

| 入口 | 职责 |
|---|---|
| `AttachmentPicker` | 原生文件选择与拖放，共用 `onFiles(files)`；支持 `accept`、`multiple`、`disabled`、`readOnly`、`label`、`description`、`buttonRef`、`className`、`variant`（dropzone 默认 / button 紧凑入口）。不自行上传或校验内容。 |
| `AttachmentList` | 受控 `items`；显示缩略图或文件图标、文件名、大小、必要状态、详情、独立动作及内置预览。接收 `onStart/onRetry/onCancel/onReplace/onRemove/onDownload`，以及 `surface/size/orientation/layout/actions/readOnly/disabled/restoreFocusRef/className`；`surface` 为 `outlined`（默认）或 `filled`。 |
| `AttachmentPreview` | 受控 `attachment/open/onOpenChange`；图片、有限 PDF 与原生视频预览、回退、下载和打开。可传 `onDownload`、`returnFocus`、`theme`、`maxPreviewBytes`。 |
| `useAttachmentUpload` | 拥有当前内存附件草稿；校验、上传/取消/重试、原位替换、异步移除、汇总与显式 `reset`。 |
| `createAttachmentXhrUploader` | 可选真实 XHR POST 适配器；FormData、上传进度、取消、网络/HTTP/超时失败和响应解析。没有服务地址时不会模拟成功。 |
| `useAttachmentObjectUrl` / `downloadAttachment` | 本地 Object URL 生命周期；真实发起文件下载并清理临时 URL。 |
| `getAttachmentKind` / `attachmentTypeLabel` / `formatAttachmentSize` / `isSafeAttachmentUrl` / `validateAttachmentFiles` | 格式、大小、协议检查与客户端文件约束。 |

`AttachmentRecord.id` 必须非空且唯一，列表、并发任务、替换和焦点恢复均使用此 ID。`file` 是当前会话的本地 File；`url` 是下载/打开地址，`previewUrl` 是预览地址，`thumbnailUrl` 是缩略图。可选 `remoteId`、`uploadedBy`、`uploadedAt`、`description` 由宿主提供。

三个维度独立：`status` 表示本地上传过程（idle/uploading/processing/error/canceled/done）；`availability` 表示资源可用性（available/processing/forbidden/missing/expired）；`permissions` 独立控制 preview/download/open/remove/replace，配套 `permissionReasons` 解释限制。上传完成不证明资源已通过后端处理。未给 `status` 的既有记录按已就绪展示；未给可用性和权限时采用可用/允许默认值，宿主必须在渲染前填入真实权限。

## 列表视觉与操作

本轮按已选方案调整公共 `AttachmentList`：`surface="outlined"` 使用描边表面，`surface="filled"` 使用中性填充表面；两者共享内容与动作合同，沿当前主题的 Rain Token 映射。文件使用既有彩色格式图标：按具体后缀静态选择 PDF、JSONL、Markdown、CSV、Office、音视频等正式资产；不支持的格式使用通用文件图标。图形为24px，图标底托为32px；允许的图片继续使用40px缩略图。图标匹配只影响展示，不扩大预览或上传类型范围。标题在空间不足时保留扩展名，完整文件名仍可通过文件信息或预览读取；次行保留大小和必要状态，不重复罗列格式与“已就绪”。小状态位与文字共同表达状态，颜色不是唯一提示。

允许的下载保留独立图标按钮；文件信息、打开、替换与移除收进更多菜单，文件信息通过 Dialog 展示。上传、重试和取消仍按当前任务状态及回调提供操作。预览、下载、打开、替换和移除继续分别执行权限检查；图标按钮名称包含完整文件名，菜单和预览关闭后的焦点返回纳入本轮自动化回归。

Playground 的 `AttachmentStatesDemo` 是页面私有业务示例，以白色描边与灰色填充两列展示已选整合图中的七种状态。它用于审阅状态呈现，不新增公共 `AttachmentRecord.status` 值，也不把上传、资源可用性或业务审核状态合并为一套状态机。本轮方案与有限授权见 `docs/plans/2026-10-16-attachment-visual.md`；方案选定不等于实际实现通过用户验收。

## 可运行的宿主组合

示例接收真实服务适配器，默认手动上传。没有 `upload` 时，文件仍留在本页，点击上传会明确提示“尚未配置上传服务”；不会变成已上传。

```tsx
import { useRef } from "react";
import {
  AttachmentList, AttachmentPicker, useAttachmentUpload,
  type AttachmentRecord, type AttachmentRemoveHandler,
  type AttachmentUploadHandler,
} from "@rain-next/ui";

const constraints = {
  accept: "image/png,image/jpeg,application/pdf,.docx,.xlsx,.pptx,.zip,.txt",
  maxFiles: 10,
  maxFileSize: 20 * 1024 * 1024,
  maxTotalSize: 80 * 1024 * 1024,
} as const;

export function AttachmentEditor({
  initialItems = [], upload, removeAttachment, onDraftChange,
  readOnly = false, disabled = false,
}: {
  initialItems?: AttachmentRecord[];
  upload?: AttachmentUploadHandler;
  removeAttachment?: AttachmentRemoveHandler;
  onDraftChange?: (items: AttachmentRecord[]) => void;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const addButton = useRef<HTMLButtonElement>(null);
  const flow = useAttachmentUpload({
    initialItems, constraints, upload, onRemove: removeAttachment,
    onChange: onDraftChange, readOnly, disabled, autoUpload: false,
  });

  return <section aria-label="附件">
    <AttachmentPicker
      accept={constraints.accept}
      buttonRef={addButton}
      readOnly={readOnly}
      disabled={disabled}
      description="最多 10 个文件；单个不超过 20 MB，总计不超过 80 MB。"
      onFiles={files => { flow.addFiles(files); }}
    />
    {flow.rejections.length > 0 && <ul role="alert">
      {flow.rejections.map(({ file, reason }, index) =>
        <li key={`${file.name}-${index}`}>{file.name}：{reason}</li>)}
    </ul>}
    <AttachmentList
      items={flow.items}
      readOnly={readOnly}
      disabled={disabled}
      restoreFocusRef={addButton}
      onStart={item => { void flow.start(item.id); }}
      onRetry={item => { void flow.retry(item.id); }}
      onCancel={item => flow.cancel(item.id)}
      onReplace={(item, file) => { flow.replaceFile(item.id, file); }}
      onRemove={item => flow.remove(item.id)}
    />
    <p role="status">共 {flow.summary.count} 个附件，
      {flow.summary.pendingCount} 个尚未完成上传或替换。</p>
  </section>;
}
```

`initialItems` 只在 Hook 首次挂载时读取，后续修改该 prop 不会覆盖用户正在编辑的草稿。加载另一条业务记录可给上层编辑器稳定的 `key={record.id}`；在同一实例内刷新服务器快照时，显式调用 `flow.reset(serverItems)`。`reset()` 默认清空，取消进行中的上传/移除，清除拒绝记录并触发 `onChange`；宿主应先处理未保存草稿的取舍。不要把每次 `onChange` 的输出立即送回 `reset`，否则会打断上传。`onChange` 只是本地草稿变化通知，可能随进度多次触发，不是持久化完成通知；保存时应提取服务端资源标识，不能序列化 File/Object URL 当长期资源。

`summary` 含 count、totalSize、pendingCount、errorCount、uploadingCount 与 canSubmit。`canSubmit` 仅表示没有待上传/失败/取消/替换草稿或正在移除的项目；空列表也可为 true，资源 forbidden/missing/expired/processing 不会自动令其为 false。宿主提交还须检查必传数量、资源可用性、权限、表单有效性和业务提交规则。`totalSize` 不会捏造未知远程大小，不能代替服务器配额。

## 接入真实上传服务

```tsx
import { createAttachmentXhrUploader, isSafeAttachmentUrl } from "@rain-next/ui";

// 示例后端合同：成功响应 application/json，内容为 { id: string, url: string }。
// 只有服务确认资源已可用时才返回此响应；按实际接口修改 parseResponse。
export const uploadAttachment = createAttachmentXhrUploader({
  url: "/api/attachments",
  fieldName: "file",
  timeoutMs: 60_000,
  parseResponse(response) {
    if (typeof response !== "object" || response === null) {
      throw new Error("上传服务返回了无效结果");
    }
    const data = response as Record<string, unknown>;
    if (typeof data.id !== "string" || !data.id ||
        typeof data.url !== "string" || !isSafeAttachmentUrl(data.url) ||
        data.url.trim().toLowerCase().startsWith("blob:")) {
      throw new Error("上传服务缺少可用的文件标识或地址");
    }
    return { remoteId: data.id, url: data.url, availability: "available" };
  },
});
```

`url` 可为字符串或 `(file, context) => string`，仅支持 HTTP(S)/相对地址；另可配置 `headers`、`withCredentials`、`data`。不要手填 multipart `Content-Type`，浏览器需要生成 boundary。`timeoutMs` 默认 0，即无超时；非 2xx、网络错误、超时或 `parseResponse` 抛错均进入失败状态。JSON 响应先解析为对象，其他响应保留文本。返回结构必须由宿主核验，HTTP 2xx 本身不等于业务成功。

自定义 `AttachmentUploadHandler(file, { id, signal, replacing, onProgress, onProcessing })` 应将 `signal` 交给真实传输，进度未知时调用 `onProgress(undefined)`。100% 只代表字节传输结束；调用 `onProcessing()` 进入等待服务响应阶段，Promise 成功才结束本次上传。若服务返回后还需扫描/转换，应返回 `availability: "processing"`，再由宿主刷新状态；Hook 不轮询服务。`autoUpload=true` 会立即启动每个通过校验的文件；当前没有并发队列上限、分片/断点续传或自动重试。

`replaceFile(id, file)` 保留稳定 ID 与原资源，候选文件独立存于 `replacement`。成功才换入新资源并清除旧 URL/元信息；失败可以重试，取消替换会回到原附件。替换接口可通过 `context.replacing` 获取原资源。客户端取消不能保证服务端没有产生孤立文件，清理和资源关联事务由服务完成。

`remove(id)` 返回是否成功移除，期间取消该项上传。未提供 `onRemove` 时只改本地草稿；提供后等待回调成功才移除，抛错则保留附件并向列表显示失败。移除附件关系不等于永久删除存储文件，宿主决定具体业务动作。`readOnly` 隐藏编辑操作但保留允许的查看/下载；`disabled` 同时禁用列表的文件操作。既有异步业务操作是否继续由宿主明确决定；需要中止全部工作时调用 `reset` 或卸载。

## 文件约束、预览与安全边界

- `validateAttachmentFiles` 支持 accept（扩展名/MIME/组）、数量、单文件大小、总大小、重复与自定义同步校验；返回 accepted/rejected，不因一个失败丢弃整批。空文件始终拒绝。重复默认按名称、大小、lastModified 判断，可设 `duplicates: "allow"`。已有远程记录缺少 File 时不做内容去重；替换按保留原件回退所需的容量核算。浏览器类型/扩展名都不是安全内容验证。
- 图片只把已列入允许范围的栅格格式放进 `img`；缩略图或预览失败有回退。SVG、HTML、Office、压缩包、音频和未知类型不提供内嵌预览，提供文字说明及权限允许的下载/正式 URL 打开。
- PDF 读取上限默认 20 MiB，远程读取需同源或 CORS；超限会停止读取。只检查 `%PDF-` 文件头，并强制 `application/pdf` Blob 后交给浏览器原生查看器。这是格式防误用，不能证明 PDF 完整、可信或无恶意内容；浏览器 PDF 查看器能力与实际渲染仍需验证。`maxPreviewBytes` 可在独立 `AttachmentPreview` 上调整；List 内置预览使用默认值。
- 本地 File 和调用方 Blob URL 不直接用于新窗口导航；仅经过上述校验和 MIME 固定的 PDF Blob 可以打开。其他本地文件保留下载，栅格图保留嵌入预览。HTTP(S)/相对服务 URL 可按 `open` 权限打开，服务须提供正确内容类型、访问控制与必要的下载响应；协议过滤不证明服务内容安全。
- `permissions.download=false` 时不嵌入原生 PDF 或视频查看器，因为其工具栏无法可靠禁止下载。独立 `open` 权限仍可能允许打开服务 URL；浏览器显示过的内容也不能由前端保证不可保存。真正的访问/下载限制须由文件服务实现，前端权限只是动作呈现。
- 预览关闭、切换附件与卸载会取消读取并回收组件拥有的 Object URL；外部传入的 URL 归宿主管理。下载远程资源需要 CORS，默认下载会将整个响应读入内存；大文件或专用鉴权应提供 `onDownload(item, { signal })` 适配器。下载成功回调只表示“已发起下载”，不证明用户已保存文件。

## 验证与来源

实现由 Rain 本地编写并组合既有组件，未引入上传框架或云端 Office 预览服务。2026-10-15 功能轮的 `evidence/runtime/attachment-functions-2026-10-15/source-bindings.json`、`baseline.json` 与 `verification.md` 保留为历史证据；2026-10-16 视觉轮的当前来源与验证另见 `evidence/runtime/attachment-visual-2026-10-16/source-bindings.json` 和 `verification.md`。本轮 192 项单元测试及 14 项桌面/窄栏浏览器回归通过，独立技术审查发现的错列问题已修复，当前无遗留 P1/P2；UI、Playground、测试源码类型检查与构建通过。各能力测试与源码同目录，真实消费见 `apps/playground/src/docs/components/attachment-workflow-demo.tsx` 和 `apps/playground/src/attachment-workflow-consumer.tsx`。

此记录不授予视觉/交互、对比度或生产接受：真实上传后端、鉴权/配额/恶意文件扫描、原生 PDF 查看器差异、大文件内存、Safari、VoiceOver 与物理触摸均须在对应环境验证。发布、Figma 与业务迁移保持独立。

2026-10-16 格式图标反馈：Numbers/Pages、旧 Office 与常见图片扩展名的别名只属于此 Recipe；JSON 不映射为 JSONL。Markdown 正式图标自带白底，沿用源资产。当前反馈来源与检查见 `evidence/runtime/attachment-visual-2026-10-16/feedback-01/verification.md`。

## 2026-10-16 已确认场景增量

`AttachmentList` 的 `size="default" | "sm"` 负责普通/紧凑密度；`orientation="horizontal" | "vertical"` 负责单卡方向，`layout="list" | "wrap" | "grid"` 负责集合排列。`actions="draft"` 显示直接移除，权限/readOnly/disabled仍独立控制；完成的紧凑草稿在宽容器将大小排到同一行，窄于440px时省略正常大小；本次状态反馈修正后，异常和上传也保持两行内及40px紧凑高度。普通图标24px/32px底托，sm为20px/24px，普通图片缩略图40px；媒体封面16:9，有内容时不叠加格式角标，失败回退仍保持文件身份。

上传进度放到文件名下：64px短轨道与真实百分比替代大小；未知进度与服务处理保持不定值文字，无重复旋转图标或卡片底部通栏。替换保留原件信息并将候选进度单独表达。`AttachmentPicker variant="button"` 用于输入区附件入口，与默认拖拽区共用真实Files、校验回调及取消/错误语义。

原生视频支持声明MIME与后缀匹配的MP4/WebM/Ogg/OGV；本地File的name/type/非空内容也须一致。只有已就绪、资源可用、允许预览和下载且来源协议安全时提供播放入口。解码失败回退说明，关闭/切源/撤权停止播放器并释放自有URL。不依赖新播放器，不自动播放；格式资格不保证所有编解码可播。

页面私有`AttachmentScenariosDemo`示范普通24文件、紧凑草稿12文件、滚动弹窗24文件和媒体12文件。数量只是示例；折叠和关闭不打断控制器，失败摘要可定位/仅重试失败项，未按完成时间重排。草稿发送仅本页回显且采用本示例等待全部上传的规则，不是公共业务准入。媒体图片独立AI生成，视频为实验室示意图制作的4秒无声短片，不是现场实录。

当前范围、源码绑定、自动检查和未测边界见`evidence/runtime/attachment-scenarios-2026-10-16/verification.md`；历史192/46项记录属于对应旧轮，不是本次结果。Human Gate、对比度、发布、Figma、生产服务与跨浏览器验证仍独立。


## 2026-10-16 操作与反馈修正

下载、更多与草稿移除的IconButton使用既有`highlight="none"`中性色；不改母组件或全局Token。下载准备/已发起下载、操作失败、权限及可用性说明不追加段落，放在文件名下同一条元信息中；普通行保持56px，紧凑行保持40px。操作反馈出现时暂时代替大小，完整大小始终可在文件信息查看。

同一条元信息按错误、资源不可用、权限原因、操作反馈、上传状态依次优先显示。长内容省略；完整状态、所有权限原因及替换候选信息保留于title和“更多 → 文件信息”，不因优先级丢失。上传进度仍占同一条次行，替换成功前仍保留原资源。紧凑草稿的异常信息不会被窄栏正常大小的隐藏规则吞掉。

当前来源及范围内检查见`evidence/runtime/attachment-scenarios-2026-10-16/feedback-01/verification.md`；前轮封存报告保留为历史证据，当前验收与发布状态仍独立。
