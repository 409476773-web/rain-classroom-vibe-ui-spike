import { useRef, useState } from "react";
import { DensityProvider, type OverlayMask } from "@rain-next/foundations";
import { AlertDialog, Button, Checkbox, Dialog, IconButton, FormItem, Link, Select, Separator, Tag } from "@rain-next/ui";
import { CloseBoldIcon } from "@rain-next/ui/icons/close-bold";
import { CourseDialogExample } from "../../../../prototype/src/course-dialog";
import "./dialog-page.css";

export function DialogPage() {
  const [dark, setDark] = useState(false), [compact, setCompact] = useState(false), [longContent, setLongContent] = useState(false);
  const [gap12, setGap12] = useState(false), [inset60, setInset60] = useState(false);
  const [mask, setMask] = useState<OverlayMask>("modal");
  const safeAction = useRef<HTMLButtonElement>(null);
  return <DensityProvider density={compact ? "compact" : "default"}><main className="dialog-review" data-rain-theme={dark ? "dark" : "light"} data-rain-id="dialog-page" data-asset-identity="local-experiment"><div className="dialog-review-content">
    <Link href="#components">返回组件</Link><h1 id="dialog-title" tabIndex={-1}>Dialog 对话框</h1>
    <p>集中完成一项编辑或确认，保留任务上下文与明确的返回路径。</p><Tag size={20} color="neutral">视觉已验收</Tag>
    <div className="dialog-review-controls" aria-label="预览设置"><Checkbox label="深色主题" checked={dark} onCheckedChange={setDark} /><Checkbox label="紧凑控件" checked={compact} onCheckedChange={setCompact} /><Checkbox label="长内容" checked={longContent} onCheckedChange={setLongContent} /></div>
    <Checkbox label="按钮间距 12px" checked={gap12} onCheckedChange={setGap12} />
    <CourseDialogExample longContent={longContent} actionGap={gap12 ? 12 : 8} />
    <section><h2>重要确认</h2><AlertDialog.Root><AlertDialog.Trigger render={<Button variant="secondary">查看发布提示</Button>} />
      <AlertDialog.Content initialFocus={safeAction}>
        <AlertDialog.Header><AlertDialog.Title>发布前再看一眼</AlertDialog.Title><AlertDialog.Description>确认课程资料完整后，再开始邀请学生。</AlertDialog.Description></AlertDialog.Header>
        <AlertDialog.Body><p>这是确认弹窗示例，不会实际发布课程。</p></AlertDialog.Body>
        <AlertDialog.Footer><AlertDialog.Close render={<Button ref={safeAction} variant="secondary">返回检查</Button>} /><AlertDialog.Close render={<Button variant="primary">确认并返回</Button>} /></AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root></section>
    <section><h2>尺寸与蒙层</h2><p>固定档位以外框计量。桌面保留40或60px，窄屏保留16px；无蒙层只影响绘制，模态与关闭策略分别配置。</p>
      <div className="dialog-review-controls"><FormItem label="预览蒙层"><Select value={mask} clearable={false} onValueChange={value => setMask(value as OverlayMask)} options={[
        { value: "none", label: "无蒙层" }, { value: "separation", label: "视觉区分" }, { value: "focus", label: "轻度聚焦" }, { value: "modal", label: "模态任务" }, { value: "immersive", label: "特殊沉浸" },
      ]} /></FormItem><Checkbox label="桌面边距 60px" checked={inset60} onCheckedChange={setInset60} /></div>
      <div className="dialog-review-controls">{([416, 616, 1116, "viewport"] as const).map(width => <Dialog.Root key={width} disablePointerDismissal={mask !== "separation" && mask !== "focus"}>
        <Dialog.Trigger render={<Button variant="secondary">{width === "viewport" ? "随视口扩展" : `${width}px`}</Button>} />
        <Dialog.Content width={width} viewportInset={inset60 ? 60 : 40} mask={mask}>
          <Dialog.Header className="relative pr-rain-60"><Dialog.Close className="absolute right-rain-24 top-rain-24" render={<IconButton icon={<CloseBoldIcon />} size="28/20" aria-label="关闭尺寸预览" />} /><Dialog.Title>尺寸预览</Dialog.Title><Dialog.Description>弹窗保持居中，内容增加时由正文滚动。</Dialog.Description></Dialog.Header>
          <Dialog.Body><p>选择适合当前任务的宽度。复杂任务可使用随视口扩展模式。</p></Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>)}</div>
    </section>
    <section><h2>Separator 分隔线</h2><p>用于区分相邻内容组，不承担交互。</p><Separator /><div className="dialog-review-separators"><span>课程介绍</span><Separator orientation="vertical" /><span>学习安排</span></div></section>
    <details><summary data-focus="control">使用与验证边界</summary><p>Dialog 与 AlertDialog 共享尺寸、蒙层与Parts。常规Dialog默认点击蒙层不关闭，Esc与取消由宿主检查未保存修改。Dialog 使用 Root / Trigger / Content / Header / Body / Footer / Title / Description / Close 组合；Trigger 与 Close 通过 render 复用 Rain Button 或 IconButton。长内容放入 Body，保存状态与草稿保留在宿主。</p>
      <p>底部操作栏与主体同色，默认不显示分割线。长表单可通过 Footer 的 divider 属性开启分割线。</p>
      <p>主题和控件密度由触发器上下文传入。局部变量需要在 Content 显式设置，命名 Recipe 只修改当前对话框。必要文字、焦点、真实读屏和人工视觉验收分别记录。本例不代表完整大表单 Benchmark。</p>
      <pre>{`import { Dialog, Button, IconButton } from "@rain-next/ui";
import { CloseBoldIcon } from "@rain-next/ui/icons/close-bold";
<Dialog.Root>
  <Dialog.Trigger render={<Button>打开</Button>} />
  <Dialog.Content>
    <Dialog.Header className="relative pr-rain-60"><Dialog.Title>任务标题</Dialog.Title>
      <Dialog.Close className="absolute right-rain-24 top-rain-24" render={<IconButton icon={<CloseBoldIcon />} size="28/20" aria-label="关闭" />} />
    </Dialog.Header>
    <Dialog.Body>任务内容</Dialog.Body>
  </Dialog.Content>
</Dialog.Root>`}</pre>
    </details>
  </div></main></DensityProvider>;
}
