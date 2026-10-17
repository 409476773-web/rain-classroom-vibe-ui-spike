# Attachment Workflow

本地公共组合候选，尚未发布。`recipe-attachment-workflow` 组合现有 Attachment、Button、Popover、Dialog 与 Progress，补充文件选择、校验、上传草稿、列表操作和预览；原 `ui-attachment` 的九个 Parts 与外观合同保持独立。组合和 Hook 从 `@rain-next/ui` 导入，沿用 Foundations 样式与 `@rain-next/ui/styles.css`。本轮优先补功能，视觉与交互设计仍待用户评审。

## 公开入口与所有权

| 入口 | 职责 |
|---|---|
| `AttachmentPicker` | 原生文件选择与拖放，共用 `onFiles(files)`；支持 `accept`、`multiple`、`disabled`、`readOnly`、`label`、`description`、`buttonRef`、`className`。不自行上传或校验内容。 |
| `AttachmentList` | 受控 `items`；显示缩略图、格式、大小、上传状态、详情、独立动作及内置预览。接收 `onStart/onRetry/onCancel/onReplace/onRemove/onDownload`，以及 `readOnly/disabled/restoreFocusRef/className`。 |
| `AttachmentPreview` | 受控 `attachment/open/onOpenChange`；图片与有限 PDF 预览、回退、下载和打开。可传 `onDownload`、`returnFocus`、`theme`、`maxPreviewBytes`。 |
| `useAttachmentUpload` | 拥有当前内存附件草稿；校验、上传/取消/重试、原位替换、异步移除、汇总与显式 `reset`。 |
| `createAttachmentXhrUploader` | 可选真实 XHR POST 适配器；FormData、上传进度、取消、网络/HTTP/超时失败和响应解析。没有服务地址时不会模拟成功。 |
| `useAttachmentObjectUrl` / `downloadAttachment` | 本地 Object URL 生命周期；真实发起文件下载并清理临时 URL。 |
| `getAttachmentKind` / `attachmentTypeLabel` / `formatAttachmentSize` / `isSafeAttachmentUrl` / `validateAttachmentFiles` | 格式、大小、协议检查与客户端文件约束。 |

`AttachmentRecord.id` 必须非空且唯一，列表、并发任务、替换和焦点恢复均使用此 ID。`file` 是当前会话的本地 File；`url` 是下载/打开地址，`previewUrl` 是预览地址，`thumbnailUrl` 是缩略图。可选 `remoteId`、`uploadedBy`、`uploadedAt`、`description` 由宿主提供。

三个维度独立：`status` 表示本地上传过程（idle/uploading/processing/error/canceled/done）；`availability` 表示资源可用性（available/processing/forbidden/missing/expired）；`permissions` 独立控制 preview/download/open/remove/replace，配套 `permissionReasons` 解释限制。上传完成不证明资源已通过后端处理。未给 `status` 的既有记录按已就绪展示；未给可用性和权限时采用可用/允许默认值，宿主必须在渲染前填入真实权限。

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
- 图片只把已列入允许范围的栅格格式放进 `img`；缩略图或预览失败有回退。SVG、HTML、Office、压缩包、音视频和未知类型不提供内嵌预览，提供文字说明及权限允许的下载/正式 URL 打开。
- PDF 读取上限默认 20 MiB，远程读取需同源或 CORS；超限会停止读取。只检查 `%PDF-` 文件头，并强制 `application/pdf` Blob 后交给浏览器原生查看器。这是格式防误用，不能证明 PDF 完整、可信或无恶意内容；浏览器 PDF 查看器能力与实际渲染仍需验证。`maxPreviewBytes` 可在独立 `AttachmentPreview` 上调整；List 内置预览使用默认值。
- 本地 File 和调用方 Blob URL 不直接用于新窗口导航；仅经过上述校验和 MIME 固定的 PDF Blob 可以打开。其他本地文件保留下载，栅格图保留嵌入预览。HTTP(S)/相对服务 URL 可按 `open` 权限打开，服务须提供正确内容类型、访问控制与必要的下载响应；协议过滤不证明服务内容安全。
- `permissions.download=false` 时不嵌入原生 PDF 查看器，因为其工具栏无法可靠禁止下载。独立 `open` 权限仍可能允许打开服务 URL；浏览器显示过的内容也不能由前端保证不可保存。真正的访问/下载限制须由文件服务实现，前端权限只是动作呈现。
- 预览关闭、切换附件与卸载会取消读取并回收组件拥有的 Object URL；外部传入的 URL 归宿主管理。下载远程资源需要 CORS，默认下载会将整个响应读入内存；大文件或专用鉴权应提供 `onDownload(item, { signal })` 适配器。下载成功回调只表示“已发起下载”，不证明用户已保存文件。

## 验证与来源

实现由 Rain 本地编写并组合既有组件，未引入上传框架或云端 Office 预览服务。来源绑定及本轮验证见 `evidence/runtime/attachment-functions-2026-10-15/source-bindings.json` 与 `verification.md`；各能力测试与源码同目录，真实消费见 `apps/playground/src/docs/components/attachment-workflow-demo.tsx` 和 `apps/playground/src/attachment-workflow-consumer.tsx`。

此记录不授予视觉/交互、对比度或生产接受：真实上传后端、鉴权/配额/恶意文件扫描、原生 PDF 查看器差异、大文件内存、Safari、VoiceOver 与物理触摸均须在对应环境验证。发布、Figma 与业务迁移保持独立。
