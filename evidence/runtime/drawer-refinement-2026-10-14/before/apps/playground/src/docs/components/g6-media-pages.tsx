import { useEffect, useRef, useState } from "react";
import {
  AspectRatio, Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription,
  AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger, Button, Dialog, DirectionProvider,
  IconButton, Slider, Spinner, useDirection,
} from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { DataTableRecipe } from "../../../../prototype/src/data-table-recipe";
import { ComponentDoc, DocExample } from "./component-doc";
import "./g6-media-pages.css";

export type G6MediaId = "data-table" | "aspect-ratio" | "attachment" | "direction";
const provenance = "固定 shadcn Base UI 源码 + 同版 Nova 样式，适配 Rain Token；共享候选，尚未发布。";

function DataTablePage() {
  return <ComponentDoc id="data-table" title="Data Table 数据表格" category="Recipe" description="先筛选资料，再排序、选择和操作；分页与列设置保持明确范围。"
    useWhen={["资料、任务等结构化对象需要排序、筛选、选择和分页。", "以当前配方为起点，复制后修改列和业务操作。"]}
    avoidWhen={["服务器全集全选、虚拟化、树或透视分析。", "把本地配方当作任意 data/columns 的公共 DataGrid。"]}
    props={[{ name:"loadRecords", type:"(current, AbortSignal) => Promise<Material[]>", description:"可替换刷新加载；排序、筛选和分页仍为本地客户端模式。" }]}
    slots={["Table", "查询与过滤", "排序与列显隐", "稳定 ID 选择", "分页", "加载/失败/空态"]}
    source="apps/prototype/src/data-table-recipe.tsx" code={`import { DataTableRecipe } from "./data-table-recipe";
<DataTableRecipe />
// 先复制该配方及样式到应用，再修改 ColumnDef<Material> 与宿主操作。
// 公共 Table 保持原生表格；TanStack 8.21.3 留在应用。`}>
    <DocExample title="课程资料管理" description="13 条虚构资料。当前页全选只处理可操作项；排序、翻页按资料 ID 保留选择，查询后回到首页。">
      <DataTableRecipe />
    </DocExample>
    <DocExample title="组合与消费边界"><div className="g6-media-copy"><p>表格、分页、筛选与菜单来自现有 Rain 组件。数据模型沿用 TanStack Table 8.21.3；上游新版文档的 v9 API 未在此升级。</p><p>尝试筛选无结果、列显隐、跨页选择和“模拟下次刷新失败”，查看数据保留与重试。真实接口接入时，宿主需要明确服务器分页、请求取消与权限。</p></div></DocExample>
  </ComponentDoc>;
}

