# Attachment

来源：shadcn-ui/ui 固定 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Base UI Attachment、同版 Nova 与 `packages/shadcn/src/tailwind.css`。MIT；来源分别见 `evidence/runtime/g6-preflight-2026-10-14/source-lock.json` 和 `evidence/runtime/g6-research-2026-10-14/`。这是附件展示与操作组合，上传、验证、预览、移除和 Blob 生命周期由宿主拥有。

保留全部九个出口：`Attachment`、`AttachmentGroup`、`AttachmentMedia`、`AttachmentContent`、`AttachmentTitle`、`AttachmentDescription`、`AttachmentActions`、`AttachmentAction`、`AttachmentTrigger`。

| Part | Props / 默认 |
|---|---|
| Attachment | 原生 div；`state=done`，可选 idle/uploading/processing/error/done；`size=default`，可选 default/sm/xs；`orientation=horizontal`，可选 horizontal/vertical |
| Media | 原生 div；`variant=icon`，可选 icon/image |
| Content / Actions / Group | 原生 div、className、style、ref；Group 水平滚动与 snap |
| Title / Description | 原生 span、className、style、ref；单行省略，完整文字留在 DOM |
| Action | 真实 Rain Button 的完整 Props/ref/loading/disabled；未指定 variant/size/block 时 text/regular；指定 text 时省略 size 仍 regular；其他显式合法 Button Props 沿用 house 默认 |
| Trigger | Base UI `useRender.ComponentProps<"button">`，支持 render/原生事件/ref；默认真实 button、type=button |

```tsx
import { FileFormatPdfOutlineIcon } from "@rain-next/ui/icons/file-format-pdf-outline";
import { MinusCircleOutlineIcon } from "@rain-next/ui/icons/minus-circle-outline";

<Attachment state="done">
  <AttachmentMedia><FileFormatPdfOutlineIcon /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>课程说明.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 128 KB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentTrigger aria-label="预览课程说明.pdf" onClick={openPreview} />
  <AttachmentActions>
    <IconButton size="28/16" aria-label="移除课程说明.pdf" icon={<MinusCircleOutlineIcon />} onClick={remove} />
  </AttachmentActions>
</Attachment>
```

图标由宿主选择当前可用 Rain 资产。Action/Trigger 是兄弟控件，不能嵌套 button。根层不增加 onPreview/onRemove/percent/上传请求等平行 API。图标动作写完整动作和文件名；错误说明有文字，等待状态提供可读文字或 Spinner；无确定进度不造百分数。加载失败保留对象，移除后的焦点由宿主放到邻项或添加入口。

`AttachmentGroup` 中可操作附件通过正常 Tab 到达屏外控件。纯呈现组请加 `tabIndex={0}`、`role="group"`、`aria-label`，供键盘原生横滚。保留媒体、文件名、说明和动作顺序，横排最小宽160px（窄容器限制为100%），竖排96/120px。三档 default/sm/xs 保留同版媒体40/32/28px及间距关系，不随 Density 再缩放；尺寸、文字、状态颜色与焦点绑定 Rain Token。

源码差额：

- 作者 ghost/icon-xs 不属于 Rain Button API；Action 映射完整 house Button，图标操作建议直接在 Actions 用 IconButton 28/16 或32/16。真实 Button 保留自身 `data-rain-id=ui-button`、`data-slot=root`；Action 通过 `data-attachment-action` 和 `.rain-attachment__action` 标识，不添加改变原生/ref 关系的包裹层。
- 原三轴 cva 类表转为组件局部 CSS 和原 data-size/state/orientation；保留九个原 Part 与 Props，未新增行为引擎。Title/Description 原 spans 与溢出规则不改成 Item 的多行文本。
- 错误混色转为已有 Red 角色；title 字重500转已注册600；行高保留 tight 比例。Root、media圆角按规格绑定12/8和8/6。竖排动作定位用 logical end；媒体 glyph 不统一镜像。
- 根悬停只在真实非禁用全卡 Trigger 存在时出现。Actions z20 高于 Trigger z10，原始事件继续由真实按钮/链接处理。
- uploading/processing title 保留来源2s文字光带和RTL反向。直接对两态关闭 reduced-motion/forced-colors 动画并恢复文字；没有仅声明不可达 `.shimmer` helper。
- Group 只移植来源 x 轴 scroll-driven fade；96px揭示距离为固定来源局部几何，40px上限用已有Space/40。未支持timeline时保留静态两边fade，并预留该fade宽度保护首末附件；focus-within取消mask保证焦点/内容可见。reduced-motion/forced-colors直接去除装饰mask。
- 来源 scrollbar-none/helper no-scrollbar 不匹配，实际样式明确隐藏滚动条，保留真实overflow、snap和原生键盘/触摸访问。

`attachment.test.tsx` 检查独立操作、默认非提交按钮、render 链接/ref/事件合并、disabled/loading阻挡、宿主失败重试保留对象。jsdom没有真实像素 hit testing；覆盖层点击、三档两向、滚动渐隐端点、减弱动态、forced-colors、RTL和物理触摸需浏览器/设备另验。