function CourseCover({ contain = false }: { contain?: boolean }) {
  return <div className={`g6-course-cover ${contain ? "g6-course-cover--contain" : ""}`} role="img" aria-label="课程封面占位：从问题到证据">
    <div><span>课堂观察 · 第 04 讲</span><strong>从问题到证据</strong><span>观察 · 记录 · 讨论</span></div>
  </div>;
}
const courseImage = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="240" viewBox="0 0 640 240"><rect x="20" y="20" width="600" height="200" rx="16" fill="none" stroke="gray" stroke-width="2"/><path d="M100 170L180 85L260 150L350 60L450 150L530 90" fill="none" stroke="gray" stroke-width="8"/><circle cx="350" cy="60" r="15" fill="gray"/></svg>`)}`;
function AspectRatioPage() {
  return <ComponentDoc id="aspect-ratio" title="Aspect Ratio 媒体比例" description="在内容载入前保留比例，让封面、缩略图与课件稳定排列。"
    useWhen={["封面、缩略图或视频预览需要稳定比例。", "同一媒体进入不同宽度的卡片和侧栏。"]}
    avoidWhen={["让比例容器管理图片请求、播放器或文件错误。", "把任意长度正文放进固定比例后裁掉。"]}
    props={[{ name:"ratio",type:"number",description:"必填、有限且大于0；例如16/9、1、4/3。" },{ name:"style / className",type:"原生 div 属性",description:"控制宿主布局；ratio 保留比例优先级。" }]}
    slots={["原生 div / children"]} source="packages/ui/src/aspect-ratio/aspect-ratio.tsx" code={`<AspectRatio ratio={16 / 9}>
  <img src={cover} alt="课程封面" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
</AspectRatio>
// 文件标题放在比例区域外。`}>
    <DocExample title="三种常用比例" description="组件只负责比例；以下封面占位由宿主提供，标题在区域外完整显示。">
      <div className="g6-media-grid">{[{ ratio:16/9,label:"16:9 · 课程封面" },{ ratio:1,label:"1:1 · 缩略图" },{ ratio:4/3,label:"4:3 · 课件" }].map(item => <figure key={item.label}>
        <AspectRatio ratio={item.ratio} className="g6-media-frame"><CourseCover /></AspectRatio><figcaption>{item.label}</figcaption>
      </figure>)}</div>
    </DocExample>
    <DocExample title="不同父宽与内容留白" description="左侧铺满内容区域，右侧为窄卡片；容器宽度由宿主布局决定。">
      <div className="g6-media-flex"><AspectRatio ratio={16/9} className="g6-media-frame g6-media-flex__wide"><CourseCover /></AspectRatio><AspectRatio ratio={16/9} className="g6-media-frame g6-media-flex__narrow"><CourseCover contain /></AspectRatio></div>
    </DocExample>
    <DocExample title="图片 cover 与 contain" description="可分发的本地自制示意图；图片裁切由宿主负责，比例组件只预留尺寸。"><div className="g6-media-grid">{(["cover","contain"] as const).map(fit=><figure key={fit}><AspectRatio ratio={4/3} className="g6-media-frame"><img src={courseImage} alt="课堂观察路径示意：记录事实、寻找证据并回到讨论" className={`g6-media-image g6-media-image--${fit}`} /></AspectRatio><figcaption>{fit} · 课堂观察路径示意：记录事实、寻找证据并回到讨论</figcaption></figure>)}</div></DocExample>
    <DocExample title="加载失败仍保留位置"><AspectRatio ratio={16/9} className="g6-media-frame g6-media-placeholder"><FileIcon /><span>封面暂不可用</span><span>课程内容仍可继续阅读</span></AspectRatio></DocExample>
  </ComponentDoc>;
}

type FileState = "idle" | "uploading" | "processing" | "error" | "done";
type LocalFile = { id:string; name:string; state:FileState; progress:number };
const initialFiles:LocalFile[] = [{ id:"guide",name:"课程导读：从问题到证据.pdf",state:"done",progress:100 },{ id:"notes",name:"课堂观察记录与同伴反馈说明.docx",state:"idle",progress:0 }];
const stateNames:Record<FileState,string> = { idle:"等待上传",uploading:"正在上传",processing:"正在处理",error:"上传失败，请重试",done:"已上传 · 1.8 MB" };
function AttachmentPage() {
  const [files,setFiles] = useState(initialFiles), [preview,setPreview] = useState<LocalFile|null>(null), [notice,setNotice] = useState("");
  const timers = useRef(new Map<string,ReturnType<typeof setInterval>>()), nextId = useRef(0), addRef = useRef<HTMLButtonElement>(null);
  useEffect(() => () => { timers.current.forEach(clearInterval); timers.current.clear(); },[]);
  function upload(id:string) {
    const previous = timers.current.get(id); if(previous) clearInterval(previous);
    let progress = 0;
    setFiles(current => current.map(file => file.id===id ? { ...file,state:"uploading",progress:0 } : file));
    const timer = setInterval(() => {
      progress += 25;
      setFiles(current => current.map(file => file.id===id ? { ...file,progress:Math.min(progress,100),state:progress<100 ? "uploading" : progress===100 ? "processing" : "done" } : file));
      if(progress>100) { clearInterval(timer);timers.current.delete(id);setNotice("资料已上传，仅本页演示。"); }
    },350);
    timers.current.set(id,timer);
  }
  function remove(id:string) {
    const timer = timers.current.get(id); if(timer) clearInterval(timer);timers.current.delete(id);
    const remaining = files.filter(file => file.id!==id), index = files.findIndex(file => file.id===id);
    setFiles(remaining);setNotice("已移除该附件，仅本页演示。");
    requestAnimationFrame(() => { const next=remaining[Math.min(index,remaining.length-1)]; if(next) document.getElementById(`g6-file-trigger-${next.id}`)?.focus(); else addRef.current?.focus(); });
  }
  return <Dialog.Root open={preview!==null} onOpenChange={open=>{if(!open)setPreview(null);}}><ComponentDoc id="attachment" title="Attachment 文件附件" description="用文件名、类型、处理状态和独立动作组织课程资料。"
    useWhen={["表单、消息或资料区需要展示文件和处理状态。", "同一文件需要预览、移除或重试等独立动作。"]}
    avoidWhen={["让附件组件管理上传请求、权限或文件校验。", "把整卡按钮与移除按钮做成嵌套按钮。"]}
    props={[{ name:"state",type:"idle / uploading / processing / error / done",default:"done",description:"宿主拥有生命周期；组件只呈现状态。" },{ name:"size",type:"default / sm / xs",default:"default",description:"三档源码尺寸，显式size不再次被密度缩放。" },{ name:"orientation",type:"horizontal / vertical",default:"horizontal",description:"附件内容排列；Group保持横向滚动。" }]}
    slots={["Attachment","Group","Media","Content","Title","Description","Actions","Action","Trigger"]}
    source="packages/ui/src/attachment/attachment.tsx" code={`<Attachment state="done">
  <AttachmentMedia><FileIcon /></AttachmentMedia>
  <AttachmentContent><AttachmentTitle>课程导读.pdf</AttachmentTitle><AttachmentDescription>PDF · 1.8 MB</AttachmentDescription></AttachmentContent>
  <AttachmentTrigger aria-label="预览课程导读.pdf" onClick={openPreview} />
  <AttachmentActions><AttachmentAction aria-label="移除课程导读.pdf" onClick={remove}>移除</AttachmentAction></AttachmentActions>
</Attachment>`}>
    <DocExample title="预览、上传与移除" description="本地模拟上传，不连接服务器。整卡预览和右侧动作分别操作。">
      <div className="g6-media-stack" data-testid="attachment-live-list">{files.map(file => <Attachment key={file.id} state={file.state} className="g6-attachment-example">
        <AttachmentMedia>{file.state==="uploading" || file.state==="processing" ? <Spinner /> : file.state==="error" ? <CircleCloseIcon /> : file.state==="done" ? <CircleCheckIcon /> : <FileIcon />}</AttachmentMedia>
        <AttachmentContent><AttachmentTitle>{file.name}</AttachmentTitle><AttachmentDescription>{file.state==="uploading" ? `正在上传 · ${file.progress}%` : stateNames[file.state]}</AttachmentDescription></AttachmentContent>
        <Dialog.Trigger render={<AttachmentTrigger id={`g6-file-trigger-${file.id}`} aria-label={`预览 ${file.name}`} onClick={() => setPreview(file)} />} />
        <AttachmentActions>{(file.state==="idle" || file.state==="error") && <AttachmentAction aria-label={`${file.state==="error" ? "重试上传" : "上传"} ${file.name}`} onClick={() => upload(file.id)}>{file.state==="error" ? "重试" : "上传"}</AttachmentAction>}
          <IconButton size="28/16" aria-label={`移除 ${file.name}`} icon={<DeleteIcon />} onClick={() => remove(file.id)} />
        </AttachmentActions>
      </Attachment>)}</div>
      <div className="g6-media-actions"><Button ref={addRef} variant="text" onClick={() => { const id=`sample-${++nextId.current}`;setFiles(current=>[...current,{id,name:`补充资料 ${nextId.current}.pdf`,state:"idle",progress:0}]); }}>添加示例附件</Button><Button variant="text" onClick={() => { const id=files.find(file=>file.state!=="uploading"&&file.state!=="processing")?.id;if(id)setFiles(current=>current.map(file=>file.id===id?{...file,state:"error"}:file));setNotice("已模拟单文件上传失败。"); }}>模拟失败</Button></div>
      <p role="status">{notice}</p>
    </DocExample>
    <DocExample title="完整五态" description="处理中保留可读文字和动态提示；失败同时使用文字和图标。"><AttachmentGroup className="g6-attachment-states" role="group" tabIndex={0} aria-label="附件状态对照">{(Object.keys(stateNames) as FileState[]).map(state=><Attachment state={state} key={state}><AttachmentMedia>{state==="error"?<CircleCloseIcon/>:<FileIcon/>}</AttachmentMedia><AttachmentContent><AttachmentTitle>{state}.pdf</AttachmentTitle><AttachmentDescription>{stateNames[state]}</AttachmentDescription></AttachmentContent></Attachment>)}</AttachmentGroup></DocExample>
    <DocExample title="三档尺寸与竖排媒体"><div className="g6-media-actions">{(["default","sm","xs"] as const).map(size=><Attachment size={size} key={size}><AttachmentMedia><FileIcon/></AttachmentMedia><AttachmentContent><AttachmentTitle>课程资料.pdf</AttachmentTitle><AttachmentDescription>{size} · PDF</AttachmentDescription></AttachmentContent></Attachment>)}</div><Attachment orientation="vertical" className="g6-attachment-cover"><AttachmentMedia variant="image"><CourseCover/></AttachmentMedia><AttachmentContent><AttachmentTitle>课程封面</AttachmentTitle><AttachmentDescription>预览占位</AttachmentDescription></AttachmentContent></Attachment></DocExample>
    <Dialog.Content aria-label="附件预览"><Dialog.Header><Dialog.Title>{preview?.name}</Dialog.Title><Dialog.Description>本地预览 · 文件名完整显示</Dialog.Description></Dialog.Header><Dialog.Body><p>观察一段课堂记录，区分事实、解释与需要进一步验证的判断。</p><p>附件状态：{preview ? stateNames[preview.state] : ""}</p><a href={`data:text/plain;charset=utf-8,${encodeURIComponent("课程导读：从问题到证据\n观察、记录和讨论。")}`} download="课程导读.txt">下载本地示例文本</a></Dialog.Body><Dialog.Footer><Dialog.Close render={<Button>关闭预览</Button>}/></Dialog.Footer></Dialog.Content>
  </ComponentDoc></Dialog.Root>;
}

function DirectionExample({ direction }: { direction:"ltr"|"rtl" }) {
  const current=useDirection(),[notice,setNotice]=useState("");
  return <div className="g6-direction-example" dir={direction}><h3>{direction==="ltr"?"从左到右":"从右到左"}</h3><p>Context: {current} · DOM: {direction}</p><Slider defaultValue={40} aria-label={`${direction} 数值`} /><Attachment><AttachmentMedia><FileIcon/></AttachmentMedia><AttachmentContent><AttachmentTitle>课程导读.pdf</AttachmentTitle><AttachmentDescription>PDF · 1.8 MB</AttachmentDescription></AttachmentContent><AttachmentActions><AttachmentAction onClick={()=>setNotice("课程导读：观察课堂事实，记录证据并参加讨论。")}>预览</AttachmentAction></AttachmentActions></Attachment><p role="status">{notice}</p><div dir="ltr"><DirectionProvider direction="ltr"><p>局部 LTR：Course 04</p></DirectionProvider></div></div>;
}
function DirectionPage() {
  return <ComponentDoc id="direction" title="Direction 内容方向" description="让控件行为与文字方向一致，并为局部反向内容保留明确边界。"
    useWhen={["同一界面需要局部 LTR/RTL 控件。", "方向影响滑块、轮播、起止对齐或 Portal 内容。"]}
    avoidWhen={["只设置Provider却期待它自动写DOM dir。", "把局部组件检查推导为全库RTL支持。"]}
    props={[{name:"direction",type:"ltr / rtl",default:"ltr",description:"Base UI行为方向；宿主DOM dir须显式匹配。"},{name:"useDirection",type:"() => ltr | rtl",description:"读取最近Provider，支持Portal视觉方向传递。"}]}
    slots={["DirectionProvider", "useDirection"]} source="packages/ui/src/direction/direction.ts" code={`<div dir="rtl">
  <DirectionProvider direction="rtl"><Slider defaultValue={40} aria-label="数值" /></DirectionProvider>
</div>`}>
    <DocExample title="并排方向与局部覆盖" description="修改一个滑块，另一实例不受影响；RTL 内的英文片段显式恢复 LTR。"><div className="g6-media-grid">{(["ltr","rtl"] as const).map(direction=><DirectionProvider key={direction} direction={direction}><DirectionExample direction={direction}/></DirectionProvider>)}</div></DocExample>
    <DocExample title="方向的实际范围"><div className="g6-media-copy"><p>本批新抽屉将方向带入 Portal；轮播同时把方向传给 Embla 和 CSS 布局。旧 Select、Tooltip 等消费者是否完整支持 RTL 需分别检查。</p><p>{provenance}</p></div></DocExample>
  </ComponentDoc>;
}
export function G6MediaPage({ component }: { component:G6MediaId }) {
  return component==="data-table"?<DataTablePage/>:component==="aspect-ratio"?<AspectRatioPage/>:component==="attachment"?<AttachmentPage/>:<DirectionPage/>;
}
